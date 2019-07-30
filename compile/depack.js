#!/usr/bin/env node
             
const readline = require('readline');
const fs = require('fs');
const path = require('path');
const stream = require('stream');
const os = require('os');
const _module = require('module');
const child_process = require('child_process');
const vm = require('vm');             
const aa = (a, b, c, d, e) => {
  d = void 0 === d ? !1 : d;
  e = void 0 === e ? !1 : e;
  const f = c ? new RegExp(`^-(${c}|-${b})`) : new RegExp(`^--${b}`);
  b = a.findIndex(g => f.test(g));
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
};
function r(a, b) {
  a = void 0 === a ? {} : a;
  b = void 0 === b ? process.argv : b;
  [, , ...b] = b;
  const c = ba(b);
  b = b.slice(c.length);
  let d = !c.length;
  return Object.keys(a).reduce((e, f) => {
    var g = Object.assign({}, e);
    e = e.a;
    g = (delete g.a, g);
    if (0 == e.length && d) {
      return Object.assign({}, {a:e}, g);
    }
    const k = a[f];
    let h;
    if ("string" == typeof k) {
      ({value:h, argv:e} = aa(e, f, k));
    } else {
      try {
        const {short:l, boolean:m, number:n, command:p, multiple:q} = k;
        p && q && c.length ? (h = c, d = !0) : p && c.length ? (h = c[0], d = !0) : {value:h, argv:e} = aa(e, f, l, m, n);
      } catch (l) {
        return Object.assign({}, {a:e}, g);
      }
    }
    return void 0 === h ? Object.assign({}, {a:e}, g) : Object.assign({}, {a:e}, g, {[f]:h});
  }, {a:b});
}
const ba = a => {
  const b = [];
  for (let c = 0; c < a.length; c++) {
    const d = a[c];
    if (d.startsWith("-")) {
      break;
    }
    b.push(d);
  }
  return b;
}, u = a => Object.keys(a).reduce((b, c) => {
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
boolean:!0, short:"w"}, version:{description:"Shows the current _Depack_ and _GCC_ versions.", boolean:!0, short:"v"}, help:{description:"Prints the usage information.", boolean:!0, short:"h"}}, w = r(ca), da = w.source, y = w.output, z = w.debug, ea = w["pretty-print"], ha = w["no-sourcemap"], ia = w.verbose, ja = w.language_in, ka = w.language_out, la = w.level, ma = w.advanced, na = w["no-warnings"], oa = w.version, pa = w.help, qa = {iife:{description:"Add the IIFE flag to prevent name clashes.", 
boolean:!0, short:"i"}, temp:{description:"The path to the temp directory used to transpile JSX files.", default:"depack-temp"}, preact:{description:'Add the `import { h } from "preact"` to JSX files automatically.\nDoes not process files found in the `node_modules`, because\nthey are not placed in the temp, and must be built separately,\ne.g., with \u00c0LaMode transpiler.', boolean:!0, short:"H"}, external:{description:"The `preact` dependency in `node_modules` will be temporary\nrenamed to `_preact`, and a monkey-patching package that\nimports `\uff20externs/preact` will take its place. This is to allow\nbundles to import from _Preact_ installed as a script on a webpage,\nbut exclude it from compilation. `preact` will be restored at the end.", 
boolean:!0, short:"E"}, patch:{description:"Patches the `preact` directory like in `external`, and waits for\nuser input to restore it. Useful when linking packages and wanting\nto them from other projects.", boolean:!0, short:"P"}}, A = r(qa, [process.argv[0], process.argv[1], ...w.a]), ra = A.iife, sa = A.temp || "depack-temp", ta = A.preact, ua = A.external, va = A.patch, wa = {compile:{description:'Set the _Depack_ mode to "compile" to create a Node.JS binary.\nAdds the `#!usr/bin/env node` at the top and sets +x permission.', 
boolean:!0, short:"c"}, library:{description:'Set the _Depack_ mode to "library" to create a Node.JS library.\nInitialises the `DEPACK_EXPORT` variable kept via an extern\nwhich is also exported as `module.exports`. The source code\nneeds to assign the library to this variable.', boolean:!0, short:"l"}, "no-strict":{description:'Whether to remove the `"use strict"` from the output.', boolean:!0, short:"s"}}, B = r(wa, [process.argv[0], process.argv[1], ...A.a]), xa = B.compile, C = B.library, ya = 
B["no-strict"], za = B.a;
const {createInterface:Aa} = readline;
const {chmod:Ba, createReadStream:Ca, createWriteStream:Da, lstat:E, mkdir:Ea, readdir:Fa, renameSync:Ga, rmdir:Ha, symlinkSync:Ia, unlink:Ja, unlinkSync:Ka} = fs;
var La = stream;
const {Transform:Ma, Writable:Na} = stream;
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
const {homedir:Ra} = os;
const Sa = /\s+at.*(?:\(|\s)(.*)\)?/, Ta = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, Ua = Ra(), G = a => {
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
    e = G(e);
    return Object.assign(f ? d : Error(), {message:k, stack:e});
  };
}
;function H(a) {
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
    var b = a || {}, c = Object.assign({}, b);
    const d = void 0 === b.binary ? !1 : b.binary, e = void 0 === b.rs ? null : b.rs;
    b = (delete c.binary, delete c.rs, c);
    const {P:f = H(!0), proxyError:g} = a || {}, k = (h, l) => f(l);
    super(b);
    this.b = [];
    this.J = new Promise((h, l) => {
      this.on("finish", () => {
        let m;
        d ? m = Buffer.concat(this.b) : m = this.b.join("");
        h(m);
        this.b = [];
      });
      this.once("error", m => {
        if (-1 == m.stack.indexOf("\n")) {
          k`${m}`;
        } else {
          const n = G(m.stack);
          m.stack = n;
          g && k`${m}`;
        }
        l(m);
      });
      e && Wa(this, e).pipe(this);
    });
  }
  _write(a, b, c) {
    this.b.push(a);
    c();
  }
  get promise() {
    return this.J;
  }
}
const I = async a => {
  var b = void 0 === b ? {} : b;
  ({promise:a} = new Xa(Object.assign({}, {rs:a}, b, {P:H(!0)})));
  return await a;
};
async function J(a) {
  a = Ca(a);
  return await I(a);
}
;async function K(a, b) {
  if (!a) {
    throw Error("No path is given.");
  }
  const c = H(!0), d = Da(a);
  await new Promise((e, f) => {
    d.on("error", g => {
      g = c(g);
      f(g);
    }).on("close", e).end(b);
  });
}
;function Ya(a, b) {
  if (b > a - 2) {
    throw Error("Function does not accept that many arguments.");
  }
}
async function L(a, b, c) {
  const d = H(!0);
  if ("function" !== typeof a) {
    throw Error("Function must be passed.");
  }
  const {length:e} = a;
  if (!e) {
    throw Error("Function does not accept any arguments.");
  }
  return await new Promise((f, g) => {
    const k = (l, m) => l ? (l = d(l), g(l)) : f(c || m);
    let h = [k];
    Array.isArray(b) ? (b.forEach((l, m) => {
      Ya(e, m);
    }), h = [...b, k]) : 1 < Array.from(arguments).length && (Ya(e, 0), h = [b, k]);
    a(...h);
  });
}
;const {basename:Za, dirname:M, join:N, relative:O, resolve:$a} = path;
async function ab(a) {
  const b = M(a);
  try {
    return await P(b), a;
  } catch (c) {
    if (/EEXIST/.test(c.message) && -1 != c.message.indexOf(b)) {
      return a;
    }
    throw c;
  }
}
async function P(a) {
  try {
    await L(Ea, a);
  } catch (b) {
    if ("ENOENT" == b.code) {
      const c = M(a);
      await P(c);
      await P(a);
    } else {
      if ("EEXIST" != b.code) {
        throw b;
      }
    }
  }
}
;async function bb(a, b) {
  b = b.map(async c => {
    const d = N(a, c);
    return {lstat:await L(E, d), path:d, relativePath:c};
  });
  return await Promise.all(b);
}
const cb = a => a.lstat.isDirectory(), db = a => !a.lstat.isDirectory();
async function eb(a) {
  if (!a) {
    throw Error("Please specify a path to the directory");
  }
  if (!(await L(E, a)).isDirectory()) {
    throw a = Error("Path is not a directory"), a.code = "ENOTDIR", a;
  }
  var b = await L(Fa, a);
  b = await bb(a, b);
  a = b.filter(cb);
  b = b.filter(db).reduce((c, d) => {
    var e = d.lstat.isDirectory() ? "Directory" : d.lstat.isFile() ? "File" : d.lstat.isSymbolicLink() ? "SymbolicLink" : void 0;
    return Object.assign({}, c, {[d.relativePath]:{type:e}});
  }, {});
  a = await a.reduce(async(c, d) => {
    var {path:e, relativePath:f} = d;
    c = await c;
    d = await eb(e);
    return Object.assign({}, c, {[f]:d});
  }, {});
  return {content:Object.assign({}, b, a), type:"Directory"};
}
;const fb = async a => {
  await L(Ja, a);
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
  c = c.map(e => N(a, e));
  await Promise.all(c.map(fb));
  d = d.map(e => N(a, e));
  await Promise.all(d.map(gb));
  await L(Ha, a);
}, hb = async a => {
  (await L(E, a)).isDirectory() ? await gb(a) : await fb(a);
};
const Q = async a => {
  try {
    return await L(E, a);
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
function R(a, b) {
  return (b = ib[b]) ? `\x1b[${b}m${a}\x1b[0m` : a;
}
function kb(a, b) {
  return (b = jb[b]) ? `\x1b[${b}m${a}\x1b[0m` : a;
}
;const S = async(a, b) => {
  b && (b = M(b), a = N(b, a));
  var c = await Q(a);
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
        b = await lb(N(a, "index"));
        if (!b) {
          throw Error(`${c ? `${a}.jsx? does not exist, and ` : ""}index.jsx? file is not found in ${a}`);
        }
        d = !0;
      }
    }
  }
  return {path:a.startsWith(".") ? O("", b) : b, X:d};
}, lb = async a => {
  a = `${a}.js`;
  let b = await Q(a);
  b || (a = `${a}x`);
  if (b = await Q(a)) {
    return a;
  }
};
const {builtinModules:mb} = _module;
function nb(a, b) {
  var c = ["q", "from"];
  const d = [];
  b.replace(a, (e, ...f) => {
    e = f.slice(0, f.length - 2).reduce((g, k, h) => {
      h = c[h];
      if (!h || void 0 === k) {
        return g;
      }
      g[h] = k;
      return g;
    }, {});
    d.push(e);
  });
  return d;
}
;const ob = /^ *import(?:\s+(?:[^\s,]+)\s*,?)?(?:\s*{(?:[^}]+)})?\s+from\s+(['"])(.+?)\1/gm, pb = /^ *import\s+(?:.+?\s*,\s*)?\*\s+as\s+.+?\s+from\s+(['"])(.+?)\1/gm, qb = /^ *import\s+(['"])(.+?)\1/gm, rb = /^ *export\s+(?:{[^}]+?}|\*)\s+from\s+(['"])(.+?)\1/gm, sb = a => [ob, pb, qb, rb].reduce((b, c) => {
  c = nb(c, a).map(d => d.from);
  return [...b, ...c];
}, []);
const tb = a => {
  let [b, c, ...d] = a.split("/");
  !b.startsWith("@") && c ? (d = [c, ...d], c = b) : c = b.startsWith("@") ? `${b}/${c}` : b;
  return {name:c, paths:d.join("/")};
};
const T = async(a, b, c) => {
  c = void 0 === c ? {} : c;
  const {fields:d, soft:e = !1} = c;
  var f = N(a, "node_modules", b);
  f = N(f, "package.json");
  var g = await Q(f);
  if (g) {
    a = await ub(f, d);
    if (void 0 === a) {
      throw Error(`The package ${O("", f)} does export the module.`);
    }
    if (!a.entryExists && !e) {
      throw Error(`The exported module ${a.main} in package ${b} does not exist.`);
    }
    var k = a, h = Object.assign({}, k);
    b = k.entry;
    a = k.version;
    c = k.packageName;
    g = k.main;
    k = k.entryExists;
    h = (delete h.entry, delete h.version, delete h.packageName, delete h.main, delete h.entryExists, h);
    return Object.assign({}, {entry:O("", b), packageJson:O("", f)}, a ? {version:a} : {}, {packageName:c}, g ? {hasMain:!0} : {}, k ? {} : {entryExists:!1}, h);
  }
  if ("/" == a && !g) {
    throw Error(`Package.json for module ${b} not found.`);
  }
  return T(N($a(a), ".."), b, c);
}, ub = async(a, b) => {
  b = void 0 === b ? [] : b;
  const c = await J(a);
  let d, e, f, g, k;
  try {
    var h = JSON.parse(c), l = Object.assign({}, h);
    d = h.module;
    e = h.version;
    f = h.name;
    g = h.main;
    k = (delete l.module, delete l.version, delete l.name, delete l.main, l);
    k = b.reduce((n, p) => {
      n[p] = k[p];
      return n;
    }, {});
  } catch (n) {
    throw Error(`Could not parse ${a}.`);
  }
  a = M(a);
  b = d || g;
  if (!b) {
    if (!await Q(N(a, "index.js"))) {
      return;
    }
    b = g = "index.js";
  }
  a = N(a, b);
  let m;
  try {
    ({path:m} = await S(a)), a = m;
  } catch (n) {
  }
  return Object.assign({}, {entry:a, version:e, packageName:f, main:!d && g, entryExists:!!m}, k);
};
const vb = a => /^[./]/.test(a), wb = async(a, b, c, d, e) => {
  e = void 0 === e ? null : e;
  const f = H(), g = M(a);
  b = b.map(async k => {
    if (mb.includes(k)) {
      return {internal:k};
    }
    if (/^[./]/.test(k)) {
      try {
        const {path:m} = await S(k, a);
        return {entry:m, package:e};
      } catch (m) {
      }
    } else {
      const {name:m, paths:n} = tb(k);
      if (n) {
        const {packageJson:p, packageName:q} = await T(g, m);
        k = M(p);
        ({path:k} = await S(N(k, n)));
        return {entry:k, package:q};
      }
    }
    try {
      var h = await T(g, k, {fields:d}), l = Object.assign({}, h);
      const m = h.entry, n = h.packageJson, p = h.version, q = h.packageName, t = h.hasMain, v = (delete l.entry, delete l.packageJson, delete l.version, delete l.packageName, delete l.hasMain, l);
      return q == e ? (console.warn("[static-analysis] Skipping package %s that imports itself in %s", q, a), null) : Object.assign({}, {entry:m, packageJson:n, version:p, name:q}, t ? {hasMain:t} : {}, v);
    } catch (m) {
      if (c) {
        return null;
      }
      throw f(m);
    }
  });
  return (await Promise.all(b)).filter(Boolean);
}, yb = async(a, b, c) => {
  b = void 0 === b ? {} : b;
  var {nodeModules:d = !0, shallow:e = !1, soft:f = !1, fields:g = [], package:k} = void 0 === c ? {} : c;
  if (a in b) {
    return [];
  }
  b[a] = 1;
  var h = await J(a);
  c = sb(h);
  h = xb(h);
  c = d ? c : c.filter(vb);
  h = d ? h : h.filter(vb);
  let l;
  try {
    var m = await wb(a, c, f, g, k);
    const n = await wb(a, h, f, g, k);
    n.forEach(p => {
      p.required = !0;
    });
    l = [...m, ...n];
  } catch (n) {
    throw n.message = `${a}\n [!] ${n.message}`, n;
  }
  m = l.map(n => Object.assign({}, n, {from:a}));
  return await l.filter(n => {
    ({entry:n} = n);
    return n && !(n in b);
  }).reduce(async(n, p) => {
    var {entry:q, hasMain:t, packageJson:v, name:F, package:D} = p;
    if (v && e) {
      return n;
    }
    n = await n;
    p = (await yb(q, b, {nodeModules:d, shallow:e, soft:f, fields:g, package:F || D})).map(x => Object.assign({}, x, {from:x.from ? x.from : q}, !x.packageJson && t ? {hasMain:t} : {}));
    return [...n, ...p];
  }, m);
}, xb = a => nb(/(?:^|[^\w\d_])require\(\s*(['"])(.+?)\1\s*\)/gm, a).map(b => b.from);
const U = async(a, b) => {
  b = void 0 === b ? {} : b;
  const c = H();
  ({path:a} = await S(a));
  const {nodeModules:d = !0, shallow:e = !1, soft:f = !1, fields:g = []} = b;
  let k;
  try {
    k = await yb(a, {}, {nodeModules:d, shallow:e, soft:f, fields:g});
  } catch (h) {
    throw c(h);
  }
  return k.filter((h, l) => {
    var {internal:m, entry:n} = h;
    return m ? k.findIndex(p => {
      ({internal:p} = p);
      return p == m;
    }) == l : k.findIndex(p => {
      ({entry:p} = p);
      return n == p;
    }) == l;
  }).map(h => {
    const {entry:l, internal:m} = h, n = k.filter(p => {
      var {internal:q, entry:t} = p;
      if (m) {
        return m == q;
      }
      if (l) {
        return l == t;
      }
    }).map(p => {
      ({from:p} = p);
      return p;
    }).filter((p, q, t) => t.indexOf(p) == q);
    return Object.assign({}, h, {from:n});
  }).map(h => {
    var l = Object.assign({}, h);
    h = h.package;
    l = (delete l.package, l);
    return h ? Object.assign({}, {package:h}, l) : l;
  });
}, zb = a => {
  const b = [], c = [], d = [], e = [], f = [], g = [];
  a.forEach(k => {
    var {packageJson:h, hasMain:l, name:m, entry:n, internal:p} = k;
    if (p) {
      return f.push(p);
    }
    h && l ? c.push(h) : h && b.push(h);
    n && l ? d.push(n) : n && e.push(n);
    m && g.push(m);
  });
  return {F:c, H:b, m:d, s:e, l:f, i:g};
};
const Ab = {url:["querystring"], stream:["events"], net:["stream", "events", "dns"], fs:["stream", "events", "url"], ha:["crypto", "dns", "net", "stream"], ba:["events", "net", "stream", "url"], da:["tls", "events", "http", "url"], ca:"events fs net stream tls http url".split(" "), zlib:["stream"], child_process:["events", "stream", "net"], Z:["child_process", "events", "net"], readline:["events", "stream"], fa:["stream", "readline"], $:["events", "dns"], ga:["buffer"], domain:["events"], ia:["net"]}, 
Bb = () => {
  const a = O("", M(require.resolve("@depack/externs/package.json")));
  return N(a, "v8");
};
const Cb = (a, b) => {
  a = " ".repeat(Math.max(a - b.length, 0));
  return `${b}${a}`;
}, Db = a => {
  var {width:b} = {};
  a = a.split("\n");
  b = b || a.reduce((c, {length:d}) => d > c ? d : c, 0);
  return a.map(Cb.bind(null, b)).join("\n");
};
function Eb(a) {
  const {padding:b = 1} = {};
  var c = a.split("\n").reduce((f, {length:g}) => g > f ? g : f, 0) + 2 * b;
  const d = `\u250c${"\u2500".repeat(c)}\u2510`;
  c = `\u2514${"\u2500".repeat(c)}\u2518`;
  const e = " ".repeat(b);
  a = Db(a).split("\n").map(f => `\u2502${e}${f}${e}\u2502`).join("\n");
  return `${d}\n${a}\n${c}`;
}
;const V = (a, b, c, d = !1) => a.replace(new RegExp(`--${b} (\\\\\n)?(\\S+)`, "g"), (e, f, g) => `--${b} ${f || ""}${(d ? kb : R)(g, c)}`), Gb = (a, b) => {
  a = Fb(a);
  a = V(a, "compilation_level", "green", !0);
  a = V(a, "js_output_file", "red");
  b = b.map(c => `${R(c, "green")}`).join("\n     ");
  return `${a}\n--js ${b}`.trim();
}, Hb = async(a, {sourceMap:b, library:c}) => {
  const d = [await J(a)];
  c && d.push("module.exports = DEPACK_EXPORT");
  b && (b = Za(a), d.push("//" + `# sourceMappingURL=${b}.map`));
  await K(a, d.join("\n"));
}, Jb = async(a, b = "", c = !1) => {
  if (!b.startsWith("'use strict'") || c) {
    var d = await J(a);
    b = Ib(d, b, c);
    await K(a, b);
  }
}, Ib = (a, b = "", c = !1) => {
  const d = b.replace(/%output%$/, "");
  a = a.replace(d, "");
  const e = a.startsWith("'use strict';");
  let f = a;
  if (b || c) {
    f = a.replace(/'use strict';/, " ".repeat(13));
  }
  return `${c || !e ? d.replace(/'use strict';/, " ".repeat(13)) : d}${f}`;
}, Kb = async(a, b) => {
  a = `${a}.map`;
  var c = await J(a);
  c = JSON.parse(c);
  var {sources:d} = c;
  d = d.map(e => e.startsWith(" ") ? e : `/${O(b, e)}`);
  c.sources = d;
  c = JSON.stringify(c, null, 2);
  await K(a, c);
}, Lb = (a, b = !1) => {
  if (a.length) {
    return a = a.map(c => {
      let d = c;
      ["module", "process", "console", "crypto"].includes(c) && (d = `_${c}`);
      return `const ${d} = r` + `equire('${c}');`;
    }).join("\n") + "%output%", b ? `'use strict';
let DEPACK_EXPORT;
${a}` : `#!/usr/bin/env node
'use strict';
${a}`;
  }
}, Mb = a => a.filter(({entry:b}) => {
  if (b) {
    return b.endsWith(".json");
  }
}), {DEPACK_MAX_COLUMNS:Nb = 87} = process.env, Fb = a => {
  const b = process.stderr.columns - 3 || Nb;
  let c = 4;
  return a.reduce((d, e) => {
    c + e.length > b ? (d = d + " \\\n" + e, c = e.length) : (d = d + " " + e, c += e.length + 1);
    return d;
  }, "java");
}, Ob = a => a.reduce((b, {packageJson:c, externs:d = []}) => {
  if (!c) {
    return b;
  }
  const e = M(c);
  d = Array.isArray(d) ? d : [d];
  d = d.map(f => N(e, f));
  return [...b, ...d];
}, []), Pb = a => a.reduce((b, c) => [...b, "--externs", c], []);
const [Qb] = process.version.split(".", 1), Rb = (a = Qb) => O("", N(M(require.resolve("@depack/nodejs/package.json")), "builtin-modules", a));
const Sb = (a, b) => {
  b = b.split("\n\n").map(c => /^.+?:\d+:(?:\s*Originally at:\s*.+?)? WARNING -/.test(c) ? R(c, "grey") : R(c, "red")).join("\n\n");
  return `Exit code ${a}\n${b}`;
}, [Tb] = process.version.split(".", 1), Vb = async({l:a, ea:b = "node_modules", force:c = !0}) => {
  const d = Rb(Tb);
  return (await Promise.all(a.map(async e => {
    const f = N(b, e), g = N(f, "package.json");
    var k = N(f, "index.js");
    const h = {packageJson:g, index:k};
    if (await Q(g) && !c) {
      if ((k = await Ub(g)) && k == Tb) {
        return h;
      }
      throw Error(`Could not prepare core module ${e}: ${f} exists.`);
    }
    await ab(g);
    await K(g, JSON.stringify({name:e, module:"index.js", depack:Tb}));
    e = await J(N(d, `${e}.js`));
    await K(k, e);
    return h;
  }))).reduce((e, {packageJson:f, index:g}) => [...e, f, g], []);
}, Ub = async a => {
  try {
    const b = await J(a), {depack:c} = JSON.parse(b);
    return c;
  } catch (b) {
  }
}, Wb = async(a, b) => {
  a = [...a, ...b];
  await Promise.all(a.map(async c => {
    var d = M(c), e = await J(c);
    e = JSON.parse(e);
    const {main:f, module:g} = e, k = g ? "module" : "main";
    let h = g || f;
    if (!h) {
      const n = N(M(c), "index.js");
      if (!await Q(n)) {
        throw Error(`Package ${c} does not specify either main or module fields, and does not contain the index.js file.`);
      }
      e.main = "index.js";
      console.warn("Updating %s to have the main field.", c);
      await K(c, JSON.stringify(e, null, 2));
    }
    let l, m;
    try {
      ({X:l, path:m} = await S(h, c));
    } catch (n) {
      throw Error(`The ${k} for dependency ${c} does not exist.`);
    }
    l ? (d = N(h, "index.js"), e[k] = d, console.warn("Updating %s to point to a file.", c), await K(c, JSON.stringify(e, null, 2))) : N(d, e[k]) != m && (d = O(d, m), e[k] = d, console.warn("Updating %s to point to the file with extension.", c), await K(c, JSON.stringify(e, null, 2)));
  }));
};
async function Xb(a, b) {
  const {interval:c = 250, writable:d = process.stdout} = {writable:process.stderr};
  b = "function" == typeof b ? b() : b;
  const e = d.write.bind(d);
  let f = 1, g = `${a}${".".repeat(f)}`;
  e(g);
  const k = setInterval(() => {
    f = (f + 1) % 4;
    g = `${a}${".".repeat(f)}`;
    e(`\r${" ".repeat(a.length + 3)}\r`);
    e(g);
  }, c);
  try {
    return await b;
  } finally {
    clearInterval(k), e(`\r${" ".repeat(a.length + 3)}\r`);
  }
}
;const {spawn:Yb} = child_process;
const Zb = async a => {
  const [b, c, d] = await Promise.all([new Promise((e, f) => {
    a.on("error", f).on("exit", g => {
      e(g);
    });
  }), a.stdout ? I(a.stdout) : void 0, a.stderr ? I(a.stderr) : void 0]);
  return {code:b, stdout:c, stderr:d};
};
const $b = async(a, b, c = !1) => {
  const {debug:d, compilerVersion:e = "", output:f, noSourceMap:g} = b;
  a = Yb("java", a, void 0);
  b = Zb(a);
  a.promise = b;
  a.spawnCommand = a.spawnargs.join(" ");
  let {promise:k, stderr:h} = a;
  d && h.pipe(Da(d));
  const {stdout:l, stderr:m, code:n} = await Xb(`Running Google Closure Compiler${e ? " " + R(e, "grey") : ""}`, k);
  if (n) {
    throw Error(Sb(n, m));
  }
  f && await Hb(f, {library:c, sourceMap:!g});
  m && !d ? console.warn(R(m, "grey")) : d && console.log("Sources after each pass saved to %s", d);
  return l;
};
const dc = async(a, b, c = []) => {
  const {src:d, noStrict:e, verbose:f, library:g} = a;
  ({output:a} = b);
  if (!d) {
    throw Error("Source is not given.");
  }
  c = [...c, "--package_json_entry_names", "module,main", "--entry_point", d];
  var k = await U(d, {fields:["externs"]}), h = Ob(k);
  h.length && console.error("%s %s", R("Modules' externs:", "blue"), h.join(" "));
  h = Pb(h);
  ac(k);
  const l = zb(k), {m, F:n, l:p, s:q, H:t} = l;
  var v = await Vb({l:p});
  const F = await bc(p, g);
  await Wb(n, t);
  var D = [d, ...n, ...t, ...q, ...m, ...v].sort((x, fa) => x.startsWith("node_modules") ? -1 : fa.startsWith("node_modules") ? 1 : 0);
  v = Lb(p, g);
  k = Mb(k);
  D = [...c, ...F, ...h, ...1 < D.length ? ["--module_resolution", "NODE"] : [], ...m.length ? ["--process_common_js_modules"] : [], ...v ? ["--output_wrapper", v] : [], "--js", ...D];
  k.length && !m.length && (k = k.filter(({required:x}) => x, !1), k.length && (console.error("You are requiring JSON files. Make sure their relative paths will stay the same to the build."), console.log(k.map(({entry:x, from:fa}) => `${R(x, "blue")} from ${fa.join(" ")}`).join("\n"))));
  f ? console.error(Fb(D)) : cc(c, [...F, ...h], l);
  b = await $b(D, b, g);
  a ? (await Jb(a, v, e), await L(Ba, [a, "755"])) : (b = Ib(b, v, e), console.log(b.trim()));
}, cc = (a, b, c) => {
  a = Fb([...a, ...b]);
  a = V(a, "js_output_file", "red");
  a = V(a, "externs", "grey");
  a = V(a, "compilation_level", "green", !0);
  console.error(a);
  const {m:d, l:e, s:f, i:g} = c;
  c = f.filter(ec);
  a = d.filter(ec);
  g.length && console.error("%s: %s", R("Dependencies", "yellow"), g.filter((k, h, l) => l.indexOf(k) == h).join(" "));
  c.length && console.error("%s: %s", R("Modules", "yellow"), c.join(" "));
  a.length && console.error("%s: %s", R("CommonJS", "yellow"), a.join(" "));
  e.length && console.error("%s: %s", R("Built-ins", "yellow"), e.join(", "));
}, ac = a => {
  const b = a.map(({hasMain:c, name:d, from:e}) => {
    if (c && d && (c = e.filter(f => {
      const g = a.find(({entry:k}) => k === f);
      if (g && !g.hasMain) {
        return !0;
      }
    }), c.length)) {
      return {name:d, U:c};
    }
  }).filter(Boolean);
  b.length && (console.error(R(fc(), "red")), console.error("The following commonJS packages referenced in ES6 modules don't support named exports:"), b.forEach(({name:c, U:d}) => {
    console.error(" %s from %s", R(c, "red"), R(d.join(" "), "grey"));
  }));
}, fc = () => {
  let a = "CommonJS don't have named exports, make sure to use them like\nimport myModule from 'my-module' /* CommonJS Compat */\nmyModule.default.method('hello world') // yes Node.JS, wat r u doing\nmyModule.default('must explicitly call default')";
  const b = a.split("\n").reduce((c, {length:d}) => d > c ? d : c, 0);
  process.stderr.isTTY && b + 4 < process.stderr.columns && (a = Eb(a));
  return a;
}, ec = a => !a.startsWith("node_modules"), bc = async(a, b = !1) => {
  const c = Bb();
  a = [...a.reduce((d, e) => {
    const f = Ab[e] || [];
    return [...d, e, ...f];
  }, []).filter((d, e, f) => f.indexOf(d) == e), "global", "global/buffer", "nodejs", ...b ? ["depack"] : []].map(d => {
    ["module", "process", "console", "crypto"].includes(d) && (d = `_${d}`);
    return N(c, `${d}.js`);
  });
  await Promise.all(a.map(async d => {
    if (!await Q(d)) {
      throw Error(`Externs ${d} don't exist.`);
    }
  }));
  return Pb(a);
};
const {Script:gc} = vm;
const hc = (a, b) => {
  const [c, , d] = a.split("\n");
  a = parseInt(c.replace(/.+?(\d+)$/, (f, g) => g)) - 1;
  const e = d.indexOf("^");
  ({length:b} = b.split("\n").slice(0, a).join("\n"));
  return b + e + (a ? 1 : 0);
};
const ic = a => {
  try {
    new gc(a);
  } catch (b) {
    const {message:c, stack:d} = b;
    if ("Unexpected token <" != c) {
      throw b;
    }
    return hc(d, a);
  }
  return null;
};
function jc(a) {
  if ("object" != typeof a) {
    return !1;
  }
  const {re:b, replacement:c} = a;
  a = b instanceof RegExp;
  const d = -1 != ["string", "function"].indexOf(typeof c);
  return a && d;
}
const kc = (a, b) => {
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
    return b.filter(jc).reduce((d, {re:e, replacement:f}) => {
      if (this.c) {
        return d;
      }
      if ("string" == typeof f) {
        return d = d.replace(e, f);
      }
      {
        let g;
        return d.replace(e, (k, ...h) => {
          g = Error();
          try {
            return this.c ? k : f.call(this, k, ...h);
          } catch (l) {
            kc(g, l);
          }
        });
      }
    }, `${a}`);
  }
  c.b = () => {
    c.c = !0;
  };
  return c.call(c);
}
;const lc = a => new RegExp(`%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_(\\d+)_%%`, "g"), mc = (a, b) => `%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_${b}_%%`, nc = (a, b) => Object.keys(a).reduce((c, d) => {
  {
    var e = a[d];
    const {getReplacement:f = mc, getRegex:g = lc} = b || {}, k = g(d);
    e = {name:d, re:e, regExp:k, getReplacement:f, map:{}, lastIndex:0};
  }
  return Object.assign({}, c, {[d]:e});
}, {}), X = a => {
  var b = void 0 === b ? [] : b;
  const {regExp:c, map:d} = a;
  return {re:c, replacement(e, f) {
    e = d[f];
    delete d[f];
    return W(e, Array.isArray(b) ? b : [b]);
  }};
}, Y = a => {
  const {re:b, map:c, getReplacement:d, name:e} = a;
  return {re:b, replacement(f) {
    const {lastIndex:g} = a;
    c[g] = f;
    a.lastIndex += 1;
    return d(e, g);
  }};
};
async function oc(a, b) {
  b instanceof La ? b.pipe(a) : a.end(b);
  return await I(a);
}
class pc extends Ma {
  constructor(a, b) {
    super(b);
    this.b = (Array.isArray(a) ? a : [a]).filter(jc);
    this.c = !1;
    this.T = b;
  }
  async replace(a, b) {
    const c = new pc(this.b, this.T);
    b && Object.assign(c, b);
    a = await oc(c, a);
    c.c && (this.c = !0);
    b && Object.keys(b).forEach(d => {
      b[d] = c[d];
    });
    return a;
  }
  async reduce(a) {
    return await this.b.reduce(async(b, {re:c, replacement:d}) => {
      b = await b;
      if (this.c) {
        return b;
      }
      if ("string" == typeof d) {
        b = b.replace(c, d);
      } else {
        const e = [];
        let f;
        const g = b.replace(c, (k, ...h) => {
          f = Error();
          try {
            if (this.c) {
              return e.length ? e.push(Promise.resolve(k)) : k;
            }
            const l = d.call(this, k, ...h);
            l instanceof Promise && e.push(l);
            return l;
          } catch (l) {
            kc(f, l);
          }
        });
        if (e.length) {
          try {
            const k = await Promise.all(e);
            b = b.replace(c, () => k.shift());
          } catch (k) {
            kc(f, k);
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
      a = G(d.stack), d.stack = a, c(d);
    }
  }
}
;const qc = a => {
  [, a] = /<\s*(.+?)(?:\s+[\s\S]+)?\s*\/?\s*>/.exec(a) || [];
  return a;
}, sc = a => {
  let b = 0;
  const c = [];
  let d;
  W(a, [{re:/[{}]/g, replacement(h, l) {
    h = "}" == h;
    const m = !h;
    if (!b && h) {
      throw Error("A closing } is found without opening one.");
    }
    b += m ? 1 : -1;
    1 == b && m ? d = {open:l} : 0 == b && h && (d.close = l, c.push(d), d = {});
  }}]);
  if (b) {
    throw Error(`Unbalanced props (level ${b}) ${a}`);
  }
  const e = {}, f = [], g = {};
  var k = c.reduce((h, {open:l, close:m}) => {
    h = a.slice(h, l);
    const [, n, p, q, t] = /(\s*)(\S+)(\s*)=(\s*)$/.exec(h) || [];
    l = a.slice(l + 1, m);
    if (!p && !/\s*\.\.\./.test(l)) {
      throw Error("Could not detect prop name");
    }
    p ? e[p] = l : f.push(l);
    g[p] = {before:n, B:q, A:t};
    l = h || "";
    l = l.slice(0, l.length - (p || "").length - 1);
    const {v, h:F} = rc(l);
    Object.assign(e, v);
    Object.assign(g, F);
    return m + 1;
  }, 0);
  if (c.length) {
    k = a.slice(k);
    const {v:h, h:l} = rc(k);
    Object.assign(e, h);
    Object.assign(g, l);
  } else {
    const {v:h, h:l} = rc(a);
    Object.assign(e, h);
    Object.assign(g, l);
  }
  return {u:e, o:f, h:g};
}, rc = a => {
  const b = [], c = {};
  a.replace(/(\s*)(\S+)(\s*)=(\s*)(["'])([\s\S]+?)\5/g, (d, e, f, g, k, h, l, m) => {
    c[f] = {before:e, B:g, A:k};
    b.push({j:m, name:f, I:`${h}${l}${h}`});
    return "%".repeat(d.length);
  }).replace(/(\s*)([^\s%]+)/g, (d, e, f, g) => {
    c[f] = {before:e};
    b.push({j:g, name:f, I:"true"});
  });
  return {v:[...b.reduce((d, {j:e, name:f, I:g}) => {
    d[e] = [f, g];
    return d;
  }, [])].filter(Boolean).reduce((d, [e, f]) => {
    d[e] = f;
    return d;
  }, {}), h:c};
}, tc = (a, b = [], c = !1, d = {}, e = "") => {
  const f = Object.keys(a), {length:g} = f;
  return g || b.length ? `{${f.reduce((k, h) => {
    const l = a[h], m = c || -1 != h.indexOf("-") ? `'${h}'` : h, {before:n = "", B:p = "", A:q = ""} = d[h] || {};
    return [...k, `${n}${m}${p}:${q}${l}`];
  }, b).join(",")}${e}}` : "{}";
}, uc = (a = "") => {
  [a] = a;
  if (!a) {
    throw Error("No tag name is given");
  }
  return a.toUpperCase() == a;
}, vc = (a, b = {}, c = [], d = [], e = !1, f = null, g = {}, k = "") => {
  const h = uc(a), l = h ? a : `'${a}'`;
  if (!Object.keys(b).length && !c.length && !d.length) {
    return `h(${l})`;
  }
  const m = h && "dom" == e ? !1 : e;
  h || !d.length || e && "dom" != e || f && f(`JSX: destructuring ${d.join(" ")} is used without quoted props on HTML ${a}.`);
  a = tc(b, d, m, g, k);
  b = c.reduce((n, p, q) => {
    q = c[q - 1];
    return `${n}${q && /\S/.test(q) ? "," : ""}${p}`;
  }, "");
  return `h(${l},${a}${b ? `,${b}` : ""})`;
};
const wc = (a, b = []) => {
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
  return {Y:a, G:d};
}, yc = a => {
  const b = qc(a);
  let c;
  const {K:d} = nc({K:/=>/g});
  try {
    ({Y:h, G:c} = wc(a, [Y(d)]));
  } catch (l) {
    if (1 === l) {
      throw Error(`Could not find the matching closing > for ${b}.`);
    }
  }
  const e = h.slice(0, c + 1);
  var f = e.replace(/<\s*[^\s/>]+/, "");
  if (/\/\s*>$/.test(f)) {
    return a = f.replace(/\/\s*>$/, ""), f = "", new xc({g:e.replace(d.regExp, "=>"), f:a.replace(d.regExp, "=>"), content:"", tagName:b});
  }
  a = f.replace(/>$/, "");
  f = c + 1;
  c = !1;
  let g = 1, k;
  W(h, [{re:new RegExp(`[\\s\\S](?:<\\s*${b}(\\s+|>)|/\\s*${b}\\s*>)`, "g"), replacement(l, m, n, p) {
    if (c) {
      return l;
    }
    m = !m && l.endsWith(">");
    const q = !m;
    if (q) {
      p = p.slice(n);
      const {G:t} = wc(p.replace(/^[\s\S]/, " "));
      p = p.slice(0, t + 1);
      if (/\/\s*>$/.test(p)) {
        return l;
      }
    }
    g += q ? 1 : -1;
    0 == g && m && (c = n, k = c + l.length);
    return l;
  }}]);
  if (g) {
    throw Error(`Could not find the matching closing </${b}>.`);
  }
  f = h.slice(f, c);
  var h = h.slice(0, k).replace(d.regExp, "=>");
  return new xc({g:h, f:a.replace(d.regExp, "=>"), content:f.replace(d.regExp, "=>"), tagName:b});
};
class xc {
  constructor(a) {
    this.g = a.g;
    this.f = a.f;
    this.content = a.content;
    this.tagName = a.tagName;
  }
}
;const zc = a => {
  let b = "", c = "";
  a = a.replace(/^(\n\s*)([\s\S]+)?/, (d, e, f = "") => {
    b = e;
    return f;
  }).replace(/([\s\S]+?)?(\n\s*)$/, (d, e = "", f = "") => {
    c = f;
    return e;
  });
  return `${b}${a ? `\`${a}\`` : ""}${c}`;
}, Bc = a => {
  const b = [];
  let c = {}, d = 0, e = 0;
  W(a, [{re:/[<{}]/g, replacement(f, g) {
    if (!(g < e)) {
      if (/[{}]/.test(f)) {
        d += "{" == f ? 1 : -1, 1 == d && void 0 == c.from ? c.from = g : 0 == d && (c.w = g + 1, c.R = a.slice(c.from + 1, g), b.push(c), c = {});
      } else {
        if (d) {
          return f;
        }
        f = yc(a.slice(g));
        e = g + f.g.length;
        c.S = f;
        c.w = e;
        c.from = g;
        b.push(c);
        c = {};
      }
    }
  }}, {}]);
  return b.length ? Ac(a, b) : [zc(a)];
}, Ac = (a, b) => {
  let c = 0;
  b = b.reduce((d, {from:e, w:f, R:g, S:k}) => {
    (e = a.slice(c, e)) && d.push(zc(e));
    c = f;
    g ? d.push(g) : k && d.push(k);
    return d;
  }, []);
  if (c < a.length) {
    const d = a.slice(c, a.length);
    d && b.push(zc(d));
  }
  return b;
};
const Dc = (a, b = {}) => {
  const {quoteProps:c, warn:d} = b;
  var e = ic(a);
  if (null === e) {
    return a;
  }
  var f = a.slice(e);
  const {f:g = "", content:k, tagName:h, g:{length:l}} = yc(f);
  f = Cc(k, c, d);
  const {u:m, o:n, h:p} = sc(g.replace(/^ */, ""));
  var q = vc(h, m, f, n, c, d, p, /\s*$/.exec(g) || [""]);
  f = a.slice(0, e);
  a = a.slice(e + l);
  e = l - q.length;
  0 < e && (q = `${" ".repeat(e)}${q}`);
  f = `${f}${q}${a}`;
  return Dc(f, b);
}, Cc = (a, b = !1, c = null) => a ? Bc(a).reduce((d, e) => {
  if (e instanceof xc) {
    const {f:k = "", content:h, tagName:l} = e, {u:m, o:n} = sc(k);
    e = Cc(h, b, c);
    e = vc(l, m, e, n, b, c);
    return [...d, e];
  }
  const f = ic(e);
  if (f) {
    var g = e.slice(f);
    const {g:{length:k}, f:h = "", content:l, tagName:m} = yc(g), {u:n, o:p} = sc(h);
    g = Cc(l, b, c);
    g = vc(m, n, g, p, b, c);
    const q = e.slice(0, f);
    e = e.slice(f + k);
    return [...d, `${q}${g}${e}`];
  }
  return [...d, e];
}, []) : [];
const Ec = (a, b = {}) => {
  const {e:c, N:d, O:e, j:f, V:g, W:k} = nc({N:/^ *export\s+default\s+{[\s\S]+?}/mg, e:/^ *export\s+(?:default\s+)?/mg, O:/^ *export\s+{[^}]+}\s+from\s+(['"])(?:.+?)\1/mg, j:/^ *import(\s+([^\s,]+)\s*,?)?(\s*{(?:[^}]+)})?\s+from\s+['"].+['"]/gm, V:/^ *import\s+(?:(.+?)\s*,\s*)?\*\s+as\s+.+?\s+from\s+['"].+['"]/gm, W:/^ *import\s+['"].+['"]/gm}, {getReplacement(h, l) {
    return `/*%%_RESTREAM_${h.toUpperCase()}_REPLACEMENT_${l}_%%*/`;
  }, getRegex(h) {
    return new RegExp(`/\\*%%_RESTREAM_${h.toUpperCase()}_REPLACEMENT_(\\d+)_%%\\*/`, "g");
  }});
  a = W(a, [Y(e), Y(d), Y(c), Y(f), Y(g), Y(k)]);
  b = Dc(a, b);
  return W(b, [X(e), X(d), X(c), X(f), X(g), X(k)]);
};
class Fc extends pc {
  constructor(a, b) {
    super([]);
    const c = this.replacement.bind(this);
    this.b = [{re:/^( *import(?:\s+[^\s,]+\s*,?)?(?:\s*{(?:[^}]+)})?\s+from\s+)['"](.+)['"]/gm, replacement:c}, {re:/^( *export\s+{[^}]+?}\s+from\s+)['"](.+?)['"]/gm, replacement:c}];
    this.M = [];
    this.L = [];
    this.path = a;
    this.w = b;
    this.preactExtern = !1;
  }
  get nodeModules() {
    return this.M;
  }
  get i() {
    return this.L;
  }
  async replacement(a, b, c) {
    var d = M(this.path);
    if (/^[./]/.test(c)) {
      return {path:a} = await S(c, this.path), d = O(d, a), this.i.push(d), `${b}'./${d}'`;
    }
    ({name:c} = tb(c));
    return "preact" == c && this.preactExtern ? ({entry:d} = await T(d, "@externs/preact"), this.nodeModules.push(d), `${b}'@externs/preact'`) : a;
  }
}
;const Hc = async(a, b, c) => {
  const {D:d, C:e} = c, {tempDir:f, preact:g, preactExtern:k} = b;
  var h = await J(a), l = a.endsWith(".jsx");
  const m = O("", M(a));
  var n = N(f, m);
  n = new Fc(a, n);
  n.preactExtern = k;
  n.end((g || k) && l ? `import { h } from '${k ? "@externs/preact" : "preact"}'
${h}` : h);
  h = await I(n);
  l = l ? await Gc(h, a) : h;
  a = N(f, a);
  await ab(a);
  await K(a, l);
  a = n.i.map(p => N(m, p)).filter(p => !(p in e));
  n = n.nodeModules.filter(p => !(p in d));
  n.forEach(p => {
    d[p] = 1;
  });
  a.forEach(p => {
    e[p] = 1;
  });
  await n.reduce(async(p, q) => {
    await p;
    (await U(q)).forEach(({entry:t, packageJson:v}) => {
      v && (d[v] = 1);
      d[t] = 1;
    });
  }, {});
  await a.reduce(async(p, q) => {
    await p;
    await Hc(q, b, c);
  }, {});
}, Gc = async(a, b) => await Ec(a, {quoteProps:"dom", warn(c) {
  console.warn(R(c, "yellow"));
  console.log(b);
}});
const Ic = async(a, b = {}) => {
  const {tempDir:c = "depack-temp", preact:d, preactExtern:e} = b;
  b = {C:{[O("", a)]:1}, D:{}};
  await Hc(a, {tempDir:c, preact:d, preactExtern:e}, b);
  return [...Object.keys(b.C).map(f => N(c, f)), ...Object.keys(b.D)];
};
const Jc = async a => {
  const b = await U(a, {nodeModules:!1});
  return a.endsWith(".jsx") || b.some(({entry:c}) => c.endsWith(".jsx"));
}, Kc = async(a, b, c = []) => {
  const {src:d, tempDir:e = "depack-temp", preact:f, preactExtern:g} = a, {output:k, compilerVersion:h, debug:l, noSourceMap:m} = b;
  if (!d) {
    throw Error("Entry file is not given.");
  }
  a = await Jc(d);
  a && await Ic(d, {tempDir:e, preact:f, preactExtern:g});
  b = a ? N(e, d) : d;
  var n = await U(b, {fields:["externs"]});
  var p = Ob(n);
  p = Pb(p);
  const q = zb(n), {m:t, F:v, s:F, H:D} = q;
  n = Mb(n);
  n = !(!t.length && !n.length);
  b = [b, ...t, ...D, ...F, ...v];
  c = [...c, ...p, ...k && !m ? ["--source_map_include_content"] : [], ...1 < b.length ? ["--module_resolution", "NODE"] : [], ...n ? ["--process_common_js_modules"] : []];
  p = a ? b.map(x => x.startsWith(e) ? O(e, x) : x) : b;
  p = Gb(c, p);
  console.error(p);
  c = [...c, "--js", ...b];
  c = await $b(c, {debug:l, compilerVersion:h, output:k, noSourceMap:m, aa:() => !1});
  !k && c && console.log(c);
  a && (k && !m && await Kb(k, e), await hb(e));
};
const Lc = a => {
  const {compiler:b = require.resolve("google-closure-compiler-java/compiler.jar"), output:c, level:d, advanced:e, languageIn:f, languageOut:g, sourceMap:k = !0, argv:h = [], prettyPrint:l, noWarnings:m, debug:n, iife:p} = a;
  a = ["-jar", b];
  d ? a.push("--compilation_level", d) : e && a.push("--compilation_level", "ADVANCED");
  f && a.push("--language_in", /^\d+$/.test(f) ? `ECMASCRIPT_${f}` : f);
  g && a.push("--language_out", /^\d+$/.test(g) ? `ECMASCRIPT_${g}` : g);
  c && k && !n && a.push("--create_source_map", "%outname%.map");
  l && a.push("--formatting", "PRETTY_PRINT");
  n && a.push("--print_source_after_each_pass");
  p && a.push("--isolation_mode", "IIFE");
  (m || n) && a.push("--warning_level", "QUIET");
  a.push(...h);
  c && a.push("--js_output_file", c);
  return a;
}, Mc = a => {
  a = /\.js$/.test(y) ? y : N(y, Za(a));
  return a = a.replace(/jsx$/, "js");
};
const Z = process.env.GOOGLE_CLOSURE_COMPILER, Nc = async() => {
  var a = "target";
  const b = Z ? "target" : require.resolve("google-closure-compiler-java/package.json");
  Z || (a = await J(b), {version:a} = JSON.parse(a), [a] = a.split("."));
  return a;
};
function Oc(a = {usage:{}}) {
  const {usage:b = {}, description:c, line:d, example:e} = a;
  a = Object.keys(b);
  const f = Object.values(b), [g] = a.reduce(([l = 0, m = 0], n) => {
    const p = b[n].split("\n").reduce((q, t) => t.length > q ? t.length : q, 0);
    p > m && (m = p);
    n.length > l && (l = n.length);
    return [l, m];
  }, []), k = (l, m) => {
    m = " ".repeat(m - l.length);
    return `${l}${m}`;
  };
  a = a.reduce((l, m, n) => {
    n = f[n].split("\n");
    m = k(m, g);
    const [p, ...q] = n;
    m = `${m}\t${p}`;
    const t = k("", g);
    n = q.map(v => `${t}\t${v}`);
    return [...l, m, ...n];
  }, []).map(l => `\t${l}`);
  const h = [c, `  ${d || ""}`].filter(l => l ? l.trim() : l).join("\n\n");
  a = `${h ? `${h}\n` : ""}
${a.join("\n")}
`;
  return e ? `${a}
  Example:

    ${e}
` : a;
}
;var Pc = () => {
  var a = u(ca), b = u(qa), c = u(wa);
  a = Oc({line:"depack SOURCE [-cl] [-o output.js] [-IO 2018] [-wVvh] [-lvl LEVEL -a] [... --generic-args]", usage:a});
  c = Oc({line:"depack SOURCE -cl [-o output.js] [-s]", example:"depack src/bin.js -c -a -o depack/bin.js -p", usage:c});
  b = Oc({line:"depack SOURCE [-o output.js] [-H]", example:"depack source.js -o bundle.js -i -a -H", usage:b});
  return `Google Closure Compiler-based packager for the web and Node.JS.
https://artdecocode.com/depack/
Generic flags: https://github.com/google/closure-compiler/wiki/Flags-and-Options

${a}
${R("BACKEND", "blue")}: Creates a single executable Node.JS file or a library.
${c}
${R("FRONTEND", "cyan")}: Creates a bundle for the web.
${b}`;
};
pa && (console.log(Pc()), process.exit(0));
const Qc = () => {
  console.error(R("monkey-patching preact", "yellow"));
  Ga("node_modules/preact", "node_modules/_preact");
  Ia($a(__dirname, "../preact"), "node_modules/preact");
}, Rc = () => {
  console.error(R("cleaning up preact patch", "yellow"));
  try {
    Ka("node_modules/preact"), Ga("node_modules/_preact", "node_modules/preact");
  } catch (a) {
  }
};
(async() => {
  if (va) {
    Qc();
    process.on("SIGINT", () => {
    });
    process.on("SIGTERM", () => {
    });
    process.on("beforeExit", Rc);
    const e = Aa({input:process.stdin, output:process.stdout});
    e.question("Press enter to continue", () => {
      e.close();
    });
  } else {
    try {
      const e = await Nc();
      if (oa) {
        var a = require("../package.json").version;
        console.log("Depack version: %s", a);
        const f = await $b([...Lc({compiler:Z}), "--version"], {compilerVersion:e});
        console.log(f);
      } else {
        var {path:b} = await S(da), c = y ? Mc(b) : void 0;
        (a = ka) || !xa && !C || (a = 2017);
        var d = Lc({compiler:Z, output:c, level:la, languageIn:ja, languageOut:a, argv:za, advanced:ma, sourceMap:!!y && !ha, prettyPrint:ea, noWarnings:na, debug:z, iife:ra});
        c = {compilerVersion:e, output:c, noSourceMap:ha || !!z, debug:z};
        if (xa || C) {
          return await dc({src:b, noStrict:ya, verbose:ia, debug:z, library:C}, c, d);
        }
        ua && (Qc(), process.on("SIGINT", () => {
        }), process.on("SIGTERM", () => {
        }), process.on("beforeExit", Rc));
        await Kc({src:b, tempDir:sa, preact:ta}, c, d);
      }
    } catch (e) {
      process.env.DEBUG ? console.log(e.stack) : console.log(e.message);
    }
  }
})();


//# sourceMappingURL=depack.js.map