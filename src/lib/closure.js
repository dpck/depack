import { compiler as ClosureCompiler } from 'google-closure-compiler'
import { c } from 'erte'
import { join } from 'path'

/**
 * Create an error with color.
 */
const makeError = (exitCode, se) => {
  const [command, ...rest] = se.split('\n').filter(a => a)
  const rr = rest.map(s => c(s.trim(), 'red')).join('\n')
  const cc = c(command, 'grey')
  const er = `Exit code ${exitCode}\n${cc}\n${rr}`
  return er
}

/**
 * Execute the closure compiler, and throw an error if the error code is positive.
 * @param {ClosureOptions} options
 */
const runClosure = async (options) => {
  const { path, depsDir, externs, externsPath, js = [] } = options
  const k = externs.map(e => join(externsPath, `${e}.js`))
  const closureCompiler = new ClosureCompiler({
    compilation_level: 'ADVANCED',
    language_in: 'ECMASCRIPT_2018',
    language_out: 'ECMASCRIPT_2017',
    module_resolution: 'NODE',
    // debug: true,
    formatting: 'PRETTY_PRINT',
    // warning_level: 'QUIET',
    ...(path ? { create_source_map: `${path}.map` } : {}),
    externs: ['externs/Buffer.js', ...k],
    js,
    // process_common_js_modules: join(depsDir, '**'),
  })

  return await new Promise((r, j) => {
    closureCompiler.run((e, so, se) => {
      if (e) {
        const er = makeError(e, se)
        const err = new Error()
        err.stack = er
        return j(err)
      }
      r({ stdout: so, stderr: se })
    })
  })
}

export default runClosure

/* documentary types/closure.xml */
