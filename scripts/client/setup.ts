#!/usr/bin/env node
import {
  CLIENT_SCRIPTS_TEMPLATE,
  LAYOUT_ROUTE_TEMPLATE,
  TW_POSTCSS_TEMPLATE,
  TW_CONFIG_TEMPLATE,
  TW_CSS_TEMPLATE,
  ENVIRONMENT_VARS_TEMPLATE,
} from './templates'
import { cmd, log } from '../utils'
import figlet from 'figlet'
import fs from 'fs'

function setupSvelteKit() {
  log('Initializing Sveltekit...', 'info')

  cmd('npm', ['init', 'svelte@next', 'client'])
}

function installDeps() {
  log('Installing dependencies...', 'info')

  process.chdir('client')

  cmd('npm', ['install'])
  cmd('npm', [
    'install',
    '-D',
    'autoprefixer',
    'postcss-cli',
    'tailwindcss',
    'concurrently',
    'cross-env',
  ])
}

function setupEnvironmentVariables() {
  log('Setting up environment variables', 'info')

  fs.writeFileSync('.env', ENVIRONMENT_VARS_TEMPLATE)
}

function setupTailwindCSS() {
  log('Initializing Tailwind CSS...', 'info')

  cmd('npx', ['tailwindcss', 'init', 'tailwind.config.cjs'])
  cmd('touch', ['postcss.config.cjs'])
  cmd('mkdir', ['src/styles'])
  fs.writeFileSync('postcss.config.cjs', TW_POSTCSS_TEMPLATE)
  fs.writeFileSync('src/styles/tailwind.css', TW_CSS_TEMPLATE)
}

function updatePackageJSONScripts() {
  log('Updating scripts...', 'info')

  const json = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  fs.writeFileSync(
    'package.json',
    JSON.stringify({ ...json, scripts: CLIENT_SCRIPTS_TEMPLATE }, null, 2)
  )
}

function finalizeConfig() {
  log('Updating files...', 'info')

  fs.writeFileSync('src/routes/__layout.svelte', LAYOUT_ROUTE_TEMPLATE)
  fs.writeFileSync('tailwind.config.cjs', TW_CONFIG_TEMPLATE)
}

async function main() {
  figlet('anvil', (_, d) => {
    if (d) console.log(d)

    setupSvelteKit()
    installDeps()
    setupEnvironmentVariables()
    setupTailwindCSS()
    updatePackageJSONScripts()
    finalizeConfig()

    log('Initialized client!', 'success')

    process.exit()
  })
}

main()
