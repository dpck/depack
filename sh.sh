java -jar node_modules/google-closure-compiler-java/compiler.jar --compilation_level=ADVANCED --language_in=ECMASCRIPT_2018 --language_out=ECMASCRIPT_2017 --module_resolution=NODE --formatting=PRETTY_PRINT --warning_level=QUIET --externs=externs/Buffer.js \
  --process_common_js_modules=t/t2/dep.js \
  --process_common_js_modules=t/t2/dep-es6.js \
  --js=t/t2/index.js