import { EXECUTION_MENTIONS, sendDiscordAlert } from "./discord";
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
const VOTING_REMINDER_INTERVAL = 24 * 60 * 60;
const percentage = (part: bigint, total: bigint) =>
  Number(part >= total ? 10000n : (part * 10000n) / total) / 100;

const votingProgress = (row: GovernorProposal) => {
  const quorum =
    row.quorumVotes > 0n
      ? `**${percentage(row.forVotes, row.quorumVotes).toFixed(2)}%** of required Yes votes`
      : "Unavailable. Check the proposal for its quorum requirement.";
  const total = row.forVotes + row.againstVotes;
  const yes = total > 0n ? percentage(row.forVotes, total) : 0;
  const no = total > 0n ? 100 - yes : 0;
  return `Quorum reached: ${quorum}\nApproval: **${yes.toFixed(2)}% Yes / ${no.toFixed(2)}% No**${total === 0n ? " (No Yes or No votes yet)" : ""}\nVotes are weighted by gOHM. No and abstain votes do not count toward quorum; abstentions are excluded from approval.`;
};
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
      `Proposal Voting Ended — ${passed ? "Passed" : "Defeated"}`,
      fromBlockTimestamp(snapshot.timestamp),
      {
        details: awaitingQueue
          ? "This proposal is ready to be queued."
          : passed
            ? "This proposal passed the vote."
            : "This proposal did not pass the vote.",
      },
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
      await sendDiscordAlert(row.proposal, "Proposal Expired", at, {
        deadline:
          row.eta > 0 ? row.eta + snapshot.executionGracePeriod : undefined,
        details:
          row.eta > 0
            ? "The execution deadline passed without being executed."
            : "This proposal expired without being activated.",
      });
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
    } else if (
      row.state === ProposalState.Active &&
      row.votingStarted &&
      row.endBlock >= snapshot.blockNumber
    ) {
      if (
        sent.lastVotingReminder !== undefined &&
        Date.now() / 1000 - sent.lastVotingReminder < VOTING_REMINDER_INTERVAL
      )
        continue;
      await sendDiscordAlert(row.proposal, "Proposal Voting In Progress", at, {
        deadline:
          snapshot.timestamp + (row.endBlock - snapshot.blockNumber) * 12,
        deadlineNote: `Estimated. Voting ends after block ${row.endBlock}.`,
        details: votingProgress(row),
      });
      sent.lastVotingReminder = Math.floor(Date.now() / 1000);
      await persist();
    } else if (row.state === ProposalState.Succeeded) {
      if (
        sent.lastQueueReminder !== undefined &&
        snapshot.timestamp - sent.lastQueueReminder < REMINDER_INTERVAL
      )
        continue;
      await sendDiscordAlert(row.proposal, "Proposal Awaiting Queue", at, {
        details:
          "Voting passed. Queue this proposal to start the execution timelock. There is no queue deadline.",
      });
      sent.lastQueueReminder = snapshot.timestamp;
      await persist();
    } else if (
      row.eta > 0 &&
      (row.state === ProposalState.Queued ||
        row.state === ProposalState.Emergency) &&
      snapshot.timestamp >= row.eta
    ) {
      const deadline = row.eta + snapshot.executionGracePeriod;
      if (Date.now() / 1000 > deadline) continue;
      if (
        sent.lastExecutionReminder !== undefined &&
        snapshot.timestamp - sent.lastExecutionReminder < REMINDER_INTERVAL
      )
        continue;
      await sendDiscordAlert(
        row.proposal,
        sent.lastExecutionReminder === undefined
          ? "Proposal Executable"
          : "Proposal Execution Reminder",
        at,
        {
          deadline,
          details: `This proposal is available to be executed.\n${EXECUTION_MENTIONS}`,
        },
      );
      sent.lastExecutionReminder = snapshot.timestamp;
      await persist();
    }
  }
};
