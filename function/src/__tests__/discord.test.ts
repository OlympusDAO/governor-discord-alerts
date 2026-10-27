import { WebhookClient } from "discord.js";
import { processProposalEvents } from "../discord";
import {
  type AlertState,
  type GovernanceSnapshot,
  type ProposalCreated,
  type ProposalEvents,
  ProposalState,
} from "../types";

jest.mock("discord.js", () => ({
  ...jest.requireActual("discord.js"),
  WebhookClient: jest.fn(),
}));

const send = jest.fn().mockResolvedValue({});
const originalWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
const proposal: ProposalCreated = {
  id: "19",
  proposalId: "19",
  description:
    "\n# CCIP Bridge Activation\n\nRestore OHM bridging to five EVM chains.\nMove pool administration under governance.\n",
  proposer: "0x1111111111111111111111111111111111111111",
  blockNumber: "100",
  blockTimestamp: "1793032919",
  transactionHash: `0x${"1".repeat(64)}`,
  calldatas: [],
  signatures: [],
  startBlock: "100",
  targets: [],
  values: [],
};
const marker = {
  id: "19",
  proposalId: "19",
  blockNumber: "200",
  blockTimestamp: "1793032919",
  transactionHash: `0x${"2".repeat(64)}`,
  proposal,
  eta: "1793119319",
};
const snapshot: GovernanceSnapshot = {
  blockNumber: 200,
  timestamp: 1793032919,
  executionGracePeriod: 86400,
  proposals: [
    {
      proposal,
      state: ProposalState.Active,
      endBlock: 50600,
      eta: 0,
      votingStarted: true,
    },
  ],
};
let saved: AlertState;
const persist = jest.fn().mockResolvedValue(undefined);
const processEvents = (events: ProposalEvents) =>
  processProposalEvents(events, snapshot, saved, persist);
const emptyEvents = (): ProposalEvents => ({
  created: [],
  cancelled: [],
  vetoed: [],
  executed: [],
  queued: [],
  votingStarted: [],
});
const embed = () => send.mock.calls[0][0].embeds[0].toJSON();
const field = (name: string) =>
  embed().fields.find((field: { name: string }) => field.name === name);

beforeEach(() => {
  send.mockClear();
  saved = { lastProcessedBlock: 0, proposals: {} };
  persist.mockClear();
  jest
    .mocked(WebhookClient)
    .mockImplementation(() => ({ send }) as unknown as WebhookClient);
  process.env.DISCORD_WEBHOOK_URL = "https://example.invalid/mock-only";
});

afterAll(() => {
  if (originalWebhookUrl === undefined) delete process.env.DISCORD_WEBHOOK_URL;
  else process.env.DISCORD_WEBHOOK_URL = originalWebhookUrl;
});

it.each([
  ["created", "Proposal Created"],
  ["cancelled", "Proposal Cancelled"],
  ["vetoed", "Proposal Vetoed"],
  ["votingStarted", "Proposal Voting Started"],
  ["queued", "Proposal Queued"],
  ["executed", "Proposal Executed"],
] as const)("enriches %s alerts with proposal details and the event transaction", async (key, status) => {
  const events = emptyEvents();
  if (key === "created") events.created.push(proposal);
  else events[key].push(marker);

  await processEvents(events);

  expect(send).toHaveBeenCalledTimes(1);
  expect(embed()).toMatchObject({
    title: "#19 · CCIP Bridge Activation",
    url: "https://app.olympusdao.finance/#/governance/proposals/19",
    description: status,
    fields: expect.arrayContaining([
      expect.objectContaining({ name: "Proposal ID", value: "19" }),
      expect.objectContaining({
        name: "Proposer",
        value: expect.stringContaining(
          `https://etherscan.io/address/${proposal.proposer}`,
        ),
      }),
      expect.objectContaining({
        name: "Transaction",
        value: expect.stringContaining(
          `https://etherscan.io/tx/${key === "created" ? proposal.transactionHash : marker.transactionHash}`,
        ),
      }),
    ]),
  });
  expect(embed().fields[0].name).toBe("Description");
  expect(field("Description").value).toBe(
    "Restore OHM bridging to five EVM chains. Move pool administration under governance.",
  );
  if (key === "votingStarted" || key === "queued") {
    expect(embed().fields[key === "queued" ? 2 : 1].name).toBe("Deadline");
    expect(field("Deadline").value).toMatch(/^<t:\d+:R>\n<t:\d+:F>/);
  } else expect(field("Deadline")).toBeUndefined();
});

it("shows absolute and live relative timestamps for queued execution deadlines", async () => {
  const events = emptyEvents();
  events.queued.push(marker);
  await processEvents(events);
  expect(embed().fields[1].name).toBe("Executable From");
  expect(field("Executable From").value).toBe(
    "<t:1793119319:R>\n<t:1793119319:F>",
  );
  expect(field("Deadline").value).toBe("<t:1793205719:R>\n<t:1793205719:F>");
});

it("labels the voting deadline as an estimate and keeps its end block", async () => {
  const events = emptyEvents();
  events.votingStarted.push(marker);
  await processEvents(events);
  expect(field("Deadline").value).toBe(
    "<t:1793637719:R>\n<t:1793637719:F>\nEstimated. Voting ends after block 50600.",
  );
});

it("keeps long proposal text within Discord embed limits", async () => {
  const events = emptyEvents();
  events.created.push({
    ...proposal,
    description: `# ${"T".repeat(400)}\n\n${"x".repeat(6000)}`,
  });
  await processEvents(events);
  expect(embed().title.length).toBeLessThanOrEqual(256);
  expect(field("Description").value).toHaveLength(240);
  expect(field("Description").value).toMatch(/\.\.\.$/);
});

it("handles descriptions with no separate heading or summary", async () => {
  const events = emptyEvents();
  events.created.push({ ...proposal, description: "Emergency Proposal" });
  await processEvents(events);
  expect(embed().title).toBe("#19 · Emergency Proposal");
  expect(field("Description").value).toBe("Emergency Proposal");
});

it("shows a fallback when the proposal has only a title", async () => {
  const events = emptyEvents();
  events.created.push({ ...proposal, description: "# Title only" });
  await processEvents(events);
  expect(field("Description").value).toBe("No description provided.");
});

it("deduplicates delivered event alerts after a partial run is retried", async () => {
  const events = emptyEvents();
  events.votingStarted.push(marker);
  await processEvents(events);
  await processEvents(events);
  expect(send).toHaveBeenCalledTimes(1);
  expect(persist).toHaveBeenCalledTimes(1);
});
