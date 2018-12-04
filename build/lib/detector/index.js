const { builtinModules } = require('module');
const { dirname, relative } = require('path');
const { findPackageJson, getMatches, getRequireMatches } = require('./lib');
const { checkIfLib, getLibRequire } = require('..');
let read = require('@wrote/read'); if (read && read.__esModule) read = read.default;

/**
 * Finds all imports and requires in the source file, and returns an array with resolved dependencies.
 */
       const detect = async (path, cache = {}) => {
  if (path in cache) return
  const source = await read(path)
  const matches = getMatches(source)
  const requireMatches = getRequireMatches(source)

  const m = [...matches, ...requireMatches]

  const deps = await calculateDependencies(path, m)
  return deps
}

/**
 * Expands the dependency match to include information include `package.json` and entry paths.
 * @returns {Array<Promise<{internal: boolean, packageJson?: string, entry?: string}>}
 */
const calculateDependencies = async (path, matches) => {
  const dir = dirname(path)
  const proms = matches.map(async (name) => {
    const internal = builtinModules.includes(name)
    if (internal) return { internal: name }
    const isLib = checkIfLib(name)
    if (!isLib) {
      const pack = await findPackageJson(dir, name)
      return pack
    }
    const entry = await getLibRequire(path, name)
    return { entry }
  })
  return await Promise.all(proms)
}

               async function recursiveDetect(path, _cache = {}, _parents = []) {
  try {
    const dependencies = await detect(path, _cache)
    if (!dependencies) {
      return []
    }
    else _cache[path] = dependencies.isES6
    const files = dependencies
      .filter(({ entry }) => entry).map(({ entry }) => entry)
    const pp = await files.reduce(async (acc, f) => {
      const ar = await acc
      if (f in _cache) return ar
      const res = await recursiveDetect(f, _cache, [..._parents, path])
      return [...ar, ...res]
    }, [])

    const res = [...pp, ...dependencies]
    return res
  } catch (err) {
    if (err.code != 'ENOENT') throw err
    const hasParents = _parents.length
    const s = hasParents ? ` from ${_parents.join(' > ')}` : ''
    const msg = `[ENOENT] Could not load ${path}${s}.`
    throw new Error(msg)
  }
}


// the detector returns whether the file is a JS module

module.exports = recursiveDetect
module.exports.detect = detect