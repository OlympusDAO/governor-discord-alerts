/* eslint-disable */
import * as types from "./graphql";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "\n  query ProposalQuery($block: BigInt!) {\n    proposalCreateds(\n      where: { blockNumber_gt: $block }\n      orderBy: blockNumber\n      orderDirection: asc\n    ) {\n      blockNumber\n      blockTimestamp\n      description\n      proposalId\n      proposer\n      transactionHash\n    }\n    proposalCanceleds(\n      where: { blockNumber_gt: $block }\n      orderBy: blockNumber\n      orderDirection: asc\n    ) {\n      blockNumber\n      blockTimestamp\n      proposalId\n      transactionHash\n      proposal {\n        description\n      }\n    }\n    proposalExecuteds(\n      where: { blockNumber_gt: $block }\n      orderBy: blockNumber\n      orderDirection: asc\n    ) {\n      blockNumber\n      blockTimestamp\n      proposalId\n      transactionHash\n      proposal {\n        description\n      }\n    }\n    proposalQueueds(\n      where: { blockNumber_gt: $block }\n      orderBy: blockNumber\n      orderDirection: asc\n    ) {\n      blockNumber\n      blockTimestamp\n      proposalId\n      transactionHash\n      proposal {\n        description\n      }\n    }\n    proposalVetoeds(\n      where: { blockNumber_gt: $block }\n      orderBy: blockNumber\n      orderDirection: asc\n    ) {\n      blockNumber\n      blockTimestamp\n      proposalId\n      transactionHash\n      proposal {\n        description\n      }\n    }\n    proposalVotingStarteds(\n      where: { blockNumber_gt: $block }\n      orderBy: blockNumber\n      orderDirection: asc\n    ) {\n      blockNumber\n      blockTimestamp\n      proposalId\n      transactionHash\n      proposal {\n        description\n      }\n    }\n    _meta {\n      block {\n        number\n      }\n    }\n  }\n":
    types.ProposalQueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query ProposalQuery($block: BigInt!) {\n    proposalCreateds(\n      where: { blockNumber_gt: $block }\n      orderBy: blockNumber\n      orderDirection: asc\n    ) {\n      blockNumber\n      blockTimestamp\n      description\n      proposalId\n      proposer\n      transactionHash\n    }\n    proposalCanceleds(\n      where: { blockNumber_gt: $block }\n      orderBy: blockNumber\n      orderDirection: asc\n    ) {\n      blockNumber\n      blockTimestamp\n      proposalId\n      transactionHash\n      proposal {\n        description\n      }\n    }\n    proposalExecuteds(\n      where: { blockNumber_gt: $block }\n      orderBy: blockNumber\n      orderDirection: asc\n    ) {\n      blockNumber\n      blockTimestamp\n      proposalId\n      transactionHash\n      proposal {\n        description\n      }\n    }\n    proposalQueueds(\n      where: { blockNumber_gt: $block }\n      orderBy: blockNumber\n      orderDirection: asc\n    ) {\n      blockNumber\n      blockTimestamp\n      proposalId\n      transactionHash\n      proposal {\n        description\n      }\n    }\n    proposalVetoeds(\n      where: { blockNumber_gt: $block }\n      orderBy: blockNumber\n      orderDirection: asc\n    ) {\n      blockNumber\n      blockTimestamp\n      proposalId\n      transactionHash\n      proposal {\n        description\n      }\n    }\n    proposalVotingStarteds(\n      where: { blockNumber_gt: $block }\n      orderBy: blockNumber\n      orderDirection: asc\n    ) {\n      blockNumber\n      blockTimestamp\n      proposalId\n      transactionHash\n      proposal {\n        description\n      }\n    }\n    _meta {\n      block {\n        number\n      }\n    }\n  }\n",
): typeof import("./graphql").ProposalQueryDocument;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
