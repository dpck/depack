import usually from 'usually'
import { c } from 'erte'

export default (index, bundle, compile) => {
  const common = usually({
    line: 'depack SOURCE [-cl] [-o output.js] [-IO 2018] [-wVvh] [-lvl LEVEL -a] [... --generic-args]',
    usage: index,
  })
  const backend = usually({
    line: 'depack SOURCE -cl [-o output.js] [-s]',
    example: 'depack src/bin.js -c -a -o depack/bin.js -p',
    usage: compile,
  })
  const frontend = usually({
    line: 'depack SOURCE [-o output.js] [-H]',
    example: 'depack source.js -o bundle.js -i -a -H',
    usage: bundle,
  })
  const usage = `Google Closure Compiler-based packager for the web and Node.JS.
https://artdecocode.com/depack/
Generic flags: https://github.com/google/closure-compiler/wiki/Flags-and-Options

${common}
${c('BACKEND', 'blue')}: Creates a single executable Node.JS file or a library.
${backend}
${c('FRONTEND', 'cyan')}: Creates a bundle for the web.
${frontend}`
  return usage
}
