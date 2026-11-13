import * as assert from "node:assert/strict";
import { afterEach, beforeEach, it, mock } from "node:test";
import { format, isDeepStrictEqual } from "node:util";
import * as discord from "../discord";
import * as governor from "../governor";
import {
  getCompletedVoteOutcome,
  isEmergencyQueueCancelled,
  wasExpiredAtCursor,
} from "../governor";
import { processLifecycleReminders, processVotingEnded } from "../lifecycle";
import {
  type AlertState,
  type GovernanceSnapshot,
  ProposalState,
} from "../types";
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
      quorumVotes: 100n,
      forVotes: 0n,
      againstVotes: 0n,
      ...overrides,
    },
  ],
});
const state = (): AlertState => ({ lastProcessedBlock: 150, proposals: {} });
const persist = mock.fn(async () => undefined);
let send: ReturnType<typeof mock.fn<typeof discord.sendDiscordAlert>>;

const sentOptions = () => {
  const options = send.mock.calls[0].arguments[3];
  assert.ok(options);
  return options;
};
const sentDetails = () => {
  const details = sentOptions().details;
  assert.strictEqual(typeof details, "string");
  return details as string;
};

beforeEach(() => {
  mock.method(governor, "getCompletedVoteOutcome");
  mock.method(governor, "wasExpiredAtCursor");
  mock.method(governor, "isEmergencyQueueCancelled");

  mock.timers.enable({ apis: ["Date"], now: new Date(now * 1000) });
  persist.mock.resetCalls();
  send = mock.method(discord, "sendDiscordAlert", async () => undefined);
  mocked(getCompletedVoteOutcome).mock.mockImplementation(async () => true);
  mocked(wasExpiredAtCursor).mock.mockImplementation(async () => true);
  mocked(isEmergencyQueueCancelled).mock.mockImplementation(async () => false);
});

it("baselines a previously cancelled emergency queue without executable or expiry alerts", async () => {
  mocked(isEmergencyQueueCancelled).mock.mockImplementation(async () => true);
  const saved = state();
  const s = snapshot(ProposalState.Emergency, {
    eta: now - 1,
    votingStarted: false,
    endBlock: 0,
  });
  await processLifecycleReminders(s, saved, persist);
  await processLifecycleReminders(
    { ...s, timestamp: now + 86400 },
    saved,
    persist,
  );
  assert.strictEqual(mocked(send).mock.callCount(), 0);
  assert.strictEqual(saved.proposals["19"].terminal, true);
  assert.ok(
    mocked(isEmergencyQueueCancelled).mock.calls.some((call) =>
      isDeepStrictEqual(call.arguments, [s.proposals[0], s.blockNumber]),
    ),
  );
});
afterEach(() => {
  mock.timers.reset();
  mock.restoreAll();
});

it("sends active voting progress once every 24 hours across serialized state reloads", async () => {
  const s = snapshot(ProposalState.Active, {
    endBlock: 50000,
    quorumVotes: 2000n * 10n ** 18n,
    forVotes: 900n * 10n ** 18n,
    againstVotes: 300n * 10n ** 18n,
  });
  let saved = state();
  await processLifecycleReminders(s, saved, persist);
  assert.strictEqual(mocked(send).mock.callCount(), 1);
  assert.deepStrictEqual(send.mock.calls[0].arguments.slice(0, 3), [
    proposal,
    "Proposal Voting In Progress",
    new Date(now * 1000),
  ]);
  assert.strictEqual(sentOptions().deadline, now + (50000 - 200) * 12);
  assert.strictEqual(
    sentOptions().deadlineNote,
    "Estimated. Voting ends after block 50000.",
  );
  assert.ok(sentDetails().includes("Quorum reached: **45.00%**"));
  assert.ok(sentDetails().includes("Approval: **75.00% Yes / 25.00% No**"));
  assert.strictEqual(mocked(persist).mock.callCount(), 1);
  saved = JSON.parse(JSON.stringify(saved));
  mock.timers.setTime(Number(new Date((now + 86399) * 1000)));
  await processLifecycleReminders(
    { ...s, timestamp: now + 86399 },
    saved,
    persist,
  );
  assert.strictEqual(mocked(send).mock.callCount(), 1);
  mock.timers.setTime(Number(new Date((now + 86400) * 1000)));
  await processLifecycleReminders(
    { ...s, timestamp: now + 86400 },
    saved,
    persist,
  );
  assert.strictEqual(mocked(send).mock.callCount(), 2);
});

for (const [forVotes, againstVotes, quorumVotes, quorum, approval, note] of [
  [0n, 0n, 100n, "0.00%", "0.00% Yes / 0.00% No", "No Yes or No votes yet"],
  [200n, 0n, 100n, "100.00%", "100.00% Yes / 0.00% No", ""],
  [0n, 100n, 100n, "0.00%", "0.00% Yes / 100.00% No", ""],
  [1n, 2n, 0n, "Unavailable", "33.33% Yes / 66.67% No", ""],
] as const) {
  it(
    format(
      "handles zero votes, capped quorum and unavailable quorum (%s, %s, %s)",
      forVotes,
      againstVotes,
      quorumVotes,
      quorum,
      approval,
      note,
    ),
    async () => {
      await processLifecycleReminders(
        snapshot(ProposalState.Active, {
          endBlock: 300,
          forVotes,
          againstVotes,
          quorumVotes,
        }),
        state(),
        persist,
      );
      const details = sentDetails();
      assert.ok(details.includes(quorum));
      assert.ok(details.includes(approval));
      assert.ok(details.includes(note));
      assert.doesNotMatch(details, /NaN|Infinity/);
    },
  );
}

for (const status of [
  ProposalState.Pending,
  ProposalState.Canceled,
  ProposalState.Vetoed,
  ProposalState.Defeated,
  ProposalState.Executed,
  ProposalState.Emergency,
] as const) {
  it(
    format("does not send voting reminders outside active voting (%s)", status),
    async () => {
      await processLifecycleReminders(
        snapshot(status, { endBlock: 300 }),
        state(),
        persist,
      );
      assert.strictEqual(mocked(send).mock.callCount(), 0);
    },
  );
}

it("leaves a failed daily notification eligible for retry", async () => {
  const saved = state();
  const s = snapshot(ProposalState.Active, { endBlock: 300 });
  send.mock.mockImplementationOnce(async () => {
    throw new Error("Discord unavailable");
  });
  await assert.rejects(
    processLifecycleReminders(s, saved, persist),
    (error: unknown) =>
      error instanceof Error && error.message.includes("Discord unavailable"),
  );
  assert.strictEqual(mocked(persist).mock.callCount(), 0);
  await processLifecycleReminders(s, saved, persist);
  assert.strictEqual(mocked(send).mock.callCount(), 2);
});

it("keeps deliveries 24 hours apart when the indexer catches up", async () => {
  const saved = state();
  const s = snapshot(ProposalState.Active, { endBlock: 50000 });
  await processLifecycleReminders(
    { ...s, timestamp: now - 7199 },
    saved,
    persist,
  );
  mock.timers.setTime(Number(new Date((now + 79201) * 1000)));
  await processLifecycleReminders(
    { ...s, timestamp: now + 79201 },
    saved,
    persist,
  );
  assert.strictEqual(mocked(send).mock.callCount(), 1);
  mock.timers.setTime(Number(new Date((now + 86400) * 1000)));
  await processLifecycleReminders(
    { ...s, timestamp: now + 86400 },
    saved,
    persist,
  );
  assert.strictEqual(mocked(send).mock.callCount(), 2);
});

it("reminds through the inclusive end block, then stops", async () => {
  const saved = state();
  const s = snapshot(ProposalState.Active, { endBlock: 200 });
  await processLifecycleReminders(s, saved, persist);
  assert.strictEqual(mocked(send).mock.callCount(), 1);
  mock.timers.setTime(Number(new Date((now + 86400) * 1000)));
  await processLifecycleReminders(
    { ...s, blockNumber: 201, timestamp: now + 86400 },
    saved,
    persist,
  );
  assert.strictEqual(mocked(send).mock.callCount(), 1);
});

for (const status of [
  ProposalState.Succeeded,
  ProposalState.Defeated,
] as const) {
  it(
    format("announces voting completion and its outcome once (%s)", status),
    async () => {
      const saved = state();
      await processVotingEnded(snapshot(status), saved, persist);
      await processVotingEnded(snapshot(status), saved, persist);
      assert.strictEqual(mocked(send).mock.callCount(), 1);
      assert.ok(
        send.mock.calls[0].arguments[1].includes(
          status === ProposalState.Succeeded ? "Passed" : "Defeated",
        ),
      );
      assert.strictEqual(saved.proposals["19"].votingEnded, true);
    },
  );
}

it("does not end voting at the inclusive end block", async () => {
  await processVotingEnded(
    snapshot(ProposalState.Active, { endBlock: 200 }),
    state(),
    persist,
  );
  assert.strictEqual(mocked(send).mock.callCount(), 0);
});

it("reminds unqueued successful proposals every four hours without inventing an expiry", async () => {
  const saved = state();
  const s = snapshot(ProposalState.Succeeded);
  await processVotingEnded(s, saved, persist);
  send.mock.resetCalls();
  await processLifecycleReminders(s, saved, persist);
  assert.strictEqual(mocked(send).mock.callCount(), 0);
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
  assert.strictEqual(mocked(send).mock.callCount(), 1);
  assert.ok(send.mock.calls[0].arguments[1].includes("Awaiting Queue"));
  assert.doesNotMatch(send.mock.calls[0].arguments[1], /expir|deadline/i);
  assert.strictEqual(sentOptions().deadline, undefined);
  assert.ok(sentDetails().includes("There is no queue deadline."));
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
  assert.strictEqual(mocked(send).mock.callCount(), 1);
  assert.ok(send.mock.calls[0].arguments[1].includes("Executable"));
  assert.strictEqual(sentOptions().deadline, now + 86400);
  await processLifecycleReminders(
    { ...s, timestamp: now + 14400 },
    saved,
    persist,
  );
  assert.strictEqual(mocked(send).mock.callCount(), 2);
});

it("waits until ETA before reminding", async () => {
  await processLifecycleReminders(
    snapshot(ProposalState.Queued, { eta: now + 1 }),
    state(),
    persist,
  );
  assert.strictEqual(mocked(send).mock.callCount(), 0);
});

it("suppresses executable reminders after the real deadline while waiting for indexed expiry", async () => {
  const saved = state();
  const s = snapshot(ProposalState.Queued, { eta: now - 84600 });
  mock.timers.setTime(Number(new Date((now + 3600) * 1000)));
  await processLifecycleReminders(s, saved, persist);
  assert.strictEqual(mocked(send).mock.callCount(), 0);
  assert.notStrictEqual(saved.proposals["19"].terminal, true);
  await processLifecycleReminders(
    { ...s, timestamp: now + 3600 },
    saved,
    persist,
  );
  assert.strictEqual(mocked(send).mock.callCount(), 1);
  assert.ok(send.mock.calls[0].arguments[1].includes("Proposal Expired"));
  assert.strictEqual(saved.proposals["19"].terminal, true);
});

for (const activated of [true, false] as const) {
  it(
    format(
      "announces expiry once and stops reminders (activated=%s)",
      activated,
    ),
    async () => {
      const saved = state();
      saved.proposals["19"] = { events: {}, votingEnded: true };
      const s = snapshot(ProposalState.Expired, {
        eta: activated ? now - 86401 : 0,
        votingStarted: activated,
      });
      await processLifecycleReminders(s, saved, persist);
      await processLifecycleReminders(s, saved, persist);
      assert.strictEqual(mocked(send).mock.callCount(), 1);
      assert.ok(
        sentDetails().includes(
          activated ? "without being executed" : "without being activated",
        ),
      );
      assert.strictEqual(saved.proposals["19"].terminal, true);
    },
  );
}

for (const status of [
  ProposalState.Executed,
  ProposalState.Canceled,
  ProposalState.Vetoed,
] as const) {
  it(
    format("stops execution reminders for terminal state %s", status),
    async () => {
      const saved = state();
      await processLifecycleReminders(
        snapshot(status, { eta: now - 1 }),
        saved,
        persist,
      );
      assert.strictEqual(mocked(send).mock.callCount(), 0);
      assert.strictEqual(saved.proposals["19"].terminal, true);
    },
  );
}

it("baselines old completed proposals on migration while notifying current actionable proposals", async () => {
  const saved = state();
  saved.lastProcessedBlock = 300;
  await processVotingEnded(snapshot(ProposalState.Expired), saved, persist);
  await processLifecycleReminders(
    snapshot(ProposalState.Expired),
    saved,
    persist,
  );
  assert.strictEqual(mocked(send).mock.callCount(), 0);
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
  assert.strictEqual(mocked(send).mock.callCount(), 1);
  assert.ok(send.mock.calls[0].arguments[1].includes("Awaiting Queue"));
});

it("leaves failed notifications unsent for retry", async () => {
  const saved = state();
  send.mock.mockImplementationOnce(async () => {
    throw new Error("Discord unavailable");
  });
  await assert.rejects(
    processLifecycleReminders(
      snapshot(ProposalState.Queued, { eta: now }),
      saved,
      persist,
    ),
    (error: unknown) =>
      error instanceof Error && error.message.includes("Discord unavailable"),
  );
  assert.strictEqual(saved.proposals["19"].lastExecutionReminder, undefined);
  assert.strictEqual(mocked(persist).mock.callCount(), 0);
});

for (const status of [ProposalState.Canceled, ProposalState.Vetoed] as const) {
  it(
    format(
      "reports a completed vote even when a later transaction changes its final state (%s)",
      status,
    ),
    async () => {
      const saved = state();
      await processVotingEnded(snapshot(status), saved, persist);
      assert.strictEqual(mocked(send).mock.callCount(), 1);
      assert.ok(
        send.mock.calls[0].arguments[1].includes("Voting Ended — Passed"),
      );
      assert.ok(!sentDetails().includes("ready to be queued"));
    },
  );
}

it("announces an execution expiry crossed after the migration cursor", async () => {
  mocked(wasExpiredAtCursor).mock.mockImplementation(async () => false);
  const saved = state();
  const s = snapshot(ProposalState.Expired, { eta: now - 86401 });
  await processLifecycleReminders(s, saved, persist);
  assert.strictEqual(mocked(send).mock.callCount(), 1);
  assert.ok(send.mock.calls[0].arguments[1].includes("Proposal Expired"));
});

it("announces an activation expiry crossed after the migration cursor", async () => {
  mocked(wasExpiredAtCursor).mock.mockImplementation(async () => false);
  const saved = state();
  const s = snapshot(ProposalState.Expired, {
    eta: 0,
    endBlock: 0,
    votingStarted: false,
  });
  await processLifecycleReminders(s, saved, persist);
  assert.strictEqual(mocked(send).mock.callCount(), 1);
  assert.ok(sentDetails().includes("without being activated"));
});

for (const status of [ProposalState.Canceled, ProposalState.Vetoed] as const) {
  it(
    format(
      "does not report a completed vote when it was interrupted before its deadline (%s)",
      status,
    ),
    async () => {
      mocked(getCompletedVoteOutcome).mock.mockImplementation(
        async () => undefined,
      );
      await processVotingEnded(snapshot(status), state(), persist);
      assert.strictEqual(mocked(send).mock.callCount(), 0);
    },
  );
}

it("preserves a defeated vote outcome when the proposal is cancelled afterwards", async () => {
  mocked(getCompletedVoteOutcome).mock.mockImplementation(async () => false);
  await processVotingEnded(snapshot(ProposalState.Canceled), state(), persist);
  assert.ok(
    send.mock.calls[0].arguments[1].includes("Voting Ended — Defeated"),
  );
});
