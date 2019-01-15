const dgram = require('dgram')

export default dgram
export const {
  'Socket': Socket,
  'createSocket': createSocket,
} = dgram