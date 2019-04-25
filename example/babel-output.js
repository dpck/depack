'use strict';
var a = {};
Object.defineProperty(a, "__esModule", {value:!0});
a.default = a.a = a.b = void 0;
a.b = () => "c";
a.a = () => "b";
a.default = () => "erte";
console.log(a.default());
console.log(a.b());
console.log(a.a());


//# sourceMappingURL=babel-output.js.map