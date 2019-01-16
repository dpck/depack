# depack

[![npm version](https://badge.fury.io/js/depack.svg)](https://npmjs.org/package/depack)

`depack` Is The Bundler To Create Front-End (JS) Bundles And Back-End (Node.JS) Compiled Packages With Google Closure Compiler.

```sh
yarn add -E depack
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [CLI](#cli)
- [Bundle Mode](#bundle-mode)
- [Compile Mode](#compile-mode)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/0.svg?sanitize=true"></a></p>

## CLI

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

    depack source.js -c -o bundle.js -n -I 2018 -O 2018
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/1.svg?sanitize=true"></a></p>

## Bundle Mode

The bundle mode is used to create front-end bundles. It discovers all imported dependencies in the project.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/2.svg?sanitize=true"></a></p>

## Compile Mode

The compile mode is used to create Node.JS executable binaries. This is useful when a program might have many dependencies and it is desirable to publish the package without specifying any of them in the `"dependencies"` field of `package.json` to speed up the install time and reduce the overall linking time in the package.

_Depack_ will recursively scan the files to detect `import from` and `export from` statements to build the dependency tree since the Google Closure Compile requires to pass all files (both source and paths to dependencies' `package.json`) used in compilation as arguments. The packages are scanned for the presence of `module` field, and if it is not found, falls back to `main` record, in which case the additional `--process_common_js_modules` will be set.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/3.svg?sanitize=true"></a></p>



## Copyright

(c) [Art Deco][1] 2019

[1]: https://artd.eco

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-1.svg?sanitize=true"></a></p>