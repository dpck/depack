/* yarn example/ */
// import { Readable } from 'stream'
import Stream, { Readable } from 'abc'
// import cleanStack from '@artdeco/clean-stack'
// const { Readable } = require('stream')
// import { collect } from 'catchment'
// const { collect } = requir1e('catchment')
// import { Replaceable } from 'restream'
// import test from './test2'
// import ex from './example3'

;(async () => {
  console.log(Stream)
  console.log(Readable)
  // const rs = new Readable({
  //   read() {
  //     this.push('ok')
  //     this.push(null)
  //   },
  // })
  // rs.pipe(process.stdout)
  // const rule = {
  //   re: /ok/g,
  //   replacement() {
  //     this.brake()
  //     return 'OK'
  //   },
  // }
  // const rp = new Replaceable([
  //   rule,
  // ])
  // rs.pipe(rp)
  // const res = await collect(rs, {
  //   example: true,
  // })
  // rs.pipe(process.stdout)
  // console.log(res)
})()