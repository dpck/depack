const assert = require('assert')

export default assert
export const {
  'AssertionError': AssertionError,
  'deepEqual': deepEqual,
  'deepStrictEqual': deepStrictEqual,
  'doesNotReject': doesNotReject,
  'doesNotThrow': doesNotThrow,
  'equal': equal,
  'fail': fail,
  'ifError': ifError,
  'notDeepEqual': notDeepEqual,
  'notDeepStrictEqual': notDeepStrictEqual,
  'notEqual': notEqual,
  'notStrictEqual': notStrictEqual,
  'ok': ok,
  'rejects': rejects,
  'strict': strict,
  'strictEqual': strictEqual,
  'throws': throws,
} = assert