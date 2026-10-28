import {
  getCompletedVoteOutcome,
  getEventLogIndex,
  getGovernanceSnapshot,
  isEmergencyQueueCancelled,
  wasExpiredAtCursor,
} from "../governor";
import { getLatestProposalEvents } from "../indexer";
import type {
  GovernorProposal,
  ProposalCreated,
  ProposalEvents,
} from "../types";

jest.mock("../indexer");

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
  jest.clearAllMocks();
  process.env.GOVERNOR_RPC_URL = "https://example.invalid/archive-rpc";
  seen = [];
  global.fetch = jest.fn(async (_url: unknown, options?: RequestInit) => {
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
  global.fetch = jest.fn(async (_url: unknown, options?: RequestInit) => {
    const [call] = JSON.parse(options?.body as string);
    expect(call.method).toBe("eth_getTransactionReceipt");
    expect(call.params).toEqual(["0xtransaction"]);
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
  expect(
    await getEventLogIndex("queued", {
      proposalId: "19",
      transactionHash: "0xtransaction",
      blockNumber: "190",
    }),
  ).toBe(9);
  await expect(
    getEventLogIndex("cancelled", {
      proposalId: "19",
      transactionHash: "0xtransaction",
      blockNumber: "190",
    }),
  ).rejects.toThrow("Governor event is missing");
  await expect(
    getEventLogIndex("queued", {
      proposalId: "19",
      transactionHash: "0xtransaction",
      blockNumber: "191",
    }),
  ).rejects.toThrow("Governor event receipt block mismatch");
});

it("reads current values at the indexed block and checks archive access at proposal creation", async () => {
  const snapshot = await getGovernanceSnapshot([proposal], 26278125);
  expect(snapshot).toMatchObject({
    blockNumber: 26278125,
    executionGracePeriod: 86400,
    proposals: [
      { proposal, state: 1, eta: 0, endBlock: 26328525, votingStarted: true },
    ],
  });
  expect(snapshot.proposals[0]).toMatchObject({
    quorumVotes: 2000n * 10n ** 18n,
    forVotes: 900n * 10n ** 18n,
    againstVotes: 300n * 10n ** 18n,
  });
  for (const call of seen.filter((c) => c.method === "eth_call")) {
    expect(call.params[1]).toBe(
      call === seen[seen.length - 2]
        ? `0x${Number(proposal.blockNumber).toString(16)}`
        : "0x190f8ed",
    );
  }
  expect(
    seen.find(
      (c) =>
        c.method === "eth_call" &&
        (c.params[0] as { data: string }).data.startsWith("0x013cf08b"),
    )?.params[0],
  ).toEqual({
    to: "0x0941233c964e7d7efeb05d253176e5e634ceffcd",
    data: `0x013cf08b${word(19)}`,
  });
});

it("requires an explicit archive RPC rather than using a recent-state-only default", async () => {
  delete process.env.GOVERNOR_RPC_URL;
  await expect(getGovernanceSnapshot([proposal], 26278125)).rejects.toThrow(
    "archive-capable",
  );
  expect(fetch).not.toHaveBeenCalled();
});

it("fails the snapshot before notification processing when historical state access is rejected", async () => {
  const fetchMock = global.fetch;
  global.fetch = jest.fn(async (url: unknown, options?: RequestInit) => {
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
  await expect(getGovernanceSnapshot([proposal], 26278125)).rejects.toThrow(
    "-32602",
  );
});

it.each([
  [180, 190, 7, 8, true],
  [190, 180, 7, 8, false],
  [190, 190, 7, 8, true],
  [190, 190, 8, 7, false],
])("baselines the latest emergency queue against cancellation (%s, %s, %s, %s)", async (queueBlock, cancelBlock, queueIndex, cancelIndex, cancelled) => {
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
  jest.mocked(getLatestProposalEvents).mockResolvedValue([history, 200]);
  global.fetch = jest.fn(async (_url: unknown, options?: RequestInit) => {
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
  expect(
    await isEmergencyQueueCancelled(
      { proposal, eta: 1000 } as GovernorProposal,
      200,
    ),
  ).toBe(cancelled);
  expect(getLatestProposalEvents).toHaveBeenCalledWith(0);
  await expect(
    isEmergencyQueueCancelled({ proposal, eta: 2000 } as GovernorProposal, 200),
  ).rejects.toThrow("Queue history does not match");
});

it("fails on missing/error RPC results instead of making up a proposal state", async () => {
  global.fetch = jest.fn(async () => ({
    ok: true,
    json: async () => [{ id: 0, error: { code: -32000 } }],
  })) as unknown as typeof fetch;
  await expect(getGovernanceSnapshot([proposal], 26278125)).rejects.toThrow(
    "Governor RPC call 0 failed",
  );
});

it("rejects incomplete ABI data", async () => {
  global.fetch = jest.fn(async (_url: unknown, options?: RequestInit) => ({
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
  await expect(getGovernanceSnapshot([proposal], 26278125)).rejects.toThrow(
    "Unexpected governor ABI response",
  );
});

it.each([
  0n,
  1n,
])("reads the completed vote outcome at the deadline instead of using its later terminal state (%s)", async (outcome) => {
  global.fetch = jest.fn(async (_url: unknown, options?: RequestInit) => {
    const calls = JSON.parse(options?.body as string) as {
      id: number;
      params: [{ data: string }, string];
    }[];
    expect(calls.every((call) => call.params[1] === "0xc7")).toBe(true);
    return {
      ok: true,
      json: async () =>
        calls.map((call) => ({
          id: call.id,
          result: `0x${word(call.params[0].data.startsWith("0x3e4f49e6") ? 1n : outcome)}`,
        })),
    };
  }) as unknown as typeof fetch;
  expect(await getCompletedVoteOutcome("19", 199)).toBe(outcome === 1n);
});

it("recognizes voting interrupted before its deadline", async () => {
  global.fetch = jest.fn(async () => ({
    ok: true,
    json: async () => [
      { id: 0, result: `0x${word(2)}` },
      { id: 1, result: `0x${word(1)}` },
    ],
  })) as unknown as typeof fetch;
  expect(await getCompletedVoteOutcome("19", 199)).toBeUndefined();
});

it.each([
  1793032918, 1793032919, 1793032920,
])("baselines execution expiry using the actual cursor timestamp (%s)", async (timestamp) => {
  global.fetch = jest.fn(async (_url: unknown, options?: RequestInit) => {
    const [call] = JSON.parse(options?.body as string);
    expect(call.method).toBe("eth_getBlockByNumber");
    expect(call.params[0]).toBe("0x96");
    return {
      ok: true,
      json: async () => [
        {
          id: 0,
          result: { number: "0x96", timestamp: `0x${timestamp.toString(16)}` },
        },
      ],
    };
  }) as unknown as typeof fetch;
  expect(
    await wasExpiredAtCursor(
      { proposal, eta: 1792946519 } as GovernorProposal,
      150,
      86400,
    ),
  ).toBe(timestamp > 1793032919);
});

it.each([
  0n,
  6n,
])("baselines unactivated expiry from the contract state at the cursor (%s)", async (status) => {
  global.fetch = jest.fn(async (_url: unknown, options?: RequestInit) => {
    const [call] = JSON.parse(options?.body as string);
    expect(call.params[1]).toBe("0x96");
    return {
      ok: true,
      json: async () => [{ id: 0, result: `0x${word(status)}` }],
    };
  }) as unknown as typeof fetch;
  expect(
    await wasExpiredAtCursor(
      { proposal, eta: 0 } as GovernorProposal,
      150,
      86400,
    ),
  ).toBe(status === 6n);
});
