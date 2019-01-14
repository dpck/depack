import argufy from 'argufy'

const args = argufy({
  'src': { command: true },
  'analyze': { short: 'a', boolean: true },
  'output': { short: 'o' },
  'compile': { short: 'c', boolean: true },
  'version': { short: 'v', boolean: true },
  'externs': { short: 'e' },
  'no-warnings': { short: 'w', boolean: true },
  'level': { short: 'l' },
  'language_in': { short: 'I' },
  'language_out': { short: 'O' },
  'node': { short: 'n', boolean: true },
})

const src = args['src']
console.log(args)

console.log(src)