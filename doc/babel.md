## Using Babel-Compiled CommonJS

> This is from older versions of the compiler.

Having to write `default` and `default.named` is only half the trouble. Things get really rough when we want to reference packages that were compiled with _Babel_. If we actually follow the standard set by _GCC_ where the the _CommonJS_ only has a default export, we run into interesting developments when trying to use _Babel_-compiled modules. See the examples below.

 <table>
<tr>
<th>Source (<a href="https://github.com/a-la/fixture-babel/blob/master/src/index.js">@a-la/fixture-babel</a>)</th><th>Babel-<a href="https://github.com/a-la/fixture-babel/blob/master/build/index.js">compiled</a></th>
</tr>
<tr>
<td>

```js
/**
 * A function that returns `erte`.
 */
const erte = () => {
  return 'erte'
}

/**
 * A function that returns `c`.
 * @param {string} input
 */
export const c = (input) => {
  return 'c' + (input ? `-${input}` : '')
}

/**
 * A function that returns `b`.
 * @param {number} times
 */
export const b = (times) => {
  return 'b' + (times ? `-${times}` : '')
}

export default erte
```
</td>
<td>

```js
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
```
</td>
</tr>
</table>

Because _Babel_ sets the `default` property on the `export` property (along with the `_esModule` flag so that other Babel-compiled packages can import it after the run-time evaluation from `_interopRequire`). What is actually happening now, is that to access the default export, we need to say `default.default`, and all named exports, `default.default.named`.

_Script to compile Babel-compatible modules with GCC is now:_

```js
import erte from '@a-la/fixture-babel'

console.log(erte.default.default())
console.log(erte.default.c(''))
console.log(erte.default.b(''))
```

_Command & Generated JS:_

```
java -jar /Users/zavr/node_modules/google-closure-compiler-java/compiler.jar \
--compilation_level ADVANCED --language_out ECMASCRIPT_2017 --formatting PRETTY_PRINT \
--process_common_js_modules --package_json_entry_names module,main --entry_point \
example/babel.js --externs node_modules/@depack/externs/v8/global.js --externs \
node_modules/@depack/externs/v8/global/buffer.js --externs \
node_modules/@depack/externs/v8/nodejs.js
Dependencies: @a-la/fixture-babel
node_modules/@a-la/fixture-babel/build/index.js:6: WARNING - [JSC_TYPE_MISMATCH] assignment to property b of module$node_modules$$a_la$fixture_babel$build$index.default
found   : undefined
required: function(?): ?
exports.default = exports.b = exports.c = void 0;
                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

node_modules/@a-la/fixture-babel/build/index.js:6: WARNING - [JSC_TYPE_MISMATCH] assignment to property c of module$node_modules$$a_la$fixture_babel$build$index.default
found   : undefined
required: function(string): ?
exports.default = exports.b = exports.c = void 0;
                              ^^^^^^^^^^^^^^^^^^

0 error(s), 2 warning(s), 96.2% typed

```
```js
'use strict';
var a = {};
Object.defineProperty(a, "__esModule", {value:!0});
a.default = a.a = a.b = void 0;
a.b = b => "c" + (b ? `-${b}` : "");
a.a = b => "b" + (b ? `-${b}` : "");
a.default = () => "erte";
console.log(a.default());
console.log(a.b(""));
console.log(a.a(""));
```

_Trying to execute the output:_

```js
erte
c
b
```

OK this is fine, but what happens when we actually try to execute the program with `@babel/register`? This is obviously needed for testing and development.

```js
console.log(_.default.default.default());
                              ^

TypeError: Cannot read property 'default' of undefined
    at Object.default (/Users/zavr/a-la/fixture-babel/erte/erte.js:3:26)
    at Module._compile (module.js:653:30)
    at Module._compile (/Users/zavr/a-la/fixture-babel/node_modules/pirates/lib/index.js:99:24)
    at Module._extensions..js (module.js:664:10)
    at Object.newLoader [as .js] (/Users/zavr/a-la/fixture-babel/node_modules/pirates/lib/index.js:104:7)
    at Module.load (module.js:566:32)
    at tryModuleLoad (module.js:506:12)
    at Function.Module._load (module.js:498:3)
    at Module.require (module.js:597:17)
    at require (internal/module.js:11:18)
```

Nice. Superb compatibility. No IDE support, no dev support, only `default` `default` `default`.

Suppose we wanted to do it like normal humans:

```js
import erte, { c, b } from '@a-la/fixture-babel'

console.log(erte())
console.log(c())
console.log(b())
```

_Command & Generated JS:_

```
java -jar /Users/zavr/node_modules/google-closure-compiler-java/compiler.jar \
--compilation_level ADVANCED --language_out ECMASCRIPT_2017 --formatting PRETTY_PRINT \
--process_common_js_modules --package_json_entry_names module,main --entry_point \
example/babel-normal.js --externs node_modules/@depack/externs/v8/global.js --externs \
node_modules/@depack/externs/v8/global/buffer.js --externs \
node_modules/@depack/externs/v8/nodejs.js
Dependencies: @a-la/fixture-babel
example/babel-normal.js:3: WARNING - [JSC_NOT_FUNCTION_TYPE] {default: {
  b: function(?): ?,
  c: function(string): ?,
  default: (function(): ?|undefined)
}} expressions are not callable
console.log(erte())
            ^^^^^^

example/babel-normal.js:4: WARNING - [JSC_INEXISTENT_PROPERTY] Property c never defined on module$node_modules$$a_la$fixture_babel$build$index
console.log(c())
            ^

example/babel-normal.js:5: WARNING - [JSC_INEXISTENT_PROPERTY] Property b never defined on module$node_modules$$a_la$fixture_babel$build$index
console.log(b())
            ^

node_modules/@a-la/fixture-babel/build/index.js:6: WARNING - [JSC_TYPE_MISMATCH] assignment to property b of module$node_modules$$a_la$fixture_babel$build$index.default
found   : undefined
required: function(?): ?
exports.default = exports.b = exports.c = void 0;
                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

node_modules/@a-la/fixture-babel/build/index.js:6: WARNING - [JSC_TYPE_MISMATCH] assignment to property c of module$node_modules$$a_la$fixture_babel$build$index.default
found   : undefined
required: function(string): ?
exports.default = exports.b = exports.c = void 0;
                              ^^^^^^^^^^^^^^^^^^

0 error(s), 5 warning(s), 94.3% typed

```
```js
'use strict';
var a = {}, c = {};
Object.defineProperty(a, "__esModule", {value:!0});
a.default = a.a = a.b = void 0;
a.b = b => "c" + (b ? `-${b}` : "");
a.a = b => "b" + (b ? `-${b}` : "");
a.default = () => "erte";
console.log(c());
console.log((0,c.b)());
console.log((0,c.a)());
```

_Trying to execute the output:_

```
/Users/zavr/depack/depack/example/babel-normal-output.js:8
console.log(b());
            ^

TypeError: b is not a function
    at Object.<anonymous> (/Users/zavr/depack/depack/example/babel-normal-output.js:8:13)
    at Module._compile (module.js:653:30)
    at Module.p._compile (/Users/zavr/depack/depack/node_modules/alamode/depack/depack-lib.js:49:18)
    at Module._extensions..js (module.js:664:10)
    at Object.k.(anonymous function).y._extensions.(anonymous function) [as .js] (/Users/zavr/depack/depack/node_modules/alamode/depack/depack-lib.js:51:7)
    at Module.load (module.js:566:32)
    at tryModuleLoad (module.js:506:12)
    at Function.Module._load (module.js:498:3)
    at Module.require (module.js:597:17)
    at require (internal/module.js:11:18)
```

Not working and not going to, because hey, we need to make sure that the CommonJS only exports a single `default` module don't we, Node.JS? But presto it works with _Babel_!

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/9.svg?sanitize=true"></a></p>