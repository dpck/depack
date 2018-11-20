import { join, relative } from 'path'
import { Replaceable } from 'restream'

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
