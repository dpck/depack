import { builtinModules } from 'module'
import { dirname } from 'path'
import { findPackageJson, getMatches } from './lib'
import read from '@wrote/read'

/**
 * Finds all imports in the file, and returns an array with resolved dependencies.
 * @returns {Array<Promise<{name: string, internal: boolean, packageJson?: string, entry?: string}>}
 */
const detect = async (path) => {
  const source = await read(path)
  const matches = getMatches(source)
  const dir = dirname(path)
  const proms = matches.map(async (name) => {
    const internal = builtinModules.includes(name)
    if (internal) return { name, internal: true }
    const pack = await findPackageJson(dir, name)
    return {
      name,
      ...pack,
    }
  })
  const res = await Promise.all(proms)
  return res
}

export default detect