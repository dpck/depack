import { join, relative } from 'path'
import TempContext from 'temp-context'
import loading from 'indicatrix'
import { compiler as ClosureCompiler } from 'google-closure-compiler'
import { c } from 'erte'
import transform from './transform'


export const EXTERNS = relative('', join(require.resolve('google-closure-compiler'), '../contrib/nodejs'))
// console.log(EXTERNS) // absolute path to the contrib folder which contains externs ClosureCompiler.CONTRIB_PATH

const makeContext = async () => {
  const tc = new TempContext()
  const TEMP = 'closure'
  tc.TEMP = TEMP
  try {
    await tc._destroy()
  } catch (err) { /* */ }
  await tc._init()
  return tc
}

const writeWrapper = async (internals, t) => {
  const requires = Object.keys(internals).map((key) => {
    return `const ${internals[key]} = require('${key}');`
  }, []).join('\n')
  return await t.write('wrapper.js', `${requires}
(function(){
  %output%
}).call(this)`)
}

export const compile = async (src, path) => {
  const t = await makeContext()

  const { file, internals } = await makeTemp(src, t.TEMP)
  const wrapper = await writeWrapper(internals, t)

  const cc = runClosure({ file, path, wrapper, temp: t.TEMP })

  await loading('Compiling with Closure', cc)
  // await write(path, output)
  console.log('Saved to %s', path)
}


const runClosure = async ({ file, path, temp, wrapper }) => {
  const closureCompiler = new ClosureCompiler({
    compilation_level: 'ADVANCED',
    language_in: 'ECMASCRIPT_2018',
    language_out: 'ECMASCRIPT_2017',
    strict_mode_input: false,
    module_resolution: 'NODE',
    warning_level: 'QUIET',
    third_party: true,
    assume_function_wrapper: true,
    create_source_map: '%outname%.map',
    output_wrapper_file: wrapper,
    js_output_file: path,
    rewrite_polyfills: false,
    externs: ['externs/Buffer.js'],
    js: [
      // 'example/example.js',
      // 'node_modules/catchment/package.json',
      // 'node_modules/erotic/package.json',
      // 'node_modules/@artdeco/clean-stack/package.json',
      // 'node_modules/catchment/build/index.js',
    ],
    process_common_js_modules: [
      file,
      `${temp}/**`,
      // ...dependencies,
      // 'node_modules/catchment/**/*.js',
      // 'node_modules/erotic/**/*.js',
      // 'node_modules/@artdeco/clean-stack/**/*.js',
    ],
  })

  const { stdOut } = await new Promise((r, j) => {
    closureCompiler.run((e, so, se) => {
      if (e) {
        const er = makeError(e, se)
        j(new Error(er))
      }
      r({ exitCode: e, stdOut: so, stdErr: se })
    })
  })
  return stdOut
}

const makeError = (exitCode, se) => {
  const [command, ...rest] = se.split('\n').filter(a => a)
  const rr = rest.map(s => c(s.trim(), 'red')).join('\n')
  const er = `Exit code ${exitCode}\n${c(command, 'grey')}\n${rr}`
  return er
}

/**
 * Transpile files into the temporary directory starting from the entry file.
 */
const makeTemp = async (src, temp) => {
  console.log('Compiling %s', src)
  return await transform(src, temp)
}
