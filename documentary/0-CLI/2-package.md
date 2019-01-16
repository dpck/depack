## Compile Mode

The compile mode is used to create Node.JS executable binaries. This is useful when a program might have many dependencies and it is desirable to publish the package without specifying any of them in the `"dependencies"` field of `package.json` to speed up the install time and reduce the overall linking time in the package.

_Depack_ will recursively scan the files to detect `import from` and `export from` statements to build the dependency tree since the Google Closure Compile requires to pass all files (both source and paths to dependencies' `package.json`) used in compilation as arguments. The packages are scanned for the presence of `module` field, and if it is not found, falls back to `main` record, in which case the additional `--process_common_js_modules` will be set.

%~%