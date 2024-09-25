# Governor Discord Alerts

This is a simple Google Cloud Function that watches for events in the olympus-governor subgraph and sends alerts to a Discord channel.

## Process

It performs the following steps:

1. Fetch the latest block from the subgraph.
1. Fetch the proposal events from the subgraph that occurred after the latest block.
1. For each proposal event, send a Discord alert.
1. Update the latest block number to the current block number.

## Setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

1. Copy `.env.example` to `.env` and set the variables.

## Deployment

```bash
pulumi up --stack <dev|prod>
```
