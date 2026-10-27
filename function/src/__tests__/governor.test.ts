import { getGovernanceSnapshot } from "../governor";
import type { ProposalCreated } from "../types";

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
