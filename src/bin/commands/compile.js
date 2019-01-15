import loading from 'indicatrix'
import spawn from 'spawncommand'
import { c } from 'erte'
import { relative, join, dirname } from 'path'
import { getCommand, exists, addSourceMap, removeStrict } from '../../lib/lib'
import detect from '../../lib/detect'
import { makeError, prepareCoreModules } from '../../lib/closure'

const externsDeps = {
  fs: ['events', 'stream'],
  stream: ['events'],
}

const Compile = async (opts, options) => {
  const { src, noWarnings = false, node, output, noStrict } = opts
  const args = [
    ...options,
    ...(node ? ['--module_resolution', 'NODE'] : []),
  ]
  const detected = await detect(src)
  const files = detected.reduce((acc, { internal, entry, packageJson }) => {
    if (internal) {
      return acc
    }
    const f = [...(packageJson ? [packageJson] : []), entry]
    return [...acc, ...f]
  }, [])
  const internals = detected
    .filter(({ internal }) => internal)
    .map(({ internal }) => internal)
  const deps = [...files, src].filter((e, i, a) => a.indexOf(e) == i)
  const internalDeps = await prepareCoreModules({
    internals,
  })
  const externs = await getExterns(internals)
  const allDeps = [...deps, ...internalDeps]
  const Args = [...args, ...allDeps.reduce((acc, d) => {
    return [...acc, '--js', d]
  }, externs)]
  const a = getCommand(Args)
  console.log(a)
  const { promise } = spawn('java', Args)
  const { stdout, stderr, code } = await loading('Running Google Closure Compiler', promise)
  if (code) throw new Error(makeError(code, stderr))
  if (stdout) console.log(stdout)
  await addSourceMap(output)
  if (noStrict) await removeStrict(output)
  if (stderr && !noWarnings) console.warn(c(stderr, 'grey'))
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