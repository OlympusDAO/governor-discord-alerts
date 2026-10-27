import type * as express from "express";
import { processProposalEvents } from "./discord";
import { getGovernanceSnapshot } from "./governor";
import { getLatestProposalEvents, getProposals } from "./indexer";
import { processLifecycleReminders, processVotingEnded } from "./lifecycle";
import { getAlertState, saveAlertState } from "./storage";

export const run = async (_req: express.Request, res: express.Response) => {
  console.log("Starting function");
  const state = await getAlertState();
  const [events, latestBlock] = await getLatestProposalEvents(
    state.lastProcessedBlock,
  );
  // Read the list after the event head so it includes newly indexed proposals.
  const allProposals = await getProposals();
  if (latestBlock < state.lastProcessedBlock)
    throw new Error("Indexer head moved behind the saved cursor");
  const queuedIds = new Set(events.queued.map((p) => p.proposalId));
  const proposals = allProposals.filter(
    (p) =>
      Number(p.blockNumber) <= latestBlock &&
      (!state.proposals[p.proposalId]?.terminal || queuedIds.has(p.proposalId)),
  );
  const snapshot = await getGovernanceSnapshot(proposals, latestBlock);
  if (Date.now() / 1000 - snapshot.timestamp > 2 * 60 * 60)
    throw new Error("Governor indexer is more than two hours behind");
  const persist = () => saveAlertState(state);
  await processProposalEvents(
    { ...events, cancelled: [], vetoed: [], queued: [], executed: [] },
    snapshot,
    state,
    persist,
  );
  await processVotingEnded(snapshot, state, persist);
  await processProposalEvents(
    { ...events, created: [], votingStarted: [] },
    snapshot,
    state,
    persist,
  );
  await processLifecycleReminders(snapshot, state, persist);
  state.lastProcessedBlock = latestBlock;
  await persist();
  console.log("Function complete");
  res.status(200).send();
};
