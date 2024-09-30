import {
  ProposalCanceled,
  ProposalCreated,
  ProposalExecuted,
  ProposalQueued,
  ProposalVetoed,
  ProposalVotingStarted,
} from "./__generated__/proposals";

export type ProposalEvents = {
  cancelled: ProposalCanceled[];
  created: ProposalCreated[];
  executed: ProposalExecuted[];
  queued: ProposalQueued[];
  vetoed: ProposalVetoed[];
  votingStarted: ProposalVotingStarted[];
};
