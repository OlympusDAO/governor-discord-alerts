import { getLatestProposalEvents } from "./indexer";
import {
  type GovernanceSnapshot,
  type GovernorProposal,
  type ProposalCreated,
  type ProposalEvents,
  ProposalState,
} from "./types";

const GOVERNOR = "0x0941233c964e7d7efeb05d253176e5e634ceffcd";
type RpcCall = { method: string; params: unknown[] };
type RpcResult = { id: number; result?: unknown; error?: { code: number } };

const rpc = async (calls: RpcCall[]): Promise<unknown[]> => {
  const url = process.env.GOVERNOR_RPC_URL;
  if (!url)
    throw new Error(
      "GOVERNOR_RPC_URL must be set to an archive-capable Ethereum RPC",
    );
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(
      calls.map((call, id) => ({ jsonrpc: "2.0", id, ...call })),
    ),
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`Governor RPC failed (${response.status})`);
  const results = (await response.json()) as RpcResult[];
  if (!Array.isArray(results))
    throw new Error("Governor RPC did not return a batch");
  return calls.map((_, id) => {
    const row = results.find((r) => r.id === id);
    if (!row || row.error || row.result === undefined || row.result === null) {
      throw new Error(
        `Governor RPC call ${id} failed (code ${row?.error?.code ?? "missing result"})`,
      );
    }
    return row.result;
  });
};

const eventTopics: Record<keyof ProposalEvents, string> = {
  created: "0xecb3cef6b7909dbd326874efa66fc26c8143a104b3fcb06e34712a411bc8417b",
  cancelled:
    "0x789cf55be980739dad1d0699b93b58e806b51c9d96619bfa8fe0a28abaa7b30c",
  vetoed: "0xde0cea2a3a0097cc3d981d40c375407760e85bc9c5e69aea449ac3885f8615c6",
  queued: "0x9a2e42fd6722813d69113e7d0079d3d940171428df7373df9c7f7617cfda2892",
  executed:
    "0x712ae1383f79ac853f8d882153778e0260ef8f03b504e2866e0593e04d2b291f",
  votingStarted:
    "0x50a656eabe61e4a3834133b594dea03fb103efbb993543730a7ac9c1afd2769c",
};

export const getEventLogIndex = async (
  kind: keyof ProposalEvents,
  event: { proposalId: string; transactionHash: string; blockNumber: string },
): Promise<number> => {
  const [result] = await rpc([
    { method: "eth_getTransactionReceipt", params: [event.transactionHash] },
  ]);
  const receipt = result as {
    blockNumber: string;
    logs: {
      address: string;
      topics: string[];
      data: string;
      logIndex: string;
    }[];
  };
  if (BigInt(receipt.blockNumber) !== BigInt(event.blockNumber))
    throw new Error("Governor event receipt block mismatch");
  // The indexer retains the latest occurrence of each event kind per proposal.
  const log = receipt.logs
    .slice()
    .reverse()
    .find(
      (log) =>
        log.address.toLowerCase() === GOVERNOR &&
        log.topics[0] === eventTopics[kind] &&
        BigInt(log.data.slice(0, 66)) === BigInt(event.proposalId),
    );
  if (!log) throw new Error("Governor event is missing from its receipt");
  // logIndex orders all logs within a block, including different transactions.
  return number(BigInt(log.logIndex));
};

export const getCompletedVoteOutcome = async (
  proposalId: string,
  endBlock: number,
): Promise<boolean | undefined> => {
  const id = BigInt(proposalId).toString(16).padStart(64, "0");
  const block = `0x${endBlock.toString(16)}`;
  const [state, outcome] = await rpc(
    ["0x3e4f49e6", "0xcb106436"].map((selector) => ({
      method: "eth_call",
      params: [{ to: GOVERNOR, data: `${selector}${id}` }, block],
    })),
  );
  // Voting is open through endBlock; an earlier cancellation/veto interrupts it.
  if (words(state, 1)[0] !== BigInt(ProposalState.Active)) return undefined;
  return words(outcome, 1)[0] === 1n;
};

export const isEmergencyQueueCancelled = async (
  row: GovernorProposal,
  blockNumber: number,
): Promise<boolean> => {
  // Emergency state ignores cancellation; its cancelled flag also stays set
  // after a valid requeue. Compare the latest queue and cancel transactions.
  const [history, head] = await getLatestProposalEvents(0);
  const id = row.proposal.proposalId;
  const queued = history.queued.find((event) => event.proposalId === id);
  const cancelled = history.cancelled.find((event) => event.proposalId === id);
  if (
    head < blockNumber ||
    !queued ||
    Number(queued.eta) !== row.eta ||
    Number(queued.blockNumber) > blockNumber ||
    (cancelled && Number(cancelled.blockNumber) > blockNumber)
  )
    throw new Error(
      `Queue history does not match proposal ${id} at the indexed block`,
    );
  if (!cancelled) return false;
  const difference = Number(cancelled.blockNumber) - Number(queued.blockNumber);
  if (difference !== 0) return difference > 0;
  const [cancelIndex, queueIndex] = await Promise.all([
    getEventLogIndex("cancelled", cancelled),
    getEventLogIndex("queued", queued),
  ]);
  return cancelIndex > queueIndex;
};

export const wasExpiredAtCursor = async (
  row: GovernorProposal,
  cursor: number,
  executionGracePeriod: number,
): Promise<boolean> => {
  const block = `0x${cursor.toString(16)}`;
  if (row.eta === 0) {
    const id = BigInt(row.proposal.proposalId).toString(16).padStart(64, "0");
    const [state] = await rpc([
      {
        method: "eth_call",
        params: [{ to: GOVERNOR, data: `0x3e4f49e6${id}` }, block],
      },
    ]);
    return words(state, 1)[0] === BigInt(ProposalState.Expired);
  }
  const [result] = await rpc([
    { method: "eth_getBlockByNumber", params: [block, false] },
  ]);
  const header = result as { number?: string; timestamp?: string };
  if (header.number !== block || !header.timestamp)
    throw new Error("Governor cursor block is unavailable");
  return number(BigInt(header.timestamp)) > row.eta + executionGracePeriod;
};

// Solidity's public proposals getter omits arrays/mappings. Its fourteen static
// ABI words are id, proposer, threshold, quorum, eta, startBlock, endBlock,
// for/against/abstain votes, and the four lifecycle flags.
const words = (value: unknown, count: number): bigint[] => {
  if (
    typeof value !== "string" ||
    !new RegExp(`^0x[0-9a-fA-F]{${count * 64}}$`).test(value)
  ) {
    throw new Error("Unexpected governor ABI response");
  }
  return Array.from({ length: count }, (_, i) =>
    BigInt(`0x${value.slice(2 + i * 64, 66 + i * 64)}`),
  );
};
const number = (value: bigint): number => {
  const result = Number(value);
  if (!Number.isSafeInteger(result))
    throw new Error("Governor value exceeds safe integer range");
  return result;
};

export const getGovernanceSnapshot = async (
  proposals: ProposalCreated[],
  blockNumber: number,
): Promise<GovernanceSnapshot> => {
  const block = `0x${blockNumber.toString(16)}`;
  const call = (to: string, data: string): RpcCall => ({
    method: "eth_call",
    params: [{ to, data }, block],
  });
  // Small batches also work with RPC providers that cap batch size at ten.
  const calls: RpcCall[] = [
    { method: "eth_getBlockByNumber", params: [block, false] },
    call(GOVERNOR, "0xd33219b4"), // timelock()
    ...proposals.flatMap((proposal) => {
      const id = BigInt(proposal.proposalId).toString(16).padStart(64, "0");
      return [
        call(GOVERNOR, `0x013cf08b${id}`),
        call(GOVERNOR, `0x3e4f49e6${id}`),
      ];
    }),
  ];
  if (proposals.length) {
    const oldest = proposals.reduce((a, b) =>
      Number(a.blockNumber) < Number(b.blockNumber) ? a : b,
    );
    // Validate historical state access before sending any alerts. Later terminal
    // transitions and migration need reads as far back as proposal creation.
    calls.push({
      method: "eth_call",
      params: [
        {
          to: GOVERNOR,
          data: `0x3e4f49e6${BigInt(oldest.proposalId).toString(16).padStart(64, "0")}`,
        },
        `0x${BigInt(oldest.blockNumber).toString(16)}`,
      ],
    });
  }
  const results: unknown[] = [];
  for (let i = 0; i < calls.length; i += 10)
    results.push(...(await rpc(calls.slice(i, i + 10))));
  if (proposals.length && words(results[results.length - 1], 1)[0] > 9n)
    throw new Error("Unexpected historical governor state");
  const header = results[0] as { number?: string; timestamp?: string };
  if (header.number !== block || !header.timestamp)
    throw new Error("Governor block is unavailable");
  const timelockWord = words(results[1], 1)[0];
  const timelock = `0x${timelockWord.toString(16).padStart(40, "0")}`;
  const [grace] = await rpc([
    call(timelock, "0xc1a287e2"), // GRACE_PERIOD()
  ]);
  return {
    blockNumber,
    timestamp: number(BigInt(header.timestamp)),
    executionGracePeriod: number(words(grace, 1)[0]),
    proposals: proposals.map((proposal, i) => {
      const data = words(results[2 + i * 2], 14);
      const state = number(words(results[3 + i * 2], 1)[0]);
      if (data[0] !== BigInt(proposal.proposalId) || state > 9)
        throw new Error("Unexpected governor proposal state");
      return {
        proposal,
        state: state as ProposalState,
        eta: number(data[4]),
        endBlock: number(data[6]),
        votingStarted: data[10] === 1n,
        quorumVotes: data[3],
        forVotes: data[7],
        againstVotes: data[8],
      };
    }),
  };
};
