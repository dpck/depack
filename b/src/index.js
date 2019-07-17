/**
 * A function that returns `erte`.
 */
const erte = () => {
  return 'erte'
}

/**
 * A function that returns `c`.
 * @param {string} input
 */
export const c = (input) => {
  return 'c' + (input ? `-${input}` : '')
}

/**
 * A function that returns `b`.
 * @param {number} times
 */
export const b = (times) => {
  return 'b' + (times ? `-${times}` : '')
}

export default erte