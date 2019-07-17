# @a-la/fixture-babel

[![npm version](https://badge.fury.io/js/%40a-la%2Ffixture-babel.svg)](https://npmjs.org/package/@a-la/fixture-babel)

`@a-la/fixture-babel` is source code transpiled with _Babel_.

```sh
yarn add -E @a-la/fixture-babel
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`erte(): string`](#erte-string)
- [`c(): string`](#c-string)
- [`b(): string`](#b-string)
- [Transpiled Source Code](#transpiled-source-code)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/0.svg?sanitize=true"></a></p>

## API

The package is available by importing its default and named functions:

```js
import erte, { c, b } from '@a-la/fixture-babel'
```

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/1.svg?sanitize=true"></a></p>

## `erte(): string`

Returns `erte`.

```js
/* yarn example/ */
import fixtureBabel from '@a-la/fixture-babel'

(async () => {
  const res = await fixtureBabel({
    text: 'example',
  })
  console.log(res)
})()
```
```
erte
```

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/2.svg?sanitize=true"></a></p>

## `c(): string`

Returns `c`.

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/3.svg?sanitize=true"></a></p>

## `b(): string`

Returns `b`.

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/4.svg?sanitize=true"></a></p>

## Transpiled Source Code

This is how Babel transpiles [source code](src/class.js):

```js
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
```

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/5.svg?sanitize=true"></a></p>

## Copyright

<table>
  <tr>
    <th>
      <a href="https://artd.eco">
        <img src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png" alt="Art Deco" />
      </a>
    </th>
    <th>© <a href="https://artd.eco">Art Deco</a> for <a href="https://alamode.cc">À La Mode</a> 2019</th>
    <th>
      <a href="https://www.technation.sucks" title="Tech Nation Visa">
        <img src="https://raw.githubusercontent.com/artdecoweb/www.technation.sucks/master/anim.gif"
          alt="Tech Nation Visa" />
      </a>
    </th>
    <th><a href="https://www.technation.sucks">Tech Nation Visa Sucks</a></th>
  </tr>
</table>

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/-1.svg?sanitize=true"></a></p>