import type * as express from "express";
import * as discord from "../discord";
import { getEventLogIndex, getGovernanceSnapshot } from "../governor";
import { run } from "../index";
import { getLatestProposalEvents, getProposals } from "../indexer";
import { getAlertState, saveAlertState } from "../storage";
import { type AlertState, ProposalState } from "../types";

jest.mock("../governor");
jest.mock("../indexer");
jest.mock("../storage");
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
let send: jest.SpyInstance;
const req = {} as express.Request;
const res = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn(),
} as unknown as express.Response;
beforeEach(() => {
  jest.clearAllMocks();
  jest.useFakeTimers().setSystemTime(new Date(now * 1000));
  state = { lastProcessedBlock: 150, proposals: {} };
  send = jest.spyOn(discord, "sendDiscordAlert").mockResolvedValue();
  jest.mocked(getAlertState).mockResolvedValue(state);
  jest.mocked(saveAlertState).mockResolvedValue();
  jest.mocked(getProposals).mockResolvedValue([proposal]);
  jest.mocked(getLatestProposalEvents).mockResolvedValue([
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
  jest.mocked(getGovernanceSnapshot).mockResolvedValue({
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
  });
});
afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});

it("reports voting completion before queueing and persists both milestones across retries", async () => {
  await run(req, res);
  expect(send.mock.calls.map((call) => call[1].split("\n")[0])).toEqual([
    "Proposal Voting Ended — Passed",
    "Proposal Queued",
  ]);
  expect(state.lastProcessedBlock).toBe(200);
  expect(saveAlertState).toHaveBeenCalled();
  await run(req, res);
  expect(send).toHaveBeenCalledTimes(2);
  expect(res.status).toHaveBeenCalledWith(200);
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
  jest.mocked(getLatestProposalEvents).mockImplementation(async () => {
    await Promise.resolve();
    headKnown = true;
    return [events, 200];
  });
  // An earlier list can omit a proposal that the event response already includes.
  jest
    .mocked(getProposals)
    .mockImplementation(async () => (headKnown ? [created, later] : []));
  jest
    .mocked(getGovernanceSnapshot)
    .mockImplementation(async (proposals, blockNumber) => ({
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
    }));
  jest
    .mocked(getEventLogIndex)
    .mockImplementation(async (kind) => (kind === "created" ? 0 : 1));
  await run(req, res);
  expect(getGovernanceSnapshot).toHaveBeenCalledWith([created], 200);
  expect(send.mock.calls.map((call) => call[1])).toEqual([
    "Proposal Created",
    "Proposal Voting Started",
  ]);
  expect(state.lastProcessedBlock).toBe(200);
});

it("fails without advancing the cursor when indexed data is stale", async () => {
  jest.setSystemTime(new Date((now + 7201) * 1000));
  await expect(run(req, res)).rejects.toThrow("more than two hours behind");
  expect(state.lastProcessedBlock).toBe(150);
  expect(send).not.toHaveBeenCalled();
  expect(saveAlertState).not.toHaveBeenCalled();
});

it("does not acknowledge events when the on-chain state cannot be read", async () => {
  jest
    .mocked(getGovernanceSnapshot)
    .mockRejectedValueOnce(new Error("RPC unavailable"));
  await expect(run(req, res)).rejects.toThrow("RPC unavailable");
  expect(state.lastProcessedBlock).toBe(150);
  expect(send).not.toHaveBeenCalled();
  expect(saveAlertState).not.toHaveBeenCalled();
});

it("does not repeat delivered milestones after reloading serialized state following a partial failure", async () => {
  let stored = JSON.stringify(state);
  jest.mocked(getAlertState).mockImplementation(async () => JSON.parse(stored));
  jest.mocked(saveAlertState).mockImplementation(async (next) => {
    stored = JSON.stringify(next);
  });
  send
    .mockResolvedValueOnce(undefined)
    .mockRejectedValueOnce(new Error("Discord unavailable"));
  await expect(run(req, res)).rejects.toThrow("Discord unavailable");
  expect(JSON.parse(stored).lastProcessedBlock).toBe(150);
  expect(JSON.parse(stored).proposals["19"].votingEnded).toBe(true);
  await run(req, res);
  expect(send.mock.calls.map((call) => call[1].split("\n")[0])).toEqual([
    "Proposal Voting Ended — Passed",
    "Proposal Queued",
    "Proposal Queued",
  ]);
  expect(JSON.parse(stored).lastProcessedBlock).toBe(200);
});

it("orders a full catch-up as creation, activation, voting ended, then queued", async () => {
  state.lastProcessedBlock = 50;
  const [events, head] = await getLatestProposalEvents(150);
  jest.mocked(getLatestProposalEvents).mockResolvedValue([
    {
      ...events,
      created: [proposal],
      votingStarted: [{ ...events.queued[0], blockNumber: "180" }],
    },
    head,
  ]);
  await run(req, res);
  expect(send.mock.calls.map((call) => call[1].split("\n")[0])).toEqual([
    "Proposal Created",
    "Proposal Voting Started",
    "Proposal Voting Ended — Passed",
    "Proposal Queued",
  ]);
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
  jest.mocked(getGovernanceSnapshot).mockResolvedValue(emergency);
  await run(req, res);
  const expiredAt = now + 172801;
  jest.setSystemTime(new Date(expiredAt * 1000));
  jest
    .mocked(getLatestProposalEvents)
    .mockResolvedValue([{ ...events, queued: [] }, 300]);
  jest.mocked(getGovernanceSnapshot).mockResolvedValue({
    ...emergency,
    blockNumber: 300,
    timestamp: expiredAt,
  });
  await run(req, res);
  expect(state.proposals["19"].terminal).toBe(true);
  jest.mocked(getLatestProposalEvents).mockResolvedValue([
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
  jest.mocked(getGovernanceSnapshot).mockResolvedValue({
    ...emergency,
    blockNumber: 400,
    timestamp: expiredAt,
    proposals: [{ ...emergency.proposals[0], eta: expiredAt + 86400 }],
  });
  await run(req, res);
  expect(send.mock.calls.map((call) => call[1].split("\n")[0])).toEqual([
    "Proposal Queued",
    "Proposal Expired",
    "Proposal Queued",
  ]);
  expect(jest.mocked(getGovernanceSnapshot).mock.calls.at(-1)?.[0]).toEqual([
    proposal,
  ]);
  expect(state.proposals["19"].terminal).not.toBe(true);
  expect(state.proposals["19"].lastExecutionReminder).toBeUndefined();
  const executableAt = expiredAt + 86400;
  jest.setSystemTime(new Date(executableAt * 1000));
  jest
    .mocked(getLatestProposalEvents)
    .mockResolvedValue([{ ...events, queued: [] }, 500]);
  jest.mocked(getGovernanceSnapshot).mockResolvedValue({
    ...emergency,
    blockNumber: 500,
    timestamp: executableAt,
    proposals: [{ ...emergency.proposals[0], eta: executableAt }],
  });
  await run(req, res);
  expect(send.mock.calls[send.mock.calls.length - 1][1]).toContain(
    "Proposal Executable",
  );
  expect(send.mock.calls[send.mock.calls.length - 1][3].deadline).toBe(
    executableAt + 86400,
  );
});

it("stops before later alerts if recording a delivered milestone fails", async () => {
  jest
    .mocked(saveAlertState)
    .mockRejectedValueOnce(new Error("GCS unavailable"));
  await expect(run(req, res)).rejects.toThrow("GCS unavailable");
  expect(send.mock.calls.map((call) => call[1].split("\n")[0])).toEqual([
    "Proposal Voting Ended — Passed",
  ]);
  expect(state.lastProcessedBlock).toBe(150);
});

it.each([
  [180, 190, 0, 0, false],
  [190, 180, 0, 0, true],
  [190, 190, 7, 8, false],
  [190, 190, 8, 7, true],
])("orders emergency queue/cancel transitions (%s, %s, %s, %s) and only reminds for a live queue", async (queueBlock, cancelBlock, queueIndex, cancelIndex, requeued) => {
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
  jest
    .mocked(getEventLogIndex)
    .mockImplementation(async (kind) =>
      kind === "queued" ? queueIndex : cancelIndex,
    );
  jest
    .mocked(getLatestProposalEvents)
    .mockResolvedValue([
      { ...events, queued: [queued], cancelled: [cancelled] },
      200,
    ]);
  jest.mocked(getGovernanceSnapshot).mockResolvedValue({
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
  });
  await run(req, res);
  expect(send.mock.calls.map((call) => call[1].split("\n")[0])).toEqual(
    requeued
      ? ["Proposal Cancelled", "Proposal Queued", "Proposal Executable"]
      : ["Proposal Queued", "Proposal Cancelled"],
  );
  expect(state.proposals["19"].terminal).toBe(!requeued);
  expect(getEventLogIndex).toHaveBeenCalledTimes(
    queueBlock === cancelBlock ? 2 : 0,
  );
});
