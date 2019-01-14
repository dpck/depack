import { makeTestSuite } from 'zoroaster'
import TempContext from 'temp-context'
import { generateTemp } from '../../src'

const ts = makeTestSuite('test/result/temp.md', {
  context: TempContext,
  /**
   * @param {string} input
   * @param {TempContext} context
   */
  async getResults(input, { TEMP, snapshot }) {
    await generateTemp(input, {
      tempDir: TEMP,
    })
    return await snapshot()
  },
})

export default ts