import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import * as express from "express";
import { run } from "./src/index";

const config = new pulumi.Config();

// Create a GCS bucket
const bucket = new gcp.storage.Bucket(`olympus-governor-discord-alerts`, {
  location: "us-central1",
});

// Create a Google Cloud Function
const cloudFunction = new gcp.cloudfunctions.HttpCallbackFunction(
  "subgraph-fetcher",
  {
    callback: async (req: express.Request, res: express.Response) => {
      // Run the function
      await run();

      // Send a response
      res.status(200).send();
    },
    availableMemoryMb: 256,
    timeout: 60,
    environmentVariables: {
      BUCKET_NAME: bucket.name,
      SUBGRAPH_API_KEY: config.requireSecret("subgraphApiKey"),
      DISCORD_WEBHOOK_URL: config.requireSecret("discordWebhookUrl"),
    },
  },
);

// Create a Google Cloud Scheduler job
const schedulerJob = new gcp.cloudscheduler.Job(`function-invoker`, {
  schedule: "0 * * * *", // Every hour
  timeZone: "UTC",
  httpTarget: {
    httpMethod: "GET",
    uri: pulumi.interpolate`https://${cloudFunction.httpsTriggerUrl}`,
  },
});

// Allow Cloud Scheduler to invoke the Cloud Function
const functionInvoker = new gcp.cloudfunctions.FunctionIamMember(
  "function-invoker",
  {
    project: cloudFunction.function.project,
    region: cloudFunction.function.region,
    cloudFunction: cloudFunction.function.name,
    role: "roles/cloudfunctions.invoker",
    member:
      "serviceAccount:cloud-scheduler@${gcp.config.project}.iam.gserviceaccount.com",
  },
);

// Export the bucket name and Cloud Function URL
export const bucketName = bucket.name;
export const functionUrl = cloudFunction.httpsTriggerUrl;
