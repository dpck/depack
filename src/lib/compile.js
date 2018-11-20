import TempContext from 'temp-context'
import ensurePath from '@wrote/ensure-path'
import write from '@wrote/write'
import { join } from 'path'
import transform, { logCallback } from './transform'
import runClosure from './closure'

const makeTempContext = async () => {
  const tc = new TempContext()
  const TEMP = 'closure'
  tc.TEMP = TEMP
  try {
    await tc._destroy()
  } catch (err) { /* */ }
  await tc._init()
  return tc
}

const wrap = (internals, code) => {
  const requires = Object.keys(internals).map((key) => {
    return `const ${internals[key]} = require('${key}');`
  }, []).join('\n')
  return `${requires}
(function(){
${code}})()
`
}

const compile = async (src, path, options = {}) => {
  const { log = false, strict } = options
  const t = await makeTempContext()
  const depsDir = t.resolve('deps')
  await ensurePath(join(depsDir, 't'))

  const internals = {}
  await transform(src, depsDir, {
    callback(info) {
      if (log) logCallback(info)
      if (info.internal) internals[info.modName] = info.extern
    },
  })

  const externs = getExterns(internals)

  const cc = runClosure({ path, depsDir, externs, externsPath: EXTERNS, js: [src] })
  let { stdout, stderr } = await cc

  if (!strict) stdout = stdout.replace(/^'use strict';/, '')
  stdout = wrap(internals, stdout)
  if (stderr) console.warn(stderr)

  if (path) {
    await ensurePath(path)
    await write(path, stdout)
  } else {
    return stdout
  }
}

const EXTERNS = join(__dirname, '../../externs')

const getExterns = (internals) => {
  if('stream' in internals) {
    internals['events'] = 'DEPACK$events'
  }
  return Object.keys(internals)
}

export default compile