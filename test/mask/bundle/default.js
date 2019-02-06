import { makeTestSuite } from 'zoroaster'
import BundleTransform from '../../../src/lib/BundleTransform'

export const bundleTransform = makeTestSuite('test/result/bundle/BundleTransform.jsx', {
  getTransform() {
    const bt = new BundleTransform('test/fixture/bundle.js', 'temp-test')
    return bt
  },
})