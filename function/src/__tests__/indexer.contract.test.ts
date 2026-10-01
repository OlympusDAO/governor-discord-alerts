// Contract tests against a DEPLOYED protocol indexer.
//
// src/types.ts describes shapes the API promises, and nothing else here checks
// that promise — a field renamed upstream would typecheck locally and break
// this function at runtime, in a cron nobody watches until an alert goes
// missing. These make the requests the function makes and assert the fields it
// reads.
//
//   INDEXER_API_URL=https://<api-host> pnpm test
//
// Skipped without INDEXER_API_URL, so the normal suite stays offline.

const API = process.env.INDEXER_API_URL?.replace(/\/+$/, "");
const describeLive = API ? describe : describe.skip;

const get = async (path: string) => {
  const response = await fetch(`${API}${path}`);
  expect(response.status).toBe(200);
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
    ]) {
      expect(Array.isArray(data[key])).toBe(true);
    }

    for (const field of CREATED) {
      expect(data.created[0]).toHaveProperty(field);
    }

    // Every non-created event carries the proposal the alert text is built
    // from; a null here would print "undefined" into Discord.
    for (const key of ["canceled", "executed", "queued", "votingStarted"]) {
      const row = data[key][0];
      if (!row) continue;
      expect(row).toHaveProperty("proposal");
      for (const field of CREATED) {
        expect(row.proposal as Record<string, unknown>).toHaveProperty(field);
      }
    }

    expect(data.queued[0]).toHaveProperty("eta");
    expect(typeof body.meta.block).toBe("number");
  });

  it("queued proposals carry eta and their created proposal", async () => {
    const body = await get("/v1/governor/proposals/queued?etaAfter=0&limit=5");
    const rows = body.data as unknown as Record<string, unknown>[];
    expect(rows.length).toBeGreaterThan(0);
    for (const field of [...MARKER, "eta"]) {
      expect(rows[0]).toHaveProperty(field);
    }
    expect(rows[0].proposal).toHaveProperty("description");
  });

  it("executed proposals are addressable by the queued proposals' ids", async () => {
    const listed = await get("/v1/governor/proposals/executed?limit=3");
    const rows = listed.data as unknown as { id: string; proposalId: string }[];
    expect(rows.length).toBeGreaterThan(0);

    // The de-duplication in getCurrentQueuedProposals passes proposal ids into
    // `ids`, which only works because ProposalExecuted is keyed by proposal id.
    for (const row of rows) {
      expect(row.id).toBe(row.proposalId);
    }

    const ids = rows.map((row) => row.proposalId).join(",");
    const filtered = await get(`/v1/governor/proposals/executed?ids=${ids}`);
    expect((filtered.data as unknown as unknown[]).length).toBe(rows.length);
  });
});
