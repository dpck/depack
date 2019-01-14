#!/usr/bin/env node
import { _src, _output, _version, _externs, _noWarnings, _compile, _argv, _level, _language_in, _language_out, _node, _temp } from './get-args'
import Bundle from './commands/bundle'
import { version } from '../../package.json'
import { basename, join } from 'path'
import Compile from './commands/compile'
// import Package from './commands/package'

if (_version) {
  console.log(version)
  process.exit(0)
}

const getLanguage = (l = '') => {
  if (/^\d+$/.test(l)) return `ECMASCRIPT_${l}`
  return l
}

// const getCompilerOptions

(async () => {
  try {
    let output
    if (_output) {
      output = /\.js$/.test(_output) ? _output : join(_output, basename(_src))
    }
    const externs = _externs.split(',').filter(a => a)
    if (_compile) {
      return await Compile({
        src: _src,
        level: _level,
        dest: output,
        argv: _argv,
        languageIn: getLanguage(_language_in),
        languageOut: getLanguage(_language_out),
        node: _node,
        externs,
      })
    }
    await Bundle({
      src: _src,
      dest: output,
      externs,
      tempDir: _temp,
      noWarnings: _noWarnings,
    })
  } catch ({ message, stack }) {
    process.env.DEBUG ? console.log(stack) : console.log(message)
  }
})()