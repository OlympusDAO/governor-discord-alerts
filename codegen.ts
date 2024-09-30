import type { CodegenConfig } from "@graphql-codegen/cli";
import { getSubgraphUrl } from "./src/constants";

const config: CodegenConfig = {
  ignoreNoDocuments: true,
  schema: getSubgraphUrl(),
  generates: {
    "./src/__generated__/proposals.ts": {
      documents: ["src/proposals.graphql"],
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
      config: {
        preResolveTypes: true,
        skipTypename: true,
        namingConvention: "keep", // Avoids duplicate identifier errors
        scalars: {
          BigDecimal: "string",
          BigInt: "string",
          Bytes: "string",
        },
      },
    },
    "./schema.graphql": {
      plugins: ["schema-ast"],
      config: {
        includeDirectives: true,
      },
    },
  },
  hooks: {
    afterAllFileWrite: ["pnpm run lint"],
  },
  overwrite: true,
};

export default config;
