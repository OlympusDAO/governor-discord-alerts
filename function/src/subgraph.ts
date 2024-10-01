import { ProposalQueryDocument } from "./__generated__/proposals";
import { getSubgraphUrl } from "./constants";
import { ProposalEvents } from "./types";
import { cacheExchange, Client, fetchExchange } from "@urql/core";

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
