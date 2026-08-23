# AGENTS.md

## Project Overview

This repository monitors governor and voting events and forwards alert notifications to Discord channels for governance operations.

Data comes from the [Olympus protocol indexer](https://github.com/OlympusDAO/olympus-protocol-indexer)'s REST API (`/v1/governor/...`), which replaced the Governor subgraph on The Graph. There is no GraphQL client or codegen step any more; `function/src/types.ts` describes the response shapes and `function/src/__tests__/indexer.contract.test.ts` checks them against the deployed API (`INDEXER_API_URL=<host> pnpm test`).

## Node and Tooling

- Node.js must use version 22+.
- Use `.nvmrc` and `.node-version` files for version alignment.
- Run `pnpm install` before dependency-dependent work.
- If `pnpm` is unavailable after `nvm use`, use `corepack pnpm ...`.
- pnpm policy lives in `pnpm-workspace.yaml`, not `.npmrc`. Keep dependency overrides, `minimumReleaseAge`, `preferFrozenLockfile`, and `nodeLinker: hoisted` there unless a tool specifically requires another location.
- The Cloud Function deployment archive is `./function`, so GCP installs dependencies from that directory rather than the repo root. When changing pnpm policy, dependency versions, or lockfiles, validate both the root workspace and the `function/` deployment context.
- Keep `function/pnpm-workspace.yaml` aligned with `function/pnpm-lock.yaml` for policy that must be visible inside the Cloud Function archive. A root-only `pnpm-workspace.yaml` is not included in `new pulumi.asset.FileArchive("./function")`.

## Common Commands

- `pnpm install`: install dependencies using the lockfile policy from `pnpm-workspace.yaml`
- `pnpm run build`: build the Cloud Function TypeScript
- `pnpm run lint`: run Biome fixes in `function/`
- `pnpm run lint:check`: run the non-mutating Biome check in `function/`
- `pnpm test`: run Jest tests in `function/`
- `pnpm run validate:pnpm`: validate root and Cloud Function pnpm installs and audits
- `pnpm install --dir function --frozen-lockfile --lockfile-only`: verify the exact frozen lockfile/config GCP Cloud Build uses without creating `function/node_modules`
- `pnpm audit --dir function --audit-level moderate --json`: audit the deploy archive dependency graph, not only the root workspace

## Deployment

- Use Pulumi for deployments: `pulumi preview --stack <dev|prod>` before `pulumi up --stack <dev|prod>`.
- The `dev` stack targets GCP project `governor-discord-alerts-dev`; the `prod` stack targets `governor-discord-alerts`.
- The Pulumi program provisions the GCS buckets, Cloud Function, Cloud Scheduler job, invoker IAM binding, and monitoring alert policy.
- Required Pulumi stack secrets are `discordWebhookUrl` and `notificationEmail`. `indexerApiUrl` is an optional plain config value; unset, the function uses the deployed protocol indexer.
- The Cloud Function uses `gcp.cloudfunctions.Function` v1 and must stay pinned to runtime `nodejs22` until that resource supports a newer runtime.
