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
  const f = c ? new RegExp(`^-(${c}|-${b})`) : new RegExp(`^--${b}`);
  b = a.findIndex(h => f.test(h));
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
function t(a = {}, b = process.argv) {
  [, , ...b] = b;
  const c = ba(b);
  b = b.slice(c.length);
  let d = !c.length;
  return Object.keys(a).reduce(({b:e, ...f}, h) => {
    if (0 == e.length && d) {
      return {b:e, ...f};
    }
    const l = a[h];
    let k;
    if ("string" == typeof l) {
      ({value:k, argv:e} = aa(e, h, l));
    } else {
      try {
        const {short:g, boolean:m, number:p, command:n, multiple:q} = l;
        n && q && c.length ? (k = c, d = !0) : n && c.length ? (k = c[0], d = !0) : {value:k, argv:e} = aa(e, h, g, m, p);
      } catch (g) {
        return {b:e, ...f};
      }
    }
    return void 0 === k ? {b:e, ...f} : {b:e, ...f, [h]:k};
  }, {b});
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
}, ca = a => Object.keys(a).reduce((b, c) => {
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
const da = {source:{description:"The source entry to build.", command:!0}, output:{description:"Where to save the output.\nPrints to `stdout` when not passed.", short:"o"}, debug:{description:"The location of the file where to save sources after\neach pass.", short:"d"}, "pretty-print":{description:"Whether to apply the `--formatting=PRETTY_PRINT` flag.", boolean:!0, short:"p"}, "no-sourcemap":{description:"Disable source maps.", boolean:!0, short:"S"}, verbose:{description:"Print the exact command.", 
boolean:!0, short:"V"}, language_in:{description:"The language of the input sources, years also accepted.", short:"I"}, language_out:{description:"The language spec of the output, years accepted.", short:"O"}, level:{description:"The compilation level. Options:\nBUNDLE, WHITESPACE_ONLY, SIMPLE (default), ADVANCED.", short:"lvl"}, advanced:{description:"Whether to enable advanced optimisation.", boolean:!0, short:"a"}, "no-warnings":{description:"Do not print compiler's warnings by adding the\n`--warning_level QUIET` flag.", 
boolean:!0, short:"w"}, version:{description:"Shows the current _Depack_ and _GCC_ versions.", boolean:!0, short:"v"}, help:{description:"Prints the usage information.", boolean:!0, short:"h"}}, v = t(da), ea = v.source, w = v.output, y = v.debug, fa = v["pretty-print"], ha = v["no-sourcemap"], ia = v.verbose, ja = v.language_in, la = v.language_out, ma = v.level, na = v.advanced, oa = v["no-warnings"], pa = v.version, qa = v.help, ra = {iife:{description:"Add the IIFE flag to prevent name clashes.", 
boolean:!0, short:"i"}, temp:{description:"The path to the temp directory used to transpile JSX files.", default:"depack-temp"}, preact:{description:'Add the `import { h } from "preact"` to JSX files automatically.\nDoes not process files found in the `node_modules`, because\nthey are not placed in the temp, and must be built separately,\ne.g., with \u00c0LaMode transpiler.', boolean:!0, short:"H"}, external:{description:"The `preact` dependency in `node_modules` will be temporary\nrenamed to `_preact`, and a monkey-patching package that\nimports `\uff20externs/preact` will take its place. This is to allow\nbundles to import from _Preact_ installed as a script on a webpage,\nbut exclude it from compilation. `preact` will be restored at the end.", 
boolean:!0, short:"E"}, patch:{description:"Patches the `preact` directory like in `external`, and waits for\nuser input to restore it. Useful when linking packages and wanting\nto them from other projects.", boolean:!0, short:"P"}}, A = t(ra, [process.argv[0], process.argv[1], ...v.b]), sa = A.iife, ta = A.temp || "depack-temp", ua = A.preact, va = A.external, wa = A.patch, xa = {compile:{description:'Set the _Depack_ mode to "compile" to create a Node.JS binary.\nAdds the `#!usr/bin/env node` at the top and sets +x permission.', 
boolean:!0, short:"c"}, "no-strict":{description:'Whether to remove the `"use strict"` from the output.', boolean:!0, short:"s"}}, ya = t(xa, [process.argv[0], process.argv[1], ...A.b]), za = ya.compile, Aa = ya["no-strict"], Ba = ya.b;
const {createInterface:Ca} = readline;
const {chmod:Da, createReadStream:Ea, createWriteStream:Fa, lstat:B, mkdir:Ga, readdir:Ha, renameSync:Ia, rmdir:Ja, symlinkSync:Ka, unlink:La, unlinkSync:Ma} = fs;
var Na = stream;
const {Transform:Oa, Writable:Pa} = stream;
const Qa = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : void 0);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, Ra = (a, b = !1) => Qa(a, 2 + (b ? 1 : 0)), Sa = a => {
  ({callee:{caller:a}} = a);
  return a;
};
const {homedir:Ta} = os;
const Ua = /\s+at.*(?:\(|\s)(.*)\)?/, Va = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, Wa = Ta(), Xa = a => {
  const {pretty:b = !1, ignoredModules:c = ["pirates"]} = {}, d = c.join("|"), e = new RegExp(Va.source.replace("IGNORED_MODULES", d));
  return a.replace(/\\/g, "/").split("\n").filter(f => {
    f = f.match(Ua);
    if (null === f || !f[1]) {
      return !0;
    }
    f = f[1];
    return f.includes(".app/Contents/Resources/electron.asar") || f.includes(".app/Contents/Resources/default_app.asar") ? !1 : !e.test(f);
  }).filter(f => f.trim()).map(f => b ? f.replace(Ua, (h, l) => h.replace(l, l.replace(Wa, "~"))) : f).join("\n");
};
function Ya(a, b, c = !1) {
  return function(d) {
    var e = Sa(arguments), {stack:f} = Error();
    const h = Qa(f, 2, !0), l = (f = d instanceof Error) ? d.message : d;
    e = [`Error: ${l}`, ...null !== e && a === e || c ? [b] : [h, b]].join("\n");
    e = Xa(e);
    return Object.assign(f ? d : Error(), {message:l, stack:e});
  };
}
;function C(a) {
  var {stack:b} = Error();
  const c = Sa(arguments);
  b = Ra(b, a);
  return Ya(c, b, a);
}
;const Za = (a, b) => {
  b.once("error", c => {
    a.emit("error", c);
  });
  return b;
};
class $a extends Pa {
  constructor(a) {
    const {binary:b = !1, rs:c = null, ...d} = a || {}, {M:e = C(!0), proxyError:f} = a || {}, h = (l, k) => e(k);
    super(d);
    this.a = [];
    this.H = new Promise((l, k) => {
      this.on("finish", () => {
        let g;
        b ? g = Buffer.concat(this.a) : g = this.a.join("");
        l(g);
        this.a = [];
      });
      this.once("error", g => {
        if (-1 == g.stack.indexOf("\n")) {
          h`${g}`;
        } else {
          const m = Xa(g.stack);
          g.stack = m;
          f && h`${g}`;
        }
        k(g);
      });
      c && Za(this, c).pipe(this);
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
  ({promise:a} = new $a({rs:a, M:C(!0)}));
  return await a;
};
async function H(a) {
  a = Ea(a);
  return await E(a);
}
;async function J(a, b) {
  if (!a) {
    throw Error("No path is given.");
  }
  const c = C(!0), d = Fa(a);
  await new Promise((e, f) => {
    d.on("error", h => {
      h = c(h);
      f(h);
    }).on("close", e).end(b);
  });
}
;function ab(a, b) {
  if (b > a - 2) {
    throw Error("Function does not accept that many arguments.");
  }
}
async function K(a, b, c) {
  const d = C(!0);
  if ("function" !== typeof a) {
    throw Error("Function must be passed.");
  }
  const {length:e} = a;
  if (!e) {
    throw Error("Function does not accept any arguments.");
  }
  return await new Promise((f, h) => {
    const l = (g, m) => g ? (g = d(g), h(g)) : f(c || m);
    let k = [l];
    Array.isArray(b) ? (b.forEach((g, m) => {
      ab(e, m);
    }), k = [...b, l]) : 1 < Array.from(arguments).length && (ab(e, 0), k = [b, l]);
    a(...k);
  });
}
;const {basename:bb, dirname:L, join:M, relative:N, resolve:O, sep:cb} = path;
async function db(a) {
  const b = L(a);
  try {
    return await eb(b), a;
  } catch (c) {
    if (/EEXIST/.test(c.message) && -1 != c.message.indexOf(b)) {
      return a;
    }
    throw c;
  }
}
async function eb(a) {
  try {
    await K(Ga, a);
  } catch (b) {
    if ("ENOENT" == b.code) {
      const c = L(a);
      await eb(c);
      await eb(a);
    } else {
      if ("EEXIST" != b.code) {
        throw b;
      }
    }
  }
}
;async function fb(a, b) {
  b = b.map(async c => {
    const d = M(a, c);
    return {lstat:await K(B, d), path:d, relativePath:c};
  });
  return await Promise.all(b);
}
const gb = a => a.lstat.isDirectory(), hb = a => !a.lstat.isDirectory();
async function ib(a) {
  if (!a) {
    throw Error("Please specify a path to the directory");
  }
  if (!(await K(B, a)).isDirectory()) {
    throw a = Error("Path is not a directory"), a.code = "ENOTDIR", a;
  }
  var b = await K(Ha, a);
  b = await fb(a, b);
  a = b.filter(gb);
  b = b.filter(hb).reduce((c, d) => {
    var e = d.lstat.isDirectory() ? "Directory" : d.lstat.isFile() ? "File" : d.lstat.isSymbolicLink() ? "SymbolicLink" : void 0;
    return {...c, [d.relativePath]:{type:e}};
  }, {});
  a = await a.reduce(async(c, {path:d, relativePath:e}) => {
    c = await c;
    d = await ib(d);
    return {...c, [e]:d};
  }, {});
  return {content:{...b, ...a}, type:"Directory"};
}
;const jb = async a => {
  await K(La, a);
}, kb = async a => {
  const {content:b} = await ib(a);
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
  c = c.map(e => M(a, e));
  await Promise.all(c.map(jb));
  d = d.map(e => M(a, e));
  await Promise.all(d.map(kb));
  await K(Ja, a);
}, lb = async a => {
  (await K(B, a)).isDirectory() ? await kb(a) : await jb(a);
};
const P = async a => {
  try {
    return await K(B, a);
  } catch (b) {
    return null;
  }
};
/*
 diff package https://github.com/kpdecker/jsdiff
 BSD License
 Copyright (c) 2009-2015, Kevin Decker <kpdecker@gmail.com>
*/
const mb = {black:30, red:31, green:32, yellow:33, blue:34, magenta:35, cyan:36, white:37, grey:90}, nb = {black:40, red:41, green:42, yellow:43, blue:44, magenta:45, cyan:46, white:47};
function Q(a, b) {
  return (b = mb[b]) ? `\x1b[${b}m${a}\x1b[0m` : a;
}
function ob(a, b) {
  return (b = nb[b]) ? `\x1b[${b}m${a}\x1b[0m` : a;
}
;const {builtinModules:pb} = _module;
const R = async(a, b) => {
  b && (b = L(b), a = M(b, a));
  var c = await P(a);
  b = a;
  let d = !1;
  if (!c) {
    if (b = await qb(a), !b) {
      throw Error(`${a}.js or ${a}.jsx is not found.`);
    }
  } else {
    if (c.isDirectory()) {
      c = !1;
      let e;
      a.endsWith("/") || (e = b = await qb(a), c = !0);
      if (!e) {
        b = await qb(M(a, "index"));
        if (!b) {
          throw Error(`${c ? `${a}.jsx? does not exist, and ` : ""}index.jsx? file is not found in ${a}`);
        }
        d = !0;
      }
    }
  }
  return {path:a.startsWith(".") ? N("", b) : b, V:d};
}, qb = async a => {
  a = `${a}.js`;
  let b = await P(a);
  b || (a = `${a}x`);
  if (b = await P(a)) {
    return a;
  }
};
function rb(a, b) {
  var c = ["q", "from"];
  const d = [];
  b.replace(a, (e, ...f) => {
    e = f.slice(0, f.length - 2).reduce((h, l, k) => {
      k = c[k];
      if (!k || void 0 === l) {
        return h;
      }
      h[k] = l;
      return h;
    }, {});
    d.push(e);
  });
  return d;
}
;const sb = /^ *import(?:\s+(?:[^\s,]+)\s*,?)?(?:\s*{(?:[^}]+)})?\s+from\s+(['"])(.+?)\1/gm, tb = /^ *import\s+(?:.+?\s*,\s*)?\*\s+as\s+.+?\s+from\s+(['"])(.+?)\1/gm, ub = /^ *import\s+(['"])(.+?)\1/gm, vb = /^ *export\s+(?:{[^}]+?}|\*)\s+from\s+(['"])(.+?)\1/gm, wb = a => [sb, tb, ub, vb].reduce((b, c) => {
  c = rb(c, a).map(d => d.from);
  return [...b, ...c];
}, []);
const xb = a => {
  let [b, c, ...d] = a.split("/");
  !b.startsWith("@") && c ? (d = [c, ...d], c = b) : c = b.startsWith("@") ? `${b}/${c}` : b;
  return {name:c, paths:d.join("/")};
};
const T = async(a, b, c = {}) => {
  const {fields:d, soft:e = !1} = c;
  var f = M(a, "node_modules", b);
  f = M(f, "package.json");
  const h = await P(f);
  if (h) {
    a = await yb(f, d);
    if (void 0 === a) {
      throw Error(`The package ${N("", f)} does export the module.`);
    }
    if (!a.entryExists && !e) {
      throw Error(`The exported module ${a.main} in package ${b} does not exist.`);
    }
    const {entry:l, version:k, packageName:g, main:m, entryExists:p, ...n} = a;
    return {entry:N("", l), packageJson:N("", f), ...k ? {version:k} : {}, packageName:g, ...m ? {hasMain:!0} : {}, ...p ? {} : {entryExists:!1}, ...n};
  }
  if ("/" == a && !h) {
    throw Error(`Package.json for module ${b} not found.`);
  }
  return T(M(O(a), ".."), b, c);
}, yb = async(a, b = []) => {
  const c = await H(a);
  let d, e, f, h, l;
  try {
    ({module:d, version:e, name:f, main:h, ...l} = JSON.parse(c)), l = b.reduce((g, m) => {
      g[m] = l[m];
      return g;
    }, {});
  } catch (g) {
    throw Error(`Could not parse ${a}.`);
  }
  a = L(a);
  b = d || h;
  if (!b) {
    if (!await P(M(a, "index.js"))) {
      return;
    }
    b = h = "index.js";
  }
  a = M(a, b);
  let k;
  try {
    ({path:k} = await R(a)), a = k;
  } catch (g) {
  }
  return {entry:a, version:e, packageName:f, main:!d && h, entryExists:!!k, ...l};
};
const zb = a => /^[./]/.test(a), Ab = async(a, b, c, d, e = null) => {
  const f = C(), h = L(a);
  b = b.map(async l => {
    if (pb.includes(l)) {
      return {internal:l};
    }
    if (/^[./]/.test(l)) {
      try {
        const {path:k} = await R(l, a);
        return {entry:k, package:e};
      } catch (k) {
      }
    } else {
      const {name:k, paths:g} = xb(l);
      if (g) {
        const {packageJson:m, packageName:p} = await T(h, k);
        l = L(m);
        ({path:l} = await R(M(l, g)));
        return {entry:l, package:p};
      }
    }
    try {
      const {entry:k, packageJson:g, version:m, packageName:p, hasMain:n, ...q} = await T(h, l, {fields:d});
      return p == e ? (console.warn("[static-analysis] Skipping package %s that imports itself in %s", p, a), null) : {entry:k, packageJson:g, version:m, name:p, ...n ? {hasMain:n} : {}, ...q};
    } catch (k) {
      if (c) {
        return null;
      }
      throw f(k);
    }
  });
  return (await Promise.all(b)).filter(Boolean);
}, Cb = async(a, b = {}, {nodeModules:c = !0, shallow:d = !1, soft:e = !1, fields:f = [], X:h = {}, mergeSameNodeModules:l = !0, package:k} = {}) => {
  if (a in b) {
    return [];
  }
  b[a] = 1;
  var g = await H(a), m = wb(g);
  g = Bb(g);
  m = c ? m : m.filter(zb);
  g = c ? g : g.filter(zb);
  try {
    const n = await Ab(a, m, e, f, k), q = await Ab(a, g, e, f, k);
    q.forEach(r => {
      r.required = !0;
    });
    var p = [...n, ...q];
  } catch (n) {
    throw n.message = `${a}\n [!] ${n.message}`, n;
  }
  k = l ? p.map(n => {
    const {name:q, version:r, required:u} = n;
    if (q && r) {
      const x = `${q}:${r}${u ? "-required" : ""}`, I = h[x];
      if (I) {
        return I;
      }
      h[x] = n;
    }
    return n;
  }) : p;
  p = k.map(n => ({...n, from:a}));
  return await k.filter(({entry:n}) => n && !(n in b)).reduce(async(n, {entry:q, hasMain:r, packageJson:u, name:x, package:I}) => {
    if (u && d) {
      return n;
    }
    n = await n;
    x = (await Cb(q, b, {nodeModules:c, shallow:d, soft:e, fields:f, package:x || I, X:h, mergeSameNodeModules:l})).map(F => ({...F, from:F.from ? F.from : q, ...!F.packageJson && r ? {hasMain:r} : {}}));
    return [...n, ...x];
  }, p);
}, Bb = a => rb(/(?:^|[^\w\d_])require\(\s*(['"])(.+?)\1\s*\)/gm, a).map(b => b.from);
const U = async(a, b = {}) => {
  const c = C();
  a = Array.isArray(a) ? a : [a];
  a = await Promise.all(a.map(async g => {
    ({path:g} = await R(g));
    return g;
  }));
  const {nodeModules:d = !0, shallow:e = !1, soft:f = !1, fields:h = [], mergeSameNodeModules:l = !0} = b;
  let k;
  try {
    const g = {};
    k = await a.reduce(async(m, p) => {
      m = await m;
      p = await Cb(p, g, {nodeModules:d, shallow:e, soft:f, fields:h, mergeSameNodeModules:l});
      m.push(...p);
      return m;
    }, []);
  } catch (g) {
    throw c(g);
  }
  return k.filter(({internal:g, entry:m}, p) => g ? k.findIndex(({internal:n}) => n == g) == p : k.findIndex(({entry:n}) => m == n) == p).map(g => {
    const {entry:m, internal:p} = g, n = k.filter(({internal:q, entry:r}) => {
      if (p) {
        return p == q;
      }
      if (m) {
        return m == r;
      }
    }).map(({from:q}) => q).filter((q, r, u) => u.indexOf(q) == r);
    return {...g, from:n};
  }).map(({package:g, ...m}) => g ? {package:g, ...m} : m);
}, Db = a => {
  const b = [], c = [], d = [], e = [], f = [], h = [];
  a.forEach(({packageJson:l, hasMain:k, name:g, entry:m, internal:p}) => {
    if (p) {
      return f.push(p);
    }
    l && k ? c.push(l) : l && b.push(l);
    m && k ? d.push(m) : m && e.push(m);
    g && h.push(g);
  });
  return {commonJsPackageJsons:c, packageJsons:b, commonJs:d, js:e, internals:f, deps:h};
};
const Eb = (a, b) => {
  a = " ".repeat(Math.max(a - b.length, 0));
  return `${b}${a}`;
}, Fb = a => {
  var {width:b} = {};
  a = a.split("\n");
  b = b || a.reduce((c, {length:d}) => d > c ? d : c, 0);
  return a.map(Eb.bind(null, b)).join("\n");
};
function Gb(a) {
  const {padding:b = 1} = {};
  var c = a.split("\n").reduce((f, {length:h}) => h > f ? h : f, 0) + 2 * b;
  const d = `\u250c${"\u2500".repeat(c)}\u2510`;
  c = `\u2514${"\u2500".repeat(c)}\u2518`;
  const e = " ".repeat(b);
  a = Fb(a).split("\n").map(f => `\u2502${e}${f}${e}\u2502`).join("\n");
  return `${d}\n${a}\n${c}`;
}
;const V = (a, b, c, d = !1) => a.replace(new RegExp(`--${b} (\\\\\n)?(\\S+)`, "g"), (e, f, h) => `--${b} ${f || ""}${(d ? ob : Q)(h, c)}`), Ib = (a, b) => {
  a = Hb(a);
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
}, Jb = async(a, {sourceMap:b}) => {
  const c = [await H(a)];
  b && (b = bb(a), c.push("//" + `# sourceMappingURL=${b}.map`));
  await J(a, c.join("\n"));
}, Lb = async(a, b = "", c = !1) => {
  if (!b.startsWith("'use strict'") || c) {
    var d = await H(a);
    b = Kb(d, b, c);
    await J(a, b);
  }
}, Kb = (a, b = "", c = !1) => {
  const d = b.replace(/%output%$/, "");
  a = a.replace(d, "");
  const e = a.startsWith("'use strict';");
  let f = a;
  if (b || c) {
    f = a.replace(/'use strict';/, " ".repeat(13));
  }
  return `${c || !e ? d.replace(/'use strict';/, " ".repeat(13)) : d}${f}`;
}, Mb = async(a, b) => {
  a = `${a}.map`;
  var c = await H(a);
  c = JSON.parse(c);
  var {sources:d} = c;
  d = d.map(e => e.startsWith(" ") ? e : `/${N(b, e)}`);
  c.sources = d;
  c = JSON.stringify(c, null, 2);
  await J(a, c);
}, Nb = a => {
  if (a.length) {
    return `#!/usr/bin/env node
'use strict';
${a.map(b => {
      let c = b;
      ["module", "process", "console", "crypto"].includes(b) && (c = `_${b}`);
      return `const ${c} = r` + `equire('${b}');`;
    }).join("\n") + "%output%"}`;
  }
}, Ob = a => a.filter(({entry:b}) => {
  if (b) {
    return b.endsWith(".json");
  }
}), {DEPACK_MAX_COLUMNS:Pb = 87} = process.env, Hb = a => {
  const b = process.stderr.columns - 3 || Pb;
  let c = 4;
  return a.reduce((d, e) => {
    c + e.length > b ? (d = d + " \\\n" + e, c = e.length) : (d = d + " " + e, c += e.length + 1);
    return d;
  }, "java");
}, Qb = async(a, b) => {
  await Promise.all(a.map(async c => {
    if (!await P(c)) {
      throw Error(`Externs file ${c}${b ? ` specified in the "externs" field of package ${b}` : ""} doesn't exist.`);
    }
  }));
}, Rb = async a => {
  const b = [];
  return {files:await a.reduce(async(c, {name:d, packageJson:e, externs:f = []}) => {
    c = await c;
    if (!e) {
      return c;
    }
    const h = L(e);
    f = Array.isArray(f) ? f : [f];
    f = f.filter(l => pb.includes(l) ? (b.push(l), !1) : !0);
    e = f.map(l => M(h, l));
    await Qb(e, d);
    return [...c, ...e];
  }, []), W:b};
}, Sb = a => a.reduce((b, c) => [...b, "--externs", c], []);
const Tb = require("@depack/nodejs"), Ub = (a, b) => {
  b = b.split("\n\n").map(c => /^.+?:\d+:(?:\s*Originally at:\s*.+?)? WARNING -/.test(c) ? Q(c, "grey") : Q(c, "red")).join("\n\n");
  return `Exit code ${a}\n${b}`;
}, Vb = () => {
  let [a] = process.version.split(".", 1);
  const b = a.replace(/[^\d]/g, "");
  if (8 < b || 8 > b) {
    console.log("Your Node.JS version is %s but only externs for v8 are available at the moment. This can result in compiler warnings.", a), a = "v8";
  }
  return a;
}, Xb = async({internals:a, aa:b = "node_modules", force:c = !0}) => {
  const d = Vb(), e = Tb(d);
  return (await Promise.all(a.map(async f => {
    const h = M(b, f), l = M(h, "package.json");
    var k = M(h, "index.js");
    const g = {packageJson:l, index:k};
    if (await P(l) && !c) {
      if ((k = await Wb(l)) && k == d) {
        return g;
      }
      throw Error(`Could not prepare core module ${f}: ${h} exists.`);
    }
    await db(l);
    await J(l, JSON.stringify({name:f, module:"index.js", depack:d}));
    f = await H(M(e, `${f}.js`));
    await J(k, f);
    return g;
  }))).reduce((f, {packageJson:h, index:l}) => [...f, h, l], []);
}, Wb = async a => {
  try {
    const b = await H(a), {depack:c} = JSON.parse(b);
    return c;
  } catch (b) {
  }
}, Yb = async(a, b) => {
  a = [...a, ...b];
  await Promise.all(a.map(async c => {
    var d = L(c), e = await H(c);
    e = JSON.parse(e);
    const {main:f, module:h} = e, l = h ? "module" : "main";
    let k = h || f;
    if (!k) {
      const p = M(L(c), "index.js");
      if (!await P(p)) {
        throw Error(`Package ${c} does not specify either main or module fields, and does not contain the index.js file.`);
      }
      e.main = "index.js";
      console.warn("Updating %s to have the main field.", c);
      await J(c, JSON.stringify(e, null, 2));
    }
    let g, m;
    try {
      ({V:g, path:m} = await R(k, c));
    } catch (p) {
      throw Error(`The ${l} for dependency ${c} does not exist.`);
    }
    g ? (d = M(k, "index.js"), e[l] = d, console.warn("Updating %s to point to a file.", c), await J(c, JSON.stringify(e, null, 2))) : M(d, e[l]) != m && (d = N(d, m), e[l] = d, console.warn("Updating %s to point to the file with extension.", c), await J(c, JSON.stringify(e, null, 2)));
  }));
};
async function Zb(a, b) {
  const {interval:c = 250, writable:d = process.stdout} = {writable:process.stderr};
  b = "function" == typeof b ? b() : b;
  const e = d.write.bind(d);
  var {INDICATRIX_PLACEHOLDER:f} = process.env;
  if (f && "0" != f) {
    return e(`${a}<INDICATRIX_PLACEHOLDER>`), await b;
  }
  let h = 1, l = `${a}${".".repeat(h)}`;
  e(l);
  f = setInterval(() => {
    h = (h + 1) % 4;
    l = `${a}${".".repeat(h)}`;
    e(`\r${" ".repeat(a.length + 3)}\r`);
    e(l);
  }, c);
  try {
    return await b;
  } finally {
    clearInterval(f), e(`\r${" ".repeat(a.length + 3)}\r`);
  }
}
;const {spawn:$b} = child_process;
const ac = async a => {
  const [b, c, d] = await Promise.all([new Promise((e, f) => {
    a.on("error", f).on("exit", h => {
      e(h);
    });
  }), a.stdout ? E(a.stdout) : void 0, a.stderr ? E(a.stderr) : void 0]);
  return {code:b, stdout:c, stderr:d};
};
function bc(a) {
  a = $b("java", a, void 0);
  const b = ac(a);
  a.promise = b;
  a.spawnCommand = a.spawnargs.join(" ");
  return a;
}
;const cc = async(a, b = {}) => {
  const {debug:c, compilerVersion:d, output:e, noSourceMap:f, ba:h} = b;
  let {promise:l, stderr:k} = bc(a);
  c && k.pipe(Fa(c));
  const {stdout:g, stderr:m, code:p} = await Zb(`Running Google Closure Compiler${d ? " " + Q(d, "grey") : ""}`, l);
  if (p) {
    throw Error(Ub(p, m));
  }
  f || (h ? await Promise.all(h.map(async n => {
    await Jb(n, {sourceMap:!0});
  })) : e && await Jb(e, {sourceMap:!f}));
  m && !c ? console.warn(Q(m, "grey")) : c && console.log("Sources after each pass saved to %s", c);
  return g;
};
const dc = require("@externs/nodejs"), {dependencies:ec} = dc, ic = async(a, b = {}, c = []) => {
  const {src:d, noStrict:e, verbose:f, silent:h} = a;
  ({output:a} = b);
  if (!d) {
    throw Error("Source is not given.");
  }
  var l = c.reduce((z, G, ka, Bc) => {
    if ("--externs" != G) {
      return z;
    }
    G = Bc[ka + 1];
    if (!G) {
      return z;
    }
    pb.includes(G) && (c[ka] = "", c[ka + 1] = "", z.push(G));
    return z;
  }, []);
  const k = [...l.length ? c.filter(z => z) : c, "--package_json_entry_names", "module,main", "--entry_point", d];
  var g = await U(d, {fields:["externs"]});
  const {files:m, W:p} = await Rb(g);
  m.length && console.error("%s %s", Q("Modules' externs:", "blue"), m.join(" "));
  const n = Sb(m);
  fc(g);
  const q = Db(g), {commonJs:r, commonJsPackageJsons:u, internals:x, js:I, packageJsons:F} = q;
  var D = await Xb({internals:x});
  l = await gc(x, [...l, ...p]);
  await Yb(u, F);
  var S = [d, ...u, ...F, ...I, ...r, ...D].sort((z, G) => z.startsWith("node_modules") ? -1 : G.startsWith("node_modules") ? 1 : 0);
  D = Nb(x);
  g = Ob(g);
  S = [...k, ...l, ...n, ...1 < S.length ? ["--module_resolution", "NODE"] : [], ...r.length ? ["--process_common_js_modules"] : [], ...D ? ["--output_wrapper", D] : [], "--js", ...S];
  g.length && !r.length && (g = g.filter(({required:z}) => z, !1), g.length && (console.error("You are requiring JSON files. Make sure their relative paths will stay the same to the build."), console.log(g.map(({entry:z, from:G}) => `${Q(z, "blue")} from ${G.join(" ")}`).join("\n"))));
  f ? console.error(Hb(S)) : hc(k, [...l, ...n], q);
  b = await cc(S, b);
  if (!a) {
    return b = Kb(b, D, e).trim(), h || console.log(b), b;
  }
  await Lb(a, D, e);
  await K(Da, [a, "755"]);
  return b;
}, hc = (a, b, c) => {
  a = Hb([...a, ...b]);
  a = V(a, "js_output_file", "red");
  a = V(a, "externs", "grey");
  a = V(a, "compilation_level", "green", !0);
  console.error(a);
  const {commonJs:d, internals:e, js:f, deps:h} = c;
  c = f.filter(jc);
  a = d.filter(jc);
  h.length && console.error("%s: %s", Q("Dependencies", "yellow"), h.filter((l, k, g) => g.indexOf(l) == k).join(" "));
  c.length && console.error("%s: %s", Q("Modules", "yellow"), c.join(" "));
  a.length && console.error("%s: %s", Q("CommonJS", "yellow"), a.join(" "));
  e.length && console.error("%s: %s", Q("Built-ins", "yellow"), e.join(", "));
}, fc = a => {
  const b = a.map(({hasMain:c, name:d, from:e}) => {
    if (c && d && (c = e.filter(f => {
      const h = a.find(({entry:l}) => l === f);
      if (h && !h.hasMain) {
        return !0;
      }
    }), c.length)) {
      return {name:d, R:c};
    }
  }).filter(Boolean);
  b.length && (console.error(Q(kc(), "red")), console.error("The following commonJS packages referenced in ES6 modules don't support named exports:"), b.forEach(({name:c, R:d}) => {
    console.error(" %s from %s", Q(c, "red"), Q(d.join(" "), "grey"));
  }));
}, kc = () => {
  let a = "CommonJS don't have named exports, make sure to use them like\nimport myModule from 'my-module' /* CommonJS Compat */\nmyModule.default.method('hello world') // yes Node.JS, wat r u doing\nmyModule.default('must explicitly call default')";
  const b = a.split("\n").reduce((c, {length:d}) => d > c ? d : c, 0);
  process.stderr.isTTY && b + 4 < process.stderr.columns && (a = Gb(a));
  return a;
}, jc = a => !a.startsWith("node_modules"), lc = (a, b, c) => c.indexOf(a) == b, gc = async(a, b = []) => {
  const c = dc();
  a = [...[...a, ...b].filter(lc).reduce((d, e) => {
    const f = ec[e] || [];
    return [...d, e, ...f];
  }, []).filter(lc), "global", "global/buffer", "nodejs"].map(d => {
    ["module", "process", "console", "crypto"].includes(d) && (d = `_${d}`);
    return M(c, `${d}.js`);
  });
  await Qb(a);
  return Sb(a);
};
const {Script:mc} = vm;
const nc = (a, b) => {
  const [c, , d] = a.split("\n");
  a = parseInt(c.replace(/.+?(\d+)$/, (f, h) => h)) - 1;
  const e = d.indexOf("^");
  ({length:b} = b.split("\n").slice(0, a).join("\n"));
  return b + e + (a ? 1 : 0);
};
const oc = a => {
  try {
    new mc(a);
  } catch (b) {
    const {message:c, stack:d} = b;
    if ("Unexpected token <" != c) {
      throw b;
    }
    return nc(d, a);
  }
  return null;
};
function pc(a) {
  if ("object" != typeof a) {
    return !1;
  }
  const {re:b, replacement:c} = a;
  a = b instanceof RegExp;
  const d = -1 != ["string", "function"].indexOf(typeof c);
  return a && d;
}
const qc = (a, b) => {
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
    return b.filter(pc).reduce((d, {re:e, replacement:f}) => {
      if (this.c) {
        return d;
      }
      if ("string" == typeof f) {
        return d = d.replace(e, f);
      }
      {
        let h;
        return d.replace(e, (l, ...k) => {
          h = Error();
          try {
            return this.c ? l : f.call(this, l, ...k);
          } catch (g) {
            qc(h, g);
          }
        });
      }
    }, `${a}`);
  }
  c.a = () => {
    c.c = !0;
  };
  return c.call(c);
}
;const rc = a => new RegExp(`%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_(\\d+)_%%`, "g"), sc = (a, b) => `%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_${b}_%%`, tc = (a, b) => Object.keys(a).reduce((c, d) => {
  {
    var e = a[d];
    const {getReplacement:f = sc, getRegex:h = rc} = b || {}, l = h(d);
    e = {name:d, re:e, regExp:l, getReplacement:f, map:{}, lastIndex:0};
  }
  return {...c, [d]:e};
}, {}), X = a => {
  var b = [];
  const {regExp:c, map:d} = a;
  return {re:c, replacement(e, f) {
    e = d[f];
    delete d[f];
    return W(e, Array.isArray(b) ? b : [b]);
  }};
}, Y = a => {
  const {re:b, map:c, getReplacement:d, name:e} = a;
  return {re:b, replacement(f) {
    const {lastIndex:h} = a;
    c[h] = f;
    a.lastIndex += 1;
    return d(e, h);
  }};
};
async function uc(a, b) {
  return vc(a, b);
}
class wc extends Oa {
  constructor(a, b) {
    super(b);
    this.a = (Array.isArray(a) ? a : [a]).filter(pc);
    this.c = !1;
    this.S = b;
  }
  async replace(a, b) {
    const c = new wc(this.a, this.S);
    b && Object.assign(c, b);
    a = await uc(c, a);
    c.c && (this.c = !0);
    b && Object.keys(b).forEach(d => {
      b[d] = c[d];
    });
    return a;
  }
  async reduce(a) {
    return await this.a.reduce(async(b, {re:c, replacement:d}) => {
      b = await b;
      if (this.c) {
        return b;
      }
      if ("string" == typeof d) {
        b = b.replace(c, d);
      } else {
        const e = [];
        let f;
        const h = b.replace(c, (l, ...k) => {
          f = Error();
          try {
            if (this.c) {
              return e.length ? e.push(Promise.resolve(l)) : l;
            }
            const g = d.call(this, l, ...k);
            g instanceof Promise && e.push(g);
            return g;
          } catch (g) {
            qc(f, g);
          }
        });
        if (e.length) {
          try {
            const l = await Promise.all(e);
            b = b.replace(c, () => l.shift());
          } catch (l) {
            qc(f, l);
          }
        } else {
          b = h;
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
      a = Xa(d.stack), d.stack = a, c(d);
    }
  }
}
async function vc(a, b) {
  b instanceof Na ? b.pipe(a) : a.end(b);
  return await E(a);
}
;const xc = a => {
  [, a] = /<\s*(.+?)(?:\s+[\s\S]+)?\s*\/?\s*>/.exec(a) || [];
  return a;
}, zc = a => {
  let b = 0;
  const c = [];
  let d;
  W(a, [{re:/[{}]/g, replacement(k, g) {
    k = "}" == k;
    const m = !k;
    if (!b && k) {
      throw Error("A closing } is found without opening one.");
    }
    b += m ? 1 : -1;
    1 == b && m ? d = {open:g} : 0 == b && k && (d.close = g, c.push(d), d = {});
  }}]);
  if (b) {
    throw Error(`Unbalanced props (level ${b}) ${a}`);
  }
  const e = {}, f = [], h = {};
  var l = c.reduce((k, {open:g, close:m}) => {
    k = a.slice(k, g);
    const [, p, n, q, r] = /(\s*)(\S+)(\s*)=(\s*)$/.exec(k) || [];
    g = a.slice(g + 1, m);
    if (!n && !/\s*\.\.\./.test(g)) {
      throw Error("Could not detect prop name");
    }
    n ? e[n] = g : f.push(g);
    h[n] = {before:p, B:q, v:r};
    g = k || "";
    g = g.slice(0, g.length - (n || "").length - 1);
    const {o:u, i:x} = yc(g);
    Object.assign(e, u);
    Object.assign(h, x);
    return m + 1;
  }, 0);
  if (c.length) {
    l = a.slice(l);
    const {o:k, i:g} = yc(l);
    Object.assign(e, k);
    Object.assign(h, g);
  } else {
    const {o:k, i:g} = yc(a);
    Object.assign(e, k);
    Object.assign(h, g);
  }
  return {m:e, l:f, i:h};
}, yc = a => {
  const b = [], c = {};
  a.replace(/(\s*)(\S+)(\s*)=(\s*)(["'])([\s\S]+?)\5/g, (d, e, f, h, l, k, g, m) => {
    c[f] = {before:e, B:h, v:l};
    b.push({j:m, name:f, G:`${k}${g}${k}`});
    return "%".repeat(d.length);
  }).replace(/(\s*)([^\s%]+)/g, (d, e, f, h) => {
    c[f] = {before:e};
    b.push({j:h, name:f, G:"true"});
  });
  return {o:[...b.reduce((d, {j:e, name:f, G:h}) => {
    d[e] = [f, h];
    return d;
  }, [])].filter(Boolean).reduce((d, [e, f]) => {
    d[e] = f;
    return d;
  }, {}), i:c};
}, Ac = (a, b = [], c = !1, d = {}, e = "") => {
  const f = Object.keys(a), {length:h} = f;
  return h || b.length ? `{${f.reduce((l, k) => {
    const g = a[k], m = c || -1 != k.indexOf("-") ? `'${k}'` : k, {before:p = "", B:n = "", v:q = ""} = d[k] || {};
    return [...l, `${p}${m}${n}:${q}${g}`];
  }, b).join(",")}${e}}` : "{}";
}, Cc = (a = "") => {
  [a] = a;
  if (!a) {
    throw Error("No tag name is given");
  }
  return a.toUpperCase() == a;
}, Dc = (a, b = {}, c = [], d = [], e = !1, f = null, h = {}, l = "") => {
  const k = Cc(a), g = k ? a : `'${a}'`;
  if (!Object.keys(b).length && !c.length && !d.length) {
    return `h(${g})`;
  }
  const m = k && "dom" == e ? !1 : e;
  k || !d.length || e && "dom" != e || f && f(`JSX: destructuring ${d.join(" ")} is used without quoted props on HTML ${a}.`);
  a = Ac(b, d, m, h, l);
  b = c.reduce((p, n, q) => {
    q = c[q - 1];
    return `${p}${q && /\S/.test(q) ? "," : ""}${n}`;
  }, "");
  return `h(${g},${a}${b ? `,${b}` : ""})`;
};
const Ec = (a, b = []) => {
  let c = 0, d;
  a = W(a, [...b, {re:/[<>]/g, replacement(e, f) {
    if (d) {
      return e;
    }
    const h = "<" == e;
    c += h ? 1 : -1;
    0 == c && !h && (d = f);
    return e;
  }}]);
  if (c) {
    throw Error(1);
  }
  return {Y:a, F:d};
}, Gc = a => {
  const b = xc(a);
  let c;
  const {I:d} = tc({I:/=>/g});
  try {
    ({Y:k, F:c} = Ec(a, [Y(d)]));
  } catch (g) {
    if (1 === g) {
      throw Error(`Could not find the matching closing > for ${b}.`);
    }
  }
  const e = k.slice(0, c + 1);
  var f = e.replace(/<\s*[^\s/>]+/, "");
  if (/\/\s*>$/.test(f)) {
    return a = f.replace(/\/\s*>$/, ""), f = "", new Fc({h:e.replace(d.regExp, "=>"), g:a.replace(d.regExp, "=>"), content:"", tagName:b});
  }
  a = f.replace(/>$/, "");
  f = c + 1;
  c = !1;
  let h = 1, l;
  W(k, [{re:new RegExp(`[\\s\\S](?:<\\s*${b}(\\s+|>)|/\\s*${b}\\s*>)`, "g"), replacement(g, m, p, n) {
    if (c) {
      return g;
    }
    m = !m && g.endsWith(">");
    const q = !m;
    if (q) {
      n = n.slice(p);
      const {F:r} = Ec(n.replace(/^[\s\S]/, " "));
      n = n.slice(0, r + 1);
      if (/\/\s*>$/.test(n)) {
        return g;
      }
    }
    h += q ? 1 : -1;
    0 == h && m && (c = p, l = c + g.length);
    return g;
  }}]);
  if (h) {
    throw Error(`Could not find the matching closing </${b}>.`);
  }
  f = k.slice(f, c);
  var k = k.slice(0, l).replace(d.regExp, "=>");
  return new Fc({h:k, g:a.replace(d.regExp, "=>"), content:f.replace(d.regExp, "=>"), tagName:b});
};
class Fc {
  constructor(a) {
    this.h = a.h;
    this.g = a.g;
    this.content = a.content;
    this.tagName = a.tagName;
  }
}
;const Hc = a => {
  let b = "", c = "";
  a = a.replace(/^(\n\s*)([\s\S]+)?/, (d, e, f = "") => {
    b = e;
    return f;
  }).replace(/([\s\S]+?)?(\n\s*)$/, (d, e = "", f = "") => {
    c = f;
    return e;
  });
  return `${b}${a ? `\`${a}\`` : ""}${c}`;
}, Jc = a => {
  const b = [];
  let c = {}, d = 0, e = 0;
  W(a, [{re:/[<{}]/g, replacement(f, h) {
    if (!(h < e)) {
      if (/[{}]/.test(f)) {
        d += "{" == f ? 1 : -1, 1 == d && void 0 == c.from ? c.from = h : 0 == d && (c.s = h + 1, c.N = a.slice(c.from + 1, h), b.push(c), c = {});
      } else {
        if (d) {
          return f;
        }
        f = Gc(a.slice(h));
        e = h + f.h.length;
        c.O = f;
        c.s = e;
        c.from = h;
        b.push(c);
        c = {};
      }
    }
  }}, {}]);
  return b.length ? Ic(a, b) : [Hc(a)];
}, Ic = (a, b) => {
  let c = 0;
  b = b.reduce((d, {from:e, s:f, N:h, O:l}) => {
    (e = a.slice(c, e)) && d.push(Hc(e));
    c = f;
    h ? d.push(h) : l && d.push(l);
    return d;
  }, []);
  if (c < a.length) {
    const d = a.slice(c, a.length);
    d && b.push(Hc(d));
  }
  return b;
};
const Lc = (a, b = {}) => {
  const {quoteProps:c, warn:d} = b;
  var e = oc(a);
  if (null === e) {
    return a;
  }
  var f = a.slice(e);
  const {g:h = "", content:l, tagName:k, h:{length:g}} = Gc(f);
  f = Kc(l, c, d);
  const {m, l:p, i:n} = zc(h.replace(/^ */, ""));
  var q = Dc(k, m, f, p, c, d, n, /\s*$/.exec(h) || [""]);
  f = a.slice(0, e);
  a = a.slice(e + g);
  e = g - q.length;
  0 < e && (q = `${" ".repeat(e)}${q}`);
  f = `${f}${q}${a}`;
  return Lc(f, b);
}, Kc = (a, b = !1, c = null) => a ? Jc(a).reduce((d, e) => {
  if (e instanceof Fc) {
    const {g:l = "", content:k, tagName:g} = e, {m, l:p} = zc(l);
    e = Kc(k, b, c);
    e = Dc(g, m, e, p, b, c);
    return [...d, e];
  }
  const f = oc(e);
  if (f) {
    var h = e.slice(f);
    const {h:{length:l}, g:k = "", content:g, tagName:m} = Gc(h), {m:p, l:n} = zc(k);
    h = Kc(g, b, c);
    h = Dc(m, p, h, n, b, c);
    const q = e.slice(0, f);
    e = e.slice(f + l);
    return [...d, `${q}${h}${e}`];
  }
  return [...d, e];
}, []) : [];
const Mc = (a, b = {}) => {
  const {e:c, K:d, L:e, j:f, T:h, U:l} = tc({K:/^ *export\s+default\s+{[\s\S]+?}/mg, e:/^ *export\s+(?:default\s+)?/mg, L:/^ *export\s+{[^}]+}\s+from\s+(['"])(?:.+?)\1/mg, j:/^ *import(\s+([^\s,]+)\s*,?)?(\s*{(?:[^}]+)})?\s+from\s+['"].+['"]/gm, T:/^ *import\s+(?:(.+?)\s*,\s*)?\*\s+as\s+.+?\s+from\s+['"].+['"]/gm, U:/^ *import\s+['"].+['"]/gm}, {getReplacement(k, g) {
    return `/*%%_RESTREAM_${k.toUpperCase()}_REPLACEMENT_${g}_%%*/`;
  }, getRegex(k) {
    return new RegExp(`/\\*%%_RESTREAM_${k.toUpperCase()}_REPLACEMENT_(\\d+)_%%\\*/`, "g");
  }});
  a = W(a, [Y(e), Y(d), Y(c), Y(f), Y(h), Y(l)]);
  b = Lc(a, b);
  return W(b, [X(e), X(d), X(c), X(f), X(h), X(l)]);
};
class Nc extends wc {
  constructor(a, b) {
    super([]);
    const c = this.replacement.bind(this);
    this.a = [{re:/^( *import(?:\s+[^\s,]+\s*,?)?(?:\s*{(?:[^}]+)})?\s+from\s+)['"](.+)['"]/gm, replacement:c}, {re:/^( *import\s+['"](.+)['"])/gm, replacement:c}, {re:/^( *export\s+{[^}]+?}\s+from\s+)['"](.+?)['"]/gm, replacement:c}];
    this.P = [];
    this.A = [];
    this.J = [];
    this.path = a;
    this.s = b;
    this.preactExtern = !1;
  }
  get nodeModules() {
    return this.P;
  }
  get deps() {
    return this.J;
  }
  async replacement(a, b, c) {
    var d = L(this.path);
    if (c.endsWith(".css")) {
      return this.A.push(c), a;
    }
    if (/^[./]/.test(c)) {
      var {path:e} = await R(c, this.path);
      c = N(d, e);
      if (e.startsWith("..")) {
        a: {
          let h = e;
          for (; "." != h;) {
            h = L(h);
            try {
              const l = O(h, "package.json"), k = require(l), g = e.replace(h, ""), m = M(k.name, "package.json"), p = require.resolve(m, {paths:[process.cwd()]});
              if (l == p) {
                var f = M(k.name, g);
                break a;
              }
            } catch (l) {
            }
          }
          f = void 0;
        }
        f && (c = M("node_modules", f), c = N(d, c));
      }
      this.deps.push(c);
      d = c.startsWith(".") ? "" : "./";
      return a == b ? b.replace(/(['"]).+\1/, `$1${d}${c.replace(/(\/index)?\.js$/, "")}$1`) : `${b}'${d}${c.replace(/(\/index)?\.js$/, "")}'`;
    }
    ({name:c} = xb(c));
    return "preact" == c && this.preactExtern ? ({entry:a} = await T(d, "@externs/preact"), this.nodeModules.push(a), `${b}'@externs/preact'`) : a;
  }
}
;const Pc = async(a, b, c) => {
  const {D:d, C:e} = c, {tempDir:f, preact:h, preactExtern:l} = b;
  var k = await H(a), g = a.endsWith(".jsx");
  const m = N("", L(a)), p = M(f, m), n = new Nc(a, p);
  n.preactExtern = l;
  n.end((h || l) && g ? `import { h } from '${l ? "@externs/preact" : "preact"}'
${k}` : k);
  k = await E(n);
  g = g ? await Oc(k, a) : k;
  if (a.startsWith("..")) {
    for (k = a; "." != k && !q;) {
      k = L(k);
      try {
        const r = require(O(k, "package.json")), u = a.replace(k, "");
        var q = M("node_modules", r.name, u);
      } catch (r) {
      }
    }
    q ? a = q : console.warn("Entry path %s is above CWD and linked package is not found. The temp file will be generated in %s", a, M(f, a));
  }
  a = M(f, a);
  await db(a);
  await J(a, g);
  a = n.deps.map(r => M(m, r)).filter(r => !(r in e));
  q = n.nodeModules.filter(r => !(r in d));
  q.forEach(r => {
    d[r] = 1;
  });
  a.forEach(r => {
    e[r] = 1;
  });
  (await U(q)).forEach(({entry:r, packageJson:u}) => {
    u && (d[u] = 1);
    d[r] = 1;
  });
  await n.A.reduce(async(r, u) => {
    await r;
    r = M(m, u);
    r = `import injectStyle from 'depack/inject-css'

injectStyle(\`${await H(r)}\`)`;
    u = M(p, `${u}.js`);
    await J(u, r);
  }, {});
  await a.reduce(async(r, u) => {
    await r;
    await Pc(u, b, c);
  }, {});
}, Oc = async(a, b) => await Mc(a, {quoteProps:"dom", warn(c) {
  console.warn(Q(c, "yellow"));
  console.log(b);
}});
const Qc = async(a, b = {}) => {
  const {tempDir:c = "depack-temp", preact:d, preactExtern:e} = b;
  b = {C:{[N("", a)]:1}, D:{}};
  await Pc(a, {tempDir:c, preact:d, preactExtern:e}, b);
  return [...Object.keys(b.C).map(f => M(c, f)), ...Object.keys(b.D)];
};
const Sc = async a => {
  if (Array.isArray(a)) {
    if (a.some(Rc)) {
      return {f:!0};
    }
  } else {
    if (a.endsWith(".jsx")) {
      return {f:!0};
    }
  }
  a = await U(a, {shallow:!0});
  return {f:a.some(({entry:b, name:c}) => c ? !1 : b.endsWith(".jsx")), w:a};
}, Rc = a => a.endsWith(".jsx"), Tc = async(a, {tempDir:b, preact:c, preactExtern:d, Z:e}) => {
  let f = a;
  if (e) {
    return await Qc(a, {tempDir:b, preact:c, preactExtern:d}), f = M(b, a), {u:f, f:!0};
  }
  const {f:h, w:l} = await Sc(a);
  h && (await Qc(a, {tempDir:b, preact:c, preactExtern:d}), f = M(b, a));
  return {u:f, f:h, w:l};
}, Uc = async(a, b = {}, c = []) => {
  const {src:d, tempDir:e = "depack-temp", preact:f, preactExtern:h, silent:l} = a, {output:k, compilerVersion:g, debug:m, noSourceMap:p} = b;
  if (!d) {
    throw Error("Entry file is not given.");
  }
  let {u:n, f:q} = await Tc(d, {tempDir:e, preact:f, preactExtern:h});
  a = await U(n, {fields:["externs"]});
  ({files:b} = await Rb(a));
  b = Sb(b);
  var r = Db(a);
  const {commonJs:u, commonJsPackageJsons:x, js:I, packageJsons:F} = r;
  a = Ob(a);
  r = !(!u.length && !a.length);
  a = [n, ...u, ...F, ...I, ...x];
  c = [...c, ...b, ...k && !p ? ["--source_map_include_content"] : [], ...1 < a.length ? ["--module_resolution", "NODE"] : [], ...r ? ["--process_common_js_modules"] : []];
  b = q ? a.map(D => D.startsWith(e) ? N(e, D) : D) : a;
  b = Ib(c, b);
  console.error(b);
  c = [...c, "--js", ...a];
  c = await cc(c, {debug:m, compilerVersion:g, output:k, noSourceMap:p, $:() => !1});
  k || !c || l || console.log(c);
  q && (k && !p && await Mb(k, e), await lb(e));
  return c;
};
const Vc = (a = {}) => {
  const {compiler:b = require.resolve("google-closure-compiler-java/compiler.jar"), output:c, level:d, advanced:e, languageIn:f, languageOut:h, sourceMap:l = !0, argv:k = [], prettyPrint:g, noWarnings:m, debug:p, iife:n, chunkOutput:q} = a;
  a = ["-jar", b];
  d ? a.push("--compilation_level", d) : e && a.push("--compilation_level", "ADVANCED");
  f && a.push("--language_in", /^\d+$/.test(f) ? `ECMASCRIPT_${f}` : f);
  h && a.push("--language_out", /^\d+$/.test(h) ? `ECMASCRIPT_${h}` : h);
  (c || q) && l && !p && a.push("--create_source_map", "%outname%.map");
  g && a.push("--formatting", "PRETTY_PRINT");
  p && a.push("--print_source_after_each_pass");
  n && a.push("--isolation_mode", "IIFE");
  (m || p) && a.push("--warning_level", "QUIET");
  a.push(...k);
  c && a.push("--js_output_file", c);
  q && a.push("--chunk_output_path_prefix", M(q, cb));
  return a;
}, Wc = a => {
  a = /\.js$/.test(w) ? w : M(w, bb(a));
  return a = a.replace(/jsx$/, "js");
};
const Z = process.env.GOOGLE_CLOSURE_COMPILER, Xc = async() => {
  var a = "target";
  const b = Z ? "target" : require.resolve("google-closure-compiler-java/package.json");
  Z || (a = await H(b), {version:a} = JSON.parse(a), [a] = a.split("."));
  return a;
};
function Yc(a = {usage:{}}) {
  const {usage:b = {}, description:c, line:d, example:e} = a;
  a = Object.keys(b);
  const f = Object.values(b), [h] = a.reduce(([g = 0, m = 0], p) => {
    const n = b[p].split("\n").reduce((q, r) => r.length > q ? r.length : q, 0);
    n > m && (m = n);
    p.length > g && (g = p.length);
    return [g, m];
  }, []), l = (g, m) => {
    m = " ".repeat(m - g.length);
    return `${g}${m}`;
  };
  a = a.reduce((g, m, p) => {
    p = f[p].split("\n");
    m = l(m, h);
    const [n, ...q] = p;
    m = `${m}\t${n}`;
    const r = l("", h);
    p = q.map(u => `${r}\t${u}`);
    return [...g, m, ...p];
  }, []).map(g => `\t${g}`);
  const k = [c, `  ${d || ""}`].filter(g => g ? g.trim() : g).join("\n\n");
  a = `${k ? `${k}\n` : ""}
${a.join("\n")}
`;
  return e ? `${a}
  Example:

    ${e}
` : a;
}
;var Zc = () => {
  var a = ca(da), b = ca(ra), c = ca(xa);
  a = Yc({line:"depack SOURCE [-cl] [-o output.js] [-IO 2018] [-wVvh] [-lvl LEVEL -a] [... --generic-args]", usage:a});
  c = Yc({line:"depack SOURCE -cl [-o output.js] [-s]", example:"depack src/bin.js -c -a -o depack/bin.js -p", usage:c});
  b = Yc({line:"depack SOURCE [-o output.js] [-H]", example:"depack source.js -o bundle.js -i -a -H", usage:b});
  return `Google Closure Compiler-based packager for the web and Node.JS.
https://artdecocode.com/depack/
Generic flags: https://github.com/google/closure-compiler/wiki/Flags-and-Options

${a}
${Q("BACKEND", "blue")}: Creates a single executable Node.JS file or a library.
${c}
${Q("FRONTEND", "cyan")}: Creates a bundle for the web.
${b}`;
};
qa && (console.log(Zc()), process.exit(0));
const $c = () => {
  console.error(Q("monkey-patching preact", "yellow"));
  Ia("node_modules/preact", "node_modules/_preact");
  Ka(O(__dirname, "../preact"), "node_modules/preact");
}, ad = () => {
  console.error(Q("cleaning up preact patch", "yellow"));
  try {
    Ma("node_modules/preact"), Ia("node_modules/_preact", "node_modules/preact");
  } catch (a) {
  }
};
(async() => {
  if (wa) {
    $c();
    process.on("SIGINT", () => {
    });
    process.on("SIGTERM", () => {
    });
    process.on("beforeExit", ad);
    const e = Ca({input:process.stdin, output:process.stdout});
    e.question("Press enter to continue", () => {
      e.close();
    });
  } else {
    try {
      const e = await Xc();
      if (pa) {
        var a = require("../package.json").version;
        console.log("Depack version: %s", a);
        const f = await cc([...Vc({compiler:Z}), "--version"], {compilerVersion:e});
        console.log(f);
      } else {
        var {path:b} = await R(ea), c = w ? Wc(b) : void 0;
        a = la;
        !la && za && (a = 2018);
        var d = Vc({compiler:Z, output:c, level:ma, languageIn:ja, languageOut:a, argv:Ba, advanced:na, sourceMap:!!w && !ha, prettyPrint:fa, noWarnings:oa, debug:y, iife:sa});
        c = {compilerVersion:e, output:c, noSourceMap:ha || !!y, debug:y};
        if (za) {
          return await ic({src:b, noStrict:Aa, verbose:ia, debug:y}, c, d);
        }
        va && ($c(), process.on("SIGINT", () => {
        }), process.on("SIGTERM", () => {
        }), process.on("beforeExit", ad));
        await Uc({src:b, tempDir:ta, preact:ua}, c, d);
      }
    } catch (e) {
      process.env.DEBUG ? console.log(e.stack) : console.log(e.message);
    }
  }
})();


//# sourceMappingURL=depack.js.map