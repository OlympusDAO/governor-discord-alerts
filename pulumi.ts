import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import * as express from "express";
import { run } from "./src/index";

const config = new pulumi.Config();

// Ensure that the required APIs are enabled
// Requires the Compute Engine API to be manually enabled
// https://console.cloud.google.com/apis/api/compute.googleapis.com/overview
const enabledApisCloudFunctions = new gcp.projects.Service("cloud-functions", {
  project: gcp.config.project,
  service: "cloudfunctions.googleapis.com",
});

const enabledApisCloudScheduler = new gcp.projects.Service("cloud-scheduler", {
  project: gcp.config.project,
  service: "cloudscheduler.googleapis.com",
});

const enabledApisStorage = new gcp.projects.Service("storage", {
  project: gcp.config.project,
  service: "storage.googleapis.com",
});

const enabledApisArtifactRegistry = new gcp.projects.Service(
  "artifact-registry",
  {
    project: gcp.config.project,
    service: "artifactregistry.googleapis.com",
  },
);

const enabledApisCloudBuild = new gcp.projects.Service("cloud-build", {
  project: gcp.config.project,
  service: "cloudbuild.googleapis.com",
});

// Create a GCS bucket
const bucket = new gcp.storage.Bucket(
  `olympus-governor-discord-alerts`,
  {
    location: "us-central1",
  },
  {
    dependsOn: [enabledApisStorage],
  },
);

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
  {
    dependsOn: [
      enabledApisCloudFunctions,
      enabledApisArtifactRegistry,
      enabledApisStorage,
      enabledApisCloudBuild,
    ],
  },
);

// Create a Google Cloud Scheduler job
const schedulerJob = new gcp.cloudscheduler.Job(
  `function-invoker`,
  {
    schedule: "0 * * * *", // Every hour
    timeZone: "UTC",
    httpTarget: {
      httpMethod: "GET",
      uri: cloudFunction.httpsTriggerUrl,
    },
  },
  {
    dependsOn: [cloudFunction, enabledApisCloudScheduler],
  },
);

// Allow Cloud Scheduler to invoke the Cloud Function
new gcp.cloudfunctions.FunctionIamMember(
  "function-invoker",
  {
    project: cloudFunction.function.project,
    region: cloudFunction.function.region,
    cloudFunction: cloudFunction.function.name,
    role: "roles/cloudfunctions.invoker",
    member: pulumi.interpolate`serviceAccount:${gcp.config.project}@appspot.gserviceaccount.com`,
  },
  {
    dependsOn: [enabledApisCloudScheduler, cloudFunction],
  },
);

/**
 * ALERTS
 */

// Add an email notification channel
const emailChannel = new gcp.monitoring.NotificationChannel("email", {
  type: "email",
  labels: {
    email_address: config.requireSecret("notificationEmail"),
  },
});

// Add an alert to the function
new gcp.monitoring.AlertPolicy(
  "subgraph-fetcher-errors",
  {
    displayName: `subgraph-fetcher Errors`,
    combiner: "OR",
    conditions: [
      {
        displayName: "Cloud Function - Executions",
        conditionThreshold: {
          filter:
            'resource.type = "cloud_function" AND metric.type = "cloudfunctions.googleapis.com/function/execution_count" AND metric.labels.status != "ok"',
          aggregations: [
            {
              alignmentPeriod: "300s",
              crossSeriesReducer: "REDUCE_NONE",
              perSeriesAligner: "ALIGN_COUNT",
            },
          ],
          comparison: "COMPARISON_GT",
          duration: "0s",
          trigger: {
            count: 1,
          },
          thresholdValue: 0,
        },
      },
    ],
    alertStrategy: {
      autoClose: "1800s",
    },
    enabled: true,
    notificationChannels: [emailChannel.id],
    severity: "ERROR",
  },
  {
    dependsOn: [emailChannel],
  },
);

// Export the bucket name and Cloud Function URL
export const bucketName = bucket.name;
export const functionUrl = cloudFunction.httpsTriggerUrl;
export const schedulerJobName = schedulerJob.name;
