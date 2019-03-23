import { c } from 'erte'
import { relative, join, dirname } from 'path'
import makePromise from 'makepromise'
import { chmod } from 'fs'
import { exists } from '@wrote/wrote'
import detect, { sort } from 'static-analysis'
import { removeStrict } from '../../lib/lib'
import { getWrapper } from '../../lib/detect'
import { prepareCoreModules, fixDependencies } from '../../lib/closure'
import run from '../run'

const externsDeps = {
  fs: ['events', 'stream'],
  stream: ['events'],
  child_process: ['events', 'stream'],
  http: ['events', 'net', 'stream'],
  https: ['http', 'tls'],
  tls: ['events', 'net', 'stream', 'crypto'],
  crypto: ['stream'],
  net: ['events'],
  zlib: ['stream'],
  readline: ['stream', 'events'],
}

const Compile = async (opts, options) => {
  const { src, output, noStrict, verbose,
    compilerVersion, suppressLoading, noSourceMap, debug,
  } = opts
  if (!src) throw new Error('Source is not given.')
  const args = [
    ...options,
    '--module_resolution', 'NODE',
    '--package_json_entry_names', 'module,main',
  ]
  const detected = await detect(src)
  const sorted = sort(detected)
  const {
    commonJs, commonJsPackageJsons, internals, js, packageJsons,
  } = sorted
  const internalDeps = await prepareCoreModules({ internals })
  const externs = await getExterns(internals)
  await fixDependencies(commonJsPackageJsons, packageJsons)

  const files = [src,
    ...commonJsPackageJsons,
    ...packageJsons,
    ...js,
    ...commonJs,
    ...internalDeps,
  ].sort((a, b) => {
    if (a.startsWith('node_modules')) return -1
    if (b.startsWith('node_modules')) return 1
  })
  const wrapper = getWrapper(internals)

  const Args = [
    ...args,
    ...externs,
    ...(commonJs.length ? ['--process_common_js_modules'] : []),
    ...(wrapper ? ['--output_wrapper', wrapper] : []),
    '--js', ...files,
  ]
  verbose ? console.error(Args.join(' ')) : printCommand(args, externs, sorted)

  await run(Args, { debug, compilerVersion, suppressLoading, output, noSourceMap })
  if (noStrict) await removeStrict(output)
  if (output) await makePromise(chmod, [output, '755'])
}

const printCommand = (args, externs, sorted) => {
  const s = [...args, ...externs].join(' ')
    .replace(/--js_output_file (\S+)/g, (m, f) => {
      return `--js_output_file ${c(f, 'red')}`
    })
    .replace(/--externs (\S+)/g, (m, f) => {
      return `--externs ${c(f, 'grey')}`
    })
    .replace(/--compilation_level (\S+)/g, (m, f) => {
      return `--compilation_level ${c(f, 'green')}`
    })
  console.error(s)
  const {
    commonJs, internals, js, deps,
  } = sorted
  const fjs = js.filter(filterNodeModule)
  const cjs = commonJs.filter(filterNodeModule)
  if (deps.length) console.log('%s: %s',
    c('Dependencies', 'yellow'), deps.filter((e, i, a) => {
      return a.indexOf(e) == i
    }).join(' '))
  if (fjs.length) console.log('%s: %s',
    c('Modules', 'yellow'), fjs.join(' '))
  if (cjs.length) console.log('%s: %s',
    c('CommonJS', 'yellow'), cjs.join(' '))
  if (internals.length) console.log('%s: %s',
    c('Built-ins', 'yellow'), internals.join(', '))
}

const filterNodeModule = (entry) => {
  return !entry.startsWith('node_modules')
}

/**
 * Returns options to include externs.
 */
const getExterns = async (internals) => {
  const depack = relative('',
    dirname(require.resolve('depack/package.json')))
  const externsDir = join(depack, 'externs')
  const allInternals = internals
    .reduce((acc, i) => {
      const deps = externsDeps[i] || []
      return [...acc, i, ...deps]
    }, [])
    .filter((e, i, a) => a.indexOf(e) == i)
  const p = [...allInternals, 'node']
    .map(i => join(externsDir, `${i}.js`))
  await Promise.all(p.map(async pp => {
    const exist = await exists(pp)
    if (!exist) throw new Error(`Externs ${pp} don't exist.`)
  }))
  const externs = p.reduce((acc, e) => {
    return [...acc, '--externs', e]
  }, [])
  return externs
}

export default Compile