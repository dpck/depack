import loading from 'indicatrix'
import compile from '../../lib/compile'

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

export default Compile