import { dirname, join, relative, resolve } from 'path'
import { builtinModules } from 'module'
import { read } from '@wrote/wrote'
import mismatch from 'mismatch'
import { checkIfLib, exists } from '../lib'

const RE = /^ *import(?:\s+(?:[^\s,]+)\s*,?)?(?:\s*{(?:[^}]+)})?\s+from\s+(['"])(.+?)\1/gm
const RE2 = /^ *import\s+(?:.+?\s*,\s*)?\*\s+as\s+.+?\s+from\s+(['"])(.+?)\1/gm
const RE3 = /^ *export\s+{(?:[^}]+?)}\s+from\s+(['"])(.+?)\1/gm

export default async (path) => {
  const detected = await detect(path)
  const filtered = detected.filter(({ internal, entry }, i) => {
    if (internal) {
      const fi = detected.findIndex(({ internal: ii }) => {
        return ii == internal
      })
      return fi == i
    }
    const ei = detected.findIndex(({ entry: e }) => {
      return entry == e
    })
    return ei == i
  })
  const f = filtered.map((ff) => {
    const { entry, internal } = ff
    const froms = detected
      .filter(({ entry: e, internal: i }) => {
        if (internal) return internal == i
        if (entry) return entry == e
      })
      .map(({ from }) => from)
      .filter((el, i, a) => a.indexOf(el) == i)
    const newF = { ...ff, from: froms }
    return newF
  })
  return f
}

/**
 * Detects the imports.
 * @param {string} path
 * @param {Object} cache
 * @returns {Array<Detection>}
 */
export const detect = async (path, cache = {}) => {
  if (path in cache) return []
  cache[path] = 1
  const source = await read(path)
  const matches = getMatches(source)
  const requireMatches = getRequireMatches(source)
  const allMatches = [...matches, ...requireMatches]

  const deps = await calculateDependencies(path, allMatches)
  const d = deps.map(o => ({ ...o, from: path }))
  const entries = deps
    .filter(({ entry }) => entry && !(entry in cache))
  const discovered = await entries
    .reduce(async (acc, { entry, hasMain }) => {
      const accRes = await acc
      const res = await detect(entry, cache)
      const r = res
        .map(o => ({
          ...o,
          from: o.from ? o.from : entry,
          ...(!o.packageJson && hasMain ? { hasMain } : {}),
        }))
      return [...accRes, ...r]
    }, d)
  return discovered
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
    if (isLib) { // e.g., ./lib is a package
      const entry = await getLibRequire(path, name)
      const e = await exists(entry)
      if (e) return { entry }
    }
    const {
      entry, packageJson, version, packageName, hasMain,
    } = await findPackageJson(dir, name)
    return { entry, packageJson, version, name: packageName, ...(hasMain ? { hasMain } : {}) }
  })
  return await Promise.all(proms)
}

/**
 * Returns the path of a library file (`./lib`) that can be required by Node.js.
 * @param {string} source The path where the module was required.
 * @param {string} mod The name of the required module.
 */
export const getLibRequire = async (source, mod) => {
  let d = join(dirname(source), mod)
  if (mod.endsWith('/')) {
    d = join(d, 'index.js')
  } else {
    const stat = await exists(d)
    if (!stat) {
      d = `${d}.js`
    } else if (stat.isDirectory()) {
      d = join(d, 'index.js')
    }
  }
  return d
}

/**
 * Returns the names of the modules imported with `import` statements.
 */
export const getMatches = (source) => {
  const r = mismatch(RE, source, ['q', 'from'])
  const r2 = mismatch(RE2, source, ['q', 'from'])
  const r3 = mismatch(RE3, source, ['q', 'from'])
  const res = [...r, ...r2, ...r3].map(({ from }) => from)
  return res
}

export const getRequireMatches = (source) => {
  const m = mismatch(/(?:^|\s+)require\((['"])(.+?)\1\)/gm, source, ['q', 'from'])
  const res = m.map(({ from }) => from)
  return res
}

/**
 * Finds the location of the `package.json` for the given dependency in the directory, and its module file.
 * @param {string} dir The path to the directory.
 */
export const findPackageJson = async (dir, name) => {
  const fold = join(dir, 'node_modules', name)
  const path = join(fold, 'package.json')
  const e = await exists(path)
  if (e) {
    const res = await findEntry(path)
    if (res === undefined)
      throw new Error(`The package ${relative('', path)} does export the module.`)
    else if (res === null)
      throw new Error(`The exported module in package ${name} does not exist.`)
    const { entry, version, packageName, main } = res
    return {
      entry: relative('', entry), packageJson: relative('', path), version, packageName, ...(main ? { hasMain: true } : {}),
    }
  }
  if (dir == '/' && !e)
    throw new Error(`Package.json for module ${name} not found.`)
  return findPackageJson(join(resolve(dir), '..'), name)
}

/** Finds the path to the entry based on package.json file. */
export const findEntry = async (path) => {
  const f = await read(path)
  let mod, version, packageName, main
  try {
    ({ module: mod, version, name: packageName, main } = JSON.parse(f))
  } catch (err) {
    throw new Error(`Could not parse ${path}.`)
  }
  const resolved = mod || main
  if (!resolved) return undefined
  let entry = join(dirname(path), resolved)
  const stat = await exists(entry)
  if (!stat) return null
  if (stat.isDirectory()) {
    const tt = join(entry, 'index.js')
    const e2 = await exists(tt)
    if (!e2) return null
    entry = tt
  }
  return { entry, version, packageName, main: !mod && main }
}

/**
 * @typedef {Object} Detection
 * @prop {string} entry The JS file to be required.
 * @prop {string} from In which file it was required.
 * @prop {string} packageJson The package.json file path.
 * @prop {string} name The name of the package.
 * @prop {boolean} internal Whether it is an internal module.
 * @prop {boolean} hasMain Whether the package exports the `main` and not the `module`.
 */