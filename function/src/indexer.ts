import { getIndexerUrl } from "./constants";
import type { ProposalEvents, ProposalExecuted, ProposalQueued } from "./types";
import { toBlockTimestamp } from "./utils/date";

// Every route answers `{ data, meta: { block } }`, where `meta.block` is the
// indexed head — the same freshness signal the subgraph's `_meta { block }`
// gave us, which this function uses as its cursor.
type Envelope<T> = { data: T; meta: { block: number } };

const get = async <T>(path: string): Promise<Envelope<T>> => {
  const response = await fetch(`${getIndexerUrl()}${path}`, {
    headers: { accept: "application/json" },
  });

  if (!response.ok) {
    // Failures answer `{ error: { code, message } }`. The code is worth
    // surfacing: a 400 means this function sent a parameter the route does not
    // accept, which is a bug here rather than an outage.
    let detail = `${response.status} ${response.statusText}`;
    try {
      const body = (await response.json()) as {
        error?: { code?: string; message?: string };
      };
      if (body.error?.code) {
        detail = `${body.error.code}: ${body.error.message ?? detail}`;
      }
    } catch {
      // Non-JSON error body; the status line is all we have.
    }
    throw new Error(`Indexer request failed for ${path} (${detail})`);
  }

  return (await response.json()) as Envelope<T>;
};

/**
 * Get the proposal events from the indexer after a given block
 *
 * @param block - The block number to start after
 * @returns A tuple containing the proposal events and the latest block number
 */
export const getLatestProposalEvents = async (
  block: number,
): Promise<[ProposalEvents, number]> => {
  // One request. The subgraph document had six roots plus `_meta`; this route
  // exists to return exactly that set, already grouped and block-ordered.
  const { data, meta } = await get<{
    created: ProposalEvents["created"];
    canceled: ProposalEvents["cancelled"];
    executed: ProposalEvents["executed"];
    queued: ProposalEvents["queued"];
    vetoed: ProposalEvents["vetoed"];
    votingStarted: ProposalEvents["votingStarted"];
  }>(`/v1/governor/proposal-events?sinceBlock=${block}`);

  const proposalData: ProposalEvents = {
    // `canceled` on the wire, `cancelled` in this codebase.
    cancelled: data.canceled,
    created: data.created,
    executed: data.executed,
    queued: data.queued,
    vetoed: data.vetoed,
    votingStarted: data.votingStarted,
  };

  return [proposalData, meta.block];
};

/**
 * Get the proposals that are currently queued
 *
 * @returns The queued proposals
 */
export const getCurrentQueuedProposals = async (): Promise<
  ProposalQueued[]
> => {
  // Queued proposals whose execution window is still open.
  const { data: queued } = await get<ProposalQueued[]>(
    `/v1/governor/proposals/queued?etaAfter=${toBlockTimestamp(new Date())}`,
  );

  if (queued.length === 0) {
    return [];
  }

  // Drop the ones already executed. Both entities are keyed by proposal id, so
  // the queued ids address the executed rows directly.
  const ids = queued.map((proposal) => proposal.proposalId);
  const { data: executed } = await get<ProposalExecuted[]>(
    `/v1/governor/proposals/executed?ids=${encodeURIComponent(ids.join(","))}`,
  );

  const executedIds = new Set(executed.map((row) => row.proposalId));
  return queued.filter((proposal) => !executedIds.has(proposal.proposalId));
};
