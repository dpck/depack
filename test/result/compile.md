## compiles a node.js program
test/fixture/nodejs.js -c -a -p

/* stderr */
java -jar compiler.jar \
--compilation_level ADVANCED --language_out ECMASCRIPT_2018 --create_source_map \
%outname%.map --formatting PRETTY_PRINT --js_output_file test/temp/result.js \
--package_json_entry_names module,main --entry_point test/fixture/nodejs.js --externs \
node_modules/@externs/nodejs/v8/os.js --externs externs/nodejs/v8/fs.js \
--externs externs/nodejs/v8/stream.js --externs \
node_modules/@externs/nodejs/v8/events.js --externs \
node_modules/@externs/nodejs/v8/url.js --externs \
node_modules/@externs/nodejs/v8/global.js --externs \
node_modules/@externs/nodejs/v8/global/buffer.js --externs \
node_modules/@externs/nodejs/v8/nodejs.js
Built-ins: os, fs
/**/
/* expected */
#!/usr/bin/env node
'use strict';
const os = require('os');
const fs = require('fs');             
const a = os.constants;
const b = fs.createReadStream, c = fs.createWriteStream;
console.log(process.version);
console.log(a.errno.EACCES);
const d = b(__filename), e = c(process.env.OUTPUT);
d.pipe(e);


//# sourceMappingURL=result.js.map
/**/
