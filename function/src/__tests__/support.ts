import * as assert from "node:assert/strict";
import type { Mock } from "node:test";

export const mocked = <T extends (...args: never[]) => unknown>(
  fn: T,
): Mock<T> => fn as Mock<T>;

// Assert selected fields without coupling tests to unrelated response fields.
export const assertSubset = (actual: unknown, expected: unknown): void => {
  if (expected !== null && typeof expected === "object") {
    assert.ok(actual !== null && typeof actual === "object");
    if (Array.isArray(expected)) {
      assert.ok(Array.isArray(actual));
      assert.strictEqual(actual.length, expected.length);
    }
    for (const [key, value] of Object.entries(expected)) {
      assertSubset((actual as Record<string, unknown>)[key], value);
    }
  } else assert.deepStrictEqual(actual, expected);
};
