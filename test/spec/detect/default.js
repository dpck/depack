import SnapshotContext from 'snapshot-context'

/** @type {Object.<string, (c: SnapshotContext)} */
const TS = {
  context: SnapshotContext,
  // const packages = res.reduce((acc, current) => {
  //   const { internal, version, name } = current
  //   if (internal) return acc
  //   const key = `${name}-${version}`
  //   if (!(key in acc)) acc[key] = []
  //   acc[key].push(current)
  //   return acc
  // }, {})
}

export default TS