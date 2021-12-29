#!/usr/bin/env node
import { cmd, log, removeJsonComments } from '../utils'
import { FASTIFY_TEMPLATE } from './templates'
import fs from 'fs'

function setupProject() {
  log('Initializing server...', 'info')

  cmd('mkdir', ['server'])
  process.chdir('server')
  cmd('npm', ['init', '-y'])
}

function installDeps() {
  log('Installing dependencies...', 'info')

  cmd('npm', [
    'install',
    '-D',
    'typescript',
    '@types/node',
    'nodemon',
    'prettier',
    'concurrently',
  ])
  cmd('npm', [
    'install',
    'fastify',
    'fastify-cors',
    'dotenv',
    'prisma',
    '@prisma/client',
  ])
}

function setupTypeScript() {
  log('Setting up TypeScript...', 'info')

  cmd('npx', ['tsc', '--init'])

  const tsConfigJson = JSON.parse(
    removeJsonComments(fs.readFileSync('tsconfig.json', 'utf8'))
  )
  fs.writeFileSync(
    'tsconfig.json',
    JSON.stringify(
      {
        ...tsConfigJson,
        compilerOptions: {
          ...tsConfigJson.compilerOptions,
          outDir: 'dist',
        },
      },
      null,
      2
    )
  )
}

function setupPrisma() {
  log('Setting up Prisma...', 'info')

  cmd('npx', ['prisma', 'init'])
}

function updateScripts() {
  log('Updating scripts...', 'info')

  const json = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  fs.writeFileSync(
    'package.json',
    JSON.stringify(
      {
        ...json,
        main: 'dist/index.js',
        scripts: {
          ...json.scripts,
          dev: "concurrently 'tsc -w' 'nodemon .'",
          format: 'prettier --write .',
          start: 'node .',
          build: 'tsc',
        },
      },
      null,
      2
    )
  )
}

function setupIndexFile() {
  log('Creating index file...', 'info')

  fs.writeFileSync('index.ts', FASTIFY_TEMPLATE)
}

async function main() {
  setupProject()
  installDeps()
  setupPrisma()
  setupTypeScript()
  updateScripts()
  setupIndexFile()

  log('Initialized server!', 'success')
}

main()
