// fixes the dependencies
test/fixture/fix-dependencies

/* expected */
# fix-dependencies/build/index.js

return 'test'

# fix-dependencies/main.json

{
  "name": "test-main",
  "main": "build/index.js"
}

# fix-dependencies/module.json

{
  "name": "test-module",
  "module": "build/index.js"
}
/**/