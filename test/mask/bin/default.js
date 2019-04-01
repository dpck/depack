import makeTestSuite from '@zoroaster/mask'
import TempContext from 'temp-context'
import { join } from 'path'
import clearR from 'clearr'
import Context from '../../context'

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
    } catch (err) {}
  }
}

export const compile = makeTestSuite('test/result/compile', {
  context: [Temp, OutputContext],
  fork: {
    module: BIN,
    /**
     * @param {string[]} args
     * @param {TempContext} context
     */
    getArgs(args, { resolve }) {
      return [...args, '-o', resolve('result.js')]
    },
    preprocess(a) {
      const s = clearR(a)
      return s.trim()
    },
  },
  /**
   * @param {string}
   * @param {Temp}
   */
  async getResults(_, { read }){
    return read('result.js')
    // return s.length > 0
  },
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