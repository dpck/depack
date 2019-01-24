#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const stream = require('stream');
const os = require('os');
const child_process = require('child_process');
const vm = require('vm');
const _module = require('module');
'use strict';
const {builtinModules:aa} = _module;
const l = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : Number.Infinity);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, n = (a) => {
  ({callee:{caller:a}} = a);
  return a;
};
const {homedir:q} = os;
const r = /\s+at.*(?:\(|\s)(.*)\)?/, ba = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, ca = q(), da = (a) => {
  const {Y:b = !1, U:c = ["pirates"]} = {}, d = c.join("|"), e = new RegExp(ba.source.replace("IGNORED_MODULES", d));
  return a.replace(/\\/g, "/").split("\n").filter((a) => {
    a = a.match(r);
    if (null === a || !a[1]) {
      return !0;
    }
    a = a[1];
    return a.includes(".app/Contents/Resources/electron.asar") || a.includes(".app/Contents/Resources/default_app.asar") ? !1 : !e.test(a);
  }).filter((a) => "" !== a.trim()).map((a) => b ? a.replace(r, (a, b) => a.replace(b, b.replace(ca, "~"))) : a).join("\n");
};
function ea(a, b, c = !1) {
  return function(d) {
    var e = n(arguments), {stack:f} = Error();
    const h = l(f, 2, !0), g = (f = d instanceof Error) ? d.message : d;
    e = [`Error: ${g}`, ...null !== e && a === e || c ? [b] : [h, b]].join("\n");
    e = da(e);
    return Object.assign(f ? d : Error(), {message:g, stack:e});
  };
}
;function t(a) {
  var {stack:b} = Error();
  const c = n(arguments);
  b = l(b, 2 + (a ? 1 : 0));
  return ea(c, b, a);
}
;function u(a, b) {
  if (b > a - 2) {
    throw Error("Function does not accept that many arguments.");
  }
}
async function v(a, b, c) {
  const d = t(!0);
  if ("function" !== typeof a) {
    throw Error("Function must be passed.");
  }
  const {length:e} = a;
  if (!e) {
    throw Error("Function does not accept any arguments.");
  }
  return await new Promise((f, h) => {
    const g = (a, b) => a ? (a = d(a), h(a)) : f(c || b);
    let k = [g];
    Array.isArray(b) ? (b.forEach((a, b) => {
      u(e, b);
    }), k = [...b, g]) : 1 < Array.from(arguments).length && (u(e, 0), k = [b, g]);
    a.apply(a.Ea, k);
  });
}
;const {chmod:fa, createReadStream:w, createWriteStream:ha, lstat:y, mkdir:ia, readdir:ja, rmdir:ka, unlink:la} = fs;
const ma = async(a) => {
  try {
    return await v(y, a);
  } catch (b) {
    return null;
  }
};
const {Transform:na, Writable:B} = stream;
const oa = /\s+at.*(?:\(|\s)(.*)\)?/, pa = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, qa = q(), ra = (a) => {
  const {Y:b = !1, U:c = ["pirates"]} = {}, d = c.join("|"), e = new RegExp(pa.source.replace("IGNORED_MODULES", d));
  return a.replace(/\\/g, "/").split("\n").filter((a) => {
    a = a.match(oa);
    if (null === a || !a[1]) {
      return !0;
    }
    a = a[1];
    return a.includes(".app/Contents/Resources/electron.asar") || a.includes(".app/Contents/Resources/default_app.asar") ? !1 : !e.test(a);
  }).filter((a) => "" !== a.trim()).map((a) => b ? a.replace(oa, (a, b) => a.replace(b, b.replace(qa, "~"))) : a).join("\n");
};
const sa = (a, b) => {
  b.once("error", (b) => {
    a.emit("error", b);
  });
  return b;
};
class ta extends B {
  constructor(a) {
    a = void 0 === a ? {} : a;
    var b = Object.assign({}, a);
    void 0 === a.j && t(!0);
    a = (delete b.j, delete b.Aa, b);
    super(a);
    const {G:c, N:d} = a;
    this.a = [];
    this.F = new Promise((a, b) => {
      this.on("finish", () => {
        let b;
        c ? b = Buffer.concat(this.a) : b = this.a.join("");
        a(b);
        this.a = [];
      });
      this.once("error", (a) => {
        if (-1 != a.stack.indexOf("\n")) {
          const b = ra(a.stack);
          a.stack = b;
        }
        b(a);
      });
      d && sa(this, d).pipe(this);
    });
  }
  _write(a, b, c) {
    this.a.push(a);
    c();
  }
  get i() {
    return this.F;
  }
}
const C = async(a, b) => {
  b = void 0 === b ? {} : b;
  ({i:a} = new ta(Object.assign({}, {N:a}, b, {j:t(!0)})));
  return await a;
};
const {basename:ua, dirname:D, join:E, relative:F, resolve:wa} = path;
async function xa(a, b) {
  b = b.map(async(b) => {
    const c = wa(a, b);
    return {lstat:await v(y, c), path:c, Z:b};
  });
  return await Promise.all(b);
}
const ya = (a) => a.lstat.isDirectory(), za = (a) => !a.lstat.isDirectory();
async function G(a) {
  if (!a) {
    throw Error("Please specify a path to the directory");
  }
  if (!(await v(y, a)).isDirectory()) {
    throw a = Error("Path is not a directory"), a.code = "ENOTDIR", a;
  }
  var b = await v(ja, a);
  b = await xa(a, b);
  a = b.filter(ya);
  b = b.filter(za).reduce((a, b) => {
    var c = b.lstat.isDirectory() ? "Directory" : b.lstat.isFile() ? "File" : b.lstat.isSymbolicLink() ? "SymbolicLink" : void 0;
    return Object.assign({}, a, {[b.Z]:{type:c}});
  }, {});
  a = await a.reduce(async(a, b) => {
    var {path:c, Z:d} = b;
    a = await a;
    b = await G(c);
    return Object.assign({}, a, {[d]:b});
  }, {});
  return {content:Object.assign({}, b, a), type:"Directory"};
}
;const Aa = async(a) => {
  await v(la, a);
}, Ea = async(a) => {
  const {content:b} = await G(a);
  var c = Object.keys(b).filter((a) => {
    ({type:a} = b[a]);
    if ("File" == a || "SymbolicLink" == a) {
      return !0;
    }
  }), d = Object.keys(b).filter((a) => {
    ({type:a} = b[a]);
    if ("Directory" == a) {
      return !0;
    }
  });
  c = c.map((b) => E(a, b));
  await Promise.all(c.map(Aa));
  d = d.map((b) => E(a, b));
  await Promise.all(d.map(Ea));
  await v(ka, a);
}, Fa = async(a) => {
  (await v(y, a)).isDirectory() ? await Ea(a) : await Aa(a);
};
const Ga = {black:30, red:31, green:32, yellow:33, blue:34, magenta:35, cyan:36, white:37, grey:90};
function I(a, b) {
  return (b = Ga[b]) ? `\x1b[${b}m${a}\x1b[0m` : a;
}
;async function Ha(a) {
  const b = D(a);
  try {
    return await J(b), a;
  } catch (c) {
    if (/EEXIST/.test(c.message) && -1 != c.message.indexOf(b)) {
      return a;
    }
    throw c;
  }
}
async function J(a) {
  try {
    await v(ia, a);
  } catch (b) {
    if ("ENOENT" == b.code) {
      const b = D(a);
      await J(b);
      await J(a);
    } else {
      if ("EEXIST" != b.code) {
        throw b;
      }
    }
  }
}
;async function Ia(a, b) {
  if (!a) {
    throw Error("No path is given.");
  }
  const c = t(!0), d = ha(a);
  await new Promise((a, f) => {
    d.on("error", (a) => {
      a = c(a);
      f(a);
    }).on("close", a).end(b);
  });
}
;async function Ja(a) {
  a = w(a);
  return await C(a);
}
async function Ka(a) {
  a = w(a);
  return await C(a, {G:!0});
}
;const La = (a, b, c, d, e) => {
  d = void 0 === d ? !1 : d;
  e = void 0 === e ? !1 : e;
  const f = new RegExp(`^-(${c}|-${b})`);
  b = a.findIndex((a) => f.test(a));
  if (-1 == b) {
    return {argv:a};
  }
  if (d) {
    return {value:!0, argv:[...a.slice(0, b), ...a.slice(b + 1)]};
  }
  d = b + 1;
  c = a[d];
  if (!c || "string" == typeof c && c.startsWith("--")) {
    return {argv:a};
  }
  e && (c = parseInt(c, 10));
  return {value:c, argv:[...a.slice(0, b), ...a.slice(d + 1)]};
}, Ma = (a) => {
  const b = [];
  for (let c = 0; c < a.length; c++) {
    const d = a[c];
    if (d.startsWith("-")) {
      break;
    }
    b.push(d);
  }
  return b;
};
const {Script:Na} = vm;
const Oa = (a, b) => {
  const [c, , d] = a.split("\n");
  a = parseInt(c.replace(/.+?(\d+)$/, (a, b) => b)) - 1;
  const e = d.indexOf("^");
  ({length:b} = b.split("\n").slice(0, a).join("\n"));
  return b + e + (a ? 1 : 0);
};
const Pa = (a) => {
  try {
    new Na(a);
  } catch (b) {
    const {message:c, stack:d} = b;
    if ("Unexpected token <" != c) {
      throw b;
    }
    return Oa(d, a);
  }
  return null;
};
const Qa = /\s+at.*(?:\(|\s)(.*)\)?/, Ra = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, Sa = q();
var K = (a, b = {}) => {
  const {Y:c = !1, U:d = ["pirates"]} = b;
  b = d.join("|");
  const e = new RegExp(Ra.source.replace("IGNORED_MODULES", b));
  return a.replace(/\\/g, "/").split("\n").filter((a) => {
    a = a.match(Qa);
    if (null === a || !a[1]) {
      return !0;
    }
    a = a[1];
    return a.includes(".app/Contents/Resources/electron.asar") || a.includes(".app/Contents/Resources/default_app.asar") ? !1 : !e.test(a);
  }).filter((a) => "" !== a.trim()).map((a) => c ? a.replace(Qa, (a, b) => a.replace(b, b.replace(Sa, "~"))) : a).join("\n");
};
K && K.a && (K = K.default);
var L = {};
function M(a, b, c) {
  const d = [];
  b.replace(a, (a, ...b) => {
    a = b.slice(0, b.length - 2).reduce((a, b, d) => {
      d = c[d];
      if (!d || void 0 === b) {
        return a;
      }
      a[d] = b;
      return a;
    }, {});
    d.push(a);
  });
  return d;
}
;const Ta = (a) => {
  [, a] = /<\s*(.+?)(?:\s+[\s\S]+)?\s*\/?\s*>/.exec(a) || [];
  return a;
}, O = (a) => {
  var b = [];
  const c = {}, d = [], e = b.reduce((b, {open:e, close:g}) => {
    const f = a.slice(b, e);
    [, b] = /(\S+)\s*=\s*$/.exec(f) || [];
    e = a.slice(e + 1, g);
    if (!b && !/\s*\.\.\./.test(e)) {
      throw Error("Could not detect prop name");
    }
    b ? c[b] = e : d.push(e);
    e = f || "";
    b = e.slice(0, e.length - (b || "").length - 1);
    b = N(b);
    Object.assign(c, b);
    return g + 1;
  }, 0);
  b.length ? (b = a.slice(e), b = N(b), Object.assign(c, b)) : (b = N(a), Object.assign(c, b));
  return {K:c, H:d};
}, N = (a) => M(/(\S+)\s*=\s*(["'])([\s\S]+?)\2/g, a, ["n", "q", "v"]).reduce((a, {n:c, Fa:d, q:e}) => {
  a[c] = `${e}${d}${e}`;
  return a;
}, {}), Ua = (a, b = [], c = !1) => {
  const {length:d} = Object.keys(a);
  return d || b.length ? `{${Object.keys(a).reduce((b, d) => [...b, `${c ? `'${d}'` : d}:${a[d]}`], b).join(",")}}` : "{}";
}, Va = (a = "") => {
  [a] = a;
  if (!a) {
    throw Error("No tag name is given");
  }
  return a.toUpperCase() == a;
}, P = (a, b = {}, c = [], d = [], e = !1) => {
  a = Va(a) ? a : `'${a}'`;
  if (!Object.keys(b).length && !c.length && !d.length) {
    return `h(${a})`;
  }
  b = Ua(b, d, e);
  c = c.join(",");
  return `h(${a},${b}${c ? `,${c}` : ""})`;
};
const Xa = (a) => {
  const b = Ta(a);
  let c = 0, d, e, f, h;
  var {ca:g} = L.W({ca:/=>/g});
  a = L.D(a, [L.s(g), {g:new RegExp(`<\\s*(/)?\\s*${b}(\\s+[\\s\\S]+?)?\\s*(/\\s*>|>)`, "g"), m(a, b = !1, g = "", k, m) {
    if (d) {
      return a;
    }
    k = k.startsWith("/") || g.endsWith("/");
    f || (f = a.length, h = g);
    if (k && !c) {
      return e = f, d = m + a.length, a;
    }
    if (!c && b) {
      throw Error("The tag closed before opening.");
    }
    k || (c += b ? -1 : 1);
    0 == c && (e = m, d = m + a.length);
    return a;
  }}]);
  if (!d) {
    throw Error(`Could not find the matching closing tag for ${b}.`);
  }
  var k = a.slice(0, d);
  a = a.slice(f, e);
  k = k.replace(g.C, "=>");
  const m = h.replace(g.C, "=>");
  g = a.replace(g.C, "=>");
  return new Wa({$:k, M:m, content:g, tagName:b});
};
class Wa {
  constructor(a) {
    Object.assign(this, a);
  }
}
;const Za = (a) => {
  const b = [];
  return b.length ? Ya(a, b) : [`\`${a}\``];
}, Ya = (a, b) => {
  let c = 0;
  b = b.reduce((b, {from:e, aa:f, xa:h, ya:g}) => {
    (e = a.slice(c, e)) && b.push(`\`${e}\``);
    c = f;
    h ? b.push(h) : g && b.push(g);
    return b;
  }, []);
  if (c < a.length) {
    const d = a.slice(c, a.length);
    d && b.push(`\`${d}\``);
  }
  return b;
};
const $a = (a, b = {}) => {
  var {qa:c} = b, d = Pa(a);
  if (null === d) {
    return a;
  }
  var e = a.slice(d);
  const {M:f = "", content:h, tagName:g, $:{length:k}} = Xa(e);
  e = Q(h, c);
  const {K:m, H:p} = O(f);
  e = P(g, m, e, p, c);
  c = a.slice(0, d);
  a = a.slice(d + k);
  d = k - e.length;
  0 < d && (e = `${" ".repeat(d)}${e}`);
  a = `${c}${e}${a}`;
  return $a(a, b);
}, Q = (a, b = !1) => a ? Za(a).reduce((a, d) => {
  if (d instanceof Wa) {
    const {M:c = "", content:e, tagName:f} = d, {K:m, H:p} = O(c);
    d = Q(e, b);
    d = P(f, m, d, p, b);
    return [...a, d];
  }
  const c = Pa(d);
  if (c) {
    var f = d.slice(c);
    const {$:{length:e}, M:g = "", content:k, tagName:m} = Xa(f), {K:p, H:x} = O(g);
    f = Q(k, b);
    f = P(m, p, f, x, b);
    const z = d.slice(0, c);
    d = d.slice(c + e);
    return [...a, `${z}${f}${d}`];
  }
  return [...a, d];
}, []) : [];
const ab = (a) => {
  const {e:b, ia:c, ja:d, ka:e} = L.W({e:/^ *export\s+(?:default\s+)?/mg, ia:/^ *import(\s+([^\s,]+)\s*,?)?(\s*{(?:[^}]+)})?\s+from\s+['"].+['"]/gm, ja:/^ *import\s+(?:(.+?)\s*,\s*)?\*\s+as\s+.+?\s+from\s+['"].+['"]/gm, ka:/^ *import\s+['"].+['"]/gm}, {I(a, b) {
    return `/*%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_${b}_%%*/`;
  }, ha(a) {
    return new RegExp(`/\\*%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_(\\d+)_%%\\*/`, "g");
  }});
  a = $a(L.D(a, [L.s(b), L.s(c), L.s(d), L.s(e)]), {qa:!0});
  return L.D(a, [L.B(b), L.B(c), L.B(d), L.B(e)]);
};
const {spawn:bb} = child_process;
function cb(a) {
  if ("object" != typeof a) {
    return !1;
  }
  const {g:b, m:c} = a;
  a = -1 != ["string", "function"].indexOf(typeof c);
  return b instanceof RegExp && a;
}
const S = (a, b) => {
  if (!(b instanceof Error)) {
    throw b;
  }
  [, , a] = a.stack.split("\n", 3);
  a = b.stack.indexOf(a);
  if (-1 == a) {
    throw b;
  }
  a = b.stack.substr(0, a - 1);
  b.stack = a.substr(0, a.lastIndexOf("\n"));
  throw b;
};
const db = (a, b) => b.filter(cb).reduce((a, {g:b, m:e}) => {
  if (this.a) {
    return a;
  }
  if ("string" == typeof e) {
    a = a.replace(b, e);
  } else {
    const c = e.bind(this);
    let d;
    return a.replace(b, (a, ...b) => {
      d = Error();
      try {
        return this.a ? a : c(a, ...b);
      } catch (m) {
        S(d, m);
      }
    });
  }
}, `${a}`);
const eb = (a) => new RegExp(`%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_(\\d+)_%%`, "g"), fb = (a, b) => `%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_${b}_%%`, gb = (a, b) => Object.keys(a).reduce((c, d) => {
  {
    var e = a[d];
    var {I:f = fb, ha:h = eb} = void 0 === b ? {} : b;
    const c = h(d);
    e = {name:d, g:e, C:c, I:f, map:{}, lastIndex:0};
  }
  return Object.assign({}, c, {[d]:e});
}, {}), hb = (a, b) => {
  b = void 0 === b ? [] : b;
  const {C:c, map:d} = a;
  return {g:c, m(a, c) {
    a = d[c];
    delete d[c];
    return db(a, Array.isArray(b) ? b : [b]);
  }};
}, ib = (a) => {
  const {g:b, map:c, I:d, name:e} = a;
  return {g:b, m(b) {
    const {lastIndex:f} = a;
    c[f] = b;
    a.lastIndex += 1;
    return d(e, f);
  }};
};
q();
class jb extends na {
  constructor(a) {
    super();
    this.da = (Array.isArray(a) ? a : [a]).filter(cb);
  }
  async reduce(a) {
    return await this.da.reduce(async(a, {g:c, m:d}) => {
      a = await a;
      if (this.a) {
        return a;
      }
      if ("string" == typeof d) {
        a = a.replace(c, d);
      } else {
        const b = d.bind(this), f = [];
        let h;
        d = a.replace(c, (a, ...c) => {
          h = Error();
          try {
            if (this.a) {
              return a;
            }
            const d = b(a, ...c);
            d instanceof Promise && f.push(d);
            return d;
          } catch (m) {
            S(h, m);
          }
        });
        if (f.length) {
          try {
            const b = await Promise.all(f);
            a = a.replace(c, () => b.shift());
          } catch (g) {
            S(h, g);
          }
        } else {
          a = d;
        }
      }
      return a;
    }, `${a}`);
  }
}
class kb extends jb {
  constructor(a) {
    super(a);
    this.i = Promise.resolve();
  }
}
;var lb = {get W() {
  return gb;
}, get s() {
  return ib;
}, get B() {
  return hb;
}, get ba() {
  return jb;
}, get va() {
  return kb;
}, get D() {
  return db;
}};
var T = {get read() {
  return Ja;
}, get readBuffer() {
  return Ka;
}, get write() {
  return Ia;
}, get T() {
  return Ha;
}, get ra() {
  return Fa;
}, get Ba() {
  return G;
}, get exists() {
  return ma;
}};
async function mb(a, b, c = {}) {
  const {interval:d = 250, writable:e = process.stdout} = c;
  b = "function" == typeof b ? b() : b;
  const f = e.write.bind(e);
  let h = 1, g = `${a}${".".repeat(h)}`;
  f(g);
  c = setInterval(() => {
    h = (h + 1) % 4;
    g = `${a}${".".repeat(h)}`;
    f(`\r${" ".repeat(a.length + 3)}\r`);
    f(g);
  }, d);
  try {
    return await b;
  } finally {
    clearInterval(c), f(`\r${" ".repeat(a.length + 3)}\r`);
  }
}
;var nb = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : Number.Infinity);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, ob = (a) => {
  ({callee:{caller:a}} = a);
  return a;
};
function pb(a, b, c = !1) {
  return function(d) {
    var e = ob(arguments), {stack:f} = Error();
    const h = nb(f, 2, !0), g = (f = d instanceof Error) ? d.message : d;
    e = [`Error: ${g}`, ...null !== e && a === e || c ? [b] : [h, b]].join("\n");
    e = K(e);
    return Object.assign(f ? d : Error(), {message:g, stack:e});
  };
}
K && K.a && (K = K.default);
function U(a) {
  var {stack:b} = Error();
  const c = ob(arguments);
  b = nb(b, 2 + (a ? 1 : 0));
  return pb(c, b, a);
}
;U && U.a && (U = U.default);
K && K.a && (K = K.default);
var qb = class extends B {
  constructor(a) {
    a = void 0 === a ? {} : a;
    var b = Object.assign({}, a), c = void 0 === a.j ? U(!0) : a.j;
    a = (delete b.j, b);
    super(a);
    const {G:d, N:e} = a;
    this.a = [];
    this.F = new Promise((a, b) => {
      this.on("finish", () => {
        let b;
        d ? b = Buffer.concat(this.a) : b = this.a.join("");
        a(b);
        this.a = [];
      });
      this.once("error", (a) => {
        if (-1 == a.stack.indexOf("\n")) {
          a = c(a), b(a);
        } else {
          const c = K(a.stack);
          a.stack = c;
          b(a);
        }
      });
      e && (e.once("error", (a) => this.emit("error", a)), e.pipe(this));
    });
  }
  _write(a, b, c) {
    this.a.push(a);
    c();
  }
  get i() {
    return this.F;
  }
}, rb = async(a) => {
  var b = void 0 === b ? {G:!1} : b;
  ({i:a} = new qb(Object.assign({}, {N:a}, b, {j:U(!0)})));
  return await a;
};
function sb(a = []) {
  a = bb("java", a, {});
  const b = tb(a);
  a.i = b;
  a.Da = a.spawnargs.join(" ");
  return a;
}
const tb = async(a) => {
  const [b, c, d] = await Promise.all([new Promise((b, c) => {
    a.on("error", c).on("exit", (a) => {
      b(a);
    });
  }), a.stdout ? rb(a.stdout) : void 0, a.stderr ? rb(a.stderr) : void 0]);
  return {code:b, stdout:c, stderr:d};
};
function ub(a = {}) {
  const {usage:b = {}, description:c, line:d, ga:e} = a;
  a = Object.keys(b);
  const f = Object.values(b), [h] = a.reduce(([a = 0, c = 0], d) => {
    const e = b[d].split("\n").reduce((a, b) => b.length > a ? b.length : a, 0);
    e > c && (c = e);
    d.length > a && (a = d.length);
    return [a, c];
  }, []), g = (a, b) => {
    b = " ".repeat(b - a.length);
    return `${a}${b}`;
  };
  a = a.reduce((a, b, c) => {
    c = f[c].split("\n");
    b = g(b, h);
    const [d, ...e] = c;
    b = `${b}\t${d}`;
    const k = g("", h);
    c = e.map((a) => `${k}\t${a}`);
    return [...a, b, ...c];
  }, []).map((a) => `\t${a}`);
  const k = [c, `  ${d || ""}`].filter((a) => a ? a.trim() : a).join("\n\n");
  a = `${k ? `${k}\n` : ""}
  ${a.join("\n")}
  `;
  return e ? `${a}
  Example:
    ${e}
  ` : a;
}
;const vb = (a, b = (a) => a) => {
  const c = [];
  a = a.join(" ").replace(/--js (\S+)\s*/g, (a, d) => {
    a = `  --js ${I(b(d), "green")}`;
    c.push(a);
    return "";
  }).replace(/--externs (\S+)/g, (a, b) => `\n  --externs ${I(b, "grey")}`).replace(/--js_output_file (\S+)/g, (a, b) => `\n  --js_output_file ${I(b, "red")}`);
  const d = c.join("\n");
  return `${a}\n${d}`;
}, wb = async(a) => {
  var b = ua(a);
  b = [await T.read(a), "//" + `# sourceMappingURL=${b}.map`].join("\n");
  await T.write(a, b);
}, xb = async(a) => {
  const b = (await T.read(a)).replace(/^'use strict';/m, " ".repeat(13));
  await T.write(a, b);
}, yb = async(a, b) => {
  a = `${a}.map`;
  var c = await T.read(a);
  c = JSON.parse(c);
  var {sources:d} = c;
  d = d.map((a) => `/${F(b, a)}`);
  c.Ca = d;
  c = JSON.stringify(c, null, 2);
  await T.write(a, c);
};
const zb = /^ *import(?:\s+(?:[^\s,]+)\s*,?)?(?:\s*{(?:[^}]+)})?\s+from\s+(['"])(.+?)\1/gm, Ab = /^ *import\s+(?:.+?\s*,\s*)?\*\s+as\s+.+?\s+from\s+(['"])(.+?)\1/gm, Bb = /^ *export\s+{(?:[^}]+?)}\s+from\s+(['"])(.+?)\1/gm;
var Db = async(a) => {
  const b = await Cb(a);
  return b.filter((a, d) => a.internal ? b.findIndex((b) => b.internal == a.internal) == d : b.findIndex((b) => a.c == b.c) == d).map((a) => {
    const {c, internal:e} = a, f = b.filter((a) => {
      if (e) {
        return e == a.internal;
      }
      if (c) {
        return c == a.c;
      }
    }).map((a) => a.from).filter((a, b, c) => c.indexOf(a) == b);
    return Object.assign({}, a, {from:f});
  });
};
const Cb = async(a, b) => {
  b = void 0 === b ? {} : b;
  if (a in b) {
    return [];
  }
  b[a] = 1;
  var c = await T.read(a), d = Eb(c);
  c = Fb(c);
  d = [...d, ...c];
  let e;
  try {
    e = await Gb(a, d);
  } catch (f) {
    throw f.message = `${a}\n [!] ${f.message}`, f;
  }
  d = e.map((b) => Object.assign({}, b, {from:a}));
  return await e.filter((a) => {
    ({c:a} = a);
    return a && !(a in b);
  }).reduce(async(a, c) => {
    var {c:d, o:e} = c;
    a = await a;
    c = (await Cb(d, b)).map((a) => Object.assign({}, a, {from:a.from ? a.from : d}, !a.l && e ? {o:e} : {}));
    return [...a, ...c];
  }, d);
}, Gb = async(a, b) => {
  const c = D(a);
  b = b.map(async(b) => {
    if (aa.includes(b)) {
      return {internal:b};
    }
    if (/^[./]/.test(b)) {
      const c = await Hb(a, b);
      if (await T.exists(c)) {
        return {c};
      }
    }
    const {c:d, l:f, version:h, L:g, o:k} = await Ib(c, b);
    return Object.assign({}, {c:d, l:f, version:h, name:g}, k ? {o:k} : {});
  });
  return await Promise.all(b);
}, Hb = async(a, b) => {
  a = E(D(a), b);
  b.endsWith("/") ? a = E(a, "index.js") : (b = await T.exists(a)) ? b.isDirectory() && (a = E(a, "index.js")) : a = `${a}.js`;
  return a;
}, Eb = (a) => {
  const b = M(zb, a, ["q", "from"]), c = M(Ab, a, ["q", "from"]);
  a = M(Bb, a, ["q", "from"]);
  return [...b, ...c, ...a].map((a) => a.from);
}, Fb = (a) => M(/(?:^|\s+)require\((['"])(.+?)\1\)/gm, a, ["q", "from"]).map((a) => a.from), Ib = async(a, b) => {
  var c = E(a, "node_modules", b);
  c = E(c, "package.json");
  const d = await T.exists(c);
  if (d) {
    a = await Jb(c);
    if (void 0 === a) {
      throw Error(`The package ${F("", c)} does export the module.`);
    }
    if (null === a) {
      throw Error(`The exported module in package ${b} does not exist.`);
    }
    const {c:d, version:f, L:h, main:g} = a;
    return Object.assign({}, {c:F("", d), l:F("", c), version:f, L:h}, g ? {o:!0} : {});
  }
  if ("/" == a && !d) {
    throw Error(`Package.json for module ${b} not found.`);
  }
  return Ib(E(wa(a), ".."), b);
}, Jb = async(a) => {
  var b = await T.read(a);
  let c, d, e, f;
  try {
    ({module:c, version:d, name:e, main:f} = JSON.parse(b));
  } catch (h) {
    throw Error(`Could not parse ${a}.`);
  }
  if (b = c || f) {
    return a = E(D(a), b), b = await T.exists(a), !b || b.isDirectory() && (a = E(a, "index.js"), !await T.exists(a)) ? null : {c:a, version:d, L:e, main:!c && f};
  }
}, Kb = (a) => {
  const b = [], c = [], d = [], e = [], f = [], h = [];
  a.forEach((a) => {
    var {l:g, o:m, name:p, c:x, internal:z} = a;
    if (z) {
      return f.push(z);
    }
    g && m ? c.push(g) : g && b.push(g);
    x && m ? d.push(x) : x && e.push(x);
    p && h.push(p);
  });
  return {fa:c, pa:b, R:d, V:e, A:f, w:h};
}, Lb = (a) => {
  if (a.length) {
    return `#!/usr/bin/env node\n${a.map((a) => `const ${"module" == a ? "_module" : a} = r` + `equire('${a}');`).join("\n") + "\n%output%"}`;
  }
};
const Mb = (a, b) => {
  b = b.split("\n\n").map((a) => /^.+?:\d+:(?:\s*Originally at:\s*.+?)? WARNING -/.test(a) ? I(a, "grey") : I(a, "red")).join("\n\n");
  return `Exit code ${a}\n${b}`;
}, [V] = process.version.split(".", 1), Ob = async({A:a, a:b = "node_modules", force:c = !0}) => {
  const d = F("", E(D(require.resolve("depack/package.json")), "builtin-modules", V));
  return (await Promise.all(a.map(async(a) => {
    const e = E(b, a), h = E(e, "package.json");
    var g = E(e, "index.js");
    const k = {l:h, index:g};
    if (await T.exists(h) && !c) {
      if ((g = await Nb(h)) && g == V) {
        return k;
      }
      throw Error(`Could not prepare core module ${a}: ${e} exists.`);
    }
    await T.T(h);
    await T.write(h, JSON.stringify({name:a, na:"index.js", wa:V}));
    a = await T.read(E(d, `${a}.js`));
    await T.write(g, a);
    return k;
  }))).reduce((a, {l:b, index:c}) => [...a, b, c], []);
}, Nb = async(a) => {
  try {
    const b = await T.read(a), {depack:c} = JSON.parse(b);
    return c;
  } catch (b) {
  }
}, Pb = async(a, b) => {
  a = [...a, ...b];
  await Promise.all(a.map(async(a) => {
    var b = await T.read(a);
    b = JSON.parse(b);
    const {main:c, module:f} = b, h = f ? "module" : "main";
    var g = f || c, k = E(D(a), g);
    k = await T.exists(k);
    if (!k) {
      throw Error(`The ${h} for dependency ${a} does not exist.`);
    }
    k.isDirectory() && (g = E(g, "index.js"), b[h] = g, console.warn("Updating %s to point to a file.", a), await T.write(a, JSON.stringify(b, null, 2)));
  }));
};
const Rb = async(a, b, c) => {
  const {P:d, O:e} = c, {v:f} = b;
  var h = await T.read(a), g = a.endsWith(".jsx") ? ab(h) : h;
  const k = F("", D(a));
  h = E(f, k);
  h = {path:a, w:[], X:[], aa:h};
  const m = new lb.ba([{g:/^( *import(?:\s+[^\s,]+\s*,?)?(?:\s*{(?:[^}]+)})?\s+from\s+)['"](.+)['"]/gm, m:Qb}]);
  Object.assign(m, h);
  m.end(g);
  g = await C(m);
  a = E(f, a);
  await T.T(a);
  await T.write(a, g);
  a = h.w.map((a) => E(k, a)).filter((a) => !(a in e));
  h.X.map((a) => F("", a)).filter((a) => !(a in d)).forEach((a) => {
    d[a] = 1;
  });
  a.forEach((a) => {
    e[a] = 1;
  });
  await a.reduce(async(a, d) => {
    await a;
    await Rb(d, b, c);
  }, {});
}, Sb = async(a, b = {}) => {
  const {v:c = "depack-temp"} = b;
  b = {O:{[F("", a)]:1}, P:{}};
  await Rb(a, {v:c}, b);
  return [...Object.keys(b.O).map((a) => E(c, a)), ...Object.keys(b.P)];
};
async function Qb(a, b, c) {
  if (/^[./]/.test(c)) {
    return a = await Tb(this.path, c), this.w.push(a), `${b}'${a}'`;
  }
  const {na:d, main:e} = require(`${c}/package.json`);
  d || console.warn("[\u219b] Package %s does not specify module in package.json, will use main.", c);
  if (!d && !e) {
    throw Error("No main is available.");
  }
  a = require.resolve(`${c}/${d || e}`);
  this.X.push(a);
  a = F(this.aa, a);
  return `${b}'${a}'`;
}
const Tb = async(a, b) => {
  if (/\.jsx?$/.test(b)) {
    return b;
  }
  const c = D(a);
  var d = `${b}.js`;
  if (await T.exists(E(c, d))) {
    return d;
  }
  d = `${b}.jsx`;
  if (!await T.exists(E(c, d))) {
    throw Error(`Neither JS nor JSX files are found for ${b} in ${a}`);
  }
  return d;
};
const Ub = {fs:["events", "stream"], stream:["events"], child_process:["events", "stream"]}, Xb = async(a, b) => {
  const {src:c, J:d = !1, u:e, oa:f, ua:h, S:g, ta:k} = a;
  if (!c) {
    throw Error("Source is not given.");
  }
  a = [...b, "--module_resolution", "NODE", "--package_json_entry_names", "module,main"];
  b = await Db(c);
  b = Kb(b);
  const {R:m, fa:p, A:x, V:z, pa:H} = b;
  var A = await Ob({A:x});
  const va = await Vb(x);
  await Pb(p, H);
  A = [c, ...p, ...H, ...z, ...m, ...A].sort((a, b) => {
    if (a.startsWith("node_modules")) {
      return -1;
    }
    if (b.startsWith("node_modules")) {
      return 1;
    }
  });
  const Ba = Lb(x);
  A = [...a, ...va, ...m.length ? ["--process_common_js_modules"] : [], ...Ba ? ["--output_wrapper", Ba] : [], "--js", ...A];
  h ? console.error(A.join(" ")) : Wb(a, va, b);
  ({i:a} = sb(A));
  k || (a = mb(`Running Google Closure Compiler ${I(g, "grey")}`, a, {writable:process.stderr}));
  const {stdout:Ca, stderr:R, code:Da} = await a;
  if (Da) {
    throw Error(Mb(Da, R));
  }
  Ca && console.log(Ca);
  e && await wb(e);
  f && await xb(e);
  e && await v(fa, [e, "755"]);
  R && !d && console.warn(I(R, "grey"));
}, Wb = (a, b, c) => {
  a = [...a, ...b].join(" ").replace(/--js_output_file (\S+)/g, (a, b) => `--js_output_file ${I(b, "red")}`).replace(/--externs (\S+)/g, (a, b) => `--externs ${I(b, "grey")}`).replace(/--compilation_level (\S+)/g, (a, b) => `--compilation_level ${I(b, "green")}`);
  console.error(a);
  const {R:d, A:e, V:f, w:h} = c;
  c = f.filter(Yb);
  a = d.filter(Yb);
  h.length && console.log("%s: %s", I("Dependencies", "yellow"), h.join(" "));
  c.length && console.log("%s: %s", I("Modules", "yellow"), c.join(" "));
  a.length && console.log("%s: %s", I("CommonJS", "yellow"), a.join(" "));
  e.length && console.log("%s: %s", I("Built-ins", "yellow"), e.join(", "));
}, Yb = (a) => !a.startsWith("node_modules"), Vb = async(a) => {
  const b = F("", D(require.resolve("depack/package.json"))), c = E(b, "externs");
  a = [...a.reduce((a, b) => [...a, b, ...Ub[b] || []], []).filter((a, b, c) => c.indexOf(a) == b), "node"].map((a) => E(c, `${a}.js`));
  await Promise.all(a.map(async(a) => {
    if (!await T.exists(a)) {
      throw Error(`Externs ${a} don't exist.`);
    }
  }));
  return a.reduce((a, b) => [...a, "--externs", b], []);
};
var Zb = () => {
  const a = ub({line:"depack SOURCE [-c] [-o output.js] [-IO 2018] [-awVvh] [-l LEVEL] [... --generic-args]", usage:{SOURCE:"The source file to build.", "--output -o":"Where to save the output. STDOUT by default.", "--language_in -I":"Language Input. Can pass ECMA year.", "--language_out -O":"Language Output. Can pass ECMA year.", "--level -l":"The optimisation level (generic -O).\nWHITESPACE, SIMPLE (default), ADVANCED", "--advanced -a":"Turn on advanced optimisation.", "--no-warnings -w":"Don't print warnings.", 
  "--compile -c":"Set the mode to compilation.", "--verbose -V":"Print all compiler arguments.", "--version -v":"Show version.", "--help -h":"Print help information."}}), b = ub({line:"depack SOURCE -c [-o output.js] [-s]", ga:"depack source.js -c -o bundle.js -I 2018 -O 2018", usage:{"--no-strict -s":'Remove "use strict" from the output.'}});
  return `Google Closure Compiler-based packager for front and back-end.
https://github.com/artdecocode/depack
Performs static analysis on the source files to find out all dependencies.
Generic flags: https://github.com/google/closure-compiler/wiki/Flags-and-Options
  ${a}
  ${I("BACKEND", "blue")}: Creates a single executable file.
  ${b}`;
};
const $b = async(a, b) => {
  const {src:c, v:d = "depack-temp", J:e = !1, u:f} = a;
  if (!c) {
    throw Error("Entry file is not given.");
  }
  if (!f) {
    throw Error("Destination path is not given.");
  }
  a = await Sb(c, {v:d});
  a = [...b, ...a.reduce((a, b) => [...a, "--js", b], [])];
  ({i:b} = sb(a));
  a = vb(a, (a) => a.startsWith(d) ? F(d, a) : a);
  console.log(a);
  const {stdout:h, stderr:g, code:k} = await mb("Running Google Closure Compiler", b);
  if (k) {
    throw Error(Mb(k, g));
  }
  await wb(f);
  await yb(f, d);
  h && console.log(h);
  g && !e && console.warn(I(g, "grey"));
  await T.ra(d);
};
const W = function(a, b) {
  a = void 0 === a ? {} : a;
  b = void 0 === b ? process.argv : b;
  [, , ...b] = b;
  const c = Ma(b);
  b = b.slice(c.length);
  let d = !c.length;
  return Object.keys(a).reduce((b, f) => {
    var e = Object.assign({}, b);
    b = b.h;
    e = (delete e.h, e);
    if (0 == b.length && d) {
      return Object.assign({}, {h:b}, e);
    }
    const g = a[f];
    let k;
    if ("string" == typeof g) {
      ({value:k, argv:b} = La(b, f, g));
    } else {
      try {
        const {b:a, f:e, za:h, ea:z, multiple:H} = g;
        z && H && c.length ? (k = c, d = !0) : z && c.length ? (k = c[0], d = !0) : {value:k, argv:b} = La(b, f, a, e, h);
      } catch (m) {
        return Object.assign({}, {h:b}, e);
      }
    }
    return void 0 === k ? Object.assign({}, {h:b}, e) : Object.assign({}, {h:b}, e, {[f]:k});
  }, {h:b});
}({src:{ea:!0}, advanced:{b:"a", f:!0}, help:{b:"h", f:!0}, output:{b:"o"}, compile:{b:"c", f:!0}, version:{b:"v", f:!0}, "no-warnings":{b:"w", f:!0}, level:{b:"l"}, language_in:{b:"I"}, language_out:{b:"O"}, node:{b:"n", f:!0}, temp:{}, "no-strict":{b:"s", f:!0}, verbose:{b:"V", f:!0}, "no-sourcemap":{b:"S", f:!0}, "_suppress-loading":{f:!0}}), X = W.src, ac = W["_suppress-loading"], bc = W.help, cc = W["no-sourcemap"], dc = W["no-strict"], ec = W.verbose, fc = W.temp, gc = W.language_in, hc = W.language_out, 
ic = W.level, jc = W.h, kc = W.compile, lc = W["no-warnings"], mc = W.version, nc = W.advanced, Y = W.output;
const {GOOGLE_CLOSURE_COMPILER:Z} = process.env, oc = Z || require.resolve("google-closure-compiler-java/compiler.jar"), pc = Z ? "target" : require.resolve("google-closure-compiler-java/package.json");
mc && (console.log("0.0.1-alpha"), process.exit(0));
bc && (console.log(Zb()), process.exit(0));
const qc = (a) => /^\d+$/.test(a) ? `ECMASCRIPT_${a}` : a;
(async() => {
  try {
    let p = "target";
    if (!Z) {
      var a = await T.read(pc);
      const {version:b} = JSON.parse(a);
      [p] = b.split(".");
    }
    var {src:b, u:c, level:d, la:e, ma:f, sa:h = !0, argv:g, advanced:k} = {src:X, u:Y, level:ic, la:gc, ma:hc, argv:jc, advanced:nc, sa:!!Y && !cc};
    a = ["-jar", oc];
    d ? a.push("--compilation_level", d) : k && a.push("--compilation_level", "ADVANCED");
    e && a.push("--language_in", qc(e));
    f && a.push("--language_out", qc(f));
    h && a.push("--create_source_map", "%outname%.map");
    a.push(...g);
    if (Y) {
      const d = /\.js$/.test(c) ? c : E(c, ua(b));
      a.push("--js_output_file", d);
    }
    var m = a;
    if (kc) {
      return await Xb({src:X, J:lc, u:Y, oa:dc, ua:ec, S:p, ta:ac}, m);
    }
    await $b({src:X, u:Y, v:fc, J:lc, S:p}, m);
  } catch (p) {
    process.env.DEBUG ? console.log(p.stack) : console.log(p.message);
  }
})();


//# sourceMappingURL=depack.js.map