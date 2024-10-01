import { Storage } from "@google-cloud/storage";

const fileName = "latest_processed_block.txt";

export const getLatestProcessedBlock = async (): Promise<number> => {
  const bucketName = process.env.BUCKET_NAME;
  if (!bucketName) {
    throw new Error("BUCKET_NAME environment variable is not set");
  }

  const storage = new Storage();
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(fileName);

  // Handle if the file doesn't exist
  const [exists] = await file.exists();
  if (!exists) {
    console.warn(`No latest processed block found, returning 0`);
    return 0;
  }

  const [contents] = await file.download();
  console.log(`Latest processed block: ${contents.toString()}`);
  return parseInt(contents.toString());
};

export const updateLatestProcessedBlock = async (
  block: number,
): Promise<void> => {
  const bucketName = process.env.BUCKET_NAME;
  if (!bucketName) {
    throw new Error("BUCKET_NAME environment variable is not set");
  }

  console.log(`Updating latest processed block to ${block}`);

  const storage = new Storage();
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(fileName);
  await file.save(block.toString());
};
