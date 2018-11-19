import { src as _src, analyze as _analyze } from './get-args'
import Analyze from './commands/analyze'

(async () => {
  try {
    if (_analyze) return await Analyze(_src)
  } catch ({ stack }) {
    console.log(stack)
  }
})()