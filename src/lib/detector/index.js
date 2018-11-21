import { builtinModules } from 'module'
import { dirname } from 'path'
import { findPackageJson, getMatches } from './lib'
import { checkIfLib, getLibRequire } from '..'
import read from '@wrote/read'

/**
 * Finds all imports and requires in the source file, and returns an array with resolved dependencies.
 * @returns {Array<Promise<{name: string, internal: boolean, packageJson?: string, entry?: string}>}
 */
const detect = async (path) => {
  const source = await read(path)
  const matches = getMatches(source)
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
  const res = await Promise.all(proms)
  return res
}

export default detect