import { dirname, join, relative } from 'path'
import { read, write, ensurePath } from '@wrote/wrote'
import transpileJSX from '@a-la/jsx'
import { Replaceable } from 'restream'
import { collect } from 'catchment'
import resolveDependency from 'resolve-dependency'
import { checkIfLib } from './lib'

const processFile = async (entry, config, cache) => {
  const { cachedNodeModules, cachedFiles } = cache
  const { tempDir, preact } = config
  const source = await read(entry)
  const isJSX = entry.endsWith('.jsx')
  const transpiled = isJSX ? transpileJSX(source, {
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
  const T = preact && isJSX ? `import { h } from 'preact'
${transpiled}` : transpiled
  rs.end(T)
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
 * @param {{ tempDir: string, preact: boolean }} [config] The configuration.
 */
export const generateTemp = async (entry, config = {}) => {
  const {
    tempDir = 'depack-temp',
    preact,
  } = config
  const cache = {
    cachedFiles: {
      [relative('', entry)]: 1,
    },
    cachedNodeModules: {},
  }
  await processFile(entry, {
    tempDir, preact,
  }, cache)
  const tempFiles = Object.keys(cache.cachedFiles)
    .map(f => join(tempDir, f))
  return [...tempFiles, ...Object.keys(cache.cachedNodeModules)]
}

/**
 * The replacement function that adds extensions to required modules and resolves paths to packages from node_modules.
 */
async function replacement(m, pre, from) {
  if (checkIfLib(from)) {
    const { path } = await resolveDependency(from, this.path)
    const relativePath = relative(dirname(this.path), path)
    this.deps.push(relativePath)
    const r = `${pre}'./${relativePath}'`
    return r
  }
  const packageJson = `${from}/package.json`
  let RPJ
  try {
    RPJ = require(packageJson)
  } catch (err) {
    err.message = `Could not resolve ${from} (from ${this.path})`
    throw err
  }
  const { 'module': mod, 'main': main } = RPJ
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