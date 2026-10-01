// The consolidated Olympus protocol indexer's REST API. Replaces the Governor
// subgraph on The Graph's gateway, which needed an API key; the indexer is
// public, so there is no credential here.
const DEFAULT_INDEXER_API = "https://protocol-indexer-api.olympusdao.finance";

export const EXECUTION_LIMIT = 24 * 60 * 60; // 24 hours

export const getIndexerUrl = (): string =>
  (process.env.INDEXER_API_URL || DEFAULT_INDEXER_API).replace(/\/+$/, "");
