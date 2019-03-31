import argufy from 'argufy'

const args = argufy({
  'src': { command: true },
  'advanced': { short: 'a', boolean: true },
  'help': { short: 'h', boolean: true },
  'output': { short: 'o' },
  'compile': { short: 'c', boolean: true },
  'version': { short: 'v', boolean: true },
  'no-warnings': { short: 'w', boolean: true },
  'level': { short: 'l' },
  'language_in': { short: 'I' },
  'iife': { short: 'i', boolean: true },
  'language_out': { short: 'O' },
  'node': { short: 'n', boolean: true },
  'temp': { },
  'just-temp': { short: 'T', boolean: true },
  'no-strict': { short: 's', boolean: true },
  'verbose': { short: 'V', boolean: true },
  'no-sourcemap': { short: 'S', boolean: true },
  'pretty-print': { short: 'p', boolean: true },
  'preact': { short: 'H', boolean: true },
  'debug': { short: 'd' },
})

/**
 * The source to build.
 * @type {string}
 */
export const _src = args['src']
/**
 * Whether to apply `--formatting=PRETTY_PRINT` flag.
 * @type {boolean}
 */
export const _prettyPrint = args['pretty-print']
/**
 * Whether to print help and exit.
 * @type {boolean}
 */
const _help = args['help']
/**
 * Disable source maps.
 * @type {boolean}
 */
export const _noSourceMaps = args['no-sourcemap']
/**
 * Whether to remove the `'use strict'` from the output.
 * @type {boolean}
 */
export const _noStrict = args['no-strict']
/**
 * Print the exact command.
 * @type {boolean}
 */
export const _verbose = args['verbose']
/**
 * The path to the temp directory that will be created to make bundles.
 * @type {string}
 */
export const _temp = args['temp']
/**
 * Sets `module_resolution` to `NODE`.
 * @type {string}
 */
export const _node = args['node']
/**
 * Sets the language spec to which input sources should conform.
 * @type {string}
 */
export const _language_in = args['language_in']
/**
 * Sets the language spec to which output should conform.
 * @type {string}
 */
export const _language_out = args['language_out']
/**
 * The compilation level.
 * @type {string}
 */
export const _level = args['level']
/**
 * Any additional arguments.
 * @type {Array<string>}
 */
export const _argv = args._argv
/**
 * Run the compiler with the manually passed arguments
 * @type {boolean}
 */
export const _compile = args['compile']
/**
 * Do not print compiler's warnings.
 * @type {boolean}
 */
const _noWarnings = args['no-warnings']

/**
 * The version.
 * @type {boolean}
 */
export const _version = args['version']
/**
 * Whether to enable advanced optimisation.
 * @type {boolean}
 */
export const _advanced = args['advanced']
/**
 * The path where to save the built file.
 * @type {string}
 */
export const _output = args['output']
/**
 * Whether to add the Preact's pragma.
 * @type {boolean}
 */
export const _preact = args['preact']
/**
 * Debug by printing each pass to the file
 * @type {boolean}
 */
export const _debug = args['debug']

/**
 * Add the IIFE flag to prevent global conflicts (OK google prevent world conflict)
 * @type {boolean}
 */
export const _iife = args['iife']

/**
 * Only generate the temp directory that would be used as input.
 * @type {boolean}
 */
export const _justTemp = args['just-temp']

export { _noWarnings, _help }