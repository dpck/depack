import { c } from 'erte'
import { join, relative, dirname } from 'path'
import { ensurePath, write, read, exists } from '@wrote/wrote'

/**
 * Create an error with color.
 * @param {number} exitCode
 * @param {string} se The output of the compiler.
 */
export const makeError = (exitCode, se) => {
  const r = se.split('\n\n')
  const s = r.map((t) => {
    const warn = /^.+?:\d+:(?:\s*Originally at:\s*.+?)? WARNING -/.test(t)
    if (warn) return c(t, 'grey')
    return c(t, 'red')
  }).join('\n\n')

  const er = `Exit code ${exitCode}\n${s}`
  return er
}

const [VER] = process.version.split('.', 1)

/**
 * Creates mocks in the `node_module` folder to serve as externs. It is not possible to serve proxies not from `node_modules` path because Closure does not understand it.
 * @param {Array<string>} internals The names of the core modules to prepare.
 * @param {string} nodeModulesPath The path to the node_modules folder in which to put the core mocks.
 * @param {string?} corePath The path where the mocks are stored.
 * @todo Add an option to dynamically evaluate the content of the mock.
 */
export const prepareCoreModules = async ({
  internals, nodeModulesPath = 'node_modules', force = true,
}) => {
  const corePath = relative('', join(dirname(require.resolve('depack/package.json')), 'builtin-modules', VER))
  const r = await Promise.all(internals.map(async (name) => {
    const path = join(nodeModulesPath, name)
    const packageJson = join(path, 'package.json')
    const index = join(path, 'index.js')
    const ret = { packageJson, index }

    const e = await exists(packageJson)
    if (e && !force) {
      const depackExist = await testDepack(packageJson)
      if (depackExist && depackExist == VER) return ret
      else
        throw new Error(`Could not prepare core module ${name}: ${path} exists.`)
    }
    await ensurePath(packageJson)
    await write(packageJson, JSON.stringify({
      'name': name, 'module': 'index.js', 'depack': VER,
    }))
    const core = await read(join(corePath, `${name}.js`))
    await write(index, core)
    return ret
  }))
  return r.reduce((acc, { packageJson, index }) => {
    return [...acc, packageJson, index]
  }, [])
}

/**
 * Check whether the package has the depack property meaning it is a mock and was created by `prepareCoreModules` earlier. Returns the version of Node when the core package was simulated in `node_modules`.
 */
const testDepack = async (packageJson) => {
  try {
    const testPackage = await read(packageJson)
    const { 'depack': depack } = JSON.parse(testPackage)
    return depack
  } catch (err) { /* */ }
}

/**
 * Update dependencies' package.json files to point to a file and not a directory. * https://github.com/google/closure-compiler/issues/3149
 * @param {Array<string>} commonJS The paths to CommonJS package.json files.
 * @param {Array<string>} modules The paths to package.json files.
 */
export const fixDependencies = async (commonJS, modules) => {
  const all = [...commonJS, ...modules]
  await Promise.all(all.map(async (dep) => {
    const f = await read(dep)
    const p = JSON.parse(f)
    const { 'main': main, 'module': mod } = p
    const isModule = !!mod
    const field = isModule ? 'module' : 'main'
    const M = mod || main
    const j = join(dirname(dep), M)
    const e = await exists(j)
    if (!e) throw new Error(`The ${field} for dependency ${dep} does not exist.`)
    if (e.isDirectory()) {
      const newM = join(M, 'index.js')
      p[field] = newM
      console.warn('Updating %s to point to a file.', dep)
      await write(dep, JSON.stringify(p, null, 2))
    }
  }))
}