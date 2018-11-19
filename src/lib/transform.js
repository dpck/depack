import { Replaceable } from 'restream'
import { builtinModules } from 'module'
import whichStream from 'which-stream'
import { createReadStream, lstat } from 'fs'
import { relative, join, dirname } from 'path'
import { c } from 'erte'
import makePromise from 'makepromise'
import erotic from 'erotic'
// import { Transform } from 'stream';

let i = 0
const getId = () => {
  i++
  return i
}

/**
 * Read the file and save it to destination.
 */
const transform = async (source, destDir, {
  cache = {}, level = 0, callback = logCallback,
} = {}) => {
  const cb = erotic()
  const rules = [
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
      async replacement(match, ws, modName, pos, text) {
        const fn = makeFn({
          modName,
          source,
          cache,
          level,
          callback,
          errCallback(message) {
            const tt = text.slice(0, pos)
            const n = tt.split('\n').length
            console.warn('[!] %s, %s:%s', message, relative('', source), n)
          },
          async transformNext(path) {
            return await transform(path, destDir, { callback, cache, level: level + 1 })
          },
        })
        const item = this.addItem(async () => {
          const mod = await fn()
          return mod ? `=${ws}${mod}` : match
        })
        const res = await item
        return res
      },
    },
  ]
  const readable = new SerialReplaceable(rules)
  const rs = createReadStream(source)
  rs.pipe(readable)
  const id = getId()
  const filename = `${id}.js`
  if (destDir) {
    const destination = join(destDir, filename)
    await whichStream({
      source,
      readable,
      destination,
    })
  } else {
    await new Promise((r, j) => {
      rs.on('error', e => {
        cb(e)
        e.enriched = 1
        j(e)
      })
      readable
        .on('error', e => j(e.enriched ? e : cb(e)))
        .on('finish', r)
    })
  }
  return filename
}

class SerialReplaceable extends Replaceable {
  constructor(rules) {
    super()
    this.rules = rules
    this.promise = Promise.resolve()
  }
  addItem(fn) {
    const pp = this['promise'].then(fn)
    // .catch(er => {
    //   this.emit(er)
    // })
    this['promise'] = pp
    return pp
  }
}

export const logCallback = ({ internal, modName, level, cached, path, external }) => {
  const ind = ' '.repeat(level * 2)
  if (internal) {
    return console.log(`%s[${c('node', 'green')}] ${modName}`, ind)
  }
  if (cached) {
    return console.log('%s%s', ind, c(external ? `[deps] ${modName}` : modName, 'grey'))
  }
  const dd = external ? `[${c('deps', 'red')}] ${modName} ${c(relative('', path), 'grey')}` : modName
  console.log('%s%s', ind, dd)
}

const makeFn = ({
  modName,
  source,
  cache,
  transformNext,
  level,
  callback = () => { },
  errCallback = () => { },
}) => {
  const internal = builtinModules.includes(modName)

  async function fn() {
    if (internal) {
      callback({ source, modName, internal, level })
      return modName
    }
    const isLib = /^[./]/.test(modName)
    let path
    if (isLib) {
      path = await getLibRequire(source, modName)
    } else {
      try {
        path = require.resolve(modName)
        // callback({ source, modName, external: false, path, level })
      } catch ({ message }) {
        errCallback(message)
        return
      }
    }
    const cached = cache[path]
    callback({ source, modName, path, external: !isLib, cached, level })

    if (!cached) cache[path] = transformNext(path)

    const filename = await cache[path]

    return `require(./${filename})`
  }
  return fn
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