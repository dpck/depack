import loading from 'indicatrix'
import { relative } from 'path'
import { rm } from '@wrote/wrote'
import spawn from 'spawncommand'
import { c } from 'erte'
import { generateTemp } from '../../lib'
import { makeError } from '../../lib/closure'
import { getCommand, addSourceMap, updateSourceMaps } from '../../lib/lib'

/**
 * Bundle the source code.
 * @param {BundleOptions} opts Options for the Bundle Command.
 * @param {string} opts.src The source file to compile.
 * @param {string} opts.dest The output file to write to.
 * @param {string} [opts.level="ADVANCED"] The level of the optimisation. Default `ADVANCED`.
 * @param {string} [opts.tempDir="depack-temp"] The path to the temporary directory. Default `depack-temp`.
 * @param {*} [opts.sourceMap=true] Whether to include source maps. Default `true`.
 * @param {Array<string>} [opts.externs] The externs to compile with.
 * @param {string} [opts.languageIn="ECMASCRIPT_2018"] The language in flag. Default `ECMASCRIPT_2018`.
 * @param {*} [opts.noWarnings=false] Do not print compiler's warnings. Default `false`.
 */
const Bundle = async (opts, options) => {
  const {
    src, tempDir = 'depack-temp',
    noWarnings = false, output: path,
  } = opts
  if (!src) throw new Error('Entry file is not given.')
  if (!path) throw new Error('Destination path is not given.')
  const deps = await generateTemp(src, { tempDir })
  const Args = [...options, ...deps.reduce((acc, d) => {
    return [...acc, '--js', d]
  }, [])]
  const { promise } = spawn('java', Args)
  const a = getCommand(Args, js => js.startsWith(tempDir) ? relative(tempDir, js) : js)
  console.log(a)
  const { stdout, stderr, code } = await loading('Running Google Closure Compiler', promise)
  if (code) throw new Error(makeError(code, stderr))
  await addSourceMap(path)
  await updateSourceMaps(path, tempDir)
  if (stdout) console.log(stdout)
  if (stderr && !noWarnings) console.warn(c(stderr, 'grey'))
  await rm(tempDir)
}

export default Bundle

/* documentary types/bundle.xml */
/**
 * @typedef {Object} BundleOptions Options for the Bundle Command.
 * @prop {string} src The source file to compile.
 * @prop {string} dest The output file to write to.
 * @prop {string} [level="ADVANCED"] The level of the optimisation. Default `ADVANCED`.
 * @prop {string} [tempDir="depack-temp"] The path to the temporary directory. Default `depack-temp`.
 * @prop {*} [sourceMap=true] Whether to include source maps. Default `true`.
 * @prop {Array<string>} [externs] The externs to compile with.
 * @prop {string} [languageIn="ECMASCRIPT_2018"] The language in flag. Default `ECMASCRIPT_2018`.
 * @prop {*} [noWarnings=false] Do not print compiler's warnings. Default `false`.
 */
