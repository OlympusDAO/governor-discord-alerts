import * as assert from "node:assert/strict";
import { after as afterAll, afterEach, beforeEach, it, mock } from "node:test";
import { format } from "node:util";
import type { WebhookClient } from "discord.js";
import * as discordSdk from "discord.js";
import { processProposalEvents } from "../discord";
import { processLifecycleReminders } from "../lifecycle";
import {
  type AlertState,
  type GovernanceSnapshot,
  type ProposalCreated,
  type ProposalEvents,
  ProposalState,
} from "../types";
import { assertSubset, mocked } from "./support";

const send = mock.fn(
  async (_payload: { embeds: import("discord.js").EmbedBuilder[] }) => ({}),
);
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
      quorumVotes: 100n,
      forVotes: 0n,
      againstVotes: 0n,
    },
  ],
};
let saved: AlertState;
const persist = mock.fn(async () => undefined);
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
const embed = () => {
  const data = send.mock.calls[0].arguments[0].embeds[0].toJSON();
  assert.ok(data.fields);
  assert.ok(data.title);
  return { ...data, fields: data.fields, title: data.title };
};
const field = (name: string) =>
  embed().fields.find((field) => field.name === name);
const fieldValue = (name: string) => {
  const value = field(name);
  assert.ok(value, `Missing embed field: ${name}`);
  return value.value;
};

beforeEach(() => {
  send.mock.resetCalls();
  saved = { lastProcessedBlock: 0, proposals: {} };
  persist.mock.resetCalls();
  mock.method(
    discordSdk,
    "WebhookClient",
    class {
      send = send;
    } as unknown as typeof WebhookClient,
  );
  process.env.DISCORD_WEBHOOK_URL = "https://example.invalid/mock-only";
});

afterEach(() => {
  mock.restoreAll();
  mock.timers.reset();
});

afterAll(() => {
  if (originalWebhookUrl === undefined) delete process.env.DISCORD_WEBHOOK_URL;
  else process.env.DISCORD_WEBHOOK_URL = originalWebhookUrl;
});

for (const [key, status] of [
  ["created", "Proposal Created"],
  ["cancelled", "Proposal Cancelled"],
  ["vetoed", "Proposal Vetoed"],
  ["votingStarted", "Proposal Voting Started"],
  ["queued", "Proposal Queued"],
  ["executed", "Proposal Executed"],
] as const) {
  it(
    format(
      "enriches %s alerts with proposal details and the event transaction",
      key,
      status,
    ),
    async () => {
      const events = emptyEvents();
      if (key === "created") events.created.push(proposal);
      else events[key].push(marker);

      await processEvents(events);

      assert.strictEqual(mocked(send).mock.callCount(), 1);
      assertSubset(embed(), {
        title: "#19 · CCIP Bridge Activation",
        url: "https://app.olympusdao.finance/#/governance/proposals/19",
        description: status,
      });
      assert.ok(
        fieldValue("Transaction").includes(
          `https://etherscan.io/tx/${key === "created" ? proposal.transactionHash : marker.transactionHash}`,
        ),
      );
      if (key === "created") {
        assert.strictEqual(fieldValue("Proposal ID"), "19");
        assert.ok(
          fieldValue("Proposer").includes(
            `https://etherscan.io/address/${proposal.proposer}`,
          ),
        );
      } else {
        assert.strictEqual(field("Proposal ID"), undefined);
        assert.strictEqual(field("Proposer"), undefined);
      }
      assert.strictEqual(embed().fields[0].name, "Description");
      assert.strictEqual(
        fieldValue("Description"),
        "Restore OHM bridging to five EVM chains. Move pool administration under governance.",
      );
      if (key === "votingStarted" || key === "queued") {
        assert.strictEqual(
          embed().fields[key === "queued" ? 2 : 1].name,
          "Deadline",
        );
        assert.match(fieldValue("Deadline"), /^<t:\d+:R>\n<t:\d+:F>/);
      } else assert.strictEqual(field("Deadline"), undefined);
    },
  );
}

it("shows absolute and live relative timestamps for queued execution deadlines", async () => {
  const events = emptyEvents();
  events.queued.push(marker);
  await processEvents(events);
  assert.strictEqual(embed().fields[1].name, "Executable From");
  assert.strictEqual(
    fieldValue("Executable From"),
    "<t:1793119319:R>\n<t:1793119319:F>",
  );
  assert.strictEqual(
    fieldValue("Deadline"),
    "<t:1793205719:R>\n<t:1793205719:F>",
  );
});

it("labels the voting deadline as an estimate and keeps its end block", async () => {
  const events = emptyEvents();
  events.votingStarted.push(marker);
  await processEvents(events);
  assert.strictEqual(
    fieldValue("Deadline"),
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
  assert.ok(embed().title.length <= 256);
  assert.strictEqual(fieldValue("Description").length, 240);
  assert.match(fieldValue("Description"), /\.\.\.$/);
});

it("handles descriptions with no separate heading or summary", async () => {
  const events = emptyEvents();
  events.created.push({ ...proposal, description: "Emergency Proposal" });
  await processEvents(events);
  assert.strictEqual(embed().title, "#19 · Emergency Proposal");
  assert.strictEqual(fieldValue("Description"), "Emergency Proposal");
});

it("shows a fallback when the proposal has only a title", async () => {
  const events = emptyEvents();
  events.created.push({ ...proposal, description: "# Title only" });
  await processEvents(events);
  assert.strictEqual(fieldValue("Description"), "No description provided.");
});

it("deduplicates delivered event alerts after a partial run is retried", async () => {
  const events = emptyEvents();
  events.votingStarted.push(marker);
  await processEvents(events);
  await processEvents(events);
  assert.strictEqual(mocked(send).mock.callCount(), 1);
  assert.strictEqual(mocked(persist).mock.callCount(), 1);
});

it("renders daily voting progress with the description and frontend link, starting 24 hours after the start alert", async () => {
  mock.timers.enable({
    apis: ["Date"],
    now: new Date(snapshot.timestamp * 1000),
  });
  const events = emptyEvents();
  events.votingStarted.push(marker);
  await processEvents(events);
  send.mock.resetCalls();
  await processLifecycleReminders(snapshot, saved, persist);
  assert.strictEqual(mocked(send).mock.callCount(), 0);
  const nextDay: GovernanceSnapshot = {
    ...snapshot,
    blockNumber: snapshot.blockNumber + 7200,
    timestamp: snapshot.timestamp + 86400,
    proposals: [
      {
        ...snapshot.proposals[0],
        quorumVotes: 2000n * 10n ** 18n,
        forVotes: 900n * 10n ** 18n,
        againstVotes: 300n * 10n ** 18n,
      },
    ],
  };
  mock.timers.setTime(Number(new Date(nextDay.timestamp * 1000)));
  await processLifecycleReminders(nextDay, saved, persist);
  assert.strictEqual(mocked(send).mock.callCount(), 1);
  assertSubset(embed(), {
    title: "#19 · CCIP Bridge Activation",
    url: "https://app.olympusdao.finance/#/governance/proposals/19",
    description: "Proposal Voting In Progress",
  });
  assert.strictEqual(
    fieldValue("Description"),
    "Restore OHM bridging to five EVM chains. Move pool administration under governance.",
  );
  assert.ok(fieldValue("Details").includes("Quorum reached: **45.00%**"));
  assert.ok(
    fieldValue("Details").includes("Approval: **75.00% Yes / 25.00% No**"),
  );
  assert.strictEqual(
    fieldValue("Deadline"),
    "<t:1793637719:R>\n<t:1793637719:F>\nEstimated. Voting ends after block 50600.",
  );
  assert.strictEqual(field("Transaction"), undefined);
  assert.strictEqual(field("Proposal ID"), undefined);
  assert.strictEqual(field("Proposer"), undefined);
});
