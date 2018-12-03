module.exports=() => {
  console.log('hello world')
  return 'TEST_DEFAULT'
}

const _test = { hello: 'WORLD' }
       const test = { ..._test }
       const test2 = 'TEST2'

module.exports.test = test
module.exports.test2 = test2