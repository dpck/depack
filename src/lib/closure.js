import { c } from 'erte'

/**
 * Create an error with color.
 */
export const makeError = (exitCode, se) => {
  const [command, ...rest] = se.split('\n').filter(a => a)
  const rr = rest.map(s => c(s.trim(), 'red')).join('\n')
  const cc = c(command, 'grey')
  const er = `Exit code ${exitCode}\n${cc}\n${rr}`
  return er
}