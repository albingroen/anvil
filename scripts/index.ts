#!/usr/bin/env node
import clientSetup from './client/setup'
import serverSetup from './server/setup'

function main() {
  clientSetup()
  process.chdir('../')
  serverSetup()
}

main()
