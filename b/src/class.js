import Stream, {
  Transform,
} from 'stream'
import { join } from 'path'

export default class S extends Transform {
  /**
   * Creates a new instance.
   * @param {string} path
   * @param {Stream} [parent]
   */
  constructor(path, parent) {
    super()
    this.source = join('example', path)
    if (parent instanceof Stream)
      this.pipe(parent)
  }
}

/**
 * A function that returns `c`.
 * @param {string} input
 */
export const c = (input = '') => {
  return 'c' + input ? `-${input}` : ''
}

/**
 * A function that returns `b`.
 * @param {number} times
 */
export const b = (times = 0) => {
  return 'b' + times ? `-${times}` : ''
}