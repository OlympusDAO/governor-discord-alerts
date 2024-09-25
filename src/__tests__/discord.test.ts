import { processProposalEvents } from "../discord";
import { ProposalEvents } from "../types";
import { config as dotenvConfig } from "dotenv";

// Required for the Discord webhook URL
dotenvConfig();

describe("processProposalEvents", () => {
  it("should process proposal events", async () => {
    const proposalEvents: ProposalEvents = {
      created: [],
      cancelled: [],
      vetoed: [],
      executed: [],
      queued: [],
      votingStarted: [],
    };

    proposalEvents.created.push({
      proposalId: "1",
      description: "Test proposal",
      blockNumber: 1111,
      blockTimestamp: Date.now() / 1000,
      calldatas: [],
      id: "1",
      proposer: "0x123",
      signatures: [],
      startBlock: 1111,
      targets: [],
      transactionHash: "0x123",
      values: [],
    });

    // Mock console.log to capture output
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    await processProposalEvents(proposalEvents);

    // Check if console.log was called with the expected message
    expect(consoleSpy).toHaveBeenCalledWith(
      "Sent Discord alert: Proposal Created: 1",
    );

    // Restore the original console.log
    consoleSpy.mockRestore();
  });
});
