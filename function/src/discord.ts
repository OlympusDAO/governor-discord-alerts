import { ProposalEvents } from "./types";

import { WebhookClient, EmbedBuilder } from "discord.js";
import { fromBlockTimestamp } from "./utils/date";

// TODOs
// [ ] Add extra embed fields for each proposal event type

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

export const processProposalEvents = async (proposalEvents: ProposalEvents) => {
  // Created first
  for (const createdProposal of proposalEvents.created) {
    console.log(`Processing created proposal: ${createdProposal.proposalId}`);

    await sendDiscordAlert(
      `Proposal Created: ${createdProposal.proposalId}`,
      prepareDescription(createdProposal.description),
      getProposalUrl(createdProposal.proposalId),
      fromBlockTimestamp(createdProposal.blockTimestamp),
    );
  }

  // Cancelled
  for (const cancelledProposal of proposalEvents.cancelled) {
    console.log(`Processing cancelled proposal: ${cancelledProposal.id}`);

    await sendDiscordAlert(
      `Proposal Cancelled: ${cancelledProposal.id}`,
      prepareDescription(cancelledProposal.proposal.description),
      getProposalUrl(cancelledProposal.proposalId),
      fromBlockTimestamp(cancelledProposal.blockTimestamp),
    );
  }

  // Vetoed
  for (const vetoedProposal of proposalEvents.vetoed) {
    console.log(`Processing vetoed proposal: ${vetoedProposal.id}`);

    await sendDiscordAlert(
      `Proposal Vetoed: ${vetoedProposal.id}`,
      prepareDescription(vetoedProposal.proposal.description),
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
      `Proposal Voting Started: ${votingStartedProposal.id}`,
      prepareDescription(votingStartedProposal.proposal.description),
      getProposalUrl(votingStartedProposal.proposalId),
      fromBlockTimestamp(votingStartedProposal.blockTimestamp),
    );
  }

  // Queued
  for (const queuedProposal of proposalEvents.queued) {
    console.log(`Processing queued proposal: ${queuedProposal.id}`);

    await sendDiscordAlert(
      `Proposal Queued: ${queuedProposal.id}`,
      prepareDescription(queuedProposal.proposal.description),
      getProposalUrl(queuedProposal.proposalId),
      fromBlockTimestamp(queuedProposal.blockTimestamp),
    );
  }

  // Executed
  for (const executedProposal of proposalEvents.executed) {
    console.log(`Processing executed proposal: ${executedProposal.id}`);

    await sendDiscordAlert(
      `Proposal Executed: ${executedProposal.id}`,
      prepareDescription(executedProposal.proposal.description),
      getProposalUrl(executedProposal.proposalId),
      fromBlockTimestamp(executedProposal.blockTimestamp),
    );
  }
};
