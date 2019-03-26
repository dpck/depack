import { join, basename } from 'path'

const getLanguage = (l) => {
  if (/^\d+$/.test(l)) return `ECMASCRIPT_${l}`
  return l
}

export default ({
  compiler = require.resolve('google-closure-compiler-java/compiler.jar'),
  src, output, level, languageIn, languageOut, sourceMap = true,
  argv = [], advanced, prettyPrint, noWarnings, debug,
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
  if (sourceMap && !debug) {
    options.push('--create_source_map', '%outname%.map',
      // '--source_map_include_content'
    )
  }
  if (prettyPrint) {
    options.push('--formatting', 'PRETTY_PRINT')
  }
  if (debug) {
    options.push('--print_source_after_each_pass')
  }
  if (noWarnings || debug) {
    options.push('--warning_level', 'QUIET')
  }
  options.push(...argv)
  if (output) {
    const o = /\.js$/.test(output) ? output : join(output, basename(src))
    options.push('--js_output_file', o)
  }
  return options
}