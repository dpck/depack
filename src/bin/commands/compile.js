import loading from 'indicatrix'
import spawn from 'spawncommand'
import { c } from 'erte'
import { relative, join, dirname } from 'path'
import { getCommand, exists, addSourceMap, removeStrict } from '../../lib/lib'
import detect from '../../lib/detect'
import { makeError, prepareCoreModules, fixDependencies } from '../../lib/closure'

const externsDeps = {
  fs: ['events', 'stream'],
  stream: ['events'],
  child_process: ['events', 'stream'],
}

const Compile = async (opts, options) => {
  const { src, noWarnings = false, node, output, noStrict, verbose } = opts
  if (!src) throw new Error('Source is not given.')
  const args = [
    ...options,
    ...(node ? ['--module_resolution', 'NODE'] : []),
    '--package_json_entry_names', 'module,main',
  ]
  const detected = await detect(src)
  const jsFiles = detected
    .reduce((acc, { internal, entry, packageJson, hasMain }) => {
      if (internal) return acc
      if (hasMain) return acc
      const f = [...(packageJson ? [packageJson] : []), entry]
      return [...acc, ...f]
    }, [])
  const {
    entries: commonJsEntries,
    packageJsons: commonJsPackageJsons,
  } = detected
    .reduce((acc, { packageJson, entry, hasMain, internal }) => {
      if (internal || !hasMain) return acc
      const { packageJsons, entries } = acc
      if (packageJson) packageJsons.push(packageJson)
      entries.push(entry)
      return acc
    },{ packageJsons: [], entries: [] })
  const internals = detected
    .filter(({ internal }) => internal)
    .map(({ internal }) => internal)
  const deps = [...jsFiles, src, ...commonJsPackageJsons]
    .filter((e, i, a) => a.indexOf(e) == i)
  const internalDeps = await prepareCoreModules({ internals })
  const externs = await getExterns(internals)
  await fixDependencies(detected.reduce((acc, { packageJson, hasMain }) => {
    return packageJson && hasMain ? [...acc, packageJson] : acc
  }, []))
  const jsDeps = [...deps, ...internalDeps]
  const wrapper = internals
    .map(i => {
      const m = i == 'module' ? '_module' : i
      return `const ${m} = r` + `equire('${i}');`
    })
    .join('\n') + '\n%output%'
  const Args = [
    ...args,
    ...jsDeps.reduce((acc, d) => {
      return [...acc, ...(verbose ? ['--js', d] : [d])]
    }, verbose ? [] : ['--js']),
    ...commonJsEntries.reduce((acc, d) => {
      return [...acc, d]
    }, commonJsEntries.length ? ['--process_common_js_modules']: []),
    ...externs,
    ...(internals.length ? ['--output_wrapper', wrapper] : []),
  ]
  verbose ? console.log(getCommand(Args)) : printCommand(args, detected)
  const { promise } = spawn('java', Args)
  const { stdout, stderr, code } = await loading('Running Google Closure Compiler', promise)
  if (code) throw new Error(makeError(code, stderr))
  if (stdout) console.log(stdout)
  if (output) await addSourceMap(output)
  if (noStrict) await removeStrict(output)
  if (stderr && !noWarnings) console.warn(c(stderr, 'grey'))
}

const printCommand = (args, deps) => {
  const s = args.join(' ')
  console.log(s)
  const ddeps = deps.filter(({ name }) => name)
  const bi = deps.filter(({ internal }) => internal)
  console.log('Module Dependencies: %s',
    ddeps.filter(({ hasMain }) => !hasMain)
      .map(({ name }) => name).join(', '))
  console.log('CommonJS Dependencies: %s',
    ddeps.filter(({ hasMain }) => hasMain)
      .map(({ name }) => name).join(', '))
  console.log('Built-ins: %s', bi.map(({ internal }) => internal).join(', '))
  console.log('Files: %s', deps
    .filter(({ packageJson, entry }) => !packageJson && entry)
    .filter(({ entry }) => !entry.startsWith('node_modules'))
    .map(({ entry }) => entry).join(' '))
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