const SUBGRAPH_URL =
  "https://gateway.thegraph.com/api/{api-key}/subgraphs/id/AQoLCXebY1Ga7DrqVaVQ85KMwS7iFof73tv9XMVGRtyJ";

export const getSubgraphUrl = (): string => {
  // Get the API key
  const apiKey = process.env.SUBGRAPH_API_KEY;
  if (!apiKey) {
    throw new Error("SUBGRAPH_API_KEY is not set");
  }

  return SUBGRAPH_URL.replace("{api-key}", apiKey);
};
