'use strict';
var a = () => {
  console.log("default common js export2");
};
a.named = () => {
  console.log("named common js export2");
};
var b = () => {
  console.log("default common js export");
};
b.named = () => {
  console.log("named common js export");
};
console.log("requiring a cjs from cjs:");
console.log(a);
console.log("requiring a common js from ecma:");
console.log(b);


//# sourceMappingURL=compiled.js.map