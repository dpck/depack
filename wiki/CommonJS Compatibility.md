Depack works best with _ES6_ modules. All new code should be written with `import/export` statements because it's the standard that takes the implementations away from hacking assignments to `module.exports` which people used to use in a variety of possibly imaginable ways, e.g.,

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
Unlike the examples above, the infrastructure built with _Depack_ always uses modules when writing JavaScript, because that's the main static analysis method supported by _Depack_. The require statements are also supported, but when a require is broken up by a comment like `require(/*depack*/'dep')`, it is kept and the module will be dynamically loaded at runtime.

_ES6 modules_ make the correct static analysis of programs possible since exports now are not some random object that can change at runtime by code, but a set of concrete APIs, that is, the single `default` and all `named` exports. When every single dependency of the compiled file is a module, there are no issues or special things to think about. However, when a package tries to use a CommonJS module, there are the following compatibility rules dictated by the current version of _GCC_.

%~%

## Enabling Processing Of CommonJS Modules

The _Closure Compiler_ requires a special flag `--process_common_js_modules` to enable processing _CommonJS_ modules, otherwise, files will be treated as ES6 modules and when trying to make an import, there would be an error saying that the properties being imported are not found in the module:

<table>
<tr><th colspan="2"></th></tr>
<!-- block-start -->
<tr><td>

%EXAMPLE: e/2/ecma%
</td><td>

%EXAMPLE: e/2/common-js%
</td></tr>
<tr><td  colspan="2"><md2html>


</md2html></td></tr>
<!-- /block-end -->
<!-- block-start -->
<tr><td colspan="2">

%FORK-js src/depack e/2/ecma -c -a -p%
</td></tr>
<tr><td colspan="2"><md2html>


</md2html></td></tr>
<!-- /block-end -->
</table>

_Depack_ will perform static analysis by looking at all dependencies recursively. When it sees an import (or a require statement) that references an external package, it will find its `package.json` to find out the `main` and `module` fields. If the `main` field is found, the package is marked as _CommonJS_ module, and the `--process_common_js_modules` flag will be added, otherwise, the file is just added with `--js` flag.

<!-- Having a `require` statement in the source code on its own does not trigger the addition of the flag, so that packages can be imported dynamically with `require` if that is what is required. This can be used, for example, to get the current version of the package: -->
The require statement will not trigger the addition of the flag if:

- [x] It appears in the entry file passed to _Depack_. It makes it possible to do common things like the example below:
    ```js
    const version = require('../package.json')['version']
    console.log(version)
    // 1. the compiled file must have the same relative path as source
    // 2. use only for bins, as if used in a lib, the container package's
    //    package.json will be read.
    ```
- [x] It's not pure, e.g., a comment is added `require(/**/'depack')`

In scenarios above, the compiler will leave the `require` call as it is because there was no `process_common_js_modules` flag. However, if there were other packages in _CommonJS_ format (required via the `main` field of their `package.json`), **ALL** requires will be processed. If _Depack_ didn't detect a _CommonJS_ module when you know there is one, just add the flag manually. Finally, _Depack_ assumes that the entry point is in ES6.

%~%

## Single Default Export

It is not possible to import named exports from _CommonJS_ modules. There is a single default export that must be imported, and named exports will be its properties.

> tldr;
>    ```js
>    import commonJs from 'common-js'
>    commonJs('hello')
>    commonJs.named('world')
>    ```

<table>
<tr><th colspan="2"><md2html>

A _CommonJS_ package required from an ECMA module will have only a single default exported object, with named exports defined on it.
</md2html>
</th></tr>
<!-- block-start -->
<tr><td colspan="2">

```js
import commonJs from 'common-js'
commonJs('hello')
commonJs.named('world')
```
</td></tr>
<tr><td colspan="2"><md2html>

There are no named exports to be used in destructuring of the `import` statement.
</md2html></td></tr>
<!-- /block-end -->
<!-- block-start -->
<tr><td colspan="2">

%EXAMPLE: e/2/ecma%
</td></tr>
<tr><td colspan="2"><md2html>

_ECMA modules'_ compatibility works by calling the default export from code, and named exports from within the imported object's namespace, i.e., without named imports but by referencing the imported object.

</md2html></td></tr>
<!-- /block-end -->

<!-- block-start -->
<tr><td>

%EXAMPLE: e/2/common-js%
</td><td>

%EXAMPLE: e/2/common-js2%
</td></tr>
<tr><td colspan="2"><md2html>

The _CommonJS_ can be required by other _CommonJS_ modules in the standard `require` way. Although the non-quoted properties on `exports` will be renamed, this is an internal optimisation meaning that in code, all references to the properties will also be renamed.
</md2html></td></tr>
<!-- /block-end -->
</table>


<!-- Yes it's crazy. Yes you know what you're doing when importing a package. But thank the _Node.JS_ authors for making this decision. I don't know how you are going to program now, because programming involves using IDE for hints, and then testing before the actual build process, and these 2 things are not satisfied, by either _VSCode_ which does not show hints for `commonJs.default` and `commonJs.default.named`, or _Babel_ which is usually setup for testing. -->

<table>
<tr><th colspan="2">
To use CJS from Ecma, import a single default export, and access its properties for named exports.
<!-- Default importing of CommonJS module works by assigning the default export to the default import and named exports as its properties. -->
</th></tr>
<!-- block-start -->
<tr><td>

<details>
<summary>Show Compiled Version</summary>

%FORK-js src/depack e/2/ecma -a -c --process_common_js_modules -p%
</details>
</td>
<td>

%FORK-js e/2/compiled%
</td></tr>
</table>


<!-- There are a number of things to look out for when compiling a _Node.JS_ program. -->

<!-- #### Do not output to `ECMA2018`

If the language out set to `ECMA2018`, the output will be hardly optimised, meaning that the source code of all `package.json` files will be present making the file size of the bundle very large. [Google says](https://groups.google.com/forum/#!topic/closure-compiler-discuss/Ogysep0oJN4): _This is working as expected. We haven't implemented any typechecking or code size optimizations for ES2018 yet._ Therefore, use *`-O 2017`* to produce the output of acceptable size without unnecessary rubbish in it. -->

<!-- ~~**Patch Closure Compiler For Correct `ECMA2017`**~

~~When the language out set to `ECMA2017` or `ECMA2016`, there is a bug with destructuring in `filter`, `map` and other array operations which produces incorrect code. E.g., `[{ entry: true }, { }].filter(({ entry}) => entry).map(({ entry }) => { ...entry, mapped: true })` will not work. This is rather unfortunate because destructuring is an essential language feature, and compiling for `ES2017` is the only alternative to `ES2018` which produces gigantic output. This bug [has been fixed](https://github.com/google/closure-compiler/commit/877e304fe69498189300238fedc6531b7d9bd126) but the patch has not been released, therefore you must compile the master branch closure compiler yourself and use `GOOGLE_CLOSURE_COMPILER` environment variable to set the compiler path. Hopefully, with the next release (after *`v20190121`*) the fix will be available.~~ -->