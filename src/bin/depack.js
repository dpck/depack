#!/usr/bin/env node
import { _src, _output, _version, _externs, _noWarnings } from './get-args'
import Bundle from './commands/bundle'
import { version } from '../../package.json'
// import Package from './commands/package'

if (_version) {
  console.log(version)
  process.exit(0)
}

(async () => {
  try {
    await Bundle({
      src: _src,
      dest: _output,
      externs: _externs.split(','),
      noWarnings: _noWarnings,
    })
  } catch ({ message, stack }) {
    process.env.DEBUG ? console.log(stack) : console.log(message)
  }
})()