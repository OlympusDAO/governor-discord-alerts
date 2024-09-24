import { ProposalEvents } from "./types";

import { WebhookClient, EmbedBuilder } from "discord.js";

// TODOs
// [ ] Add extra embed fields for each proposal event type

export const sendDiscordAlert = async (
  title: string,
  content: string,
  url: string,
) => {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    throw new Error("DISCORD_WEBHOOK_URL environment variable is not set");
  }

  const webhookClient = new WebhookClient({ url: webhookUrl });

  const embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(content)
    .setColor(0x0099ff);
  embed.setURL(url);

  await webhookClient.send({
    embeds: [embed],
  });
};

const prepareDescription = (description: string) => {
  return description
    .substring(0, 20)
    .replace(/[<>]/g, "")
    .replace(/\[.*?\]\(.*?\)/g, "");
};

const getProposalUrl = (proposalId: string) => {
  return `https://app.olympusdao.finance/#/governance/proposals/${proposalId}`;
};

export const processProposalEvents = async (proposalEvents: ProposalEvents) => {
  // Created first
  for (const createdProposal of proposalEvents.created) {
    await sendDiscordAlert(
      `Proposal Created: ${createdProposal.proposalId}`,
      prepareDescription(createdProposal.description),
      getProposalUrl(createdProposal.proposalId),
    );
  }

  // Cancelled
  for (const cancelledProposal of proposalEvents.cancelled) {
    await sendDiscordAlert(
      `Proposal Cancelled: ${cancelledProposal.id}`,
      prepareDescription(cancelledProposal.proposal.description),
      getProposalUrl(cancelledProposal.proposalId),
    );
  }

  // Vetoed
  for (const vetoedProposal of proposalEvents.vetoed) {
    await sendDiscordAlert(
      `Proposal Vetoed: ${vetoedProposal.id}`,
      prepareDescription(vetoedProposal.proposal.description),
      getProposalUrl(vetoedProposal.proposalId),
    );
  }

  // Voting started
  for (const votingStartedProposal of proposalEvents.votingStarted) {
    await sendDiscordAlert(
      `Proposal Voting Started: ${votingStartedProposal.id}`,
      prepareDescription(votingStartedProposal.proposal.description),
      getProposalUrl(votingStartedProposal.proposalId),
    );
  }

  // Queued
  for (const queuedProposal of proposalEvents.queued) {
    await sendDiscordAlert(
      `Proposal Queued: ${queuedProposal.id}`,
      prepareDescription(queuedProposal.proposal.description),
      getProposalUrl(queuedProposal.proposalId),
    );
  }

  // Executed
  for (const executedProposal of proposalEvents.executed) {
    await sendDiscordAlert(
      `Proposal Executed: ${executedProposal.id}`,
      prepareDescription(executedProposal.proposal.description),
      getProposalUrl(executedProposal.proposalId),
    );
  }
};
