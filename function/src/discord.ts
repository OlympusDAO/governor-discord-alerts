import { EmbedBuilder, WebhookClient } from "discord.js";
import { getEventLogIndex } from "./governor";
import type {
  AlertState,
  GovernanceSnapshot,
  ProposalCreated,
  ProposalEvents,
} from "./types";
import { fromBlockTimestamp } from "./utils/date";

const ROLE_OGG = "1255521545686745268";
const USER_NOTIFY = "894321349210820618";

export const EXECUTION_MENTIONS = `||@everyone <@&${ROLE_OGG}> <@${USER_NOTIFY}>||`;

type AlertOptions = {
  transactionHash?: string;
  deadline?: number;
  deadlineNote?: string;
  executableFrom?: number;
  details?: string;
};

export const sendDiscordAlert = async (
  proposal: ProposalCreated,
  content: string,
  timestamp: Date,
  options: AlertOptions = {},
) => {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    throw new Error("DISCORD_WEBHOOK_URL environment variable is not set");
  }

  const webhookClient = new WebhookClient({ url: webhookUrl });

  const lines = proposal.description.trim().split(/\r?\n/);
  const title = `#${proposal.proposalId} · ${cleanDescription(lines[0] || "Proposal")}`;
  const summary = (lines[0]?.startsWith("#") ? lines.slice(1) : lines)
    .filter((line) => line.trim() && !/^\s*#{1,6}\s/.test(line))
    .slice(0, 3)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  const embed = new EmbedBuilder({
    // Discord has a 256 character limit for the title
    title: title.length > 256 ? `${title.slice(0, 253)}...` : title,
    description: content,
    color: 0x0099ff,
    url: getProposalUrl(proposal.proposalId),
    timestamp: timestamp,
    fields: [
      {
        name: "Description",
        value:
          summary.length > 240
            ? `${summary
                .slice(0, 237)
                .replace(/\s+\S*$/, "")
                .trimEnd()}...`
            : summary || "No description provided.",
      },
      ...(options.executableFrom !== undefined
        ? [
            {
              name: "Executable From",
              value: getDiscordTimestamp(options.executableFrom),
            },
          ]
        : []),
      ...(options.deadline !== undefined
        ? [
            {
              name: "Deadline",
              value: `${getDiscordTimestamp(options.deadline)}${options.deadlineNote ? `\n${options.deadlineNote}` : ""}`,
            },
          ]
        : []),
      ...(options.details ? [{ name: "Details", value: options.details }] : []),
      { name: "Proposal ID", value: proposal.proposalId, inline: true },
      {
        name: "Proposer",
        value: `[${proposal.proposer}](https://etherscan.io/address/${proposal.proposer})`,
      },
      ...(options.transactionHash
        ? [
            {
              name: "Transaction",
              value: `[View on Etherscan](https://etherscan.io/tx/${options.transactionHash})`,
            },
          ]
        : []),
    ],
  });

  await webhookClient.send({
    embeds: [embed],
  });

  console.log(`Sent Discord alert: ${title}`);
};

const cleanDescription = (text: string) => {
  return text
    .replace(/^#+\s*/, "") // Remove markdown headings
    .replace(/[<>]/g, "") // Remove < and > characters
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/^Summary:\s*/i, "") // Remove leading "Summary: " text (case insensitive)
    .trim(); // Remove leading/trailing whitespace
};

const getProposalUrl = (proposalId: string) => {
  return `https://app.olympusdao.finance/#/governance/proposals/${proposalId}`;
};

export const getDiscordTimestamp = (timestamp: number): string =>
  `<t:${timestamp}:R>\n<t:${timestamp}:F>`;

export const processProposalEvents = async (
  proposalEvents: ProposalEvents,
  snapshot: GovernanceSnapshot,
  state: AlertState,
  persist: () => Promise<void>,
) => {
  const titles: Record<keyof ProposalEvents, string> = {
    created: "Proposal Created",
    cancelled: "Proposal Cancelled",
    vetoed: "Proposal Vetoed",
    votingStarted: "Proposal Voting Started",
    queued: "Proposal Queued",
    executed: "Proposal Executed",
  };
  const groups = {
    ...proposalEvents,
    created: proposalEvents.created.map((proposal) => ({
      ...proposal,
      proposal,
    })),
  };
  const entries = Object.entries(groups).flatMap(([kind, rows]) =>
    rows.map((event) => ({ kind: kind as keyof ProposalEvents, event })),
  );
  const key = (event: { blockNumber: string; proposalId: string }) =>
    `${event.blockNumber}:${event.proposalId}`;
  const counts = new Map<string, number>();
  for (const { event } of entries)
    counts.set(key(event), (counts.get(key(event)) ?? 0) + 1);
  const events = await Promise.all(
    entries.map(async ({ kind, event }) => ({
      kind,
      event,
      position:
        (counts.get(key(event)) ?? 0) > 1
          ? await getEventLogIndex(kind, event)
          : 0,
    })),
  );
  events.sort(
    (a, b) =>
      Number(a.event.blockNumber) - Number(b.event.blockNumber) ||
      a.position - b.position,
  );
  for (const { kind, event } of events) {
    state.proposals[event.proposalId] ??= { events: {} };
    const sent = state.proposals[event.proposalId];
    if (sent.events[kind] === event.transactionHash) continue;
    const options: AlertOptions = { transactionHash: event.transactionHash };
    if (kind === "votingStarted") {
      const row = snapshot.proposals.find(
        (p) => p.proposal.proposalId === event.proposalId,
      );
      if (!row)
        throw new Error(
          `Missing governor state for proposal ${event.proposalId}`,
        );
      const estimatedEnd =
        snapshot.timestamp + (row.endBlock - snapshot.blockNumber) * 12;
      options.deadline = estimatedEnd;
      options.deadlineNote = `Estimated. Voting ends after block ${row.endBlock}.`;
    } else if (kind === "queued") {
      const eta = Number((event as { eta: string }).eta);
      options.executableFrom = eta;
      options.deadline = eta + snapshot.executionGracePeriod;
      options.details = `Execute this proposal within the execution window.\n${EXECUTION_MENTIONS}`;
    }
    await sendDiscordAlert(
      event.proposal,
      titles[kind],
      fromBlockTimestamp(event.blockTimestamp),
      options,
    );
    sent.events[kind] = event.transactionHash;
    if (kind === "votingStarted") {
      sent.lastVotingReminder = Math.floor(Date.now() / 1000);
    } else if (kind === "queued") {
      sent.terminal = false;
      delete sent.lastExecutionReminder;
    } else if (
      kind === "cancelled" ||
      kind === "vetoed" ||
      kind === "executed"
    ) {
      sent.terminal = true;
    }
    await persist();
  }
};
