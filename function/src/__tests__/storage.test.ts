import { Storage } from "@google-cloud/storage";
import { getAlertState, saveAlertState } from "../storage";
import type { AlertState } from "../types";

jest.mock("@google-cloud/storage", () => ({ Storage: jest.fn() }));
const files = new Map<string, string>();
const originalBucket = process.env.BUCKET_NAME;
beforeEach(() => {
  files.clear();
  process.env.BUCKET_NAME = "test-bucket";
  jest.mocked(Storage).mockImplementation(
    () =>
      ({
        bucket: () => ({
          file: (name: string) => ({
            exists: async () => [files.has(name)],
            download: async () => [Buffer.from(files.get(name) ?? "")],
            save: async (contents: string) => {
              files.set(name, contents);
            },
          }),
        }),
      }) as unknown as Storage,
  );
});
afterAll(() => {
  if (originalBucket === undefined) delete process.env.BUCKET_NAME;
  else process.env.BUCKET_NAME = originalBucket;
});

it("preserves the production block cursor when introducing notification state", async () => {
  files.set("latest_processed_block.txt", "26262494");
  expect(await getAlertState()).toEqual({
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
        executable: true,
        lastExecutionReminder: 1793032919,
      },
    },
  };
  await saveAlertState(state);
  expect(await getAlertState()).toEqual(state);
});

it("starts at zero only when neither state file exists", async () => {
  expect(await getAlertState()).toEqual({
    lastProcessedBlock: 0,
    proposals: {},
  });
});
