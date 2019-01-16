/**
 * This script will generate the core built-in modules exports needed to proxy interns.
 */
import { builtinModules } from 'module'
import { write, ensurePath } from '@wrote/wrote'
import { join } from 'path'

const [VER] = process.version.split('.', 1)
const DEST = `builtin-modules/${VER}`

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
    const main = join(DEST, `${name}.js`)
    // const packageJson = join(DEST, `${name}/package.json`)
    // const pac = {
    //   name,
    //   module: 'index.js',
    // }
    await ensurePath(main)
    await write(main, data)
    // await write(packageJson, JSON.stringify(pac, null, 2))
  }, {})
})()

const temp = (mod, keys) => {
  const m = mod != 'module' ? mod : `_${mod}`
  return `
export default ${m}
export const {
  ${keys
    .map(k => `'${k}': ${k}`)
    .join(',\n  ')},
} = ${m}`.trim()
}
