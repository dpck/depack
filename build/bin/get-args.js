let argufy = require('argufy'); if (argufy && argufy.__esModule) argufy = argufy.default;

const args = argufy({
  src: { command: true },
  analyze: { short: 'a', boolean: true },
  output: { short: 'o' },
})

/**
 * The source to build.
 * @type {string}
 */
const src = args.src
/**
 * Whether to only print package dependencies tree.
 * @type {boolean}
 */
const analyze = args.analyze
/**
 * The path where to save the built file.
 * @type {string}
 */
const output = args.output



module.exports._src = src
module.exports._analyze = analyze
module.exports._output = output