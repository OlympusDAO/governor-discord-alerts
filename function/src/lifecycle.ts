import {
  EXECUTION_MENTIONS,
  getDiscordTimestamp,
  sendDiscordAlert,
} from "./discord";
import {
  getCompletedVoteOutcome,
  isEmergencyQueueCancelled,
  wasExpiredAtCursor,
} from "./governor";
import {
  type AlertState,
  type GovernanceSnapshot,
  type GovernorProposal,
  ProposalState,
} from "./types";
import { fromBlockTimestamp } from "./utils/date";

const REMINDER_INTERVAL = 4 * 60 * 60;
const isExpired = (row: GovernorProposal, snapshot: GovernanceSnapshot) =>
  row.state === ProposalState.Expired ||
  (row.eta > 0 &&
    (row.state === ProposalState.Queued ||
      row.state === ProposalState.Emergency) &&
    snapshot.timestamp > row.eta + snapshot.executionGracePeriod);

const notificationsFor = async (
  row: GovernorProposal,
  state: AlertState,
  snapshot: GovernanceSnapshot,
) => {
  const id = row.proposal.proposalId;
  if (!state.proposals[id]) {
    const historical =
      Number(row.proposal.blockNumber) <= state.lastProcessedBlock;
    state.proposals[id] = {
      events: {},
      votingEnded:
        historical &&
        row.endBlock > 0 &&
        row.endBlock < state.lastProcessedBlock,
      terminal:
        historical &&
        ((row.state === ProposalState.Emergency &&
          row.eta > 0 &&
          (await isEmergencyQueueCancelled(row, snapshot.blockNumber))) ||
          (isExpired(row, snapshot) &&
            (await wasExpiredAtCursor(
              row,
              state.lastProcessedBlock,
              snapshot.executionGracePeriod,
            )))),
    };
  }
  return state.proposals[id];
};

export const processVotingEnded = async (
  snapshot: GovernanceSnapshot,
  state: AlertState,
  persist: () => Promise<void>,
) => {
  for (const row of snapshot.proposals) {
    const sent = await notificationsFor(row, state, snapshot);
    if (
      sent.votingEnded ||
      !row.votingStarted ||
      row.endBlock >= snapshot.blockNumber
    )
      continue;
    let passed = row.state !== ProposalState.Defeated;
    if (
      row.state === ProposalState.Canceled ||
      row.state === ProposalState.Vetoed
    ) {
      const outcome = await getCompletedVoteOutcome(
        row.proposal.proposalId,
        row.endBlock,
      );
      if (outcome === undefined) continue;
      passed = outcome;
    }
    const awaitingQueue = passed && row.state === ProposalState.Succeeded;
    await sendDiscordAlert(
      row.proposal,
      `Proposal Voting Ended — ${passed ? "Passed" : "Defeated"}\n` +
        (awaitingQueue
          ? "This proposal is ready to be queued."
          : passed
            ? "This proposal passed the vote."
            : "This proposal did not pass the vote."),
      fromBlockTimestamp(snapshot.timestamp),
    );
    sent.votingEnded = true;
    if (awaitingQueue) sent.lastQueueReminder = snapshot.timestamp;
    await persist();
  }
};

export const processLifecycleReminders = async (
  snapshot: GovernanceSnapshot,
  state: AlertState,
  persist: () => Promise<void>,
) => {
  for (const row of snapshot.proposals) {
    const sent = await notificationsFor(row, state, snapshot);
    if (sent.terminal) continue;
    const at = fromBlockTimestamp(snapshot.timestamp);
    if (isExpired(row, snapshot)) {
      await sendDiscordAlert(
        row.proposal,
        row.eta > 0
          ? `Proposal Expired\nThe execution deadline passed without being executed.\nExecution deadline: ${getDiscordTimestamp(row.eta + snapshot.executionGracePeriod)}`
          : "Proposal Expired\nThis proposal expired without being activated.",
        at,
      );
      sent.terminal = true;
      await persist();
    } else if (
      [
        ProposalState.Executed,
        ProposalState.Canceled,
        ProposalState.Vetoed,
        ProposalState.Defeated,
      ].includes(row.state)
    ) {
      sent.terminal = true;
    } else if (row.state === ProposalState.Succeeded) {
      if (
        sent.lastQueueReminder !== undefined &&
        snapshot.timestamp - sent.lastQueueReminder < REMINDER_INTERVAL
      )
        continue;
      await sendDiscordAlert(
        row.proposal,
        "Proposal Awaiting Queue\nVoting passed. Queue this proposal to start the execution timelock.",
        at,
      );
      sent.lastQueueReminder = snapshot.timestamp;
      await persist();
    } else if (
      row.eta > 0 &&
      (row.state === ProposalState.Queued ||
        row.state === ProposalState.Emergency) &&
      snapshot.timestamp >= row.eta
    ) {
      const deadline = row.eta + snapshot.executionGracePeriod;
      if (
        sent.lastExecutionReminder !== undefined &&
        snapshot.timestamp - sent.lastExecutionReminder < REMINDER_INTERVAL
      )
        continue;
      await sendDiscordAlert(
        row.proposal,
        `${sent.lastExecutionReminder === undefined ? "Proposal Executable" : "Proposal Execution Reminder"}\n` +
          `This proposal is available to be executed.\nExecution deadline: ${getDiscordTimestamp(deadline)}\n${EXECUTION_MENTIONS}`,
        at,
      );
      sent.lastExecutionReminder = snapshot.timestamp;
      await persist();
    }
  }
};
