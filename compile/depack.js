#!/usr/bin/env node
             
const readline = require('readline');
const fs = require('fs');
const path = require('path');
const stream = require('stream');
const os = require('os');
const _module = require('module');
const child_process = require('child_process');
const vm = require('vm');             
const aa = (a, b, c, d = !1, e = !1) => {
  const f = c ? new RegExp(`^-(${c}|-${b})$`) : new RegExp(`^--${b}$`);
  b = a.findIndex(g => f.test(g));
  if (-1 == b) {
    return {argv:a};
  }
  if (d) {
    return {value:!0, index:b, length:1};
  }
  d = a[b + 1];
  if (!d || "string" == typeof d && d.startsWith("--")) {
    return {argv:a};
  }
  e && (d = parseInt(d, 10));
  return {value:d, index:b, length:2};
}, ba = a => {
  const b = [];
  for (let c = 0; c < a.length; c++) {
    const d = a[c];
    if (d.startsWith("-")) {
      break;
    }
    b.push(d);
  }
  return b;
}, t = a => Object.keys(a).reduce((b, c) => {
  const d = a[c];
  if ("string" == typeof d) {
    return b[`-${d}`] = "", b;
  }
  c = d.command ? c : `--${c}`;
  d.short && (c = `${c}, -${d.short}`);
  let e = d.description;
  d.default && (e = `${e}\nDefault: ${d.default}.`);
  b[c] = e;
  return b;
}, {});
const ca = {source:{description:"The source entry to build.", command:!0}, output:{description:"Where to save the output.\nPrints to `stdout` when not passed.", short:"o"}, debug:{description:"The location of the file where to save sources after\neach pass.", short:"d"}, "pretty-print":{description:"Whether to apply the `--formatting=PRETTY_PRINT` flag.", boolean:!0, short:"p"}, "no-sourcemap":{description:"Disable source maps.", boolean:!0, short:"S"}, verbose:{description:"Print the exact command.", 
boolean:!0, short:"V"}, language_in:{description:"The language of the input sources, years also accepted.", short:"I"}, language_out:{description:"The language spec of the output, years accepted.", short:"O"}, level:{description:"The compilation level. Options:\nBUNDLE, WHITESPACE_ONLY, SIMPLE (default), ADVANCED.", short:"lvl"}, advanced:{description:"Whether to enable advanced optimisation.", boolean:!0, short:"a"}, "no-warnings":{description:"Do not print compiler's warnings by adding the\n`--warning_level QUIET` flag.", 
boolean:!0, short:"w"}, version:{description:"Shows the current _Depack_ and _GCC_ versions.", boolean:!0, short:"v"}, help:{description:"Prints the usage information.", boolean:!0, short:"h"}}, da = {iife:{description:"Add the IIFE flag to prevent name clashes.", boolean:!0, short:"i"}, temp:{description:"The path to the temp directory used to transpile JSX files.", default:"depack-temp"}, preact:{description:'Add the `import { h } from "preact"` to JSX files automatically.\nDoes not process files found in the `node_modules`, because\nthey are not placed in the temp, and must be built separately,\ne.g., with \u00c0LaMode transpiler.', 
boolean:!0, short:"H"}, external:{description:"The `preact` dependency in `node_modules` will be temporary\nrenamed to `_preact`, and a monkey-patching package that\nimports `\uff20externs/preact` will take its place. This is to allow\nbundles to import from _Preact_ installed as a script on a webpage,\nbut exclude it from compilation. `preact` will be restored at the end.", boolean:!0, short:"E"}, patch:{description:"Patches the `preact` directory like in `external`, and waits for\nuser input to restore it. Useful when linking packages and wanting\nto them from other projects.", 
boolean:!0, short:"P"}}, ea = {compile:{description:'Set the _Depack_ mode to "compile" to create a Node.JS binary.\nAdds the `#!usr/bin/env node` at the top and sets +x permission.', boolean:!0, short:"c"}, "no-strict":{description:'Whether to remove the `"use strict"` from the output.', boolean:!0, short:"s"}}, v = function(a = {}, b = process.argv) {
  let [, , ...c] = b;
  const d = ba(c);
  c = c.slice(d.length);
  a = Object.entries(a).reduce((g, [k, l]) => {
    g[k] = "string" == typeof l ? {short:l} : l;
    return g;
  }, {});
  const e = [];
  a = Object.entries(a).reduce((g, [k, l]) => {
    let h;
    try {
      const m = l.short, q = l.boolean, p = l.number, n = l.command, r = l.multiple;
      if (n && r && d.length) {
        h = d;
      } else {
        if (n && d.length) {
          h = d[0];
        } else {
          const u = aa(c, k, m, q, p);
          ({value:h} = u);
          const x = u.index, G = u.length;
          void 0 !== x && G && e.push({index:x, length:G});
        }
      }
    } catch (m) {
      return g;
    }
    return void 0 === h ? g : {...g, [k]:h};
  }, {});
  let f = c;
  e.forEach(({index:g, length:k}) => {
    Array.from({length:k}).forEach((l, h) => {
      f[g + h] = null;
    });
  });
  f = f.filter(g => null !== g);
  Object.assign(a, {G:f});
  return a;
}({...ca, ...da, ...ea}), ha = v.source, w = v.output, y = v.debug, ia = v["pretty-print"], ja = v["no-sourcemap"], ka = v.verbose, la = v.language_in, ma = v.language_out, na = v.level, oa = v.advanced, pa = v["no-warnings"], qa = v.version, ra = v.help, sa = v.iife, ta = v.temp || "depack-temp", ua = v.preact, va = v.external, wa = v.patch, xa = v.compile, ya = v["no-strict"], za = v.G;
const Aa = readline.createInterface;
const Ba = fs.chmod, Ca = fs.createReadStream, Da = fs.createWriteStream, z = fs.lstat, Ea = fs.mkdir, Fa = fs.readdir, Ga = fs.renameSync, Ha = fs.rmdir, Ia = fs.symlinkSync, Ja = fs.unlink, Ka = fs.unlinkSync;
var La = stream;
const Ma = stream.Transform, Na = stream.Writable;
const Oa = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : void 0);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, Pa = (a, b = !1) => Oa(a, 2 + (b ? 1 : 0)), Qa = a => {
  ({callee:{caller:a}} = a);
  return a;
};
const Ra = os.homedir;
const Sa = /\s+at.*(?:\(|\s)(.*)\)?/, Ta = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, Ua = Ra(), B = a => {
  const {pretty:b = !1, ignoredModules:c = ["pirates"]} = {}, d = c.join("|"), e = new RegExp(Ta.source.replace("IGNORED_MODULES", d));
  return a.replace(/\\/g, "/").split("\n").filter(f => {
    f = f.match(Sa);
    if (null === f || !f[1]) {
      return !0;
    }
    f = f[1];
    return f.includes(".app/Contents/Resources/electron.asar") || f.includes(".app/Contents/Resources/default_app.asar") ? !1 : !e.test(f);
  }).filter(f => f.trim()).map(f => b ? f.replace(Sa, (g, k) => g.replace(k, k.replace(Ua, "~"))) : f).join("\n");
};
function Va(a, b, c = !1) {
  return function(d) {
    var e = Qa(arguments), {stack:f} = Error();
    const g = Oa(f, 2, !0), k = (f = d instanceof Error) ? d.message : d;
    e = [`Error: ${k}`, ...null !== e && a === e || c ? [b] : [g, b]].join("\n");
    e = B(e);
    return Object.assign(f ? d : Error(), {message:k, stack:e});
  };
}
;function D(a) {
  var {stack:b} = Error();
  const c = Qa(arguments);
  b = Pa(b, a);
  return Va(c, b, a);
}
;const Wa = (a, b) => {
  b.once("error", c => {
    a.emit("error", c);
  });
  return b;
};
class Xa extends Na {
  constructor(a) {
    const {binary:b = !1, rs:c = null, ...d} = a || {}, {M:e = D(!0), proxyError:f} = a || {}, g = (k, l) => e(l);
    super(d);
    this.a = [];
    this.H = new Promise((k, l) => {
      this.on("finish", () => {
        let h;
        b ? h = Buffer.concat(this.a) : h = this.a.join("");
        k(h);
        this.a = [];
      });
      this.once("error", h => {
        if (-1 == h.stack.indexOf("\n")) {
          g`${h}`;
        } else {
          const m = B(h.stack);
          h.stack = m;
          f && g`${h}`;
        }
        l(h);
      });
      c && Wa(this, c).pipe(this);
    });
  }
  _write(a, b, c) {
    this.a.push(a);
    c();
  }
  get promise() {
    return this.H;
  }
}
const E = async a => {
  ({promise:a} = new Xa({rs:a, M:D(!0)}));
  return await a;
};
async function H(a) {
  a = Ca(a);
  return await E(a);
}
;async function I(a, b) {
  if (!a) {
    throw Error("No path is given.");
  }
  const c = D(!0), d = Da(a);
  await new Promise((e, f) => {
    d.on("error", g => {
      g = c(g);
      f(g);
    }).on("close", e).end(b);
  });
}
;async function J(a, b, c) {
  const d = D(!0);
  if ("function" != typeof a) {
    throw Error("Function must be passed.");
  }
  if (!a.length) {
    throw Error(`Function${a.name ? ` ${a.name}` : ""} does not accept any arguments.`);
  }
  return await new Promise((e, f) => {
    const g = (l, h) => l ? (l = d(l), f(l)) : e(c || h);
    let k = [g];
    Array.isArray(b) ? k = [...b, g] : 1 < Array.from(arguments).length && (k = [b, g]);
    a(...k);
  });
}
;const Ya = path.basename, K = path.dirname, L = path.join, Za = path.parse, M = path.relative, N = path.resolve, $a = path.sep;
async function ab(a) {
  const b = K(a);
  try {
    return await O(b), a;
  } catch (c) {
    if (/EEXIST/.test(c.message) && -1 != c.message.indexOf(b)) {
      return a;
    }
    throw c;
  }
}
async function O(a) {
  try {
    await J(Ea, a);
  } catch (b) {
    if ("ENOENT" == b.code) {
      const c = K(a);
      await O(c);
      await O(a);
    } else {
      if ("EEXIST" != b.code) {
        throw b;
      }
    }
  }
}
;async function bb(a, b) {
  b = b.map(async c => {
    const d = L(a, c);
    return {lstat:await J(z, d), path:d, relativePath:c};
  });
  return await Promise.all(b);
}
const cb = a => a.lstat.isDirectory(), db = a => !a.lstat.isDirectory();
async function eb(a) {
  if (!a) {
    throw Error("Please specify a path to the directory");
  }
  const {ignore:b = []} = {};
  if (!(await J(z, a)).isDirectory()) {
    var c = Error("Path is not a directory");
    c.code = "ENOTDIR";
    throw c;
  }
  c = await J(Fa, a);
  var d = await bb(a, c);
  c = d.filter(cb);
  d = d.filter(db).reduce((e, f) => {
    var g = f.lstat.isDirectory() ? "Directory" : f.lstat.isFile() ? "File" : f.lstat.isSymbolicLink() ? "SymbolicLink" : void 0;
    return {...e, [f.relativePath]:{type:g}};
  }, {});
  c = await c.reduce(async(e, {path:f, relativePath:g}) => {
    const k = M(a, f);
    if (b.includes(k)) {
      return e;
    }
    e = await e;
    f = await eb(f);
    return {...e, [g]:f};
  }, {});
  return {content:{...d, ...c}, type:"Directory"};
}
;const fb = async a => {
  await J(Ja, a);
}, gb = async a => {
  const {content:b} = await eb(a);
  var c = Object.keys(b).filter(e => {
    ({type:e} = b[e]);
    if ("File" == e || "SymbolicLink" == e) {
      return !0;
    }
  }), d = Object.keys(b).filter(e => {
    ({type:e} = b[e]);
    if ("Directory" == e) {
      return !0;
    }
  });
  c = c.map(e => L(a, e));
  await Promise.all(c.map(fb));
  d = d.map(e => L(a, e));
  await Promise.all(d.map(gb));
  await J(Ha, a);
}, hb = async a => {
  (await J(z, a)).isDirectory() ? await gb(a) : await fb(a);
};
const P = async a => {
  try {
    return await J(z, a);
  } catch (b) {
    return null;
  }
};
/*
 diff package https://github.com/kpdecker/jsdiff
 BSD License
 Copyright (c) 2009-2015, Kevin Decker <kpdecker@gmail.com>
*/
const ib = {black:30, red:31, green:32, yellow:33, blue:34, magenta:35, cyan:36, white:37, grey:90}, jb = {black:40, red:41, green:42, yellow:43, blue:44, magenta:45, cyan:46, white:47};
function Q(a, b) {
  return (b = ib[b]) ? `\x1b[${b}m${a}\x1b[0m` : a;
}
function kb(a, b) {
  return (b = jb[b]) ? `\x1b[${b}m${a}\x1b[0m` : a;
}
;const R = _module.builtinModules;
const S = async(a, b) => {
  b && (b = K(b), a = L(b, a));
  var c = await P(a);
  b = a;
  let d = !1;
  if (!c) {
    if (b = await lb(a), !b) {
      throw Error(`${a}.js or ${a}.jsx is not found.`);
    }
  } else {
    if (c.isDirectory()) {
      c = !1;
      let e;
      a.endsWith("/") || (e = b = await lb(a), c = !0);
      if (!e) {
        b = await lb(L(a, "index"));
        if (!b) {
          throw Error(`${c ? `${a}.jsx? does not exist, and ` : ""}index.jsx? file is not found in ${a}`);
        }
        d = !0;
      }
    }
  }
  return {path:a.startsWith(".") ? M("", b) : b, V:d};
}, lb = async a => {
  a = `${a}.js`;
  let b = await P(a);
  b || (a = `${a}x`);
  if (b = await P(a)) {
    return a;
  }
};
function mb(a, b) {
  var c = ["q", "from"];
  const d = [];
  b.replace(a, (e, ...f) => {
    e = f.slice(0, f.length - 2).reduce((g, k, l) => {
      l = c[l];
      if (!l || void 0 === k) {
        return g;
      }
      g[l] = k;
      return g;
    }, {});
    d.push(e);
  });
  return d;
}
;const nb = /^ *import(?:\s+(?:[^\s,]+)\s*,?)?(?:\s*{(?:[^}]+)})?\s+from\s+(['"])(.+?)\1/gm, ob = /^ *import\s+(?:.+?\s*,\s*)?\*\s+as\s+.+?\s+from\s+(['"])(.+?)\1/gm, pb = /^ *import\s+(['"])(.+?)\1/gm, qb = /^ *export\s+(?:{[^}]+?}|\*)\s+from\s+(['"])(.+?)\1/gm, rb = a => [nb, ob, pb, qb].reduce((b, c) => {
  c = mb(c, a).map(d => d.from);
  return [...b, ...c];
}, []);
const sb = a => {
  let [b, c, ...d] = a.split("/");
  !b.startsWith("@") && c ? (d = [c, ...d], c = b) : c = b.startsWith("@") ? `${b}/${c}` : b;
  return {name:c, paths:d.join("/")};
};
let tb;
const T = async(a, b, c = {}) => {
  tb || ({root:tb} = Za(process.cwd()));
  const {fields:d, soft:e = !1} = c;
  var f = L(a, "node_modules", b);
  f = L(f, "package.json");
  const g = await P(f);
  if (g) {
    a = await ub(f, d);
    if (void 0 === a) {
      throw Error(`The package ${M("", f)} does export the module.`);
    }
    if (!a.entryExists && !e) {
      throw Error(`The exported module ${a.main} in package ${b} does not exist.`);
    }
    const {entry:k, version:l, packageName:h, main:m, entryExists:q, ...p} = a;
    return {entry:M("", k), packageJson:M("", f), ...l ? {version:l} : {}, packageName:h, ...m ? {hasMain:!0} : {}, ...q ? {} : {entryExists:!1}, ...p};
  }
  if (a == tb && !g) {
    throw Error(`Package.json for module ${b} not found.`);
  }
  return T(L(N(a), ".."), b, c);
}, ub = async(a, b = []) => {
  const c = await H(a);
  let d, e, f, g, k;
  try {
    ({module:d, version:e, name:f, main:g, ...k} = JSON.parse(c)), k = b.reduce((h, m) => {
      h[m] = k[m];
      return h;
    }, {});
  } catch (h) {
    throw Error(`Could not parse ${a}.`);
  }
  a = K(a);
  b = d || g;
  if (!b) {
    if (!await P(L(a, "index.js"))) {
      return;
    }
    b = g = "index.js";
  }
  a = L(a, b);
  let l;
  try {
    ({path:l} = await S(a)), a = l;
  } catch (h) {
  }
  return {entry:a, version:e, packageName:f, main:!d && g, entryExists:!!l, ...k};
};
const vb = a => /^[./]/.test(a), wb = async(a, b, c, d, e = null) => {
  const f = D(), g = K(a);
  b = b.map(async k => {
    if (R.includes(k)) {
      return {internal:k};
    }
    if (/^[./]/.test(k)) {
      try {
        const {path:l} = await S(k, a);
        return {entry:l, package:e};
      } catch (l) {
      }
    } else {
      const {name:l, paths:h} = sb(k);
      if (h) {
        const {packageJson:m, packageName:q} = await T(g, l);
        k = K(m);
        ({path:k} = await S(L(k, h)));
        return {entry:k, package:q};
      }
    }
    try {
      const {entry:l, packageJson:h, version:m, packageName:q, hasMain:p, ...n} = await T(g, k, {fields:d});
      return q == e ? (console.warn("[static-analysis] Skipping package %s that imports itself in %s", q, a), null) : {entry:l, packageJson:h, version:m, name:q, ...p ? {hasMain:p} : {}, ...n};
    } catch (l) {
      if (c) {
        return null;
      }
      [k] = process.version.split(".");
      k = parseInt(k.replace("v", ""), 10);
      if (12 <= k) {
        throw l;
      }
      throw f(l);
    }
  });
  return (await Promise.all(b)).filter(Boolean);
}, yb = async(a, b = {}, {nodeModules:c = !0, shallow:d = !1, soft:e = !1, fields:f = [], X:g = {}, mergeSameNodeModules:k = !0, package:l} = {}) => {
  if (a in b) {
    return [];
  }
  b[a] = 1;
  var h = await H(a), m = rb(h);
  h = xb(h);
  m = c ? m : m.filter(vb);
  h = c ? h : h.filter(vb);
  try {
    const p = await wb(a, m, e, f, l), n = await wb(a, h, e, f, l);
    n.forEach(r => {
      r.required = !0;
    });
    var q = [...p, ...n];
  } catch (p) {
    throw p.message = `${a}\n [!] ${p.message}`, p;
  }
  l = k ? q.map(p => {
    var n = p.name, r = p.version;
    const u = p.required;
    if (n && r) {
      n = `${n}:${r}${u ? "-required" : ""}`;
      if (r = g[n]) {
        return r;
      }
      g[n] = p;
    }
    return p;
  }) : q;
  q = l.map(p => ({...p, from:a}));
  return await l.filter(({entry:p}) => p && !(p in b)).reduce(async(p, {entry:n, hasMain:r, packageJson:u, name:x, package:G}) => {
    if (u && d) {
      return p;
    }
    p = await p;
    x = (await yb(n, b, {nodeModules:c, shallow:d, soft:e, fields:f, package:x || G, X:g, mergeSameNodeModules:k})).map(C => ({...C, from:C.from ? C.from : n, ...!C.packageJson && r ? {hasMain:r} : {}}));
    return [...p, ...x];
  }, q);
}, xb = a => mb(/(?:^|[^\w\d_])require\(\s*(['"])(.+?)\1\s*\)/gm, a).map(b => b.from);
const U = async(a, b = {}) => {
  const c = D();
  a = Array.isArray(a) ? a : [a];
  a = await Promise.all(a.map(async h => {
    ({path:h} = await S(h));
    return h;
  }));
  const {nodeModules:d = !0, shallow:e = !1, soft:f = !1, fields:g = [], mergeSameNodeModules:k = !0} = b;
  let l;
  try {
    const h = {};
    l = await a.reduce(async(m, q) => {
      m = await m;
      q = await yb(q, h, {nodeModules:d, shallow:e, soft:f, fields:g, mergeSameNodeModules:k});
      m.push(...q);
      return m;
    }, []);
  } catch (h) {
    [b] = process.version.split(".");
    b = parseInt(b.replace("v", ""), 10);
    if (12 <= b) {
      throw h;
    }
    throw c(h);
  }
  return l.filter(({internal:h, entry:m}, q) => h ? l.findIndex(({internal:p}) => p == h) == q : l.findIndex(({entry:p}) => m == p) == q).map(h => {
    const m = h.entry, q = h.internal, p = l.filter(({internal:n, entry:r}) => {
      if (q) {
        return q == n;
      }
      if (m) {
        return m == r;
      }
    }).map(({from:n}) => n).filter((n, r, u) => u.indexOf(n) == r);
    return {...h, from:p};
  }).map(({package:h, ...m}) => h ? {package:h, ...m} : m);
}, zb = a => {
  const b = [], c = [], d = [], e = [], f = [], g = [];
  a.forEach(({packageJson:k, hasMain:l, name:h, entry:m, internal:q}) => {
    if (q) {
      return f.push(q);
    }
    k && l ? c.push(k) : k && b.push(k);
    m && l ? d.push(m) : m && e.push(m);
    h && g.push(h);
  });
  return {commonJsPackageJsons:c, packageJsons:b, commonJs:d, js:e, internals:f, deps:g};
};
const Ab = (a, b) => {
  a = " ".repeat(Math.max(a - b.length, 0));
  return `${b}${a}`;
}, Bb = a => {
  a = a.split("\n");
  const b = {}.width || a.reduce((c, {length:d}) => d > c ? d : c, 0);
  return a.map(Ab.bind(null, b)).join("\n");
};
function Cb(a) {
  const {padding:b = 1} = {};
  var c = a.split("\n").reduce((f, {length:g}) => g > f ? g : f, 0) + 2 * b;
  const d = `\u250c${"\u2500".repeat(c)}\u2510`;
  c = `\u2514${"\u2500".repeat(c)}\u2518`;
  const e = " ".repeat(b);
  a = Bb(a).split("\n").map(f => `\u2502${e}${f}${e}\u2502`).join("\n");
  return `${d}\n${a}\n${c}`;
}
;const V = (a, b, c, d = !1) => a.replace(new RegExp(`--${b} (\\\\\n)?(\\S+)`, "g"), (e, f, g) => `--${b} ${f || ""}${(d ? kb : Q)(g, c)}`), Eb = (a, b) => {
  a = Db(a);
  a = V(a, "compilation_level", "green", !0);
  a = V(a, "js_output_file", "red");
  b = b.filter(c => "--js" != c).map((c, d, e) => {
    if ("--chunk" == c) {
      return `${c} `;
    }
    if ("--chunk" == e[d - 1]) {
      return `${Q(c, "magenta")}${"\n     "}`;
    }
    c = `${Q(c, "green")}`;
    return e.length - 1 == d ? c : "--chunk" == e[d + 1] ? `${c}\n` : `${c}${"\n     "}`;
  }).join("");
  return `${a}\n--js ${b}`.trim();
}, Fb = async(a, {sourceMap:b}) => {
  const c = [await H(a)];
  b && (b = Ya(a), c.push("//" + `# sourceMappingURL=${b}.map`));
  await I(a, c.join("\n"));
}, Hb = async(a, b = "", c = !1) => {
  if (!b.startsWith("'use strict'") || c) {
    var d = await H(a);
    b = Gb(d, b, c);
    await I(a, b);
  }
}, Gb = (a, b = "", c = !1) => {
  const d = b.replace(/%output%$/, "");
  a = a.replace(d, "");
  const e = a.startsWith("'use strict';");
  let f = a;
  if (b || c) {
    f = a.replace(/'use strict';/, " ".repeat(13));
  }
  return `${c || !e ? d.replace(/'use strict';/, " ".repeat(13)) : d}${f}`;
}, Ib = async(a, b) => {
  a = `${a}.map`;
  var c = await H(a);
  c = JSON.parse(c);
  var {sources:d} = c;
  d = d.map(e => e.startsWith(" ") ? e : `/${M(b, e)}`);
  c.sources = d;
  c = JSON.stringify(c, null, 2);
  await I(a, c);
}, Jb = a => {
  if (a.length) {
    return `#!/usr/bin/env node
'use strict';
${a.map(b => {
      let c = b;
      ["module", "process", "console", "crypto"].includes(b) && (c = `_${b}`);
      return `const ${c} = r` + `equire('${b}');`;
    }).join("\n") + "%output%"}`;
  }
}, Kb = a => a.filter(({entry:b}) => {
  if (b) {
    return b.endsWith(".json");
  }
}), {DEPACK_MAX_COLUMNS:Lb = 87} = process.env, Db = a => {
  const b = process.stderr.columns - 3 || Lb;
  let c = 4;
  return a.reduce((d, e) => {
    c + e.length > b ? (d = d + " \\\n" + e, c = e.length) : (d = d + " " + e, c += e.length + 1);
    return d;
  }, "java");
}, Mb = async(a, b) => {
  await Promise.all(a.map(async c => {
    if (!await P(c)) {
      throw Error(`Externs file ${c}${b ? ` specified in the "externs" field of package ${b}` : ""} doesn't exist.`);
    }
  }));
}, Nb = async a => {
  const b = [];
  return {files:await a.reduce(async(c, {name:d, packageJson:e, externs:f = []}) => {
    c = await c;
    if (!e) {
      return c;
    }
    const g = K(e);
    f = Array.isArray(f) ? f : [f];
    f = f.filter(k => R.includes(k) ? (b.push(k), !1) : !0);
    e = f.map(k => L(g, k));
    await Mb(e, d);
    return [...c, ...e];
  }, []), W:b};
}, Ob = a => a.reduce((b, c) => [...b, "--externs", c], []);
const Pb = (a, b) => {
  b = b.split("\n\n").map(c => /^.+?:\d+:(?:\s*Originally at:\s*.+?)? WARNING -/.test(c) ? Q(c, "grey") : Q(c, "red")).join("\n\n");
  return `Exit code ${a}\n${b}`;
}, Qb = () => {
  let [a] = process.version.split(".", 1);
  const b = a.replace(/[^\d]/g, "");
  if (8 < b || 8 > b) {
    console.log("Your Node.JS version is %s but only externs for v8 are available at the moment. This can result in compiler warnings.", a), a = "v8";
  }
  return a;
}, Sb = async({internals:a, aa:b = "node_modules", force:c = !0}) => {
  const d = Qb(), e = require("@depack/nodejs")(d);
  return (await Promise.all(a.map(async f => {
    const g = L(b, f), k = L(g, "package.json");
    var l = L(g, "index.js");
    const h = {packageJson:k, index:l};
    if (await P(k) && !c) {
      if ((l = await Rb(k)) && l == d) {
        return h;
      }
      throw Error(`Could not prepare core module ${f}: ${g} exists.`);
    }
    await ab(k);
    await I(k, JSON.stringify({name:f, module:"index.js", depack:d}));
    f = await H(L(e, `${f}.js`));
    await I(l, f);
    return h;
  }))).reduce((f, {packageJson:g, index:k}) => [...f, g, k], []);
}, Rb = async a => {
  try {
    const b = await H(a), {depack:c} = JSON.parse(b);
    return c;
  } catch (b) {
  }
}, Tb = async(a, b) => {
  a = [...a, ...b];
  await Promise.all(a.map(async c => {
    var d = K(c), e = await H(c);
    e = JSON.parse(e);
    const {main:f, module:g} = e, k = g ? "module" : "main";
    let l = g || f;
    if (!l) {
      const q = L(K(c), "index.js");
      if (!await P(q)) {
        throw Error(`Package ${c} does not specify either main or module fields, and does not contain the index.js file.`);
      }
      e.main = "index.js";
      console.warn("Updating %s to have the main field.", c);
      await I(c, JSON.stringify(e, null, 2));
    }
    let h, m;
    try {
      ({V:h, path:m} = await S(l, c));
    } catch (q) {
      throw Error(`The ${k} for dependency ${c} does not exist.`);
    }
    h ? (d = L(l, "index.js"), e[k] = d, console.warn("Updating %s to point to a file.", c), await I(c, JSON.stringify(e, null, 2))) : L(d, e[k]) != m && (d = M(d, m), e[k] = d, console.warn("Updating %s to point to the file with extension.", c), await I(c, JSON.stringify(e, null, 2)));
  }));
};
async function Ub(a, b) {
  const {interval:c = 250, writable:d = process.stdout} = {writable:process.stderr};
  b = "function" == typeof b ? b() : b;
  const e = d.write.bind(d);
  var f = process.env.INDICATRIX_PLACEHOLDER;
  if (f && "0" != f) {
    return e(`${a}<INDICATRIX_PLACEHOLDER>`), await b;
  }
  let g = 1, k = `${a}${".".repeat(g)}`;
  e(k);
  f = setInterval(() => {
    g = (g + 1) % 4;
    k = `${a}${".".repeat(g)}`;
    e(`\r${" ".repeat(a.length + 3)}\r`);
    e(k);
  }, c);
  try {
    return await b;
  } finally {
    clearInterval(f), e(`\r${" ".repeat(a.length + 3)}\r`);
  }
}
;const Vb = child_process.spawn;
const Wb = async a => {
  const [b, c, d] = await Promise.all([new Promise((e, f) => {
    a.on("error", f).on("exit", g => {
      e(g);
    });
  }), a.stdout ? E(a.stdout) : void 0, a.stderr ? E(a.stderr) : void 0]);
  return {code:b, stdout:c, stderr:d};
};
function Xb(a) {
  a = Vb("java", a, void 0);
  const b = Wb(a);
  a.promise = b;
  a.spawnCommand = a.spawnargs.join(" ");
  return a;
}
;const Yb = async(a, b = {}) => {
  const c = b.debug, d = b.compilerVersion, e = b.output, f = b.noSourceMap;
  b = b.ba;
  let {promise:g, stderr:k} = Xb(a);
  c && k.pipe(Da(c));
  const {stdout:l, stderr:h, code:m} = await Ub(`Running Google Closure Compiler${d ? " " + Q(d, "grey") : ""}`, g);
  if (m) {
    throw Error(Pb(m, h));
  }
  f || (b ? await Promise.all(b.map(async q => {
    await Fb(q, {sourceMap:!0});
  })) : e && await Fb(e, {sourceMap:!f}));
  h && !c ? console.warn(Q(h, "grey")) : c && console.log("Sources after each pass saved to %s", c);
  return l;
};
const bc = async(a, b = {}, c = []) => {
  var d = a.src, e = a.noStrict;
  const f = a.verbose;
  a = a.silent;
  const g = b.output;
  if (!d) {
    throw Error("Source is not given.");
  }
  var k = c.reduce((A, F, fa, uc) => {
    if ("--externs" != F) {
      return A;
    }
    F = uc[fa + 1];
    if (!F) {
      return A;
    }
    R.includes(F) && (c[fa] = "", c[fa + 1] = "", A.push(F));
    return A;
  }, []);
  const l = [...k.length ? c.filter(A => A) : c, "--package_json_entry_names", "module,main", "--entry_point", d];
  var h = await U(d, {fields:["externs"]});
  const {files:m, W:q} = await Nb(h);
  m.length && console.error("%s %s", Q("Modules' externs:", "blue"), m.join(" "));
  const p = Ob(m);
  Zb(h);
  const n = zb(h);
  var r = n.commonJs, u = n.commonJsPackageJsons, x = n.internals;
  const G = n.js, C = n.packageJsons, wc = await Sb({internals:x});
  k = await $b(x, [...k, ...q]);
  await Tb(u, C);
  u = [d, ...u, ...C, ...G, ...r, ...wc].sort((A, F) => A.startsWith("node_modules") ? -1 : F.startsWith("node_modules") ? 1 : 0);
  d = Jb(x);
  h = Kb(h);
  x = [...l, ...k, ...p, ...1 < u.length ? ["--module_resolution", "NODE"] : [], ...r.length ? ["--process_common_js_modules"] : [], ...d ? ["--output_wrapper", d] : [], "--js", ...u];
  h.length && !r.length && (r = h.filter(({required:A}) => A, !1), r.length && (console.error("You are requiring JSON files. Make sure their relative paths will stay the same to the build."), console.log(r.map(({entry:A, from:F}) => `${Q(A, "blue")} from ${F.join(" ")}`).join("\n"))));
  f ? console.error(Db(x)) : ac(l, [...k, ...p], n);
  b = await Yb(x, b);
  if (!g) {
    return e = Gb(b, d, e).trim(), a || console.log(e), e;
  }
  await Hb(g, d, e);
  await J(Ba, [g, "755"]);
  return b;
}, ac = (a, b, c) => {
  a = Db([...a, ...b]);
  a = V(a, "js_output_file", "red");
  a = V(a, "externs", "grey");
  a = V(a, "compilation_level", "green", !0);
  console.error(a);
  var d = c.commonJs;
  a = c.internals;
  b = c.deps;
  c = c.js.filter(cc);
  d = d.filter(cc);
  b.length && console.error("%s: %s", Q("Dependencies", "yellow"), b.filter((e, f, g) => g.indexOf(e) == f).join(" "));
  c.length && console.error("%s: %s", Q("Modules", "yellow"), c.join(" "));
  d.length && console.error("%s: %s", Q("CommonJS", "yellow"), d.join(" "));
  a.length && console.error("%s: %s", Q("Built-ins", "yellow"), a.join(", "));
}, Zb = a => {
  const b = a.map(({hasMain:c, name:d, from:e}) => {
    if (c && d && (c = e.filter(f => {
      const g = a.find(({entry:k}) => k === f);
      if (g && !g.hasMain) {
        return !0;
      }
    }), c.length)) {
      return {name:d, R:c};
    }
  }).filter(Boolean);
  b.length && (console.error(Q(dc(), "red")), console.error("The following commonJS packages referenced in ES6 modules don't support named exports:"), b.forEach(({name:c, R:d}) => {
    console.error(" %s from %s", Q(c, "red"), Q(d.join(" "), "grey"));
  }));
}, dc = () => {
  let a = "CommonJS don't have named exports, make sure to use them like\nimport myModule from 'my-module' /* CommonJS Compat */\nmyModule.default.method('hello world') // yes Node.JS, wat r u doing\nmyModule.default('must explicitly call default')";
  const b = a.split("\n").reduce((c, {length:d}) => d > c ? d : c, 0);
  process.stderr.isTTY && b + 4 < process.stderr.columns && (a = Cb(a));
  return a;
}, cc = a => !a.startsWith("node_modules"), ec = (a, b, c) => c.indexOf(a) == b, $b = async(a, b = []) => {
  const c = require("@externs/nodejs"), d = c.dependencies, e = c();
  a = [...[...a, ...b].filter(ec).reduce((f, g) => {
    const k = d[g] || [];
    return [...f, g, ...k];
  }, []).filter(ec), "global", "global/buffer", "nodejs"].map(f => {
    ["module", "process", "console", "crypto"].includes(f) && (f = `_${f}`);
    return L(e, `${f}.js`);
  });
  await Mb(a);
  return Ob(a);
};
const fc = vm.Script;
const gc = (a, b) => {
  const [c, , d] = a.split("\n");
  a = parseInt(c.replace(/.+?(\d+)$/, (f, g) => g)) - 1;
  const e = d.indexOf("^");
  ({length:b} = b.split("\n").slice(0, a).join("\n"));
  return b + e + (a ? 1 : 0);
};
const hc = a => {
  try {
    new fc(a);
  } catch (b) {
    const c = b.stack;
    if (!/Unexpected token '?</.test(b.message)) {
      throw b;
    }
    return gc(c, a);
  }
  return null;
};
function ic(a) {
  if ("object" != typeof a) {
    return !1;
  }
  const b = a.re instanceof RegExp;
  a = -1 != ["string", "function"].indexOf(typeof a.replacement);
  return b && a;
}
const jc = (a, b) => {
  if (!(b instanceof Error)) {
    throw b;
  }
  [, , a] = a.stack.split("\n", 3);
  a = b.stack.indexOf(a);
  if (-1 == a) {
    throw b;
  }
  a = b.stack.substr(0, a - 1);
  const c = a.lastIndexOf("\n");
  b.stack = a.substr(0, c);
  throw b;
};
function W(a, b) {
  function c() {
    return b.filter(ic).reduce((d, {re:e, replacement:f}) => {
      if (this.b) {
        return d;
      }
      if ("string" == typeof f) {
        return d = d.replace(e, f);
      }
      {
        let g;
        return d.replace(e, (k, ...l) => {
          g = Error();
          try {
            return this.b ? k : f.call(this, k, ...l);
          } catch (h) {
            jc(g, h);
          }
        });
      }
    }, `${a}`);
  }
  c.a = () => {
    c.b = !0;
  };
  return c.call(c);
}
;const kc = a => new RegExp(`%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_(\\d+)_%%`, "g"), lc = (a, b) => `%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_${b}_%%`, mc = (a, b) => Object.keys(a).reduce((c, d) => {
  {
    var e = a[d];
    const {getReplacement:f = lc, getRegex:g = kc} = b || {}, k = g(d);
    e = {name:d, re:e, regExp:k, getReplacement:f, map:{}, lastIndex:0};
  }
  return {...c, [d]:e};
}, {}), X = a => {
  var b = [];
  const c = a.map;
  return {re:a.regExp, replacement(d, e) {
    d = c[e];
    delete c[e];
    return W(d, Array.isArray(b) ? b : [b]);
  }};
}, Y = a => {
  const b = a.map, c = a.getReplacement, d = a.name;
  return {re:a.re, replacement(e) {
    const f = a.lastIndex;
    b[f] = e;
    a.lastIndex += 1;
    return c(d, f);
  }};
};
async function nc(a, b) {
  return oc(a, b);
}
class pc extends Ma {
  constructor(a, b) {
    super(b);
    this.a = (Array.isArray(a) ? a : [a]).filter(ic);
    this.b = !1;
    this.S = b;
  }
  async replace(a, b) {
    const c = new pc(this.a, this.S);
    b && Object.assign(c, b);
    a = await nc(c, a);
    c.b && (this.b = !0);
    b && Object.keys(b).forEach(d => {
      b[d] = c[d];
    });
    return a;
  }
  async reduce(a) {
    return await this.a.reduce(async(b, {re:c, replacement:d}) => {
      b = await b;
      if (this.b) {
        return b;
      }
      if ("string" == typeof d) {
        b = b.replace(c, d);
      } else {
        const e = [];
        let f;
        const g = b.replace(c, (k, ...l) => {
          f = Error();
          try {
            if (this.b) {
              return e.length ? e.push(Promise.resolve(k)) : k;
            }
            const h = d.call(this, k, ...l);
            h instanceof Promise && e.push(h);
            return h;
          } catch (h) {
            jc(f, h);
          }
        });
        if (e.length) {
          try {
            const k = await Promise.all(e);
            b = b.replace(c, () => k.shift());
          } catch (k) {
            jc(f, k);
          }
        } else {
          b = g;
        }
      }
      return b;
    }, `${a}`);
  }
  async _transform(a, b, c) {
    try {
      const d = await this.reduce(a);
      this.push(d);
      c();
    } catch (d) {
      a = B(d.stack), d.stack = a, c(d);
    }
  }
}
async function oc(a, b) {
  b instanceof La ? b.pipe(a) : a.end(b);
  return await E(a);
}
;const qc = a => {
  [, a] = /<\s*(.+?)(?:\s+[\s\S]+)?\s*\/?\s*>/.exec(a) || [];
  return a;
}, sc = a => {
  let b = 0;
  const c = [];
  let d;
  W(a, [{re:/[{}]/g, replacement(l, h) {
    l = "}" == l;
    const m = !l;
    if (!b && l) {
      throw Error("A closing } is found without opening one.");
    }
    b += m ? 1 : -1;
    1 == b && m ? d = {open:h} : 0 == b && l && (d.close = h, c.push(d), d = {});
  }}]);
  if (b) {
    throw Error(`Unbalanced props (level ${b}) ${a}`);
  }
  const e = {}, f = [], g = {};
  var k = c.reduce((l, {open:h, close:m}) => {
    l = a.slice(l, h);
    const [, q, p, n, r] = /(\s*)(\S+)(\s*)=(\s*)$/.exec(l) || [];
    h = a.slice(h + 1, m);
    if (!p && !/\s*\.\.\./.test(h)) {
      throw Error("Could not detect prop name");
    }
    p ? e[p] = h : f.push(h);
    g[p] = {before:q, A:n, u:r};
    h = l || "";
    h = h.slice(0, h.length - (p || "").length - 1);
    const {m:u, h:x} = rc(h);
    Object.assign(e, u);
    Object.assign(g, x);
    return m + 1;
  }, 0);
  if (c.length) {
    k = a.slice(k);
    const {m:l, h} = rc(k);
    Object.assign(e, l);
    Object.assign(g, h);
  } else {
    const {m:l, h} = rc(a);
    Object.assign(e, l);
    Object.assign(g, h);
  }
  return {l:e, j:f, h:g};
}, rc = a => {
  const b = [], c = {};
  a.replace(/(\s*)(\S+)(\s*)=(\s*)(["'])([\s\S]+?)\5/g, (d, e, f, g, k, l, h, m) => {
    c[f] = {before:e, A:g, u:k};
    b.push({i:m, name:f, F:`${l}${h}${l}`});
    return "%".repeat(d.length);
  }).replace(/(\s*)([^\s%]+)/g, (d, e, f, g) => {
    c[f] = {before:e};
    b.push({i:g, name:f, F:"true"});
  });
  return {m:[...b.reduce((d, {i:e, name:f, F:g}) => {
    d[e] = [f, g];
    return d;
  }, [])].filter(Boolean).reduce((d, [e, f]) => {
    d[e] = f;
    return d;
  }, {}), h:c};
}, tc = (a, b = [], c = !1, d = {}, e = "") => {
  const f = Object.keys(a);
  return f.length || b.length ? `{${f.reduce((g, k) => {
    const l = a[k], h = c || -1 != k.indexOf("-") ? `'${k}'` : k, {before:m = "", A:q = "", u:p = ""} = d[k] || {};
    return [...g, `${m}${h}${q}:${p}${l}`];
  }, b).join(",")}${e}}` : "{}";
}, vc = (a = "") => {
  [a] = a;
  if (!a) {
    throw Error("No tag name is given");
  }
  return a.toUpperCase() == a;
}, xc = (a, b = {}, c = [], d = [], e = !1, f = null, g = {}, k = "") => {
  const l = vc(a), h = l ? a : `'${a}'`;
  if (!Object.keys(b).length && !c.length && !d.length) {
    return `h(${h})`;
  }
  const m = l && "dom" == e ? !1 : e;
  l || !d.length || e && "dom" != e || f && f(`JSX: destructuring ${d.join(" ")} is used without quoted props on HTML ${a}.`);
  a = tc(b, d, m, g, k);
  b = c.reduce((q, p, n) => {
    n = c[n - 1];
    return `${q}${n && /\S/.test(n) ? "," : ""}${p}`;
  }, "");
  return `h(${h},${a}${b ? `,${b}` : ""})`;
};
const yc = (a, b = []) => {
  let c = 0, d;
  a = W(a, [...b, {re:/[<>]/g, replacement(e, f) {
    if (d) {
      return e;
    }
    const g = "<" == e;
    c += g ? 1 : -1;
    0 == c && !g && (d = f);
    return e;
  }}]);
  if (c) {
    throw Error(1);
  }
  return {Y:a, D:d};
}, Ac = a => {
  const b = qc(a);
  let c;
  const {I:d} = mc({I:/=>/g});
  try {
    ({Y:l, D:c} = yc(a, [Y(d)]));
  } catch (h) {
    if (1 === h) {
      throw Error(`Could not find the matching closing > for ${b}.`);
    }
  }
  const e = l.slice(0, c + 1);
  var f = e.replace(/<\s*[^\s/>]+/, "");
  if (/\/\s*>$/.test(f)) {
    return a = f.replace(/\/\s*>$/, ""), f = "", new zc({g:e.replace(d.regExp, "=>"), f:a.replace(d.regExp, "=>"), content:"", tagName:b});
  }
  a = f.replace(/>$/, "");
  f = c + 1;
  c = !1;
  let g = 1, k;
  W(l, [{re:new RegExp(`[\\s\\S](?:<\\s*${b}(\\s+|>)|/\\s*${b}\\s*>)`, "g"), replacement(h, m, q, p) {
    if (c) {
      return h;
    }
    m = !m && h.endsWith(">");
    const n = !m;
    if (n) {
      p = p.slice(q);
      const {D:r} = yc(p.replace(/^[\s\S]/, " "));
      p = p.slice(0, r + 1);
      if (/\/\s*>$/.test(p)) {
        return h;
      }
    }
    g += n ? 1 : -1;
    0 == g && m && (c = q, k = c + h.length);
    return h;
  }}]);
  if (g) {
    throw Error(`Could not find the matching closing </${b}>.`);
  }
  f = l.slice(f, c);
  var l = l.slice(0, k).replace(d.regExp, "=>");
  return new zc({g:l, f:a.replace(d.regExp, "=>"), content:f.replace(d.regExp, "=>"), tagName:b});
};
class zc {
  constructor(a) {
    this.g = a.g;
    this.f = a.f;
    this.content = a.content;
    this.tagName = a.tagName;
  }
}
;const Bc = a => {
  let b = "", c = "";
  a = a.replace(/^(\r?\n\s*)([\s\S]+)?/, (d, e, f = "") => {
    b = e;
    return f;
  }).replace(/([\s\S]+?)?(\r?\n\s*)$/, (d, e = "", f = "") => {
    c = f;
    return e;
  });
  return `${b}${a ? `\`${a}\`` : ""}${c}`;
}, Dc = a => {
  const b = [];
  let c = {}, d = 0, e = 0;
  W(a, [{re:/[<{}]/g, replacement(f, g) {
    if (!(g < e)) {
      if (/[{}]/.test(f)) {
        d += "{" == f ? 1 : -1, 1 == d && void 0 == c.from ? c.from = g : 0 == d && (c.o = g + 1, c.N = a.slice(c.from + 1, g), b.push(c), c = {});
      } else {
        if (d) {
          return f;
        }
        f = Ac(a.slice(g));
        e = g + f.g.length;
        c.O = f;
        c.o = e;
        c.from = g;
        b.push(c);
        c = {};
      }
    }
  }}, {}]);
  return b.length ? Cc(a, b) : [Bc(a)];
}, Cc = (a, b) => {
  let c = 0;
  b = b.reduce((d, {from:e, o:f, N:g, O:k}) => {
    (e = a.slice(c, e)) && d.push(Bc(e));
    c = f;
    g ? d.push(g) : k && d.push(k);
    return d;
  }, []);
  if (c < a.length) {
    const d = a.slice(c, a.length);
    d && b.push(Bc(d));
  }
  return b;
};
const Fc = (a, b = {}) => {
  var c = b.quoteProps, d = b.warn, e = hc(a);
  if (null === e) {
    return a;
  }
  var f = a.slice(e);
  const {f:g = "", content:k, tagName:l, g:{length:h}} = Ac(f);
  f = Ec(k, c, d);
  const {l:m, j:q, h:p} = sc(g.replace(/^ */, ""));
  d = xc(l, m, f, q, c, d, p, /\s*$/.exec(g) || [""]);
  c = a.slice(0, e);
  a = a.slice(e + h);
  e = h - d.length;
  0 < e && (d = `${" ".repeat(e)}${d}`);
  a = `${c}${d}${a}`;
  return Fc(a, b);
}, Ec = (a, b = !1, c = null) => a ? Dc(a).reduce((d, e) => {
  if (e instanceof zc) {
    const {f:k = "", content:l, tagName:h} = e, {l:m, j:q} = sc(k);
    e = Ec(l, b, c);
    e = xc(h, m, e, q, b, c);
    return [...d, e];
  }
  const f = hc(e);
  if (f) {
    var g = e.slice(f);
    const {g:{length:k}, f:l = "", content:h, tagName:m} = Ac(g), {l:q, j:p} = sc(l);
    g = Ec(h, b, c);
    g = xc(m, q, g, p, b, c);
    const n = e.slice(0, f);
    e = e.slice(f + k);
    return [...d, `${n}${g}${e}`];
  }
  return [...d, e];
}, []) : [];
const Gc = (a, b = {}) => {
  const {e:c, K:d, L:e, i:f, T:g, U:k} = mc({K:/^ *export\s+default\s+{[\s\S]+?}/mg, e:/^ *export\s+(?:default\s+)?/mg, L:/^ *export\s+{[^}]+}\s+from\s+(['"])(?:.+?)\1/mg, i:/^ *import(\s+([^\s,]+)\s*,?)?(\s*{(?:[^}]+)})?\s+from\s+['"].+['"]/gm, T:/^ *import\s+(?:(.+?)\s*,\s*)?\*\s+as\s+.+?\s+from\s+['"].+['"]/gm, U:/^ *import\s+['"].+['"]/gm}, {getReplacement(l, h) {
    return `/*%%_RESTREAM_${l.toUpperCase()}_REPLACEMENT_${h}_%%*/`;
  }, getRegex(l) {
    return new RegExp(`/\\*%%_RESTREAM_${l.toUpperCase()}_REPLACEMENT_(\\d+)_%%\\*/`, "g");
  }});
  a = W(a, [Y(e), Y(d), Y(c), Y(f), Y(g), Y(k)]);
  b = Fc(a, b);
  return W(b, [X(e), X(d), X(c), X(f), X(g), X(k)]);
};
class Hc extends pc {
  constructor(a, b) {
    super([]);
    const c = this.replacement.bind(this);
    this.a = [{re:/^( *import(?:\s+[^\s,]+\s*,?)?(?:\s*{(?:[^}]+)})?\s+from\s+)['"](.+)['"]/gm, replacement:c}, {re:/^( *import\s+['"](.+)['"])/gm, replacement:c}, {re:/^( *export\s+{[^}]+?}\s+from\s+)['"](.+?)['"]/gm, replacement:c}];
    this.P = [];
    this.w = [];
    this.J = [];
    this.path = a;
    this.o = b;
    this.preactExtern = !1;
  }
  get nodeModules() {
    return this.P;
  }
  get deps() {
    return this.J;
  }
  async replacement(a, b, c) {
    var d = K(this.path);
    if (c.endsWith(".css")) {
      return this.w.push(c), a;
    }
    if (/^[./]/.test(c)) {
      var {path:e} = await S(c, this.path);
      c = M(d, e);
      if (e.startsWith("..")) {
        a: {
          let g = e;
          for (; "." != g;) {
            g = K(g);
            try {
              const k = N(g, "package.json"), l = require(k), h = e.replace(g, ""), m = L(l.name, "package.json"), q = require.resolve(m, {paths:[process.cwd()]});
              if (k == q) {
                var f = L(l.name, h);
                break a;
              }
            } catch (k) {
            }
          }
          f = void 0;
        }
        f && (c = L("node_modules", f), c = M(d, c));
      }
      this.deps.push(c);
      d = c.startsWith(".") ? "" : "./";
      return a == b ? b.replace(/(['"]).+\1/, `$1${d}${c.replace(/(\/index)?\.js$/, "")}$1`) : `${b}'${d}${c.replace(/(\/index)?\.js$/, "")}'`;
    }
    ({name:c} = sb(c));
    return "preact" == c && this.preactExtern ? ({entry:a} = await T(d, "@externs/preact"), this.nodeModules.push(a), `${b}'@externs/preact'`) : a;
  }
}
;const Jc = async(a, b, c) => {
  const d = c.C, e = c.B;
  var f = b.tempDir, g = b.preact;
  const k = b.preactExtern, l = await H(a);
  var h = a.endsWith(".jsx");
  const m = M("", K(a)), q = L(f, m), p = new Hc(a, q);
  p.preactExtern = k;
  p.end((g || k) && h ? `import { h } from '${k ? "@externs/preact" : "preact"}'
${l}` : l);
  g = await E(p);
  h = h ? await Ic(g, a) : g;
  if (a.startsWith("..")) {
    let n;
    for (g = a; "." != g && !n;) {
      g = K(g);
      try {
        const r = require(N(g, "package.json")), u = a.replace(g, "");
        n = L("node_modules", r.name, u);
      } catch (r) {
      }
    }
    n ? a = n : console.warn("Entry path %s is above CWD and linked package is not found. The temp file will be generated in %s", a, L(f, a));
  }
  a = L(f, a);
  await ab(a);
  await I(a, h);
  a = p.deps.map(n => L(m, n)).filter(n => !(n in e));
  f = p.nodeModules.filter(n => !(n in d));
  f.forEach(n => {
    d[n] = 1;
  });
  a.forEach(n => {
    e[n] = 1;
  });
  (await U(f)).forEach(({entry:n, packageJson:r}) => {
    r && (d[r] = 1);
    d[n] = 1;
  });
  await p.w.reduce(async(n, r) => {
    await n;
    n = L(m, r);
    n = `import injectStyle from 'depack/inject-css'

injectStyle(\`${await H(n)}\`)`;
    r = L(q, `${r}.js`);
    await I(r, n);
  }, {});
  await a.reduce(async(n, r) => {
    await n;
    await Jc(r, b, c);
  }, {});
}, Ic = async(a, b) => await Gc(a, {quoteProps:"dom", warn(c) {
  console.warn(Q(c, "yellow"));
  console.log(b);
}});
const Kc = async(a, b = {}) => {
  const {tempDir:c = "depack-temp", preact:d, preactExtern:e} = b;
  b = {B:{[M("", a)]:1}, C:{}};
  await Jc(a, {tempDir:c, preact:d, preactExtern:e}, b);
  return [...Object.keys(b.B).map(f => L(c, f)), ...Object.keys(b.C)];
};
const Mc = async a => {
  if (Array.isArray(a)) {
    if (a.some(Lc)) {
      return {c:!0};
    }
  } else {
    if (a.endsWith(".jsx")) {
      return {c:!0};
    }
  }
  a = await U(a, {shallow:!0});
  return {c:a.some(({entry:b, name:c}) => c ? !1 : b.endsWith(".jsx")), v:a};
}, Lc = a => a.endsWith(".jsx"), Nc = async(a, {tempDir:b, preact:c, preactExtern:d, Z:e}) => {
  let f = a;
  if (e) {
    return await Kc(a, {tempDir:b, preact:c, preactExtern:d}), f = L(b, a), {s:f, c:!0};
  }
  const {c:g, v:k} = await Mc(a);
  g && (await Kc(a, {tempDir:b, preact:c, preactExtern:d}), f = L(b, a));
  return {s:f, c:g, v:k};
}, Oc = async(a, b = {}, c = []) => {
  const {src:d, tempDir:e = "depack-temp", preact:f, preactExtern:g, silent:k} = a;
  a = b.output;
  var l = b.compilerVersion;
  const h = b.debug;
  b = b.noSourceMap;
  if (!d) {
    throw Error("Entry file is not given.");
  }
  let {s:m, c:q} = await Nc(d, {tempDir:e, preact:f, preactExtern:g});
  var p = await U(m, {fields:["externs"]});
  var {files:n} = await Nb(p);
  n = Ob(n);
  var r = zb(p);
  var u = r.commonJs;
  const x = r.commonJsPackageJsons, G = r.js;
  r = r.packageJsons;
  p = Kb(p);
  p = !(!u.length && !p.length);
  u = [m, ...u, ...r, ...G, ...x];
  c = [...c, ...n, ...a && !b ? ["--source_map_include_content"] : [], ...1 < u.length ? ["--module_resolution", "NODE"] : [], ...p ? ["--process_common_js_modules"] : []];
  n = q ? u.map(C => C.startsWith(e) ? M(e, C) : C) : u;
  n = Eb(c, n);
  console.error(n);
  c = [...c, "--js", ...u];
  l = await Yb(c, {debug:h, compilerVersion:l, output:a, noSourceMap:b, $:() => !1});
  a || !l || k || console.log(l);
  q && (a && !b && await Ib(a, e), await hb(e));
  return l;
};
const Pc = (a = {}) => {
  const {compiler:b = require.resolve("google-closure-compiler-java/compiler.jar"), output:c, level:d, advanced:e, languageIn:f, languageOut:g, sourceMap:k = !0, argv:l = [], prettyPrint:h, noWarnings:m, debug:q, iife:p, chunkOutput:n} = a;
  a = ["-jar", b];
  d ? a.push("--compilation_level", d) : e && a.push("--compilation_level", "ADVANCED");
  f && a.push("--language_in", /^\d+$/.test(f) ? `ECMASCRIPT_${f}` : f);
  g && a.push("--language_out", /^\d+$/.test(g) ? `ECMASCRIPT_${g}` : g);
  (c || n) && k && !q && a.push("--create_source_map", "%outname%.map");
  h && a.push("--formatting", "PRETTY_PRINT");
  q && a.push("--print_source_after_each_pass");
  p && a.push("--isolation_mode", "IIFE");
  (m || q) && a.push("--warning_level", "QUIET");
  a.push(...l);
  c && a.push("--js_output_file", c);
  n && a.push("--chunk_output_path_prefix", L(n, $a));
  return a;
}, Qc = a => {
  a = /\.js$/.test(w) ? w : L(w, Ya(a));
  return a = a.replace(/jsx$/, "js");
};
const Z = process.env.GOOGLE_CLOSURE_COMPILER, Rc = async() => {
  var a = "target";
  const b = Z ? "target" : require.resolve("google-closure-compiler-java/package.json");
  Z || (a = await H(b), {version:a} = JSON.parse(a), [a] = a.split("."));
  return a;
};
function Sc(a = {usage:{}}) {
  const {usage:b = {}, description:c, line:d, example:e} = a;
  a = Object.keys(b);
  const f = Object.values(b), [g] = a.reduce(([h = 0, m = 0], q) => {
    const p = b[q].split("\n").reduce((n, r) => r.length > n ? r.length : n, 0);
    p > m && (m = p);
    q.length > h && (h = q.length);
    return [h, m];
  }, []), k = (h, m) => {
    m = " ".repeat(m - h.length);
    return `${h}${m}`;
  };
  a = a.reduce((h, m, q) => {
    q = f[q].split("\n");
    m = k(m, g);
    const [p, ...n] = q;
    m = `${m}\t${p}`;
    const r = k("", g);
    q = n.map(u => `${r}\t${u}`);
    return [...h, m, ...q];
  }, []).map(h => `\t${h}`);
  const l = [c, `  ${d || ""}`].filter(h => h ? h.trim() : h).join("\n\n");
  a = `${l ? `${l}\n` : ""}
${a.join("\n")}
`;
  return e ? `${a}
  Example:

    ${e}
` : a;
}
;var Tc = () => {
  var a = t(ca), b = t(da), c = t(ea);
  a = Sc({line:"depack SOURCE [-cl] [-o output.js] [-IO 2018] [-wVvh] [-lvl LEVEL -a] [... --generic-args]", usage:a});
  c = Sc({line:"depack SOURCE -cl [-o output.js] [-s]", example:"depack src/bin.js -c -a -o depack/bin.js -p", usage:c});
  b = Sc({line:"depack SOURCE [-o output.js] [-H]", example:"depack source.js -o bundle.js -i -a -H", usage:b});
  return `Google Closure Compiler-based packager for the web and Node.JS.
https://artdecocode.com/depack/
Generic flags: https://github.com/google/closure-compiler/wiki/Flags-and-Options

${a}
${Q("BACKEND", "blue")}: Creates a single executable Node.JS file or a library.
${c}
${Q("FRONTEND", "cyan")}: Creates a bundle for the web.
${b}`;
};
ra && (console.log(Tc()), process.exit(0));
const Uc = () => {
  console.error(Q("monkey-patching preact", "yellow"));
  Ga("node_modules/preact", "node_modules/_preact");
  Ia(N(__dirname, "../preact"), "node_modules/preact");
}, Vc = () => {
  console.error(Q("cleaning up preact patch", "yellow"));
  try {
    Ka("node_modules/preact"), Ga("node_modules/_preact", "node_modules/preact");
  } catch (a) {
  }
};
(async() => {
  if (wa) {
    Uc();
    process.on("SIGINT", () => {
    });
    process.on("SIGTERM", () => {
    });
    process.on("beforeExit", Vc);
    const e = Aa({input:process.stdin, output:process.stdout});
    e.question("Press enter to continue", () => {
      e.close();
    });
  } else {
    try {
      const e = await Rc();
      if (qa) {
        var a = require("../package.json").version;
        console.log("Depack version: %s", a);
        const f = await Yb([...Pc({compiler:Z}), "--version"], {compilerVersion:e});
        console.log(f);
      } else {
        var {path:b} = await S(ha), c = w ? Qc(b) : void 0;
        a = ma;
        !ma && xa && (a = 2018);
        var d = Pc({compiler:Z, output:c, level:na, languageIn:la, languageOut:a, argv:za, advanced:oa, sourceMap:!!w && !ja, prettyPrint:ia, noWarnings:pa, debug:y, iife:sa});
        c = {compilerVersion:e, output:c, noSourceMap:ja || !!y, debug:y};
        if (xa) {
          return await bc({src:b, noStrict:ya, verbose:ka, debug:y}, c, d);
        }
        va && (Uc(), process.on("SIGINT", () => {
        }), process.on("SIGTERM", () => {
        }), process.on("beforeExit", Vc));
        await Oc({src:b, tempDir:ta, preact:ua}, c, d);
      }
    } catch (e) {
      process.env.DEBUG ? console.log(e.stack) : console.log(e.message);
    }
  }
})();


//# sourceMappingURL=depack.js.map