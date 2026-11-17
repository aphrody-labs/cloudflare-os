/** Spawn bun or bunx from a script without going through a shell. */
export function bunCommand(
  args: string[],
  _env: NodeJS.ProcessEnv = process.env,
  _platform: NodeJS.Platform = process.platform,
): [string, string[]] {
  if (args[0] === "exec") return ["bunx", args.slice(1)];
  return ["bun", args];
}

/** Compatibility alias forwarding workspace package-manager invocations to Bun. */
export const pnpmCommand = bunCommand;
