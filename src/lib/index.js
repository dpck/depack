import { join, relative } from 'path'
import TempContext from 'temp-context'
import loading from 'indicatrix'
import ensurePath from '@wrote/ensure-path'
import transform, { logCallback } from './transform'
import runClosure from './closure'

export const NODE_EXTERNS = relative('', join(require.resolve('google-closure-compiler'), '../contrib/nodejs'))
// console.log(EXTERNS) // absolute path to the contrib folder which contains externs ClosureCompiler.CONTRIB_PATH

const makeContext = async () => {
  const tc = new TempContext()
  const TEMP = 'closure'
  tc.TEMP = TEMP
  try {
    await tc._destroy()
  } catch (err) { /* */ }
  await tc._init()
  return tc
}

const getWrapper = (internals) => {
  const requires = Object.keys(internals).map((key) => {
    return `const ${internals[key]} = require('${key}');`
  }, []).join('\n')
  return `${requires}
(function(){
  %output%
})()
`
}
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

export const compile = async (src, path) => {
  const t = await makeContext()

  const depsDir = t.resolve('deps')
  await ensurePath(join(depsDir, 't'))
  const { internals } = await makeTemp(src, depsDir)
  const wrapper = await getWrapper(internals, t)
  // const externs = await writeExterns(internals, t)

  const cc = runClosure({ path, wrapper, depsDir, externs: internals })

  await loading('Compiling with Closure', cc)
  // await write(path, output)
  console.log('Saved to %s', path)
}

/**
 * Transpile files into the temporary directory starting from the entry file.
 */
const makeTemp = async (src, temp) => {
  console.log('Compiling %s', src)
  return await transform(src, temp)
}
