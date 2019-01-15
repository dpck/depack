import { c } from 'erte'
import { join, relative, dirname } from 'path'
import { ensurePath, write, read } from '@wrote/wrote'
import { exists } from './lib'

/**
 * Create an error with color.
 * @param {number} exitCode
 * @param {string} se The output of the compiler.
 */
export const makeError = (exitCode, se) => {
  let end = 0
  const warnings = se.replace(/^.+?:\d+:(?:\nOriginally at:\n.+)? WARNING - .+\n.+\n.+\n/gm, (m, i) => {
    end = i + m.length
    return m
  })
  const errors = warnings.slice(end)
  const e = c(errors, 'red')
  const w = c(warnings.slice(0, end), 'grey')
  const er = `Exit code ${exitCode}\n${w}${e}`
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
    await write(packageJson, JSON.stringify({ name, module: 'index.js', depack: VER }))
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
    const { depack } = JSON.parse(testPackage)
    return depack
  } catch (err) { /* */ }
}
