## Single Default Export

> The idea is actually that you can do the following, but it's not working correctly at the moment (the default method has to be called with `.default`).<em>
>    ```js
>    import commonJs from 'common-js'
>    commonJs('hello')
>    commonJs.named('world')
>    ```

</em>

<table>
<tr><th colspan="2">A <em>CommonJS</em> package required from an ECMA module will have only a single default exported object. The default export will be accessible via the <code>default</code> property, and other methods via all other properties.
</th></tr>
<tr><td colspan="2">

```js
import commonJs from 'common-js'
commonJs.default('hello')
commonJs.named('world')
```
</td></tr>
<tr><td colspan="2">There are no named exports to be used in destructuring of the <code>import</code> statement.</td></tr>
<tr><td colspan="2">

```js
// ecma
import commonJs from './common-js'

console.log('requiring a common js from ecma:')
console.log(commonJs)
```
</td></tr>
<tr><td></td></tr>
<tr><td>

```js
// common-js
const commonJs2 = require('./common-js2')

module.exports = () => {
  console.log('default common js export')
}
module.exports['named'] = () => {
  console.log('named common js export')
}

console.log('requiring a cjs from cjs:')
console.log(commonJs2)
```
</td><td>

```js
// common-js
module.exports = () => {
  console.log('default common js export2')
}
module.exports['named'] = () => {
  console.log('named common js export2')
}
```
</td></tr>
<tr><td colspan="2">The <em>CommonJS</em> can be required by other <em>CommonJS</em> modules in the standard <code>require</code> way.</td></tr>
</table>


<details>
<summary>Show Compiled Version</summary>

```js
'use strict';
var a = () => {
  console.log("default common js export2");
};
a.named = () => {
  console.log("named common js export2");
};
var b = () => {
  console.log("default common js export");
};
b.named = () => {
  console.log("named common js export");
};
console.log("requiring a common js from common js:");
console.log(a);
console.log("requiring a common js from ecma:");
console.log(b);
```
</details>

```js
requiring a common js from common js:
{ [Function: a] named: [Function] }
requiring a common js from ecma:
{ default: { [Function: default] named: [Function] } }
```