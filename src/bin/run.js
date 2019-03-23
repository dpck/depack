import loading from 'indicatrix'
import spawn from 'spawncommand'
import { c } from 'erte'
import { createWriteStream } from 'fs'
import { makeError } from '../lib/closure'
import { addSourceMap } from '../lib/lib'

export default async (args, {
  debug, compilerVersion, suppressLoading, output, noSourceMap,
}) => {
  let { promise, stderr: compilerStderr } = spawn('java', args)
  if (debug) compilerStderr.pipe(createWriteStream(debug))
  const { stdout, stderr, code } = await loading(`Running Google Closure Compiler ${c(compilerVersion, 'grey')}`, promise, {
    writable: process.stderr,
  })

  if (!suppressLoading) {
    // is here until documentary is fixed for \r
    promise = loading(`Running Google Closure Compiler ${c(compilerVersion, 'grey')}`, promise, {
      writable: process.stderr,
    })
  }
  // if(process.stderr.isTTY) process.stderr.write(' '.repeat(process.stderr.columns))

  if (code) throw new Error(makeError(code, stderr))
  if (stdout) console.log(); console.log(stdout)
  if (output && !noSourceMap) await addSourceMap(output)
  if (stderr && !debug) console.warn(c(stderr, 'grey'))
  else if (debug) console.log('Sources after each pass log saved to %s', debug)
}