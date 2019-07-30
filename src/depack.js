#!/usr/bin/env node
import {
  _source, _advanced, _noSourcemap, _debug, _language_in, _language_out, _level, _noWarnings, _output, _prettyPrint, _verbose, _help, _version, _argv,
  _iife, _preact, _temp, _external, _patch, // bundle
  _compile, _library, _noStrict, // compile
} from './get-args'
import { createInterface } from 'readline'
import { GOOGLE_CLOSURE_COMPILER, run, Bundle, Compile, getOptions, getCompilerVersion, getOutput } from '@depack/depack'
import resolveDependency from 'resolve-dependency'
import { renameSync, symlinkSync, unlinkSync } from 'fs'
import { resolve } from 'path'
import { c } from 'erte'
import usage from './usage'

if (_help) {
  console.log(usage())
  process.exit(0)
}

const monkeyPatchPreact = () => {
  console.error(c('monkey-patching preact', 'yellow'))
  renameSync('node_modules/preact', 'node_modules/_preact')
  symlinkSync(resolve(__dirname, '../preact'), 'node_modules/preact')
}

const restorePreact = () => {
  console.error(c('cleaning up preact patch', 'yellow'))
  try {
    unlinkSync('node_modules/preact')
    renameSync('node_modules/_preact', 'node_modules/preact')
  } catch (err) {
    //
  }
}

(async () => {
  if (_patch) {
    monkeyPatchPreact()
    process.on('SIGINT', () => {})
    process.on('SIGTERM', () => {})
    process.on('beforeExit', restorePreact)

    const rl = createInterface(/** @type {!readline.ReadLineOptions} */({
      input: process.stdin,
      output: process.stdout,
    }))
    rl.question('Press enter to continue', () => {
      rl.close()
    })
    return
  }
  try {
    const compilerVersion = await getCompilerVersion()
    if (_version) {
      const version = require('../package.json')['version']
      console.log('Depack version: %s', version)
      const res = await run([
        ...getOptions({ compiler: GOOGLE_CLOSURE_COMPILER }),
        '--version'], { compilerVersion })
      console.log(res)
      return
    }
    const { path: src } = await resolveDependency(_source)
    const output = _output ? getOutput(_output, src) : undefined
    let languageOut = _language_out
    if (!_language_out && (_compile || _library)) {
      languageOut = 2017
    }
    const options = getOptions({
      compiler: GOOGLE_CLOSURE_COMPILER,
      output, level: _level, languageIn: _language_in, languageOut, argv: _argv, advanced: _advanced, sourceMap: !!_output && !_noSourcemap, prettyPrint: _prettyPrint, noWarnings: _noWarnings, debug: _debug, iife: _iife,
    })
    const runOptions = {
      compilerVersion, output,
      noSourceMap: _noSourcemap || !!_debug, debug: _debug,
    }
    if (_compile || _library) {
      return await Compile({
        src,
        noStrict: _noStrict,
        verbose: _verbose,
        debug: _debug,
        library: _library,
      }, runOptions, options)
    }
    if (_external) {
      monkeyPatchPreact()
      process.on('SIGINT', () => {})
      process.on('SIGTERM', () => {})
      process.on('beforeExit', restorePreact)
    }
    await Bundle({
      src,
      tempDir: _temp,
      preact: _preact,
    }, runOptions, options)
  } catch (error) {
    process.env.DEBUG ? console.log(error.stack) : console.log(error.message)
  }
})()