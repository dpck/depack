#!/usr/bin/env node
import { _src, _output, _version, _noWarnings, _compile, _argv, _level, _language_in, _language_out, _temp, _advanced, _noStrict, _verbose, _help, _noSourceMaps, _prettyPrint, _preact, _debug, _iife } from './get-args'
import { GOOGLE_CLOSURE_COMPILER, run, Bundle, Compile, getOptions, getCompilerVersion, getOutput } from '@depack/depack'
import resolveDependency from 'resolve-dependency'
import getUsage from './usage'
const { version } = require('../../package.json')

if (_help) {
  console.log(getUsage())
  process.exit(0)
}

(async () => {
  try {
    const compilerVersion = await getCompilerVersion()
    if (_version) {
      console.log('Depack version: %s', version)
      const res = await run([
        ...getOptions({ compiler: GOOGLE_CLOSURE_COMPILER }),
        '--version'], { compilerVersion })
      console.log(res)
      return
    }
    const { path: src } = await resolveDependency(_src)
    const output = _output ? getOutput(_output, src) : null
    let languageOut = _language_out
    if (!_language_out && _compile) {
      languageOut = 2017
    }
    const options = getOptions({
      compiler: GOOGLE_CLOSURE_COMPILER,
      output, level: _level, languageIn: _language_in, languageOut, argv: _argv, advanced: _advanced, sourceMap: !!_output && !_noSourceMaps, prettyPrint: _prettyPrint, noWarnings: _noWarnings, debug: _debug, iife: _iife,
    })
    const runOptions = {
      compilerVersion, output,
      noSourceMap: _noSourceMaps || _debug, debug: _debug,
    }
    if (_compile) {
      return await Compile({
        src,
        noStrict: _noStrict,
        verbose: _verbose,
        debug: _debug,
      }, runOptions, options)
    }
    await Bundle({
      src,
      tempDir: _temp,
      preact: _preact,
    }, runOptions, options)
  } catch (error) {
    process.env['DEBUG'] ? console.log(error.stack) : console.log(error.message)
  }
})()