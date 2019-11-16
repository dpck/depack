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

export const argsConfigBundle = {
  'iife': {
    description: 'Add the IIFE flag to prevent name clashes.',
    boolean: true,
    short: 'i',
  },
  'temp': {
    description: 'The path to the temp directory used to transpile JSX files.',
    default: 'depack-temp',
  },
  'preact': {
    description: 'Add the `import { h } from "preact"` to JSX files automatically.\nDoes not process files found in the `node_modules`, because\nthey are not placed in the temp, and must be built separately,\ne.g., with ÀLaMode transpiler.',
    boolean: true,
    short: 'H',
  },
  'external': {
    description: 'The `preact` dependency in `node_modules` will be temporary\nrenamed to `_preact`, and a monkey-patching package that\nimports `＠externs/preact` will take its place. This is to allow\nbundles to import from _Preact_ installed as a script on a webpage,\nbut exclude it from compilation. `preact` will be restored at the end.',
    boolean: true,
    short: 'E',
  },
  'patch': {
    description: 'Patches the `preact` directory like in `external`, and waits for\nuser input to restore it. Useful when linking packages and wanting\nto them from other projects.',
    boolean: true,
    short: 'P',
  },
}
const argsBundle = argufy(argsConfigBundle, [process.argv[0], process.argv[1], ...args._argv])

/**
 * Add the IIFE flag to prevent name clashes.
 */
export const _iife = /** @type {boolean} */ (argsBundle['iife'])

/**
 * The path to the temp directory used to transpile JSX files. Default `depack-temp`.
 */
export const _temp = /** @type {string} */ (argsBundle['temp'] || 'depack-temp')

/**
 * Add the `import { h } from "preact"` to JSX files automatically.
    Does not process files found in the `node_modules`, because
    they are not placed in the temp, and must be built separately,
    e.g., with ÀLaMode transpiler.
 */
export const _preact = /** @type {boolean} */ (argsBundle['preact'])

/**
 * The `preact` dependency in `node_modules` will be temporary
    renamed to `_preact`, and a monkey-patching package that
    imports `＠externs/preact` will take its place. This is to allow
    bundles to import from _Preact_ installed as a script on a webpage,
    but exclude it from compilation. `preact` will be restored at the end.
 */
export const _external = /** @type {boolean} */ (argsBundle['external'])

/**
 * Patches the `preact` directory like in `external`, and waits for
    user input to restore it. Useful when linking packages and wanting
    to them from other projects.
 */
export const _patch = /** @type {boolean} */ (argsBundle['patch'])

export const argsConfigCompile = {
  'compile': {
    description: 'Set the _Depack_ mode to "compile" to create a Node.JS binary.\nAdds the `#!usr/bin/env node` at the top and sets +x permission.',
    boolean: true,
    short: 'c',
  },
  'no-strict': {
    description: 'Whether to remove the `"use strict"` from the output.',
    boolean: true,
    short: 's',
  },
}
const argsCompile = argufy(argsConfigCompile, [process.argv[0], process.argv[1], ...argsBundle._argv])

/**
 * Set the _Depack_ mode to "compile" to create a Node.JS binary.
    Adds the `#!usr/bin/env node` at the top and sets +x permission.
 */
export const _compile = /** @type {boolean} */ (argsCompile['compile'])

/**
 * Whether to remove the `"use strict"` from the output.
 */
export const _noStrict = /** @type {boolean} */ (argsCompile['no-strict'])

/**
 * The additional arguments passed to the program.
 */
export const _argv = /** @type {!Array<string>} */ (argsCompile._argv)