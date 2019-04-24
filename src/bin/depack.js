#!/usr/bin/env node
import { _source, _output, _version, _noWarnings, _compile, _argv, _level, _language_in, _language_out, _temp, _advanced, _noStrict, _verbose, _help, _noSourcemap, _prettyPrint, _preact, _debug, _iife, _library } from './get-args'
import { GOOGLE_CLOSURE_COMPILER, run, Bundle, Compile, getOptions, getCompilerVersion, getOutput } from '@depack/depack/src'
import resolveDependency from 'resolve-dependency'
import getUsage from './usage'

if (_help) {
  console.log(getUsage())
  process.exit(0)
}

(async () => {
  try {
    const compilerVersion = await getCompilerVersion()
    if (_version) {
      const version = require('../../package.json')['version']
      console.log('Depack version: %s', version)
      const res = await run([
        ...getOptions({ compiler: GOOGLE_CLOSURE_COMPILER }),
        '--version'], { compilerVersion })
      console.log(res)
      return
    }
    const { path: src } = await resolveDependency(_source)
    const output = _output ? getOutput(_output, src) : null
    let languageOut = _language_out
    if (!_language_out && _compile) {
      languageOut = 2017
    }
    const options = getOptions({
      compiler: GOOGLE_CLOSURE_COMPILER,
      output, level: _level, languageIn: _language_in, languageOut, argv: _argv, advanced: _advanced, sourceMap: !!_output && !_noSourcemap, prettyPrint: _prettyPrint, noWarnings: _noWarnings, debug: _debug, iife: _iife,
    })
    const runOptions = {
      compilerVersion, output,
      noSourceMap: _noSourcemap || _debug, debug: _debug,
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
    await Bundle({
      src,
      tempDir: _temp,
      preact: _preact,
    }, runOptions, options)
  } catch (error) {
    process.env['DEBUG'] ? console.log(error.stack) : console.log(error.message)
  }
})()