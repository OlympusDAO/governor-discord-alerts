# AGENTS.md

## Project Overview

This repository monitors governor and voting events and forwards alert notifications to Discord channels for governance operations.

## Node and Tooling

- Node.js must use version 22+.
- Use `.nvmrc` and `.node-version` files for version alignment.
- Run `pnpm install` before dependency-dependent work.
- If `pnpm` is unavailable after `nvm use`, use `corepack pnpm ...`.
- pnpm policy lives in `pnpm-workspace.yaml`, not `.npmrc`. Keep dependency overrides, `minimumReleaseAge`, `preferFrozenLockfile`, and `nodeLinker: hoisted` there unless a tool specifically requires another location.

## Common Commands

- `pnpm install`: install dependencies using the lockfile policy from `pnpm-workspace.yaml`
- `pnpm run build`: build the Cloud Function TypeScript
- `pnpm run lint`: run Prettier and ESLint fixes in `function/`
- `pnpm run lint:check`: run the non-mutating ESLint check in `function/`
- `pnpm test`: run Jest tests in `function/`
- `pnpm run codegen`: regenerate GraphQL types from the function GraphQL documents

## Deployment

- Use Pulumi for deployments: `pulumi preview --stack <dev|prod>` before `pulumi up --stack <dev|prod>`.
- The `dev` stack targets GCP project `governor-discord-alerts-dev`; the `prod` stack targets `governor-discord-alerts`.
- The Pulumi program provisions the GCS buckets, Cloud Function, Cloud Scheduler job, invoker IAM binding, and monitoring alert policy.
- Required Pulumi stack secrets are `discordWebhookUrl`, `notificationEmail`, and `subgraphApiKey`.
- The Cloud Function uses `gcp.cloudfunctions.Function` v1 and must stay pinned to runtime `nodejs22` until that resource supports a newer runtime.
