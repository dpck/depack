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
const ba = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : Number.Infinity);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, ca = (a) => {
  ({callee:{caller:a}} = a);
  return a;
};
const {homedir:l} = os;
const da = /\s+at.*(?:\(|\s)(.*)\)?/, fa = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, ha = l(), q = (a) => {
  const {ga:b = !1, ca:c = ["pirates"]} = {}, d = c.join("|"), e = new RegExp(fa.source.replace("IGNORED_MODULES", d));
  return a.replace(/\\/g, "/").split("\n").filter((a) => {
    a = a.match(da);
    if (null === a || !a[1]) {
      return !0;
    }
    a = a[1];
    return a.includes(".app/Contents/Resources/electron.asar") || a.includes(".app/Contents/Resources/default_app.asar") ? !1 : !e.test(a);
  }).filter((a) => "" !== a.trim()).map((a) => b ? a.replace(da, (a, b) => a.replace(b, b.replace(ha, "~"))) : a).join("\n");
};
function ia(a, b, c = !1) {
  return function(d) {
    var e = ca(arguments), {stack:f} = Error();
    const g = ba(f, 2, !0), h = (f = d instanceof Error) ? d.message : d;
    e = [`Error: ${h}`, ...null !== e && a === e || c ? [b] : [g, b]].join("\n");
    e = q(e);
    return Object.assign(f ? d : Error(), {message:h, stack:e});
  };
}
;function r(a) {
  var {stack:b} = Error();
  const c = ca(arguments);
  b = ba(b, 2 + (a ? 1 : 0));
  return ia(c, b, a);
}
;function ja(a, b) {
  if (b > a - 2) {
    throw Error("Function does not accept that many arguments.");
  }
}
async function t(a, b, c) {
  const d = r(!0);
  if ("function" !== typeof a) {
    throw Error("Function must be passed.");
  }
  const {length:e} = a;
  if (!e) {
    throw Error("Function does not accept any arguments.");
  }
  return await new Promise((f, g) => {
    const h = (a, b) => a ? (a = d(a), g(a)) : f(c || b);
    let k = [h];
    Array.isArray(b) ? (b.forEach((a, b) => {
      ja(e, b);
    }), k = [...b, h]) : 1 < Array.from(arguments).length && (ja(e, 0), k = [b, h]);
    a.apply(a.Ia, k);
  });
}
;const ka = (a, b) => {
  b.once("error", (b) => {
    a.emit("error", b);
  });
  return b;
};
const {basename:la, dirname:u, join:v, relative:w, resolve:z} = path;
const {chmod:ma, createReadStream:A, createWriteStream:na, lstat:B, mkdir:oa, readdir:pa, rmdir:qa, unlink:ra} = fs;
const {Transform:sa, Writable:C} = stream;
const ta = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : Number.Infinity);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, ua = (a) => {
  ({callee:{caller:a}} = a);
  return a;
};
const va = /\s+at.*(?:\(|\s)(.*)\)?/, wa = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, xa = l(), D = (a) => {
  const {ga:b = !1, ca:c = ["pirates"]} = {}, d = c.join("|"), e = new RegExp(wa.source.replace("IGNORED_MODULES", d));
  return a.replace(/\\/g, "/").split("\n").filter((a) => {
    a = a.match(va);
    if (null === a || !a[1]) {
      return !0;
    }
    a = a[1];
    return a.includes(".app/Contents/Resources/electron.asar") || a.includes(".app/Contents/Resources/default_app.asar") ? !1 : !e.test(a);
  }).filter((a) => "" !== a.trim()).map((a) => b ? a.replace(va, (a, b) => a.replace(b, b.replace(xa, "~"))) : a).join("\n");
};
function ya(a, b, c = !1) {
  return function(d) {
    var e = ua(arguments), {stack:f} = Error();
    const g = ta(f, 2, !0), h = (f = d instanceof Error) ? d.message : d;
    e = [`Error: ${h}`, ...null !== e && a === e || c ? [b] : [g, b]].join("\n");
    e = D(e);
    return Object.assign(f ? d : Error(), {message:h, stack:e});
  };
}
;function za(a) {
  var {stack:b} = Error();
  const c = ua(arguments);
  b = ta(b, 2 + (a ? 1 : 0));
  return ya(c, b, a);
}
;const Aa = (a, b) => {
  b.once("error", (b) => {
    a.emit("error", b);
  });
  return b;
};
class Ba extends C {
  constructor(a) {
    a = void 0 === a ? {} : a;
    var b = Object.assign({}, a);
    void 0 === a.c && za(!0);
    a = (delete b.c, delete b.U, b);
    super(a);
    const {v:c, s:d} = a;
    this.a = [];
    this.l = new Promise((a, b) => {
      this.on("finish", () => {
        let b;
        c ? b = Buffer.concat(this.a) : b = this.a.join("");
        a(b);
        this.a = [];
      });
      this.once("error", (a) => {
        if (-1 != a.stack.indexOf("\n")) {
          const b = D(a.stack);
          a.stack = b;
        }
        b(a);
      });
      d && Aa(this, d).pipe(this);
    });
  }
  _write(a, b, c) {
    this.a.push(a);
    c();
  }
  get g() {
    return this.l;
  }
}
const Ca = async(a, b) => {
  b = void 0 === b ? {} : b;
  ({g:a} = new Ba(Object.assign({}, {s:a}, b, {c:za(!0)})));
  return await a;
};
async function Da(a) {
  a = A(a);
  return await Ca(a);
}
async function Ea(a) {
  a = A(a);
  return await Ca(a, {v:!0});
}
;const Fa = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : Number.Infinity);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, Ga = (a) => {
  ({callee:{caller:a}} = a);
  return a;
};
function Ha(a, b, c = !1) {
  return function(d) {
    var e = Ga(arguments), {stack:f} = Error();
    const g = Fa(f, 2, !0), h = (f = d instanceof Error) ? d.message : d;
    e = [`Error: ${h}`, ...null !== e && a === e || c ? [b] : [g, b]].join("\n");
    e = D(e);
    return Object.assign(f ? d : Error(), {message:h, stack:e});
  };
}
;function Ia(a) {
  var {stack:b} = Error();
  const c = Ga(arguments);
  b = Fa(b, 2 + (a ? 1 : 0));
  return Ha(c, b, a);
}
;async function Ja(a, b) {
  if (!a) {
    throw Error("No path is given.");
  }
  const c = Ia(!0), d = na(a);
  await new Promise((a, f) => {
    d.on("error", (a) => {
      a = c(a);
      f(a);
    }).on("close", a).end(b);
  });
}
;const Ka = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : Number.Infinity);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, La = (a) => {
  ({callee:{caller:a}} = a);
  return a;
};
function Ma(a, b, c = !1) {
  return function(d) {
    var e = La(arguments), {stack:f} = Error();
    const g = Ka(f, 2, !0), h = (f = d instanceof Error) ? d.message : d;
    e = [`Error: ${h}`, ...null !== e && a === e || c ? [b] : [g, b]].join("\n");
    e = D(e);
    return Object.assign(f ? d : Error(), {message:h, stack:e});
  };
}
;function Na(a) {
  var {stack:b} = Error();
  const c = La(arguments);
  b = Ka(b, 2 + (a ? 1 : 0));
  return Ma(c, b, a);
}
;function Oa(a, b) {
  if (b > a - 2) {
    throw Error("Function does not accept that many arguments.");
  }
}
async function E(a, b, c) {
  const d = Na(!0);
  if ("function" !== typeof a) {
    throw Error("Function must be passed.");
  }
  const {length:e} = a;
  if (!e) {
    throw Error("Function does not accept any arguments.");
  }
  return await new Promise((f, g) => {
    const h = (a, b) => a ? (a = d(a), g(a)) : f(c || b);
    let k = [h];
    Array.isArray(b) ? (b.forEach((a, b) => {
      Oa(e, b);
    }), k = [...b, h]) : 1 < Array.from(arguments).length && (Oa(e, 0), k = [b, h]);
    a.apply(a.Ia, k);
  });
}
;async function Pa(a) {
  const b = u(a);
  try {
    return await F(b), a;
  } catch (c) {
    if (/EEXIST/.test(c.message) && -1 != c.message.indexOf(b)) {
      return a;
    }
    throw c;
  }
}
async function F(a) {
  try {
    await E(oa, a);
  } catch (b) {
    if ("ENOENT" == b.code) {
      const b = u(a);
      await F(b);
      await F(a);
    } else {
      if ("EEXIST" != b.code) {
        throw b;
      }
    }
  }
}
;async function Qa(a, b) {
  b = b.map(async(b) => {
    const c = z(a, b);
    return {lstat:await E(B, c), path:c, F:b};
  });
  return await Promise.all(b);
}
const Ra = (a) => a.lstat.isDirectory(), Sa = (a) => !a.lstat.isDirectory();
async function G(a) {
  if (!a) {
    throw Error("Please specify a path to the directory");
  }
  if (!(await E(B, a)).isDirectory()) {
    throw a = Error("Path is not a directory"), a.code = "ENOTDIR", a;
  }
  var b = await E(pa, a);
  b = await Qa(a, b);
  a = b.filter(Ra);
  b = b.filter(Sa).reduce((a, b) => {
    var c = b.lstat.isDirectory() ? "Directory" : b.lstat.isFile() ? "File" : b.lstat.isSymbolicLink() ? "SymbolicLink" : void 0;
    return Object.assign({}, a, {[b.F]:{type:c}});
  }, {});
  a = await a.reduce(async(a, b) => {
    var {path:c, F:d} = b;
    a = await a;
    b = await G(c);
    return Object.assign({}, a, {[d]:b});
  }, {});
  return {content:Object.assign({}, b, a), type:"Directory"};
}
;const Ta = async(a) => {
  await E(ra, a);
}, Ua = async(a) => {
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
  c = c.map((b) => v(a, b));
  await Promise.all(c.map(Ta));
  d = d.map((b) => v(a, b));
  await Promise.all(d.map(Ua));
  await E(qa, a);
}, Va = async(a) => {
  (await E(B, a)).isDirectory() ? await Ua(a) : await Ta(a);
};
const H = async(a) => {
  try {
    return await E(B, a);
  } catch (b) {
    return null;
  }
};
var J = {get read() {
  return Da;
}, get readBuffer() {
  return Ea;
}, get write() {
  return Ja;
}, get N() {
  return Pa;
}, get ha() {
  return Va;
}, get Fa() {
  return G;
}, get exists() {
  return H;
}};
const {Script:Wa} = vm;
const Xa = (a, b) => {
  const [c, , d] = a.split("\n");
  a = parseInt(c.replace(/.+?(\d+)$/, (a, b) => b)) - 1;
  const e = d.indexOf("^");
  ({length:b} = b.split("\n").slice(0, a).join("\n"));
  return b + e + (a ? 1 : 0);
};
const Ya = (a) => {
  try {
    new Wa(a);
  } catch (b) {
    const {message:c, stack:d} = b;
    if ("Unexpected token <" != c) {
      throw b;
    }
    return Xa(d, a);
  }
  return null;
};
function Za(a) {
  if ("object" != typeof a) {
    return !1;
  }
  const {m:b, o:c} = a;
  a = -1 != ["string", "function"].indexOf(typeof c);
  return b instanceof RegExp && a;
}
const K = (a, b) => {
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
const $a = (a, b) => b.filter(Za).reduce((a, {m:b, o:e}) => {
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
        K(d, m);
      }
    });
  }
}, `${a}`);
const ab = (a) => new RegExp(`%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_(\\d+)_%%`, "g"), bb = (a, b) => `%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_${b}_%%`, cb = (a, b) => Object.keys(a).reduce((c, d) => {
  {
    var e = a[d];
    var {O:f = bb, ta:g = ab} = void 0 === b ? {} : b;
    const c = g(d);
    e = {name:d, m:e, V:c, O:f, map:{}, lastIndex:0};
  }
  return Object.assign({}, c, {[d]:e});
}, {}), db = (a, b) => {
  b = void 0 === b ? [] : b;
  const {V:c, map:d} = a;
  return {m:c, o(a, c) {
    a = d[c];
    delete d[c];
    return $a(a, Array.isArray(b) ? b : [b]);
  }};
}, eb = (a) => {
  const {m:b, map:c, O:d, name:e} = a;
  return {m:b, o(b) {
    const {lastIndex:f} = a;
    c[f] = b;
    a.lastIndex += 1;
    return d(e, f);
  }};
};
class fb extends sa {
  constructor(a) {
    super();
    this.rules = (Array.isArray(a) ? a : [a]).filter(Za);
  }
  async reduce(a) {
    return await this.rules.reduce(async(a, {m:c, o:d}) => {
      a = await a;
      if (this.a) {
        return a;
      }
      if ("string" == typeof d) {
        a = a.replace(c, d);
      } else {
        const b = d.bind(this), f = [];
        let g;
        d = a.replace(c, (a, ...c) => {
          g = Error();
          try {
            if (this.a) {
              return a;
            }
            const d = b(a, ...c);
            d instanceof Promise && f.push(d);
            return d;
          } catch (m) {
            K(g, m);
          }
        });
        if (f.length) {
          try {
            const b = await Promise.all(f);
            a = a.replace(c, () => b.shift());
          } catch (h) {
            K(g, h);
          }
        } else {
          a = d;
        }
      }
      return a;
    }, `${a}`);
  }
  async _transform(a, b, c) {
    try {
      const b = await this.reduce(a);
      this.push(b);
      c();
    } catch (d) {
      a = D(d.stack), d.stack = a, c(d);
    }
  }
}
class gb extends fb {
  constructor(a) {
    super(a);
    this.g = Promise.resolve();
  }
}
;var L = {get ea() {
  return cb;
}, get A() {
  return eb;
}, get B() {
  return db;
}, get la() {
  return fb;
}, get Ka() {
  return gb;
}, get L() {
  return $a;
}};
const N = (a) => {
  var b = [];
  const c = {}, d = [], e = {}, f = b.reduce((b, {open:f, close:k}) => {
    b = a.slice(b, f);
    const [, g, h, p, x] = /(\s*)(\S+)(\s*)=(\s*)$/.exec(b) || [];
    f = a.slice(f + 1, k);
    if (!h && !/\s*\.\.\./.test(f)) {
      throw Error("Could not detect prop name");
    }
    h ? c[h] = f : d.push(f);
    e[h] = {before:g, X:p, W:x};
    f = b || "";
    f = f.slice(0, f.length - (h || "").length - 1);
    const {S:y, H:O} = M(f);
    Object.assign(c, y);
    Object.assign(e, O);
    return k + 1;
  }, 0);
  if (b.length) {
    b = a.slice(f);
    const {S:d, H:h} = M(b);
    Object.assign(c, d);
    Object.assign(e, h);
  } else {
    const {S:b, H:d} = M(a);
    Object.assign(c, b);
    Object.assign(e, d);
  }
  return {R:c, M:d, H:e};
}, M = (a) => {
  const b = [], c = {};
  a.replace(/(\s*)(\S+)(\s*)=(\s*)(["'])([\s\S]+?)\5/g, (a, e, f, g, h, k, m, n) => {
    c[f] = {before:e, X:g, W:h};
    b.push({J:n, name:f, ka:`${k}${m}${k}`});
    return "%".repeat(a.length);
  }).replace(/(\s*)([^\s%]+)/g, (a, e, f, g) => {
    c[f] = {before:e};
    b.push({J:g, name:f, ka:"true"});
  });
  return {S:[...b.reduce((a, {J:b, name:c, ka:g}) => {
    a[b] = [c, g];
    return a;
  }, [])].filter(Boolean).reduce((a, [b, c]) => {
    a[b] = c;
    return a;
  }, {}), H:c};
}, hb = (a, b = [], c = !1, d = {}, e = "") => {
  const {length:f} = Object.keys(a);
  return f || b.length ? `{${Object.keys(a).reduce((b, e) => {
    const {before:f = "", X:g = "", W:h = ""} = d[e] || {};
    return [...b, `${f}${c || -1 != e.indexOf("-") ? `'${e}'` : e}${g}:${h}${a[e]}`];
  }, b).join(",")}${e}}` : "{}";
}, mb = (a = "") => {
  [a] = a;
  if (!a) {
    throw Error("No tag name is given");
  }
  return a.toUpperCase() == a;
}, P = (a, b = {}, c = [], d = [], e = !1, f, g, h) => {
  const k = mb(a), m = k ? a : `'${a}'`;
  if (!Object.keys(b).length && !c.length && !d.length) {
    return `h(${m})`;
  }
  const n = k && "dom" == e ? !1 : e;
  k || !d.length || e && "dom" != e || f && f(`JSX: destructuring ${d.join(" ")} is used without quoted props on HTML ${a}.`);
  a = hb(b, d, n, g, h);
  b = c.reduce((a, b, d) => {
    d = (d = c[d - 1]) && /\S/.test(d) ? "," : "";
    return `${a}${d}${b}`;
  }, "");
  return `h(${m},${a}${b ? `,${b}` : ""})`;
};
const nb = (a, b = []) => {
  let c = 0, d;
  a = L.L(a, [...b, {m:/[<>]/g, o(a, b) {
    if (d) {
      return a;
    }
    const e = "<" == a;
    c += e ? 1 : -1;
    0 == c && !e && (d = b);
    return a;
  }}]);
  if (c) {
    throw Error(1);
  }
  return {Ca:a, ra:d};
}, pb = (a) => {
  var b;
  [, b] = /<\s*(.+?)(?:\s+[\s\S]+)?\s*\/?\s*>/.exec(a) || [];
  const {oa:c} = L.ea({oa:/=>/g});
  let d;
  try {
    ({Ca:d, ra:e} = nb(a, [L.A(c)]));
  } catch (f) {
    if (1 === f) {
      throw Error(`Could not find the matching closing > for ${b}.`);
    }
  }
  a = d.slice(0, e + 1);
  var e = a.replace(/<\s*[^\s/>]+/, "");
  if (/\/\s*>$/.test(e)) {
    return e = e.replace(/\/\s*>$/, ""), new ob({ia:a.replace(c.V, "=>"), T:e.replace(c.V, "=>"), content:"", tagName:b});
  }
  e.replace(/>$/, "");
  throw Error(`Could not find the matching closing </${b}>.`);
};
class ob {
  constructor(a) {
    Object.assign(this, a);
  }
}
;const Q = (a) => {
  let b = "", c = "";
  a = a.replace(/^(\n\s*)([\s\S]+)?/, (a, c, f = "") => {
    b = c;
    return f;
  }).replace(/([\s\S]+?)?(\n\s*)$/, (a, b = "", f) => {
    c = f;
    return b;
  });
  return `${b}${a ? `\`${a}\`` : ""}${c}`;
}, rb = (a) => {
  const b = [];
  return b.length ? qb(a, b) : [Q(a)];
}, qb = (a, b) => {
  let c = 0;
  b = b.reduce((b, {from:e, ja:f, La:g, Ma:h}) => {
    (e = a.slice(c, e)) && b.push(Q(e));
    c = f;
    g ? b.push(g) : h && b.push(h);
    return b;
  }, []);
  if (c < a.length) {
    const d = a.slice(c, a.length);
    d && b.push(Q(d));
  }
  return b;
};
const sb = (a, b = {}) => {
  const {Ea:c, warn:d} = b;
  var e = Ya(a);
  if (null === e) {
    return a;
  }
  var f = a.slice(e);
  const {T:g = "", content:h, tagName:k, ia:{length:m}} = pb(f);
  f = R(h, c, d);
  const {R:n, M:p, H:x} = N(g.replace(/^ */, ""));
  var y = /\s*$/.exec(g) || [""];
  y = P(k, n, f, p, c, d, x, y);
  f = a.slice(0, e);
  a = a.slice(e + m);
  e = m - y.length;
  0 < e && (y = `${" ".repeat(e)}${y}`);
  a = `${f}${y}${a}`;
  return sb(a, b);
}, R = (a, b = !1, c) => a ? rb(a).reduce((a, e) => {
  if (e instanceof ob) {
    const {T:d = "", content:f, tagName:g} = e, {R:n, M:p} = N(d);
    e = R(f, b, c);
    e = P(g, n, e, p, b, c);
    return [...a, e];
  }
  const d = Ya(e);
  if (d) {
    var g = e.slice(d);
    const {ia:{length:f}, T:k = "", content:m, tagName:n} = pb(g), {R:p, M:x} = N(k);
    g = R(m, b, c);
    g = P(n, p, g, x, b, c);
    const y = e.slice(0, d);
    e = e.slice(d + f);
    return [...a, `${y}${g}${e}`];
  }
  return [...a, e];
}, []) : [];
const tb = (a, b = {}) => {
  const {e:c, sa:d, J:e, ua:f, va:g} = L.ea({e:/^ *export\s+(?:default\s+)?/mg, sa:/^ *export\s+{[^}]+}\s+from\s+(['"])(?:.+?)\1/mg, J:/^ *import(\s+([^\s,]+)\s*,?)?(\s*{(?:[^}]+)})?\s+from\s+['"].+['"]/gm, ua:/^ *import\s+(?:(.+?)\s*,\s*)?\*\s+as\s+.+?\s+from\s+['"].+['"]/gm, va:/^ *import\s+['"].+['"]/gm}, {O(a, b) {
    return `/*%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_${b}_%%*/`;
  }, ta(a) {
    return new RegExp(`/\\*%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_(\\d+)_%%\\*/`, "g");
  }});
  a = sb(L.L(a, [L.A(d), L.A(c), L.A(e), L.A(f), L.A(g)]), b);
  return L.L(a, [L.B(d), L.B(c), L.B(e), L.B(f), L.B(g)]);
};
const ub = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : Number.Infinity);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, vb = (a) => {
  ({callee:{caller:a}} = a);
  return a;
};
function wb(a, b, c = !1) {
  return function(d) {
    var e = vb(arguments), {stack:f} = Error();
    const g = ub(f, 2, !0), h = (f = d instanceof Error) ? d.message : d;
    e = [`Error: ${h}`, ...null !== e && a === e || c ? [b] : [g, b]].join("\n");
    e = D(e);
    return Object.assign(f ? d : Error(), {message:h, stack:e});
  };
}
;function xb(a) {
  var {stack:b} = Error();
  const c = vb(arguments);
  b = ub(b, 2 + (a ? 1 : 0));
  return wb(c, b, a);
}
;const yb = (a, b) => {
  b.once("error", (b) => {
    a.emit("error", b);
  });
  return b;
};
class zb extends C {
  constructor(a) {
    a = void 0 === a ? {} : a;
    var b = Object.assign({}, a);
    void 0 === a.c && xb(!0);
    a = (delete b.c, delete b.U, b);
    super(a);
    const {v:c, s:d} = a;
    this.a = [];
    this.l = new Promise((a, b) => {
      this.on("finish", () => {
        let b;
        c ? b = Buffer.concat(this.a) : b = this.a.join("");
        a(b);
        this.a = [];
      });
      this.once("error", (a) => {
        if (-1 != a.stack.indexOf("\n")) {
          const b = D(a.stack);
          a.stack = b;
        }
        b(a);
      });
      d && yb(this, d).pipe(this);
    });
  }
  _write(a, b, c) {
    this.a.push(a);
    c();
  }
  get g() {
    return this.l;
  }
}
const Ab = async(a) => {
  var b = void 0 === b ? {} : b;
  ({g:a} = new zb(Object.assign({}, {s:a}, b, {c:xb(!0)})));
  return await a;
};
const Bb = {black:30, red:31, green:32, yellow:33, blue:34, magenta:35, cyan:36, white:37, grey:90};
function Cb(a, b) {
  var c = ["q", "from"];
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
;const Db = async(a, b) => {
  b && (b = u(b), a = v(b, a));
  b = await H(a);
  var c = a, d = !1;
  if (!b) {
    if (c = `${a}.js`, (b = await H(c)) || (c = `${a}.jsx`), b = await H(c), !b) {
      throw Error(`${a}.js or ${a}.jsx is not found.`);
    }
  } else {
    if (b.isDirectory()) {
      d = `${a}/index.js`;
      (b = await H(d)) || (d = `${d}x`);
      b = await H(d);
      if (!b) {
        throw Error(`index.jsx? file is not found in ${a}.`);
      }
      c = d;
      d = !0;
    }
  }
  return {path:a.startsWith(".") ? w("", c) : c, wa:d};
};
const Eb = /^ *import(?:\s+(?:[^\s,]+)\s*,?)?(?:\s*{(?:[^}]+)})?\s+from\s+(['"])(.+?)\1/gm, Fb = /^ *import\s+(?:.+?\s*,\s*)?\*\s+as\s+.+?\s+from\s+(['"])(.+?)\1/gm, Gb = /^ *import\s+(['"])(.+?)\1/gm, Hb = /^ *export\s+{[^}]+?}\s+from\s+(['"])(.+?)\1/gm, Ib = (a) => [Eb, Fb, Gb, Hb].reduce((b, c) => {
  c = Cb(c, a).map((a) => a.from);
  return [...b, ...c];
}, []);
const S = async(a, b) => {
  var c = v(a, "node_modules", b);
  c = v(c, "package.json");
  const d = await H(c);
  if (d) {
    a = await Jb(c);
    if (void 0 === a) {
      throw Error(`The package ${w("", c)} does export the module.`);
    }
    if (null === a) {
      throw Error(`The exported module in package ${b} does not exist.`);
    }
    const {b:d, version:f, w:g, main:h} = a;
    return Object.assign({}, {b:w("", d), i:w("", c), version:f, w:g}, h ? {j:!0} : {});
  }
  if ("/" == a && !d) {
    throw Error(`Package.json for module ${b} not found.`);
  }
  return S(v(z(a), ".."), b);
}, Jb = async(a) => {
  var b = await Da(a);
  let c, d, e, f;
  try {
    ({module:c, version:d, name:e, main:f} = JSON.parse(b));
  } catch (g) {
    throw Error(`Could not parse ${a}.`);
  }
  if (b = c || f) {
    return a = v(u(a), b), b = await H(a), !b || b.isDirectory() && (a = v(a, "index.js"), !await H(a)) ? null : {b:a, version:d, w:e, main:!c && f};
  }
};
const Lb = async(a) => {
  const b = await Kb(a);
  return b.filter((a, d) => {
    var {internal:c, b:f} = a;
    return c ? b.findIndex((a) => {
      ({internal:a} = a);
      return a == c;
    }) == d : b.findIndex((a) => {
      ({b:a} = a);
      return f == a;
    }) == d;
  }).map((a) => {
    const {b:c, internal:e} = a, f = b.filter((a) => {
      var {internal:b, b:d} = a;
      if (e) {
        return e == b;
      }
      if (c) {
        return c == d;
      }
    }).map((a) => {
      ({from:a} = a);
      return a;
    }).filter((a, b, c) => c.indexOf(a) == b);
    return Object.assign({}, a, {from:f});
  });
}, Kb = async(a, b) => {
  b = void 0 === b ? {} : b;
  if (a in b) {
    return [];
  }
  b[a] = 1;
  var c = await J.read(a), d = Ib(c);
  c = Mb(c);
  d = [...d, ...c];
  let e;
  try {
    e = await Nb(a, d);
  } catch (f) {
    throw f.message = `${a}\n [!] ${f.message}`, f;
  }
  d = e.map((b) => Object.assign({}, b, {from:a}));
  return await e.filter((a) => {
    ({b:a} = a);
    return a && !(a in b);
  }).reduce(async(a, c) => {
    var {b:d, j:e} = c;
    a = await a;
    c = (await Kb(d, b)).map((a) => Object.assign({}, a, {from:a.from ? a.from : d}, !a.i && e ? {j:e} : {}));
    return [...a, ...c];
  }, d);
}, Nb = async(a, b) => {
  const c = u(a);
  b = b.map(async(b) => {
    if (aa.includes(b)) {
      return {internal:b};
    }
    if (/^[./]/.test(b)) {
      try {
        const {path:c} = await Db(b, a);
        return {b:c};
      } catch (m) {
      }
    }
    const {b:d, i:f, version:g, w:h, j:k} = await S(c, b);
    return Object.assign({}, {b:d, i:f, version:g, name:h}, k ? {j:k} : {});
  });
  return await Promise.all(b);
}, Mb = (a) => Cb(/(?:^|\s+)require\((['"])(.+?)\1\)/gm, a).map((a) => a.from);
class Ob extends L.la {
  constructor(a, b) {
    super();
    const c = this.o.bind(this);
    this.rules = [{m:/^( *import(?:\s+[^\s,]+\s*,?)?(?:\s*{(?:[^}]+)})?\s+from\s+)['"](.+)['"]/gm, o:c}, {m:/^( *export\s+{[^}]+?}\s+from\s+)['"](.+?)['"]/gm, o:c}];
    this.na = [];
    this.ma = [];
    this.path = a;
    this.ja = b;
  }
  get fa() {
    return this.na;
  }
  get I() {
    return this.ma;
  }
  async o(a, b, c) {
    a = u(this.path);
    if (/^[./]/.test(c)) {
      return {path:c} = await Db(c, this.path), c = w(a, c), this.I.push(c), `${b}'./${c}'`;
    }
    ({b:c} = await S(a, c));
    this.fa.push(c);
    c = w(this.ja, c);
    return `${b}'${c}'`;
  }
}
;const Qb = async(a, b, c) => {
  const {Z:d, Y:e} = c, {G:f, D:g} = b;
  var h = await J.read(a), k = a.endsWith(".jsx");
  const m = w("", u(a));
  var n = v(f, m);
  n = new Ob(a, n);
  n.end(g && k ? `import { h } from 'preact'
  ${h}` : h);
  h = await Ab(n);
  k = k ? await Pb(h, a) : h;
  a = v(f, a);
  await J.N(a);
  await J.write(a, k);
  a = n.I.map((a) => v(m, a)).filter((a) => !(a in e));
  n = n.fa.filter((a) => !(a in d));
  n.forEach((a) => {
    d[a] = 1;
  });
  a.forEach((a) => {
    e[a] = 1;
  });
  await n.reduce(async(a, b) => {
    await a;
    (await Lb(b)).forEach(({b:a, i:b}) => {
      b && (d[b] = 1);
      d[a] = 1;
    });
  }, {});
  await a.reduce(async(a, d) => {
    await a;
    await Qb(d, b, c);
  }, {});
}, Pb = async(a, b) => await tb(a, {Ea:"dom", warn(a) {
  {
    const b = Bb.yellow;
    a = b ? `\x1b[${b}m${a}\x1b[0m` : a;
  }
  console.warn(a);
  console.log(b);
}});
const Rb = async(a, b = {}) => {
  const {G:c = "depack-temp", D:d} = b;
  b = {Y:{[w("", a)]:1}, Z:{}};
  await Qb(a, {G:c, D:d}, b);
  return [...Object.keys(b.Y).map((a) => v(c, a)), ...Object.keys(b.Z)];
};
class Sb extends C {
  constructor(a) {
    a = void 0 === a ? {} : a;
    var b = Object.assign({}, a);
    void 0 === a.c && r(!0);
    a = (delete b.c, delete b.U, b);
    super(a);
    const {v:c, s:d} = a;
    this.a = [];
    this.l = new Promise((a, b) => {
      this.on("finish", () => {
        let b;
        c ? b = Buffer.concat(this.a) : b = this.a.join("");
        a(b);
        this.a = [];
      });
      this.once("error", (a) => {
        if (-1 != a.stack.indexOf("\n")) {
          const b = q(a.stack);
          a.stack = b;
        }
        b(a);
      });
      d && ka(this, d).pipe(this);
    });
  }
  _write(a, b, c) {
    this.a.push(a);
    c();
  }
  get g() {
    return this.l;
  }
}
const Tb = async(a, b) => {
  b = void 0 === b ? {} : b;
  ({g:a} = new Sb(Object.assign({}, {s:a}, b, {c:r(!0)})));
  return await a;
};
const T = async(a) => {
  try {
    return await t(B, a);
  } catch (b) {
    return null;
  }
};
async function Ub(a, b) {
  b = b.map(async(b) => {
    const c = z(a, b);
    return {lstat:await t(B, c), path:c, F:b};
  });
  return await Promise.all(b);
}
const Vb = (a) => a.lstat.isDirectory(), Wb = (a) => !a.lstat.isDirectory();
async function Xb(a) {
  if (!a) {
    throw Error("Please specify a path to the directory");
  }
  if (!(await t(B, a)).isDirectory()) {
    throw a = Error("Path is not a directory"), a.code = "ENOTDIR", a;
  }
  var b = await t(pa, a);
  b = await Ub(a, b);
  a = b.filter(Vb);
  b = b.filter(Wb).reduce((a, b) => {
    var c = b.lstat.isDirectory() ? "Directory" : b.lstat.isFile() ? "File" : b.lstat.isSymbolicLink() ? "SymbolicLink" : void 0;
    return Object.assign({}, a, {[b.F]:{type:c}});
  }, {});
  a = await a.reduce(async(a, b) => {
    var {path:c, F:d} = b;
    a = await a;
    b = await Xb(c);
    return Object.assign({}, a, {[d]:b});
  }, {});
  return {content:Object.assign({}, b, a), type:"Directory"};
}
;const Yb = async(a) => {
  await t(ra, a);
}, Zb = async(a) => {
  const {content:b} = await Xb(a);
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
  c = c.map((b) => v(a, b));
  await Promise.all(c.map(Yb));
  d = d.map((b) => v(a, b));
  await Promise.all(d.map(Zb));
  await t(qa, a);
}, $b = async(a) => {
  (await t(B, a)).isDirectory() ? await Zb(a) : await Yb(a);
};
async function ac(a) {
  const b = u(a);
  try {
    return await bc(b), a;
  } catch (c) {
    if (/EEXIST/.test(c.message) && -1 != c.message.indexOf(b)) {
      return a;
    }
    throw c;
  }
}
async function bc(a) {
  try {
    await t(oa, a);
  } catch (b) {
    if ("ENOENT" == b.code) {
      const b = u(a);
      await bc(b);
      await bc(a);
    } else {
      if ("EEXIST" != b.code) {
        throw b;
      }
    }
  }
}
;async function cc(a, b) {
  if (!a) {
    throw Error("No path is given.");
  }
  const c = r(!0), d = na(a);
  await new Promise((a, f) => {
    d.on("error", (a) => {
      a = c(a);
      f(a);
    }).on("close", a).end(b);
  });
}
;async function dc(a) {
  a = A(a);
  return await Tb(a);
}
async function ec(a) {
  a = A(a);
  return await Tb(a, {v:!0});
}
;const fc = (a, b, c, d, e) => {
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
}, gc = (a) => {
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
const {spawn:hc} = child_process;
var U = {get read() {
  return dc;
}, get readBuffer() {
  return ec;
}, get write() {
  return cc;
}, get N() {
  return ac;
}, get ha() {
  return $b;
}, get Fa() {
  return Xb;
}, get exists() {
  return T;
}};
function ic(a, b) {
  var c = ["q", "from"];
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
;const jc = async(a, b) => {
  b && (b = u(b), a = v(b, a));
  b = await T(a);
  var c = a, d = !1;
  if (!b) {
    if (c = `${a}.js`, (b = await T(c)) || (c = `${a}.jsx`), b = await T(c), !b) {
      throw Error(`${a}.js or ${a}.jsx is not found.`);
    }
  } else {
    if (b.isDirectory()) {
      d = `${a}/index.js`;
      (b = await T(d)) || (d = `${d}x`);
      b = await T(d);
      if (!b) {
        throw Error(`index.jsx? file is not found in ${a}.`);
      }
      c = d;
      d = !0;
    }
  }
  return {path:a.startsWith(".") ? w("", c) : c, wa:d};
};
const kc = /^ *import(?:\s+(?:[^\s,]+)\s*,?)?(?:\s*{(?:[^}]+)})?\s+from\s+(['"])(.+?)\1/gm, lc = /^ *import\s+(?:.+?\s*,\s*)?\*\s+as\s+.+?\s+from\s+(['"])(.+?)\1/gm, mc = /^ *import\s+(['"])(.+?)\1/gm, nc = /^ *export\s+{[^}]+?}\s+from\s+(['"])(.+?)\1/gm, oc = (a) => [kc, lc, mc, nc].reduce((b, c) => {
  c = ic(c, a).map((a) => a.from);
  return [...b, ...c];
}, []);
const pc = (a, b) => {
  b.once("error", (b) => {
    a.emit("error", b);
  });
  return b;
};
class qc extends C {
  constructor(a) {
    a = void 0 === a ? {} : a;
    var b = Object.assign({}, a);
    void 0 === a.c && r(!0);
    a = (delete b.c, delete b.U, b);
    super(a);
    const {v:c, s:d} = a;
    this.a = [];
    this.l = new Promise((a, b) => {
      this.on("finish", () => {
        let b;
        c ? b = Buffer.concat(this.a) : b = this.a.join("");
        a(b);
        this.a = [];
      });
      this.once("error", (a) => {
        if (-1 != a.stack.indexOf("\n")) {
          const b = q(a.stack);
          a.stack = b;
        }
        b(a);
      });
      d && pc(this, d).pipe(this);
    });
  }
  _write(a, b, c) {
    this.a.push(a);
    c();
  }
  get g() {
    return this.l;
  }
}
const rc = async(a) => {
  var b = void 0 === b ? {} : b;
  ({g:a} = new qc(Object.assign({}, {s:a}, b, {c:r(!0)})));
  return await a;
};
async function sc(a) {
  a = A(a);
  return await rc(a);
}
;const uc = async(a, b) => {
  var c = v(a, "node_modules", b);
  c = v(c, "package.json");
  const d = await T(c);
  if (d) {
    a = await tc(c);
    if (void 0 === a) {
      throw Error(`The package ${w("", c)} does export the module.`);
    }
    if (null === a) {
      throw Error(`The exported module in package ${b} does not exist.`);
    }
    const {b:d, version:f, w:g, main:h} = a;
    return Object.assign({}, {b:w("", d), i:w("", c), version:f, w:g}, h ? {j:!0} : {});
  }
  if ("/" == a && !d) {
    throw Error(`Package.json for module ${b} not found.`);
  }
  return uc(v(z(a), ".."), b);
}, tc = async(a) => {
  var b = await sc(a);
  let c, d, e, f;
  try {
    ({module:c, version:d, name:e, main:f} = JSON.parse(b));
  } catch (g) {
    throw Error(`Could not parse ${a}.`);
  }
  if (b = c || f) {
    return a = v(u(a), b), b = await T(a), !b || b.isDirectory() && (a = v(a, "index.js"), !await T(a)) ? null : {b:a, version:d, w:e, main:!c && f};
  }
};
const wc = async(a) => {
  const b = await vc(a);
  return b.filter((a, d) => {
    var {internal:c, b:f} = a;
    return c ? b.findIndex((a) => {
      ({internal:a} = a);
      return a == c;
    }) == d : b.findIndex((a) => {
      ({b:a} = a);
      return f == a;
    }) == d;
  }).map((a) => {
    const {b:c, internal:e} = a, f = b.filter((a) => {
      var {internal:b, b:d} = a;
      if (e) {
        return e == b;
      }
      if (c) {
        return c == d;
      }
    }).map((a) => {
      ({from:a} = a);
      return a;
    }).filter((a, b, c) => c.indexOf(a) == b);
    return Object.assign({}, a, {from:f});
  });
}, vc = async(a, b) => {
  b = void 0 === b ? {} : b;
  if (a in b) {
    return [];
  }
  b[a] = 1;
  var c = await U.read(a), d = oc(c);
  c = xc(c);
  d = [...d, ...c];
  let e;
  try {
    e = await yc(a, d);
  } catch (f) {
    throw f.message = `${a}\n [!] ${f.message}`, f;
  }
  d = e.map((b) => Object.assign({}, b, {from:a}));
  return await e.filter((a) => {
    ({b:a} = a);
    return a && !(a in b);
  }).reduce(async(a, c) => {
    var {b:d, j:e} = c;
    a = await a;
    c = (await vc(d, b)).map((a) => Object.assign({}, a, {from:a.from ? a.from : d}, !a.i && e ? {j:e} : {}));
    return [...a, ...c];
  }, d);
}, yc = async(a, b) => {
  const c = u(a);
  b = b.map(async(b) => {
    if (aa.includes(b)) {
      return {internal:b};
    }
    if (/^[./]/.test(b)) {
      try {
        const {path:c} = await jc(b, a);
        return {b:c};
      } catch (m) {
      }
    }
    const {b:d, i:f, version:g, w:h, j:k} = await uc(c, b);
    return Object.assign({}, {b:d, i:f, version:g, name:h}, k ? {j:k} : {});
  });
  return await Promise.all(b);
}, xc = (a) => ic(/(?:^|\s+)require\((['"])(.+?)\1\)/gm, a).map((a) => a.from), zc = (a) => {
  const b = [], c = [], d = [], e = [], f = [], g = [];
  a.forEach((a) => {
    var {i:h, j:m, name:n, b:p, internal:x} = a;
    if (x) {
      return f.push(x);
    }
    h && m ? c.push(h) : h && b.push(h);
    p && m ? d.push(p) : p && e.push(p);
    n && g.push(n);
  });
  return {qa:c, Ba:b, $:d, da:e, K:f, I:g};
};
async function Ac(a, b, c = {}) {
  const {interval:d = 250, writable:e = process.stdout} = c;
  b = "function" == typeof b ? b() : b;
  const f = e.write.bind(e);
  let g = 1, h = `${a}${".".repeat(g)}`;
  f(h);
  c = setInterval(() => {
    g = (g + 1) % 4;
    h = `${a}${".".repeat(g)}`;
    f(`\r${" ".repeat(a.length + 3)}\r`);
    f(h);
  }, d);
  try {
    return await b;
  } finally {
    clearInterval(c), f(`\r${" ".repeat(a.length + 3)}\r`);
  }
}
;var Bc = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : Number.Infinity);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, Cc = (a) => {
  ({callee:{caller:a}} = a);
  return a;
};
const Dc = /\s+at.*(?:\(|\s)(.*)\)?/, Ec = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, Fc = l();
var V = (a, b = {}) => {
  const {ga:c = !1, ca:d = ["pirates"]} = b;
  b = d.join("|");
  const e = new RegExp(Ec.source.replace("IGNORED_MODULES", b));
  return a.replace(/\\/g, "/").split("\n").filter((a) => {
    a = a.match(Dc);
    if (null === a || !a[1]) {
      return !0;
    }
    a = a[1];
    return a.includes(".app/Contents/Resources/electron.asar") || a.includes(".app/Contents/Resources/default_app.asar") ? !1 : !e.test(a);
  }).filter((a) => "" !== a.trim()).map((a) => c ? a.replace(Dc, (a, b) => a.replace(b, b.replace(Fc, "~"))) : a).join("\n");
};
function Gc(a, b, c = !1) {
  return function(d) {
    var e = Cc(arguments), {stack:f} = Error();
    const g = Bc(f, 2, !0), h = (f = d instanceof Error) ? d.message : d;
    e = [`Error: ${h}`, ...null !== e && a === e || c ? [b] : [g, b]].join("\n");
    e = V(e);
    return Object.assign(f ? d : Error(), {message:h, stack:e});
  };
}
V && V.a && (V = V.default);
function W(a) {
  var {stack:b} = Error();
  const c = Cc(arguments);
  b = Bc(b, 2 + (a ? 1 : 0));
  return Gc(c, b, a);
}
;W && W.a && (W = W.default);
V && V.a && (V = V.default);
var Hc = class extends C {
  constructor(a) {
    a = void 0 === a ? {} : a;
    var b = Object.assign({}, a), c = void 0 === a.c ? W(!0) : a.c;
    a = (delete b.c, b);
    super(a);
    const {v:d, s:e} = a;
    this.a = [];
    this.l = new Promise((a, b) => {
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
          const c = V(a.stack);
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
  get g() {
    return this.l;
  }
}, Ic = async(a) => {
  var b = void 0 === b ? {v:!1} : b;
  ({g:a} = new Hc(Object.assign({}, {s:a}, b, {c:W(!0)})));
  return await a;
};
function Jc(a = []) {
  a = hc("java", a, {});
  const b = Kc(a);
  a.g = b;
  a.Sa = a.spawnargs.join(" ");
  return a;
}
const Kc = async(a) => {
  const [b, c, d] = await Promise.all([new Promise((b, c) => {
    a.on("error", c).on("exit", (a) => {
      b(a);
    });
  }), a.stdout ? Ic(a.stdout) : void 0, a.stderr ? Ic(a.stderr) : void 0]);
  return {code:b, stdout:c, stderr:d};
};
function Lc(a = {}) {
  const {usage:b = {}, description:c, line:d, ba:e} = a;
  a = Object.keys(b);
  const f = Object.values(b), [g] = a.reduce(([a = 0, c = 0], d) => {
    const e = b[d].split("\n").reduce((a, b) => b.length > a ? b.length : a, 0);
    e > c && (c = e);
    d.length > a && (a = d.length);
    return [a, c];
  }, []), h = (a, b) => {
    b = " ".repeat(b - a.length);
    return `${a}${b}`;
  };
  a = a.reduce((a, b, c) => {
    c = f[c].split("\n");
    b = h(b, g);
    const [d, ...e] = c;
    b = `${b}\t${d}`;
    const k = h("", g);
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
;const Mc = {black:30, red:31, green:32, yellow:33, blue:34, magenta:35, cyan:36, white:37, grey:90};
function X(a, b) {
  return (b = Mc[b]) ? `\x1b[${b}m${a}\x1b[0m` : a;
}
;const Nc = (a) => {
  if (a.length) {
    return `#!/usr/bin/env node\n${a.map((a) => `const ${"module" == a ? "_module" : a} = r` + `equire('${a}');`).join("\n") + "\n%output%"}`;
  }
};
const Oc = (a, b = (a) => a) => {
  const c = [];
  a = a.join(" ").replace(/--js (\S+)\s*/g, (a, d) => {
    a = `  --js ${X(b(d), "green")}`;
    c.push(a);
    return "";
  }).replace(/--externs (\S+)/g, (a, b) => `\n  --externs ${X(b, "grey")}`).replace(/--js_output_file (\S+)/g, (a, b) => `\n  --js_output_file ${X(b, "red")}`);
  const d = c.join("\n");
  return `${a}\n${d}`;
}, Pc = async(a) => {
  var b = la(a);
  b = [await U.read(a), "//" + `# sourceMappingURL=${b}.map`].join("\n");
  await U.write(a, b);
}, Qc = async(a) => {
  const b = (await U.read(a)).replace(/^'use strict';/m, " ".repeat(13));
  await U.write(a, b);
}, Rc = async(a, b) => {
  a = `${a}.map`;
  var c = await U.read(a);
  c = JSON.parse(c);
  var {sources:d} = c;
  d = d.map((a) => a.startsWith(" ") ? a : `/${w(b, a)}`);
  c.sources = d;
  c = JSON.stringify(c, null, 2);
  await U.write(a, c);
};
const Sc = (a, b) => {
  b = b.split("\n\n").map((a) => /^.+?:\d+:(?:\s*Originally at:\s*.+?)? WARNING -/.test(a) ? X(a, "grey") : X(a, "red")).join("\n\n");
  return `Exit code ${a}\n${b}`;
}, [Tc] = process.version.split(".", 1), Vc = async({K:a, a:b = "node_modules", force:c = !0}) => {
  const d = w("", v(u(require.resolve("depack/package.json")), "builtin-modules", Tc));
  return (await Promise.all(a.map(async(a) => {
    const e = v(b, a), g = v(e, "package.json");
    var h = v(e, "index.js");
    const k = {i:g, index:h};
    if (await U.exists(g) && !c) {
      if ((h = await Uc(g)) && h == Tc) {
        return k;
      }
      throw Error(`Could not prepare core module ${a}: ${e} exists.`);
    }
    await U.N(g);
    await U.write(g, JSON.stringify({name:a, module:"index.js", depack:Tc}));
    a = await U.read(v(d, `${a}.js`));
    await U.write(h, a);
    return k;
  }))).reduce((a, {i:b, index:c}) => [...a, b, c], []);
}, Uc = async(a) => {
  try {
    const b = await U.read(a), {depack:c} = JSON.parse(b);
    return c;
  } catch (b) {
  }
}, Wc = async(a, b) => {
  a = [...a, ...b];
  await Promise.all(a.map(async(a) => {
    var b = await U.read(a);
    b = JSON.parse(b);
    const {main:c, module:f} = b, g = f ? "module" : "main";
    var h = f || c, k = v(u(a), h);
    k = await U.exists(k);
    if (!k) {
      throw Error(`The ${g} for dependency ${a} does not exist.`);
    }
    k.isDirectory() && (h = v(h, "index.js"), b[g] = h, console.warn("Updating %s to point to a file.", a), await U.write(a, JSON.stringify(b, null, 2)));
  }));
};
const Xc = {fs:["events", "stream"], stream:["events"], child_process:["events", "stream"], Na:["events", "net", "stream"], Oa:["http", "tls"], Ta:["events", "net", "stream", "crypto"], crypto:["stream"], Pa:["events"], Ua:["stream"], Ra:["stream", "events"]}, $c = async(a, b) => {
  const {src:c, P:d = !1, C:e, Aa:f, Ja:g, aa:h, Ha:k, za:m} = a;
  if (!c) {
    throw Error("Source is not given.");
  }
  a = [...b, "--module_resolution", "NODE", "--package_json_entry_names", "module,main"];
  b = await wc(c);
  b = zc(b);
  const {$:n, qa:p, K:x, da:y, Ba:O} = b;
  var I = await Vc({K:x});
  const ib = await Yc(x);
  await Wc(p, O);
  I = [c, ...p, ...O, ...y, ...n, ...I].sort((a, b) => {
    if (a.startsWith("node_modules")) {
      return -1;
    }
    if (b.startsWith("node_modules")) {
      return 1;
    }
  });
  const jb = Nc(x);
  I = [...a, ...ib, ...n.length ? ["--process_common_js_modules"] : [], ...jb ? ["--output_wrapper", jb] : [], "--js", ...I];
  g ? console.error(I.join(" ")) : Zc(a, ib, b);
  ({g:a} = Jc(I));
  k || (a = Ac(`Running Google Closure Compiler ${X(h, "grey")}`, a, {writable:process.stderr}));
  const {stdout:kb, stderr:ea, code:lb} = await a;
  if (lb) {
    throw Error(Sc(lb, ea));
  }
  kb && console.log(kb);
  e && !m && await Pc(e);
  f && await Qc(e);
  e && await t(ma, [e, "755"]);
  ea && !d && console.warn(X(ea, "grey"));
}, Zc = (a, b, c) => {
  a = [...a, ...b].join(" ").replace(/--js_output_file (\S+)/g, (a, b) => `--js_output_file ${X(b, "red")}`).replace(/--externs (\S+)/g, (a, b) => `--externs ${X(b, "grey")}`).replace(/--compilation_level (\S+)/g, (a, b) => `--compilation_level ${X(b, "green")}`);
  console.error(a);
  const {$:d, K:e, da:f, I:g} = c;
  c = f.filter(ad);
  a = d.filter(ad);
  g.length && console.log("%s: %s", X("Dependencies", "yellow"), g.join(" "));
  c.length && console.log("%s: %s", X("Modules", "yellow"), c.join(" "));
  a.length && console.log("%s: %s", X("CommonJS", "yellow"), a.join(" "));
  e.length && console.log("%s: %s", X("Built-ins", "yellow"), e.join(", "));
}, ad = (a) => !a.startsWith("node_modules"), Yc = async(a) => {
  const b = w("", u(require.resolve("depack/package.json"))), c = v(b, "externs");
  a = [...a.reduce((a, b) => [...a, b, ...Xc[b] || []], []).filter((a, b, c) => c.indexOf(a) == b), "node"].map((a) => v(c, `${a}.js`));
  await Promise.all(a.map(async(a) => {
    if (!await U.exists(a)) {
      throw Error(`Externs ${a} don't exist.`);
    }
  }));
  return a.reduce((a, b) => [...a, "--externs", b], []);
};
var bd = () => {
  const a = Lc({line:"depack SOURCE [-c] [-o output.js] [-IO 2018] [-awVvh] [-l LEVEL] [... --generic-args]", usage:{SOURCE:"The source file to build.", "--output, -o":"Where to save the output. STDOUT by default.", "--language_in, -I":"Language Input. Can pass ECMA year.", "--language_out, -O":"Language Output. Can pass ECMA year.", "--level, -l":"The optimisation level (generic -O).\nWHITESPACE, SIMPLE (default), ADVANCED", "--advanced, -a":"Turn on advanced optimisation.", "--no-warnings, -w":"Don't print warnings.", 
  "--compile, -c":"Set the mode to compilation.", "--verbose, -V":"Print all compiler arguments.", "--pretty-print, -p":"Add --formatting=PRETTY_PRINT flag.", "--version, -v":"Show version.", "--help, -h":"Print help information.", "--no-sourcemap, -S":"Do not add source maps."}}), b = Lc({line:"depack SOURCE -c [-o output.js] [-s]", ba:"depack source.js -c -o bundle.js -I 2018 -O 2018", usage:{"--no-strict -s":'Remove "use strict" from the output.'}}), c = Lc({line:"depack SOURCE [-o output.js] [-H]", 
  ba:"depack source.js -o bundle.js -I 2018 -H", usage:{"-H":"Add import { h } from 'preact' to files."}});
  return `Google Closure Compiler-based packager for front and back-end.
https://github.com/dpck/depack
Performs static analysis on the source files to find out all dependencies.
Generic flags: https://github.com/google/closure-compiler/wiki/Flags-and-Options
  ${a}
  ${X("BACKEND", "blue")}: Creates a single executable file.
  ${b}
  ${X("FRONTEND", "cyan")}: Creates a bundle for the web.
  ${c}
  `;
};
const cd = async(a, b) => {
  const {src:c, G:d = "depack-temp", P:e = !1, C:f, D:g} = a;
  if (!c) {
    throw Error("Entry file is not given.");
  }
  if (!f) {
    throw Error("Destination path is not given.");
  }
  a = await Rb(c, {G:d, D:g});
  a = [...b, "--source_map_include_content", "--module_resolution", "NODE", ...a.reduce((a, b) => [...a, "--js", b], [])];
  ({g:b} = Jc(a));
  a = Oc(a, (a) => a.startsWith(d) ? w(d, a) : a);
  console.log(a);
  const {stdout:h, stderr:k, code:m} = await Ac("Running Google Closure Compiler", b);
  if (m) {
    throw Error(Sc(m, k));
  }
  await Pc(f);
  await Rc(f, d);
  h && console.log(h);
  k && !e && console.warn(X(k, "grey"));
  await U.ha(d);
};
const Y = function(a, b) {
  a = void 0 === a ? {} : a;
  b = void 0 === b ? process.argv : b;
  [, , ...b] = b;
  const c = gc(b);
  b = b.slice(c.length);
  let d = !c.length;
  return Object.keys(a).reduce((b, f) => {
    var e = Object.assign({}, b);
    b = b.u;
    e = (delete e.u, e);
    if (0 == b.length && d) {
      return Object.assign({}, {u:b}, e);
    }
    const h = a[f];
    let k;
    if ("string" == typeof h) {
      ({value:k, argv:b} = fc(b, f, h));
    } else {
      try {
        const {f:a, h:e, Qa:g, pa:x, multiple:y} = h;
        x && y && c.length ? (k = c, d = !0) : x && c.length ? (k = c[0], d = !0) : {value:k, argv:b} = fc(b, f, a, e, g);
      } catch (m) {
        return Object.assign({}, {u:b}, e);
      }
    }
    return void 0 === k ? Object.assign({}, {u:b}, e) : Object.assign({}, {u:b}, e, {[f]:k});
  }, {u:b});
}({src:{pa:!0}, advanced:{f:"a", h:!0}, help:{f:"h", h:!0}, output:{f:"o"}, compile:{f:"c", h:!0}, version:{f:"v", h:!0}, "no-warnings":{f:"w", h:!0}, level:{f:"l"}, language_in:{f:"I"}, language_out:{f:"O"}, node:{f:"n", h:!0}, temp:{}, "no-strict":{f:"s", h:!0}, verbose:{f:"V", h:!0}, "no-sourcemap":{f:"S", h:!0}, "_suppress-loading":{h:!0}, "pretty-print":{f:"p", h:!0}, preact:{f:"H", h:!0}}), dd = Y.src, ed = Y["pretty-print"], fd = Y["_suppress-loading"], gd = Y.help, hd = Y["no-sourcemap"], 
id = Y["no-strict"], jd = Y.verbose, kd = Y.temp, ld = Y.language_in, md = Y.language_out, nd = Y.level, od = Y.u, pd = Y.compile, qd = Y["no-warnings"], rd = Y.version, sd = Y.advanced, Z = Y.output, td = Y.preact;
const {GOOGLE_CLOSURE_COMPILER:ud} = process.env, vd = ud || require.resolve("google-closure-compiler-java/compiler.jar"), wd = ud ? "target" : require.resolve("google-closure-compiler-java/package.json");
rd && (console.log("0.0.1-alpha"), process.exit(0));
gd && (console.log(bd()), process.exit(0));
const xd = (a) => /^\d+$/.test(a) ? `ECMASCRIPT_${a}` : a;
(async() => {
  try {
    let p = "target";
    if (!ud) {
      var a = await U.read(wd);
      const {version:b} = JSON.parse(a);
      [p] = b.split(".");
    }
    var {src:b, C:c, level:d, xa:e, ya:f, Ga:g = !0, argv:h, advanced:k, Da:m} = {src:dd, C:Z, level:nd, xa:ld, ya:md, argv:od, advanced:sd, Ga:!!Z && !hd, Da:ed};
    a = ["-jar", vd];
    d ? a.push("--compilation_level", d) : k && a.push("--compilation_level", "ADVANCED");
    e && a.push("--language_in", xd(e));
    f && a.push("--language_out", xd(f));
    g && a.push("--create_source_map", "%outname%.map");
    m && a.push("--formatting", "PRETTY_PRINT");
    a.push(...h);
    if (Z) {
      const d = /\.js$/.test(c) ? c : v(c, la(b));
      a.push("--js_output_file", d);
    }
    var n = a;
    if (pd) {
      return await $c({src:dd, P:qd, C:Z, Aa:id, Ja:jd, aa:p, Ha:fd, za:hd}, n);
    }
    await cd({src:dd, C:Z, G:kd, P:qd, aa:p, D:td}, n);
  } catch (p) {
    process.env.DEBUG ? console.log(p.stack) : console.log(p.message);
  }
})();


//# sourceMappingURL=depack.js.map