import { compiler as ClosureCompiler } from 'google-closure-compiler'
import { join, relative } from 'path'
import { run, prepareCoreModules } from './closure/lib'
import { c } from 'erte'

//  * @param {ClosureOptions} options

const EXTERNS_PATH = relative('', join(__dirname, '../../externs'))
// const INTERNS = join(__dirname, '../../interns')
// const NODE_MODULES = relative('', join(__dirname, '../../interns'))

/**
 * Execute the closure compiler, and throw an error if the error code is positive.
 * @param {Object} options The options.
 * @param {Array<string>} [options.dependencies=[]] The paths to all package.json files.
 * @param {Array<string>} [options.internals=[]] The names of core Node.js modules used in compilation.
 */
const runClosure = async (options = {}) => {
  const {
    path, internals = [], externsPath = EXTERNS_PATH,
    extraExterns = [], modules = [], dependencies,
  } = options
  const specialExterns = []
  const i = internals
    .reduce((acc, current) => {
      if (current == 'child_process') {
        const getE = e => `externs/${e}.js`
        specialExterns.push(getE('stream'), getE('events'))
      }
      return [...acc, current]
    }, [])
    .filter((a, j, aa) => j == aa.indexOf(a))
  const externs = [...i, ...extraExterns]
    .map(e => join(externsPath, `${e}.js`))
  const {
    packageJsons: corePackageJsons,
    entries: coreEntries,
  } = await prepareCoreModules({
    internals: i, nodeModulesPath: 'node_modules',
  })
  await fixDependencies(dependencies)
  const js = [...dependencies, ...corePackageJsons, ...coreEntries].sort()
  const Externs =  [...externs, ...specialExterns]
  const compiler = new ClosureCompiler({
    compilation_level: 'ADVANCED',
    language_in: 'ECMASCRIPT_2018',
    language_out: 'ECMASCRIPT_2017',
    module_resolution: 'NODE',
    // debug: true,
    formatting: ['PRETTY_PRINT', 'SINGLE_QUOTES'],
    warning_level: 'QUIET',
    // no other way to get a source map
    ...(path ? { create_source_map: `${path}.map` } : {}),
    externs: Externs,
    js,
    process_common_js_modules: modules,
  })

  const s = getStr(compiler.getFullCommand(), { corePackageJsons, coreEntries })
  console.warn(s)

  return await run(compiler)
}

const unique = (a, j, aa) => j == aa.indexOf(a)

const getStr = (cmd, { corePackageJsons, coreEntries }) => {
  const total = [...corePackageJsons, ...coreEntries].filter(unique)
  return cmd.replace(
    /--process_common_js_modules/g,
    '\n  --process_common_js_modules'
  )
    .replace(/--js=([^\s]+)/g, (m, f) => {
      const ff = `\n  --js=${f}`
      if (total.includes(f)) {
        return c(ff, 'grey')
      } return ff
    })
}

export default runClosure

/* documentary types/closure.xml */
