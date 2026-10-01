// Shapes returned by the protocol indexer's governor routes.
//
// Numerics cross the wire as STRINGS — the indexer stores uint256-derived
// values that do not survive a JSON number — which matches what the subgraph's
// generated types said for `BigInt`, so the formatting code is unchanged.
//
// `src/__tests__/indexer.contract.test.ts` asserts the deployed API really
// returns these fields, because nothing else here can: a renamed field would
// typecheck against this file and fail at runtime.

export type ProposalCreated = {
  id: string;
  blockNumber: string;
  blockTimestamp: string;
  description: string;
  proposalId: string;
  proposer: string;
  transactionHash: string;
  calldatas: string[];
  targets: string[];
  values: string[];
  signatures: string[];
  startBlock: string;
};

// Every other event carries the same marker fields plus the proposal it refers
// to, which is what the alert text is built from.
type ProposalEvent = {
  id: string;
  blockNumber: string;
  blockTimestamp: string;
  proposalId: string;
  transactionHash: string;
  proposal: ProposalCreated;
};

export type ProposalCanceled = ProposalEvent;
export type ProposalExecuted = ProposalEvent;
export type ProposalVetoed = ProposalEvent;
export type ProposalVotingStarted = ProposalEvent;
export type ProposalQueued = ProposalEvent & { eta: string };

export type ProposalEvents = {
  cancelled: ProposalCanceled[];
  created: ProposalCreated[];
  executed: ProposalExecuted[];
  queued: ProposalQueued[];
  vetoed: ProposalVetoed[];
  votingStarted: ProposalVotingStarted[];
};
