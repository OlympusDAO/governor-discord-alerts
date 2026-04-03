import * as discord from "../discord";
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
      blockNumber: "1111",
      blockTimestamp: Math.floor(Date.now() / 1000).toString(),
      calldatas: [],
      id: "1",
      proposer: "0x123",
      signatures: [],
      startBlock: "1111",
      targets: [],
      transactionHash: "0x123",
      values: [],
    });

    const sendDiscordAlertSpy = jest
      .spyOn(discord, "sendDiscordAlert")
      .mockResolvedValue();

    await discord.processProposalEvents(proposalEvents);

    expect(sendDiscordAlertSpy).toHaveBeenCalledWith(
      "Test proposal",
      "Proposal Created",
      "https://app.olympusdao.finance/#/governance/proposals/1",
      expect.any(Date),
    );

    sendDiscordAlertSpy.mockRestore();
  });
});
