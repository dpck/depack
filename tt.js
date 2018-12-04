const DEPACK$child_process = require('child_process');
'use strict';
const {fork:a} = DEPACK$child_process;
a(".", [], {stdio:"pipe", execArgv:[]}).a("error", (b) => {
  console.log(b);
});

