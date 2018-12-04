let read = require('@wrote/read'); if (read && read.__esModule) read = read.default;
const { join, relative, dirname, resolve } = require('path');
const { checkExists } = require('..');
let mismatch = require('mismatch'); if (mismatch && mismatch.__esModule) mismatch = mismatch.default;

const RE = /^ *import(?:\s+(?:[^\s,]+)\s*,?)?(?:\s*{(?:[^}]+)})?\s+from\s+(['"])(.+?)\1/gm
const RE2 = /^ *import\s+(?:.+?\s*,\s*)?\*\s+as\s+.+?\s+from\s+(['"])(.+?)\1/gm

/**
 * Finds the location of the `package.json` for the given dependency in the directory, and the main file.
 */
       const findPackageJson = async (dir, name) => {
  const fold = join(dir, 'node_modules', name)
  const path = join(fold, 'package.json')
  const e = await checkExists(path)
  if (e) {
    const entry = await findEntry(path)
    if (!entry) throw new Error(`The entry for the module ${name} does not exist.`)
    return { entry: relative('', entry), packageJson: relative('', path) }
  }
  if (dir == '/' && !e) throw new Error(`Package.json for module ${name} not found.`)
  return findPackageJson(join(resolve(dir), '..'), name)
}

/** Finds the path to the entry based on package.json file. */
       const findEntry = async (path) => {
  const f = await read(path)
  let main
  try {
    ({ main } = JSON.parse(f))
  } catch (err) {
    throw new Error(`Could not parse ${path}.`)
  }
  const j = join(dirname(path), main)
  const stat = await checkExists(j)
  if (!stat) return null
  if (stat.isDirectory()) {
    const tt = join(j, 'index.js')
    const e2 = await checkExists(tt)
    if (!e2) return null
    return tt
  } else return j
}

/**
 * Returns the names of the modules imported with `import` statements.
 */
       const getMatches = (source) => {
  const r = mismatch(RE, source, ['q', 'from'])
  const r2 = mismatch(RE2, source, ['q', 'from'])
  const res = [...r, ...r2].map(({ from }) => from)
  return res
}

       const getRequireMatches = (source) => {
  const m = mismatch(/(?:^|\s+)require\((['"])(.+?)\1\)/gm, source, ['q', 'from'])
  const res = m.map(({ from }) => from)
  return res
}


module.exports.findPackageJson = findPackageJson
module.exports.findEntry = findEntry
module.exports.getMatches = getMatches
module.exports.getRequireMatches = getRequireMatches