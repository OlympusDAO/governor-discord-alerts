# Governor Discord Alerts

This is a simple Google Cloud Function that watches for governor events in the [Olympus protocol indexer](https://github.com/OlympusDAO/olympus-protocol-indexer) and sends alerts to a Discord channel.

## Process

It performs the following steps:

1. Fetch the proposal events that occurred after the last processed block, from `GET /v1/governor/proposal-events?sinceBlock=`. The response envelope carries `meta.block`, the indexed head, which becomes the next cursor.
1. Read proposal state and timelock settings from Ethereum at the same indexed block.
1. Send voting-completion alerts before queue or execution events from the same polling interval.
1. Send alerts for proposal events, including their Etherscan transaction links.
1. Announce executability and expiry. Remind operators about outstanding queue and execution actions every four hours.
1. Store the cursor and notification history together in GCS as `notification_state.json`.

Each alert starts with its status below the linked proposal title.
The **Description** section contains up to three description lines, capped at 600 characters, including the ellipsis.
The **Deadline** section shows the countdown, then the absolute date on a separate line.
Discord updates the countdown and shows dates in the reader's time zone.
Each alert also includes the proposal ID and proposer address.
Event alerts include their Etherscan transaction link.
See [notification examples and field rules](docs/notifications.md).
Voting deadlines are estimates based on the stored end block and 12-second blocks.
Execution deadlines use the proposal ETA and the live timelock grace period.
Successful proposals have no deadline to be queued.

The first run preserves the cursor from `latest_processed_block.txt`.
It suppresses old voting-completion and expiry notifications while still reminding operators about current actionable proposals.
Each delivered alert is recorded before the next alert is sent.
Event notifications use transaction hashes to distinguish a fresh emergency queue from a retried delivery.
A crash between Discord accepting a message and GCS recording it can still cause a duplicate on retry.

The scheduler runs hourly, so transition alerts can arrive up to an hour after the transition, plus indexing delay.
Indexed data more than two hours old causes an error, allowing the existing monitoring policy to detect a stalled indexer.
Polling currently supports fewer than 1,000 proposals. It fails explicitly when a page fills, rather than silently skipping proposals.

## Setup

1. Use Node.js 22 (22.13.0 or newer) and pnpm 11.28.9:

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

The Pulumi program creates the GCS buckets, Cloud Function, Cloud Scheduler job, invoker IAM binding, and monitoring alert policy. Stack secrets provide `discordWebhookUrl` and `notificationEmail`. `indexerApiUrl` is optional plain config; unset, the function uses the deployed indexer.

The required `governorRpcUrl` stack secret sets `GOVERNOR_RPC_URL`.
Use an archive-capable Ethereum RPC: migration and late cancellation/veto handling need historical contract state.
The function checks historical access at proposal creation before sending alerts.
Public endpoints that restrict historical reads to recent blocks cannot support this workflow.

Note: the project uses `gcp.cloudfunctions.Function` (Cloud Functions v1), which currently does not support Node.js 24 runtimes. The function runtime is therefore pinned to `nodejs22`.

Pulumi may require pnpm's hoisted linker layout to avoid `.pnpm/...` closure-loading or export-path errors, so this repo sets `nodeLinker: hoisted` in `pnpm-workspace.yaml`.

## pnpm Policy

This repo stores pnpm policy in `pnpm-workspace.yaml`, including dependency overrides, `minimumReleaseAge`, `preferFrozenLockfile`, and the hoisted linker layout. The repository intentionally does not use `.npmrc` for these pnpm-only settings.

Both package manifests pin pnpm 11.28.9. CI reads the root manifest through `pnpm/action-setup`.
The function archive has its own policy and lockfile because GCP installs it separately.
`pnpm run install:function:check` copies the deployment manifests into a temporary directory and checks its frozen lockfile.
This preserves the function policy while excluding the parent workspace.
