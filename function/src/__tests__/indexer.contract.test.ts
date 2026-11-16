import * as assert from "node:assert/strict";
import { describe, it } from "node:test";

const API = process.env.INDEXER_API_URL?.replace(/\/+$/, "");
const describeLive = API ? describe : describe.skip;

const get = async (path: string) => {
  const response = await fetch(`${API}${path}`);
  assert.strictEqual(response.status, 200);
  return response.json() as Promise<{ data: never; meta: { block: number } }>;
};

const MARKER = [
  "id",
  "blockNumber",
  "blockTimestamp",
  "proposalId",
  "transactionHash",
];
const CREATED = [
  ...MARKER,
  "description",
  "proposer",
  "calldatas",
  "targets",
  "values",
  "signatures",
  "startBlock",
];

describeLive("governor routes' contract with the indexer", () => {
  it("proposal-events returns all six collections and the indexed head", async () => {
    const body = await get("/v1/governor/proposal-events?sinceBlock=0&limit=5");
    const data = body.data as unknown as Record<
      string,
      Record<string, unknown>[]
    >;

    // The names this function maps onto ProposalEvents. `canceled` here,
    // `cancelled` in the local type — the rename is deliberate and this is
    // what pins it.
    for (const key of [
      "created",
      "canceled",
      "executed",
      "queued",
      "vetoed",
      "votingStarted",
    ] as const) {
      assert.strictEqual(Array.isArray(data[key]), true);
    }

    for (const field of CREATED) {
      assert.ok(Object.hasOwn(data.created[0], field));
    }

    // Every non-created event carries the proposal the alert text is built
    // from; a null here would print "undefined" into Discord.
    for (const key of [
      "canceled",
      "executed",
      "queued",
      "votingStarted",
    ] as const) {
      const row = data[key][0];
      if (!row) continue;
      assert.ok(Object.hasOwn(row, "proposal"));
      for (const field of CREATED) {
        assert.ok(
          Object.hasOwn(row.proposal as Record<string, unknown>, field),
        );
      }
    }

    assert.ok(Object.hasOwn(data.queued[0], "eta"));
    assert.strictEqual(typeof body.meta.block, "number");
  });

  it("queued proposals carry eta and their created proposal", async () => {
    const body = await get("/v1/governor/proposals/queued?etaAfter=0&limit=5");
    const rows = body.data as unknown as Record<string, unknown>[];
    assert.ok(rows.length > 0);
    for (const field of [...MARKER, "eta"] as const) {
      assert.ok(Object.hasOwn(rows[0], field));
    }
    assert.ok(Object.hasOwn(rows[0].proposal as object, "description"));
  });

  it("executed proposals are addressable by the queued proposals' ids", async () => {
    const listed = await get("/v1/governor/proposals/executed?limit=3");
    const rows = listed.data as unknown as { id: string; proposalId: string }[];
    assert.ok(rows.length > 0);

    // The de-duplication in getCurrentQueuedProposals passes proposal ids into
    // `ids`, which only works because ProposalExecuted is keyed by proposal id.
    for (const row of rows) {
      assert.strictEqual(row.id, row.proposalId);
    }

    const ids = rows.map((row) => row.proposalId).join(",");
    const filtered = await get(`/v1/governor/proposals/executed?ids=${ids}`);
    assert.strictEqual(
      (filtered.data as unknown as unknown[]).length,
      rows.length,
    );
  });
});
