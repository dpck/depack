let loading = require('indicatrix'); if (loading && loading.__esModule) loading = loading.default;
const compile = require('../../lib/compile');

const Compile = async (opts) => {
  const { src, dest } = opts
  const c = compile(src, dest, {
    log: true,
  })
  const res = await loading('Compiling with Closure', c, {
    writable: process.stderr,
  })
  if (res) console.log(res)
}

module.exports=Compile