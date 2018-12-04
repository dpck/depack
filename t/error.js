import { fork } from 'child_process'

fork('.', [], {
  stdio: 'pipe',
  execArgv: [], //['--inspect-brk', '20462'],
}).on('error', (error) => {
  console.log(error)
})