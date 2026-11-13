import * as assert from "node:assert/strict";
import { afterEach, beforeEach, it, mock } from "node:test";
import { format, isDeepStrictEqual } from "node:util";
import type * as express from "express";
import * as discord from "../discord";
import * as governor from "../governor";
import { getEventLogIndex, getGovernanceSnapshot } from "../governor";
import { run } from "../index";
import * as indexer from "../indexer";
import { getLatestProposalEvents, getProposals } from "../indexer";
import * as storage from "../storage";
import { getAlertState, saveAlertState } from "../storage";
import { type AlertState, ProposalState } from "../types";
import { mocked } from "./support";

const now = 1793032919;
const proposal = {
  id: "19",
  proposalId: "19",
  proposer: "0x1111111111111111111111111111111111111111",
  description: "# Bridge\n\nRestore bridging.",
  blockNumber: "100",
  blockTimestamp: String(now - 1000),
  transactionHash: `0x${"1".repeat(64)}`,
  startBlock: "110",
  targets: [],
  values: [],
  signatures: [],
  calldatas: [],
};
let state: AlertState;
let send: ReturnType<typeof mock.fn<typeof discord.sendDiscordAlert>>;
const req = {} as express.Request;
const res = {
  status: mock.fn(function (this: express.Response) {
    return this;
  }),
  send: mock.fn(),
} as unknown as express.Response;
beforeEach(() => {
  mocked(res.status).mock.resetCalls();
  mocked(res.send).mock.resetCalls();
  mock.method(governor, "getEventLogIndex", async () => 0);
  mock.method(governor, "getCompletedVoteOutcome", async () => undefined);
  mock.method(governor, "isEmergencyQueueCancelled", async () => false);
  mock.method(governor, "wasExpiredAtCursor", async () => false);
  mock.method(governor, "getGovernanceSnapshot");
  mock.method(indexer, "getLatestProposalEvents");
  mock.method(indexer, "getProposals");
  mock.method(storage, "getAlertState");
  mock.method(storage, "saveAlertState");

  mock.timers.enable({ apis: ["Date"], now: new Date(now * 1000) });
  state = { lastProcessedBlock: 150, proposals: {} };
  send = mock.method(discord, "sendDiscordAlert", async () => undefined);
  mocked(getAlertState).mock.mockImplementation(async () => state);
  mocked(saveAlertState).mock.mockImplementation(async () => undefined);
  mocked(getProposals).mock.mockImplementation(async () => [proposal]);
  mocked(getLatestProposalEvents).mock.mockImplementation(async () => [
    {
      created: [],
      cancelled: [],
      vetoed: [],
      executed: [],
      votingStarted: [],
      queued: [
        {
          id: "19",
          proposalId: "19",
          blockNumber: "200",
          blockTimestamp: String(now),
          transactionHash: `0x${"2".repeat(64)}`,
          proposal,
          eta: String(now + 86400),
        },
      ],
    },
    200,
  ]);
  mocked(getGovernanceSnapshot).mock.mockImplementation(async () => ({
    blockNumber: 200,
    timestamp: now,
    executionGracePeriod: 86400,
    proposals: [
      {
        proposal,
        state: ProposalState.Queued,
        endBlock: 199,
        eta: now + 86400,
        votingStarted: true,
        quorumVotes: 100n,
        forVotes: 0n,
        againstVotes: 0n,
      },
    ],
  }));
});
afterEach(() => {
  mock.timers.reset();
  mock.restoreAll();
});

it("reports voting completion before queueing and persists both milestones across retries", async () => {
  await run(req, res);
  assert.deepStrictEqual(
    send.mock.calls
      .map((call) => call.arguments)
      .map((call) => call[1].split("\n")[0]),
    ["Proposal Voting Ended — Passed", "Proposal Queued"],
  );
  assert.strictEqual(state.lastProcessedBlock, 200);
  assert.notStrictEqual(mocked(saveAlertState).mock.callCount(), 0);
  await run(req, res);
  assert.strictEqual(mocked(send).mock.callCount(), 2);
  assert.ok(
    mocked(res.status).mock.calls.some((call) =>
      isDeepStrictEqual(call.arguments, [200]),
    ),
  );
});

it("includes proposals visible at the event head while excluding later creations", async () => {
  const created = { ...proposal, blockNumber: "199", startBlock: "199" };
  const later = { ...proposal, proposalId: "20", id: "20", blockNumber: "201" };
  const [baseEvents] = await getLatestProposalEvents(150);
  const events = {
    ...baseEvents,
    queued: [],
    created: [created],
    votingStarted: [{ ...baseEvents.queued[0], proposal: created }],
  };
  let headKnown = false;
  mocked(getLatestProposalEvents).mock.mockImplementation(async () => {
    await Promise.resolve();
    headKnown = true;
    return [events, 200];
  });
  // An earlier list can omit a proposal that the event response already includes.
  mocked(getProposals).mock.mockImplementation(async () =>
    headKnown ? [created, later] : [],
  );
  mocked(getGovernanceSnapshot).mock.mockImplementation(
    async (proposals, blockNumber) => ({
      blockNumber,
      timestamp: now,
      executionGracePeriod: 86400,
      proposals: proposals.map((proposal) => ({
        proposal,
        state: ProposalState.Active,
        endBlock: 300,
        eta: 0,
        votingStarted: true,
        quorumVotes: 100n,
        forVotes: 0n,
        againstVotes: 0n,
      })),
    }),
  );
  mocked(getEventLogIndex).mock.mockImplementation(async (kind) =>
    kind === "created" ? 0 : 1,
  );
  await run(req, res);
  assert.ok(
    mocked(getGovernanceSnapshot).mock.calls.some((call) =>
      isDeepStrictEqual(call.arguments, [[created], 200]),
    ),
  );
  assert.deepStrictEqual(
    send.mock.calls.map((call) => call.arguments).map((call) => call[1]),
    ["Proposal Created", "Proposal Voting Started"],
  );
  assert.strictEqual(state.lastProcessedBlock, 200);
});

it("fails without advancing the cursor when indexed data is stale", async () => {
  mock.timers.setTime(Number(new Date((now + 7201) * 1000)));
  await assert.rejects(
    run(req, res),
    (error: unknown) =>
      error instanceof Error &&
      error.message.includes("more than two hours behind"),
  );
  assert.strictEqual(state.lastProcessedBlock, 150);
  assert.strictEqual(mocked(send).mock.callCount(), 0);
  assert.strictEqual(mocked(saveAlertState).mock.callCount(), 0);
});

it("does not acknowledge events when the on-chain state cannot be read", async () => {
  mocked(getGovernanceSnapshot).mock.mockImplementationOnce(async () => {
    throw new Error("RPC unavailable");
  });
  await assert.rejects(
    run(req, res),
    (error: unknown) =>
      error instanceof Error && error.message.includes("RPC unavailable"),
  );
  assert.strictEqual(state.lastProcessedBlock, 150);
  assert.strictEqual(mocked(send).mock.callCount(), 0);
  assert.strictEqual(mocked(saveAlertState).mock.callCount(), 0);
});

it("does not repeat delivered milestones after reloading serialized state following a partial failure", async () => {
  let stored = JSON.stringify(state);
  mocked(getAlertState).mock.mockImplementation(async () => JSON.parse(stored));
  mocked(saveAlertState).mock.mockImplementation(async (next) => {
    stored = JSON.stringify(next);
  });
  send.mock.mockImplementationOnce(async () => undefined);
  send.mock.mockImplementationOnce(async () => {
    throw new Error("Discord unavailable");
  }, 1);
  await assert.rejects(
    run(req, res),
    (error: unknown) =>
      error instanceof Error && error.message.includes("Discord unavailable"),
  );
  assert.strictEqual(JSON.parse(stored).lastProcessedBlock, 150);
  assert.strictEqual(JSON.parse(stored).proposals["19"].votingEnded, true);
  await run(req, res);
  assert.deepStrictEqual(
    send.mock.calls
      .map((call) => call.arguments)
      .map((call) => call[1].split("\n")[0]),
    ["Proposal Voting Ended — Passed", "Proposal Queued", "Proposal Queued"],
  );
  assert.strictEqual(JSON.parse(stored).lastProcessedBlock, 200);
});

it("orders a full catch-up as creation, activation, voting ended, then queued", async () => {
  state.lastProcessedBlock = 50;
  const [events, head] = await getLatestProposalEvents(150);
  mocked(getLatestProposalEvents).mock.mockImplementation(async () => [
    {
      ...events,
      created: [proposal],
      votingStarted: [{ ...events.queued[0], blockNumber: "180" }],
    },
    head,
  ]);
  await run(req, res);
  assert.deepStrictEqual(
    send.mock.calls
      .map((call) => call.arguments)
      .map((call) => call[1].split("\n")[0]),
    [
      "Proposal Created",
      "Proposal Voting Started",
      "Proposal Voting Ended — Passed",
      "Proposal Queued",
    ],
  );
});

it("reopens monitoring and announces a new queue transaction when an expired emergency proposal is requeued", async () => {
  const [events] = await getLatestProposalEvents(150);
  const firstSnapshot = await getGovernanceSnapshot([proposal], 200);
  const emergency = {
    ...firstSnapshot,
    proposals: [
      {
        ...firstSnapshot.proposals[0],
        state: ProposalState.Emergency,
        votingStarted: false,
        endBlock: 0,
      },
    ],
  };
  mocked(getGovernanceSnapshot).mock.mockImplementation(async () => emergency);
  await run(req, res);
  const expiredAt = now + 172801;
  mock.timers.setTime(Number(new Date(expiredAt * 1000)));
  mocked(getLatestProposalEvents).mock.mockImplementation(async () => [
    { ...events, queued: [] },
    300,
  ]);
  mocked(getGovernanceSnapshot).mock.mockImplementation(async () => ({
    ...emergency,
    blockNumber: 300,
    timestamp: expiredAt,
  }));
  await run(req, res);
  assert.strictEqual(state.proposals["19"].terminal, true);
  mocked(getLatestProposalEvents).mock.mockImplementation(async () => [
    {
      ...events,
      queued: [
        {
          ...events.queued[0],
          transactionHash: `0x${"3".repeat(64)}`,
          blockNumber: "400",
          eta: String(expiredAt + 86400),
        },
      ],
    },
    400,
  ]);
  mocked(getGovernanceSnapshot).mock.mockImplementation(async () => ({
    ...emergency,
    blockNumber: 400,
    timestamp: expiredAt,
    proposals: [{ ...emergency.proposals[0], eta: expiredAt + 86400 }],
  }));
  await run(req, res);
  assert.deepStrictEqual(
    send.mock.calls
      .map((call) => call.arguments)
      .map((call) => call[1].split("\n")[0]),
    ["Proposal Queued", "Proposal Expired", "Proposal Queued"],
  );
  assert.deepStrictEqual(
    mocked(getGovernanceSnapshot)
      .mock.calls.map((call) => call.arguments)
      .at(-1)?.[0],
    [proposal],
  );
  assert.notStrictEqual(state.proposals["19"].terminal, true);
  assert.strictEqual(state.proposals["19"].lastExecutionReminder, undefined);
  const executableAt = expiredAt + 86400;
  mock.timers.setTime(Number(new Date(executableAt * 1000)));
  mocked(getLatestProposalEvents).mock.mockImplementation(async () => [
    { ...events, queued: [] },
    500,
  ]);
  mocked(getGovernanceSnapshot).mock.mockImplementation(async () => ({
    ...emergency,
    blockNumber: 500,
    timestamp: executableAt,
    proposals: [{ ...emergency.proposals[0], eta: executableAt }],
  }));
  await run(req, res);
  assert.ok(
    send.mock.calls[
      send.mock.calls.map((call) => call.arguments).length - 1
    ].arguments[1].includes("Proposal Executable"),
  );
  assert.strictEqual(
    send.mock.calls[send.mock.calls.map((call) => call.arguments).length - 1]
      .arguments[3]?.deadline,
    executableAt + 86400,
  );
});

it("stops before later alerts if recording a delivered milestone fails", async () => {
  mocked(saveAlertState).mock.mockImplementationOnce(async () => {
    throw new Error("GCS unavailable");
  });
  await assert.rejects(
    run(req, res),
    (error: unknown) =>
      error instanceof Error && error.message.includes("GCS unavailable"),
  );
  assert.deepStrictEqual(
    send.mock.calls
      .map((call) => call.arguments)
      .map((call) => call[1].split("\n")[0]),
    ["Proposal Voting Ended — Passed"],
  );
  assert.strictEqual(state.lastProcessedBlock, 150);
});

for (const [queueBlock, cancelBlock, queueIndex, cancelIndex, requeued] of [
  [180, 190, 0, 0, false],
  [190, 180, 0, 0, true],
  [190, 190, 7, 8, false],
  [190, 190, 8, 7, true],
] as const) {
  it(
    format(
      "orders emergency queue/cancel transitions (%s, %s, %s, %s) and only reminds for a live queue",
      queueBlock,
      cancelBlock,
      queueIndex,
      cancelIndex,
      requeued,
    ),
    async () => {
      const [events] = await getLatestProposalEvents(150);
      const base = await getGovernanceSnapshot([proposal], 200);
      const queued = {
        ...events.queued[0],
        blockNumber: String(queueBlock),
        eta: String(now - 1),
      };
      const cancelled = {
        ...queued,
        blockNumber: String(cancelBlock),
        transactionHash: `0x${"4".repeat(64)}`,
      };
      mocked(getEventLogIndex).mock.mockImplementation(async (kind) =>
        kind === "queued" ? queueIndex : cancelIndex,
      );
      mocked(getLatestProposalEvents).mock.mockImplementation(async () => [
        { ...events, queued: [queued], cancelled: [cancelled] },
        200,
      ]);
      mocked(getGovernanceSnapshot).mock.mockImplementation(async () => ({
        ...base,
        proposals: [
          {
            ...base.proposals[0],
            state: ProposalState.Emergency,
            endBlock: 0,
            votingStarted: false,
            eta: now - 1,
          },
        ],
      }));
      await run(req, res);
      assert.deepStrictEqual(
        send.mock.calls
          .map((call) => call.arguments)
          .map((call) => call[1].split("\n")[0]),
        requeued
          ? ["Proposal Cancelled", "Proposal Queued", "Proposal Executable"]
          : ["Proposal Queued", "Proposal Cancelled"],
      );
      assert.strictEqual(state.proposals["19"].terminal, !requeued);
      assert.strictEqual(
        mocked(getEventLogIndex).mock.callCount(),
        queueBlock === cancelBlock ? 2 : 0,
      );
    },
  );
}
