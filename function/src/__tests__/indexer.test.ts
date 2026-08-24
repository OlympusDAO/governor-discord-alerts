import { getCurrentQueuedProposals, getLatestProposalEvents } from "../indexer";
import type { ProposalCreated } from "../types";

// The two things this module does beyond issuing a request, both of which are
// silent when wrong:
//
//   * `canceled` on the wire becomes `cancelled` in ProposalEvents. A missed
//     rename means cancellation alerts stop and nothing errors.
//   * queued proposals are de-duplicated against executed ones, which is what
//     stops an execution reminder firing for a proposal that already executed.
//
// The requests themselves are covered against a deployed API by
// indexer.contract.test.ts; this covers the mapping on top of them.

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
  global.fetch = jest.fn(async (url: string) => {
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
    expect(events.cancelled.map((e) => e.proposalId)).toEqual(["2"]);
    expect(events.created.map((e) => e.proposalId)).toEqual(["1"]);
    expect(events.executed.map((e) => e.proposalId)).toEqual(["3"]);
    expect(events.queued.map((e) => e.proposalId)).toEqual(["4"]);
    expect(events.vetoed).toEqual([]);
    expect(events.votingStarted.map((e) => e.proposalId)).toEqual(["5"]);

    // `meta.block` replaces `_meta { block { number } }` as the stored cursor.
    expect(latestBlock).toBe(98765);
  });

  it("passes the caller's block through as sinceBlock", async () => {
    const seen: string[] = [];
    global.fetch = jest.fn(async (url: string) => {
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

    expect(seen[0]).toContain("sinceBlock=4242");
  });
});

describe("getCurrentQueuedProposals", () => {
  it("drops queued proposals that have already executed", async () => {
    respondWith({
      "/v1/governor/proposals/queued": [
        { ...marker("10"), eta: "1700009999" },
        { ...marker("11"), eta: "1700009999" },
        { ...marker("12"), eta: "1700009999" },
      ],
      // ProposalExecuted is keyed by proposal id, which is what makes
      // addressing it with the queued ids correct.
      "/v1/governor/proposals/executed": [marker("11")],
    });

    const queued = await getCurrentQueuedProposals();

    expect(queued.map((p) => p.proposalId)).toEqual(["10", "12"]);
  });

  it("keeps every queued proposal when none has executed", async () => {
    respondWith({
      "/v1/governor/proposals/queued": [{ ...marker("10"), eta: "1700009999" }],
      "/v1/governor/proposals/executed": [],
    });

    expect(
      (await getCurrentQueuedProposals()).map((p) => p.proposalId),
    ).toEqual(["10"]);
  });

  it("does not ask about executed proposals when nothing is queued", async () => {
    const seen: string[] = [];
    global.fetch = jest.fn(async (url: string) => {
      seen.push(new URL(url).pathname);
      return {
        ok: true,
        status: 200,
        json: async () => ({ data: [], meta: { block: 1 } }),
      };
    }) as unknown as typeof global.fetch;

    expect(await getCurrentQueuedProposals()).toEqual([]);
    // A second request with an empty `ids` list would return every executed
    // proposal, not none of them.
    expect(seen).toEqual(["/v1/governor/proposals/queued"]);
  });
});

describe("error handling", () => {
  it("surfaces the API's error code rather than a bare status", async () => {
    global.fetch = jest.fn(async () => ({
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
    await expect(getLatestProposalEvents(1)).rejects.toThrow(
      "unsupported_query_parameter",
    );
  });

  it("falls back to the status line when the error body is not JSON", async () => {
    global.fetch = jest.fn(async () => ({
      ok: false,
      status: 502,
      statusText: "Bad Gateway",
      json: async () => {
        throw new Error("not json");
      },
    })) as unknown as typeof global.fetch;

    await expect(getLatestProposalEvents(1)).rejects.toThrow("502 Bad Gateway");
  });
});
