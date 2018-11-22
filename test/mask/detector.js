import { makeTestSuite } from 'zoroaster'
import { findPackageJson, getMatches, getRequireMatches } from '../../src/lib/detector/lib'
import { detect } from '../../src/lib/detector'

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

export const GetMatches = makeTestSuite('test/result/get-matches.md', {
  getResults: getMatches,
  jsonProps: ['expected'],
})
export const GetRequireMatches = makeTestSuite('test/result/get-require.md', {
  getResults: getRequireMatches,
  jsonProps: ['expected'],
})

export const Detect = makeTestSuite('test/result/detect.md', {
  async getResults(input) {
    const res = await detect(input)
    delete res.isES6
    return res
  },
  jsonProps: ['expected'],
})