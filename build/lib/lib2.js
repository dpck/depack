let makePromise = require('makepromise'); if (makePromise && makePromise.__esModule) makePromise = makePromise.default;
const { lstat } = require('fs');

       const exists = async (path) => {
  try {
    await makePromise(lstat, path)
    return true
  } catch (err) {
    return false
  }
}

module.exports.exists = exists