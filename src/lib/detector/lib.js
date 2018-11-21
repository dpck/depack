import read from '@wrote/read'
import { join, relative } from 'path'
import { checkExists } from '..'
import mismatch from 'mismatch'

const RE = /^ *import(?:\s+(?:[^\s,]+)\s*,?)?(?:\s*{(?:[^}]+)})?\s+from\s+(['"])(.+?)\1/gm
const RE2 = /^ *import\s+(?:.+?\s*,\s*)?\*\s+as\s+.+?\s+from\s+(['"])(.+?)\1/gm

/**
 * Finds the location of the `package.json` for the given dependency in the directory, and the main file.
 */
export const findPackageJson = async (dir, name) => {
  const fold = join(dir, 'node_modules', name)
  const path = join(fold, 'package.json')
  const e = await checkExists(path)
  if (e) {
    const f = await read(path)
    const { main } = JSON.parse(f)
    const j = join(fold, main)
    const stat = await checkExists(j)
    if (!stat) throw new Error(`The main file for the package ${name} does not exist.`)
    let entry
    if (stat.isDirectory()) {
      const tt = join(j, 'index.js')
      const e2 = await checkExists(tt)
      if (!e2) throw new Error(`The main file ${tt} for module ${name} does not exist.`)
      entry = tt
    } else entry = j
    return { entry: relative('', entry), packageJson: path }
  }
  if (dir == '/' && !e) throw new Error(`Package.json for module ${name} not found.`)
  return findPackageJson(join(dir, '..'), name)
}

/**
 * Returns the names of the modules imported with `import` statements.
 */
export const getMatches = (source) => {
  const r = mismatch(RE, source, ['q', 'from'])
  const r2 = mismatch(RE2, source, ['q', 'from'])
  const res = [...r, ...r2].map(({ from }) => from)
  return res
}