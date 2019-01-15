const tty = require('tty')

export default tty
export const {
  'ReadStream': ReadStream,
  'WriteStream': WriteStream,
  'isatty': isatty,
} = tty