import { makeTestSuite } from 'zoroaster'
import TempContext from 'temp-context'
import { join } from 'path'
import Context from '../../context'
import Bundle from '../../../src/bin/commands/bundle'

const { BIN } = Context

class OutputContext extends TempContext {
  constructor() {
    super()
    this._TEMP = join('test', 'temp-output')
  }
}

class Temp extends TempContext {
  async _destroy() {
    try {
      await super._destroy()
    } catch (err) {/**/}
  }
}

const ts = makeTestSuite('test/result/bin.md', {
  context: [Temp, OutputContext],
  fork: {
    module: BIN,
    /**
     * @param {string[]} args
     * @param {TempContext} context
     * @param {OutputContext} context
     */
    getArgs(args, { TEMP }, { TEMP: OUTPUT }) {
      return [...args, '--temp', TEMP, '-o', OUTPUT]
    },
  },
  /**
   * @param {string}
   * @param {Temp}
   * @param {OutputContext} c
   */
  async getResults(_, __, { snapshot }){
    const s = await snapshot()
    return s.length > 0
  },
  jsonProps: 'expected',
})

// export
const bundle = makeTestSuite('test/result/bin/bundle.md', {
  context: [Temp, OutputContext],
  /**
   * @param {string} args
   * @param {Temp} context
   * @param {OutputContext} context
   */
  async getResults(input, { TEMP }, { TEMP: OUTPUT, exists }) {
    await Bundle({
      dest: join(OUTPUT, 'test.js'),
      src: input,
      tempDir: TEMP,
      noWarnings: true,
    })
    const res = await exists('test.js')
    return res
  },
  jsonProps: ['expected'],
})

export default ts