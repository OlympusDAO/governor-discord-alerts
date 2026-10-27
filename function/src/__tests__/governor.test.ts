import {
  getCompletedVoteOutcome,
  getEventLogIndex,
  getGovernanceSnapshot,
  wasExpiredAtCursor,
} from "../governor";
import type { GovernorProposal, ProposalCreated } from "../types";

const proposal = { proposalId: "19" } as ProposalCreated;
const word = (value: number | bigint) =>
  BigInt(value).toString(16).padStart(64, "0");
const encodedProposal = `0x${[19, 1, 0, 0, 0, 26278037, 26328525, 0, 0, 0, 1, 0, 0, 0].map(word).join("")}`;
const originalFetch = global.fetch;
let seen: { method: string; params: unknown[] }[];

beforeEach(() => {
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

it("decodes live proposal getter fields and reads every value at the indexed block", async () => {
  const snapshot = await getGovernanceSnapshot([proposal], 26278125);
  expect(snapshot).toMatchObject({
    blockNumber: 26278125,
    executionGracePeriod: 86400,
    proposals: [
      { proposal, state: 1, eta: 0, endBlock: 26328525, votingStarted: true },
    ],
  });
  for (const call of seen.filter((c) => c.method === "eth_call")) {
    expect(call.params[1]).toBe("0x190f8ed");
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
