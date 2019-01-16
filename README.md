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
    * [no-strict](#no-strict)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/0.svg?sanitize=true"></a></p>

## **CLI**

The package `depack` can be used from the command line interface to create bundles or compiled packages for the given entry file.

```sh
depack -h
```

```
Google Closure Compiler-based packager for front and back-end.
https://github.com/artdecocode/depack
Performs static analysis on the source files to find out all dependencies.
Generic flags: https://github.com/google/closure-compiler/wiki/Flags-and-Options

  depack SOURCE [-c] [-o output.js] [-IO 2018] [-awVvh] [-l LEVEL] [... --generic-args]

	SOURCE           	The source file to build.
	--output -o      	Where to save the output. STDOUT by default.
	--language_in -I 	Language Input. Can pass ECMA year.
	--language_out -O	Language Output. Can pass ECMA year.
	--level -l       	The optimisation level (generic -O).
	                 	WHITESPACE, SIMPLE (default), ADVANCED
	--advanced -a    	Turn on advanced optimisation.
	--no-warnings -w 	Don't print warnings.
	--compile -c     	Set the mode to compilation.
	--verbose -V     	Print all compiler arguments.
	--version -v     	Show version.
	--help -h        	Print help information.

[34mBACKEND[0m: Creates a single executable file.
  depack SOURCE -c [-o output.js] [-s]

	--no-strict -s	Remove "use strict" from the output.

  Example:

    depack source.js -c -o bundle.js -I 2018 -O 2018
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
| `--version`, `-v`      | Displays the _Depack_ version.                                                                                                                                                    |
| `--help`, `-h`         | Show the help information about the usage.                                                                                                                                        |

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/1.svg?sanitize=true"></a></p>

## Bundle Mode

The bundle mode is used to create front-end bundles. It discovers all imported dependencies in the project.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/2.svg?sanitize=true"></a></p>

## Compile Mode

The **compile** mode is used to create Node.JS executable binaries. This is useful when a program might have many dependencies and it is desirable to publish the package without specifying any of them in the `"dependencies"` field of the `package.json` to speed up the install time and reduce the overall linking time in the package.

_Depack_ will recursively scan the files to detect `import from` and `export from` statements to construct the dependency list since the Google Closure Compile requires to pass all files (both source and paths to `package.json`s) used in compilation as arguments. Whenever an external dependency is detected, its `package.json` is inspected to find out either the `module` or `main` fields. In case when the `main` is found, the additional `--process_common_js_modules` will be set.

The main problem which _Depack_ solves is allowing to require internal Node.JS modules, e.g., `import { createReadStream } from 'fs'`. Traditionally, this was impossible because the compiler does not know about these modules and there is no way to pass the location of their `package.json` files. The strategy adopted by this software is to create proxies for internal packages in `node_modules` folder, for example:

```js
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

The externs for internal modules are then passed in the arguments list, allowing the compiler to know how to optimise them. Finally, the wrapper is added to prepend the output of the compiler with the actual require calls:

```js
const path = require('path');
const child_process = require('child_process');
const vm = require('vm');
const _module = require('module'); // special case
%output%
```

There is another step which involves patching the dependencies which specify their `main` and `module` fields as the path to the directory rather than the file, which [GCL does not understand](https://github.com/google/closure-compiler/issues/3149).

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

### Usage

There are _Depack_ specific flags that can be passed when compiling a Node.JS executable. These are:


|        compile         |                           c                            | Enables the compilation mode. |
| ---------------------- | ------------------------------------------------------ |
| --<a name="no-strict">no-strict</a>, `-s` | Removes the `'use strict';` statement from the output. |

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/3.svg?sanitize=true"></a></p>



## Copyright

(c) [Art Deco][1] 2019

[1]: https://artd.eco

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-1.svg?sanitize=true"></a></p>