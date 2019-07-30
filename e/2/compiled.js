'use strict';
var a = {};
a = () => {
  console.log("Def CJS2");
};
a.a = () => {
  console.log("Named CJS2");
};
var b = () => {
  console.log("Def CJS");
};
b.named = () => {
  console.log("Named CJS");
};
console.log("Requiring CJS from CJS:");
console.log(a);
console.log("Requiring a CommonJS from ecma:");
console.log(b);


//# sourceMappingURL=compiled.js.map