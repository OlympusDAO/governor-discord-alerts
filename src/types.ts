import {
  ProposalCanceled,
  ProposalCreated,
  ProposalExecuted,
  ProposalQueued,
  ProposalVetoed,
  ProposalVotingStarted,
} from "./graphql/graphql";

export type ProposalEvents = {
  cancelled: ProposalCanceled[];
  created: ProposalCreated[];
  executed: ProposalExecuted[];
  queued: ProposalQueued[];
  vetoed: ProposalVetoed[];
  votingStarted: ProposalVotingStarted[];
};
