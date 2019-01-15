import SnapshotContext from 'snapshot-context'
import Detect, { detect } from '../../../src/lib/detect'

/** @type {Object.<string, (c: SnapshotContext)} */
const TS = {
  context: SnapshotContext,
  async 'detects the matches'({ test, setDir }) {
    setDir('test/snapshot')
    const res = await detect('test/fixture/detect.js')
    await test('detect.json', res)
    // const packages = res.reduce((acc, current) => {
    //   const { internal, version, name } = current
    //   if (internal) return acc
    //   const key = `${name}-${version}`
    //   if (!(key in acc)) acc[key] = []
    //   acc[key].push(current)
    //   return acc
    // }, {})
  },
  async '!filters duplicates'({ test, setDir }) {
    setDir('test/snapshot')
    const res = await Detect('test/fixture/detect.js')
    await test('detect-filtered.json', res)
  },
}

export default TS