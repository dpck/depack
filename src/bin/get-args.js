import argufy from 'argufy'

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

export { src as _src, analyze as _analyze, output as _output }