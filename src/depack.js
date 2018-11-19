import { compile } from './lib'

(async () => {
  try {
    await compile('example/example2.js', 'closure.js')
  } catch (err) {
    console.log(err.stack)
  }
})()

// const compileDep = () => {

// }


// compilerProcess.stdout.pipe(process.stdout)
// compilerProcess.stderr.pipe(process.stderr)