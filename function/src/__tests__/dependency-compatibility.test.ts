import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";

// Resolve from the consumers, not from a potentially unrelated hoisted copy.
const fromFramework = createRequire(
  require.resolve("@google-cloud/functions-framework"),
);
const cloudEventsPath = fromFramework.resolve("cloudevents");
const fromCloudEvents = createRequire(cloudEventsPath);
const fromJestTransform = createRequire(require.resolve("@jest/transform"));
const fromIstanbul = createRequire(
  fromJestTransform.resolve("babel-plugin-istanbul"),
);
const configLoaderPath = fromIstanbul.resolve("@istanbuljs/load-nyc-config");
const fromConfigLoader = createRequire(configLoaderPath);

it("keeps CloudEvents UUID generation compatible with the patched CommonJS API", () => {
  const { CloudEvent } = require(cloudEventsPath);
  const { validate, version } = fromCloudEvents("uuid");
  const event = new CloudEvent({ source: "/dependency-test", type: "test" });

  expect(validate(event.id)).toBe(true);
  expect(version(event.id)).toBe(4);
  expect(event.validate()).toBe(true);
});

it("loads and extends NYC YAML configuration without the sprintf-js chain", async () => {
  expect(fromConfigLoader("js-yaml/package.json").version).toMatch(/^3\./);
  const fromYaml = createRequire(fromConfigLoader.resolve("js-yaml"));
  expect(fromYaml("argparse/package.json").version).toMatch(/^2\./);

  const cwd = mkdtempSync(join(tmpdir(), "governor-nyc-config-"));
  try {
    writeFileSync(join(cwd, "package.json"), "{}");
    writeFileSync(join(cwd, "base.yml"), "all: true\ncheck-coverage: true\n");
    writeFileSync(
      join(cwd, ".nycrc.yml"),
      "extends: ./base.yml\ninclude:\n  - src/**/*.ts\nreporter: text\nlegacy-threshold: 012\n",
    );
    const { loadNycConfig } = require(configLoaderPath);
    const config = await loadNycConfig({ cwd });
    expect(config).toMatchObject({
      all: true,
      checkCoverage: true,
      include: ["src/**/*.ts"],
      reporter: "text",
      legacyThreshold: 10,
    });

    writeFileSync(join(cwd, ".nycrc.yml"), "include: [unterminated\n");
    await expect(loadNycConfig({ cwd })).rejects.toThrow();
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
});

it("keeps the YAML 3 CLI compatible with argparse 2's legacy API", () => {
  const cli = join(
    dirname(fromConfigLoader.resolve("js-yaml/package.json")),
    "bin/js-yaml.js",
  );
  const valid = spawnSync(process.execPath, [cli], {
    input: "include:\n  - src/**/*.ts\n",
    encoding: "utf8",
    timeout: 10000,
  });
  expect(valid.error).toBeUndefined();
  expect(valid.status).toBe(0);
  expect(JSON.parse(valid.stdout)).toEqual({ include: ["src/**/*.ts"] });

  const invalid = spawnSync(process.execPath, [cli, "--compact"], {
    input: "include: [unterminated\n",
    encoding: "utf8",
    timeout: 10000,
  });
  expect(invalid.error).toBeUndefined();
  expect(invalid.status).toBe(1);
  expect(invalid.stderr).toContain("YAMLException");
});

it("preserves minimatch brace expansion through Jest's glob dependency", () => {
  const fromGlob = createRequire(fromJestTransform.resolve("glob"));
  const { braceExpand } = fromGlob("minimatch");
  expect(braceExpand("a{b,c}")).toEqual(["ab", "ac"]);
});
