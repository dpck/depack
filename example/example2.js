/* yarn example/ */
const { Readable } = require('stream');
const { collect } = require('catchment');
const { Replaceable } = require('restream')

(async () => {
  const rs = new Readable({
    read() {
      this.push('ok')
      this.push(null)
    },
  })
  const rule = {}
  rule['re'] = /ok/
  rule['replacement'] = () => 'OK'
  const rp = new Replaceable([
    rule,
  ])
  rs.pipe(rp)
  const res = await collect(rp, {
    example: true,
  })
  console.log(res)
})()