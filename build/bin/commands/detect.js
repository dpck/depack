let loading = require('indicatrix'); if (loading && loading.__esModule) loading = loading.default;
const { join } = require('path');
const runClosure = require('../../lib/closure');
const detect = require('../../lib/detector');
let ensurePath = require('@wrote/ensure-path'); if (ensurePath && ensurePath.__esModule) ensurePath = ensurePath.default;
let write = require('@wrote/write'); if (write && write.__esModule) write = write.default;

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
  if (path) {
    await ensurePath(path)
    await write(path, data)
  } else {
    return stdout
  }
}

const filterDup = (item, pos, a) => a.indexOf(item) == pos

module.exports=Detect