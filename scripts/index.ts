#!/usr/bin/env node
import clientSetup from './client/setup'
import serverSetup from './server/setup'
import fs from 'fs'

function main() {
  const projectName = process.argv[2]

  if (projectName) {
    fs.mkdirSync(projectName)
    process.chdir(projectName)
  }

  clientSetup()
  process.chdir('../')
  serverSetup()
}

main()
