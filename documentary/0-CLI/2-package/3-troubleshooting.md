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

%EXAMPLE: t/child_process.js%

Where `spawnargs` was not defined in the externs files. The solution is to submit a patch to _Depack_, and before its accepted, use the `--node-externs` flag that points to the location of Node.JS externs that will override the existing externs. Thus, if there is a problem in `child_process` externs, their contents should be copied from https://github.com/artdecocode/depack/blob/master/externs/child_process.js and updated in place. Then the program can be compiled again:

```sh
depack t/transform.js -c -I 2018 -O 2017 -a
  -o output/transform.js
  --node-externs ./externs
```

If there are problems with global Node.JS externs, the `node.js` extern file should be overridden in your project (don't forget to submit the patch to _Depack_).

%~ width="15"%

#### Bugs In GCC

In might be the case that externs are fine, but the Closure Compiler has a bug in it which leads to incorrect optimisation and breaking of the program. These cases are probably rare, but might happen. If this is so, you need to compile without `-a` (ADVANCED optimisation) flag, which will mean that the output is very large. Then you can try to investigate what went wrong with the compiler by narrowing down on the area where the error happens and trying to replicate it in a separate file, and using `--print_source_after_each_pass` Compiler option when compiling that file to see the output of each pass, then pasting the code to Node.JS REPL and seeing if it outputs correct results.

%~ width="15"%

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