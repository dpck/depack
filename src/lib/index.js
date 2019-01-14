import { dirname, join, relative } from 'path'
import read from '@wrote/read'
import write from '@wrote/write'
import ensurePath from '@wrote/ensure-path'
import transpileJSX from '@a-la/jsx'
import { Replaceable } from 'restream'
import { collect } from 'catchment'
import { exists } from './lib'

const processFile = async (entry, config, cache) => {
  const { cachedNodeModules, cachedFiles } = cache
  const { tempDir } = config
  const source = await read(entry)
  const transpiled = entry.endsWith('.jsx') ? transpileJSX(source, {
    quoteProps: true,
  }): source
  const dir = relative('', dirname(entry))
  const to = join(tempDir, dir)
  const data = {
    path: entry,
    deps: [],
    nodeModules: [],
    to,
  }
  const rs = new Replaceable([
    {
      re: /^( *import(?:\s+[^\s,]+\s*,?)?(?:\s*{(?:[^}]+)})?\s+from\s+)['"](.+)['"]/gm,
      replacement,
    },
  ])
  Object.assign(rs, data)
  rs.end(transpiled)
  const transformed = await collect(rs)
  const tto = join(tempDir, entry)
  await ensurePath(tto)
  await write(tto, transformed)

  // now deal with dependencies
  const depPaths = data.deps
    .map(d => join(dir, d))
    .filter(d => !(d in cachedFiles))
  const nodeModules = data.nodeModules
    .map(d => relative('', d))
    .filter(d => !(d in cachedNodeModules))

  nodeModules.forEach(nm => { cachedNodeModules[nm] = 1 })
  depPaths.forEach(dp => { cachedFiles[dp] = 1 })

  await depPaths.reduce(async (acc, depPath) => {
    await acc
    await processFile(depPath, config, cache)
  }, {})
}

/**
 * Generates a temp directory for the given entry file and transpiles JSX files. Returns the list of all dependencies including in the `node_modules`.
 * @param {string} entry The path to the entry file.
 * @param {{ tempDir: string }} [config] The configuration.
 */
export const generateTemp = async (entry, config = {}) => {
  const {
    tempDir = 'depack-temp',
  } = config
  const cache = {
    cachedFiles: {
      [relative('', entry)]: 1,
    },
    cachedNodeModules: {},
  }
  await processFile(entry, {
    tempDir,
  }, cache)
  const tempFiles = Object.keys(cache.cachedFiles)
  return [...tempFiles, ...Object.keys(cache.cachedNodeModules)]
}

/**
 * The replacement function that adds extensions to required modules and resolves paths to packages from node_modules.
 */
async function replacement(m, pre, from) {
  if (/[/.]/.test(from)) {
    const dep = await resolveDependency(this.path, from)
    this.deps.push(dep)
    return `${pre}'${dep}'`
  }
  const packageJson = `${from}/package.json`
  const { module: mod, main } = require(packageJson)
  if (!mod) {
    console.warn('[↛] Package %s does not specify module in package.json, will use main.', from)
  }
  if (!mod && !main) {
    throw new Error('No main is available.')
  }
  const mm = mod || main
  const modPath = require.resolve(`${from}/${mm}`)
  this.nodeModules.push(modPath)
  const modRel = relative(this.to, modPath)
  return `${pre}'${modRel}'`
}

/**
 * Returns the name of the local dependency with its extension.
 * @param {string} path The path from which the file is required.
 * @param {string} from The name of the local module that is imported.
 */
export const resolveDependency = async (path, from) => {
  if (/\.jsx?$/.test(from)) return from
  const dir = dirname(path)
  const js = `${from}.js`
  const jse = await exists(join(dir, js))
  if (jse) return js
  const jsx = `${from}.jsx`
  const jsxe = await exists(join(dir, jsx))
  if (!jsxe) throw new Error(`Neither JS nor JSX files are found for ${from} in ${path}`)
  return jsx
}