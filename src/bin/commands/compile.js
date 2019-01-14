import loading from 'indicatrix'
import { relative, join } from 'path'
import compiler from 'google-closure-compiler-java'
import spawn from 'spawncommand'
import { makeError } from '../../lib/closure'
import { getCommand } from '../../lib/lib'

const Compile = async (opts) => {
  const {
    src, dest: path, level,
    sourceMap = false, externs = [], languageIn, languageOut,
    noWarnings = false, argv = [], node,
  } = opts
  if (!src) throw new Error('Entry file is not given.')
  const args = [
    '-jar', compiler,
    ...argv,
    ...(level ? ['--compilation_level', level] : []),
    ...(languageIn ? [`--language_in=${languageIn}`] : []),
    ...(languageOut ? [`--language_out=${languageOut}`] : []),
    ...(node ? ['--module_resolution', 'NODE'] : []),
    ...(sourceMap ? [
      '--create_source_map', '%outname%.map',
      '--source_map_include_content',
    ] : []),
    ...externs.reduce((a, e) => [...a, '--externs', e], []),
    ...(path ? ['--js_output_file', path] : []),
  ]
  const deps = [src]
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