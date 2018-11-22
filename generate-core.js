/**
 * This script will generate the core modules exports needed to proxy interns.
 */
const { builtinModules } = require('module')
const write = require('@wrote/write')
const { join } = require('path')

const [VER] = process.version.split('.', 1)
const DEST = `core-${VER}`

const notPrivate = a => !a.startsWith('_')
const ignore = [
  'v8/',
  'node-inspect/',
]

;(async () => {
  const m = builtinModules.filter(notPrivate)
    .filter(a => !ignore.some(i => a.startsWith(i))).sort()

  await m.reduce(async (acc, name) => {
    await acc
    const mod = require(name)
    const keys = Object.keys(mod).filter(notPrivate).sort()
    const data = temp(name, keys)
    // const data = `// Generated with Node ${process.version}. \n${t}`
    await write(join(DEST, `${name}.js`), data)
    // debugger
  }, {})
})()

const temp = (mod, keys) => {
  return `
export default DEPACK$${mod}
export const {
  ${keys.join(',\n  ')},
} = DEPACK$${mod}`.trim()
}
