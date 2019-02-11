/**
 * Gets the wrapper to for the output to enable requiring Node.js modules.
 * @param {Array<string>} internals The list of internal modules used in the program.
 * @example
 * const fs = require('fs');
 * const _module = require('module');
 */
export const getWrapper = (internals) => {
  if (!internals.length) return
  const wrapper = internals
    .map(i => {
      const m = i == 'module' ? '_module' : i
      return `const ${m} = r` + `equire('${i}');` // prevent
    })
    .join('\n') + '\n%output%'
  return `#!/usr/bin/env node\n${wrapper}`
}
