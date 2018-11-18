import { compiler as ClosureCompiler } from 'google-closure-compiler'
import { join, relative, dirname } from 'path'
import { Replaceable } from 'restream'
import { createReadStream, lstat } from 'fs'
import { builtinModules } from 'module'
import TempContext from 'temp-context'
import makePromise from 'makepromise'
import { c } from 'erte'
// import write from '@wrote/write'
import whichStream from 'which-stream'
// import { collect } from 'catchment'

const EXTERNS = relative('', join(require.resolve('google-closure-compiler'), '../contrib/nodejs'))
console.log(EXTERNS) // absolute path to the contrib folder which contains externs ClosureCompiler.CONTRIB_PATH

const compile = async (src) => {
  const { file, dependencies } = await makeTemp(src)

  const closureCompiler = new ClosureCompiler({
    compilation_level: 'ADVANCED',
    language_in: 'ECMASCRIPT_2018',
    module_resolution: 'NODE',
    warning_level: 'QUIET',

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
      ...dependencies,
      // 'node_modules/catchment/**/*.js',
      // 'node_modules/erotic/**/*.js',
      // 'node_modules/@artdeco/clean-stack/**/*.js',
    ],
  })

  closureCompiler.run((exitCode, stdOut, stdErr) => {
    console.log(exitCode)
    console.log(stdOut)
    console.log(stdErr)
    //compilation complete
  })
}

const makeTemp = async (src) => {
  const tc = new TempContext()
  const TEMP = 'closure'
  tc.TEMP = TEMP
  try {
    await tc._destroy()
  } catch (err) { /* */ }
  await tc._init()
  const { file, deps: dependencies } = await transform(src, TEMP)
  return { file, dependencies }
}

let i = 0
const getId = () => {
  i++
  return i
}
const transform = async (source, destDir) => {
  console.log('Processing %s', relative('', source))
  const deps = []
  const r = [
    {
      re: /=(\s+)require\(.(.+?).\)/g,
      // all requires are detected in parallel.
      async replacement(m, ws, mod) {
        const internal = builtinModules.includes(mod)

        if (internal) {
          console.log(' [%s] %s', c('node', 'green'), mod)
          return `=${ws}nodeRequire('${mod}')`
        }
        const isDep = !(mod.startsWith('.') || mod.startsWith('/'))

        let d
        if (isDep) {
          d = require.resolve(mod)
          console.log(' [%s] %s %s',
            c('deps', 'red'), mod,  c(relative('', d), 'grey')
          )
        } else {
          d = await getLibRequire(source, mod)
          console.log(' [+] %s', relative('', d))
        }
        const { file, deps: dependencies } = await transform(d, destDir)
        deps.push(file, ...dependencies)
        return `=${ws}require('../${file}')`
      },
    },
  ]
  const readable = new Replaceable(r)
  createReadStream(source).pipe(readable)
  const id = getId()
  const destination = join(destDir, `${id}.js`)
  await whichStream({
    source,
    readable,
    destination,
  })
  return { file: destination, deps }
}

(async () => {
  await compile('example/example2.js')
})()

const compileDep = () => {

}

/**
 * Returns the path that can be required by Node.js.
 */
const getLibRequire = async (source, mod) => {
  let d = join(dirname(source), mod)
  if (mod.endsWith('/')) {
    d = join(d, 'index.js')
  } else {
    const stat = await checkExists(d)
    if (!stat) {
      d = `${d}.js`
    } else if (stat.isDirectory()) {
      d = join(d, 'index.js')
    }
  }
  return d
}

const checkExists = async (path) => {
  try {
    const stat = await makePromise(lstat, path)
    return stat
  } catch (err) {
    return null
  }
}

// compilerProcess.stdout.pipe(process.stdout)
// compilerProcess.stderr.pipe(process.stderr)