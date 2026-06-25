# Governor Discord Alerts

This is a simple Google Cloud Function that watches for events in the [olympus-governor subgraph](https://github.com/OlympusDAO/governor-subgraph/) and sends alerts to a Discord channel.

## Process

It performs the following steps:

1. Fetch the latest block from the subgraph.
1. Fetch the proposal events from the subgraph that occurred after the latest block.
1. For each proposal event, send a Discord alert.
1. Update the latest block number to the current block number.

## Setup

1. Use Node.js 22:

   ```bash
   nvm use
   ```

1. Install dependencies:

   ```bash
   pnpm install
   ```

   If `pnpm` is not on your PATH after `nvm use`, use Corepack directly:

   ```bash
   corepack pnpm install
   ```

1. Copy `.env.example` to `.env` and set the variables.

## Common Tasks

- `pnpm install`: install dependencies using the lockfile policy from `pnpm-workspace.yaml`.
- `pnpm run build`: build the Cloud Function TypeScript.
- `pnpm run lint`: run Biome fixes in `function/`.
- `pnpm run lint:check`: run the non-mutating Biome check in `function/`.
- `pnpm test`: run the Jest test suite in `function/`.
- `pnpm run codegen`: regenerate GraphQL types from `function/src/proposals.graphql`.

## Deployment

Deployments are managed with Pulumi stacks:

- `dev`: GCP project `governor-discord-alerts-dev`
- `prod`: GCP project `governor-discord-alerts`

1. Build and test the function:

   ```bash
   pnpm run build
   pnpm test
   ```

1. Preview the deployment:

   ```bash
   pulumi preview --stack <dev|prod>
   ```

1. Apply the deployment:

   ```bash
   pulumi up --stack <dev|prod>
   ```

The Pulumi program creates the GCS buckets, Cloud Function, Cloud Scheduler job, invoker IAM binding, and monitoring alert policy. Stack secrets provide `discordWebhookUrl`, `notificationEmail`, and `subgraphApiKey`.

Note: the project uses `gcp.cloudfunctions.Function` (Cloud Functions v1), which currently does not support Node.js 24 runtimes. The function runtime is therefore pinned to `nodejs22`.

Pulumi may require pnpm's hoisted linker layout to avoid `.pnpm/...` closure-loading or export-path errors, so this repo sets `nodeLinker: hoisted` in `pnpm-workspace.yaml`.

## pnpm Policy

This repo stores pnpm policy in `pnpm-workspace.yaml`, including dependency overrides, `minimumReleaseAge`, `preferFrozenLockfile`, and the hoisted linker layout. The repository intentionally does not use `.npmrc` for these pnpm-only settings.
