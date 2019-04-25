#!/usr/bin/env node
             
const fs = require('fs');
const stream = require('stream');
const os = require('os');
const path = require('path');
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
boolean:!0, short:"w"}, version:{description:"Shows the current _Depack_ and _GCC_ versions.", boolean:!0, short:"v"}, help:{description:"Prints the usage information.", boolean:!0, short:"h"}}, v = r(ca), da = v.source, w = v.output, x = v.debug, ea = v["pretty-print"], fa = v["no-sourcemap"], ha = v.verbose, ia = v.language_in, ja = v.language_out, ka = v.level, la = v.advanced, ma = v["no-warnings"], na = v.version, oa = v.help, pa = {iife:{description:"Add the IIFE flag to prevent name clashes.", 
boolean:!0, short:"i"}, temp:{description:"The path to the temp directory used to transpile JSX files.", default:"depack-temp"}, preact:{description:'Add the `import { h } from "preact"` to JSX files automatically.', boolean:!0, short:"H"}}, A = r(pa, [process.argv[0], process.argv[1], ...v.a]), qa = A.iife, ra = A.temp || "depack-temp", sa = A.preact, ta = {compile:{description:'Set the _Depack_ mode to "compile" to create a Node.JS binary.\nAdds the `#!usr/bin/env node` at the top and sets +x permission.', 
boolean:!0, short:"c"}, library:{description:'Set the _Depack_ mode to "library" to create a Node.JS library.\nInitialises the `DEPACK_EXPORT` variable kept via an extern\nwhich is also exported as `module.exports`. The source code\nneeds to assign the library to this variable.', boolean:!0, short:"l"}, "no-strict":{description:'Whether to remove the `"use strict"` from the output.', boolean:!0, short:"s"}}, B = r(ta, [process.argv[0], process.argv[1], ...A.a]), ua = B.compile, va = B.library, wa = 
B["no-strict"], xa = B.a;
const {chmod:ya, createReadStream:za, createWriteStream:Aa, lstat:C, mkdir:Ba, readdir:Ca, rmdir:Da, unlink:Ea} = fs;
var Fa = stream;
const {Transform:Ga, Writable:Ha} = stream;
const Ia = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : void 0);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, Ja = (a, b = !1) => Ia(a, 2 + (b ? 1 : 0)), Ka = a => {
  ({callee:{caller:a}} = a);
  return a;
};
const {homedir:La} = os;
const Ma = /\s+at.*(?:\(|\s)(.*)\)?/, Na = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, Oa = La(), D = a => {
  const {pretty:b = !1, ignoredModules:c = ["pirates"]} = {}, d = c.join("|"), e = new RegExp(Na.source.replace("IGNORED_MODULES", d));
  return a.replace(/\\/g, "/").split("\n").filter(f => {
    f = f.match(Ma);
    if (null === f || !f[1]) {
      return !0;
    }
    f = f[1];
    return f.includes(".app/Contents/Resources/electron.asar") || f.includes(".app/Contents/Resources/default_app.asar") ? !1 : !e.test(f);
  }).filter(f => f.trim()).map(f => b ? f.replace(Ma, (g, k) => g.replace(k, k.replace(Oa, "~"))) : f).join("\n");
};
function Pa(a, b, c = !1) {
  return function(d) {
    var e = Ka(arguments), {stack:f} = Error();
    const g = Ia(f, 2, !0), k = (f = d instanceof Error) ? d.message : d;
    e = [`Error: ${k}`, ...null !== e && a === e || c ? [b] : [g, b]].join("\n");
    e = D(e);
    return Object.assign(f ? d : Error(), {message:k, stack:e});
  };
}
;function E(a) {
  var {stack:b} = Error();
  const c = Ka(arguments);
  b = Ja(b, a);
  return Pa(c, b, a);
}
;const Qa = (a, b) => {
  b.once("error", c => {
    a.emit("error", c);
  });
  return b;
};
class Ra extends Ha {
  constructor(a) {
    var b = a || {}, c = Object.assign({}, b);
    const d = void 0 === b.binary ? !1 : b.binary, e = void 0 === b.rs ? null : b.rs;
    b = (delete c.binary, delete c.rs, c);
    const {P:f = E(!0), proxyError:g} = a || {}, k = (h, l) => f(l);
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
          const n = D(m.stack);
          m.stack = n;
          g && k`${m}`;
        }
        l(m);
      });
      e && Qa(this, e).pipe(this);
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
const H = async a => {
  var b = void 0 === b ? {} : b;
  ({promise:a} = new Ra(Object.assign({}, {rs:a}, b, {P:E(!0)})));
  return await a;
};
async function I(a) {
  a = za(a);
  return await H(a);
}
;async function J(a, b) {
  if (!a) {
    throw Error("No path is given.");
  }
  const c = E(!0), d = Aa(a);
  await new Promise((e, f) => {
    d.on("error", g => {
      g = c(g);
      f(g);
    }).on("close", e).end(b);
  });
}
;function Sa(a, b) {
  if (b > a - 2) {
    throw Error("Function does not accept that many arguments.");
  }
}
async function M(a, b, c) {
  const d = E(!0);
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
      Sa(e, m);
    }), h = [...b, k]) : 1 < Array.from(arguments).length && (Sa(e, 0), h = [b, k]);
    a(...h);
  });
}
;const {basename:Ta, dirname:N, join:O, relative:P, resolve:Ua} = path;
async function Va(a) {
  const b = N(a);
  try {
    return await Wa(b), a;
  } catch (c) {
    if (/EEXIST/.test(c.message) && -1 != c.message.indexOf(b)) {
      return a;
    }
    throw c;
  }
}
async function Wa(a) {
  try {
    await M(Ba, a);
  } catch (b) {
    if ("ENOENT" == b.code) {
      const c = N(a);
      await Wa(c);
      await Wa(a);
    } else {
      if ("EEXIST" != b.code) {
        throw b;
      }
    }
  }
}
;async function Xa(a, b) {
  b = b.map(async c => {
    const d = O(a, c);
    return {lstat:await M(C, d), path:d, relativePath:c};
  });
  return await Promise.all(b);
}
const Ya = a => a.lstat.isDirectory(), Za = a => !a.lstat.isDirectory();
async function $a(a) {
  if (!a) {
    throw Error("Please specify a path to the directory");
  }
  if (!(await M(C, a)).isDirectory()) {
    throw a = Error("Path is not a directory"), a.code = "ENOTDIR", a;
  }
  var b = await M(Ca, a);
  b = await Xa(a, b);
  a = b.filter(Ya);
  b = b.filter(Za).reduce((c, d) => {
    var e = d.lstat.isDirectory() ? "Directory" : d.lstat.isFile() ? "File" : d.lstat.isSymbolicLink() ? "SymbolicLink" : void 0;
    return Object.assign({}, c, {[d.relativePath]:{type:e}});
  }, {});
  a = await a.reduce(async(c, d) => {
    var {path:e, relativePath:f} = d;
    c = await c;
    d = await $a(e);
    return Object.assign({}, c, {[f]:d});
  }, {});
  return {content:Object.assign({}, b, a), type:"Directory"};
}
;const ab = async a => {
  await M(Ea, a);
}, bb = async a => {
  const {content:b} = await $a(a);
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
  c = c.map(e => O(a, e));
  await Promise.all(c.map(ab));
  d = d.map(e => O(a, e));
  await Promise.all(d.map(bb));
  await M(Da, a);
}, cb = async a => {
  (await M(C, a)).isDirectory() ? await bb(a) : await ab(a);
};
const Q = async a => {
  try {
    return await M(C, a);
  } catch (b) {
    return null;
  }
};
const db = {black:30, red:31, green:32, yellow:33, blue:34, magenta:35, cyan:36, white:37, grey:90}, eb = {black:40, red:41, green:42, yellow:43, blue:44, magenta:45, cyan:46, white:47};
function R(a, b) {
  return (b = db[b]) ? `\x1b[${b}m${a}\x1b[0m` : a;
}
function fb(a, b) {
  return (b = eb[b]) ? `\x1b[${b}m${a}\x1b[0m` : a;
}
;const S = async(a, b) => {
  b && (b = N(b), a = O(b, a));
  var c = await Q(a);
  b = a;
  let d = !1;
  if (!c) {
    if (b = await gb(a), !b) {
      throw Error(`${a}.js or ${a}.jsx is not found.`);
    }
  } else {
    if (c.isDirectory()) {
      c = !1;
      let e;
      a.endsWith("/") || (e = b = await gb(a), c = !0);
      if (!e) {
        b = await gb(O(a, "index"));
        if (!b) {
          throw Error(`${c ? `${a}.jsx? does not exist, and ` : ""}index.jsx? file is not found in ${a}`);
        }
        d = !0;
      }
    }
  }
  return {path:a.startsWith(".") ? P("", b) : b, X:d};
}, gb = async a => {
  a = `${a}.js`;
  let b = await Q(a);
  b || (a = `${a}x`);
  if (b = await Q(a)) {
    return a;
  }
};
const {builtinModules:hb} = _module;
function ib(a, b) {
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
;const jb = /^ *import(?:\s+(?:[^\s,]+)\s*,?)?(?:\s*{(?:[^}]+)})?\s+from\s+(['"])(.+?)\1/gm, kb = /^ *import\s+(?:.+?\s*,\s*)?\*\s+as\s+.+?\s+from\s+(['"])(.+?)\1/gm, lb = /^ *import\s+(['"])(.+?)\1/gm, mb = /^ *export\s+{[^}]+?}\s+from\s+(['"])(.+?)\1/gm, nb = a => [jb, kb, lb, mb].reduce((b, c) => {
  c = ib(c, a).map(d => d.from);
  return [...b, ...c];
}, []);
const ob = a => {
  let [b, c, ...d] = a.split("/");
  !b.startsWith("@") && c ? (d = [c, ...d], c = b) : c = b.startsWith("@") ? `${b}/${c}` : b;
  return {name:c, paths:d.join("/")};
};
const T = async(a, b, c) => {
  c = void 0 === c ? {} : c;
  const {fields:d, soft:e = !1} = c;
  var f = O(a, "node_modules", b);
  f = O(f, "package.json");
  var g = await Q(f);
  if (g) {
    a = await pb(f, d);
    if (void 0 === a) {
      throw Error(`The package ${P("", f)} does export the module.`);
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
    return Object.assign({}, {entry:P("", b), packageJson:P("", f)}, a ? {version:a} : {}, {packageName:c}, g ? {hasMain:!0} : {}, k ? {} : {entryExists:!1}, h);
  }
  if ("/" == a && !g) {
    throw Error(`Package.json for module ${b} not found.`);
  }
  return T(O(Ua(a), ".."), b, c);
}, pb = async(a, b) => {
  b = void 0 === b ? [] : b;
  const c = await I(a);
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
  a = N(a);
  b = d || g;
  if (!b) {
    if (!await Q(O(a, "index.js"))) {
      return;
    }
    b = g = "index.js";
  }
  a = O(a, b);
  let m;
  try {
    ({path:m} = await S(a)), a = m;
  } catch (n) {
  }
  return Object.assign({}, {entry:a, version:e, packageName:f, main:!d && g, entryExists:!!m}, k);
};
const qb = a => /^[./]/.test(a), rb = async(a, b, c, d, e) => {
  e = void 0 === e ? null : e;
  const f = E(), g = N(a);
  b = b.map(async k => {
    if (hb.includes(k)) {
      return {internal:k};
    }
    if (/^[./]/.test(k)) {
      try {
        const {path:m} = await S(k, a);
        return {entry:m, package:e};
      } catch (m) {
      }
    } else {
      const {name:m, paths:n} = ob(k);
      if (n) {
        const {packageJson:p, packageName:q} = await T(g, m);
        k = N(p);
        ({path:k} = await S(O(k, n)));
        return {entry:k, package:q};
      }
    }
    try {
      var h = await T(g, k, {fields:d}), l = Object.assign({}, h);
      const m = h.entry, n = h.packageJson, p = h.version, q = h.packageName, t = h.hasMain, y = (delete l.entry, delete l.packageJson, delete l.version, delete l.packageName, delete l.hasMain, l);
      return q == e ? (console.warn("[static-analysis] Skipping package %s that imports itself in %s", q, a), null) : Object.assign({}, {entry:m, packageJson:n, version:p, name:q}, t ? {hasMain:t} : {}, y);
    } catch (m) {
      if (c) {
        return null;
      }
      throw f(m);
    }
  });
  return (await Promise.all(b)).filter(Boolean);
}, tb = async(a, b, c) => {
  b = void 0 === b ? {} : b;
  var {nodeModules:d = !0, shallow:e = !1, soft:f = !1, fields:g = [], package:k} = void 0 === c ? {} : c;
  if (a in b) {
    return [];
  }
  b[a] = 1;
  var h = await I(a);
  c = nb(h);
  h = sb(h);
  c = d ? c : c.filter(qb);
  h = d ? h : h.filter(qb);
  let l;
  try {
    var m = await rb(a, c, f, g, k);
    const n = await rb(a, h, f, g, k);
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
    var {entry:q, hasMain:t, packageJson:y, name:K, package:F} = p;
    if (y && e) {
      return n;
    }
    n = await n;
    p = (await tb(q, b, {nodeModules:d, shallow:e, soft:f, fields:g, package:K || F})).map(z => Object.assign({}, z, {from:z.from ? z.from : q}, !z.packageJson && t ? {hasMain:t} : {}));
    return [...n, ...p];
  }, m);
}, sb = a => ib(/(?:^|[^\w\d_])require\(\s*(['"])(.+?)\1\s*\)/gm, a).map(b => b.from);
const U = async(a, b) => {
  b = void 0 === b ? {} : b;
  const c = E();
  ({path:a} = await S(a));
  const {nodeModules:d = !0, shallow:e = !1, soft:f = !1, fields:g = []} = b;
  let k;
  try {
    k = await tb(a, {}, {nodeModules:d, shallow:e, soft:f, fields:g});
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
}, ub = a => {
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
  return {F:c, H:b, o:d, u:e, m:f, j:g};
};
const vb = {url:["querystring"], stream:["events"], net:["stream", "events", "dns"], fs:["stream", "events", "url"], ia:["crypto", "dns", "net", "stream"], ba:["events", "net", "stream", "url"], da:["tls", "events", "http", "url"], ca:"events fs net stream tls http url".split(" "), zlib:["stream"], child_process:["events", "stream", "net"], Z:["child_process", "events", "net"], fa:["events", "stream"], ga:["stream", "readline"], $:["events", "dns"], ha:["buffer"], domain:["events"], ja:["net"]}, 
wb = () => {
  const a = P("", N(require.resolve("@depack/externs/package.json")));
  return O(a, "v8");
};
const xb = (a, b) => {
  a = " ".repeat(Math.max(a - b.length, 0));
  return `${b}${a}`;
}, yb = a => {
  var {width:b} = {};
  a = a.split("\n");
  b = b || a.reduce((c, {length:d}) => d > c ? d : c, 0);
  return a.map(xb.bind(null, b)).join("\n");
};
function zb(a) {
  const {padding:b = 1} = {};
  var c = a.split("\n").reduce((f, {length:g}) => g > f ? g : f, 0) + 2 * b;
  const d = `\u250c${"\u2500".repeat(c)}\u2510`;
  c = `\u2514${"\u2500".repeat(c)}\u2518`;
  const e = " ".repeat(b);
  a = yb(a).split("\n").map(f => `\u2502${e}${f}${e}\u2502`).join("\n");
  return `${d}\n${a}\n${c}`;
}
;const V = (a, b, c, d = !1) => a.replace(new RegExp(`--${b} (\\\\\n)?(\\S+)`, "g"), (e, f, g) => `--${b} ${f || ""}${(d ? fb : R)(g, c)}`), Bb = (a, b) => {
  a = Ab(a);
  a = V(a, "compilation_level", "green", !0);
  a = V(a, "js_output_file", "red");
  b = b.map(c => `${R(c, "green")}`).join("\n     ");
  return `${a}\n--js ${b}`.trim();
}, Cb = async(a, {sourceMap:b, library:c}) => {
  const d = [await I(a)];
  c && d.push("module.exports = DEPACK_EXPORT");
  b && (b = Ta(a), d.push("//" + `# sourceMappingURL=${b}.map`));
  await J(a, d.join("\n"));
}, Eb = async(a, b = "", c = !1) => {
  if (!b.startsWith("'use strict'") || c) {
    var d = await I(a);
    b = Db(d, b, c);
    await J(a, b);
  }
}, Db = (a, b = "", c = !1) => {
  const d = b.replace(/%output%$/, "");
  a = a.replace(d, "");
  const e = a.startsWith("'use strict';");
  let f = a;
  if (b || c) {
    f = a.replace(/'use strict';/, " ".repeat(13));
  }
  return `${c || !e ? d.replace(/'use strict';/, " ".repeat(13)) : d}${f}`;
}, Fb = async(a, b) => {
  a = `${a}.map`;
  var c = await I(a);
  c = JSON.parse(c);
  var {sources:d} = c;
  d = d.map(e => e.startsWith(" ") ? e : `/${P(b, e)}`);
  c.sources = d;
  c = JSON.stringify(c, null, 2);
  await J(a, c);
}, Gb = (a, b = !1) => {
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
}, Hb = a => a.filter(({entry:b}) => {
  if (b) {
    return b.endsWith(".json");
  }
}), Ab = a => {
  const b = process.stderr.columns - 3 || 87;
  let c = 4;
  return a.reduce((d, e) => {
    c + e.length > b ? (d = d + " \\\n" + e, c = e.length) : (d = d + " " + e, c += e.length + 1);
    return d;
  }, "java");
};
const [Ib] = process.version.split(".", 1), Jb = (a = Ib) => P("", O(N(require.resolve("@depack/nodejs/package.json")), "builtin-modules", a));
const Kb = (a, b) => {
  b = b.split("\n\n").map(c => /^.+?:\d+:(?:\s*Originally at:\s*.+?)? WARNING -/.test(c) ? R(c, "grey") : R(c, "red")).join("\n\n");
  return `Exit code ${a}\n${b}`;
}, [Lb] = process.version.split(".", 1), Nb = async({m:a, ea:b = "node_modules", force:c = !0}) => {
  const d = Jb(Lb);
  return (await Promise.all(a.map(async e => {
    const f = O(b, e), g = O(f, "package.json");
    var k = O(f, "index.js");
    const h = {packageJson:g, index:k};
    if (await Q(g) && !c) {
      if ((k = await Mb(g)) && k == Lb) {
        return h;
      }
      throw Error(`Could not prepare core module ${e}: ${f} exists.`);
    }
    await Va(g);
    await J(g, JSON.stringify({name:e, module:"index.js", depack:Lb}));
    e = await I(O(d, `${e}.js`));
    await J(k, e);
    return h;
  }))).reduce((e, {packageJson:f, index:g}) => [...e, f, g], []);
}, Mb = async a => {
  try {
    const b = await I(a), {depack:c} = JSON.parse(b);
    return c;
  } catch (b) {
  }
}, Ob = async(a, b) => {
  a = [...a, ...b];
  await Promise.all(a.map(async c => {
    var d = N(c), e = await I(c);
    e = JSON.parse(e);
    const {main:f, module:g} = e, k = g ? "module" : "main";
    let h = g || f;
    if (!h) {
      const n = O(N(c), "index.js");
      if (!await Q(n)) {
        throw Error(`Package ${c} does not specify either main or module fields, and does not contain the index.js file.`);
      }
      e.main = "index.js";
      console.warn("Updating %s to have the main field.", c);
      await J(c, JSON.stringify(e, null, 2));
    }
    let l, m;
    try {
      ({X:l, path:m} = await S(h, c));
    } catch (n) {
      throw Error(`The ${k} for dependency ${c} does not exist.`);
    }
    l ? (d = O(h, "index.js"), e[k] = d, console.warn("Updating %s to point to a file.", c), await J(c, JSON.stringify(e, null, 2))) : O(d, e[k]) != m && (d = P(d, m), e[k] = d, console.warn("Updating %s to point to the file with extension.", c), await J(c, JSON.stringify(e, null, 2)));
  }));
};
async function Pb(a, b) {
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
;const {spawn:Qb} = child_process;
const Rb = async a => {
  const [b, c, d] = await Promise.all([new Promise((e, f) => {
    a.on("error", f).on("exit", g => {
      e(g);
    });
  }), a.stdout ? H(a.stdout) : void 0, a.stderr ? H(a.stderr) : void 0]);
  return {code:b, stdout:c, stderr:d};
};
const Sb = async(a, b, c = !1) => {
  const {debug:d, compilerVersion:e = "", output:f, noSourceMap:g} = b;
  a = Qb("java", a, void 0);
  b = Rb(a);
  a.promise = b;
  a.spawnCommand = a.spawnargs.join(" ");
  let {promise:k, stderr:h} = a;
  d && h.pipe(Aa(d));
  const {stdout:l, stderr:m, code:n} = await Pb(`Running Google Closure Compiler${e ? " " + R(e, "grey") : ""}`, k);
  if (n) {
    throw Error(Kb(n, m));
  }
  f && await Cb(f, {library:c, sourceMap:!g});
  m && !d ? console.warn(R(m, "grey")) : d && console.log("Sources after each pass saved to %s", d);
  return l;
};
const Xb = async(a, b, c = []) => {
  const {src:d, noStrict:e, verbose:f, library:g} = a;
  ({output:a} = b);
  if (!d) {
    throw Error("Source is not given.");
  }
  c = [...c, "--package_json_entry_names", "module,main", "--entry_point", d];
  var k = await U(d, {fields:["externs"]}), h = k.reduce((z, {packageJson:L, externs:G = []}) => {
    if (!L) {
      return z;
    }
    const mc = N(L);
    G = Array.isArray(G) ? G : [G];
    G = G.map(nc => O(mc, nc));
    return [...z, ...G];
  }, []);
  h.length && console.error("%s %s", R("Modules' externs:", "blue"), h.join(" "));
  h = Tb(h);
  Ub(k);
  const l = ub(k), {o:m, F:n, m:p, u:q, H:t} = l;
  var y = await Nb({m:p});
  const K = await Vb(p, g);
  await Ob(n, t);
  var F = [d, ...n, ...t, ...q, ...m, ...y].sort((z, L) => z.startsWith("node_modules") ? -1 : L.startsWith("node_modules") ? 1 : 0);
  y = Gb(p, g);
  k = Hb(k);
  F = [...c, ...K, ...h, ...1 < F.length ? ["--module_resolution", "NODE"] : [], ...m.length ? ["--process_common_js_modules"] : [], ...y ? ["--output_wrapper", y] : [], "--js", ...F];
  k.length && !m.length && (k = k.filter(({required:z}) => z, !1), k.length && (console.error("You are requiring JSON files. Make sure their relative paths will stay the same to the build."), console.log(k.map(({entry:z, from:L}) => `${R(z, "blue")} from ${L.join(" ")}`).join("\n"))));
  f ? console.error(Ab(F)) : Wb(c, [...K, ...h], l);
  b = await Sb(F, b, g);
  a ? (await Eb(a, y, e), await M(ya, [a, "755"])) : (b = Db(b, y, e), console.log(b.trim()));
}, Wb = (a, b, c) => {
  a = Ab([...a, ...b]);
  a = V(a, "js_output_file", "red");
  a = V(a, "externs", "grey");
  a = V(a, "compilation_level", "green", !0);
  console.error(a);
  const {o:d, m:e, u:f, j:g} = c;
  c = f.filter(Yb);
  a = d.filter(Yb);
  g.length && console.error("%s: %s", R("Dependencies", "yellow"), g.filter((k, h, l) => l.indexOf(k) == h).join(" "));
  c.length && console.error("%s: %s", R("Modules", "yellow"), c.join(" "));
  a.length && console.error("%s: %s", R("CommonJS", "yellow"), a.join(" "));
  e.length && console.error("%s: %s", R("Built-ins", "yellow"), e.join(", "));
}, Ub = a => {
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
  b.length && (console.error(R(Zb(), "red")), console.error("The following commonJS packages referenced in ES6 modules don't support named exports:"), b.forEach(({name:c, U:d}) => {
    console.error(" %s from %s", R(c, "red"), R(d.join(" "), "grey"));
  }));
}, Zb = () => {
  let a = "CommonJS don't have named exports, make sure to use them like\nimport myModule from 'my-module' /* CommonJS Compat */\nmyModule.default.method('hello world') // yes Node.JS, wat r u doing\nmyModule.default('must explicitly call default')";
  const b = a.split("\n").reduce((c, {length:d}) => d > c ? d : c, 0);
  process.stderr.isTTY && b + 4 < process.stderr.columns && (a = zb(a));
  return a;
}, Yb = a => !a.startsWith("node_modules"), Vb = async(a, b = !1) => {
  const c = wb();
  a = [...a.reduce((d, e) => {
    const f = vb[e] || [];
    return [...d, e, ...f];
  }, []).filter((d, e, f) => f.indexOf(d) == e), "global", "global/buffer", "nodejs", ...b ? ["depack"] : []].map(d => {
    ["module", "process", "console", "crypto"].includes(d) && (d = `_${d}`);
    return O(c, `${d}.js`);
  });
  await Promise.all(a.map(async d => {
    if (!await Q(d)) {
      throw Error(`Externs ${d} don't exist.`);
    }
  }));
  return Tb(a);
}, Tb = a => a.reduce((b, c) => [...b, "--externs", c], []);
const {Script:$b} = vm;
const ac = (a, b) => {
  const [c, , d] = a.split("\n");
  a = parseInt(c.replace(/.+?(\d+)$/, (f, g) => g)) - 1;
  const e = d.indexOf("^");
  ({length:b} = b.split("\n").slice(0, a).join("\n"));
  return b + e + (a ? 1 : 0);
};
const bc = a => {
  try {
    new $b(a);
  } catch (b) {
    const {message:c, stack:d} = b;
    if ("Unexpected token <" != c) {
      throw b;
    }
    return ac(d, a);
  }
  return null;
};
function cc(a) {
  if ("object" != typeof a) {
    return !1;
  }
  const {re:b, replacement:c} = a;
  a = b instanceof RegExp;
  const d = -1 != ["string", "function"].indexOf(typeof c);
  return a && d;
}
const dc = (a, b) => {
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
    return b.filter(cc).reduce((d, {re:e, replacement:f}) => {
      if (this.c) {
        return d;
      }
      if ("string" == typeof f) {
        d = d.replace(e, f);
      } else {
        let g;
        return d.replace(e, (k, ...h) => {
          g = Error();
          try {
            return this.c ? k : f.call(this, k, ...h);
          } catch (l) {
            dc(g, l);
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
;const ec = a => new RegExp(`%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_(\\d+)_%%`, "g"), fc = (a, b) => `%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_${b}_%%`, gc = (a, b) => Object.keys(a).reduce((c, d) => {
  {
    var e = a[d];
    const {getReplacement:f = fc, getRegex:g = ec} = b || {}, k = g(d);
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
async function hc(a, b) {
  b instanceof Fa ? b.pipe(a) : a.end(b);
  return await H(a);
}
class ic extends Ga {
  constructor(a, b) {
    super(b);
    this.b = (Array.isArray(a) ? a : [a]).filter(cc);
    this.c = !1;
    this.T = b;
  }
  async replace(a, b) {
    const c = new ic(this.b, this.T);
    b && Object.assign(c, b);
    a = await hc(c, a);
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
            dc(f, l);
          }
        });
        if (e.length) {
          try {
            const k = await Promise.all(e);
            b = b.replace(c, () => k.shift());
          } catch (k) {
            dc(f, k);
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
      a = D(d.stack), d.stack = a, c(d);
    }
  }
}
;const jc = a => {
  [, a] = /<\s*(.+?)(?:\s+[\s\S]+)?\s*\/?\s*>/.exec(a) || [];
  return a;
}, lc = a => {
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
    const {w:y, i:K} = kc(l);
    Object.assign(e, y);
    Object.assign(g, K);
    return m + 1;
  }, 0);
  if (c.length) {
    k = a.slice(k);
    const {w:h, i:l} = kc(k);
    Object.assign(e, h);
    Object.assign(g, l);
  } else {
    const {w:h, i:l} = kc(a);
    Object.assign(e, h);
    Object.assign(g, l);
  }
  return {v:e, s:f, i:g};
}, kc = a => {
  const b = [], c = {};
  a.replace(/(\s*)(\S+)(\s*)=(\s*)(["'])([\s\S]+?)\5/g, (d, e, f, g, k, h, l, m) => {
    c[f] = {before:e, B:g, A:k};
    b.push({l:m, name:f, I:`${h}${l}${h}`});
    return "%".repeat(d.length);
  }).replace(/(\s*)([^\s%]+)/g, (d, e, f, g) => {
    c[f] = {before:e};
    b.push({l:g, name:f, I:"true"});
  });
  return {w:[...b.reduce((d, {l:e, name:f, I:g}) => {
    d[e] = [f, g];
    return d;
  }, [])].filter(Boolean).reduce((d, [e, f]) => {
    d[e] = f;
    return d;
  }, {}), i:c};
}, oc = (a, b = [], c = !1, d = {}, e = "") => {
  const f = Object.keys(a), {length:g} = f;
  return g || b.length ? `{${f.reduce((k, h) => {
    const l = a[h], m = c || -1 != h.indexOf("-") ? `'${h}'` : h, {before:n = "", B:p = "", A:q = ""} = d[h] || {};
    return [...k, `${n}${m}${p}:${q}${l}`];
  }, b).join(",")}${e}}` : "{}";
}, pc = (a = "") => {
  [a] = a;
  if (!a) {
    throw Error("No tag name is given");
  }
  return a.toUpperCase() == a;
}, qc = (a, b = {}, c = [], d = [], e = !1, f = null, g = {}, k = "") => {
  const h = pc(a), l = h ? a : `'${a}'`;
  if (!Object.keys(b).length && !c.length && !d.length) {
    return `h(${l})`;
  }
  const m = h && "dom" == e ? !1 : e;
  h || !d.length || e && "dom" != e || f && f(`JSX: destructuring ${d.join(" ")} is used without quoted props on HTML ${a}.`);
  a = oc(b, d, m, g, k);
  b = c.reduce((n, p, q) => {
    q = (q = c[q - 1]) && /\S/.test(q) ? "," : "";
    return `${n}${q}${p}`;
  }, "");
  return `h(${l},${a}${b ? `,${b}` : ""})`;
};
const rc = (a, b = []) => {
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
}, tc = a => {
  const b = jc(a);
  let c;
  const {K:d} = gc({K:/=>/g});
  try {
    ({Y:h, G:c} = rc(a, [Y(d)]));
  } catch (l) {
    if (1 === l) {
      throw Error(`Could not find the matching closing > for ${b}.`);
    }
  }
  const e = h.slice(0, c + 1);
  var f = e.replace(/<\s*[^\s/>]+/, "");
  if (/\/\s*>$/.test(f)) {
    return a = f.replace(/\/\s*>$/, ""), f = "", new sc({g:e.replace(d.regExp, "=>"), f:a.replace(d.regExp, "=>"), content:"", tagName:b});
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
      const {G:t} = rc(p.replace(/^[\s\S]/, " "));
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
  return new sc({g:h, f:a.replace(d.regExp, "=>"), content:f.replace(d.regExp, "=>"), tagName:b});
};
class sc {
  constructor(a) {
    this.g = a.g;
    this.f = a.f;
    this.content = a.content;
    this.tagName = a.tagName;
  }
}
;const uc = a => {
  let b = "", c = "";
  a = a.replace(/^(\n\s*)([\s\S]+)?/, (d, e, f = "") => {
    b = e;
    return f;
  }).replace(/([\s\S]+?)?(\n\s*)$/, (d, e = "", f = "") => {
    c = f;
    return e;
  });
  return `${b}${a ? `\`${a}\`` : ""}${c}`;
}, wc = a => {
  const b = [];
  let c = {}, d = 0, e = 0;
  W(a, [{re:/[<{}]/g, replacement(f, g) {
    if (!(g < e)) {
      if (/[{}]/.test(f)) {
        d += "{" == f ? 1 : -1, 1 == d && void 0 == c.from ? c.from = g : 0 == d && (c.h = g + 1, c.R = a.slice(c.from + 1, g), b.push(c), c = {});
      } else {
        if (d) {
          return f;
        }
        f = tc(a.slice(g));
        e = g + f.g.length;
        c.S = f;
        c.h = e;
        c.from = g;
        b.push(c);
        c = {};
      }
    }
  }}, {}]);
  return b.length ? vc(a, b) : [uc(a)];
}, vc = (a, b) => {
  let c = 0;
  b = b.reduce((d, {from:e, h:f, R:g, S:k}) => {
    (e = a.slice(c, e)) && d.push(uc(e));
    c = f;
    g ? d.push(g) : k && d.push(k);
    return d;
  }, []);
  if (c < a.length) {
    const d = a.slice(c, a.length);
    d && b.push(uc(d));
  }
  return b;
};
const yc = (a, b = {}) => {
  const {quoteProps:c, warn:d} = b;
  var e = bc(a);
  if (null === e) {
    return a;
  }
  var f = a.slice(e);
  const {f:g = "", content:k, tagName:h, g:{length:l}} = tc(f);
  f = xc(k, c, d);
  const {v:m, s:n, i:p} = lc(g.replace(/^ */, ""));
  var q = /\s*$/.exec(g) || [""];
  q = qc(h, m, f, n, c, d, p, q);
  f = a.slice(0, e);
  a = a.slice(e + l);
  e = l - q.length;
  0 < e && (q = `${" ".repeat(e)}${q}`);
  a = `${f}${q}${a}`;
  return yc(a, b);
}, xc = (a, b = !1, c = null) => a ? wc(a).reduce((d, e) => {
  if (e instanceof sc) {
    const {f:k = "", content:h, tagName:l} = e, {v:m, s:n} = lc(k);
    e = xc(h, b, c);
    e = qc(l, m, e, n, b, c);
    return [...d, e];
  }
  const f = bc(e);
  if (f) {
    var g = e.slice(f);
    const {g:{length:k}, f:h = "", content:l, tagName:m} = tc(g), {v:n, s:p} = lc(h);
    g = xc(l, b, c);
    g = qc(m, n, g, p, b, c);
    const q = e.slice(0, f);
    e = e.slice(f + k);
    return [...d, `${q}${g}${e}`];
  }
  return [...d, e];
}, []) : [];
const zc = (a, b = {}) => {
  const {e:c, N:d, O:e, l:f, V:g, W:k} = gc({N:/^ *export\s+default\s+{[\s\S]+?}/mg, e:/^ *export\s+(?:default\s+)?/mg, O:/^ *export\s+{[^}]+}\s+from\s+(['"])(?:.+?)\1/mg, l:/^ *import(\s+([^\s,]+)\s*,?)?(\s*{(?:[^}]+)})?\s+from\s+['"].+['"]/gm, V:/^ *import\s+(?:(.+?)\s*,\s*)?\*\s+as\s+.+?\s+from\s+['"].+['"]/gm, W:/^ *import\s+['"].+['"]/gm}, {getReplacement(h, l) {
    return `/*%%_RESTREAM_${h.toUpperCase()}_REPLACEMENT_${l}_%%*/`;
  }, getRegex(h) {
    return new RegExp(`/\\*%%_RESTREAM_${h.toUpperCase()}_REPLACEMENT_(\\d+)_%%\\*/`, "g");
  }});
  a = W(a, [Y(e), Y(d), Y(c), Y(f), Y(g), Y(k)]);
  b = yc(a, b);
  return W(b, [X(e), X(d), X(c), X(f), X(g), X(k)]);
};
class Ac extends ic {
  constructor(a, b) {
    super();
    const c = this.replacement.bind(this);
    this.b = [{re:/^( *import(?:\s+[^\s,]+\s*,?)?(?:\s*{(?:[^}]+)})?\s+from\s+)['"](.+)['"]/gm, replacement:c}, {re:/^( *export\s+{[^}]+?}\s+from\s+)['"](.+?)['"]/gm, replacement:c}];
    this.M = [];
    this.L = [];
    this.path = a;
    this.h = b;
  }
  get nodeModules() {
    return this.M;
  }
  get j() {
    return this.L;
  }
  async replacement(a, b, c) {
    a = N(this.path);
    if (/^[./]/.test(c)) {
      return {path:c} = await S(c, this.path), c = P(a, c), this.j.push(c), `${b}'./${c}'`;
    }
    const {name:d, paths:e} = ob(c), {packageJson:f, entry:g} = await T(a, d);
    if (e) {
      return c = N(f), {path:c} = await S(O(c, e)), this.nodeModules.push(c), c = P(this.h, c), `${b}'${c}'`;
    }
    this.nodeModules.push(g);
    c = P(this.h, g);
    return `${b}'${c}'`;
  }
}
;const Cc = async(a, b, c) => {
  const {D:d, C:e} = c, {tempDir:f, preact:g} = b;
  var k = await I(a), h = a.endsWith(".jsx");
  const l = P("", N(a));
  var m = O(f, l);
  m = new Ac(a, m);
  m.end(g && h ? `import { h } from 'preact'
${k}` : k);
  k = await H(m);
  h = h ? await Bc(k, a) : k;
  a = O(f, a);
  await Va(a);
  await J(a, h);
  a = m.j.map(n => O(l, n)).filter(n => !(n in e));
  m = m.nodeModules.filter(n => !(n in d));
  m.forEach(n => {
    d[n] = 1;
  });
  a.forEach(n => {
    e[n] = 1;
  });
  await m.reduce(async(n, p) => {
    await n;
    (await U(p)).forEach(({entry:q, packageJson:t}) => {
      t && (d[t] = 1);
      d[q] = 1;
    });
  }, {});
  await a.reduce(async(n, p) => {
    await n;
    await Cc(p, b, c);
  }, {});
}, Bc = async(a, b) => await zc(a, {quoteProps:"dom", warn(c) {
  console.warn(R(c, "yellow"));
  console.log(b);
}});
const Dc = async(a, b = {}) => {
  const {tempDir:c = "depack-temp", preact:d} = b;
  b = {C:{[P("", a)]:1}, D:{}};
  await Cc(a, {tempDir:c, preact:d}, b);
  return [...Object.keys(b.C).map(e => O(c, e)), ...Object.keys(b.D)];
};
const Ec = async(a, b, c = []) => {
  const {src:d, tempDir:e = "depack-temp", preact:f} = a, {output:g, compilerVersion:k, debug:h, noSourceMap:l} = b;
  if (!d) {
    throw Error("Entry file is not given.");
  }
  a = await U(d, {nodeModules:!1});
  a = d.endsWith(".jsx") || a.some(({entry:n}) => n.endsWith(".jsx"));
  if (a) {
    b = await Dc(d, {tempDir:e, preact:f});
  } else {
    b = await U(d);
    var m = ub(b);
    const {o:n, F:p, u:q, H:t} = m;
    b = Hb(b);
    m = !(!n.length && !b.length);
    b = [d, ...n, ...t, ...q, ...p];
  }
  c = [...c, ...g && !l ? ["--source_map_include_content"] : [], ...1 < b.length ? ["--module_resolution", "NODE"] : [], ...m ? ["--process_common_js_modules"] : []];
  m = a ? b.map(n => n.startsWith(e) ? P(e, n) : n) : b;
  m = Bb(c, m);
  console.error(m);
  c = [...c, "--js", ...b];
  c = await Sb(c, {debug:h, compilerVersion:k, output:g, noSourceMap:l, aa:() => !1});
  !g && c && console.log(c);
  a && (g && !l && await Fb(g, e), await cb(e));
};
const Fc = a => /^\d+$/.test(a) ? `ECMASCRIPT_${a}` : a, Gc = a => {
  const {compiler:b = require.resolve("google-closure-compiler-java/compiler.jar"), output:c, level:d, advanced:e, languageIn:f, languageOut:g, sourceMap:k = !0, argv:h = [], prettyPrint:l, noWarnings:m, debug:n, iife:p} = a;
  a = ["-jar", b];
  d ? a.push("--compilation_level", d) : e && a.push("--compilation_level", "ADVANCED");
  f && a.push("--language_in", Fc(f));
  g && a.push("--language_out", Fc(g));
  c && k && !n && a.push("--create_source_map", "%outname%.map");
  l && a.push("--formatting", "PRETTY_PRINT");
  n && a.push("--print_source_after_each_pass");
  p && a.push("--isolation_mode", "IIFE");
  (m || n) && a.push("--warning_level", "QUIET");
  a.push(...h);
  c && a.push("--js_output_file", c);
  return a;
};
const Z = process.env.GOOGLE_CLOSURE_COMPILER, Hc = async() => {
  var a = "target";
  const b = Z ? "target" : require.resolve("google-closure-compiler-java/package.json");
  Z || (a = await I(b), {version:a} = JSON.parse(a), [a] = a.split("."));
  return a;
};
function Ic(a = {usage:{}}) {
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
    n = q.map(y => `${t}\t${y}`);
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
;var Jc = () => {
  var a = u(ca), b = u(pa), c = u(ta);
  a = Ic({line:"depack SOURCE [-cl] [-o output.js] [-IO 2018] [-wVvh] [-lvl LEVEL -a] [... --generic-args]", usage:a});
  c = Ic({line:"depack SOURCE -cl [-o output.js] [-s]", example:"depack src/bin.js -c -a -o depack/bin.js -p", usage:c});
  b = Ic({line:"depack SOURCE [-o output.js] [-H]", example:"depack source.js -o bundle.js -i -a -H", usage:b});
  return `Google Closure Compiler-based packager for the web and Node.JS.
https://artdecocode.com/depack/
Generic flags: https://github.com/google/closure-compiler/wiki/Flags-and-Options

${a}
${R("BACKEND", "blue")}: Creates a single executable Node.JS file or a library.
${c}
${R("FRONTEND", "cyan")}: Creates a bundle for the web.
${b}`;
};
oa && (console.log(Jc()), process.exit(0));
(async() => {
  try {
    var a = await Hc();
    if (na) {
      var b = require("../package.json").version;
      console.log("Depack version: %s", b);
      const f = await Sb([...Gc({compiler:Z}), "--version"], {compilerVersion:a});
      console.log(f);
    } else {
      var {path:c} = await S(da);
      if (w) {
        {
          let f = /\.js$/.test(w) ? w : O(w, Ta(c));
          var d = f = f.replace(/jsx$/, "js");
        }
      } else {
        d = void 0;
      }
      b = ja;
      !ja && ua && (b = 2017);
      var e = Gc({compiler:Z, output:d, level:ka, languageIn:ia, languageOut:b, argv:xa, advanced:la, sourceMap:!!w && !fa, prettyPrint:ea, noWarnings:ma, debug:x, iife:qa});
      a = {compilerVersion:a, output:d, noSourceMap:fa || !!x, debug:x};
      if (ua || va) {
        return await Xb({src:c, noStrict:wa, verbose:ha, debug:x, library:va}, a, e);
      }
      await Ec({src:c, tempDir:ra, preact:sa}, a, e);
    }
  } catch (f) {
    process.env.DEBUG ? console.log(f.stack) : console.log(f.message);
  }
})();


//# sourceMappingURL=depack.js.map