import { join, relative, dirname } from 'path'
import makePromise from 'makepromise'
import { lstat } from 'fs'

export const NODE_EXTERNS = relative('', join(require.resolve('google-closure-compiler'), '../contrib/nodejs'))
// console.log(EXTERNS) // absolute path to the contrib folder which contains externs ClosureCompiler.CONTRIB_PATH

/**
 * @param
 * @param {TempContext} temp
 */
const writeExterns = async (internals, temp) => {
  const externs = Object.keys(internals).map((mod) => {
    const keys = Object.keys(require(mod))
    return `const ${internals[mod]} = {}
    ${keys.map((k) => `${internals[mod]}.${k} = {}`)}`
  }, []).join('\n')
  return await temp.write('externs.js', externs)
}

/**
 * @returns {import('fs').Stats}
 */
export const checkExists = async (path) => {
  try {
    const stat = await makePromise(lstat, path)
    return stat
  } catch (err) {
    return null
  }
}

export const checkIfLib = modName => /^[./]/.test(modName)

/**
 * Returns the path that can be required by Node.js.
 */
export const getLibRequire = async (source, mod) => {
  let d = join(dirname(source), mod)
  if (mod.endsWith('/')) {
    d = join(d, 'index.js')
  } else {
    const stat = await checkExists(d)
    if (!stat) {
      d = `${d}.js`
    } else if (stat.isDirectory()) {
      d = join(d, 'index.js')
    }
  }
  return d
}