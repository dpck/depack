import { dirname, join, relative } from 'path'
import { read, write, ensurePath } from '@wrote/wrote'
import transpileJSX from '@a-la/jsx'
import { collect } from 'catchment'
import { c } from 'erte'
import BundleTransform from './BundleTransform'

const processFile = async (entry, config, cache) => {
  const { cachedNodeModules, cachedFiles } = cache
  const { tempDir, preact } = config
  const source = await read(entry)
  const isJSX = entry.endsWith('.jsx')

  const dir = relative('', dirname(entry))
  const to = join(tempDir, dir)
  const bt = new BundleTransform(entry, to)

  const T = preact && isJSX ? `import { h } from 'preact'
${source}` : source
  bt.end(T)
  const transformed = await collect(bt)
  const transpiled = isJSX ? transpileJSX(transformed, {
    quoteProps: 'dom',
    warn(message) {
      console.warn(c(message, 'yellow'))
      console.log(entry)
    },
  }): transformed
  const tto = join(tempDir, entry)
  await ensurePath(tto)

  await write(tto, transpiled)

  // now deal with dependencies
  const depPaths = bt.deps
    .map(d => join(dir, d))
    .filter(d => !(d in cachedFiles))
  const nodeModules = bt.nodeModules
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