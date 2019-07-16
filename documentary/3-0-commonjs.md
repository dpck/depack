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

<!-- No offense to the authors of this code, maybe it was fine before the modules were here.  -->
Unlike the examples above, the infrastructure built with _Depack_ always uses modules when writing JavaScript, because that's the main static analysis method supported by _Depack_. The require statements are also supported, but when a require is broken up by a comment like `require(/*depack*/)`, it is kept and the module will be statically loaded.

_ES6 modules_ make the correct static analysis of programs possible since exports now are not some random object that can change at runtime in code, but a set of APIs, i.e., `default` and `named` exports. When every single dependency of the compiled file is a module, there are no issues or special things to think about. However, when a package tries to use a CommonJS module, there are the following compatibility rules dictated by the current version of _GCC_.

### Enabling Processing Of CommonJS Modules

The Closure Compiler requires a special flag `--process_common_js_modules` to enable processing CommonJS modules, otherwise, files will be treated as ES6 modules and when trying to make an import, there would be a warning saying "The package does not export the required module":

%EXAMPLE: e/2%
%FORK-js src/depack e/2 -c -a -p%

_Depack_ will perform static analysis by looking at all dependencies recursively. When it sees an import (or require statement) that references an external package, it will find its `package.json` to find out the `main` and `module` fields. If the `main` field is found, the package is marked as _CommonJS_ module, and the flag will be added. Having a `require` statement in the source code on its own does not trigger the addition of the flag, so that packages can be imported dynamically with `require` if that is what is required. This can be used, for example, to get the current version of the package:

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

A _CommonJS_ package required from an Ecma module will have only a single default export, accessible via the `default` property. There are no named exports. What you have to do is this:

```js
import commonJs from 'common-js'
commonJs.default('hello')
commonJs.default.named('world')
```

<!-- Yes it's crazy. Yes you know what you're doing when importing a package. But thank the _Node.JS_ authors for making this decision. I don't know how you are going to program now, because programming involves using IDE for hints, and then testing before the actual build process, and these 2 things are not satisfied, by either _VSCode_ which does not show hints for `commonJs.default` and `commonJs.default.named`, or _Babel_ which is usually setup for testing. -->

%EXAMPLE: e/2%
%EXAMPLE: e/2/common-js%
%EXAMPLE: e/2/common-js2%

<details>
<summary>Show Compiled Version</summary>

%FORK-js src/depack e/2 -a -c --process_common_js_modules -p%
</details>

%FORK-js e/2/compiled%

<!-- There are a number of things to look out for when compiling a _Node.JS_ program. -->

<!-- #### Do not output to `ECMA2018`

If the language out set to `ECMA2018`, the output will be hardly optimised, meaning that the source code of all `package.json` files will be present making the file size of the bundle very large. [Google says](https://groups.google.com/forum/#!topic/closure-compiler-discuss/Ogysep0oJN4): _This is working as expected. We haven't implemented any typechecking or code size optimizations for ES2018 yet._ Therefore, use *`-O 2017`* to produce the output of acceptable size without unnecessary rubbish in it. -->

<!-- ~~**Patch Closure Compiler For Correct `ECMA2017`**~

~~When the language out set to `ECMA2017` or `ECMA2016`, there is a bug with destructuring in `filter`, `map` and other array operations which produces incorrect code. E.g., `[{ entry: true }, { }].filter(({ entry}) => entry).map(({ entry }) => { ...entry, mapped: true })` will not work. This is rather unfortunate because destructuring is an essential language feature, and compiling for `ES2017` is the only alternative to `ES2018` which produces gigantic output. This bug [has been fixed](https://github.com/google/closure-compiler/commit/877e304fe69498189300238fedc6531b7d9bd126) but the patch has not been released, therefore you must compile the master branch closure compiler yourself and use `GOOGLE_CLOSURE_COMPILER` environment variable to set the compiler path. Hopefully, with the next release (after *`v20190121`*) the fix will be available.~~ -->