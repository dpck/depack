import argufy from 'argufy'

const args = argufy({
  'src': { command: true },
  'analyze': { short: 'a', boolean: true },
  'output': { short: 'o' },
  'version': { short: 'v', boolean: true },
  'externs': { short: 'e' },
  'no-warnings': { short: 'w', boolean: true },
})

/**
 * The source to build.
 * @type {string}
 */
const src = args['src']
/**
 * Do not print compiler's warnings.
 * @type {boolean}
 */
const _noWarnings = args['no-warnings']
/**
 * The comma-separated list of extern paths.
 * @type {string}
 */
const _externs = args['externs'] || ''
/**
 * The version.
 * @type {boolean}
 */
const version = args['version']
/**
 * Whether to only print package dependencies tree.
 * @type {boolean}
 */
const analyze = args['analyze']
/**
 * The path where to save the built file.
 * @type {string}
 */
const output = args['output']

export { src as _src, analyze as _analyze, output as _output,
  version as _version, _externs, _noWarnings,
}