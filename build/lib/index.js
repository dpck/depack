const { join, relative, dirname } = require('path');
let makePromise = require('makepromise'); if (makePromise && makePromise.__esModule) makePromise = makePromise.default;
const { lstat } = require('fs');

       const NODE_EXTERNS = relative('', join(require.resolve('google-closure-compiler'), '../contrib/nodejs'))
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
       const checkExists = async (path) => {
  try {
    const stat = await makePromise(lstat, path)
    return stat
  } catch (err) {
    return null
  }
}

       const checkIfLib = modName => /^[./]/.test(modName)

/**
 * Returns the path that can be required by Node.js.
 */
       const getLibRequire = async (source, mod) => {
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

module.exports.NODE_EXTERNS = NODE_EXTERNS
module.exports.checkExists = checkExists
module.exports.checkIfLib = checkIfLib
module.exports.getLibRequire = getLibRequire