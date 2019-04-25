'use strict';
var a = {}, b = {};
Object.defineProperty(a, "__esModule", {value:!0});
a.default = a.a = a.b = void 0;
a.b = () => "c";
a.a = () => "b";
a.default = () => "erte";
console.log(b());
console.log((0,b.b)());
console.log((0,b.a)());


//# sourceMappingURL=babel-normal-output.js.map