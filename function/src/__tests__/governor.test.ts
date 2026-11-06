import * as assert from "node:assert/strict";
import { afterEach, beforeEach, it, mock } from "node:test";
import { format, isDeepStrictEqual } from "node:util";
import {
  getCompletedVoteOutcome,
  getEventLogIndex,
  getGovernanceSnapshot,
  isEmergencyQueueCancelled,
  wasExpiredAtCursor,
} from "../governor";
import * as indexer from "../indexer";
import { getLatestProposalEvents } from "../indexer";
import type {
  GovernorProposal,
  ProposalCreated,
  ProposalEvents,
} from "../types";
import { assertSubset, mocked } from "./support";

const proposal = {
  proposalId: "19",
  blockNumber: "26278000",
} as ProposalCreated;
const word = (value: number | bigint) =>
  BigInt(value).toString(16).padStart(64, "0");
const encodedProposal = `0x${[19, 1, 0, 2000n * 10n ** 18n, 0, 26278037, 26328525, 900n * 10n ** 18n, 300n * 10n ** 18n, 800n * 10n ** 18n, 1, 0, 0, 0].map(word).join("")}`;
const originalFetch = global.fetch;
const originalRpc = process.env.GOVERNOR_RPC_URL;
let seen: { method: string; params: unknown[] }[];

beforeEach(() => {
  mock.method(indexer, "getLatestProposalEvents");

  process.env.GOVERNOR_RPC_URL = "https://example.invalid/archive-rpc";
  seen = [];
  global.fetch = mock.fn(async (_url: unknown, options?: RequestInit) => {
    const calls = JSON.parse(options?.body as string) as {
      id: number;
      method: string;
      params: [{ data: string }, string];
    }[];
    seen.push(...calls);
    return {
      ok: true,
      json: async () =>
        calls
          .map((c) => {
            let result: unknown;
            if (c.method === "eth_getBlockByNumber")
              result = { number: "0x190f8ed", timestamp: "0x6ade41d7" };
            else if (c.params[0].data.startsWith("0x013cf08b"))
              result = encodedProposal;
            else if (c.params[0].data.startsWith("0x3e4f49e6"))
              result = `0x${word(1)}`;
            else if (c.params[0].data === "0xd33219b4")
              result = `0x${"0".repeat(24)}953ea3223d2dd3c1a91e9d6cca1bf7af162c9c39`;
            else result = `0x${word(86400)}`;
            return { id: c.id, result };
          })
          .reverse(), // Batch responses need not preserve request order.
    };
  }) as unknown as typeof fetch;
});
afterEach(() => {
  mock.restoreAll();
  global.fetch = originalFetch;
  if (originalRpc === undefined) delete process.env.GOVERNOR_RPC_URL;
  else process.env.GOVERNOR_RPC_URL = originalRpc;
});

it("orders tied events by the last matching governor log, ignoring other contracts, kinds and proposals", async () => {
  const log = {
    address: "0x0941233c964e7d7efeb05d253176e5e634ceffcd",
    topics: [
      "0x9a2e42fd6722813d69113e7d0079d3d940171428df7373df9c7f7617cfda2892",
    ],
    data: `0x${word(19)}${word(1000)}`,
    logIndex: "0x7",
  };
  global.fetch = mock.fn(async (_url: unknown, options?: RequestInit) => {
    const [call] = JSON.parse(options?.body as string);
    assert.strictEqual(call.method, "eth_getTransactionReceipt");
    assert.deepStrictEqual(call.params, ["0xtransaction"]);
    return {
      ok: true,
      json: async () => [
        {
          id: 0,
          result: {
            blockNumber: "0xbe",
            logs: [
              log,
              { ...log, logIndex: "0x9" },
              { ...log, address: "0xother", logIndex: "0xa" },
              { ...log, topics: ["0xother"], logIndex: "0xb" },
              { ...log, data: `0x${word(20)}${word(1000)}`, logIndex: "0xc" },
            ],
          },
        },
      ],
    };
  }) as unknown as typeof fetch;
  assert.strictEqual(
    await getEventLogIndex("queued", {
      proposalId: "19",
      transactionHash: "0xtransaction",
      blockNumber: "190",
    }),
    9,
  );
  await assert.rejects(
    getEventLogIndex("cancelled", {
      proposalId: "19",
      transactionHash: "0xtransaction",
      blockNumber: "190",
    }),
    (error: unknown) =>
      error instanceof Error &&
      error.message.includes("Governor event is missing"),
  );
  await assert.rejects(
    getEventLogIndex("queued", {
      proposalId: "19",
      transactionHash: "0xtransaction",
      blockNumber: "191",
    }),
    (error: unknown) =>
      error instanceof Error &&
      error.message.includes("Governor event receipt block mismatch"),
  );
});

it("reads current values at the indexed block and checks archive access at proposal creation", async () => {
  const snapshot = await getGovernanceSnapshot([proposal], 26278125);
  assertSubset(snapshot, {
    blockNumber: 26278125,
    executionGracePeriod: 86400,
    proposals: [
      { proposal, state: 1, eta: 0, endBlock: 26328525, votingStarted: true },
    ],
  });
  assertSubset(snapshot.proposals[0], {
    quorumVotes: 2000n * 10n ** 18n,
    forVotes: 900n * 10n ** 18n,
    againstVotes: 300n * 10n ** 18n,
  });
  for (const call of seen.filter((c) => c.method === "eth_call")) {
    assert.strictEqual(
      call.params[1],
      call === seen[seen.length - 2]
        ? `0x${Number(proposal.blockNumber).toString(16)}`
        : "0x190f8ed",
    );
  }
  assert.deepStrictEqual(
    seen.find(
      (c) =>
        c.method === "eth_call" &&
        (c.params[0] as { data: string }).data.startsWith("0x013cf08b"),
    )?.params[0],
    {
      to: "0x0941233c964e7d7efeb05d253176e5e634ceffcd",
      data: `0x013cf08b${word(19)}`,
    },
  );
});

it("requires an explicit archive RPC rather than using a recent-state-only default", async () => {
  delete process.env.GOVERNOR_RPC_URL;
  await assert.rejects(
    getGovernanceSnapshot([proposal], 26278125),
    (error: unknown) =>
      error instanceof Error && error.message.includes("archive-capable"),
  );
  assert.strictEqual(mocked(fetch).mock.callCount(), 0);
});

it("fails the snapshot before notification processing when historical state access is rejected", async () => {
  const fetchMock = global.fetch;
  global.fetch = mock.fn(async (url: unknown, options?: RequestInit) => {
    const calls = JSON.parse(options?.body as string);
    if (
      calls.some(
        (call: { params: unknown[] }) =>
          call.params[1] === `0x${Number(proposal.blockNumber).toString(16)}`,
      )
    )
      return {
        ok: true,
        json: async () =>
          calls.map((call: { id: number }) => ({
            id: call.id,
            error: { code: -32602 },
          })),
      };
    return fetchMock(url as string, options);
  }) as unknown as typeof fetch;
  await assert.rejects(
    getGovernanceSnapshot([proposal], 26278125),
    (error: unknown) =>
      error instanceof Error && error.message.includes("-32602"),
  );
});

for (const [queueBlock, cancelBlock, queueIndex, cancelIndex, cancelled] of [
  [180, 190, 7, 8, true],
  [190, 180, 7, 8, false],
  [190, 190, 7, 8, true],
  [190, 190, 8, 7, false],
] as const) {
  it(
    format(
      "baselines the latest emergency queue against cancellation (%s, %s, %s, %s)",
      queueBlock,
      cancelBlock,
      queueIndex,
      cancelIndex,
      cancelled,
    ),
    async () => {
      const marker = {
        proposalId: "19",
        blockNumber: String(queueBlock),
        transactionHash: "0xqueue",
        eta: "1000",
      };
      const history = {
        created: [],
        votingStarted: [],
        executed: [],
        vetoed: [],
        queued: [marker],
        cancelled: [
          {
            ...marker,
            blockNumber: String(cancelBlock),
            transactionHash: "0xcancel",
          },
        ],
      } as unknown as ProposalEvents;
      mocked(getLatestProposalEvents).mock.mockImplementation(async () => [
        history,
        200,
      ]);
      global.fetch = mock.fn(async (_url: unknown, options?: RequestInit) => {
        const [call] = JSON.parse(options?.body as string);
        const queue = call.params[0] === "0xqueue";
        return {
          ok: true,
          json: async () => [
            {
              id: 0,
              result: {
                blockNumber: "0xbe",
                logs: [
                  {
                    address: "0x0941233c964e7d7efeb05d253176e5e634ceffcd",
                    topics: [
                      queue
                        ? "0x9a2e42fd6722813d69113e7d0079d3d940171428df7373df9c7f7617cfda2892"
                        : "0x789cf55be980739dad1d0699b93b58e806b51c9d96619bfa8fe0a28abaa7b30c",
                    ],
                    data: `0x${word(19)}${queue ? word(1000) : ""}`,
                    logIndex: `0x${(queue ? queueIndex : cancelIndex).toString(16)}`,
                  },
                ],
              },
            },
          ],
        };
      }) as unknown as typeof fetch;
      assert.strictEqual(
        await isEmergencyQueueCancelled(
          { proposal, eta: 1000 } as GovernorProposal,
          200,
        ),
        cancelled,
      );
      assert.ok(
        mocked(getLatestProposalEvents).mock.calls.some((call) =>
          isDeepStrictEqual(call.arguments, [0]),
        ),
      );
      await assert.rejects(
        isEmergencyQueueCancelled(
          { proposal, eta: 2000 } as GovernorProposal,
          200,
        ),
        (error: unknown) =>
          error instanceof Error &&
          error.message.includes("Queue history does not match"),
      );
    },
  );
}

it("fails on missing/error RPC results instead of making up a proposal state", async () => {
  global.fetch = mock.fn(async () => ({
    ok: true,
    json: async () => [{ id: 0, error: { code: -32000 } }],
  })) as unknown as typeof fetch;
  await assert.rejects(
    getGovernanceSnapshot([proposal], 26278125),
    (error: unknown) =>
      error instanceof Error &&
      error.message.includes("Governor RPC call 0 failed"),
  );
});

it("rejects incomplete ABI data", async () => {
  global.fetch = mock.fn(async (_url: unknown, options?: RequestInit) => ({
    ok: true,
    json: async () =>
      JSON.parse(options?.body as string).map((c: { id: number }) => ({
        id: c.id,
        result:
          c.id === 0
            ? { number: "0x190f8ed", timestamp: "0x6ade41d7" }
            : "0x1234",
      })),
  })) as unknown as typeof fetch;
  await assert.rejects(
    getGovernanceSnapshot([proposal], 26278125),
    (error: unknown) =>
      error instanceof Error &&
      error.message.includes("Unexpected governor ABI response"),
  );
});

for (const outcome of [0n, 1n] as const) {
  it(
    format(
      "reads the completed vote outcome at the deadline instead of using its later terminal state (%s)",
      outcome,
    ),
    async () => {
      global.fetch = mock.fn(async (_url: unknown, options?: RequestInit) => {
        const calls = JSON.parse(options?.body as string) as {
          id: number;
          params: [{ data: string }, string];
        }[];
        assert.strictEqual(
          calls.every((call) => call.params[1] === "0xc7"),
          true,
        );
        return {
          ok: true,
          json: async () =>
            calls.map((call) => ({
              id: call.id,
              result: `0x${word(call.params[0].data.startsWith("0x3e4f49e6") ? 1n : outcome)}`,
            })),
        };
      }) as unknown as typeof fetch;
      assert.strictEqual(
        await getCompletedVoteOutcome("19", 199),
        outcome === 1n,
      );
    },
  );
}

it("recognizes voting interrupted before its deadline", async () => {
  global.fetch = mock.fn(async () => ({
    ok: true,
    json: async () => [
      { id: 0, result: `0x${word(2)}` },
      { id: 1, result: `0x${word(1)}` },
    ],
  })) as unknown as typeof fetch;
  assert.strictEqual(await getCompletedVoteOutcome("19", 199), undefined);
});

for (const timestamp of [1793032918, 1793032919, 1793032920] as const) {
  it(
    format(
      "baselines execution expiry using the actual cursor timestamp (%s)",
      timestamp,
    ),
    async () => {
      global.fetch = mock.fn(async (_url: unknown, options?: RequestInit) => {
        const [call] = JSON.parse(options?.body as string);
        assert.strictEqual(call.method, "eth_getBlockByNumber");
        assert.strictEqual(call.params[0], "0x96");
        return {
          ok: true,
          json: async () => [
            {
              id: 0,
              result: {
                number: "0x96",
                timestamp: `0x${timestamp.toString(16)}`,
              },
            },
          ],
        };
      }) as unknown as typeof fetch;
      assert.strictEqual(
        await wasExpiredAtCursor(
          { proposal, eta: 1792946519 } as GovernorProposal,
          150,
          86400,
        ),
        timestamp > 1793032919,
      );
    },
  );
}

for (const status of [0n, 6n] as const) {
  it(
    format(
      "baselines unactivated expiry from the contract state at the cursor (%s)",
      status,
    ),
    async () => {
      global.fetch = mock.fn(async (_url: unknown, options?: RequestInit) => {
        const [call] = JSON.parse(options?.body as string);
        assert.strictEqual(call.params[1], "0x96");
        return {
          ok: true,
          json: async () => [{ id: 0, result: `0x${word(status)}` }],
        };
      }) as unknown as typeof fetch;
      assert.strictEqual(
        await wasExpiredAtCursor(
          { proposal, eta: 0 } as GovernorProposal,
          150,
          86400,
        ),
        status === 6n,
      );
    },
  );
}
