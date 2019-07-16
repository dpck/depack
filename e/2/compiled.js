'use strict';
var a = () => {
  console.log("default common js export2");
};
a.named = () => {
  console.log("named common js export2");
};
var b = {default:() => {
  console.log("default common js export");
}};
b.default.named = () => {
  console.log("named common js export");
};
console.log("requiring a common js from common js:");
console.log(a);
console.log("requiring a common js from ecma:");
console.log(b);

