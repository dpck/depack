<!-- Having to write `default` and `default.named` is only half the trouble. Things get really rough when we want to reference packages that were compiled with _Babel_. If we actually follow the standard set by _GCC_ where the the _CommonJS_ only has a default export, we run into interesting developments when trying to use _Babel_-compiled modules. See the examples below. -->

<!-- therefore it's a good idea to ping the package owners to publish the `module` property of their packages pointing to the `src` folder where the code is written as ES6 modules. -->
 <!-- This is a great step forward to move _JavaScript_ language forward because `import`/`export` is what should be used instead of `require`. -->

<!-- Otherwise, modules can be compiled with [`alamode`](https://github.com/a-la/alamode) which the compiler can understand. There are cases such as using `export from` compiled with ÀLaMode which GCC does not accept, therefore it is always the best to fork a package and make sure that it exports the `module` field in its _package.json_. -->
Since _Compiler_`v20190709`, the modules imports from _Babel_ have been working semi-correctly, because although it is possible to compile a _Babel_-transpiled module with _Closure Compiler_, the compatibility between the two is not ensured for default exports.

<!-- - [x] Can import named exports.
- [ ] Can import default export. -->

_The following source code is used in the example on this page._

<table>
<tr><th>Source (<a href="https://github.com/a-la/fixture-babel/blob/master/src/index.js">@a-la/fixture-babel</a>)</th></tr>
<!-- block-start -->
<tr><td>

%EXAMPLE: node_modules/@a-la/fixture-babel/src%
</td></tr>
<!-- /block-end -->
<!-- block-start -->
<tr><th>Babel-<a href="https://github.com/a-la/fixture-babel/blob/master/build/index.js">compiled</a></th></tr>
<tr><td>

<details>
<summary>Show Code</summary>

%EXAMPLE: node_modules/@a-la/fixture-babel/build%
</details>
</td></tr>
<!-- /block-end -->
</table>

 <!-- as seen by the examples below. -->
<!-- Because _Babel_ sets the `default` property on the `export` property (along with the `_esModule` flag so that other Babel-compiled packages can import it after the run-time evaluation from `_interopRequire`). What is actually happening now, is that to access the default export, we need to say `default.default`, and all named exports, `default.default.named`. -->

Because of how [CommonJS Compatibility](CommonJS-Compatibility) is implemented, all _RequireJS_ modules will only make accessible a single default object, without named exports.

<table>
<tr><th colspan="2">
<em>The script to import Babel-compiled modules in ES6 Code is now:</em>
</th></tr>
<!-- block-start -->
<tr><td>

%EXAMPLE: e/b, ../b/i => @fixture/babel%
</td>
<td>

- ✅ Do import a single default object.
- ⛔️ Do NOT import named exports.
</td></tr>
</table>

Although it's impossible to use such code with _Babel_ runtime, the code above can be compiled using _Google Closure Compiler_.

<table>
<tr><th colspan="2"><em>Command & Warnings</em></th></tr>
<!-- block-start -->
<tr><td colspan="2">

%FORKERR-fs src/depack e/b -c -a -p --process_common_js_modules%
</td></tr>
<tr><td colspan="2"><md2html>

The command generates some warnings, but no errors.

</md2html></td></tr>
</table><table>
<tr><th colspan="2"><em>The generated code and output</em></th></tr>
<!-- /block-end -->
<!-- block-start -->
<tr><td>

%FORK-js src/depack e/b -c -a -p --process_common_js_modules%

</td><td>

%FORK-js example/babel-output%
</td></tr>
<tr><td colspan="2"><md2html>

Trying to execute the output produces the correct result. OK, but what happens when we actually try to execute such program with `@babel/register`? This is needed for testing and development.

</md2html></td></tr>
<!-- /block-end -->

<!-- block-start -->
<tr><td>

```ts
MacBook:fixture-babel zavr$ node erte
erte/erte.js:7
console.log(_build.default.default());
                                  ^

TypeError: _build.default.default is not a function
    at Object.<anonymous> (erte/erte.js:3:13)
    at Module._compile (module.js:653:30)
    at Module._compile (pirates/index.js:99:24)
    at Module._extensions..js (module.js:664:10)
    at Object.newLoader [as .js] (pirates/index.js:104:7)
    at Module.load (module.js:566:32)
    at tryModuleLoad (module.js:506:12)
    at Function.Module._load (module.js:498:3)
    at Module.require (module.js:597:17)
    at require (internal/module.js:11:18)
```
</td><td>

**Conclusion**
- [ ] No IDE support, e.g., VS Code does not infer `.default` property.
- [ ] No development environment, because _Babel_-runtime will throw on trying to access the `.default` property.

</td></tr>
<tr><td colspan="2"><md2html>

Because of referring to the default import as `.default`, the compatibility with _Babel_ is broken for default imports. Therefore, it's better to use <a href="https://github.com/a-la/alamode/">_ÀLaMode_</a> for transpilation which is compatible with Closure Compiler.

</md2html></td></tr>
<!-- /block-end -->
</table>

---

To see what happens when trying to import `{ named }` exports, refer to the example below.
<!-- [Importing `{ named }` modules](t) on Babel-compiled modules is not supported because they are still _require.js_ modules! The example below demonstrates what happens: -->

%EXAMPLE: e/1, ../b/i => @fixture/babel%

<table>
<tr><th><em>Command & Generated JS</em></th></tr>
<!-- block-start -->
<tr><td>

%FORKERR src/depack e/1 -c -a -p --process_common_js_modules%
</td></tr>
<tr><td><md2html>
`depack e/1 -c -a -p --process_common_js_modules`
**stderr**

</md2html></td></tr>
<!-- /block-end -->
<!-- block-start -->
<tr><td>

%FORK-js src/depack e/1 -c -a -p --process_common_js_modules%
</td></tr>
<tr><td><md2html>
**stdout**

`&lt;EMPTY&gt;`

</md2html></td></tr>
<!-- /block-end -->
</table>

The named import syntax on _CommonJS_ modules is not supported unless there is an ECMA6 version of the script which will be detected by static analysis in the `module` field of the _package.json_ file. Thus it's a good idea to publish the module also with the build for the compiler to include the source code of the package in another package being built.


<!-- _Trying to execute the output:_

%FORKERR example/babel-normal-output% -->


<!-- Not working and not going to, because hey, we need to make sure that the CommonJS only exports a single `default` module don't we, Node.JS? But presto it works with _Babel_! -->
