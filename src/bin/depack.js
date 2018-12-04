#!/usr/bin/env node
import { _src, _analyze, _output } from './get-args'
import Analyze from './commands/analyze'
import Detect from './commands/detect'

(async () => {
  try {
    if (_analyze) return await Analyze(_src)
    await Detect(_src, _output)
    // await Compile({ src: _src, dest: _output })
  } catch ({ stack }) {
    console.log(stack)
  }
})()