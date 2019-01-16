import SnapshotContext from 'snapshot-context'
import { makeError } from '../../../src/lib/closure'

const error = `node_modules/argufy/src/index.js:2: WARNING - Bad type annotation.
* @param {string[]} argv
^

node_modules/argufy/src/index.js:2: WARNING - Bad type annotation.
* @param {string[]} argv
^

t/argufy.js:3: ERROR - variable src$$module$t$argufy is undeclared
`
/** @type {Object.<string, (c: SnapshotContext)>} */
const TS = {
  context: SnapshotContext,
  async 'parses the warnings'({ setDir, test }) {
    setDir('test/snapshot/error')
    const res = makeError(1, error)
    await test('warning.txt', res)
  },
  async 'parses error with original'({ setDir, test }) {
    setDir('test/snapshot/error')
    const res = makeError(1, `node_modules/preact/dist/preact.mjs:678:
Originally at:
node_modules/preact/src/vdom/component.js:287: WARNING - dangerous use of the global this object
                component.nextBase = base;
                ^^^^

t/argufy.js:3: ERROR - variable src$$module$t$argufy is undeclared`)
    await test('warning-original.txt', res)
  },
}

export default TS