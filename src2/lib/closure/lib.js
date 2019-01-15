/**
 * Execute the closure compiler.
 */
export const run = async (compiler) => {
  return await new Promise((r, j) => {
    compiler.run((e, so, se) => {
      if (e) {
        const er = makeError(e, se)
        const err = new Error()
        err.stack = er
        return j(err)
      }
      r({ stdout: so, stderr: se })
    })
  })
}