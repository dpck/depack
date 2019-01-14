import ensurePath from '@wrote/ensure-path'
import write from '@wrote/write'
import read from '@wrote/read'
import { c } from 'erte'
import { join } from 'path'
import { checkExists } from '..'

/**
 * Create an error with color.
 */
export const makeError = (exitCode, se) => {
  const [command, ...rest] = se.split('\n').filter(a => a)
  const rr = rest.map(s => c(s.trim(), 'red')).join('\n')
  const cc = c(command, 'grey')
  const er = `Exit code ${exitCode}\n${cc}\n${rr}`
  return er
}

const [VER] = process.version.split('.', 1)

/**
 * Creates mocks in the `node_module` folder to serve as externs.
 * @param {Array<string>} internals The names of the core modules to prepare.
 * @param {string} nodeModulesPath The path to the node_modules folder in which to put the core mocks.
 * @param {string?} corePath The path where the mocks are stored.
 * @todo Add an option to dynamically evaluate the content of the mock.
 */
export const prepareCoreModules = async ({
  internals, nodeModulesPath,
  corePath = join(__dirname, `../../../core-${VER}`),
}) => {
  const r = await Promise.all(internals.map(async (name) => {
    const path = join(nodeModulesPath, name)
    const packageJson = join(path, 'package.json')
    const index = join(path, 'index.js')
    const ret = { packageJson, index }

    const e = await checkExists(path)
    if (e) {
      const depackExist = await testDepack(packageJson)
      if (depackExist && depackExist == VER) return ret
      else
        throw new Error(`Could not prepare core module ${name}: ${path} exists.`)
    }
    await ensurePath(packageJson)
    await write(packageJson, JSON.stringify({ name, main: 'index.js', depack: VER }))
    const core = await read(join(corePath, `${name}.js`))
    await write(index, core)
    return ret
  }))
  return r.reduce((acc, { packageJson, index }) => {
    acc.packageJsons.push(packageJson)
    acc.entries.push(index)
    return acc
  }, { packageJsons: [], entries: [] })
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

/**
 * Execute the closure compiler.
 */
export const run = async (compiler) => {
  return await new Promise((r, j) => {
    compiler.run((e, so, se) => {
      if (e) {
        const er = makeError(e, se)
        const err = new Error()
        err.stack = er
        return j(err)
      }
      r({ stdout: so, stderr: se })
    })
  })
}