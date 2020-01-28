#!/usr/bin/env node
'use strict';
const fs = require('fs');             
const h = fs.createReadStream;
async function k(a) {
  const {interval:d = 250, writable:e = process.stdout} = {};
  a = "function" == typeof a ? a() : a;
  const b = e.write.bind(e);
  var c = process.env.INDICATRIX_PLACEHOLDER;
  if (c && "0" != c) {
    return b("Depack version is loading<INDICATRIX_PLACEHOLDER>"), await a;
  }
  let f = 1, g = `${"Depack version is loading"}${".".repeat(f)}`;
  b(g);
  c = setInterval(() => {
    f = (f + 1) % 4;
    g = `${"Depack version is loading"}${".".repeat(f)}`;
    b(`\r${" ".repeat(28)}\r`);
    b(g);
  }, d);
  try {
    return await a;
  } finally {
    clearInterval(c), b(`\r${" ".repeat(28)}\r`);
  }
}
;const l = async() => {
  var a = require.resolve("depack/package.json");
  const d = h(a);
  a = await new Promise(e => {
    const b = [];
    d.on("data", c => b.push(c));
    d.on("close", () => e(b.join("")));
  });
  ({version:a} = JSON.parse(a));
  return a;
}, m = async() => {
  var a = l();
  a = await k(a);
  console.log(a);
};
(async() => {
  await m();
})();


//# sourceMappingURL=generated-1.js.map