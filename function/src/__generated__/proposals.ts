import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  BigDecimal: { input: string; output: string };
  BigInt: { input: string; output: string };
  Bytes: { input: string; output: string };
  Int8: { input: string; output: string };
  Timestamp: { input: string; output: string };
};

export enum Aggregation_interval {
  day = "day",
  hour = "hour",
}

export type BlockChangedFilter = {
  number_gte: Scalars["Int"]["input"];
};

export type Block_height = {
  hash?: InputMaybe<Scalars["Bytes"]["input"]>;
  number?: InputMaybe<Scalars["Int"]["input"]>;
  number_gte?: InputMaybe<Scalars["Int"]["input"]>;
};

export type NewAdmin = {
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  id: Scalars["Bytes"]["output"];
  newAdmin: Scalars["Bytes"]["output"];
  oldAdmin: Scalars["Bytes"]["output"];
  transactionHash: Scalars["Bytes"]["output"];
};

export type NewAdmin_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<NewAdmin_filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  id_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  newAdmin?: InputMaybe<Scalars["Bytes"]["input"]>;
  newAdmin_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  newAdmin_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  newAdmin_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  newAdmin_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  newAdmin_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  newAdmin_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  newAdmin_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  newAdmin_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  newAdmin_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  oldAdmin?: InputMaybe<Scalars["Bytes"]["input"]>;
  oldAdmin_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  oldAdmin_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  oldAdmin_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  oldAdmin_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  oldAdmin_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  oldAdmin_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  oldAdmin_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  oldAdmin_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  oldAdmin_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<NewAdmin_filter>>>;
  transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum NewAdmin_orderBy {
  blockNumber = "blockNumber",
  blockTimestamp = "blockTimestamp",
  id = "id",
  newAdmin = "newAdmin",
  oldAdmin = "oldAdmin",
  transactionHash = "transactionHash",
}

export type NewImplementation = {
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  id: Scalars["Bytes"]["output"];
  newImplementation: Scalars["Bytes"]["output"];
  oldImplementation: Scalars["Bytes"]["output"];
  transactionHash: Scalars["Bytes"]["output"];
};

export type NewImplementation_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<NewImplementation_filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  id_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  newImplementation?: InputMaybe<Scalars["Bytes"]["input"]>;
  newImplementation_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  newImplementation_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  newImplementation_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  newImplementation_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  newImplementation_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  newImplementation_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  newImplementation_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  newImplementation_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  newImplementation_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  oldImplementation?: InputMaybe<Scalars["Bytes"]["input"]>;
  oldImplementation_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  oldImplementation_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  oldImplementation_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  oldImplementation_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  oldImplementation_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  oldImplementation_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  oldImplementation_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  oldImplementation_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  oldImplementation_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<NewImplementation_filter>>>;
  transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum NewImplementation_orderBy {
  blockNumber = "blockNumber",
  blockTimestamp = "blockTimestamp",
  id = "id",
  newImplementation = "newImplementation",
  oldImplementation = "oldImplementation",
  transactionHash = "transactionHash",
}

export type NewPendingAdmin = {
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  id: Scalars["Bytes"]["output"];
  newPendingAdmin: Scalars["Bytes"]["output"];
  oldPendingAdmin: Scalars["Bytes"]["output"];
  transactionHash: Scalars["Bytes"]["output"];
};

export type NewPendingAdmin_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<NewPendingAdmin_filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  id_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  newPendingAdmin?: InputMaybe<Scalars["Bytes"]["input"]>;
  newPendingAdmin_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  newPendingAdmin_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  newPendingAdmin_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  newPendingAdmin_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  newPendingAdmin_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  newPendingAdmin_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  newPendingAdmin_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  newPendingAdmin_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  newPendingAdmin_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  oldPendingAdmin?: InputMaybe<Scalars["Bytes"]["input"]>;
  oldPendingAdmin_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  oldPendingAdmin_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  oldPendingAdmin_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  oldPendingAdmin_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  oldPendingAdmin_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  oldPendingAdmin_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  oldPendingAdmin_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  oldPendingAdmin_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  oldPendingAdmin_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<NewPendingAdmin_filter>>>;
  transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum NewPendingAdmin_orderBy {
  blockNumber = "blockNumber",
  blockTimestamp = "blockTimestamp",
  id = "id",
  newPendingAdmin = "newPendingAdmin",
  oldPendingAdmin = "oldPendingAdmin",
  transactionHash = "transactionHash",
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  asc = "asc",
  desc = "desc",
}

export type ProposalCanceled = {
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  /**
   * Record ID.
   *
   * A proposal can only be cancelled once, so the record ID can be the proposal ID and not have any clashes.
   *
   * Format: `{proposalId}`
   *
   */
  id: Scalars["String"]["output"];
  proposal: ProposalCreated;
  proposalId: Scalars["BigInt"]["output"];
  transactionHash: Scalars["Bytes"]["output"];
};

export type ProposalCanceled_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ProposalCanceled_filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  id_contains?: InputMaybe<Scalars["String"]["input"]>;
  id_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  id_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_gt?: InputMaybe<Scalars["String"]["input"]>;
  id_gte?: InputMaybe<Scalars["String"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id_lt?: InputMaybe<Scalars["String"]["input"]>;
  id_lte?: InputMaybe<Scalars["String"]["input"]>;
  id_not?: InputMaybe<Scalars["String"]["input"]>;
  id_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  id_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  id_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<ProposalCanceled_filter>>>;
  proposal?: InputMaybe<Scalars["String"]["input"]>;
  proposalId?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  proposalId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  proposal_?: InputMaybe<ProposalCreated_filter>;
  proposal_contains?: InputMaybe<Scalars["String"]["input"]>;
  proposal_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  proposal_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  proposal_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  proposal_gt?: InputMaybe<Scalars["String"]["input"]>;
  proposal_gte?: InputMaybe<Scalars["String"]["input"]>;
  proposal_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  proposal_lt?: InputMaybe<Scalars["String"]["input"]>;
  proposal_lte?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  proposal_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  proposal_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  proposal_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum ProposalCanceled_orderBy {
  blockNumber = "blockNumber",
  blockTimestamp = "blockTimestamp",
  id = "id",
  proposal = "proposal",
  proposalId = "proposalId",
  proposal__blockNumber = "proposal__blockNumber",
  proposal__blockTimestamp = "proposal__blockTimestamp",
  proposal__description = "proposal__description",
  proposal__id = "proposal__id",
  proposal__proposalId = "proposal__proposalId",
  proposal__proposer = "proposal__proposer",
  proposal__startBlock = "proposal__startBlock",
  proposal__transactionHash = "proposal__transactionHash",
  transactionHash = "transactionHash",
}

export type ProposalCreated = {
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  calldatas: Array<Scalars["Bytes"]["output"]>;
  cancelled?: Maybe<ProposalCanceled>;
  description: Scalars["String"]["output"];
  executed?: Maybe<ProposalExecuted>;
  /**
   * Record ID.
   *
   * Format: `{proposalId}`
   *
   */
  id: Scalars["String"]["output"];
  proposalId: Scalars["BigInt"]["output"];
  proposer: Scalars["Bytes"]["output"];
  queued?: Maybe<ProposalQueued>;
  signatures: Array<Scalars["String"]["output"]>;
  startBlock: Scalars["BigInt"]["output"];
  targets: Array<Scalars["Bytes"]["output"]>;
  transactionHash: Scalars["Bytes"]["output"];
  values: Array<Scalars["BigInt"]["output"]>;
  vetoed?: Maybe<ProposalVetoed>;
  votes?: Maybe<Array<VoteCast>>;
  votingStarted?: Maybe<ProposalVotingStarted>;
};

export type ProposalCreatedvotesArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VoteCast_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<VoteCast_filter>;
};

export type ProposalCreated_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ProposalCreated_filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  calldatas?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  calldatas_contains?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  calldatas_contains_nocase?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  calldatas_not?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  calldatas_not_contains?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  calldatas_not_contains_nocase?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  cancelled_?: InputMaybe<ProposalCanceled_filter>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  description_contains?: InputMaybe<Scalars["String"]["input"]>;
  description_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  description_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  description_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  description_gt?: InputMaybe<Scalars["String"]["input"]>;
  description_gte?: InputMaybe<Scalars["String"]["input"]>;
  description_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  description_lt?: InputMaybe<Scalars["String"]["input"]>;
  description_lte?: InputMaybe<Scalars["String"]["input"]>;
  description_not?: InputMaybe<Scalars["String"]["input"]>;
  description_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  description_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  description_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  description_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  description_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  description_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  description_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  description_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  description_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  executed_?: InputMaybe<ProposalExecuted_filter>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  id_contains?: InputMaybe<Scalars["String"]["input"]>;
  id_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  id_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_gt?: InputMaybe<Scalars["String"]["input"]>;
  id_gte?: InputMaybe<Scalars["String"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id_lt?: InputMaybe<Scalars["String"]["input"]>;
  id_lte?: InputMaybe<Scalars["String"]["input"]>;
  id_not?: InputMaybe<Scalars["String"]["input"]>;
  id_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  id_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  id_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<ProposalCreated_filter>>>;
  proposalId?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  proposalId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  proposer?: InputMaybe<Scalars["Bytes"]["input"]>;
  proposer_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  proposer_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  proposer_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  proposer_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  proposer_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  proposer_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  proposer_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  proposer_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  proposer_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  queued_?: InputMaybe<ProposalQueued_filter>;
  signatures?: InputMaybe<Array<Scalars["String"]["input"]>>;
  signatures_contains?: InputMaybe<Array<Scalars["String"]["input"]>>;
  signatures_contains_nocase?: InputMaybe<Array<Scalars["String"]["input"]>>;
  signatures_not?: InputMaybe<Array<Scalars["String"]["input"]>>;
  signatures_not_contains?: InputMaybe<Array<Scalars["String"]["input"]>>;
  signatures_not_contains_nocase?: InputMaybe<
    Array<Scalars["String"]["input"]>
  >;
  startBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  startBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  startBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  startBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  startBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  startBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  startBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  startBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  targets?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  targets_contains?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  targets_contains_nocase?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  targets_not?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  targets_not_contains?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  targets_not_contains_nocase?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  values?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  values_contains?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  values_contains_nocase?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  values_not?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  values_not_contains?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  values_not_contains_nocase?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  vetoed_?: InputMaybe<ProposalVetoed_filter>;
  votes_?: InputMaybe<VoteCast_filter>;
  votingStarted_?: InputMaybe<ProposalVotingStarted_filter>;
};

export enum ProposalCreated_orderBy {
  blockNumber = "blockNumber",
  blockTimestamp = "blockTimestamp",
  calldatas = "calldatas",
  cancelled = "cancelled",
  cancelled__blockNumber = "cancelled__blockNumber",
  cancelled__blockTimestamp = "cancelled__blockTimestamp",
  cancelled__id = "cancelled__id",
  cancelled__proposalId = "cancelled__proposalId",
  cancelled__transactionHash = "cancelled__transactionHash",
  description = "description",
  executed = "executed",
  executed__blockNumber = "executed__blockNumber",
  executed__blockTimestamp = "executed__blockTimestamp",
  executed__id = "executed__id",
  executed__proposalId = "executed__proposalId",
  executed__transactionHash = "executed__transactionHash",
  id = "id",
  proposalId = "proposalId",
  proposer = "proposer",
  queued = "queued",
  queued__blockNumber = "queued__blockNumber",
  queued__blockTimestamp = "queued__blockTimestamp",
  queued__eta = "queued__eta",
  queued__id = "queued__id",
  queued__proposalId = "queued__proposalId",
  queued__transactionHash = "queued__transactionHash",
  signatures = "signatures",
  startBlock = "startBlock",
  targets = "targets",
  transactionHash = "transactionHash",
  values = "values",
  vetoed = "vetoed",
  vetoed__blockNumber = "vetoed__blockNumber",
  vetoed__blockTimestamp = "vetoed__blockTimestamp",
  vetoed__id = "vetoed__id",
  vetoed__proposalId = "vetoed__proposalId",
  vetoed__transactionHash = "vetoed__transactionHash",
  votes = "votes",
  votingStarted = "votingStarted",
  votingStarted__blockNumber = "votingStarted__blockNumber",
  votingStarted__blockTimestamp = "votingStarted__blockTimestamp",
  votingStarted__id = "votingStarted__id",
  votingStarted__proposalId = "votingStarted__proposalId",
  votingStarted__transactionHash = "votingStarted__transactionHash",
}

export type ProposalExecuted = {
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  /**
   * Record ID.
   *
   * A proposal can only be executed once, so the record ID can be the proposal ID and not have any clashes.
   *
   * Format: `{proposalId}`
   *
   */
  id: Scalars["String"]["output"];
  proposal: ProposalCreated;
  proposalId: Scalars["BigInt"]["output"];
  transactionHash: Scalars["Bytes"]["output"];
};

export type ProposalExecuted_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ProposalExecuted_filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  id_contains?: InputMaybe<Scalars["String"]["input"]>;
  id_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  id_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_gt?: InputMaybe<Scalars["String"]["input"]>;
  id_gte?: InputMaybe<Scalars["String"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id_lt?: InputMaybe<Scalars["String"]["input"]>;
  id_lte?: InputMaybe<Scalars["String"]["input"]>;
  id_not?: InputMaybe<Scalars["String"]["input"]>;
  id_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  id_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  id_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<ProposalExecuted_filter>>>;
  proposal?: InputMaybe<Scalars["String"]["input"]>;
  proposalId?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  proposalId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  proposal_?: InputMaybe<ProposalCreated_filter>;
  proposal_contains?: InputMaybe<Scalars["String"]["input"]>;
  proposal_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  proposal_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  proposal_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  proposal_gt?: InputMaybe<Scalars["String"]["input"]>;
  proposal_gte?: InputMaybe<Scalars["String"]["input"]>;
  proposal_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  proposal_lt?: InputMaybe<Scalars["String"]["input"]>;
  proposal_lte?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  proposal_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  proposal_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  proposal_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum ProposalExecuted_orderBy {
  blockNumber = "blockNumber",
  blockTimestamp = "blockTimestamp",
  id = "id",
  proposal = "proposal",
  proposalId = "proposalId",
  proposal__blockNumber = "proposal__blockNumber",
  proposal__blockTimestamp = "proposal__blockTimestamp",
  proposal__description = "proposal__description",
  proposal__id = "proposal__id",
  proposal__proposalId = "proposal__proposalId",
  proposal__proposer = "proposal__proposer",
  proposal__startBlock = "proposal__startBlock",
  proposal__transactionHash = "proposal__transactionHash",
  transactionHash = "transactionHash",
}

export type ProposalQueued = {
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  eta: Scalars["BigInt"]["output"];
  /**
   * Record ID.
   *
   * A proposal can only be queued once, so the record ID can be the proposal ID and not have any clashes.
   *
   * Format: `{proposalId}`
   *
   */
  id: Scalars["String"]["output"];
  proposal: ProposalCreated;
  proposalId: Scalars["BigInt"]["output"];
  transactionHash: Scalars["Bytes"]["output"];
};

export type ProposalQueued_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ProposalQueued_filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  eta?: InputMaybe<Scalars["BigInt"]["input"]>;
  eta_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  eta_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  eta_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  eta_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  eta_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  eta_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  eta_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  id_contains?: InputMaybe<Scalars["String"]["input"]>;
  id_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  id_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_gt?: InputMaybe<Scalars["String"]["input"]>;
  id_gte?: InputMaybe<Scalars["String"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id_lt?: InputMaybe<Scalars["String"]["input"]>;
  id_lte?: InputMaybe<Scalars["String"]["input"]>;
  id_not?: InputMaybe<Scalars["String"]["input"]>;
  id_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  id_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  id_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<ProposalQueued_filter>>>;
  proposal?: InputMaybe<Scalars["String"]["input"]>;
  proposalId?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  proposalId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  proposal_?: InputMaybe<ProposalCreated_filter>;
  proposal_contains?: InputMaybe<Scalars["String"]["input"]>;
  proposal_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  proposal_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  proposal_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  proposal_gt?: InputMaybe<Scalars["String"]["input"]>;
  proposal_gte?: InputMaybe<Scalars["String"]["input"]>;
  proposal_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  proposal_lt?: InputMaybe<Scalars["String"]["input"]>;
  proposal_lte?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  proposal_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  proposal_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  proposal_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum ProposalQueued_orderBy {
  blockNumber = "blockNumber",
  blockTimestamp = "blockTimestamp",
  eta = "eta",
  id = "id",
  proposal = "proposal",
  proposalId = "proposalId",
  proposal__blockNumber = "proposal__blockNumber",
  proposal__blockTimestamp = "proposal__blockTimestamp",
  proposal__description = "proposal__description",
  proposal__id = "proposal__id",
  proposal__proposalId = "proposal__proposalId",
  proposal__proposer = "proposal__proposer",
  proposal__startBlock = "proposal__startBlock",
  proposal__transactionHash = "proposal__transactionHash",
  transactionHash = "transactionHash",
}

export type ProposalThresholdSet = {
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  id: Scalars["Bytes"]["output"];
  newProposalThreshold: Scalars["BigInt"]["output"];
  oldProposalThreshold: Scalars["BigInt"]["output"];
  transactionHash: Scalars["Bytes"]["output"];
};

export type ProposalThresholdSet_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ProposalThresholdSet_filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  id_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  newProposalThreshold?: InputMaybe<Scalars["BigInt"]["input"]>;
  newProposalThreshold_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  newProposalThreshold_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  newProposalThreshold_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  newProposalThreshold_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  newProposalThreshold_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  newProposalThreshold_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  newProposalThreshold_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  oldProposalThreshold?: InputMaybe<Scalars["BigInt"]["input"]>;
  oldProposalThreshold_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  oldProposalThreshold_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  oldProposalThreshold_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  oldProposalThreshold_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  oldProposalThreshold_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  oldProposalThreshold_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  oldProposalThreshold_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<ProposalThresholdSet_filter>>>;
  transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum ProposalThresholdSet_orderBy {
  blockNumber = "blockNumber",
  blockTimestamp = "blockTimestamp",
  id = "id",
  newProposalThreshold = "newProposalThreshold",
  oldProposalThreshold = "oldProposalThreshold",
  transactionHash = "transactionHash",
}

export type ProposalVetoed = {
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  /**
   * Record ID.
   *
   * A proposal can only be vetoed once, so the record ID can be the proposal ID and not have any clashes.
   *
   * Format: `{proposalId}`
   *
   */
  id: Scalars["String"]["output"];
  proposal: ProposalCreated;
  proposalId: Scalars["BigInt"]["output"];
  transactionHash: Scalars["Bytes"]["output"];
};

export type ProposalVetoed_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ProposalVetoed_filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  id_contains?: InputMaybe<Scalars["String"]["input"]>;
  id_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  id_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_gt?: InputMaybe<Scalars["String"]["input"]>;
  id_gte?: InputMaybe<Scalars["String"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id_lt?: InputMaybe<Scalars["String"]["input"]>;
  id_lte?: InputMaybe<Scalars["String"]["input"]>;
  id_not?: InputMaybe<Scalars["String"]["input"]>;
  id_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  id_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  id_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<ProposalVetoed_filter>>>;
  proposal?: InputMaybe<Scalars["String"]["input"]>;
  proposalId?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  proposalId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  proposal_?: InputMaybe<ProposalCreated_filter>;
  proposal_contains?: InputMaybe<Scalars["String"]["input"]>;
  proposal_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  proposal_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  proposal_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  proposal_gt?: InputMaybe<Scalars["String"]["input"]>;
  proposal_gte?: InputMaybe<Scalars["String"]["input"]>;
  proposal_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  proposal_lt?: InputMaybe<Scalars["String"]["input"]>;
  proposal_lte?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  proposal_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  proposal_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  proposal_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum ProposalVetoed_orderBy {
  blockNumber = "blockNumber",
  blockTimestamp = "blockTimestamp",
  id = "id",
  proposal = "proposal",
  proposalId = "proposalId",
  proposal__blockNumber = "proposal__blockNumber",
  proposal__blockTimestamp = "proposal__blockTimestamp",
  proposal__description = "proposal__description",
  proposal__id = "proposal__id",
  proposal__proposalId = "proposal__proposalId",
  proposal__proposer = "proposal__proposer",
  proposal__startBlock = "proposal__startBlock",
  proposal__transactionHash = "proposal__transactionHash",
  transactionHash = "transactionHash",
}

export type ProposalVotingStarted = {
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  /**
   * Record ID.
   *
   * A proposal can only have voting started once, so the record ID can be the proposal ID and not have any clashes.
   *
   * Format: `{proposalId}`
   *
   */
  id: Scalars["String"]["output"];
  proposal: ProposalCreated;
  proposalId: Scalars["BigInt"]["output"];
  transactionHash: Scalars["Bytes"]["output"];
};

export type ProposalVotingStarted_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ProposalVotingStarted_filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  id_contains?: InputMaybe<Scalars["String"]["input"]>;
  id_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  id_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_gt?: InputMaybe<Scalars["String"]["input"]>;
  id_gte?: InputMaybe<Scalars["String"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id_lt?: InputMaybe<Scalars["String"]["input"]>;
  id_lte?: InputMaybe<Scalars["String"]["input"]>;
  id_not?: InputMaybe<Scalars["String"]["input"]>;
  id_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  id_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  id_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<ProposalVotingStarted_filter>>>;
  proposal?: InputMaybe<Scalars["String"]["input"]>;
  proposalId?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  proposalId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  proposal_?: InputMaybe<ProposalCreated_filter>;
  proposal_contains?: InputMaybe<Scalars["String"]["input"]>;
  proposal_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  proposal_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  proposal_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  proposal_gt?: InputMaybe<Scalars["String"]["input"]>;
  proposal_gte?: InputMaybe<Scalars["String"]["input"]>;
  proposal_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  proposal_lt?: InputMaybe<Scalars["String"]["input"]>;
  proposal_lte?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  proposal_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  proposal_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  proposal_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum ProposalVotingStarted_orderBy {
  blockNumber = "blockNumber",
  blockTimestamp = "blockTimestamp",
  id = "id",
  proposal = "proposal",
  proposalId = "proposalId",
  proposal__blockNumber = "proposal__blockNumber",
  proposal__blockTimestamp = "proposal__blockTimestamp",
  proposal__description = "proposal__description",
  proposal__id = "proposal__id",
  proposal__proposalId = "proposal__proposalId",
  proposal__proposer = "proposal__proposer",
  proposal__startBlock = "proposal__startBlock",
  proposal__transactionHash = "proposal__transactionHash",
  transactionHash = "transactionHash",
}

export type Query = {
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  newAdmin?: Maybe<NewAdmin>;
  newAdmins: Array<NewAdmin>;
  newImplementation?: Maybe<NewImplementation>;
  newImplementations: Array<NewImplementation>;
  newPendingAdmin?: Maybe<NewPendingAdmin>;
  newPendingAdmins: Array<NewPendingAdmin>;
  proposalCanceled?: Maybe<ProposalCanceled>;
  proposalCanceleds: Array<ProposalCanceled>;
  proposalCreated?: Maybe<ProposalCreated>;
  proposalCreateds: Array<ProposalCreated>;
  proposalExecuted?: Maybe<ProposalExecuted>;
  proposalExecuteds: Array<ProposalExecuted>;
  proposalQueued?: Maybe<ProposalQueued>;
  proposalQueueds: Array<ProposalQueued>;
  proposalThresholdSet?: Maybe<ProposalThresholdSet>;
  proposalThresholdSets: Array<ProposalThresholdSet>;
  proposalVetoed?: Maybe<ProposalVetoed>;
  proposalVetoeds: Array<ProposalVetoed>;
  proposalVotingStarted?: Maybe<ProposalVotingStarted>;
  proposalVotingStarteds: Array<ProposalVotingStarted>;
  vetoGuardianSet?: Maybe<VetoGuardianSet>;
  vetoGuardianSets: Array<VetoGuardianSet>;
  voteCast?: Maybe<VoteCast>;
  voteCasts: Array<VoteCast>;
  votingDelaySet?: Maybe<VotingDelaySet>;
  votingDelaySets: Array<VotingDelaySet>;
  votingPeriodSet?: Maybe<VotingPeriodSet>;
  votingPeriodSets: Array<VotingPeriodSet>;
  whitelistAccountExpirationSet?: Maybe<WhitelistAccountExpirationSet>;
  whitelistAccountExpirationSets: Array<WhitelistAccountExpirationSet>;
  whitelistGuardianSet?: Maybe<WhitelistGuardianSet>;
  whitelistGuardianSets: Array<WhitelistGuardianSet>;
};

export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type QuerynewAdminArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerynewAdminsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<NewAdmin_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NewAdmin_filter>;
};

export type QuerynewImplementationArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerynewImplementationsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<NewImplementation_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NewImplementation_filter>;
};

export type QuerynewPendingAdminArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerynewPendingAdminsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<NewPendingAdmin_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NewPendingAdmin_filter>;
};

export type QueryproposalCanceledArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryproposalCanceledsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ProposalCanceled_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProposalCanceled_filter>;
};

export type QueryproposalCreatedArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryproposalCreatedsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ProposalCreated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProposalCreated_filter>;
};

export type QueryproposalExecutedArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryproposalExecutedsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ProposalExecuted_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProposalExecuted_filter>;
};

export type QueryproposalQueuedArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryproposalQueuedsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ProposalQueued_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProposalQueued_filter>;
};

export type QueryproposalThresholdSetArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryproposalThresholdSetsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ProposalThresholdSet_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProposalThresholdSet_filter>;
};

export type QueryproposalVetoedArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryproposalVetoedsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ProposalVetoed_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProposalVetoed_filter>;
};

export type QueryproposalVotingStartedArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryproposalVotingStartedsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ProposalVotingStarted_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProposalVotingStarted_filter>;
};

export type QueryvetoGuardianSetArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryvetoGuardianSetsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VetoGuardianSet_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VetoGuardianSet_filter>;
};

export type QueryvoteCastArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryvoteCastsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VoteCast_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VoteCast_filter>;
};

export type QueryvotingDelaySetArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryvotingDelaySetsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VotingDelaySet_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VotingDelaySet_filter>;
};

export type QueryvotingPeriodSetArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryvotingPeriodSetsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VotingPeriodSet_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VotingPeriodSet_filter>;
};

export type QuerywhitelistAccountExpirationSetArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerywhitelistAccountExpirationSetsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<WhitelistAccountExpirationSet_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WhitelistAccountExpirationSet_filter>;
};

export type QuerywhitelistGuardianSetArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerywhitelistGuardianSetsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<WhitelistGuardianSet_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WhitelistGuardianSet_filter>;
};

export type Subscription = {
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  newAdmin?: Maybe<NewAdmin>;
  newAdmins: Array<NewAdmin>;
  newImplementation?: Maybe<NewImplementation>;
  newImplementations: Array<NewImplementation>;
  newPendingAdmin?: Maybe<NewPendingAdmin>;
  newPendingAdmins: Array<NewPendingAdmin>;
  proposalCanceled?: Maybe<ProposalCanceled>;
  proposalCanceleds: Array<ProposalCanceled>;
  proposalCreated?: Maybe<ProposalCreated>;
  proposalCreateds: Array<ProposalCreated>;
  proposalExecuted?: Maybe<ProposalExecuted>;
  proposalExecuteds: Array<ProposalExecuted>;
  proposalQueued?: Maybe<ProposalQueued>;
  proposalQueueds: Array<ProposalQueued>;
  proposalThresholdSet?: Maybe<ProposalThresholdSet>;
  proposalThresholdSets: Array<ProposalThresholdSet>;
  proposalVetoed?: Maybe<ProposalVetoed>;
  proposalVetoeds: Array<ProposalVetoed>;
  proposalVotingStarted?: Maybe<ProposalVotingStarted>;
  proposalVotingStarteds: Array<ProposalVotingStarted>;
  vetoGuardianSet?: Maybe<VetoGuardianSet>;
  vetoGuardianSets: Array<VetoGuardianSet>;
  voteCast?: Maybe<VoteCast>;
  voteCasts: Array<VoteCast>;
  votingDelaySet?: Maybe<VotingDelaySet>;
  votingDelaySets: Array<VotingDelaySet>;
  votingPeriodSet?: Maybe<VotingPeriodSet>;
  votingPeriodSets: Array<VotingPeriodSet>;
  whitelistAccountExpirationSet?: Maybe<WhitelistAccountExpirationSet>;
  whitelistAccountExpirationSets: Array<WhitelistAccountExpirationSet>;
  whitelistGuardianSet?: Maybe<WhitelistGuardianSet>;
  whitelistGuardianSets: Array<WhitelistGuardianSet>;
};

export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type SubscriptionnewAdminArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionnewAdminsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<NewAdmin_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NewAdmin_filter>;
};

export type SubscriptionnewImplementationArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionnewImplementationsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<NewImplementation_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NewImplementation_filter>;
};

export type SubscriptionnewPendingAdminArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionnewPendingAdminsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<NewPendingAdmin_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NewPendingAdmin_filter>;
};

export type SubscriptionproposalCanceledArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionproposalCanceledsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ProposalCanceled_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProposalCanceled_filter>;
};

export type SubscriptionproposalCreatedArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionproposalCreatedsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ProposalCreated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProposalCreated_filter>;
};

export type SubscriptionproposalExecutedArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionproposalExecutedsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ProposalExecuted_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProposalExecuted_filter>;
};

export type SubscriptionproposalQueuedArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionproposalQueuedsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ProposalQueued_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProposalQueued_filter>;
};

export type SubscriptionproposalThresholdSetArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionproposalThresholdSetsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ProposalThresholdSet_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProposalThresholdSet_filter>;
};

export type SubscriptionproposalVetoedArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionproposalVetoedsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ProposalVetoed_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProposalVetoed_filter>;
};

export type SubscriptionproposalVotingStartedArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionproposalVotingStartedsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ProposalVotingStarted_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProposalVotingStarted_filter>;
};

export type SubscriptionvetoGuardianSetArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionvetoGuardianSetsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VetoGuardianSet_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VetoGuardianSet_filter>;
};

export type SubscriptionvoteCastArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionvoteCastsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VoteCast_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VoteCast_filter>;
};

export type SubscriptionvotingDelaySetArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionvotingDelaySetsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VotingDelaySet_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VotingDelaySet_filter>;
};

export type SubscriptionvotingPeriodSetArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionvotingPeriodSetsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VotingPeriodSet_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VotingPeriodSet_filter>;
};

export type SubscriptionwhitelistAccountExpirationSetArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionwhitelistAccountExpirationSetsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<WhitelistAccountExpirationSet_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WhitelistAccountExpirationSet_filter>;
};

export type SubscriptionwhitelistGuardianSetArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionwhitelistGuardianSetsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<WhitelistGuardianSet_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WhitelistGuardianSet_filter>;
};

export type VetoGuardianSet = {
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  id: Scalars["Bytes"]["output"];
  newGuardian: Scalars["Bytes"]["output"];
  oldGuardian: Scalars["Bytes"]["output"];
  transactionHash: Scalars["Bytes"]["output"];
};

export type VetoGuardianSet_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<VetoGuardianSet_filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  id_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  newGuardian?: InputMaybe<Scalars["Bytes"]["input"]>;
  newGuardian_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  newGuardian_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  newGuardian_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  newGuardian_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  newGuardian_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  newGuardian_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  newGuardian_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  newGuardian_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  newGuardian_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  oldGuardian?: InputMaybe<Scalars["Bytes"]["input"]>;
  oldGuardian_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  oldGuardian_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  oldGuardian_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  oldGuardian_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  oldGuardian_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  oldGuardian_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  oldGuardian_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  oldGuardian_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  oldGuardian_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<VetoGuardianSet_filter>>>;
  transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum VetoGuardianSet_orderBy {
  blockNumber = "blockNumber",
  blockTimestamp = "blockTimestamp",
  id = "id",
  newGuardian = "newGuardian",
  oldGuardian = "oldGuardian",
  transactionHash = "transactionHash",
}

export type VoteCast = {
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  /**
   * Record ID.
   *
   * Format: `{proposalId}-{voter}-{transactionHash}-{logIndex}`
   *
   */
  id: Scalars["String"]["output"];
  proposal: ProposalCreated;
  proposalId: Scalars["BigInt"]["output"];
  reason: Scalars["String"]["output"];
  support: Scalars["Int"]["output"];
  transactionHash: Scalars["Bytes"]["output"];
  voter: Scalars["Bytes"]["output"];
  votes: Scalars["BigInt"]["output"];
};

export type VoteCast_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<VoteCast_filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  id_contains?: InputMaybe<Scalars["String"]["input"]>;
  id_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  id_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_gt?: InputMaybe<Scalars["String"]["input"]>;
  id_gte?: InputMaybe<Scalars["String"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id_lt?: InputMaybe<Scalars["String"]["input"]>;
  id_lte?: InputMaybe<Scalars["String"]["input"]>;
  id_not?: InputMaybe<Scalars["String"]["input"]>;
  id_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  id_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  id_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  id_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<VoteCast_filter>>>;
  proposal?: InputMaybe<Scalars["String"]["input"]>;
  proposalId?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  proposalId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  proposal_?: InputMaybe<ProposalCreated_filter>;
  proposal_contains?: InputMaybe<Scalars["String"]["input"]>;
  proposal_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  proposal_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  proposal_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  proposal_gt?: InputMaybe<Scalars["String"]["input"]>;
  proposal_gte?: InputMaybe<Scalars["String"]["input"]>;
  proposal_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  proposal_lt?: InputMaybe<Scalars["String"]["input"]>;
  proposal_lte?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  proposal_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  proposal_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  proposal_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  proposal_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  reason?: InputMaybe<Scalars["String"]["input"]>;
  reason_contains?: InputMaybe<Scalars["String"]["input"]>;
  reason_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  reason_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  reason_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  reason_gt?: InputMaybe<Scalars["String"]["input"]>;
  reason_gte?: InputMaybe<Scalars["String"]["input"]>;
  reason_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  reason_lt?: InputMaybe<Scalars["String"]["input"]>;
  reason_lte?: InputMaybe<Scalars["String"]["input"]>;
  reason_not?: InputMaybe<Scalars["String"]["input"]>;
  reason_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  reason_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  reason_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  reason_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  reason_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  reason_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  reason_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  reason_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  reason_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  support?: InputMaybe<Scalars["Int"]["input"]>;
  support_gt?: InputMaybe<Scalars["Int"]["input"]>;
  support_gte?: InputMaybe<Scalars["Int"]["input"]>;
  support_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  support_lt?: InputMaybe<Scalars["Int"]["input"]>;
  support_lte?: InputMaybe<Scalars["Int"]["input"]>;
  support_not?: InputMaybe<Scalars["Int"]["input"]>;
  support_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  voter?: InputMaybe<Scalars["Bytes"]["input"]>;
  voter_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  voter_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  voter_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  voter_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  voter_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  voter_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  voter_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  voter_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  voter_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  votes?: InputMaybe<Scalars["BigInt"]["input"]>;
  votes_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  votes_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  votes_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  votes_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  votes_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  votes_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  votes_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum VoteCast_orderBy {
  blockNumber = "blockNumber",
  blockTimestamp = "blockTimestamp",
  id = "id",
  proposal = "proposal",
  proposalId = "proposalId",
  proposal__blockNumber = "proposal__blockNumber",
  proposal__blockTimestamp = "proposal__blockTimestamp",
  proposal__description = "proposal__description",
  proposal__id = "proposal__id",
  proposal__proposalId = "proposal__proposalId",
  proposal__proposer = "proposal__proposer",
  proposal__startBlock = "proposal__startBlock",
  proposal__transactionHash = "proposal__transactionHash",
  reason = "reason",
  support = "support",
  transactionHash = "transactionHash",
  voter = "voter",
  votes = "votes",
}

export type VotingDelaySet = {
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  id: Scalars["Bytes"]["output"];
  newVotingDelay: Scalars["BigInt"]["output"];
  oldVotingDelay: Scalars["BigInt"]["output"];
  transactionHash: Scalars["Bytes"]["output"];
};

export type VotingDelaySet_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<VotingDelaySet_filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  id_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  newVotingDelay?: InputMaybe<Scalars["BigInt"]["input"]>;
  newVotingDelay_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  newVotingDelay_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  newVotingDelay_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  newVotingDelay_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  newVotingDelay_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  newVotingDelay_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  newVotingDelay_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  oldVotingDelay?: InputMaybe<Scalars["BigInt"]["input"]>;
  oldVotingDelay_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  oldVotingDelay_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  oldVotingDelay_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  oldVotingDelay_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  oldVotingDelay_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  oldVotingDelay_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  oldVotingDelay_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<VotingDelaySet_filter>>>;
  transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum VotingDelaySet_orderBy {
  blockNumber = "blockNumber",
  blockTimestamp = "blockTimestamp",
  id = "id",
  newVotingDelay = "newVotingDelay",
  oldVotingDelay = "oldVotingDelay",
  transactionHash = "transactionHash",
}

export type VotingPeriodSet = {
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  id: Scalars["Bytes"]["output"];
  newVotingPeriod: Scalars["BigInt"]["output"];
  oldVotingPeriod: Scalars["BigInt"]["output"];
  transactionHash: Scalars["Bytes"]["output"];
};

export type VotingPeriodSet_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<VotingPeriodSet_filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  id_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  newVotingPeriod?: InputMaybe<Scalars["BigInt"]["input"]>;
  newVotingPeriod_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  newVotingPeriod_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  newVotingPeriod_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  newVotingPeriod_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  newVotingPeriod_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  newVotingPeriod_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  newVotingPeriod_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  oldVotingPeriod?: InputMaybe<Scalars["BigInt"]["input"]>;
  oldVotingPeriod_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  oldVotingPeriod_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  oldVotingPeriod_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  oldVotingPeriod_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  oldVotingPeriod_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  oldVotingPeriod_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  oldVotingPeriod_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<VotingPeriodSet_filter>>>;
  transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum VotingPeriodSet_orderBy {
  blockNumber = "blockNumber",
  blockTimestamp = "blockTimestamp",
  id = "id",
  newVotingPeriod = "newVotingPeriod",
  oldVotingPeriod = "oldVotingPeriod",
  transactionHash = "transactionHash",
}

export type WhitelistAccountExpirationSet = {
  account: Scalars["Bytes"]["output"];
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  expiration: Scalars["BigInt"]["output"];
  id: Scalars["Bytes"]["output"];
  transactionHash: Scalars["Bytes"]["output"];
};

export type WhitelistAccountExpirationSet_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars["Bytes"]["input"]>;
  account_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  account_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  account_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  account_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  account_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  account_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  account_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  account_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  account_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<WhitelistAccountExpirationSet_filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  expiration?: InputMaybe<Scalars["BigInt"]["input"]>;
  expiration_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  expiration_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  expiration_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  expiration_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  expiration_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  expiration_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  expiration_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  id_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<WhitelistAccountExpirationSet_filter>>>;
  transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum WhitelistAccountExpirationSet_orderBy {
  account = "account",
  blockNumber = "blockNumber",
  blockTimestamp = "blockTimestamp",
  expiration = "expiration",
  id = "id",
  transactionHash = "transactionHash",
}

export type WhitelistGuardianSet = {
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  id: Scalars["Bytes"]["output"];
  newGuardian: Scalars["Bytes"]["output"];
  oldGuardian: Scalars["Bytes"]["output"];
  transactionHash: Scalars["Bytes"]["output"];
};

export type WhitelistGuardianSet_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<WhitelistGuardianSet_filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  id_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  newGuardian?: InputMaybe<Scalars["Bytes"]["input"]>;
  newGuardian_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  newGuardian_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  newGuardian_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  newGuardian_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  newGuardian_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  newGuardian_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  newGuardian_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  newGuardian_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  newGuardian_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  oldGuardian?: InputMaybe<Scalars["Bytes"]["input"]>;
  oldGuardian_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  oldGuardian_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  oldGuardian_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  oldGuardian_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  oldGuardian_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  oldGuardian_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  oldGuardian_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  oldGuardian_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  oldGuardian_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<WhitelistGuardianSet_filter>>>;
  transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum WhitelistGuardianSet_orderBy {
  blockNumber = "blockNumber",
  blockTimestamp = "blockTimestamp",
  id = "id",
  newGuardian = "newGuardian",
  oldGuardian = "oldGuardian",
  transactionHash = "transactionHash",
}

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars["Bytes"]["output"]>;
  /** The block number */
  number: Scalars["Int"]["output"];
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars["Bytes"]["output"]>;
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars["Int"]["output"]>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars["String"]["output"];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars["Boolean"]["output"];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  allow = "allow",
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  deny = "deny",
}

export type CreatedProposalFragment = {
  id: string;
  blockNumber: string;
  blockTimestamp: string;
  description: string;
  proposalId: string;
  proposer: string;
  transactionHash: string;
  calldatas: Array<string>;
  targets: Array<string>;
  values: Array<string>;
  signatures: Array<string>;
  startBlock: string;
};

export type ProposalQueryQueryVariables = Exact<{
  block: Scalars["BigInt"]["input"];
}>;

export type ProposalQueryQuery = {
  proposalCreateds: Array<{
    id: string;
    blockNumber: string;
    blockTimestamp: string;
    description: string;
    proposalId: string;
    proposer: string;
    transactionHash: string;
    calldatas: Array<string>;
    targets: Array<string>;
    values: Array<string>;
    signatures: Array<string>;
    startBlock: string;
  }>;
  proposalCanceleds: Array<{
    id: string;
    blockNumber: string;
    blockTimestamp: string;
    proposalId: string;
    transactionHash: string;
    proposal: {
      id: string;
      blockNumber: string;
      blockTimestamp: string;
      description: string;
      proposalId: string;
      proposer: string;
      transactionHash: string;
      calldatas: Array<string>;
      targets: Array<string>;
      values: Array<string>;
      signatures: Array<string>;
      startBlock: string;
    };
  }>;
  proposalExecuteds: Array<{
    id: string;
    blockNumber: string;
    blockTimestamp: string;
    proposalId: string;
    transactionHash: string;
    proposal: {
      id: string;
      blockNumber: string;
      blockTimestamp: string;
      description: string;
      proposalId: string;
      proposer: string;
      transactionHash: string;
      calldatas: Array<string>;
      targets: Array<string>;
      values: Array<string>;
      signatures: Array<string>;
      startBlock: string;
    };
  }>;
  proposalQueueds: Array<{
    id: string;
    blockNumber: string;
    blockTimestamp: string;
    proposalId: string;
    transactionHash: string;
    eta: string;
    proposal: {
      id: string;
      blockNumber: string;
      blockTimestamp: string;
      description: string;
      proposalId: string;
      proposer: string;
      transactionHash: string;
      calldatas: Array<string>;
      targets: Array<string>;
      values: Array<string>;
      signatures: Array<string>;
      startBlock: string;
    };
  }>;
  proposalVetoeds: Array<{
    id: string;
    blockNumber: string;
    blockTimestamp: string;
    proposalId: string;
    transactionHash: string;
    proposal: {
      id: string;
      blockNumber: string;
      blockTimestamp: string;
      description: string;
      proposalId: string;
      proposer: string;
      transactionHash: string;
      calldatas: Array<string>;
      targets: Array<string>;
      values: Array<string>;
      signatures: Array<string>;
      startBlock: string;
    };
  }>;
  proposalVotingStarteds: Array<{
    id: string;
    blockNumber: string;
    blockTimestamp: string;
    proposalId: string;
    transactionHash: string;
    proposal: {
      id: string;
      blockNumber: string;
      blockTimestamp: string;
      description: string;
      proposalId: string;
      proposer: string;
      transactionHash: string;
      calldatas: Array<string>;
      targets: Array<string>;
      values: Array<string>;
      signatures: Array<string>;
      startBlock: string;
    };
  }>;
  _meta?: { block: { number: number } } | null;
};

export const CreatedProposalFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "CreatedProposal" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ProposalCreated" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "blockNumber" } },
          { kind: "Field", name: { kind: "Name", value: "blockTimestamp" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          { kind: "Field", name: { kind: "Name", value: "proposalId" } },
          { kind: "Field", name: { kind: "Name", value: "proposer" } },
          { kind: "Field", name: { kind: "Name", value: "transactionHash" } },
          { kind: "Field", name: { kind: "Name", value: "calldatas" } },
          { kind: "Field", name: { kind: "Name", value: "targets" } },
          { kind: "Field", name: { kind: "Name", value: "values" } },
          { kind: "Field", name: { kind: "Name", value: "signatures" } },
          { kind: "Field", name: { kind: "Name", value: "startBlock" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreatedProposalFragment, unknown>;
export const ProposalQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ProposalQuery" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "block" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "BigInt" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "proposalCreateds" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "blockNumber_gt" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "block" },
                      },
                    },
                  ],
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderBy" },
                value: { kind: "EnumValue", value: "blockNumber" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderDirection" },
                value: { kind: "EnumValue", value: "asc" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "CreatedProposal" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "proposalCanceleds" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "blockNumber_gt" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "block" },
                      },
                    },
                  ],
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderBy" },
                value: { kind: "EnumValue", value: "blockNumber" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderDirection" },
                value: { kind: "EnumValue", value: "asc" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "blockNumber" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "blockTimestamp" },
                },
                { kind: "Field", name: { kind: "Name", value: "proposalId" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "transactionHash" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "proposal" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "CreatedProposal" },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "proposalExecuteds" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "blockNumber_gt" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "block" },
                      },
                    },
                  ],
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderBy" },
                value: { kind: "EnumValue", value: "blockNumber" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderDirection" },
                value: { kind: "EnumValue", value: "asc" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "blockNumber" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "blockTimestamp" },
                },
                { kind: "Field", name: { kind: "Name", value: "proposalId" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "transactionHash" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "proposal" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "CreatedProposal" },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "proposalQueueds" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "blockNumber_gt" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "block" },
                      },
                    },
                  ],
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderBy" },
                value: { kind: "EnumValue", value: "blockNumber" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderDirection" },
                value: { kind: "EnumValue", value: "asc" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "blockNumber" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "blockTimestamp" },
                },
                { kind: "Field", name: { kind: "Name", value: "proposalId" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "transactionHash" },
                },
                { kind: "Field", name: { kind: "Name", value: "eta" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "proposal" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "CreatedProposal" },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "proposalVetoeds" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "blockNumber_gt" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "block" },
                      },
                    },
                  ],
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderBy" },
                value: { kind: "EnumValue", value: "blockNumber" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderDirection" },
                value: { kind: "EnumValue", value: "asc" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "blockNumber" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "blockTimestamp" },
                },
                { kind: "Field", name: { kind: "Name", value: "proposalId" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "transactionHash" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "proposal" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "CreatedProposal" },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "proposalVotingStarteds" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "blockNumber_gt" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "block" },
                      },
                    },
                  ],
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderBy" },
                value: { kind: "EnumValue", value: "blockNumber" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderDirection" },
                value: { kind: "EnumValue", value: "asc" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "blockNumber" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "blockTimestamp" },
                },
                { kind: "Field", name: { kind: "Name", value: "proposalId" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "transactionHash" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "proposal" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "CreatedProposal" },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "_meta" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "block" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "number" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "CreatedProposal" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ProposalCreated" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "blockNumber" } },
          { kind: "Field", name: { kind: "Name", value: "blockTimestamp" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          { kind: "Field", name: { kind: "Name", value: "proposalId" } },
          { kind: "Field", name: { kind: "Name", value: "proposer" } },
          { kind: "Field", name: { kind: "Name", value: "transactionHash" } },
          { kind: "Field", name: { kind: "Name", value: "calldatas" } },
          { kind: "Field", name: { kind: "Name", value: "targets" } },
          { kind: "Field", name: { kind: "Name", value: "values" } },
          { kind: "Field", name: { kind: "Name", value: "signatures" } },
          { kind: "Field", name: { kind: "Name", value: "startBlock" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProposalQueryQuery, ProposalQueryQueryVariables>;
