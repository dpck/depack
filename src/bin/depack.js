#!/usr/bin/env node
import { _src, _output, _version, _noWarnings, _compile, _argv, _level, _language_in, _language_out, _node, _temp, _advanced, _noStrict } from './get-args'
import Bundle from './commands/bundle'
import { version } from '../../package.json'
import Compile from './commands/compile'
import { basename, join } from 'path'

const compiler = require.resolve('google-closure-compiler-java/compiler.jar')

if (_version) {
  console.log(version)
  process.exit(0)
}

const getLanguage = (l) => {
  if (/^\d+$/.test(l)) return `ECMASCRIPT_${l}`
  return l
}

const getCompilerOptions = ({
  src, output, level, languageIn, languageOut, sourceMap = true, argv,
  advanced,
}) => {
  const options = ['-jar', compiler]
  if (level) {
    options.push('--compilation_level', level)
  } else if (advanced) {
    options.push('--compilation_level', 'ADVANCED')
  }
  if (languageIn) {
    const lang = getLanguage(languageIn)
    options.push('--language_in', lang)
  }
  if (languageOut) {
    const lang = getLanguage(languageOut)
    options.push('--language_out', lang)
  }
  if (sourceMap) {
    options.push('--create_source_map', '%outname%.map', '--source_map_include_content')
  }
  options.push(...argv)
  if (_output) {
    const o = /\.js$/.test(output) ? output : join(output, basename(src))
    options.push('--js_output_file', o)
  }
  return options
}

(async () => {
  try {
    const options = getCompilerOptions({
      src: _src, output: _output, level: _level, languageIn: _language_in, languageOut: _language_out, argv: _argv, advanced: _advanced,
    })
    if (_compile) {
      return await Compile({
        src: _src,
        node: _node,
        noWarnings: _noWarnings,
        output: _output,
        noStrict: _noStrict,
      }, options)
    }
    await Bundle({
      src: _src,
      output: _output,
      tempDir: _temp,
      noWarnings: _noWarnings,
    }, options)
  } catch ({ message, stack }) {
    process.env.DEBUG ? console.log(stack) : console.log(message)
  }
})()