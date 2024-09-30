import type { CodegenConfig } from "@graphql-codegen/cli";
import { getSubgraphUrl } from "./src/constants";

const config: CodegenConfig = {
  schema: getSubgraphUrl(),
  documents: ["src/**/*.ts"],
  ignoreNoDocuments: true,
  generates: {
    "./src/graphql/": {
      preset: "client",
      config: {
        skipTypename: true,
        namingConvention: "keep", // Avoids duplicate identifier errors
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
