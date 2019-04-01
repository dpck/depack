import { Update } from './s'

let stack = 1
Update(() => {
  stack = 0
})

if (stack) throw new Error('The stack is not updated')
console.log('everything is fine')