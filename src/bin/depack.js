import { src as _src, analyze as _analyze, output as _output } from './get-args'
import Analyze from './commands/analyze'
import Compile from './commands/compile'

(async () => {
  try {
    if (_analyze) return await Analyze(_src)
    await Compile({ src: _src, dest: _output })
  } catch ({ stack }) {
    console.log(stack)
  }
})()