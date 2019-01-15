/**
 * @param
 * @param {TempContext} temp
 */
const writeExterns = async (internals, temp) => {
  const externs = Object.keys(internals).map((mod) => {
    const keys = Object.keys(require(mod))
    return `const ${internals[mod]} = {}
    ${keys.map((k) => `${internals[mod]}.${k} = {}`)}`
  }, []).join('\n')
  return await temp.write('externs.js', externs)
}

