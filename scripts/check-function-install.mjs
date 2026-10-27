import { spawnSync } from "node:child_process";
import { copyFile, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const archive = await mkdtemp(join(tmpdir(), "governor-function-install-"));
try {
  for (const name of [
    "package.json",
    "pnpm-workspace.yaml",
    "pnpm-lock.yaml",
  ]) {
    await copyFile(
      new URL(`../function/${name}`, import.meta.url),
      join(archive, name),
    );
  }
  const result = spawnSync(
    "pnpm",
    ["install", "--frozen-lockfile", "--lockfile-only"],
    {
      cwd: archive,
      stdio: "inherit",
      shell: false,
    },
  );
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
} finally {
  await rm(archive, { recursive: true, force: true });
}
