import { c } from 'erte'

/**
 * Create an error with color.
 * @param {number} exitCode
 * @param {string} se The output of the compiler.
 */
export const makeError = (exitCode, se) => {
  let end = 0
  const warnings = se.replace(/^.+?:\d+:(?:\nOriginally at:\n.+)? WARNING - .+\n.+\n.+\n/gm, (m, i) => {
    end = i + m.length
    return m
  })
  const errors = warnings.slice(end)
  const e = c(errors, 'red')
  const w = c(warnings.slice(0, end), 'grey')
  const er = `Exit code ${exitCode}\n${w}${e}`
  return er
}