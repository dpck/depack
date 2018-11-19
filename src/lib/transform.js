import { Replaceable } from 'restream'
import { builtinModules } from 'module'
import whichStream from 'which-stream'
import { createReadStream, lstat } from 'fs'
import { relative, join, dirname } from 'path'
import { c } from 'erte'
import makePromise from 'makepromise'

let i = 0
const getId = () => {
  i++
  return i
}

/**
 * Read the file and save it to destination.
 */
const transform = async (source, destDir, cache = {}, level = 0) => {
  const ind = ' '.repeat(level * 2)
  // let l = ''; const log = d => { l+= `${d}\n` }
  // console.log(`${ind}Processing ${relative('', source)}`)
  const deps = []
  const internals = {}
  const r = [
    {
      re: /=(\s+)require\(.(.+?).\)/g,
      // all requires are detected in parallel.
      /**
       * @param
       * @param
       * @param
       * @param
       * @param {string} text
       */
      async replacement(m, ws, mod, pos, text) {
        async function fn() {
          const internal = builtinModules.includes(mod)

          if (internal) {
            console.log(`%s[${c('node', 'green')}] ${mod}`, ind)
            const symb = `DEPACK$${mod}`
            internals[mod] = symb
            return `=${ws}${symb}`
          }
          const isDep = !(mod.startsWith('.') || mod.startsWith('/'))

          let d
          if (isDep) {
            try {
              d = require.resolve(mod)
            } catch ({ message }) {
              const tt = text.slice(0, pos)
              const n = tt.split('\n').length
              console.log('%s, %s:%s', message, relative('', source), n)
              return m
            }
          } else {
            d = await getLibRequire(source, mod)
          }
          const dd = isDep ? `[${c('deps', 'red')}] ${mod} ${c(relative('', d), 'grey')}` : mod
          if (!cache[d]) {
            console.log('%s%s', ind, dd)
            cache[d] = transform(d, destDir, cache, level + 1)
          } else {
            console.log('%s%s', ind, c(isDep ? `[deps] ${mod}` : mod, 'grey'))
          }
          const { file, deps: dependencies, internals: ints } = await cache[d]
          Object.assign(internals, ints)

          deps.push(file, ...dependencies)
          return `=${ws}require('../${file}')`
        }
        this['promise'] = this['promise'].then(fn)
        const res = await this['promise']
        return res
      },
    },
  ]
  const readable = new Replaceable(r)
  readable['promise'] = Promise.resolve()
  createReadStream(source).pipe(readable)
  const id = getId()
  const destination = join(destDir, `${id}.js`)
  await whichStream({
    source,
    readable,
    destination,
  })
  return { file: destination, deps, internals }
}

export default transform


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

export const checkExists = async (path) => {
  try {
    const stat = await makePromise(lstat, path)
    return stat
  } catch (err) {
    return null
  }
}