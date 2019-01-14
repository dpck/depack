import { equal } from 'zoroaster'
import { makeError } from '../../src/lib/closure'

const error = `
node_modules/argufy/src/index.js:2: WARNING - Bad type annotation.
* @param {string[]} argv
^
node_modules/argufy/src/index.js:2: WARNING - Bad type annotation.
* @param {string[]} argv
^
t/argufy.js:3: ERROR - variable src$$module$t$argufy is undeclared
`

const TS = {
  'parses the warnings'() {
    const res = makeError(1, error)
    equal(res, `Exit code 1
[90m
node_modules/argufy/src/index.js:2: WARNING - Bad type annotation.
* @param {string[]} argv
^
node_modules/argufy/src/index.js:2: WARNING - Bad type annotation.
* @param {string[]} argv
^
[0m[31mt/argufy.js:3: ERROR - variable src$$module$t$argufy is undeclared
[0m`)
  },
  'parses error with original'() {
    const res = makeError(1, `node_modules/preact/dist/preact.mjs:678:
Originally at:
node_modules/preact/src/vdom/component.js:287: WARNING - dangerous use of the global this object
                component.nextBase = base;
                ^^^^
t/argufy.js:3: ERROR - variable src$$module$t$argufy is undeclared`)
    equal(res, `Exit code 1
[90mnode_modules/preact/dist/preact.mjs:678:
Originally at:
node_modules/preact/src/vdom/component.js:287: WARNING - dangerous use of the global this object
                component.nextBase = base;
                ^^^^
[0m[31mt/argufy.js:3: ERROR - variable src$$module$t$argufy is undeclared[0m`)
  },
}

export default TS