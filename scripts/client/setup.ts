#!/usr/bin/env node
import { spawnSync } from "child_process";
import {
  CLIENT_SCRIPTS_TEMPLATE,
  LAYOUT_ROUTE_TEMPLATE,
  TW_POSTCSS_TEMPLATE,
  TW_CONFIG_TEMPLATE,
  TW_CSS_TEMPLATE,
} from "./templates";
import fs from "fs";

function cmd(command: string, args?: string[]) {
  return spawnSync(command, args, {
    stdio: "inherit",
  });
}

async function main() {
  // Initialize SvelteKit
  cmd("npm", ["init", "svelte@next", "client"]);

  process.chdir("client");

  // Install dependencies
  cmd("npm", ["install"]);
  cmd("npm", [
    "install",
    "-D",
    "autoprefixer",
    "postcss-cli",
    "tailwindcss",
    "concurrently",
    "cross-env",
  ]);

  // Initialize Tailwind CSS
  cmd("npx", ["tailwindcss", "init", "tailwind.config.cjs"]);
  cmd("touch", ["postcss.config.cjs"]);
  cmd("mkdir", ["src/styles"]);
  fs.writeFileSync("postcss.config.cjs", TW_POSTCSS_TEMPLATE);
  fs.writeFileSync("src/styles/tailwind.css", TW_CSS_TEMPLATE);

  // Update package.json scripts
  const json = JSON.parse(fs.readFileSync("package.json", "utf8"));
  fs.writeFileSync(
    "package.json",
    JSON.stringify({ ...json, scripts: CLIENT_SCRIPTS_TEMPLATE }, null, 2)
  );

  // Consume global css on layout route
  fs.writeFileSync("src/routes/__layout.svelte", LAYOUT_ROUTE_TEMPLATE);
  fs.writeFileSync("tailwind.config.cjs", TW_CONFIG_TEMPLATE);

  console.info("Initialized client!");

  process.exit();
}

main();
