import { getLatestProcessedBlock, updateLatestProcessedBlock } from "./storage";

export const run = async () => {
  console.log("Starting function");

  // Fetch the latest processed block
  const previousBlock = await getLatestProcessedBlock();

  // Get the latest proposal events from the subgraph
  const latestBlock = 0;

  // Send alerts

  // Update the latest processed block
  await updateLatestProcessedBlock(latestBlock);

  console.log("Function complete");
};
