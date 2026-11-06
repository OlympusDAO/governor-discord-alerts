import * as assert from "node:assert/strict";
import { Writable } from "node:stream";
import { after as afterAll, afterEach, beforeEach, it, mock } from "node:test";
import type { Storage } from "@google-cloud/storage";
import * as sdk from "@google-cloud/storage";
import { getAlertState, saveAlertState } from "../storage";
import type { AlertState } from "../types";
import { assertSubset } from "./support";

const RealStorage = sdk.Storage;
let storageImplementation: typeof Storage;
const files = new Map<string, string>();
const originalBucket = process.env.BUCKET_NAME;
beforeEach(() => {
  mock.getter(sdk, "Storage", () => storageImplementation);
  files.clear();
  process.env.BUCKET_NAME = "test-bucket";
  storageImplementation = class {
    bucket() {
      return {
        file: (name: string) => ({
          exists: async () => [files.has(name)],
          download: async () => [Buffer.from(files.get(name) ?? "")],
          save: async (contents: string) => {
            files.set(name, contents);
          },
        }),
      };
    }
  } as unknown as typeof Storage;
});
afterAll(() => {
  if (originalBucket === undefined) delete process.env.BUCKET_NAME;
  else process.env.BUCKET_NAME = originalBucket;
});

it("preserves the production block cursor when introducing notification state", async () => {
  files.set("latest_processed_block.txt", "26262494");
  assert.deepStrictEqual(await getAlertState(), {
    lastProcessedBlock: 26262494,
    proposals: {},
  });
});

it("persists cursor and notification history together and prefers them over the legacy cursor", async () => {
  files.set("latest_processed_block.txt", "1");
  const state: AlertState = {
    lastProcessedBlock: 26278125,
    proposals: {
      "19": {
        events: { votingStarted: "0xactivation" },
        lastExecutionReminder: 1793032919,
      },
    },
  };
  await saveAlertState(state);
  assert.deepStrictEqual(await getAlertState(), state);
});

it("starts at zero only when neither state file exists", async () => {
  assert.deepStrictEqual(await getAlertState(), {
    lastProcessedBlock: 0,
    proposals: {},
  });
});

it("retries a throttled state save through the real SDK without changing its payload", async () => {
  storageImplementation = RealStorage;
  const attempts: string[] = [];
  // Keep the SDK's save/retry logic and replace only its upload transport.
  const upload = mock.method(
    sdk.File.prototype,
    "createWriteStream",
    () =>
      new Writable({
        write(chunk, _encoding, callback) {
          attempts.push(chunk.toString());
          callback(
            attempts.length === 1
              ? Object.assign(new Error("Throttled"), { code: 429 })
              : undefined,
          );
        },
      }),
  );
  const state: AlertState = { lastProcessedBlock: 26278125, proposals: {} };
  try {
    await saveAlertState(state);
    assert.deepStrictEqual(attempts, [
      JSON.stringify(state),
      JSON.stringify(state),
    ]);
    assertSubset(upload.mock.calls[1].arguments[0], { resumable: false });
  } finally {
    upload.mock.restore();
  }
});

afterEach(() => mock.restoreAll());
