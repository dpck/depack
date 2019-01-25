import { c } from 'erte'
import { basename, relative } from 'path'
import { write, read } from '@wrote/wrote'

/**
 * Returns the pretty-printed command.
 * @param {Array<string>} args The array with arguments.
 * @param {(string):string} getJs The function to get the location of the js file to print.
 */
export const getCommand = (args, getJs = js => js) => {
  const js = []
  const a = args.join(' ')
    .replace(/--js (\S+)\s*/g, (m, f) => {
      const j = `  --js ${c(getJs(f), 'green')}`
      js.push(j)
      return ''
    })
    .replace(/--externs (\S+)/g, (m, f) => {
      return `\n  --externs ${c(f, 'grey')}`
    })
    .replace(/--js_output_file (\S+)/g, (m, f) => {
      return `\n  --js_output_file ${c(f, 'red')}`
    })
  const jss = js.join('\n')
  return `${a}\n${jss}`
}

export const addSourceMap = async (path) => {
  const name = basename(path)
  const r = await read(path)
  const s = [r, '//' + `# sourceMappingURL=${name}.map`].join('\n')
  await write(path, s)
}

export const removeStrict = async (path) => {
  const r = await read(path)
  const s = r.replace(/^'use strict';/m, ' '.repeat(13))
  await write(path, s)
}

export const updateSourceMaps = async (path, tempDir) => {
  const map = `${path}.map`
  const r = await read(map)
  const j = JSON.parse(r)
  const { 'sources': sources } = j
  const newSources = sources.map(s => {
    if (s.startsWith(' ')) return s
    return `/${relative(tempDir, s)}`
  })
  j['sources'] = newSources
  const jj = JSON.stringify(j, null, 2)
  await write(map, jj)
}

/**
 * Returns whether the dependency is a library from the package.
 * @param {string} modName
 * @example
 * checkIfLib('./lib') // true
 * checkIfLib('preact') // false
 */
export const checkIfLib = modName => /^[./]/.test(modName)