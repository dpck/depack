/* yarn example/ */
const { collect } = require('catchment');
const { Readable } = require('stream');

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