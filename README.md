# depack

[![npm version](https://badge.fury.io/js/depack.svg)](https://npmjs.org/package/depack)

`depack` Is The Bundler To Create Front-End (JS) Bundles And Back-End (Node.JS) Compiled Packages With Google Closure Compiler.

```sh
yarn add -E depack
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [**CLI**](#cli)
- [Bundle Mode](#bundle-mode)
- [Compile Mode](#compile-mode)
  * [Usage](#usage)
  * [Gotchas](#gotchas)
    * [Do not output to `ECMA2018`](#do-not-output-to-ecma2018)
    * [Patch Closure Compiler For Correct `ECMA2017`](#patch-closure-compiler-for-correct-ecma2017)
    * [Babel-Compiled Dependencies Don't Work](#babel-compiled-dependencies-dont-work)
  * [Troubleshooting](#troubleshooting)
    * [Bugs In GCC](#bugs-in-gcc)
    * [External APIs](#external-apis)
- [Known Bugs](#known-bugs)
- [Org Structure](#org-structure)
- [Notes](#notes)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/0.svg?sanitize=true"></a></p>

## **CLI**

The package `depack` can be used from the command line interface to create bundles or compiled packages for the given entry file.

```sh
depack -h
```

```
Google Closure Compiler-based packager for front and back-end.
https://github.com/dpck/depack
Performs static analysis on the source files to find out all dependencies.
Generic flags: https://github.com/google/closure-compiler/wiki/Flags-and-Options

  depack SOURCE [-c] [-o output.js] [-IO 2018] [-awVvh] [-l LEVEL] [... --generic-args]

	SOURCE            	The source file to build.
	--output, -o      	Where to save the output. STDOUT by default.
	--language_in, -I 	Language Input. Can pass ECMA year.
	--language_out, -O	Language Output. Can pass ECMA year.
	--level, -l       	The optimisation level (generic -O).
	                  	WHITESPACE, SIMPLE (default), ADVANCED
	--advanced, -a    	Turn on advanced optimisation.
	--no-warnings, -w 	Don't print warnings.
	--compile, -c     	Set the mode to compilation.
	--verbose, -V     	Print all compiler arguments.
	--pretty-print, -p	Add --formatting=PRETTY_PRINT flag.
	--version, -v     	Show version.
	--help, -h        	Print help information.
	--no-sourcemap, -S	Do not add source maps.

BACKEND: Creates a single executable file.
  depack SOURCE -c [-o output.js] [-s]

	--no-strict -s	Remove "use strict" from the output.

  Example:

    depack source.js -c -o bundle.js -I 2018 -O 2018

FRONTEND: Creates a bundle for the web.
  depack SOURCE [-o output.js] [-H]

	-H	Add import { h } from 'preact' to files.

  Example:

    depack source.js -o bundle.js -I 2018 -H
```

_Depack_ supports the following flags for both modes. Any additional arguments that are not recognised, will be passed directly to the compiler.


|          Flag          |                                                                                    Description                                                                                    |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--output`, `-o`       | The output path. Will print to `STDOUT` when not specified.                                                                                         |
| `--language_in`, `-I`  | The version of the language of the input file. Analogues to the original Closure flag, but supports passing just the year to set the ECMA version, e.g., `-I 2018` is acceptable. |
| `--language_out`, `-O` | The version of the language of the output file. The year can also be passed.                                                                                                      |
| `--level`, `-l`        | The optimisation level, which is the same as passing the Closure's `-O` flag. Can be `WHITESPACE`, `SIMPLE` and `ADVANCED`. |
| `--advanced`, `-a`     | Sets the optimisation level to `ADVANCED`, i.e., the shortcut for `--level ADVANCED`                                            |
| `--no-warnings`, `-w`  | Suppresses the warnings.                                                                                                                                                          |
| `--verbose`, `-V`      | Prints the raw command line arguments passed to the compiler.                                                                                                                     |
| `--no-sourcemap`, `-S` | Disable generation of the source maps.                                                                                                                                            |
| `--version`, `-v`      | Displays the _Depack_ version.                                                                                                                                                    |
| `--help`, `-h`         | Show the help information about the usage.                                                                                                                                        |

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/1.svg?sanitize=true"></a></p>

## Bundle Mode

The bundle mode is used to create front-end bundles. It discovers all imported dependencies in the project.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/2.svg?sanitize=true"></a></p>

## Compile Mode

The **compile** mode is used to create Node.JS executable binaries. This is useful when a program might have many dependencies and it is desirable to publish the package without specifying any of them in the `"dependencies"` field of the `package.json` to speed up the install time and reduce the overall linking time in the package.

_Depack_ will recursively scan the files to detect `import from` and `export from` statements to construct the dependency list since the Google Closure Compile requires to pass all files (both source and paths to `package.json`s) used in compilation as arguments. Whenever an external dependency is detected, its `package.json` is inspected to find out either the `module` or `main` fields. In case when the `main` is found, the additional `--process_common_js_modules` will be set.

The main problem that _Depack_ solves is allowing to require internal Node.JS modules, e.g., `import { createReadStream } from 'fs'`. Traditionally, this was impossible because the compiler does not know about these modules and there is no way to pass the location of their `package.json` files. The strategy adopted by this software is to create proxies for internal packages in `node_modules` folder, for example:

```js
// node_modules/child_process/index.js
export default child_process
export const {
  'ChildProcess': ChildProcess,
  'exec': exec,
  'execFile': execFile,
  'execFileSync': execFileSync,
  'execSync': execSync,
  'fork': fork,
  'spawn': spawn,
  'spawnSync': spawnSync,
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
depack example/example.js -c -V -I 2018 -O 2017 -a -w --formatting PRETTY_PRINT
# -c:      set mode to compile
# -V:      verbose output to print all flags and options
# -I 2018: set source code language to ECMA2018
# -O 2017: set output language to ECMA2017 (the best)
# -a:      allow for advanced compilation
# -w:      don't print warnings
```

```
-jar /Users/zavr/node_modules/google-closure-compiler-java/compiler.jar --compilation_level ADVANCED --language_in ECMASCRIPT_2018 --language_out ECMASCRIPT_2017 --formatting PRETTY_PRINT --module_resolution NODE --package_json_entry_names module,main --externs externs/fs.js --externs externs/events.js --externs externs/stream.js --externs externs/node.js --process_common_js_modules --output_wrapper #!/usr/bin/env node
const fs = require('fs');
%output% --js node_modules/indicatrix/package.json node_modules/indicatrix/build/index.js node_modules/fs/package.json node_modules/fs/index.js example/example.js
```

```js
#!/usr/bin/env node
const fs = require('fs');
'use strict';
async function g(a) {
  const {interval:c = 250, writable:f = process.stdout} = {};
  a = "function" == typeof a ? a() : a;
  const b = f.write.bind(f);
  let d = 1, e = `${"Depack version is loading"}${".".repeat(d)}`;
  b(e);
  const h = setInterval(() => {
    d = (d + 1) % 4;
    e = `${"Depack version is loading"}${".".repeat(d)}`;
    b(`\r${" ".repeat(28)}\r`);
    b(e);
  }, c);
  try {
    return await a;
  } finally {
    clearInterval(h), b(`\r${" ".repeat(28)}\r`);
  }
}
;const {createReadStream:k} = fs;
const l = async() => {
  var a = require.resolve("depack/package.json");
  const c = k(a);
  a = await new Promise((a) => {
    const b = [];
    c.on("data", (a) => b.push(a));
    c.on("close", () => a(b.join("")));
  });
  ({version:a} = JSON.parse(a));
  return a;
}, m = async() => {
  var a = l();
  a = await g(a);
  console.log(a);
};
(async() => {
  await m();
})();
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/3.svg?sanitize=true" width="15"></a></p>

### Usage

There are _Depack_ specific flags that can be passed when compiling a Node.JS executable. These are:


|        Flag         |                      Description                       |
| ------------------- | ------------------------------------------------------ |
| `--compile`, `-c`   | Enables the compilation mode.                          |
| `--no-strict`, `-s` | Removes the `'use strict';` statement from the output. |

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/4.svg?sanitize=true" width="15"></a></p>

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
 */


const c = () => {
  return 'c';
};
/**
 * A function that returns `b`.
 */


exports.c = c;

const b = () => {
  return 'b';
};

exports.b = b;
var _default = erte;
exports.default = _default;
```
</td>
</tr>
</table>

_Script to compile with GCC:_

```js
import erte, { c, b } from '@a-la/fixture-babel'

console.log(erte())
console.log(c())
console.log(b())
```

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

```js
/Users/zavr/depack/depack/example/babel-output.js:8
console.log(a());
            ^

TypeError: a is not a function
    at Object.<anonymous> (/Users/zavr/depack/depack/example/babel-output.js:8:13)
    at Module._compile (module.js:653:30)
    at Object.Module._extensions..js (module.js:664:10)
    at Module.load (module.js:566:32)
    at tryModuleLoad (module.js:506:12)
    at Function.Module._load (module.js:498:3)
    at Function.Module.runMain (module.js:694:10)
    at startup (bootstrap_node.js:204:16)
    at bootstrap_node.js:625:3
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/5.svg?sanitize=true" width="15"></a></p>

### Troubleshooting

There are going to be times when the program generated with GCC does not work. The most common error that one would get is going to be similar to the following one:

```js
console.log(b.a.join(" "));
                ^

TypeError: Cannot read property 'join' of undefined
```

This means the compiler has mangled some property on the builtin module that broke the contract with the Node.JS API. This could have happened due to the incorrect/out-of-date externs that are used in _Depack_. The solution to this is to compile the file without the source map and with pretty-print formatting using the `-S -p` options, and setup the debug launch configuration to stop at the point where the error happens:

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

![Depack Debug](doc/debug.jpg)

When the program is stopped there, it is required to hover over the parent of the object property that does not exist and see what class it belongs to. Once it's been identified, the source of error should be understood which leads to the last step of updating the externs. For this particular example, the program was:

```js
import { spawn } from 'child_process'

const p = spawn('echo', ['hello world'])
console.log(p.spawnargs.join(' '))
```

Where `spawnargs` was not defined in the externs files. The solution is to submit a patch to _Depack_, and before its accepted, use the `--node-externs` flag that points to the location of Node.JS externs that will override the existing externs. Thus, if there is a problem in `child_process` externs, their contents should be copied from https://github.com/dpck/depack/blob/master/externs/child_process.js and updated in place. Then the program can be compiled again:

```sh
depack t/transform.js -c -I 2018 -O 2017 -a
  -o output/transform.js
  --node-externs ./externs
```

If there are problems with global Node.JS externs, the `node.js` extern file should be overridden in your project (don't forget to submit the patch to _Depack_).

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/6.svg?sanitize=true" width="15"></a></p>

#### Bugs In GCC

In might be the case that externs are fine, but the Closure Compiler has a bug in it which leads to incorrect optimisation and breaking of the program. These cases are probably rare, but might happen. If this is so, you need to compile without `-a` (ADVANCED optimisation) flag, which will mean that the output is very large. Then you can try to investigate what went wrong with the compiler by narrowing down on the area where the error happens and trying to replicate it in a separate file, and using `--print_source_after_each_pass` Compiler option when compiling that file to see the output of each pass, then pasting the code to Node.JS REPL and seeing if it outputs correct results.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/7.svg?sanitize=true" width="15"></a></p>

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

because otherwise the properties' names get changed by the compiler and the result will not be what you expected it to be.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/8.svg?sanitize=true"></a></p>



## Known Bugs

There are a number of known bugs with Google Closure Compiler.

1. Cannot do `require('.')`.
1. Cannot destructure error in `catch` block.
1. node_modules are not looked up higher than the `cwd`.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/9.svg?sanitize=true"></a></p>

## Org Structure

- [[**dpck**](https://github.com/dpck)] The GitHub org.
- [[**@depack**](https://npmjs.com/org/depack)] The NPM scope.
- [[@depack/form](https://dpck.github.io/form/)] Bootstrap Form.
- [[@depack/router](https://dpck.github.io/router/)] Front-end router.
- [[@depack/render](https://github.com/dpck/render)] Render server-side HTML from JSX.
- [[@depack/context](https://github.com/dpck/context)] Testing context for unit-testing.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/10.svg?sanitize=true"></a></p>

## Notes

- The static analysis might discover built-in and other modules even if they were not used, since no tree-shaking is performed.
- [2 March 2019] Current bug does not let compile later `jsx` detection. Trying to compile front-end bundler with _Depack_.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/11.svg?sanitize=true"></a></p>

## Copyright

<table>
  <tr>
    <th>
      <a href="https://artd.eco">
        <img src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png" alt="Art Deco" />
      </a>
    </th>
    <th>
      © <a href="https://artd.eco">Art Deco</a> for <a href="https://artd.eco/depack">Depack</a>
      2019
    </th>
    <th>
      <a href="https://www.technation.sucks" title="Tech Nation Visa">
        <img src="https://raw.githubusercontent.com/artdecoweb/www.technation.sucks/master/anim.gif" alt="Tech Nation Visa" />
      </a>
    </th>
    <th>
      <a href="https://www.technation.sucks">Tech Nation Visa Sucks</a>
    </th>
  </tr>
</table>

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-1.svg?sanitize=true"></a></p>