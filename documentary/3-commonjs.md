## CommonJS Compatibility

Depack works best with ES6 modules. All new code should be written with `import/export` statements because it's the standard that takes the implementations away from hacking assignments to `module.exports` which people used to use in a variety of possibly imaginable ways, e.g.,

<details>
<summary><md2html>Show `lazyProperty` use from `depd`</md2html></summary>

```js
lazyProperty(module.exports, 'eventListenerCount', function eventListenerCount () {
  return EventEmitter.listenerCount || require('./event-listener-count')
})

/**
 * Define a lazy property.
 */

function lazyProperty (obj, prop, getter) {
  function get () {
    var val = getter()

    Object.defineProperty(obj, prop, {
      configurable: true,
      enumerable: true,
      value: val
    })

    return val
  }

  Object.defineProperty(obj, prop, {
    configurable: true,
    enumerable: true,
    get: get
  })
}
```
</summary>
</details>

<details>
<summary><md2html>Show `module.exports` use from `debug`</md2html></summary>

```js
module.exports = require('./common')(exports);

const {formatters} = module.exports;
```
</summary>
</details>

No offense to the authors of this code, maybe it was fine before the modules were here. Since 2018 everyone absolutely must use modules when writing new JavaScript code. It makes the correct static analysis of programs possible since exports now are not some random object, but a set of APIs, i.e., `default` and `named` exports. When every single dependency of the compiled file is a module, there are no issues or special things to think about. However, when a package tries to use a CommonJS module, there are the following compatibility rules dictated by the _GCC_.

### Enabling Processing Of CommonJS Modules

The Closure Compiler requires a special flag `--process_common_js_modules` to enable processing CommonJS modules, otherwise, files will be treated as ES6 modules and when trying to make an import, there would be a warning saying "The package does not export the required module":

%EXAMPLE: example/commonjs%
%FORK src/bin example/commonjs -c -a -p%

_Depack_ will perform static analysis by looking at all dependencies recursively. When it sees an import (or require statement) that references an external package, it will find its `package.json` to find out the `main` and `module` fields. If the `main` field is found, the package is marked as CommonJS module, and the flag will be added. Having a `require` statement in the source code on its own does not trigger the addition of the flag, so that packages can be imported dynamically with `require` if that is what is required. This can be used, for example, to get the current version of the package:

```js
const version = require('../package.json')['version']
console.log(version)
```

And the compiler will leave the `require` call as it is because there was no `process_common_js_modules` flag. However, if there were packages in CommonJS format (required via the `main` field of their `package.json`), ALL requires will be processed. If _Depack_ didn't detect a CommonJS module when you know there is one, just add the flag manually. _Depack_ also assumes that all source code is in ES6 format.

### Single Default Export

> The idea is actually that you can do the following, but it's not working correctly at the moment.

<em>
```js
import commonJs from 'common-js'
commonJs('hello')
commonJs.named('world')
```
</em>

A CommonJS package required from an Ecma module will have only a single default export, accessible via the `default` property. There are no named exports. What you have to do is this:

```js
import commonJs from 'common-js'
commonJs.default('hello')
commonJs.default.named('world')
```

Yes it's crazy. Yes you know what you're doing when importing a package. But thank the _Node.JS_ authors for making this decision. I don't know how you are going to program now, because programming involves using IDE for hints, and then testing before the actual build process, and these 2 things are not satisfied, by either _VSCode_ which does not show hints for `commonJs.default` and `commonJs.default.named`, or _Babel_ which is usually setup for testing.

%EXAMPLE: example/commonjs%
%EXAMPLE: example/commonjs/common-js%
%EXAMPLE: example/commonjs/common-js2%

<details>
<summary>Show Compiled Version</summary>

%FORK-js src/bin/depack example/commonjs -a -c --process_common_js_modules -p%
</details>

%FORK-js example/commonjs/compiled%

<!-- There are a number of things to look out for when compiling a _Node.JS_ program. -->

<!-- #### Do not output to `ECMA2018`

If the language out set to `ECMA2018`, the output will be hardly optimised, meaning that the source code of all `package.json` files will be present making the file size of the bundle very large. [Google says](https://groups.google.com/forum/#!topic/closure-compiler-discuss/Ogysep0oJN4): _This is working as expected. We haven't implemented any typechecking or code size optimizations for ES2018 yet._ Therefore, use *`-O 2017`* to produce the output of acceptable size without unnecessary rubbish in it. -->

<!-- ~~**Patch Closure Compiler For Correct `ECMA2017`**~

~~When the language out set to `ECMA2017` or `ECMA2016`, there is a bug with destructuring in `filter`, `map` and other array operations which produces incorrect code. E.g., `[{ entry: true }, { }].filter(({ entry}) => entry).map(({ entry }) => { ...entry, mapped: true })` will not work. This is rather unfortunate because destructuring is an essential language feature, and compiling for `ES2017` is the only alternative to `ES2018` which produces gigantic output. This bug [has been fixed](https://github.com/google/closure-compiler/commit/877e304fe69498189300238fedc6531b7d9bd126) but the patch has not been released, therefore you must compile the master branch closure compiler yourself and use `GOOGLE_CLOSURE_COMPILER` environment variable to set the compiler path. Hopefully, with the next release (after *`v20190121`*) the fix will be available.~~ -->

### Using Babel-Compiled CommonJS

Having to write `default` and `default.named` is only half the trouble. Things get really rough when we want to reference packages that were compiled with _Babel_. If we actually follow the standard set by _GCC_ where the the _CommonJS_ only has a default export, we run into interesting developments when trying to use _Babel_-compiled modules. See the examples below.

<!-- therefore it's a good idea to ping the package owners to publish the `module` property of their packages pointing to the `src` folder where the code is written as ES6 modules. -->
 <!-- This is a great step forward to move _JavaScript_ language forward because `import`/`export` is what should be used instead of `require`. -->

<!-- Otherwise, modules can be compiled with [`alamode`](https://github.com/a-la/alamode) which the compiler can understand. There are cases such as using `export from` compiled with ÀLaMode which GCC does not accept, therefore it is always the best to fork a package and make sure that it exports the `module` field in its _package.json_. -->

<table>
<tr>
<th>Source (<a href="https://github.com/a-la/fixture-babel/blob/master/src/index.js">@a-la/fixture-babel</a>)</th><th>Babel-<a href="https://github.com/a-la/fixture-babel/blob/master/build/index.js">compiled</a></th>
</tr>
<tr>
<td>

%EXAMPLE: node_modules/@a-la/fixture-babel/src%
</td>
<td>

%EXAMPLE: node_modules/@a-la/fixture-babel/build%
</td>
</tr>
</table>

Because _Babel_ sets the `default` property on the `export` property (along with the `_esModule` flag so that other Babel-compiled packages can import it after the run-time evaluation from `_interopRequire`). What is actually happening now, is that to access the default export, we need to say `default.default`, and all named exports, `default.default.named`.

_Script to compile Babel-compatible modules with GCC is now:_

%EXAMPLE: example/babel%

_Command & Generated JS:_

%FORKERR src/bin/depack example/babel -c -a -p --process_common_js_modules%
%FORK-js src/bin/depack example/babel -c -a -p --process_common_js_modules%

_Trying to execute the output:_

%FORK-js example/babel-output%

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

%EXAMPLE: example/babel-normal%

_Command & Generated JS:_

%FORKERR src/bin/depack example/babel-normal -c -a -p --process_common_js_modules%
%FORK-js src/bin/depack example/babel-normal -c -a -p --process_common_js_modules%

_Trying to execute the output:_

%FORKERR example/babel-normal-output%

Not working and not going to, because hey, we need to make sure that the CommonJS only exports a single `default` module don't we, Node.JS? But presto it works with _Babel_!

%~%