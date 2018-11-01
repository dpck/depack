import { equal, ok } from 'zoroaster/assert'
import Context from '../context'
import depack from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof depack, 'function')
  },
  async 'calls package without error'() {
    await depack()
  },
  async 'gets a link to the fixture'({ FIXTURE }) {
    const res = await depack({
      text: FIXTURE,
    })
    ok(res, FIXTURE)
  },
}

export default T