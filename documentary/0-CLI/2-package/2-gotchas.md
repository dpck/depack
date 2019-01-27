### Gotchas

There are a number of things to look out for when compiling a Node.JS program.

#### Do not output to `ECMA2018`

If the language out set to `ECMA2018`, the output will be hardly optimised, meaning that the source code of all `package.json` files will be present making the file size of the bundle very large. [Google says](https://groups.google.com/forum/#!topic/closure-compiler-discuss/Ogysep0oJN4): _This is working as expected. We haven't implemented any typechecking or code size optimizations for ES2018 yet._ Therefore, use *`-O 2017`* to produce the output of acceptable size without unnecessary rubbish in it.

#### Patch Closure Compiler For Correct `ECMA2017`

When the language out set to `ECMA2017` or `ECMA2016`, there is a bug with destructuring in `filter`, `map` and other array operations which produces incorrect code. E.g., `[{ entry: true }, { }].filter(({ entry}) => entry).map(({ entry }) => { ...entry, mapped: true })` will not work. This is rather unfortunate because destructuring is an essential language feature, and compiling for `ES2017` is the only alternative to `ES2018` which produces gigantic output. This bug [has been fixed](https://github.com/google/closure-compiler/commit/877e304fe69498189300238fedc6531b7d9bd126) but the patch has not been released, therefore you must compile the master branch closure compiler yourself and use `GOOGLE_CLOSURE_COMPILER` environment variable to set the compiler path. Hopefully, with the next release (after *`v20190121`*) the fix will be available.

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

%~ width="15"%