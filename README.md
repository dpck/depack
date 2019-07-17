# depack

[![npm version](https://badge.fury.io/js/depack.svg)](https://npmjs.org/package/depack)

`depack` Is The Bundler To Create Front-End (JS) Bundles And Back-End (Node.JS) Compiled Packages With Google Closure Compiler.

```sh
yarn add -E depack
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [GCC Installation](#gcc-installation)
- [**CLI**](#cli)
- [Bundle Mode](#bundle-mode)
- [Compile Mode](#compile-mode)
  * [Usage](#usage)
  * [Troubleshooting](#troubleshooting)
    * [Bugs In GCC](#bugs-in-gcc)
    * [External APIs](#external-apis)
- [CommonJS Compatibility](#commonjs-compatibility)
  * [Enabling Processing Of CommonJS Modules](#enabling-processing-of-commonjs-modules)
  * [Single Default Export](#single-default-export)
  * [Using Babel-Compiled CommonJS](#using-babel-compiled-commonjs)
    * [Importing `{ named }` modules](#importing--named--modules)
- [API](#api)
- [Known Bugs](#known-bugs)
- [Org Structure](#org-structure)
- [Notes](#notes)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/0.svg?sanitize=true"></a></p>

## GCC Installation

Depack has been built to contain no dependencies to prove its concept. [Google Closure Compiler](https://github.com/google/closure-compiler) is not installed by it, because the general use-case is to reuse _Depack_ across many projects, and it does not make sense to download and install _GCC_ in each of them in the `node_modules` folder. Therefore, the recommended way is to install GCC in the home or projects directory, e.g., `/Users/home/user` or `/Users/home/js-projects`. In that way, the single _GCC_ will be accessible from there even when running _Depack_ from a particular project (because Node.js will try to resolve the module by traversing up to the root).

The other way to install _GCC_ is to set the `GOOGLE_CLOSURE_COMPILER` environment variable to point to the compiler, either downloaded from the internet, or built yourself.

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/1.svg?sanitize=true"></a></p>

## **CLI**

_Depack_ can be used from the command line interface to create bundles or compiled packages for the given entry file.

```sh
depack -h
```

```
Google Closure Compiler-based packager for the web and Node.JS.
https://artdecocode.com/depack/
Generic flags: https://github.com/google/closure-compiler/wiki/Flags-and-Options

  depack SOURCE [-cl] [-o output.js] [-IO 2018] [-wVvh] [-lvl LEVEL -a] [... --generic-args]

	source            	The source entry to build.
	--output, -o      	Where to save the output.
	                  	Prints to `stdout` when not passed.
	--debug, -d       	The location of the file where to save sources after
	                  	each pass.
	--pretty-print, -p	Whether to apply the `--formatting=PRETTY_PRINT` flag.
	--no-sourcemap, -S	Disable source maps.
	--verbose, -V     	Print the exact command.
	--language_in, -I 	The language of the input sources, years also accepted.
	--language_out, -O	The language spec of the output, years accepted.
	--level, -lvl     	The compilation level. Options:
	                  	BUNDLE, WHITESPACE_ONLY, SIMPLE (default), ADVANCED.
	--advanced, -a    	Whether to enable advanced optimisation.
	--no-warnings, -w 	Do not print compiler's warnings by adding the
	                  	`--warning_level QUIET` flag.
	--version, -v     	Shows the current _Depack_ and _GCC_ versions.
	--help, -h        	Prints the usage information.

BACKEND: Creates a single executable Node.JS file or a library.
  depack SOURCE -cl [-o output.js] [-s]

	--compile, -c  	Set the _Depack_ mode to "compile" to create a Node.JS binary.
	               	Adds the `#!usr/bin/env node` at the top and sets +x permission.
	--library, -l  	Set the _Depack_ mode to "library" to create a Node.JS library.
	               	Initialises the `DEPACK_EXPORT` variable kept via an extern
	               	which is also exported as `module.exports`. The source code
	               	needs to assign the library to this variable.
	--no-strict, -s	Whether to remove the `"use strict"` from the output.

  Example:

    depack src/bin.js -c -a -o depack/bin.js -p

FRONTEND: Creates a bundle for the web.
  depack SOURCE [-o output.js] [-H]

	--iife, -i    	Add the IIFE flag to prevent name clashes.
	--temp        	The path to the temp directory used to transpile JSX files.
	              	Default: depack-temp.
	--preact, -H  	Add the `import { h } from "preact"` to JSX files automatically.
	              	Does not process files found in the `node_modules`, because
	              	they are not placed in the temp, and must be built separately,
	              	e.g., with ÀLaMode transpiler.
	--external, -E	The `preact` dependency in `node_modules` will be temporary
	              	renamed to `_preact`, and a monkey-patching package that
	              	imports `＠externs/preact` will take its place. This is to allow
	              	bundles to import from _Preact_ installed as a script on a webpage,
	              	but exclude it from compilation. `preact` will be restored at the end.
	--patch, -P   	Patches the `preact` directory like in `external`, and waits for
	              	user input to restore it. Useful when linking packages and wanting
	              	to them from other projects.

  Example:

    depack source.js -o bundle.js -i -a -H
```

_Depack_ supports the following flags for both modes. Any additional arguments that are not recognised, will be passed directly to the compiler. For mode-specific arguments, see the appropriate section in this `README`.

<table>
  <tr><th>Argument</th><th>Short</th><th>Description</th></tr>
  <tr><td>source</td><td></td><td>The source entry to build.</td></tr>
  <tr><td>--output</td><td>-o</td><td>
    Where to save the output.
        Prints to <code>stdout</code> when not passed.
  </td>
  </tr>
  <tr><td>--debug</td><td>-d</td><td>
    The location of the file where to save sources after
        each pass.
  </td>
  </tr>
  <tr><td>--pretty-print</td><td>-p</td><td>
    Whether to apply the <code>--formatting=PRETTY_PRINT</code> flag.
  </td>
  </tr>
  <tr><td>--no-sourcemap</td><td>-S</td><td>Disable source maps.</td></tr>
  <tr><td>--verbose</td><td>-V</td><td>Print the exact command.</td></tr>
  <tr><td>--language_in</td><td>-I</td><td>
    The language of the input sources, years also accepted.
  </td>
  </tr>
  <tr><td>--language_out</td><td>-O</td><td>
    The language spec of the output, years accepted.
  </td>
  </tr>
  <tr>
    <td>--level</td>
    <td>-lvl</td>
    <td>
      The compilation level. Options:
          BUNDLE, WHITESPACE_ONLY, SIMPLE (default), ADVANCED.
    </td>
  </tr>
  <tr><td>--advanced</td><td>-a</td><td>Whether to enable advanced optimisation.</td></tr>
  <tr>
    <td>--no-warnings</td>
    <td>-w</td>
    <td>
      Do not print compiler's warnings by adding the
          <code>--warning_level QUIET</code> flag.
    </td>
  </tr>
  <tr><td>--version</td><td>-v</td><td>
    Shows the current <em>Depack</em> and <em>GCC</em> versions.
  </td>
  </tr>
  <tr><td>--help</td><td>-h</td><td>Prints the usage information.</td></tr>
</table>

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/2.svg?sanitize=true"></a></p>

## Bundle Mode

_Depack_ comes packed with a [JSX transpiler](https://github.com/a-la/jsx) that is based on Regular Expressions transforms. There are some limitations like currently non working comments, or inability to place `{}` and `<>` strings and functions (although the arrow functions are supported), but it works. What is also important is that the parser will quote the properties intended for html elements, but leave the properties unquoted for the components. This means that the properties' names will get mangled by the compiler, and can be used in code correctly. If they were quoted, then the code wouldn't be able to reference them because the compiler would change the variable names in code. If the properties to html elements were not quoted then the compiler would mangle them which would result in not-working behaviour. For example:

```jsx
import { render } from 'preact'

const Component = ({ hello, world }) => {
  return <div onClick={() => {
    console.log(hello)
  }} id={world} />
}

render(<Component hello="world" world="jsx" />, document.body)
```
```

```

Moreover, _GCC_ does not recognise the JSX files as source files, and the module resolution like `import ExampleComponent from './example-component'` does not work. Therefore, _Depack_ will generate a temp directory with the source code where the extension is added to the files. In future, it would be easier if the compiler just allowed to pass supported recognised extensions, or added JSX to their list.

Bundle mode is perfect for creating bundles for the web, be it JSX Preact components (we only focus on _Preact_ because our opinion is that Facebook is evil). _Depack_ was created exactly to avoid all the corporate tool-chains etc that the internet is full of, and _GCC_ is supported by `create-react-app` anyhow.

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/3.svg?sanitize=true"></a></p>

## Compile Mode

The **compile** mode is used to create Node.JS executable binaries. This is useful when a program might have many dependencies and it is desirable to publish the package without specifying any of them in the `"dependencies"` field of the `package.json` to speed up the install time and reduce the overall linking time in the package.

_Depack_ will recursively scan the files to detect `import from` and `export from` statements to construct the dependency list since the Google Closure Compile requires to pass all files (both source and paths to `package.json`s) used in compilation as arguments. Whenever an external dependency is detected, its `package.json` is inspected to find out either the `module` or `main` fields. In case when the `main` is found, the additional `--process_common_js_modules` will be set.

The main problem that _Depack_ solves is allowing to require internal Node.JS modules, e.g., `import { createReadStream } from 'fs'`. Traditionally, this was impossible because the compiler does not know about these modules and there is no way to pass the location of their `package.json` files. The strategy adopted by this software is to create proxies for internal packages in `node_modules` folder, for example:

```js
// node_modules/child_process/index.js
export default child_process
export const {
  ChildProcess,
  exec,
  execFile,
  execFileSync,
  execSync,
  fork,
  spawn,
  spawnSync,
} = child_process
```

```json5
// node_modules/child_process/package.json
{
  "name": "child_process",
  "main": "index.js"
}
```

The externs for internal modules are then passed in the arguments list, allowing the compiler to know how to optimise them. Finally, the wrapper is added to prepend the output of the compiler with the actual require calls:

```js
const path = require('path');
const child_process = require('child_process');
const vm = require('vm');
const _module = require('module'); // special case
%output%
```

There is another step which involves patching the dependencies which specify their `main` and `module` fields as the path to the directory rather than the file, which [GCC does not understand](https://github.com/google/closure-compiler/issues/3149).

Put all together, to compile the following file that contains different kinds of modules:

```js
import { createReadStream } from 'fs' // NodeJS module
import loading from 'indicatrix' // Dependency

const load = async () => {
  const packageJson = require.resolve('depack/package.json')
  const rs = createReadStream(packageJson)
  const depack = await new Promise((r) => {
    const d = []
    rs.on('data', data => d.push(data))
    rs.on('close', () => r(d.join('')))
  })
  const { 'version': version } = JSON.parse(depack)
  return version
}
const run = async () => {
  const l = load()
  const version = await loading('Depack version is loading', l)
  console.log(version)
}
(async () => {
  await run()
})()
```

The next _Depack_ command can be used:

```sh
depack example/example.js -c -V -a -w -p
# -c:      set mode to compile
# -V:      verbose output to print all flags and options
# -a:      allow for advanced compilation
# -w:      don't print warnings
# -p:      add formatting PRETTY_PRINT

# [-I 2018]: (default) set source code language to ECMA2018
# [-O 2017]: (default) set output language to ECMA2017
```

```
Modules' externs: node_modules/indicatrix/externs.js
java -jar /Users/zavr/node_modules/google-closure-compiler-java/compiler.jar \
--compilation_level ADVANCED --language_out ECMASCRIPT_2017 --formatting PRETTY_PRINT \
--warning_level QUIET --package_json_entry_names module,main --entry_point \
example/example.js --externs node_modules/@depack/externs/v8/fs.js --externs \
node_modules/@depack/externs/v8/stream.js --externs \
node_modules/@depack/externs/v8/events.js --externs \
node_modules/@depack/externs/v8/url.js --externs \
node_modules/@depack/externs/v8/global.js --externs \
node_modules/@depack/externs/v8/global/buffer.js --externs \
node_modules/@depack/externs/v8/nodejs.js --externs node_modules/indicatrix/externs.js \
--module_resolution NODE --output_wrapper \
#!/usr/bin/env node
'use strict';
const fs = require('fs');%output% --js \
node_modules/indicatrix/package.json node_modules/indicatrix/src/index.js \
node_modules/fs/package.json node_modules/fs/index.js example/example.js
Running Google Closure Compiler 20190709.           
```
```js
#!/usr/bin/env node
'use strict';
const fs = require('fs');             
const {createReadStream:g} = fs;
async function h(a) {
  const {interval:d = 250, writable:e = process.stdout} = {};
  a = "function" == typeof a ? a() : a;
  const b = e.write.bind(e);
  let c = 1, f = `${"Depack version is loading"}${".".repeat(c)}`;
  b(f);
  const k = setInterval(() => {
    c = (c + 1) % 4;
    f = `${"Depack version is loading"}${".".repeat(c)}`;
    b(`\r${" ".repeat(28)}\r`);
    b(f);
  }, d);
  try {
    return await a;
  } finally {
    clearInterval(k), b(`\r${" ".repeat(28)}\r`);
  }
}
;const l = async() => {
  var a = require.resolve("depack/package.json");
  const d = g(a);
  a = await new Promise(e => {
    const b = [];
    d.on("data", c => b.push(c));
    d.on("close", () => e(b.join("")));
  });
  ({version:a} = JSON.parse(a));
  return a;
}, m = async() => {
  var a = l();
  a = await h(a);
  console.log(a);
};
(async() => {
  await m();
})();
```

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/4.svg?sanitize=true" width="15"></a></p>

### Usage

There are _Depack_ specific flags that can be passed when compiling a Node.JS executable. These are:

<table>
  <tr><th>Argument</th><th>Short</th><th>Description</th></tr>
  <tr>
    <td>--compile</td>
    <td>-c</td>
    <td>
      Set the <em>Depack</em> mode to "compile" to create a Node.JS binary.
          Adds the <code>#!usr/bin/env node</code> at the top and sets +x permission.
    </td>
  </tr>
  <tr>
    <td>--library</td>
    <td>-l</td>
    <td>
      Set the <em>Depack</em> mode to "library" to create a Node.JS library.
          Initialises the <code>DEPACK_EXPORT</code> variable kept via an extern
          which is also exported as <code>module.exports</code>. The source code
          needs to assign the library to this variable.
    </td>
  </tr>
  <tr><td>--no-strict</td><td>-s</td><td>
    Whether to remove the <code>"use strict"</code> from the output.
  </td>
  </tr>
</table>

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/5.svg?sanitize=true" width="15"></a></p>

### Troubleshooting

There are going to be times when the program generated with _GCC_ does not work. The most common error that one would get is going to be similar to the following one:

```js
TypeError: Cannot read property 'join' of undefined
    at Ub (/Users/zavr/depack/depack/compile/depack.js:776:25)
    at Zb (/Users/zavr/depack/depack/compile/depack.js:816:13)
    at <anonymous>
```

This means the compiler has mangled some property on either the built-in _Node.JS_ or external module that broke the contract with the API. This could have happened due to the incorrect/out-of-date externs that are used in _Depack_. In our case, we tried to access the `spawnargs` property on the _ChildProcess_ in the `spawncommand` package, but it was undocumented, therefore the externs did not contain a record of it.

```js
const proc = spawn(command, args, options)
proc.spawnCommand = proc.spawnargs.join(' ')
```

The compiler will typically produce a warning when it does not know about referenced properties which is an indicator that you might end up with runtime errors:

```js
node_modules/@depack/depack/node_modules/spawncommand/src/index.js:54:
WARNING - Property spawnargs never defined on _spawncommand.ChildProcessWithPromise
  proc.spawnCommand = proc.spawnargs.join(' ')
                           ^^^^^^^^^
```

It might be difficult to understand where the problem is coming from when the source is obfuscated, especially when using external packages that the developer is not familiar with. To uncover where the problem really happens, one needs to compile the file without the source map and with pretty-print formatting using the `-S -p` options, and setup the debug launch configuration to stop at the point where the error happens:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Launch Transform",
  "program": "${workspaceFolder}/output/transform.js",
  "console": "integratedTerminal",
  "skipFiles": [
    "<node_internals>/**/*.js"
  ]
},
```

![Depack Debug](doc/debug.gif)

When the program is stopped there, it is required to hover over the parent of the object property that does not exist and see what class it belongs to. Once it's been identified, the source of the error should be understood which leads to the last step of updating the externs.

> Compiling without source maps will show how the property was mangled, however adding the source maps will point to the location of the problem precisely. However, in this particular case the source maps didn't even work for us.

We've found out that `spawnargs` was mangled because it was not defined in the externs files. There can be two reasons:

- firstly, incomplete externs. The solution in the first case is to fork and patch [_Depack/`externs`_](https://github.com/dpck/externs) and link them in your project. It is also possible to can create a separate externs file, where the API is extended, e.g.,
    ```js
    // externs.js
    /** @type {!Array<string>} */
    child_process.ChildProcess.prototype.spawnargs;
    ```
    The program can then be compiled again by pointing to the externs file with the `--externs` flag:
    ```sh
    depack source.js -c -a --externs externs.js
    ```
- secondly, using undocumented APIs. Fixed by not using these APIs, or to access the properties using the bracket notation such as `proc['spawnargs']`. However in this case, the `@suppress` annotation must be added
    ```js
    // Suppresses the warnings
    // spawncommand/src/index.js:54: WARNING - Cannot do '[]' access on a struct
    // proc.spawnCommand = proc['spawnargs'].join(' ')
    //                          ^^^^^^^^^^^
    /** @suppress {checkTypes} */
    proc.spawnCommand = proc['spawnargs'].join(' ')
    return proc
    ```

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/6.svg?sanitize=true" width="20"></a></p>

#### Bugs In GCC

In might be the case that externs are fine, but the _Google Closure Compiler_ has a bug in it which leads to incorrect optimisation and breaking of the program. These cases are probably rare, but might happen. If this is so, you need to compile without `-a` (ADVANCED optimisation) flag, which will mean that the output is very large. Then you can try to investigate what went wrong with the compiler by narrowing down on the area where the error happens and trying to replicate it in a separate file, and using `-d debug.txt` _Depack_ option when compiling that file to save the output of each pass to the `debug.txt` file, then pasting the code from each step in there to _Node.JS_ REPL and seeing if it outputs correct results.

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/7.svg?sanitize=true" width="20"></a></p>

#### External APIs

When reading and writing files from the filesystem such as a `package.json` files, or loading JSON data from the 3rd party APIs, their properties must be referred to using the quoted notation, e.g.,

```js
// reading
const content = await read(packageJson)
const {
  'module': mod,
  'version': version,
} = JSON.parse(f)

// writing
await write('package.json', {
  'module': 'test/index.mjs',
})

// loading API
const { 'results': results } = await request('https://service.co/api')
```

because otherwise the properties' names get changed by the compiler and the result will not be what you expected it to be. In case of loading external APIs, it's a good idea to create an extern file and defining the known properties there:

<table>
<tr><th>Externs</th><th>Source</th></tr>
<tr><td>

```js
// externs/api.js
/** @const */
var _externalAPI
/** @type {!Array<string>} */
_externalAPI.results
```
</td><td>

```js
// source.js
const { results } = /** @type {_externalAPI} */ ( // cast the type
  await request('https://service.co/api')
)
```
</td>
</table>


<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/8.svg?sanitize=true"></a></p>

## CommonJS Compatibility

Depack works best with ES6 modules. All new code should be written with `import/export` statements because it's the standard that takes the implementations away from hacking assignments to `module.exports` which people used to use in a variety of possibly imaginable ways, e.g.,

<details>
<summary>Show <code>lazyProperty</code> use from <code>depd</code></summary>

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
<summary>Show <code>module.exports</code> use from <code>debug</code></summary>

```js
module.exports = require('./common')(exports);

const {formatters} = module.exports;
```
</summary>
</details>

Unlike the examples above, the infrastructure built with _Depack_ always uses modules when writing JavaScript, because that's the main static analysis method supported by _Depack_. The require statements are also supported, but when a require is broken up by a comment like `require(/*depack*/)`, it is kept and the module will be statically loaded.

_ES6 modules_ make the correct static analysis of programs possible since exports now are not some random object that can change at runtime in code, but a set of APIs, i.e., `default` and `named` exports. When every single dependency of the compiled file is a module, there are no issues or special things to think about. However, when a package tries to use a CommonJS module, there are the following compatibility rules dictated by the current version of _GCC_.

### Enabling Processing Of CommonJS Modules

The Closure Compiler requires a special flag `--process_common_js_modules` to enable processing CommonJS modules, otherwise, files will be treated as ES6 modules and when trying to make an import, there would be a warning saying "The package does not export the required module":

<table>
<tr><th colspan="2"></th></tr>
<tr><td>

```js
// ecma.js
import commonJs from './common-js'

console.log('requiring a common js from ecma:')
console.log(commonJs)



// The default import using the import keyword 🙏🏾
// 2018+ JavaScript <3
```
</td><td>

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
</td></tr>
<tr><td  colspan="2"></td></tr>
<tr><td colspan="2">

```js
Exit code 1
e/2/index.js:2: ERROR - [JSC_DOES_NOT_HAVE_EXPORT] Requested module does not have an export "default".
import commonJs from './common-js'
^

1 error(s), 0 warning(s)

```
</td></tr>
<tr><td colspan="2"></td></tr>
</table>

_Depack_ will perform static analysis by looking at all dependencies recursively. When it sees an import (or require statement) that references an external package, it will find its `package.json` to find out the `main` and `module` fields. If the `main` field is found, the package is marked as _CommonJS_ module, and the flag will be added. Having a `require` statement in the source code on its own does not trigger the addition of the flag, so that packages can be imported dynamically with `require` if that is what is required. This can be used, for example, to get the current version of the package:

```js
const version = require('../package.json')['version']
console.log(version)
```

And the compiler will leave the `require` call as it is because there was no `process_common_js_modules` flag. However, if there were packages in CommonJS format (required via the `main` field of their `package.json`), ALL requires will be processed. If _Depack_ didn't detect a CommonJS module when you know there is one, just add the flag manually. _Depack_ also assumes that all source code is in ES6 format.

### Single Default Export

> The idea is actually that you can do the following, <em>
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
commonJs('hello')
commonJs.named('world')
```
</td></tr>
<tr><td colspan="2">There are no named exports to be used in destructuring of the <code>import</code> statement.</td></tr>
<tr><td colspan="2">

```js
// ecma.js
import commonJs from './common-js'

console.log('requiring a common js from ecma:')
console.log(commonJs)



// The default import using the import keyword 🙏🏾
// 2018+ JavaScript <3
```
</td></tr>
<tr><td colspan="2"><em>ECMA modules'</em> compatibility works by calling the default export from code, and named exports from within the imported object's namespace, i.e., without named imports but by referencing the imported object.</td></tr>
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
// common-js2.js
module.exports = () => {
  console.log('default common js export2')
}
module.exports['named'] = () => {
  console.log('named common js export2')
}




// standard node require way to import
```
</td></tr>
<tr><td colspan="2">The <em>CommonJS</em> can be required by other <em>CommonJS</em> modules in the standard <code>require</code> way.</td></tr>
</table>


<table>
<tr><th colspan="2">Default importing of CommonJS module works by assigning the default export to the default import and named exports as its properties.</th></tr>
<tr><td>

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
console.log("requiring a cjs from cjs:");
console.log(a);
console.log("requiring a common js from ecma:");
console.log(b);
```
</details>
</td>
<td>

```js
requiring a cjs from cjs:
{ [Function: a] named: [Function] }
requiring a common js from ecma:
{ [Function: b] named: [Function] }
```
</td></tr>
</table>




### Using Babel-Compiled CommonJS

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

<details>
<summary>Show Code</summary>

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
</details>
</td>
</tr>
</table>

Since _Compiler_`v20190709`, the modules imports from _Babel_ have been working semi-correctly, because the default import is not compatible with the way that the default object is exported (see below).
 _The script to import Babel-compiled modules in Closure Compiler is now:_

```js
import erte from '@fixture/babel'

console.log(erte.default())
console.log(erte.c(''))
console.log(erte.b(''))
```

<table>
<tr><th colspan="2"><em>Command & Generated JS</em></th></tr>
<tr><td colspan="2">

```

```
</td></tr>
<tr><td colspan="2">The command generates some warnings, but no errors.</td></tr>
</table><table>
<tr><th colspan="2"><em>The generated code and output</em></th></tr>
<tr><td>

```js
Exit code 1
e/b.js:1: ERROR - [JSC_JS_MODULE_LOAD_WARNING] Failed to load module "../b"
import erte from '../b'
^

1 error(s), 0 warning(s)

```

</td><td>

```js
erte
c
b
```
</td></tr>
<tr><td colspan="2">_Trying to execute the output produces the correct result. OK, but what happens when we actually try to execute such program with <code>@babel/register</code>? This is needed for testing and development.</td></tr>
<tr><td>

```ts
MacBook:fixture-babel zavr$ node erte
erte/erte.js:7
console.log(_build.default.default());
                                  ^

TypeError: _build.default.default is not a function
    at Object.<anonymous> (erte/erte.js:3:13)
    at Module._compile (module.js:653:30)
    at Module._compile (node_modules/pirates/lib/index.js:99:24)
    at Module._extensions..js (module.js:664:10)
    at Object.newLoader [as .js] (node_modules/pirates/lib/index.js:104:7)
    at Module.load (module.js:566:32)
    at tryModuleLoad (module.js:506:12)
    at Function.Module._load (module.js:498:3)
    at Module.require (module.js:597:17)
    at require (internal/module.js:11:18)
```
</td><td>

**Conclusion**
- [ ] no ide support
- [ ] no development environment
- [ ] default.default

</td></tr>
<tr><td colspan="2">Because of referring to the default import as .default, the compatibility with <em>Babel</em> is broken. It's better to use <a href="https://github.com/a-la/alamode/"><em>ÀLaMode</em></a> which is compatible with Closure Compiler.</td></tr>
</table>

---

> <a name="importing--named--modules">Importing `{ named }` modules</a> on Babel-compiled modules is not supported because they are still _require.js_ modules! The example below demonstrates what happens:

```js
import erte, { c, b } from '@fixture/babel'

console.log(erte())
console.log(c())
console.log(b())
```

<table>
<tr><th><em>Command & Generated JS</em></th></tr>
<tr><td>

```
java -jar /Users/zavr/node_modules/google-closure-compiler-java/compiler.jar \
--compilation_level ADVANCED --language_out ECMASCRIPT_2017 --formatting PRETTY_PRINT \
--process_common_js_modules --package_json_entry_names module,main --entry_point e/1.js \
--externs node_modules/@depack/externs/v8/global.js --externs \
node_modules/@depack/externs/v8/global/buffer.js --externs \
node_modules/@depack/externs/v8/nodejs.js
Dependencies: @a-la/fixture-babel
Running Google Closure Compiler 20190709...         
```
</td></tr>
<tr><td><code>depack e/1 -c -a -p --process_common_js_modules</code>
<strong>stderr</strong></td></tr>
<tr><td>

```js
Exit code 2
e/1.js:1: ERROR - [JSC_DOES_NOT_HAVE_EXPORT] Requested module does not have an export "b".
import erte, { c, b } from '@a-la/fixture-babel'
^

e/1.js:1: ERROR - [JSC_DOES_NOT_HAVE_EXPORT] Requested module does not have an export "c".
import erte, { c, b } from '@a-la/fixture-babel'
^

2 error(s), 0 warning(s)

```
</td></tr>
<tr><td><strong>stdout</strong>

<code><EMPTY></code>

The named import syntax on <em>CommonJS</em> modules is not supported unless there is an ECMA6 version of the script which will be detected by static analysis in the <code>module</code> field of the <em>package.json</em> file. Therefore it's good idea to publish the module also with the build for the compiler to include the source code of the package in another package being built.</td></tr>
</table>


<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/9.svg?sanitize=true"></a></p>

## API

This package only publishes a binary. The API is available via the [_@Depack/depack_](https://github.com/dpck/src) package.

```js
import { Bundle, Compile } from '@depack/depack'

(async () => {
  await Bundle(...)
  await Compile(...)
})
```

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/10.svg?sanitize=true"></a></p>

## Known Bugs

There are a few insignificant known issues with _Google Closure Compiler_.

1. Cannot do `import '.'`: change to `import './'`.
    ```js
    // dot.js
    import test from '.'
    test()
    ```
    ```js
    // index.js
    export default () => {
      console.log('test')
    }
    ```
    <details>
    <summary>Show Dot Error</summary>

    ```
    Exit code 1
    example/bugs/dot.js:2: ERROR - [JSC_JS_MODULE_LOAD_WARNING] Failed to load module "."
    import test from '.'
    ^
    
    1 error(s), 0 warning(s)
    
    ```
    </details>
1. `node_modules` are not looked up higher than the `cwd`.
1. Cannot import _json_ files. Use `require`.
    ```js
    import data from './data.json'
    console.log(data)
    ```
    <details>
    <summary>Show JSON Error</summary>

    ```
    Exit code 1
    example/bugs/json.js:1: ERROR - [JSC_CANNOT_PATH_IMPORT_CLOSURE_FILE] Cannot import Closure files by path. Use either import goog:namespace or goog.require(namespace)
    import data from './data.json'
    ^
    
    1 error(s), 0 warning(s)
    
    ```
    </details>

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/11.svg?sanitize=true"></a></p>

## Org Structure

- [[**dpck**](https://github.com/dpck)] The GitHub org.
- [[**@depack**](https://npmjs.com/org/depack)] The NPM scope.
- [[@depack/form](https://dpck.github.io/form/)] Bootstrap Form.
- [[@depack/router](https://dpck.github.io/router/)] Front-end router.
- [[@depack/render](https://github.com/dpck/render)] Render server-side HTML from JSX.
- [[@depack/context](https://github.com/dpck/context)] Testing context for unit-testing.

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/12.svg?sanitize=true"></a></p>

## Notes

- The static analysis might discover built-in and other modules even if they were not used, since no tree-shaking is performed.
- [2 March 2019] Current bug does not let compile later `jsx` detection. Trying to compile front-end bundler with _Depack_.

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/13.svg?sanitize=true"></a></p>

## Copyright

<table>
  <tr>
    <th>
      <a href="https://artd.eco">
        <img src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png" alt="Art Deco">
      </a>
    </th>
    <th>© <a href="https://artd.eco">Art Deco</a> for <a href="https://artd.eco/depack">Depack</a> 2019</th>
    <th>
      <a href="https://www.technation.sucks" title="Tech Nation Visa">
        <img src="https://raw.githubusercontent.com/artdecoweb/www.technation.sucks/master/anim.gif"
          alt="Tech Nation Visa">
      </a>
    </th>
    <th><a href="https://www.technation.sucks">Tech Nation Visa Sucks</a></th>
  </tr>
</table>

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/-1.svg?sanitize=true"></a></p>