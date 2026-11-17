import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";

const PUBLIC_REGISTRY = "https://registry.npmjs.org/";
const lockfile = readFileSync(new URL("../bun.lock", import.meta.url), "utf8");
const npmrc = readFileSync(new URL("../.npmrc", import.meta.url), "utf8");

describe("registry policy", () => {
  it("resolves every explicit tarball URL in bun.lock from the public npm registry", () => {
    const offenders = lockfile
      .split(/\r?\n/)
      .filter((line) => /"https:\/\/(?!registry\.npmjs\.org\/)/.test(line))
      .map((line) => line.trim());
    assert.deepEqual(offenders, []);
  });

  it("configures the @cloudflare scope, and nothing else, in the root .npmrc", () => {
    const directives = npmrc
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line !== "" && !line.startsWith("#"));
    assert.deepEqual(directives, [`@cloudflare:registry=${PUBLIC_REGISTRY}`]);
  });
});
