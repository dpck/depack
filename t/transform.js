import { Transform } from 'stream'

class T1 extends Transform {
  _transform(chunk, _, next) {
    console.log(chunk)
    next()
  }
}

class T2 extends Transform {
  async _transform(chunk, _, next) {
    await new Promise(r => setTimeout(r, 10))
    console.log(chunk)
    next()
  }
}

const t1 = new T1()
t1.end('data')
const t2 = new T2()
t2.end('data')