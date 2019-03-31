#!/usr/bin/env node
import { _src, _output, _version, _noWarnings, _compile, _argv, _level, _language_in, _language_out, _temp, _advanced, _noStrict, _verbose, _help, _noSourceMaps, _prettyPrint, _preact, _debug, _iife } from './get-args'
import { GOOGLE_CLOSURE_COMPILER, run, Bundle, Compile, getOptions, getCompilerVersion } from '@depack/depack'
import getUsage from './usage'
import { version } from '../../package.json'

if (_help) {
  console.log(getUsage())
  process.exit(0)
}

(async () => {
  try {
    const compilerVersion = await getCompilerVersion()
    if (_version) {
      console.log('Depack version: %s', version)
      await run([
        ...getOptions({ compiler: GOOGLE_CLOSURE_COMPILER }),
        '--version'], { compilerVersion })
      process.exit(0)
    }
    const options = getOptions({
      compiler: GOOGLE_CLOSURE_COMPILER,
      src: _src, output: _output, level: _level, languageIn: _language_in, languageOut: _language_out, argv: _argv, advanced: _advanced, sourceMap: !!_output && !_noSourceMaps, prettyPrint: _prettyPrint, noWarnings: _noWarnings, debug: _debug, iife: _iife,
    })
    if (_compile) {
      return await Compile({
        src: _src,
        output: _output,
        noStrict: _noStrict,
        verbose: _verbose,
        compilerVersion,
        noSourceMap: _noSourceMaps || _debug,
        debug: _debug,
      }, options)
    }
    await Bundle({
      src: _src,
      output: _output,
      tempDir: _temp,
      compilerVersion,
      preact: _preact,
      debug: _debug,
      noSourceMap: _noSourceMaps || _debug,
    }, options)
  } catch (error) {
    process.env['DEBUG'] ? console.log(error.stack) : console.log(error.message)
  }
})()