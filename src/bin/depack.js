#!/usr/bin/env node
import { _src, _output, _version, _noWarnings, _compile, _argv, _level, _language_in, _language_out, _temp, _advanced, _noStrict, _verbose, _suppressLoading, _help, _noSourceMaps, _prettyPrint, _preact, _debug } from './get-args'
import { read } from '@wrote/wrote'
import Bundle from './commands/bundle'
import getUsage from './usage'
import getCompilerOptions from './get-options'
import { version } from '../../package.json'
import Compile from './commands/compile'

const { 'GOOGLE_CLOSURE_COMPILER': GOOGLE_CLOSURE_COMPILER } = process.env
const compilerPackage = GOOGLE_CLOSURE_COMPILER ? 'target' : require.resolve('google-closure-compiler-java/package.json')

if (_version) {
  console.log(version)
  process.exit(0)
}
if (_help) {
  console.log(getUsage())
  process.exit(0)
}

(async () => {
  try {
    let compilerVersion = 'target'
    if (!GOOGLE_CLOSURE_COMPILER) {
      const compilerPackageJson = await read(compilerPackage)
      const { 'version': cv } = JSON.parse(compilerPackageJson)
      ;[compilerVersion] = cv.split('.')
    }
    const options = getCompilerOptions({
      compiler: GOOGLE_CLOSURE_COMPILER,
      src: _src, output: _output, level: _level, languageIn: _language_in, languageOut: _language_out, argv: _argv, advanced: _advanced, sourceMap: !!_output && !_noSourceMaps, prettyPrint: _prettyPrint, noWarnings: _noWarnings, debug: _debug,
    })
    if (_compile) {
      return await Compile({
        src: _src,
        output: _output,
        noStrict: _noStrict,
        verbose: _verbose,
        compilerVersion,
        suppressLoading: _suppressLoading,
        noSourceMap: _noSourceMaps,
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
    }, options)
  } catch (error) {
    process.env['DEBUG'] ? console.log(error.stack) : console.log(error.message)
  }
})()