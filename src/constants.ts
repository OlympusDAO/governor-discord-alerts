const SUBGRAPH_URL =
  "https://api.studio.thegraph.com/query/46563/olympus-governor/version/latest";

export const getSubgraphUrl = (): string => {
  // Get the API key
  const apiKey = process.env.SUBGRAPH_API_KEY;
  if (!apiKey) {
    throw new Error("SUBGRAPH_API_KEY is not set");
  }

  return SUBGRAPH_URL.replace("[api-key]", apiKey);
};
