const transform = require('../../lib/transform');

const Analyze = async (src) => {
  console.log(src)
  await transform(src)
}

module.exports=Analyze