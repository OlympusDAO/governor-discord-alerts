import * as discord from "../discord";
import { getCompletedVoteOutcome, wasExpiredAtCursor } from "../governor";
import { processLifecycleReminders, processVotingEnded } from "../lifecycle";
import {
  type AlertState,
  type GovernanceSnapshot,
  ProposalState,
} from "../types";

jest.mock("../governor");

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
const snapshot = (
  status: ProposalState,
  overrides = {},
): GovernanceSnapshot => ({
  blockNumber: 200,
  timestamp: now,
  executionGracePeriod: 86400,
  proposals: [
    {
      proposal,
      state: status,
      endBlock: 199,
      eta: 0,
      votingStarted: true,
      ...overrides,
    },
  ],
});
const state = (): AlertState => ({ lastProcessedBlock: 150, proposals: {} });
const persist = jest.fn().mockResolvedValue(undefined);
let send: jest.SpyInstance;

beforeEach(() => {
  persist.mockClear();
  send = jest.spyOn(discord, "sendDiscordAlert").mockResolvedValue();
  jest.mocked(getCompletedVoteOutcome).mockResolvedValue(true);
  jest.mocked(wasExpiredAtCursor).mockResolvedValue(true);
});
afterEach(() => jest.restoreAllMocks());

it.each([
  ProposalState.Succeeded,
  ProposalState.Defeated,
])("announces voting completion and its outcome once (%s)", async (status) => {
  const saved = state();
  await processVotingEnded(snapshot(status), saved, persist);
  await processVotingEnded(snapshot(status), saved, persist);
  expect(send).toHaveBeenCalledTimes(1);
  expect(send.mock.calls[0][1]).toContain(
    status === ProposalState.Succeeded ? "Passed" : "Defeated",
  );
  expect(saved.proposals["19"].votingEnded).toBe(true);
});

it("does not end voting at the inclusive end block", async () => {
  await processVotingEnded(
    snapshot(ProposalState.Active, { endBlock: 200 }),
    state(),
    persist,
  );
  expect(send).not.toHaveBeenCalled();
});

it("reminds unqueued successful proposals every four hours without inventing an expiry", async () => {
  const saved = state();
  const s = snapshot(ProposalState.Succeeded);
  await processVotingEnded(s, saved, persist);
  send.mockClear();
  await processLifecycleReminders(s, saved, persist);
  expect(send).not.toHaveBeenCalled();
  await processLifecycleReminders(
    { ...s, timestamp: now + 14400 },
    saved,
    persist,
  );
  await processLifecycleReminders(
    { ...s, timestamp: now + 18000 },
    saved,
    persist,
  );
  expect(send).toHaveBeenCalledTimes(1);
  expect(send.mock.calls[0][1]).toContain("Awaiting Queue");
  expect(send.mock.calls[0][1]).not.toMatch(/expir|deadline/i);
});

it("announces executability at ETA and uses wall-clock reminder intervals and an explicit deadline", async () => {
  const saved = state();
  const s = snapshot(ProposalState.Queued, { eta: now });
  await processLifecycleReminders(s, saved, persist);
  await processLifecycleReminders(
    { ...s, timestamp: now + 3600 },
    saved,
    persist,
  );
  expect(send).toHaveBeenCalledTimes(1);
  expect(send.mock.calls[0][1]).toContain("Executable");
  expect(send.mock.calls[0][1]).toContain(
    `<t:${now + 86400}:F> (<t:${now + 86400}:R>)`,
  );
  await processLifecycleReminders(
    { ...s, timestamp: now + 14400 },
    saved,
    persist,
  );
  expect(send).toHaveBeenCalledTimes(2);
});

it("waits until ETA before reminding", async () => {
  await processLifecycleReminders(
    snapshot(ProposalState.Queued, { eta: now + 1 }),
    state(),
    persist,
  );
  expect(send).not.toHaveBeenCalled();
});

it.each([
  true,
  false,
])("announces expiry once and stops reminders (activated=%s)", async (activated) => {
  const saved = state();
  saved.proposals["19"] = { events: {}, votingEnded: true };
  const s = snapshot(ProposalState.Expired, {
    eta: activated ? now - 86401 : 0,
    votingStarted: activated,
  });
  await processLifecycleReminders(s, saved, persist);
  await processLifecycleReminders(s, saved, persist);
  expect(send).toHaveBeenCalledTimes(1);
  expect(send.mock.calls[0][1]).toContain(
    activated ? "without being executed" : "without being activated",
  );
  expect(saved.proposals["19"].terminal).toBe(true);
});

it.each([
  ProposalState.Executed,
  ProposalState.Canceled,
  ProposalState.Vetoed,
])("stops execution reminders for terminal state %s", async (status) => {
  const saved = state();
  await processLifecycleReminders(
    snapshot(status, { eta: now - 1 }),
    saved,
    persist,
  );
  expect(send).not.toHaveBeenCalled();
  expect(saved.proposals["19"].terminal).toBe(true);
});

it("baselines old completed proposals on migration while notifying current actionable proposals", async () => {
  const saved = state();
  saved.lastProcessedBlock = 300;
  await processVotingEnded(snapshot(ProposalState.Expired), saved, persist);
  await processLifecycleReminders(
    snapshot(ProposalState.Expired),
    saved,
    persist,
  );
  expect(send).not.toHaveBeenCalled();
  const actionable = state();
  actionable.lastProcessedBlock = 300;
  await processVotingEnded(
    snapshot(ProposalState.Succeeded),
    actionable,
    persist,
  );
  await processLifecycleReminders(
    snapshot(ProposalState.Succeeded),
    actionable,
    persist,
  );
  expect(send).toHaveBeenCalledTimes(1);
  expect(send.mock.calls[0][1]).toContain("Awaiting Queue");
});

it("leaves failed notifications unsent for retry", async () => {
  const saved = state();
  send.mockRejectedValueOnce(new Error("Discord unavailable"));
  await expect(
    processLifecycleReminders(
      snapshot(ProposalState.Queued, { eta: now }),
      saved,
      persist,
    ),
  ).rejects.toThrow("Discord unavailable");
  expect(saved.proposals["19"].lastExecutionReminder).toBeUndefined();
  expect(persist).not.toHaveBeenCalled();
});

it.each([
  ProposalState.Canceled,
  ProposalState.Vetoed,
])("reports a completed vote even when a later transaction changes its final state (%s)", async (status) => {
  const saved = state();
  await processVotingEnded(snapshot(status), saved, persist);
  expect(send).toHaveBeenCalledTimes(1);
  expect(send.mock.calls[0][1]).toContain("Voting Ended — Passed");
  expect(send.mock.calls[0][1]).not.toContain("ready to be queued");
});

it("announces an execution expiry crossed after the migration cursor", async () => {
  jest.mocked(wasExpiredAtCursor).mockResolvedValue(false);
  const saved = state();
  const s = snapshot(ProposalState.Expired, { eta: now - 86401 });
  await processLifecycleReminders(s, saved, persist);
  expect(send).toHaveBeenCalledTimes(1);
  expect(send.mock.calls[0][1]).toContain("Proposal Expired");
});

it("announces an activation expiry crossed after the migration cursor", async () => {
  jest.mocked(wasExpiredAtCursor).mockResolvedValue(false);
  const saved = state();
  const s = snapshot(ProposalState.Expired, {
    eta: 0,
    endBlock: 0,
    votingStarted: false,
  });
  await processLifecycleReminders(s, saved, persist);
  expect(send).toHaveBeenCalledTimes(1);
  expect(send.mock.calls[0][1]).toContain("without being activated");
});

it.each([
  ProposalState.Canceled,
  ProposalState.Vetoed,
])("does not report a completed vote when it was interrupted before its deadline (%s)", async (status) => {
  jest.mocked(getCompletedVoteOutcome).mockResolvedValue(undefined);
  await processVotingEnded(snapshot(status), state(), persist);
  expect(send).not.toHaveBeenCalled();
});

it("preserves a defeated vote outcome when the proposal is cancelled afterwards", async () => {
  jest.mocked(getCompletedVoteOutcome).mockResolvedValue(false);
  await processVotingEnded(snapshot(ProposalState.Canceled), state(), persist);
  expect(send.mock.calls[0][1]).toContain("Voting Ended — Defeated");
});
