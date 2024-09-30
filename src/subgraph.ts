import { graphql } from "./graphql";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { getSubgraphUrl } from "./constants";
import { ProposalEvents } from "./types";

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
  const proposalData = {
    cancelled: [],
    created: [],
    executed: [],
    queued: [],
    vetoed: [],
    votingStarted: [],
  };

  // Create a new client
  const client = new ApolloClient({
    uri: getSubgraphUrl(),
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: PROPOSAL_QUERY,
    variables: {
      block: block,
    },
  });

  proposalData.cancelled = data.proposalCanceleds;
  proposalData.created = data.proposalCreateds;
  proposalData.executed = data.proposalExecuteds;
  proposalData.queued = data.proposalQueueds;
  proposalData.vetoed = data.proposalVetoeds;
  proposalData.votingStarted = data.proposalVotingStarteds;

  return [proposalData, data._meta.block.number];
};
