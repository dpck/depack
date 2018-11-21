import { makeTestSuite } from 'zoroaster'
import Context from '../context'
// import depack from '../../src'
import { findPackageJson } from '../../src/lib/detector/lib'

const ts = makeTestSuite('test/result', {
  async getResults(input) {
    const res = await depack({
      text: input,
    })
    return res
  },
  context: Context,
})

export const FindPackageJson = makeTestSuite('test/result/find-package.md', {
  async getResults(input) {
    const res = await findPackageJson('test/fixture', input)
    return res
  },
  jsonProps: ['expected'],
  getThrowsConfig(input) {
    return {
      fn: findPackageJson,
      args: ['test/fixture', input],
    }
  },
})

// export default ts