#!/usr/bin/env node
const { _src, _analyze, _output } = require('./get-args');
const Analyze = require('./commands/analyze');
const Detect = require('./commands/detect');

(async () => {
  try {
    if (_analyze) return await Analyze(_src)
    await Detect(_src, _output)
    // await Compile({ src: _src, dest: _output })
  } catch ({ stack }) {
    console.log(stack)
  }
})()