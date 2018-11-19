import argufy from 'argufy'

const args = argufy({
  src: { command: true },
  analyze: { short: 'a', boolean: true },
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

export { src, analyze }