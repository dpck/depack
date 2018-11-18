/* yarn example/ */
const { collect } = require('../closure/2.js');
const { Readable } = nodeRequire('stream');

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