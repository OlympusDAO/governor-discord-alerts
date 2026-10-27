import type {
  GovernanceSnapshot,
  ProposalCreated,
  ProposalState,
} from "./types";

const GOVERNOR = "0x0941233c964e7d7efeb05d253176e5e634ceffcd";
const DEFAULT_RPC = "https://ethereum-rpc.publicnode.com";
type RpcCall = { method: string; params: unknown[] };
type RpcResult = { id: number; result?: unknown; error?: { code: number } };

const rpc = async (calls: RpcCall[]): Promise<unknown[]> => {
  const response = await fetch(process.env.GOVERNOR_RPC_URL || DEFAULT_RPC, {
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
  const results: unknown[] = [];
  for (let i = 0; i < calls.length; i += 10)
    results.push(...(await rpc(calls.slice(i, i + 10))));
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
      };
    }),
  };
};
