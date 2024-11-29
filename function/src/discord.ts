import { ProposalEvents } from "./types";

import { WebhookClient, EmbedBuilder } from "discord.js";
import { fromBlockTimestamp } from "./utils/date";
import { ProposalQueued } from "./__generated__/proposals";

// TODOs
// [ ] Add extra embed fields for each proposal event type

const ROLE_OGG = "1255521545686745268";
const USER_NOTIFY = "894321349210820618";

const VOTING_PERIOD_BLOCKS = 50400;
const EXECUTION_LIMIT = 24 * 60 * 60; // 24 hours
const EXECUTION_REMINDER_FREQUENCY = 4 * 60 * 60; // 4 hours

export const sendDiscordAlert = async (
  title: string,
  content: string,
  url: string,
  timestamp: Date,
) => {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    throw new Error("DISCORD_WEBHOOK_URL environment variable is not set");
  }

  const webhookClient = new WebhookClient({ url: webhookUrl });

  const embed = new EmbedBuilder({
    title: title,
    description: content,
    color: 0x0099ff,
    url: url,
    timestamp: timestamp,
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
    .replace(/\[.*?\]\(.*?\)/g, "") // Remove markdown links
    .trim(); // Remove leading/trailing whitespace
};

const prepareDescription = (description: string) => {
  // Check if description contains newlines
  if (description.includes("\n")) {
    // Take first line and clean it
    const firstLine = description.split("\n")[0];
    return cleanDescription(firstLine);
  }

  // Otherwise take first 60 chars and clean
  return cleanDescription(description.substring(0, 60));
};

const getProposalUrl = (proposalId: string) => {
  return `https://app.olympusdao.finance/#/governance/proposals/${proposalId}`;
};

const getDiscordTimestamp = (timestamp: number): string => {
  // e.g. November 26, 2024 at 3:54 PM
  return `<t:${timestamp}:f>`;
};

const getRoleMention = (roleId: string): string => {
  return `<@&${roleId}>`;
};

const getUserMention = (userId: string): string => {
  return `<@${userId}>`;
};

export const processProposalEvents = async (proposalEvents: ProposalEvents) => {
  // Created first
  for (const createdProposal of proposalEvents.created) {
    console.log(`Processing created proposal: ${createdProposal.proposalId}`);

    await sendDiscordAlert(
      `Proposal Created: ${prepareDescription(createdProposal.description)}`,
      `ID: ${createdProposal.proposalId}`,
      getProposalUrl(createdProposal.proposalId),
      fromBlockTimestamp(createdProposal.blockTimestamp),
    );
  }

  // Cancelled
  for (const cancelledProposal of proposalEvents.cancelled) {
    console.log(`Processing cancelled proposal: ${cancelledProposal.id}`);

    await sendDiscordAlert(
      `Proposal Cancelled: ${prepareDescription(cancelledProposal.proposal.description)}`,
      `ID: ${cancelledProposal.proposalId}`,
      getProposalUrl(cancelledProposal.proposalId),
      fromBlockTimestamp(cancelledProposal.blockTimestamp),
    );
  }

  // Vetoed
  for (const vetoedProposal of proposalEvents.vetoed) {
    console.log(`Processing vetoed proposal: ${vetoedProposal.id}`);

    await sendDiscordAlert(
      `Proposal Vetoed: ${prepareDescription(vetoedProposal.proposal.description)}`,
      `ID: ${vetoedProposal.proposalId}`,
      getProposalUrl(vetoedProposal.proposalId),
      fromBlockTimestamp(vetoedProposal.blockTimestamp),
    );
  }

  // Voting started
  for (const votingStartedProposal of proposalEvents.votingStarted) {
    console.log(
      `Processing voting started proposal: ${votingStartedProposal.id}`,
    );

    await sendDiscordAlert(
      `Proposal Voting Started: ${prepareDescription(
        votingStartedProposal.proposal.description,
      )}`,
      `ID: ${votingStartedProposal.proposalId}\n` +
        `Voting will end at ${getDiscordTimestamp(
          Number(votingStartedProposal.blockTimestamp) +
            VOTING_PERIOD_BLOCKS * 12,
        )}`,
      getProposalUrl(votingStartedProposal.proposalId),
      fromBlockTimestamp(votingStartedProposal.blockTimestamp),
    );
  }

  // No event fired for voting ended

  // Queued
  for (const queuedProposal of proposalEvents.queued) {
    console.log(`Processing queued proposal: ${queuedProposal.id}`);

    await sendDiscordAlert(
      `Proposal Queued for Execution: ${prepareDescription(
        queuedProposal.proposal.description,
      )}`,
      `||@everyone||\n` +
        `ID: ${queuedProposal.proposalId}\n` +
        `This proposal is in the timelock and can be executed on ${getDiscordTimestamp(Number(queuedProposal.eta))}`,
      getProposalUrl(queuedProposal.proposalId),
      fromBlockTimestamp(queuedProposal.blockTimestamp),
    );
  }

  // Executed
  for (const executedProposal of proposalEvents.executed) {
    console.log(`Processing executed proposal: ${executedProposal.id}`);

    await sendDiscordAlert(
      `Proposal Executed: ${prepareDescription(
        executedProposal.proposal.description,
      )}`,
      `ID: ${executedProposal.proposalId}`,
      getProposalUrl(executedProposal.proposalId),
      fromBlockTimestamp(executedProposal.blockTimestamp),
    );
  }
};

export const processQueuedProposals = async (
  queuedProposals: ProposalQueued[],
  previousBlock: number,
  latestBlock: number,
) => {
  // If 4 hours have passed since the last reminder, send a reminder
  const reminderBlock = previousBlock + EXECUTION_REMINDER_FREQUENCY;
  if (latestBlock < reminderBlock) {
    return;
  }

  // Send a reminder for each queued proposal
  for (const queuedProposal of queuedProposals) {
    console.log(`Processing queued proposal: ${queuedProposal.id}`);

    // Only if the ETA has passed
    if (Number(queuedProposal.eta) > Math.floor(Date.now() / 1000)) {
      console.log(`Proposal ETA has not passed. Skipping.`);
      continue;
    }

    await sendDiscordAlert(
      `Proposal Queued: ${prepareDescription(queuedProposal.proposal.description)}`,
      `||@everyone ${getRoleMention(ROLE_OGG)} ${getUserMention(USER_NOTIFY)}||\n` +
        `ID: ${queuedProposal.proposalId}\n` +
        `This proposal is available to be executed\n` +
        `Execution must be performed before ${getDiscordTimestamp(
          Number(queuedProposal.eta) + EXECUTION_LIMIT,
        )}`,
      getProposalUrl(queuedProposal.proposalId),
      fromBlockTimestamp(queuedProposal.blockTimestamp),
    );
  }
};
