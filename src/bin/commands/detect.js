import loading from 'indicatrix'
import { join } from 'path'
import runClosure from '../../lib/closure'
import detect from '../../lib/detector'
import ensurePath from '@wrote/ensure-path'
import write from '@wrote/write'

const Detect = async (src, path) => {
  const detected = await detect(src)

  const dependencies = detected
    .filter(({ packageJson }) => packageJson)
    .map(({ packageJson }) => packageJson)
  const modules = [...detected]
    .filter(({ entry }) => entry)
    .map(({ entry }) => entry)
    .filter(filterDup)
  const internals = detected
    .filter(({ internal }) => internal)
    .map(({ internal }) => internal)
    .filter(filterDup)

  const c = runClosure({
    dependencies,
    internals,
    extraExterns: ['Buffer'],
    modules: [...modules, src],
  })
  const { stdout } = await c // loading('Compiling with Closure', c)
  const requires = internals.map((key) => {
    return `const DEPACK$${key} = require('${key}');`
  }).join('\n')
  const data = `${requires}\n${stdout}`
  console.log(data)
  if (path) {
    await ensurePath(path)
    await write(path, data)
  } else {
    return stdout
  }
}

const filterDup = (item, pos, a) => a.indexOf(item) == pos

export default Detect