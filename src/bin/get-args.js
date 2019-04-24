import argufy from 'argufy'

export const argsConfig = {
  'source': {
    description: 'The source entry to build.',
    command: true,
  },
  'output': {
    description: 'Where to save the output.\nPrints to `stdout` when not passed.',
    short: 'o',
  },
  'compile': {
    description: 'Set the _Depack_ mode to "compile" to create a Node.JS binray.',
    boolean: true,
    short: 'c',
  },
  'preact': {
    description: 'Add the `import { h } from "preact"` to JSX files automatically.',
    boolean: true,
    short: 'H',
  },
  'temp': {
    description: 'The path to the temp directory used to pre-transpile JSX files.',
    default: 'depack-temp',
  },
  'library': {
    description: 'Set the _Depack_ mode to "library" to create a Node.JS library.',
    boolean: true,
    short: 'l',
  },
  'iife': {
    description: 'Add the IIFE flag to prevent global conflicts\n(OK Google prevent world conflict).',
    boolean: true,
    short: 'i',
  },
  'debug': {
    description: 'The location of the file where to save sources after\neach pass.',
    short: 'd',
  },
  'pretty-print': {
    description: 'Whether to apply the `--formatting=PRETTY_PRINT` flag.',
    boolean: true,
    short: 'p',
  },
  'no-sourcemap': {
    description: 'Disable source maps.',
    boolean: true,
    short: 'S',
  },
  'no-strict': {
    description: 'Whether to remove the `"use strict"` from the output.',
    boolean: true,
    short: 's',
  },
  'verbose': {
    description: 'Print the exact command.',
    boolean: true,
    short: 'V',
  },
  'language_in': {
    description: 'The language of the input sources, years also accepted.',
    short: 'I',
  },
  'language_out': {
    description: 'The language spec of the output, years accepted.',
    short: 'O',
  },
  'level': {
    description: 'The compilation level. Options:\nBUNDLE, WHITESPACE_ONLY, SIMPLE (default), ADVANCED.',
    short: 'lvl',
  },
  'advanced': {
    description: 'Whether to enable advanced optimisation.',
    boolean: true,
    short: 'a',
  },
  'no-warnings': {
    description: 'Do not print compiler\'s warnings by adding the\n`--warning_level QUIET` flag.',
    boolean: true,
    short: 'w',
  },
  'version': {
    description: 'Shows the current _Depack_ and _GCC_ versions.',
    boolean: true,
    short: 'v',
  },
  'help': {
    description: 'Prints the usage information.',
    boolean: true,
    short: 'h',
  },
}
const args = argufy(argsConfig)

/**
 * The source entry to build.
 */
export const _source = /** @type {string} */ (args['source'])

/**
 * Where to save the output.
    Prints to `stdout` when not passed.
 */
export const _output = /** @type {string} */ (args['output'])

/**
 * Set the _Depack_ mode to "compile" to create a Node.JS binray.
 */
export const _compile = /** @type {boolean} */ (args['compile'])

/**
 * Add the `import { h } from "preact"` to JSX files automatically.
 */
export const _preact = /** @type {boolean} */ (args['preact'])

/**
 * The path to the temp directory used to pre-transpile JSX files. Default `depack-temp`.
 */
export const _temp = /** @type {string} */ (args['temp']) || 'depack-temp'

/**
 * Set the _Depack_ mode to "library" to create a Node.JS library.
 */
export const _library = /** @type {boolean} */ (args['library'])

/**
 * Add the IIFE flag to prevent global conflicts
    (OK Google prevent world conflict).
 */
export const _iife = /** @type {boolean} */ (args['iife'])

/**
 * The location of the file where to save sources after
    each pass.
 */
export const _debug = /** @type {string} */ (args['debug'])

/**
 * Whether to apply the `--formatting=PRETTY_PRINT` flag.
 */
export const _prettyPrint = /** @type {boolean} */ (args['pretty-print'])

/**
 * Disable source maps.
 */
export const _noSourcemap = /** @type {boolean} */ (args['no-sourcemap'])

/**
 * Whether to remove the `"use strict"` from the output.
 */
export const _noStrict = /** @type {boolean} */ (args['no-strict'])

/**
 * Print the exact command.
 */
export const _verbose = /** @type {boolean} */ (args['verbose'])

/**
 * The language of the input sources, years also accepted.
 */
export const _language_in = /** @type {string} */ (args['language_in'])

/**
 * The language spec of the output, years accepted.
 */
export const _language_out = /** @type {string} */ (args['language_out'])

/**
 * The compilation level. Options:
    BUNDLE, WHITESPACE_ONLY, SIMPLE (default), ADVANCED.
 */
export const _level = /** @type {string} */ (args['level'])

/**
 * Whether to enable advanced optimisation.
 */
export const _advanced = /** @type {boolean} */ (args['advanced'])

/**
 * Do not print compiler's warnings by adding the
    `--warning_level QUIET` flag.
 */
export const _noWarnings = /** @type {boolean} */ (args['no-warnings'])

/**
 * Shows the current _Depack_ and _GCC_ versions.
 */
export const _version = /** @type {boolean} */ (args['version'])

/**
 * Prints the usage information.
 */
export const _help = /** @type {boolean} */ (args['help'])

/**
 * The additional arguments passed to the program.
 */
export const _argv = /** @type {!Array<string>} */ (args._argv)