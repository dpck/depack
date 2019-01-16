/* yarn example/ */
import { collect } from 'catchment'
import { Readable } from 'stream'

(async () => {
  const rs = new Readable({
    read() {
      this.push('ok')
      this.push(null)
    },
  })
  const res = await collect(rs, {
    example: true,
  })
  console.log(res)
})()