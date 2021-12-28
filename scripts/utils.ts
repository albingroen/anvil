import { spawnSync } from "child_process";

export function cmd(command: string, args?: string[]) {
  return spawnSync(command, args, {
    stdio: "inherit",
  });
}
