import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bunCommand, pnpmCommand } from "./pnpm-command.ts";

describe("bunCommand", () => {
  it("maps exec to bunx and other subcommands to bun", () => {
    assert.deepEqual(bunCommand(["install"]), ["bun", ["install"]]);
    assert.deepEqual(pnpmCommand(["exec", "wrangler", "dev"]), ["bunx", ["wrangler", "dev"]]);
  });
});
