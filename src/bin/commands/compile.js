import loading from 'indicatrix'
import spawn from 'spawncommand'
import { detect } from '../../lib/detect'
import { makeError } from '../../lib/closure'
import { getCommand } from '../../lib/lib'

const Compile = async (opts, options) => {
  const { src, noWarnings = false, node } = opts
  const args = [
    ...options,
    ...(node ? ['--module_resolution', 'NODE'] : []),
  ]
  const res = await detect(src)
  const deps = [src]
  console.log(res)
  return
  const Args = [...args, ...deps.reduce((acc, d) => {
    return [...acc, '--js', d]
  }, [])]
  const { promise } = spawn('java', Args)
  const a = getCommand(Args)
  console.log(a)
  const { stdout, stderr, code } = await loading('Running Google Closure Compiler', promise)
  if (code) throw new Error(makeError(code, stderr))
  if (stdout) console.log(stdout)
  if (stderr && !noWarnings) console.warn(stderr)
}

export default Compile