import usually from 'usually'
import { c } from 'erte'

export default () => {
  const common = usually({
    line: 'depack SOURCE [-c] [-o output.js] [-IO 2018] [-awVvh] [-l LEVEL] [... --generic-args]',
    usage: {
      'SOURCE': 'The source file to build.',
      '--output, -o': 'Where to save the output. STDOUT by default.',
      '--language_in, -I': 'Language Input. Can pass ECMA year.',
      '--language_out, -O': 'Language Output. Can pass ECMA year.',
      '--level, -l': `The optimisation level (generic -O).
WHITESPACE, SIMPLE (default), ADVANCED`,
      '--advanced, -a': 'Turn on advanced optimisation.',
      '--no-warnings, -w': 'Don\'t print warnings. Same as\n--warning_level QUIET',
      '--compile, -c': 'Set the mode to compilation.',
      '--verbose, -V': 'Print all compiler arguments.',
      '--pretty-print, -p': 'Add --formatting=PRETTY_PRINT flag.',
      '--debug, -d': 'Set --print_source_after_each_pass\nand save stderr to the specified file.',
      '--version, -v': 'Show Depack and GCC versions.',
      '--help, -h': 'Print help information.',
      '--no-sourcemap, -S': 'Do not add source maps.',
      // '--temp': 'Set the mode to compilation.',
    },
  })
  const backend = usually({
    line: 'depack SOURCE -c [-o output.js] [-s]',
    example: 'depack source.js -c -o bundle.js -I 2018 -O 2018',
    usage: {
      '--no-strict -s': 'Remove "use strict" from the output.',
    },
  })
  const frontend = usually({
    line: 'depack SOURCE [-o output.js] [-H]',
    example: 'depack source.js -o bundle.js -I 2018 -H',
    usage: {
      '-H': 'Add import { h } from \'preact\' to files.',
    },
  })
  const usage = `Google Closure Compiler-based packager for front and back-end.
https://github.com/dpck/depack
Performs static analysis on the source files to find out all dependencies.
Generic flags: https://github.com/google/closure-compiler/wiki/Flags-and-Options

${common}
${c('BACKEND', 'blue')}: Creates a single executable file.
${backend}
${c('FRONTEND', 'cyan')}: Creates a bundle for the web.
${frontend}`
  return usage
}
