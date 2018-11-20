import { builtinModules } from 'module'
import whichStream from 'which-stream'
import { createReadStream, lstat } from 'fs'
import { relative, join, dirname } from 'path'
import { c } from 'erte'
import makePromise from 'makepromise'
import erotic from 'erotic'
import { SerialAsyncReplaceable } from 'restream'

let i = 0
const getId = () => {
  i++
  return i
}

const REQUIRE_RE = /(?:^|=)(\s*)require\(.(.+?).\)/gm
/**
 * Read the file and find all dependencies inside of it.
 */
const transform = async (source, destDir, options = {}) => {
  const {
    cache = {}, level = 0, callback = logCallback,
  } = options
  const rules = [
    {
      re: REQUIRE_RE,
      /**
       * @param
       * @param
       * @param
       * @param
       * @param {string} text
       */
      async replacement(match, ws, modName, pos, text) {
        const errCallback = (message) => {
          const tt = text.slice(0, pos)
          const n = tt.split('\n').length
          console.warn('[!] %s, %s:%s', message, relative('', source), n)
        }

        const res = await this.addItem(async () => {
          return await extractDep({
            modName, source, cache, level, callback, errCallback,
            async transformNext(path) {
              return await transform(path, destDir, { callback, cache, level: level + 1 })
            },
          })
        })
        return res ? `=${ws}${res}` : match
      },
    },
    {
      re: /^(\/\/# sourceMappingURL=)(.+)/gm,
      replacement(m, r, path) {
        const pp = join(dirname(source), path)
        return `${r}${pp}`
      },
    },
  ]
  return await proc(rules, source, destDir)
}

const proc = async (rules, source, dest) => {
  const cb = erotic()
  const readable = new SerialAsyncReplaceable(rules)
  const rs = createReadStream(source)
  rs.pipe(readable)
  const id = getId()
  const filename = `${id}.js`
  if (dest) {
    const destination = join(dest, filename)
    rs.on('error', readable.emit.bind(readable))
    await whichStream({
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

/**
 * The function that will extract dependencies from a file and replace the require keyword.
 */
async function extractDep({
  modName, callback, source, level, errCallback, cache, transformNext,
}) {
  const internal = builtinModules.includes(modName)
  if (internal) {
    const extern = `DEPACK$${modName}`
    callback({ source, modName, internal, level, extern })
    return extern
  }
  const isLib = /^[./]/.test(modName)
  let path
  if (isLib) {
    path = await getLibRequire(source, modName)
  } else {
    try {
      path = require.resolve(modName)
    } catch ({ message }) {
      errCallback(message)
      return
    }
  }
  const cached = cache[path]
  callback({ source, modName, path, external: !isLib, cached, level })

  if (!cached) cache[path] = transformNext(path)

  const filename = await cache[path]

  return `require('./${filename}')`
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