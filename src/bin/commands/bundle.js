import { rm } from '@wrote/wrote'
import generateTemp from '@depack/bundle'
import { relative } from 'path'
import { getCommand, updateSourceMaps } from '../../lib/lib'
import run from '../run'

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
    output, preact, compilerVersion, debug, suppressLoading, noSourceMap,
  } = opts
  if (!src) throw new Error('Entry file is not given.')

  const deps = await generateTemp(src, { tempDir, preact })
  const Args = [
    ...options,
    '--source_map_include_content',
    '--module_resolution', 'NODE',
    ...deps.reduce((acc, d) => {
      return [...acc, '--js', d]
    }, [])]
  const a = getCommand(Args, js => js.startsWith(tempDir) ? relative(tempDir, js) : js)
  console.log(a)

  await run(Args, { debug, compilerVersion, output,
    suppressLoading, noSourceMap })
  if (output && !noSourceMap) await updateSourceMaps(output, tempDir)
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
