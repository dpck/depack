import makePromise from 'makepromise'
import { lstat } from 'fs'

/**
 * Check whether the file exists.
 */
export const exists = async (path) => {
  try {
    await makePromise(lstat, path)
    return true
  } catch (err) {
    return false
  }
}