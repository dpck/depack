import { spawn } from 'child_process'

const p = spawn('echo', ['hello world'])
console.log(p.spawnargs.join(' '))