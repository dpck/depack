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

%EXAMPLE: example/example.js%

The next _Depack_ command can be used:

```sh
depack example/example.js -c -V -I 2018 -O 2017 -a -w --formatting PRETTY_PRINT
# -c:      set mode to compile
# -V:      verbose output to print all flags and options
# -I 2018: set source code language to ECMA2018
# -O 2017: set output language in to ECMA2017
# -a:      allow for advanced compilation
# -w:      don't print warnings
```

%FORKERR src/bin example/example.js -c -V -I 2018 -O 2017 -a -w --formatting PRETTY_PRINT --_suppress-loading%

%FORK-js src/bin example/example.js -c -V -I 2018 -O 2017 -a -w --formatting PRETTY_PRINT%