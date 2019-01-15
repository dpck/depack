import argufy from 'argufy'

const args = argufy({
  'src': { command: true },
  'advanced': { short: 'a', boolean: true },
  'output': { short: 'o' },
  'compile': { short: 'c', boolean: true },
  'version': { short: 'v', boolean: true },
  'no-warnings': { short: 'w', boolean: true },
  'level': { short: 'l' },
  'language_in': { short: 'I' },
  'language_out': { short: 'O' },
  'node': { short: 'n', boolean: true },
  'temp': { },
  'no-strict': { short: 's', boolean: true },
})

/**
 * The source to build.
 * @type {string}
 */
const src = args['src']
/**
 * Whether to remove the `'use strict'` from the output.
 * @type {boolean}
 */
const _noStrict = args['no-strict']
/**
 * The path to the temp directory that will be created to make bundles.
 * @type {string}
 */
const _temp = args['temp']
/**
 * Sets `module_resolution` to `NODE`.
 * @type {string}
 */
const _node = args['node']
/**
 * Sets the language spec to which input sources should conform.
 * @type {string}
 */
const _language_in = args['language_in']
/**
 * Sets the language spec to which output should conform.
 * @type {string}
 */
const _language_out = args['language_out']
/**
 * The compilation level.
 * @type {string}
 */
const _level = args['level']
/**
 * Any additional arguments.
 * @type {Array<string>}
 */
const _argv = args['_argv']
/**
 * Run the compiler with the manually passed arguments
 * @type {boolean}
 */
const _compile = args['compile']
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
 * Whether to enable advanced optimisation.
 * @type {boolean}
 */
const _advanced = args['advanced']
/**
 * The path where to save the built file.
 * @type {string}
 */
const output = args['output']

export { src as _src, _advanced, output as _output,
  version as _version, _externs, _noWarnings, _compile, _argv, _level,
  _language_in, _language_out, _node, _temp, _noStrict,
}