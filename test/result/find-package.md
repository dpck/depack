// finds the package
test

/* expected */
{
  "entry": "test/fixture/node_modules/test/index.js",
  "packageJson": "test/fixture/node_modules/test/package.json"
}
/**/

// resolve the package's main a directory
test4

/* expected */
{
  "entry": "test/fixture/node_modules/test4/build/index.js",
  "packageJson": "test/fixture/node_modules/test4/package.json"
}
/**/

// throws when main does not exist
test2

/* error */
The main file for the package test2 does not exist.
/**/

// throws when main in the dir does not exist
test3

/* error */
The main file test/fixture/node_modules/test3/build/index.js for module test3 does not exist.
/**/