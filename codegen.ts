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
        documentMode: "string",
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
};

export default config;
