import {
  ExecutedProposalsDocument,
  ProposalQueryDocument,
  ProposalQueued,
  QueuedProposalsDocument,
} from "./__generated__/proposals";
import { getSubgraphUrl } from "./constants";
import { ProposalEvents } from "./types";
import { cacheExchange, Client, fetchExchange } from "@urql/core";

/**
 * Get the proposal events from the subgraph after a given block
 *
 * @param block - The block number to start after
 * @returns A tuple containing the proposal events and the latest block number
 */
export const getLatestProposalEvents = async (
  block: number,
): Promise<[ProposalEvents, number]> => {
  const proposalData: ProposalEvents = {
    cancelled: [],
    created: [],
    executed: [],
    queued: [],
    vetoed: [],
    votingStarted: [],
  };

  // Create a new client
  const subgraphClient = new Client({
    url: getSubgraphUrl(),
    exchanges: [cacheExchange, fetchExchange],
  });

  const { data } = await subgraphClient.query(ProposalQueryDocument, {
    block: block.toString(),
  });

  if (!data) {
    throw new Error("No data returned from subgraph");
  }

  if (!data._meta) {
    throw new Error("No meta data returned from subgraph");
  }

  proposalData.cancelled = data.proposalCanceleds;
  proposalData.created = data.proposalCreateds;
  proposalData.executed = data.proposalExecuteds;
  proposalData.queued = data.proposalQueueds;
  proposalData.vetoed = data.proposalVetoeds;
  proposalData.votingStarted = data.proposalVotingStarteds;

  return [proposalData, data._meta.block.number];
};

/**
 * Get the proposals that are currently queued
 *
 * @returns The queued proposals
 */
export const getCurrentQueuedProposals = async (): Promise<
  ProposalQueued[]
> => {
  // Create a new client
  const subgraphClient = new Client({
    url: getSubgraphUrl(),
    exchanges: [cacheExchange, fetchExchange],
  });

  // Fetches queued proposals that have an execution limit after now
  const { data } = await subgraphClient.query(QueuedProposalsDocument, {
    timestamp: Math.floor(Date.now() / 1000).toString(),
  });

  if (!data) {
    throw new Error("No data returned from subgraph for queued proposals");
  }

  // Get any executed proposals with the same proposal IDs
  const proposalIds = data.proposalQueueds.map(
    (proposal) => proposal.proposalId,
  );
  const { data: executedProposalsData } = await subgraphClient.query(
    ExecutedProposalsDocument,
    {
      proposals: proposalIds,
    },
  );

  if (!executedProposalsData) {
    throw new Error("No data returned from subgraph for executed proposals");
  }

  // Remove any proposals that have been executed
  const executedProposalIds = executedProposalsData.proposalExecuteds.map(
    (executed) => executed.proposalId,
  );
  const queuedProposals = data.proposalQueueds.filter(
    (queued) => !executedProposalIds.includes(queued.proposalId),
  );

  return queuedProposals;
};
