export default () => {
  console.log('hello world')
  return 'TEST_DEFAULT'
}

const _test = { hello: 'WORLD' }
export const test = { ..._test }
export const test2 = 'TEST2'