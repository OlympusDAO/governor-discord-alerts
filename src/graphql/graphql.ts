/* eslint-disable */
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
  BigDecimal: { input: any; output: any };
  BigInt: { input: any; output: any };
  Bytes: { input: any; output: any };
  /**
   * 8 bytes signed integer
   *
   */
  Int8: { input: any; output: any };
  /**
   * A string representation of microseconds UNIX timestamp (16 digits)
   *
   */
  Timestamp: { input: any; output: any };
};

export enum Aggregation_Interval {
  Day = "day",
  Hour = "hour",
}

export type BlockChangedFilter = {
  number_gte: Scalars["Int"]["input"];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars["Bytes"]["input"]>;
  number?: InputMaybe<Scalars["Int"]["input"]>;
  number_gte?: InputMaybe<Scalars["Int"]["input"]>;
};

export type NewAdmin = {
  __typename?: "NewAdmin";
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  id: Scalars["Bytes"]["output"];
  newAdmin: Scalars["Bytes"]["output"];
  oldAdmin: Scalars["Bytes"]["output"];
  transactionHash: Scalars["Bytes"]["output"];
};

export type NewAdmin_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<NewAdmin_Filter>>>;
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
  or?: InputMaybe<Array<InputMaybe<NewAdmin_Filter>>>;
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

export enum NewAdmin_OrderBy {
  BlockNumber = "blockNumber",
  BlockTimestamp = "blockTimestamp",
  Id = "id",
  NewAdmin = "newAdmin",
  OldAdmin = "oldAdmin",
  TransactionHash = "transactionHash",
}

export type NewImplementation = {
  __typename?: "NewImplementation";
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  id: Scalars["Bytes"]["output"];
  newImplementation: Scalars["Bytes"]["output"];
  oldImplementation: Scalars["Bytes"]["output"];
  transactionHash: Scalars["Bytes"]["output"];
};

export type NewImplementation_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<NewImplementation_Filter>>>;
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
  or?: InputMaybe<Array<InputMaybe<NewImplementation_Filter>>>;
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

export enum NewImplementation_OrderBy {
  BlockNumber = "blockNumber",
  BlockTimestamp = "blockTimestamp",
  Id = "id",
  NewImplementation = "newImplementation",
  OldImplementation = "oldImplementation",
  TransactionHash = "transactionHash",
}

export type NewPendingAdmin = {
  __typename?: "NewPendingAdmin";
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  id: Scalars["Bytes"]["output"];
  newPendingAdmin: Scalars["Bytes"]["output"];
  oldPendingAdmin: Scalars["Bytes"]["output"];
  transactionHash: Scalars["Bytes"]["output"];
};

export type NewPendingAdmin_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<NewPendingAdmin_Filter>>>;
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
  or?: InputMaybe<Array<InputMaybe<NewPendingAdmin_Filter>>>;
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

export enum NewPendingAdmin_OrderBy {
  BlockNumber = "blockNumber",
  BlockTimestamp = "blockTimestamp",
  Id = "id",
  NewPendingAdmin = "newPendingAdmin",
  OldPendingAdmin = "oldPendingAdmin",
  TransactionHash = "transactionHash",
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = "asc",
  Desc = "desc",
}

export type ProposalCanceled = {
  __typename?: "ProposalCanceled";
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  id: Scalars["Bytes"]["output"];
  proposal: ProposalCreated;
  proposalId: Scalars["BigInt"]["output"];
  transactionHash: Scalars["Bytes"]["output"];
};

export type ProposalCanceled_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ProposalCanceled_Filter>>>;
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
  or?: InputMaybe<Array<InputMaybe<ProposalCanceled_Filter>>>;
  proposal?: InputMaybe<Scalars["String"]["input"]>;
  proposalId?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  proposalId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  proposal_?: InputMaybe<ProposalCreated_Filter>;
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

export enum ProposalCanceled_OrderBy {
  BlockNumber = "blockNumber",
  BlockTimestamp = "blockTimestamp",
  Id = "id",
  Proposal = "proposal",
  ProposalId = "proposalId",
  ProposalBlockNumber = "proposal__blockNumber",
  ProposalBlockTimestamp = "proposal__blockTimestamp",
  ProposalDescription = "proposal__description",
  ProposalId = "proposal__id",
  ProposalProposalId = "proposal__proposalId",
  ProposalProposer = "proposal__proposer",
  ProposalStartBlock = "proposal__startBlock",
  ProposalTransactionHash = "proposal__transactionHash",
  TransactionHash = "transactionHash",
}

export type ProposalCreated = {
  __typename?: "ProposalCreated";
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  calldatas: Array<Scalars["Bytes"]["output"]>;
  cancelled?: Maybe<ProposalCanceled>;
  description: Scalars["String"]["output"];
  executed?: Maybe<ProposalExecuted>;
  id: Scalars["Bytes"]["output"];
  proposalId: Scalars["BigInt"]["output"];
  proposer: Scalars["Bytes"]["output"];
  queued?: Maybe<ProposalQueued>;
  signatures: Array<Scalars["String"]["output"]>;
  startBlock: Scalars["BigInt"]["output"];
  targets: Array<Scalars["Bytes"]["output"]>;
  transactionHash: Scalars["Bytes"]["output"];
  values: Array<Scalars["BigInt"]["output"]>;
  vetoed?: Maybe<ProposalVetoed>;
  votingStarted?: Maybe<ProposalVotingStarted>;
};

export type ProposalCreated_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ProposalCreated_Filter>>>;
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
  cancelled_?: InputMaybe<ProposalCanceled_Filter>;
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
  executed_?: InputMaybe<ProposalExecuted_Filter>;
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
  or?: InputMaybe<Array<InputMaybe<ProposalCreated_Filter>>>;
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
  queued_?: InputMaybe<ProposalQueued_Filter>;
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
  vetoed_?: InputMaybe<ProposalVetoed_Filter>;
  votingStarted_?: InputMaybe<ProposalVotingStarted_Filter>;
};

export enum ProposalCreated_OrderBy {
  BlockNumber = "blockNumber",
  BlockTimestamp = "blockTimestamp",
  Calldatas = "calldatas",
  Cancelled = "cancelled",
  CancelledBlockNumber = "cancelled__blockNumber",
  CancelledBlockTimestamp = "cancelled__blockTimestamp",
  CancelledId = "cancelled__id",
  CancelledProposalId = "cancelled__proposalId",
  CancelledTransactionHash = "cancelled__transactionHash",
  Description = "description",
  Executed = "executed",
  ExecutedBlockNumber = "executed__blockNumber",
  ExecutedBlockTimestamp = "executed__blockTimestamp",
  ExecutedId = "executed__id",
  ExecutedProposalId = "executed__proposalId",
  ExecutedTransactionHash = "executed__transactionHash",
  Id = "id",
  ProposalId = "proposalId",
  Proposer = "proposer",
  Queued = "queued",
  QueuedBlockNumber = "queued__blockNumber",
  QueuedBlockTimestamp = "queued__blockTimestamp",
  QueuedEta = "queued__eta",
  QueuedId = "queued__id",
  QueuedProposalId = "queued__proposalId",
  QueuedTransactionHash = "queued__transactionHash",
  Signatures = "signatures",
  StartBlock = "startBlock",
  Targets = "targets",
  TransactionHash = "transactionHash",
  Values = "values",
  Vetoed = "vetoed",
  VetoedBlockNumber = "vetoed__blockNumber",
  VetoedBlockTimestamp = "vetoed__blockTimestamp",
  VetoedId = "vetoed__id",
  VetoedProposalId = "vetoed__proposalId",
  VetoedTransactionHash = "vetoed__transactionHash",
  VotingStarted = "votingStarted",
  VotingStartedBlockNumber = "votingStarted__blockNumber",
  VotingStartedBlockTimestamp = "votingStarted__blockTimestamp",
  VotingStartedId = "votingStarted__id",
  VotingStartedProposalId = "votingStarted__proposalId",
  VotingStartedTransactionHash = "votingStarted__transactionHash",
}

export type ProposalExecuted = {
  __typename?: "ProposalExecuted";
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  id: Scalars["Bytes"]["output"];
  proposal: ProposalCreated;
  proposalId: Scalars["BigInt"]["output"];
  transactionHash: Scalars["Bytes"]["output"];
};

export type ProposalExecuted_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ProposalExecuted_Filter>>>;
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
  or?: InputMaybe<Array<InputMaybe<ProposalExecuted_Filter>>>;
  proposal?: InputMaybe<Scalars["String"]["input"]>;
  proposalId?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  proposalId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  proposal_?: InputMaybe<ProposalCreated_Filter>;
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

export enum ProposalExecuted_OrderBy {
  BlockNumber = "blockNumber",
  BlockTimestamp = "blockTimestamp",
  Id = "id",
  Proposal = "proposal",
  ProposalId = "proposalId",
  ProposalBlockNumber = "proposal__blockNumber",
  ProposalBlockTimestamp = "proposal__blockTimestamp",
  ProposalDescription = "proposal__description",
  ProposalId = "proposal__id",
  ProposalProposalId = "proposal__proposalId",
  ProposalProposer = "proposal__proposer",
  ProposalStartBlock = "proposal__startBlock",
  ProposalTransactionHash = "proposal__transactionHash",
  TransactionHash = "transactionHash",
}

export type ProposalQueued = {
  __typename?: "ProposalQueued";
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  eta: Scalars["BigInt"]["output"];
  id: Scalars["Bytes"]["output"];
  proposal: ProposalCreated;
  proposalId: Scalars["BigInt"]["output"];
  transactionHash: Scalars["Bytes"]["output"];
};

export type ProposalQueued_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ProposalQueued_Filter>>>;
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
  or?: InputMaybe<Array<InputMaybe<ProposalQueued_Filter>>>;
  proposal?: InputMaybe<Scalars["String"]["input"]>;
  proposalId?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  proposalId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  proposal_?: InputMaybe<ProposalCreated_Filter>;
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

export enum ProposalQueued_OrderBy {
  BlockNumber = "blockNumber",
  BlockTimestamp = "blockTimestamp",
  Eta = "eta",
  Id = "id",
  Proposal = "proposal",
  ProposalId = "proposalId",
  ProposalBlockNumber = "proposal__blockNumber",
  ProposalBlockTimestamp = "proposal__blockTimestamp",
  ProposalDescription = "proposal__description",
  ProposalId = "proposal__id",
  ProposalProposalId = "proposal__proposalId",
  ProposalProposer = "proposal__proposer",
  ProposalStartBlock = "proposal__startBlock",
  ProposalTransactionHash = "proposal__transactionHash",
  TransactionHash = "transactionHash",
}

export type ProposalThresholdSet = {
  __typename?: "ProposalThresholdSet";
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  id: Scalars["Bytes"]["output"];
  newProposalThreshold: Scalars["BigInt"]["output"];
  oldProposalThreshold: Scalars["BigInt"]["output"];
  transactionHash: Scalars["Bytes"]["output"];
};

export type ProposalThresholdSet_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ProposalThresholdSet_Filter>>>;
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
  or?: InputMaybe<Array<InputMaybe<ProposalThresholdSet_Filter>>>;
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

export enum ProposalThresholdSet_OrderBy {
  BlockNumber = "blockNumber",
  BlockTimestamp = "blockTimestamp",
  Id = "id",
  NewProposalThreshold = "newProposalThreshold",
  OldProposalThreshold = "oldProposalThreshold",
  TransactionHash = "transactionHash",
}

export type ProposalVetoed = {
  __typename?: "ProposalVetoed";
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  id: Scalars["Bytes"]["output"];
  proposal: ProposalCreated;
  proposalId: Scalars["BigInt"]["output"];
  transactionHash: Scalars["Bytes"]["output"];
};

export type ProposalVetoed_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ProposalVetoed_Filter>>>;
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
  or?: InputMaybe<Array<InputMaybe<ProposalVetoed_Filter>>>;
  proposal?: InputMaybe<Scalars["String"]["input"]>;
  proposalId?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  proposalId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  proposal_?: InputMaybe<ProposalCreated_Filter>;
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

export enum ProposalVetoed_OrderBy {
  BlockNumber = "blockNumber",
  BlockTimestamp = "blockTimestamp",
  Id = "id",
  Proposal = "proposal",
  ProposalId = "proposalId",
  ProposalBlockNumber = "proposal__blockNumber",
  ProposalBlockTimestamp = "proposal__blockTimestamp",
  ProposalDescription = "proposal__description",
  ProposalId = "proposal__id",
  ProposalProposalId = "proposal__proposalId",
  ProposalProposer = "proposal__proposer",
  ProposalStartBlock = "proposal__startBlock",
  ProposalTransactionHash = "proposal__transactionHash",
  TransactionHash = "transactionHash",
}

export type ProposalVotingStarted = {
  __typename?: "ProposalVotingStarted";
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  id: Scalars["Bytes"]["output"];
  proposal: ProposalCreated;
  proposalId: Scalars["BigInt"]["output"];
  transactionHash: Scalars["Bytes"]["output"];
};

export type ProposalVotingStarted_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ProposalVotingStarted_Filter>>>;
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
  or?: InputMaybe<Array<InputMaybe<ProposalVotingStarted_Filter>>>;
  proposal?: InputMaybe<Scalars["String"]["input"]>;
  proposalId?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  proposalId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  proposal_?: InputMaybe<ProposalCreated_Filter>;
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

export enum ProposalVotingStarted_OrderBy {
  BlockNumber = "blockNumber",
  BlockTimestamp = "blockTimestamp",
  Id = "id",
  Proposal = "proposal",
  ProposalId = "proposalId",
  ProposalBlockNumber = "proposal__blockNumber",
  ProposalBlockTimestamp = "proposal__blockTimestamp",
  ProposalDescription = "proposal__description",
  ProposalId = "proposal__id",
  ProposalProposalId = "proposal__proposalId",
  ProposalProposer = "proposal__proposer",
  ProposalStartBlock = "proposal__startBlock",
  ProposalTransactionHash = "proposal__transactionHash",
  TransactionHash = "transactionHash",
}

export type Query = {
  __typename?: "Query";
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

export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type QueryNewAdminArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryNewAdminsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<NewAdmin_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NewAdmin_Filter>;
};

export type QueryNewImplementationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryNewImplementationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<NewImplementation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NewImplementation_Filter>;
};

export type QueryNewPendingAdminArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryNewPendingAdminsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<NewPendingAdmin_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NewPendingAdmin_Filter>;
};

export type QueryProposalCanceledArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryProposalCanceledsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ProposalCanceled_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProposalCanceled_Filter>;
};

export type QueryProposalCreatedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryProposalCreatedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ProposalCreated_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProposalCreated_Filter>;
};

export type QueryProposalExecutedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryProposalExecutedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ProposalExecuted_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProposalExecuted_Filter>;
};

export type QueryProposalQueuedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryProposalQueuedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ProposalQueued_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProposalQueued_Filter>;
};

export type QueryProposalThresholdSetArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryProposalThresholdSetsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ProposalThresholdSet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProposalThresholdSet_Filter>;
};

export type QueryProposalVetoedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryProposalVetoedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ProposalVetoed_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProposalVetoed_Filter>;
};

export type QueryProposalVotingStartedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryProposalVotingStartedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ProposalVotingStarted_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProposalVotingStarted_Filter>;
};

export type QueryVetoGuardianSetArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryVetoGuardianSetsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VetoGuardianSet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VetoGuardianSet_Filter>;
};

export type QueryVoteCastArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryVoteCastsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VoteCast_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VoteCast_Filter>;
};

export type QueryVotingDelaySetArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryVotingDelaySetsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VotingDelaySet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VotingDelaySet_Filter>;
};

export type QueryVotingPeriodSetArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryVotingPeriodSetsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VotingPeriodSet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VotingPeriodSet_Filter>;
};

export type QueryWhitelistAccountExpirationSetArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryWhitelistAccountExpirationSetsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<WhitelistAccountExpirationSet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WhitelistAccountExpirationSet_Filter>;
};

export type QueryWhitelistGuardianSetArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryWhitelistGuardianSetsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<WhitelistGuardianSet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WhitelistGuardianSet_Filter>;
};

export type Subscription = {
  __typename?: "Subscription";
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

export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type SubscriptionNewAdminArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionNewAdminsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<NewAdmin_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NewAdmin_Filter>;
};

export type SubscriptionNewImplementationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionNewImplementationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<NewImplementation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NewImplementation_Filter>;
};

export type SubscriptionNewPendingAdminArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionNewPendingAdminsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<NewPendingAdmin_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NewPendingAdmin_Filter>;
};

export type SubscriptionProposalCanceledArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionProposalCanceledsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ProposalCanceled_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProposalCanceled_Filter>;
};

export type SubscriptionProposalCreatedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionProposalCreatedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ProposalCreated_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProposalCreated_Filter>;
};

export type SubscriptionProposalExecutedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionProposalExecutedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ProposalExecuted_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProposalExecuted_Filter>;
};

export type SubscriptionProposalQueuedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionProposalQueuedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ProposalQueued_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProposalQueued_Filter>;
};

export type SubscriptionProposalThresholdSetArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionProposalThresholdSetsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ProposalThresholdSet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProposalThresholdSet_Filter>;
};

export type SubscriptionProposalVetoedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionProposalVetoedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ProposalVetoed_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProposalVetoed_Filter>;
};

export type SubscriptionProposalVotingStartedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionProposalVotingStartedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ProposalVotingStarted_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProposalVotingStarted_Filter>;
};

export type SubscriptionVetoGuardianSetArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionVetoGuardianSetsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VetoGuardianSet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VetoGuardianSet_Filter>;
};

export type SubscriptionVoteCastArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionVoteCastsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VoteCast_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VoteCast_Filter>;
};

export type SubscriptionVotingDelaySetArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionVotingDelaySetsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VotingDelaySet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VotingDelaySet_Filter>;
};

export type SubscriptionVotingPeriodSetArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionVotingPeriodSetsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VotingPeriodSet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VotingPeriodSet_Filter>;
};

export type SubscriptionWhitelistAccountExpirationSetArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionWhitelistAccountExpirationSetsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<WhitelistAccountExpirationSet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WhitelistAccountExpirationSet_Filter>;
};

export type SubscriptionWhitelistGuardianSetArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionWhitelistGuardianSetsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<WhitelistGuardianSet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WhitelistGuardianSet_Filter>;
};

export type VetoGuardianSet = {
  __typename?: "VetoGuardianSet";
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  id: Scalars["Bytes"]["output"];
  newGuardian: Scalars["Bytes"]["output"];
  oldGuardian: Scalars["Bytes"]["output"];
  transactionHash: Scalars["Bytes"]["output"];
};

export type VetoGuardianSet_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<VetoGuardianSet_Filter>>>;
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
  or?: InputMaybe<Array<InputMaybe<VetoGuardianSet_Filter>>>;
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

export enum VetoGuardianSet_OrderBy {
  BlockNumber = "blockNumber",
  BlockTimestamp = "blockTimestamp",
  Id = "id",
  NewGuardian = "newGuardian",
  OldGuardian = "oldGuardian",
  TransactionHash = "transactionHash",
}

export type VoteCast = {
  __typename?: "VoteCast";
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  id: Scalars["Bytes"]["output"];
  proposalId: Scalars["BigInt"]["output"];
  reason: Scalars["String"]["output"];
  support: Scalars["Int"]["output"];
  transactionHash: Scalars["Bytes"]["output"];
  voter: Scalars["Bytes"]["output"];
  votes: Scalars["BigInt"]["output"];
};

export type VoteCast_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<VoteCast_Filter>>>;
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
  or?: InputMaybe<Array<InputMaybe<VoteCast_Filter>>>;
  proposalId?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  proposalId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  proposalId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
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

export enum VoteCast_OrderBy {
  BlockNumber = "blockNumber",
  BlockTimestamp = "blockTimestamp",
  Id = "id",
  ProposalId = "proposalId",
  Reason = "reason",
  Support = "support",
  TransactionHash = "transactionHash",
  Voter = "voter",
  Votes = "votes",
}

export type VotingDelaySet = {
  __typename?: "VotingDelaySet";
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  id: Scalars["Bytes"]["output"];
  newVotingDelay: Scalars["BigInt"]["output"];
  oldVotingDelay: Scalars["BigInt"]["output"];
  transactionHash: Scalars["Bytes"]["output"];
};

export type VotingDelaySet_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<VotingDelaySet_Filter>>>;
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
  or?: InputMaybe<Array<InputMaybe<VotingDelaySet_Filter>>>;
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

export enum VotingDelaySet_OrderBy {
  BlockNumber = "blockNumber",
  BlockTimestamp = "blockTimestamp",
  Id = "id",
  NewVotingDelay = "newVotingDelay",
  OldVotingDelay = "oldVotingDelay",
  TransactionHash = "transactionHash",
}

export type VotingPeriodSet = {
  __typename?: "VotingPeriodSet";
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  id: Scalars["Bytes"]["output"];
  newVotingPeriod: Scalars["BigInt"]["output"];
  oldVotingPeriod: Scalars["BigInt"]["output"];
  transactionHash: Scalars["Bytes"]["output"];
};

export type VotingPeriodSet_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<VotingPeriodSet_Filter>>>;
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
  or?: InputMaybe<Array<InputMaybe<VotingPeriodSet_Filter>>>;
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

export enum VotingPeriodSet_OrderBy {
  BlockNumber = "blockNumber",
  BlockTimestamp = "blockTimestamp",
  Id = "id",
  NewVotingPeriod = "newVotingPeriod",
  OldVotingPeriod = "oldVotingPeriod",
  TransactionHash = "transactionHash",
}

export type WhitelistAccountExpirationSet = {
  __typename?: "WhitelistAccountExpirationSet";
  account: Scalars["Bytes"]["output"];
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  expiration: Scalars["BigInt"]["output"];
  id: Scalars["Bytes"]["output"];
  transactionHash: Scalars["Bytes"]["output"];
};

export type WhitelistAccountExpirationSet_Filter = {
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
  and?: InputMaybe<Array<InputMaybe<WhitelistAccountExpirationSet_Filter>>>;
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
  or?: InputMaybe<Array<InputMaybe<WhitelistAccountExpirationSet_Filter>>>;
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

export enum WhitelistAccountExpirationSet_OrderBy {
  Account = "account",
  BlockNumber = "blockNumber",
  BlockTimestamp = "blockTimestamp",
  Expiration = "expiration",
  Id = "id",
  TransactionHash = "transactionHash",
}

export type WhitelistGuardianSet = {
  __typename?: "WhitelistGuardianSet";
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  id: Scalars["Bytes"]["output"];
  newGuardian: Scalars["Bytes"]["output"];
  oldGuardian: Scalars["Bytes"]["output"];
  transactionHash: Scalars["Bytes"]["output"];
};

export type WhitelistGuardianSet_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<WhitelistGuardianSet_Filter>>>;
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
  or?: InputMaybe<Array<InputMaybe<WhitelistGuardianSet_Filter>>>;
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

export enum WhitelistGuardianSet_OrderBy {
  BlockNumber = "blockNumber",
  BlockTimestamp = "blockTimestamp",
  Id = "id",
  NewGuardian = "newGuardian",
  OldGuardian = "oldGuardian",
  TransactionHash = "transactionHash",
}

export type _Block_ = {
  __typename?: "_Block_";
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
  __typename?: "_Meta_";
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
  Allow = "allow",
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = "deny",
}

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>["__apiType"];

  constructor(
    private value: string,
    public __meta__?: Record<string, any>,
  ) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}
