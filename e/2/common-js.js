// common-js
const commonJs2 = require('./common-js2')

module.exports = () => {
  console.log('default common js export')
}
module.exports['named'] = () => {
  console.log('named common js export')
}

console.log('requiring a common js from common js:')
console.log(commonJs2)