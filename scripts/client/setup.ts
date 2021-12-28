#!/usr/bin/env node
import {
  CLIENT_SCRIPTS_TEMPLATE,
  LAYOUT_ROUTE_TEMPLATE,
  TW_POSTCSS_TEMPLATE,
  TW_CONFIG_TEMPLATE,
  TW_CSS_TEMPLATE,
} from "./templates";
import { cmd } from "../utils";
import figlet from "figlet";
import kleur from "kleur";
import fs from "fs";

function setupSvelteKit() {
  console.log(kleur.yellow("Initializing Sveltekit..."));
  cmd("npm", ["init", "svelte@next", "client"]);
}

function installDeps() {
  process.chdir("client");

  kleur.yellow("Installing dependencies...");

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
}

function setupTailwindCSS() {
  console.log(kleur.yellow("Initializing Tailwind CSS..."));

  cmd("npx", ["tailwindcss", "init", "tailwind.config.cjs"]);
  cmd("touch", ["postcss.config.cjs"]);
  cmd("mkdir", ["src/styles"]);
  fs.writeFileSync("postcss.config.cjs", TW_POSTCSS_TEMPLATE);
  fs.writeFileSync("src/styles/tailwind.css", TW_CSS_TEMPLATE);
}

function updatePackageJSONScripts() {
  console.log(kleur.yellow("Updating scripts..."));

  const json = JSON.parse(fs.readFileSync("package.json", "utf8"));
  fs.writeFileSync(
    "package.json",
    JSON.stringify({ ...json, scripts: CLIENT_SCRIPTS_TEMPLATE }, null, 2)
  );
}

function finalizeConfig() {
  console.log(kleur.yellow("Updating files..."));
  fs.writeFileSync("src/routes/__layout.svelte", LAYOUT_ROUTE_TEMPLATE);
  fs.writeFileSync("tailwind.config.cjs", TW_CONFIG_TEMPLATE);
}

async function main() {
  figlet("anvil", (e, d) => {
    if (d) {
      console.log(d);
    }

    setupSvelteKit();
    installDeps();
    setupTailwindCSS();
    updatePackageJSONScripts();
    finalizeConfig();

    console.log(kleur.green("Initialized client!"));

    process.exit();
  });
}

main();
