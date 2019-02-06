import { Replaceable } from 'restream'
import { relative, dirname } from 'path'
import resolveDependency from 'resolve-dependency'
import { checkIfLib } from './lib'

export default class BundleTransform extends Replaceable {
  /**
   * @param {string} path Path to the file.
   * @param {string} to Where the file will be saved.
   */
  constructor(path, to) {
    super()
    this.rules = [
      {
        re: /^( *import(?:\s+[^\s,]+\s*,?)?(?:\s*{(?:[^}]+)})?\s+from\s+)['"](.+)['"]/gm,
        replacement: this.replacement.bind(this),
      },
    ]
    this._nodeModules = []
    this._deps = []
    this.path = path
    this.to = to
  }
  /**
   * The paths to node_modules in the file.
   */
  get nodeModules() {
    return this._nodeModules
  }
  /**
   * The paths to dependencies.
   */
  get deps() {
    return this._deps
  }
  /**
   * The replacement function that adds extensions to required modules and resolves paths to packages from node_modules.
   */
  async replacement(m, pre, from) {
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
}