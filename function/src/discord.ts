import { EmbedBuilder, WebhookClient } from "discord.js";
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

export const sendDiscordAlert = async (
  proposal: ProposalCreated,
  content: string,
  timestamp: Date,
  transactionHash?: string,
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
    .join("\n");
  const embed = new EmbedBuilder({
    // Discord has a 256 character limit for the title
    title: title.length > 256 ? `${title.slice(0, 253)}...` : title,
    description:
      `${content}\n\n${summary.length > 800 ? `${summary.slice(0, 797)}...` : summary}`.trim(),
    color: 0x0099ff,
    url: getProposalUrl(proposal.proposalId),
    timestamp: timestamp,
    fields: [
      { name: "Proposal ID", value: proposal.proposalId, inline: true },
      {
        name: "Proposer",
        value: `[${proposal.proposer}](https://etherscan.io/address/${proposal.proposer})`,
      },
      ...(transactionHash
        ? [
            {
              name: "Transaction",
              value: `[View on Etherscan](https://etherscan.io/tx/${transactionHash})`,
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
  `<t:${timestamp}:F> (<t:${timestamp}:R>)`;

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
  const events = Object.entries(groups)
    .flatMap(([kind, rows]) =>
      rows.map((event) => ({ kind: kind as keyof ProposalEvents, event })),
    )
    .sort((a, b) => Number(a.event.blockNumber) - Number(b.event.blockNumber));
  for (const { kind, event } of events) {
    state.proposals[event.proposalId] ??= { events: {} };
    const sent = state.proposals[event.proposalId];
    if (sent.events[kind] === event.transactionHash) continue;
    let content = titles[kind];
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
      content += `\nVoting ends after block ${row.endBlock}.\nEstimated voting deadline: ${getDiscordTimestamp(estimatedEnd)}`;
    } else if (kind === "queued") {
      const eta = Number((event as { eta: string }).eta);
      content +=
        `\nExecutable from: ${getDiscordTimestamp(eta)}\n` +
        `Execution deadline: ${getDiscordTimestamp(eta + snapshot.executionGracePeriod)}\n${EXECUTION_MENTIONS}`;
    }
    await sendDiscordAlert(
      event.proposal,
      content,
      fromBlockTimestamp(event.blockTimestamp),
      event.transactionHash,
    );
    sent.events[kind] = event.transactionHash;
    if (kind === "queued") {
      sent.terminal = false;
      delete sent.lastExecutionReminder;
    }
    await persist();
  }
};
