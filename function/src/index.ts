import { getLatestProcessedBlock, updateLatestProcessedBlock } from "./storage";
import { getLatestProposalEvents } from "./subgraph";
import { processProposalEvents } from "./discord";
import * as express from "express";

export const run = async (req: express.Request, res: express.Response) => {
  console.log("Starting function");

  // Fetch the latest processed block
  const previousBlock = await getLatestProcessedBlock();

  // Get the latest proposal events from the subgraph
  const [proposalData, latestBlock] =
    await getLatestProposalEvents(previousBlock);

  // Send alerts
  await processProposalEvents(proposalData);

  // Update the latest processed block
  await updateLatestProcessedBlock(latestBlock);

  console.log("Function complete");

  res.status(200).send();
};
