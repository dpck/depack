// common-js
const commonJs2 = require('./common-js2')

module.exports = () => {
  console.log('Def CJS')
}
module.exports['named'] = () => {
  console.log('Named CJS')
}

console.log('Requiring CJS '
  + 'from CJS:')
console.log(commonJs2)