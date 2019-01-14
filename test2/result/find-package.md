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
The entry for the module test2 does not exist.
/**/

// throws when main in the dir does not exist
test3

/* error */
The entry for the module test3 does not exist.
/**/

// throws when cannot parse package.json
test5

/* error */
Could not parse test/fixture/node_modules/test5/package.json.
/**/