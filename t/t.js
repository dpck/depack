import { Readable } from 'stream'
import test, { test2 } from 'abc'
import { Replaceable } from 'restream'

(async () => {
  const r = new Readable({
    read() {
      this.push(test())
      this.push(test2)
      this.push(null)
    },
  })
  const rs = new Replaceable({
    re: /test/i,
    replacement() {
      return '--tset--'
    },
  })
  r.pipe(rs).pipe(process.stdout)
  rs.on('end', () => console.log())
})()