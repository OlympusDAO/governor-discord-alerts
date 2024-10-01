import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";

const config = new pulumi.Config();

/**
 * APIs
 */

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

/**
 * FUNCTION ASSETS
 */

// Create a GCS bucket to store the assets
const functionBucket = new gcp.storage.Bucket(
  `olympus-governor-discord-alerts-assets`,
  {
    location: "us-central1",
  },
  {
    dependsOn: [enabledApisStorage],
  },
);

// Archive the function code in the bucket
const functionBucketObject = new gcp.storage.BucketObject(
  "function-code",
  {
    bucket: functionBucket.name,
    source: new pulumi.asset.AssetArchive({
      ".": new pulumi.asset.FileArchive("./function"),
    }),
  },
  {
    dependsOn: [functionBucket],
  },
);

/**
 * STORAGE
 */

// Create a GCS bucket to be used by the Cloud Function
const bucket = new gcp.storage.Bucket(
  `olympus-governor-discord-alerts`,
  {
    location: "us-central1",
  },
  {
    dependsOn: [enabledApisStorage],
  },
);

/**
 * FUNCTION
 */

// Create a Google Cloud Function
const cloudFunction = new gcp.cloudfunctions.Function(
  "subgraph-fetcher",
  {
    sourceArchiveBucket: functionBucket.name,
    sourceArchiveObject: functionBucketObject.name,
    triggerHttp: true,
    runtime: "nodejs18",
    entryPoint: "run",
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
      functionBucketObject,
      bucket,
    ],
  },
);

/**
 * SCHEDULER
 */

// Create a Google Cloud Scheduler job
const schedulerJob = new gcp.cloudscheduler.Job(
  `function-invoker`,
  {
    schedule: "0 * * * *", // Every hour
    timeZone: "UTC",
    httpTarget: {
      httpMethod: "GET",
      uri: cloudFunction.httpsTriggerUrl,
      oidcToken: {
        serviceAccountEmail: cloudFunction.serviceAccountEmail,
      },
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
    project: cloudFunction.project,
    region: cloudFunction.region,
    cloudFunction: cloudFunction.name,
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
