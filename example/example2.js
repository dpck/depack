/* yarn example/ */
import { Readable } from 'stream'
import { collect } from 'catchment'
import { Replaceable } from 'restream'

(async () => {
  const rs = new Readable({
    read() {
      this.push('ok')
      this.push(null)
    },
  })
  const rule = {
    re: /ok/g,
    replacement() {
      this.brake()
      return 'OK'
    },
  }
  const rp = new Replaceable([
    rule,
  ])
  rs.pipe(rp)
  const res = await collect(rp, {
    example: true,
  })
  console.log(res)
})()