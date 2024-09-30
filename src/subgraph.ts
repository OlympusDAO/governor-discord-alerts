import { graphql } from "./graphql";
import { getSubgraphUrl } from "./constants";
import { ProposalEvents } from "./types";
import { cacheExchange, Client, fetchExchange } from "@urql/core";
import fetch from "cross-fetch";

const PROPOSAL_QUERY = graphql(`
  query ProposalQuery($block: BigInt!) {
    proposalCreateds(
      where: { blockNumber_gt: $block }
      orderBy: blockNumber
      orderDirection: asc
    ) {
      blockNumber
      blockTimestamp
      description
      proposalId
      proposer
      transactionHash
    }
    proposalCanceleds(
      where: { blockNumber_gt: $block }
      orderBy: blockNumber
      orderDirection: asc
    ) {
      blockNumber
      blockTimestamp
      proposalId
      transactionHash
      proposal {
        description
      }
    }
    proposalExecuteds(
      where: { blockNumber_gt: $block }
      orderBy: blockNumber
      orderDirection: asc
    ) {
      blockNumber
      blockTimestamp
      proposalId
      transactionHash
      proposal {
        description
      }
    }
    proposalQueueds(
      where: { blockNumber_gt: $block }
      orderBy: blockNumber
      orderDirection: asc
    ) {
      blockNumber
      blockTimestamp
      proposalId
      transactionHash
      proposal {
        description
      }
    }
    proposalVetoeds(
      where: { blockNumber_gt: $block }
      orderBy: blockNumber
      orderDirection: asc
    ) {
      blockNumber
      blockTimestamp
      proposalId
      transactionHash
      proposal {
        description
      }
    }
    proposalVotingStarteds(
      where: { blockNumber_gt: $block }
      orderBy: blockNumber
      orderDirection: asc
    ) {
      blockNumber
      blockTimestamp
      proposalId
      transactionHash
      proposal {
        description
      }
    }
    _meta {
      block {
        number
      }
    }
  }
`);

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
  const client = new Client({
    url: getSubgraphUrl(),
    // fetch,
    exchanges: [cacheExchange, fetchExchange],
  });

  const { data } = await client.query(PROPOSAL_QUERY, {
    block: block,
  });

  if (!data) {
    throw new Error("No data returned from subgraph");
  }

  proposalData.cancelled = data.proposalCanceleds;
  proposalData.created = data.proposalCreateds;
  proposalData.executed = data.proposalExecuteds;
  proposalData.queued = data.proposalQueueds;
  proposalData.vetoed = data.proposalVetoeds;
  proposalData.votingStarted = data.proposalVotingStarteds;

  return [proposalData, data._meta.block.number];
};
