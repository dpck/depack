import { builtinModules } from 'module'
import { dirname } from 'path'
import { findPackageJson, getMatches, getRequireMatches } from './lib'
import { checkIfLib, getLibRequire } from '..'
import read from '@wrote/read'

/**
 * Finds all imports and requires in the source file, and returns an array with resolved dependencies.
 */
export const detect = async (path, cache = {}) => {
  if (path in cache) return
  const source = await read(path)
  const matches = getMatches(source)
  const requireMatches = getRequireMatches(source)

  const isES6 = !!matches.length
  const m = [...matches, ...requireMatches]

  const deps = await calculateDependencies(path, m)
  deps.isES6 = isES6
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

export default async function recursiveDetect(path, _cache = {}, _parents = []) {
  try {
    const dependencies = await detect(path, _cache)
    if (!dependencies) {
      // console.log('%s is in cache', path)
      return []
    }
    else _cache[path] = dependencies.isES6
    const files = dependencies.filter(({ entry }) => entry).map(({ entry }) => entry)
    const p = files.map(f => recursiveDetect(f, _cache, [..._parents, path]))
    const pp = (await Promise.all(p))
      .reduce((acc, current) => [...acc, ...current], [])

    const res = [...pp, ...dependencies]
    res.cache = _cache
    return res
    // return [...res, ...pp]
  } catch (err) {
    if (err.code != 'ENOENT') throw err
    const msg = `[ENOENT] Could not load ${path} from ${_parents.join(' > ')}`
    throw new Error(msg)
  }
}


// the detector returns whether the file is a JS module