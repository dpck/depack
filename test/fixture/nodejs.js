import { constants } from 'os'
import { createWriteStream, createReadStream } from 'fs'

console.log(process.version)
console.log(constants.errno.EACCES)
const rs = createReadStream(__filename)
const ws = createWriteStream(process.env['OUTPUT'])
rs.pipe(ws)
