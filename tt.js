const DEPACK$child_process = require('child_process');
'use strict';
const {fork:a} = DEPACK$child_process;
const {stdout:b, stderr:c} = a(".", [], {stdio:"pipe", execArgv:[]}).on("error", (d) => {
  console.log(d);
});
b.pipe(process.stdout);
c.pipe(process.stderr);

