### CommonJS Compatibility

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

#### Single Default Export

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

#### Babel-Compiled Dependencies Don't Work

Babel-compiled modules won't work, therefore it's a good idea to ping the package owners to publish the `module` property of their packages pointing so `src` where code is written as ES6 modules. This is a great step forward to move JavaScript language forward because `import`/`export` is what should be used instead of `require`. Otherwise, modules can be compiled with [`alamode`](https://github.com/a-la/alamode) which the compiler can understand. There are cases such as using `export from` compiled with ÀLaMode which GCC does not accept, therefore it is always the best to fork a package and make sure that it exports the `module` field in its _package.json_.

<table>
<tr>
<th>Source</th><th>Babel-compiled</th>
</tr>
<tr>
<td>

_[fixture-babel](https://github.com/a-la/fixture-babel/blob/master/src/index.js)_
```js
/**
 * A function that returns `erte`.
 */
const erte = () => {
  return 'erte'
}

/**
 * A function that returns `c`.
 */
export const c = () => {
  return 'c'
}

/**
 * A function that returns `b`.
 */
export const b = () => {
  return 'b'
}

export default erte
```
</td>
<td>

_node_modules/@a-la/fixture-babel_
%EXAMPLE: node_modules/@a-la/fixture-babel/build/index.js%
</td>
</tr>
</table>

_Script to compile with GCC:_

%EXAMPLE: example/babel.js%

_Command:_

```sh
-jar /Users/zavr/node_modules/google-closure-compiler-java/compiler.jar
--compilation_level ADVANCED
--language_out ECMASCRIPT_2017
--formatting PRETTY_PRINT
--module_resolution NODE
--package_json_entry_names module,main
--externs externs/node.js
--process_common_js_modules
--js node_modules/@a-la/fixture-babel/package.json
     node_modules/@a-la/fixture-babel/build/index.js
     example/babel.js
```

_Trying to execute the output:_

%FORKERR-js example/babel-output%

%~%