## **CLI**

The package `depack` can be used from the command line interface to create bundles or compiled packages for the given entry file.

```sh
depack -h
```

%FORK src/bin/depack --help%

_Depack_ supports the following flags for both modes. Any additional arguments that are not recognised, will be passed directly to the compiler.

%TABLE-MACRO Usage
  `--$1`, `-$2`, $3
%

```table Usage
[
  ["Flag", "Short", "Description"],
  [
    "output", "o",
    "The output path. Will print to `STDOUT` when not specified."
  ],
  [
    "language_in", "I",
    "The version of the language of the input file. Analogues to the original Closure flag, but supports passing just the year to set the ECMA version, e.g., `-I 2018` is acceptable."
  ],
  [
    "language_out", "O",
    "The version of the language of the output file. The year can also be passed."
  ],
  [
    "level", "l",
    "The optimisation level, which is the same as passing the Closure's `-O` flag. Can be `WHITESPACE`, `SIMPLE` and `ADVANCED`."
  ],
  [
    "advanced", "a",
    "Sets the optimisation level to `ADVANCED`, i.e., the shortcut for `--level ADVANCED`"
  ],
  [
    "no-warnings", "w",
    "Suppresses the warnings."
  ],
  [
    "verbose", "V",
    "Prints the raw command line arguments passed to the compiler."
  ],
  [
    "no-sourcemap", "S",
    "Disable generation of the source maps."
  ],
  [
    "version", "v",
    "Displays the _Depack_ version."
  ],
  [
    "help", "h",
    "Show the help information about the usage."
  ]
]
```

%~%