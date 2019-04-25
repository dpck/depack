## compiles a node.js program
test/fixture/nodejs.js -c -a -p

/* stderr */
java -jar compiler.jar \
--compilation_level ADVANCED --language_out ECMASCRIPT_2017 --create_source_map \
%outname%.map --formatting PRETTY_PRINT --js_output_file test/temp/result.js \
--package_json_entry_names module,main --entry_point test/fixture/nodejs.js --externs \
node_modules/@depack/externs/v8/os.js --externs externs/v8/fs.js \
--externs externs/v8/stream.js --externs \
node_modules/@depack/externs/v8/events.js --externs \
node_modules/@depack/externs/v8/url.js --externs \
node_modules/@depack/externs/v8/global.js --externs \
node_modules/@depack/externs/v8/global/buffer.js --externs \
node_modules/@depack/externs/v8/nodejs.js
Built-ins: os, fs
/**/
/* expected */
#!/usr/bin/env node
const os = require('os');
const fs = require('fs');
var a = os.constants;
var b = fs, c = b.createReadStream, d = b.createWriteStream;
console.log(process.version);
console.log(a.errno.EACCES);
var e = c(__filename), f = d(process.env.OUTPUT);
e.pipe(f);


//# sourceMappingURL=result.js.map
/**/
