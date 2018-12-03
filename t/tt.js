const DEPACK$os = require('os');
const DEPACK$stream = require('stream');
'use strict';
const {EOL:b, arch:d, a:e, cpus:g, b:h, freemem:k, c:l, homedir:m, hostname:n, loadavg:p, networkInterfaces:q, platform:r, release:t, i:u, tmpdir:v, totalmem:w, type:x, uptime:y, j:z} = DEPACK$os;
var A = {default:DEPACK$os};
A.EOL = b;
A.arch = d;
A.a = e;
A.cpus = g;
A.b = h;
A.freemem = k;
A.c = l;
A.homedir = m;
A.hostname = n;
A.loadavg = p;
A.networkInterfaces = q;
A.platform = r;
A.release = t;
A.i = u;
A.tmpdir = v;
A.totalmem = w;
A.type = x;
A.uptime = y;
A.j = z;
const {Duplex:B, PassThrough:C, Readable:D, Stream:E, Transform:F, Writable:G, h:H} = DEPACK$stream;
var I = {default:DEPACK$stream};
I.Duplex = B;
I.PassThrough = C;
I.Readable = D;
I.Stream = E;
I.Transform = F;
I.Writable = G;
I.h = H;
var J = {o:function(a) {
  if ("object" != typeof a) {
    return !1;
  }
  const {f:c, g:f} = a;
  a = -1 != ["string", "function"].indexOf(typeof f);
  return c instanceof RegExp && a;
}, u:(a, c) => {
  if (!(c instanceof Error)) {
    throw c;
  }
  var [, , a] = a.stack.split("\n", 3);
  a = c.stack.indexOf(a);
  if (-1 == a) {
    throw c;
  }
  a = c.stack.substr(0, a - 1);
  c.stack = a.substr(0, a.lastIndexOf("\n"));
  throw c;
}};
const {} = A, K = /\s+at.*(?:\(|\s)(.*)\)?/, L = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, M = (0,A.homedir)();
var N = (a, c = {}) => {
  const {A:f = !1, v:O = ["pirates"]} = c, P = new RegExp(L.source.replace("IGNORED_MODULES", O.join("|")));
  return a.replace(/\\/g, "/").split("\n").filter((a) => {
    a = a.match(K);
    if (null === a || !a[1]) {
      return !0;
    }
    a = a[1];
    return a.includes(".app/Contents/Resources/electron.asar") || a.includes(".app/Contents/Resources/default_app.asar") ? !1 : !P.test(a);
  }).filter((a) => "" !== a.trim()).map((a) => f ? a.replace(K, (a, c) => a.replace(c, c.replace(M, "~"))) : a).join("\n");
};
const {} = I, {} = J;
N && N.m && (N = N.default);
const {} = J;
var Q = {}, R = () => {
  console.log("hello world");
  return "TEST_DEFAULT";
};
Object.assign({}, {s:"WORLD"});
var S = {};
const {} = I;
(async() => {
  const a = new I.Readable({read() {
    this.push(R());
    this.push(Q.B);
    this.push(null);
  }}), c = new S.l({f:/test/i, g() {
    return "--tset--";
  }});
  a.pipe(c).pipe(process.stdout);
  c.w("end", () => console.log());
})();

