"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.b = exports.c = void 0;

/**
 * A function that returns `erte`.
 */
const erte = () => {
  return 'erte';
};
/**
 * A function that returns `c`.
 * @param {string} input
 */


const c = input => {
  return 'c' + (input ? `-${input}` : '');
};
/**
 * A function that returns `b`.
 * @param {number} times
 */


exports.c = c;

const b = times => {
  return 'b' + (times ? `-${times}` : '');
};

exports.b = b;
var _default = erte;
exports.default = _default;