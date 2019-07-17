"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.b = exports.c = exports.default = void 0;

var _stream = _interopRequireWildcard(require("stream"));

var _path = require("path");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class S extends _stream.Transform {
  /**
   * Creates a new instance.
   * @param {string} path
   * @param {Stream} [parent]
   */
  constructor(path, parent) {
    super();
    this.source = (0, _path.join)('example', path);
    if (parent instanceof _stream.default) this.pipe(parent);
  }

}
/**
 * A function that returns `c`.
 * @param {string} input
 */


exports.default = S;

const c = (input = '') => {
  return 'c' + input ? `-${input}` : '';
};
/**
 * A function that returns `b`.
 * @param {number} times
 */


exports.c = c;

const b = (times = 0) => {
  return 'b' + times ? `-${times}` : '';
};

exports.b = b;