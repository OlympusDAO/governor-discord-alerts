import * as assert from "node:assert/strict";
import { afterEach, describe, it, mock } from "node:test";
import { getLatestProposalEvents, getProposals } from "../indexer";
import type { ProposalCreated } from "../types";

const originalFetch = global.fetch;

const proposal = (proposalId: string): ProposalCreated => ({
  id: proposalId,
  blockNumber: "100",
  blockTimestamp: "1700000000",
  description: `# Proposal ${proposalId}`,
  proposalId,
  proposer: "0xproposer",
  transactionHash: `0x${proposalId}`,
  calldatas: [],
  targets: [],
  values: [],
  signatures: [],
  startBlock: "90",
});

const marker = (proposalId: string) => ({
  id: proposalId,
  blockNumber: "100",
  blockTimestamp: "1700000000",
  proposalId,
  transactionHash: `0x${proposalId}`,
  proposal: proposal(proposalId),
});

const respondWith = (byPath: Record<string, unknown>, block = 12345) => {
  global.fetch = mock.fn(async (url: string) => {
    const path = new URL(url).pathname;
    const data = byPath[path];
    if (data === undefined) throw new Error(`unexpected request: ${path}`);
    return {
      ok: true,
      status: 200,
      json: async () => ({ data, meta: { block } }),
    };
  }) as unknown as typeof global.fetch;
};

afterEach(() => {
  global.fetch = originalFetch;
  mock.timers.reset();
});

describe("getLatestProposalEvents", () => {
  it("renames canceled to cancelled and returns the indexed head as the cursor", async () => {
    respondWith(
      {
        "/v1/governor/proposal-events": {
          created: [proposal("1")],
          canceled: [marker("2")],
          executed: [marker("3")],
          queued: [{ ...marker("4"), eta: "1700009999" }],
          vetoed: [],
          votingStarted: [marker("5")],
        },
      },
      98765,
    );

    const [events, latestBlock] = await getLatestProposalEvents(100);

    // The wire says `canceled`; this codebase says `cancelled`.
    assert.deepStrictEqual(
      events.cancelled.map((e) => e.proposalId),
      ["2"],
    );
    assert.deepStrictEqual(
      events.created.map((e) => e.proposalId),
      ["1"],
    );
    assert.deepStrictEqual(
      events.executed.map((e) => e.proposalId),
      ["3"],
    );
    assert.deepStrictEqual(
      events.queued.map((e) => e.proposalId),
      ["4"],
    );
    assert.deepStrictEqual(events.vetoed, []);
    assert.deepStrictEqual(
      events.votingStarted.map((e) => e.proposalId),
      ["5"],
    );

    // `meta.block` replaces `_meta { block { number } }` as the stored cursor.
    assert.strictEqual(latestBlock, 98765);
  });

  it("passes the caller's block through as sinceBlock", async () => {
    const seen: string[] = [];
    global.fetch = mock.fn(async (url: string) => {
      seen.push(url);
      return {
        ok: true,
        status: 200,
        json: async () => ({
          data: {
            created: [],
            canceled: [],
            executed: [],
            queued: [],
            vetoed: [],
            votingStarted: [],
          },
          meta: { block: 1 },
        }),
      };
    }) as unknown as typeof global.fetch;

    await getLatestProposalEvents(4242);

    assert.ok(seen[0].includes("sinceBlock=4242"));
  });
});

describe("getProposals", () => {
  it("loads proposal details for lifecycle polling", async () => {
    respondWith({ "/v1/governor/proposals": [proposal("19")] });
    assert.deepStrictEqual(
      (await getProposals()).map((p) => p.proposalId),
      ["19"],
    );
  });

  it("fails loudly rather than silently dropping proposals when the page fills", async () => {
    respondWith({ "/v1/governor/proposals": Array(1000).fill(proposal("19")) });
    await assert.rejects(
      getProposals(),
      (error: unknown) =>
        error instanceof Error &&
        error.message.includes("pagination is required"),
    );
  });
});

describe("error handling", () => {
  it("surfaces the API's error code rather than a bare status", async () => {
    global.fetch = mock.fn(async () => ({
      ok: false,
      status: 400,
      statusText: "Bad Request",
      json: async () => ({
        error: {
          code: "unsupported_query_parameter",
          message: "Unsupported: order",
        },
      }),
    })) as unknown as typeof global.fetch;

    // A 400 means this code sent a parameter the route does not accept, which
    // is a bug here rather than an outage — the code is what says so.
    await assert.rejects(
      getLatestProposalEvents(1),
      (error: unknown) =>
        error instanceof Error &&
        error.message.includes("unsupported_query_parameter"),
    );
  });

  it("falls back to the status line when the error body is not JSON", async () => {
    global.fetch = mock.fn(async () => ({
      ok: false,
      status: 502,
      statusText: "Bad Gateway",
      json: async () => {
        throw new Error("not json");
      },
    })) as unknown as typeof global.fetch;

    await assert.rejects(
      getLatestProposalEvents(1),
      (error: unknown) =>
        error instanceof Error && error.message.includes("502 Bad Gateway"),
    );
  });
});
