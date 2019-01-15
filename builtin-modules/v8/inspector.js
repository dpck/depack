const inspector = require('inspector')

export default inspector
export const {
  'Session': Session,
  'close': close,
  'open': open,
  'url': url,
} = inspector