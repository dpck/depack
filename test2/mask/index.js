import { makeTestSuite } from 'zoroaster'
import Context from '../context'
// import depack from '../../src'

const ts = makeTestSuite('test/result', {
  async getResults(input) {
    const res = await depack({
      text: input,
    })
    return res
  },
  context: Context,
})

// export default ts