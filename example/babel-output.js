'use strict';
var a = {}, b = {};
Object.defineProperty(a, "__esModule", {value:!0});
a.default = a.a = a.b = void 0;
a.b = () => "c";
a.a = () => "b";
a.default = () => "erte";
console.log(a());
console.log(b.b());
console.log(b.a());


//# sourceMappingURL=babel-output.js.map