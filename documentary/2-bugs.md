## Known Bugs

There are a number of known bugs with Google Closure Compiler.

1. Cannot do `require('.')`.
1. Cannot destructure error in `catch` block.
1. node_modules are not looked up higher than the `cwd`.

%~%