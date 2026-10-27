import { IdempotencyStrategy, Storage } from "@google-cloud/storage";
import type { AlertState } from "./types";

const bucket = () => {
  const name = process.env.BUCKET_NAME;
  if (!name) throw new Error("BUCKET_NAME environment variable is not set");
  return new Storage({
    retryOptions: {
      autoRetry: true,
      idempotencyStrategy: IdempotencyStrategy.RetryAlways,
    },
  }).bucket(name);
};

export const getAlertState = async (): Promise<AlertState> => {
  const store = bucket();
  const stateFile = store.file("notification_state.json");
  const [exists] = await stateFile.exists();
  if (exists) {
    const [contents] = await stateFile.download();
    return JSON.parse(contents.toString()) as AlertState;
  }
  const legacy = store.file("latest_processed_block.txt");
  const [legacyExists] = await legacy.exists();
  const lastProcessedBlock = legacyExists
    ? Number((await legacy.download())[0].toString())
    : 0;
  if (!Number.isSafeInteger(lastProcessedBlock) || lastProcessedBlock < 0)
    throw new Error("Invalid stored block cursor");
  return { lastProcessedBlock, proposals: {} };
};

export const saveAlertState = async (state: AlertState): Promise<void> => {
  await bucket().file("notification_state.json").save(JSON.stringify(state), {
    contentType: "application/json",
    resumable: false,
  });
};
