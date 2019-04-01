## compiles a node.js program
test/fixture/nodejs.js -c -a -p

/* stdout */
Built-ins: os, fs
/**/
/* stderr */
-jar compiler.jar --compilation_level ADVANCED --create_source_map %outname%.map --formatting PRETTY_PRINT --js_output_file test/temp/result.js --module_resolution NODE --package_json_entry_names module,main --externs externs/v8/os.js --externs externs/v8/fs.js --externs externs/v8/stream.js --externs externs/v8/events.js --externs externs/v8/url.js --externs externs/v8/global.js --externs externs/v8/nodejs.js
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
