/* yarn example/ */
import depack from '../src'

(async () => {
  const res = await depack({
    text: 'example',
  })
  console.log(res)
})()