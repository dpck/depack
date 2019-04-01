#!/usr/bin/env node
const fs = require('fs');
const stream = require('stream');
const os = require('os');
const path = require('path');
const _module = require('module');
const child_process = require('child_process');
const vm = require('vm');
             
const {Script:aa} = vm;
const {chmod:ba, createReadStream:ca, createWriteStream:ea, lstat:r, mkdir:fa, readdir:ha, rmdir:ia, unlink:ja} = fs;
const ka = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : Number.Infinity);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, la = a => {
  ({callee:{caller:a}} = a);
  return a;
};
const {homedir:ma} = os;
const na = /\s+at.*(?:\(|\s)(.*)\)?/, oa = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, pa = ma(), t = a => {
  const {La:b = !1, Ha:c = ["pirates"]} = {}, d = c.join("|"), e = new RegExp(oa.source.replace("IGNORED_MODULES", d));
  return a.replace(/\\/g, "/").split("\n").filter(f => {
    f = f.match(na);
    if (null === f || !f[1]) {
      return !0;
    }
    f = f[1];
    return f.includes(".app/Contents/Resources/electron.asar") || f.includes(".app/Contents/Resources/default_app.asar") ? !1 : !e.test(f);
  }).filter(f => "" !== f.trim()).map(f => b ? f.replace(na, (g, k) => g.replace(k, k.replace(pa, "~"))) : f).join("\n");
};
function qa(a, b, c = !1) {
  return function(d) {
    var e = la(arguments), {stack:f} = Error();
    const g = ka(f, 2, !0), k = (f = d instanceof Error) ? d.message : d;
    e = [`Error: ${k}`, ...null !== e && a === e || c ? [b] : [g, b]].join("\n");
    e = t(e);
    return Object.assign(f ? d : Error(), {message:k, stack:e});
  };
}
;function u(a) {
  var {stack:b} = Error();
  const c = la(arguments);
  b = ka(b, 2 + (a ? 1 : 0));
  return qa(c, b, a);
}
;function ra(a, b) {
  if (b > a - 2) {
    throw Error("Function does not accept that many arguments.");
  }
}
async function v(a, b, c) {
  const d = u(!0);
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
      ra(e, m);
    }), h = [...b, k]) : 1 < Array.from(arguments).length && (ra(e, 0), h = [b, k]);
    a.apply(a.Pa, h);
  });
}
;const {basename:sa, dirname:w, join:x, relative:y, resolve:ta} = path;
async function ua(a, b) {
  b = b.map(async c => {
    const d = ta(a, c);
    return {lstat:await v(r, d), path:d, da:c};
  });
  return await Promise.all(b);
}
const va = a => a.lstat.isDirectory(), wa = a => !a.lstat.isDirectory();
async function xa(a) {
  if (!a) {
    throw Error("Please specify a path to the directory");
  }
  if (!(await v(r, a)).isDirectory()) {
    throw a = Error("Path is not a directory"), a.code = "ENOTDIR", a;
  }
  var b = await v(ha, a);
  b = await ua(a, b);
  a = b.filter(va);
  b = b.filter(wa).reduce((c, d) => {
    var e = d.lstat.isDirectory() ? "Directory" : d.lstat.isFile() ? "File" : d.lstat.isSymbolicLink() ? "SymbolicLink" : void 0;
    return Object.assign({}, c, {[d.da]:{type:e}});
  }, {});
  a = await a.reduce(async(c, d) => {
    var {path:e, da:f} = d;
    c = await c;
    d = await xa(e);
    return Object.assign({}, c, {[f]:d});
  }, {});
  return {content:Object.assign({}, b, a), type:"Directory"};
}
;const z = async a => {
  try {
    return await v(r, a);
  } catch (b) {
    return null;
  }
};
const {Transform:ya, Writable:za} = stream;
const Aa = (a, b) => {
  b.once("error", c => {
    a.emit("error", c);
  });
  return b;
};
class Ba extends za {
  constructor(a) {
    a = void 0 === a ? {} : a;
    var b = Object.assign({}, a), c = void 0 === a.o ? u(!0) : a.o, d = a.S;
    a = (delete b.o, delete b.S, b);
    const e = (k, h) => c(h);
    super(a);
    const {ia:f, T:g} = a;
    this.i = [];
    this.M = new Promise((k, h) => {
      this.on("finish", () => {
        let l;
        l = f ? Buffer.concat(this.i) : this.i.join("");
        k(l);
        this.i = [];
      });
      this.once("error", l => {
        if (-1 == l.stack.indexOf("\n")) {
          e`${l}`;
        } else {
          const m = t(l.stack);
          l.stack = m;
          d && e`${l}`;
        }
        h(l);
      });
      g && Aa(this, g).pipe(this);
    });
  }
  _write(a, b, c) {
    this.i.push(a);
    c();
  }
  get A() {
    return this.M;
  }
}
const Ca = async a => {
  var b = void 0 === b ? {} : b;
  ({A:a} = new Ba(Object.assign({}, {T:a}, b, {o:u(!0)})));
  return await a;
};
const Da = async a => {
  await v(ja, a);
}, Ea = async a => {
  const {content:b} = await xa(a);
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
  c = c.map(e => x(a, e));
  await Promise.all(c.map(Da));
  d = d.map(e => x(a, e));
  await Promise.all(d.map(Ea));
  await v(ia, a);
}, Fa = async a => {
  (await v(r, a)).isDirectory() ? await Ea(a) : await Da(a);
};
const Ga = {black:30, red:31, green:32, yellow:33, blue:34, magenta:35, cyan:36, white:37, grey:90};
function B(a, b) {
  return (b = Ga[b]) ? `\x1b[${b}m${a}\x1b[0m` : a;
}
;async function Ha(a) {
  const b = w(a);
  try {
    return await C(b), a;
  } catch (c) {
    if (/EEXIST/.test(c.message) && -1 != c.message.indexOf(b)) {
      return a;
    }
    throw c;
  }
}
async function C(a) {
  try {
    await v(fa, a);
  } catch (b) {
    if ("ENOENT" == b.code) {
      const c = w(a);
      await C(c);
      await C(a);
    } else {
      if ("EEXIST" != b.code) {
        throw b;
      }
    }
  }
}
;const E = async(a, b) => {
  b && (b = w(b), a = x(b, a));
  var c = await z(a);
  b = a;
  let d = !1;
  if (!c) {
    if (b = await D(a), !b) {
      throw Error(`${a}.js or ${a}.jsx is not found.`);
    }
  } else {
    if (c.isDirectory()) {
      c = !1;
      let e;
      a.endsWith("/") || (e = b = await D(a), c = !0);
      if (!e) {
        b = await D(x(a, "index"));
        if (!b) {
          throw Error(`${c ? `${a}.jsx? does not exist, and ` : ""}index.jsx? file is not found in ${a}`);
        }
        d = !0;
      }
    }
  }
  return {path:a.startsWith(".") ? y("", b) : b, ua:d};
}, D = async a => {
  a = `${a}.js`;
  let b = await z(a);
  b || (a = `${a}x`);
  if (b = await z(a)) {
    return a;
  }
};
const {builtinModules:Ia} = _module;
async function G(a) {
  a = ca(a);
  return await Ca(a);
}
;var H = {};
const Ja = /^ *import(?:\s+(?:[^\s,]+)\s*,?)?(?:\s*{(?:[^}]+)})?\s+from\s+(['"])(.+?)\1/gm, Ka = /^ *import\s+(?:.+?\s*,\s*)?\*\s+as\s+.+?\s+from\s+(['"])(.+?)\1/gm, La = /^ *import\s+(['"])(.+?)\1/gm, Ma = /^ *export\s+{[^}]+?}\s+from\s+(['"])(.+?)\1/gm, Na = a => [Ja, Ka, La, Ma].reduce((b, c) => {
  c = H(c, a, ["q", "from"]).map(d => d.from);
  return [...b, ...c];
}, []);
const I = async(a, b) => {
  var c = x(a, "node_modules", b);
  c = x(c, "package.json");
  const d = await z(c);
  if (d) {
    a = await Oa(c);
    if (void 0 === a) {
      throw Error(`The package ${y("", c)} does export the module.`);
    }
    if (null === a) {
      throw Error(`The exported module in package ${b} does not exist.`);
    }
    const {a:e, version:f, H:g, main:k} = a;
    return Object.assign({}, {a:y("", e), f:y("", c), version:f, H:g}, k ? {j:!0} : {});
  }
  if ("/" == a && !d) {
    throw Error(`Package.json for module ${b} not found.`);
  }
  return I(x(ta(a), ".."), b);
}, Oa = async a => {
  var b = await G(a);
  let c, d, e, f;
  try {
    ({module:c, version:d, name:e, main:f} = JSON.parse(b));
  } catch (g) {
    throw Error(`Could not parse ${a}.`);
  }
  if (b = c || f) {
    return a = x(w(a), b), b = await z(a), !b || b.isDirectory() && (a = x(a, "index.js"), !await z(a)) ? null : {a, version:d, H:e, main:!c && f};
  }
};
const Pa = a => /^[./]/.test(a), Qa = async(a, b, c) => {
  const d = u(), e = w(a);
  b = b.map(async f => {
    if (Ia.includes(f)) {
      return {internal:f};
    }
    if (/^[./]/.test(f)) {
      try {
        var {path:g} = await E(f, a);
        return {a:g};
      } catch (k) {
      }
    } else {
      {
        let [l, m, ...n] = f.split("/");
        !l.startsWith("@") && m ? (n = [m, ...n], m = l) : m = l.startsWith("@") ? `${l}/${m}` : l;
        g = {name:m, paths:n.join("/")};
      }
      const {name:k, paths:h} = g;
      if (h) {
        return {f} = await I(e, k), f = w(f), {path:f} = await E(x(f, h)), {a:f};
      }
    }
    try {
      const {a:k, f:h, version:l, H:m, j:n} = await I(e, f);
      return Object.assign({}, {a:k, f:h, version:l, name:m}, n ? {j:n} : {});
    } catch (k) {
      if (c) {
        return null;
      }
      throw d(k);
    }
  });
  return (await Promise.all(b)).filter(Boolean);
}, Sa = async(a, b, c) => {
  b = void 0 === b ? {} : b;
  var {u:d = !0, U:e = !1, V:f = !1} = void 0 === c ? {} : c;
  if (a in b) {
    return [];
  }
  b[a] = 1;
  var g = await G(a);
  c = Na(g);
  g = Ra(g);
  c = [...c, ...g];
  c = d ? c : c.filter(Pa);
  let k;
  try {
    k = await Qa(a, c, f);
  } catch (h) {
    throw h.message = `${a}\n [!] ${h.message}`, h;
  }
  c = k.map(h => Object.assign({}, h, {from:a}));
  return await k.filter(h => {
    ({a:h} = h);
    return h && !(h in b);
  }).reduce(async(h, l) => {
    var {a:m, j:n, f:p} = l;
    if (p && e) {
      return h;
    }
    h = await h;
    l = (await Sa(m, b, {u:d, U:e, V:f})).map(q => Object.assign({}, q, {from:q.from ? q.from : m}, !q.f && n ? {j:n} : {}));
    return [...h, ...l];
  }, c);
}, Ra = a => H(/(?:^|\s+)require\((['"])(.+?)\1\)/gm, a, ["q", "from"]).map(b => b.from);
const Ta = async a => {
  var b = void 0 === b ? {} : b;
  const c = u();
  ({path:a} = await E(a));
  const {u:d = !0, U:e = !1, V:f = !1} = b;
  let g;
  try {
    g = await Sa(a, {}, {u:d, U:e, V:f});
  } catch (k) {
    throw c(k);
  }
  return g.filter((k, h) => {
    var {internal:l, a:m} = k;
    return l ? g.findIndex(n => {
      ({internal:n} = n);
      return n == l;
    }) == h : g.findIndex(n => {
      ({a:n} = n);
      return m == n;
    }) == h;
  }).map(k => {
    const {a:h, internal:l} = k, m = g.filter(n => {
      var {internal:p, a:q} = n;
      if (l) {
        return l == p;
      }
      if (h) {
        return h == q;
      }
    }).map(n => {
      ({from:n} = n);
      return n;
    }).filter((n, p, q) => q.indexOf(n) == p);
    return Object.assign({}, k, {from:m});
  });
}, Ua = a => {
  const b = [], c = [], d = [], e = [], f = [], g = [];
  a.forEach(k => {
    var {f:h, j:l, name:m, a:n, internal:p} = k;
    if (p) {
      return f.push(p);
    }
    h && l ? c.push(h) : h && b.push(h);
    n && l ? d.push(n) : n && e.push(n);
    m && g.push(m);
  });
  return {ka:c, za:b, $:d, ca:e, G:f, D:g};
};
async function J(a, b) {
  if (!a) {
    throw Error("No path is given.");
  }
  const c = u(!0), d = ea(a);
  await new Promise((e, f) => {
    d.on("error", g => {
      g = c(g);
      f(g);
    }).on("close", e).end(b);
  });
}
;const Va = (a, b = c => c) => {
  const c = [];
  a = a.join(" ").replace(/--js (\S+)\s*/g, (e, f) => {
    e = `  --js ${B(b(f), "green")}`;
    c.push(e);
    return "";
  }).replace(/--externs (\S+)/g, (e, f) => `\n  --externs ${B(f, "grey")}`).replace(/--js_output_file (\S+)/g, (e, f) => `\n  --js_output_file ${B(f, "red")}`);
  const d = c.join("\n");
  return `${a}\n${d}`;
}, Wa = async a => {
  var b = sa(a);
  b = [await G(a), "//" + `# sourceMappingURL=${b}.map`].join("\n");
  await J(a, b);
}, Xa = async a => {
  const b = (await G(a)).replace(/^'use strict';/m, " ".repeat(13));
  await J(a, b);
}, Ya = async(a, b) => {
  a = `${a}.map`;
  var c = await G(a);
  c = JSON.parse(c);
  var {sources:d} = c;
  d = d.map(e => e.startsWith(" ") ? e : `/${y(b, e)}`);
  c.sources = d;
  c = JSON.stringify(c, null, 2);
  await J(a, c);
}, Za = a => {
  if (a.length) {
    return `#!/usr/bin/env node\n${a.map(b => `const ${"module" == b ? "_module" : b} = r` + `equire('${b}');`).join("\n") + "\n%output%"}`;
  }
};
const $a = (a, b) => {
  b = b.split("\n\n").map(c => /^.+?:\d+:(?:\s*Originally at:\s*.+?)? WARNING -/.test(c) ? B(c, "grey") : B(c, "red")).join("\n\n");
  return `Exit code ${a}\n${b}`;
}, [K] = process.version.split(".", 1), bb = async({G:a, Ja:b = "node_modules", force:c = !0}) => {
  const d = y("", x(w(require.resolve("@depack/depack/package.json")), "builtin-modules", K));
  return (await Promise.all(a.map(async e => {
    const f = x(b, e), g = x(f, "package.json");
    var k = x(f, "index.js");
    const h = {f:g, index:k};
    if (await z(g) && !c) {
      if ((k = await ab(g)) && k == K) {
        return h;
      }
      throw Error(`Could not prepare core module ${e}: ${f} exists.`);
    }
    await Ha(g);
    await J(g, JSON.stringify({name:e, module:"index.js", depack:K}));
    e = await G(x(d, `${e}.js`));
    await J(k, e);
    return h;
  }))).reduce((e, {f, index:g}) => [...e, f, g], []);
}, ab = async a => {
  try {
    const b = await G(a), {depack:c} = JSON.parse(b);
    return c;
  } catch (b) {
  }
}, cb = async(a, b) => {
  a = [...a, ...b];
  await Promise.all(a.map(async c => {
    var d = await G(c);
    d = JSON.parse(d);
    const {main:e, module:f} = d, g = f ? "module" : "main";
    var k = f || e, h = x(w(c), k);
    h = await z(h);
    if (!h) {
      throw Error(`The ${g} for dependency ${c} does not exist.`);
    }
    h.isDirectory() && (k = x(k, "index.js"), d[g] = k, console.warn("Updating %s to point to a file.", c), await J(c, JSON.stringify(d, null, 2)));
  }));
};
const db = a => /^\d+$/.test(a) ? `ECMASCRIPT_${a}` : a;
var eb = ({aa:a = require.resolve("google-closure-compiler-java/compiler.jar"), src:b, output:c, level:d, va:e, wa:f, Da:g = !0, argv:k = [], advanced:h, Ba:l, ya:m, debug:n, ta:p}) => {
  a = ["-jar", a];
  d ? a.push("--compilation_level", d) : h && a.push("--compilation_level", "ADVANCED");
  e && a.push("--language_in", db(e));
  f && a.push("--language_out", db(f));
  g && !n && a.push("--create_source_map", "%outname%.map");
  l && a.push("--formatting", "PRETTY_PRINT");
  n && a.push("--print_source_after_each_pass");
  p && a.push("--isolation_mode", "IIFE");
  (m || n) && a.push("--warning_level", "QUIET");
  a.push(...k);
  c && (b = /\.js$/.test(c) ? c : x(c, sa(b)), a.push("--js_output_file", b));
  return a;
};
var fb = {};
const {spawn:gb} = child_process;
const hb = (a, b) => {
  b.once("error", c => {
    a.emit("error", c);
  });
  return b;
};
class ib extends za {
  constructor(a) {
    a = void 0 === a ? {} : a;
    var b = Object.assign({}, a), c = void 0 === a.o ? u(!0) : a.o, d = a.S;
    a = (delete b.o, delete b.S, b);
    const e = (k, h) => c(h);
    super(a);
    const {ia:f, T:g} = a;
    this.i = [];
    this.M = new Promise((k, h) => {
      this.on("finish", () => {
        let l;
        l = f ? Buffer.concat(this.i) : this.i.join("");
        k(l);
        this.i = [];
      });
      this.once("error", l => {
        if (-1 == l.stack.indexOf("\n")) {
          e`${l}`;
        } else {
          const m = t(l.stack);
          l.stack = m;
          d && e`${l}`;
        }
        h(l);
      });
      g && hb(this, g).pipe(this);
    });
  }
  _write(a, b, c) {
    this.i.push(a);
    c();
  }
  get A() {
    return this.M;
  }
}
const M = async a => {
  var b = void 0 === b ? {} : b;
  ({A:a} = new ib(Object.assign({}, {T:a}, b, {o:u(!0)})));
  return await a;
};
const jb = async a => {
  const [b, c, d] = await Promise.all([new Promise((e, f) => {
    a.on("error", f).on("exit", g => {
      e(g);
    });
  }), a.stdout ? M(a.stdout) : void 0, a.stderr ? M(a.stderr) : void 0]);
  return {code:b, stdout:c, stderr:d};
};
function kb(a = []) {
  a = gb("java", a, {});
  const b = jb(a);
  a.A = b;
  a.Na = a.Oa.join(" ");
  return a;
}
;var N = async(a, {debug:b, m:c, output:d, s:e, qa:f = () => {
}}) => {
  let {A:g, stderr:k} = kb(a);
  b && k.pipe(ea(b));
  const {stdout:h, stderr:l, code:m} = await fb(`Running Google Closure Compiler ${B(c, "grey")}`, g, {writable:process.stderr});
  if (!f()) {
    if (m) {
      throw Error($a(m, l));
    }
    h && console.log();
    console.log(h);
    d && !e && await Wa(d);
    l && !b ? console.warn(B(l, "grey")) : b && console.log("Sources after each pass log saved to %s", b);
  }
};
const lb = (a, b) => {
  const [c, , d] = a.split("\n");
  a = parseInt(c.replace(/.+?(\d+)$/, (f, g) => g)) - 1;
  const e = d.indexOf("^");
  ({length:b} = b.split("\n").slice(0, a).join("\n"));
  return b + e + (a ? 1 : 0);
};
const mb = a => {
  try {
    new aa(a);
  } catch (b) {
    const {message:c, stack:d} = b;
    if ("Unexpected token <" != c) {
      throw b;
    }
    return lb(d, a);
  }
  return null;
};
function nb(a) {
  if ("object" != typeof a) {
    return !1;
  }
  const {g:b, h:c} = a;
  a = b instanceof RegExp;
  const d = -1 != ["string", "function"].indexOf(typeof c);
  return a && d;
}
const O = (a, b) => {
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
const P = (a, b) => b.filter(nb).reduce((c, {g:d, h:e}) => {
  if (this.L) {
    return c;
  }
  if ("string" == typeof e) {
    c = c.replace(d, e);
  } else {
    const f = e.bind(this);
    let g;
    return c.replace(d, (k, ...h) => {
      g = Error();
      try {
        return this.L ? k : f(k, ...h);
      } catch (l) {
        O(g, l);
      }
    });
  }
}, `${a}`);
const ob = a => new RegExp(`%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_(\\d+)_%%`, "g"), pb = (a, b) => `%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_${b}_%%`, qb = (a, b) => Object.keys(a).reduce((c, d) => {
  {
    var e = a[d];
    var {O:f = pb, pa:g = ob} = void 0 === b ? {} : b;
    const k = g(d);
    e = {name:d, g:e, v:k, O:f, map:{}, lastIndex:0};
  }
  return Object.assign({}, c, {[d]:e});
}, {}), Q = a => {
  var b = void 0 === b ? [] : b;
  const {v:c, map:d} = a;
  return {g:c, h(e, f) {
    e = d[f];
    delete d[f];
    return P(e, Array.isArray(b) ? b : [b]);
  }};
}, R = a => {
  const {g:b, map:c, O:d, name:e} = a;
  return {g:b, h(f) {
    const {lastIndex:g} = a;
    c[g] = f;
    a.lastIndex += 1;
    return d(e, g);
  }};
};
class rb extends ya {
  constructor(a) {
    super();
    this.rules = (Array.isArray(a) ? a : [a]).filter(nb);
  }
  async reduce(a) {
    return await this.rules.reduce(async(b, {g:c, h:d}) => {
      b = await b;
      if (this.L) {
        return b;
      }
      if ("string" == typeof d) {
        b = b.replace(c, d);
      } else {
        const e = d.bind(this), f = [];
        let g;
        d = b.replace(c, (k, ...h) => {
          g = Error();
          try {
            if (this.L) {
              return k;
            }
            const l = e(k, ...h);
            l instanceof Promise && f.push(l);
            return l;
          } catch (l) {
            O(g, l);
          }
        });
        if (f.length) {
          try {
            const k = await Promise.all(f);
            b = b.replace(c, () => k.shift());
          } catch (k) {
            O(g, k);
          }
        } else {
          b = d;
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
      a = t(d.stack), d.stack = a, c(d);
    }
  }
}
;const sb = a => {
  [, a] = /<\s*(.+?)(?:\s+[\s\S]+)?\s*\/?\s*>/.exec(a) || [];
  return a;
}, T = a => {
  let b = 0;
  const c = [];
  let d;
  P(a, [{g:/[{}]/g, h(h, l) {
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
    const [, n, p, q, A] = /(\s*)(\S+)(\s*)=(\s*)$/.exec(h) || [];
    l = a.slice(l + 1, m);
    if (!p && !/\s*\.\.\./.test(l)) {
      throw Error("Could not detect prop name");
    }
    p ? e[p] = l : f.push(l);
    g[p] = {before:n, X:q, W:A};
    l = h || "";
    l = l.slice(0, l.length - (p || "").length - 1);
    const {R:F, C:L} = S(l);
    Object.assign(e, F);
    Object.assign(g, L);
    return m + 1;
  }, 0);
  if (c.length) {
    k = a.slice(k);
    const {R:h, C:l} = S(k);
    Object.assign(e, h);
    Object.assign(g, l);
  } else {
    const {R:h, C:l} = S(a);
    Object.assign(e, h);
    Object.assign(g, l);
  }
  return {P:e, N:f, C:g};
}, S = a => {
  const b = [], c = {};
  a.replace(/(\s*)(\S+)(\s*)=(\s*)(["'])([\s\S]+?)\5/g, (d, e, f, g, k, h, l, m) => {
    c[f] = {before:e, X:g, W:k};
    b.push({F:m, name:f, ea:`${h}${l}${h}`});
    return "%".repeat(d.length);
  }).replace(/(\s*)([^\s%]+)/g, (d, e, f, g) => {
    c[f] = {before:e};
    b.push({F:g, name:f, ea:"true"});
  });
  return {R:[...b.reduce((d, {F:e, name:f, ea:g}) => {
    d[e] = [f, g];
    return d;
  }, [])].filter(Boolean).reduce((d, [e, f]) => {
    d[e] = f;
    return d;
  }, {}), C:c};
}, tb = (a, b = [], c = !1, d = {}, e = "") => {
  const {length:f} = Object.keys(a);
  return f || b.length ? `{${Object.keys(a).reduce((g, k) => {
    const h = a[k], l = c || -1 != k.indexOf("-") ? `'${k}'` : k, {before:m = "", X:n = "", W:p = ""} = d[k] || {};
    return [...g, `${m}${l}${n}:${p}${h}`];
  }, b).join(",")}${e}}` : "{}";
}, ub = (a = "") => {
  [a] = a;
  if (!a) {
    throw Error("No tag name is given");
  }
  return a.toUpperCase() == a;
}, U = (a, b = {}, c = [], d = [], e = !1, f, g, k) => {
  const h = ub(a), l = h ? a : `'${a}'`;
  if (!Object.keys(b).length && !c.length && !d.length) {
    return `h(${l})`;
  }
  const m = h && "dom" == e ? !1 : e;
  h || !d.length || e && "dom" != e || f && f(`JSX: destructuring ${d.join(" ")} is used without quoted props on HTML ${a}.`);
  a = tb(b, d, m, g, k);
  b = c.reduce((n, p, q) => {
    q = (q = c[q - 1]) && /\S/.test(q) ? "," : "";
    return `${n}${q}${p}`;
  }, "");
  return `h(${l},${a}${b ? `,${b}` : ""})`;
};
const vb = (a, b = []) => {
  let c = 0, d;
  a = P(a, [...b, {g:/[<>]/g, h(e, f) {
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
  return {Aa:a, ba:d};
}, wb = a => {
  const b = sb(a);
  let c;
  const {ha:d} = qb({ha:/=>/g});
  try {
    ({Aa:h, ba:c} = vb(a, [R(d)]));
  } catch (l) {
    if (1 === l) {
      throw Error(`Could not find the matching closing > for ${b}.`);
    }
  }
  const e = h.slice(0, c + 1);
  var f = e.replace(/<\s*[^\s/>]+/, "");
  if (/\/\s*>$/.test(f)) {
    return a = f.replace(/\/\s*>$/, ""), f = "", new V({J:e.replace(d.v, "=>"), I:a.replace(d.v, "=>"), content:"", tagName:b});
  }
  a = f.replace(/>$/, "");
  f = c + 1;
  c = !1;
  let g = 1, k;
  P(h, [{g:new RegExp(`[\\s\\S](?:<\\s*${b}(\\s+|>)|/\\s*${b}\\s*>)`, "g"), h(l, m, n, p) {
    if (c) {
      return l;
    }
    m = !m && l.endsWith(">");
    const q = !m;
    if (q) {
      p = p.slice(n);
      const {ba:A} = vb(p);
      p = p.slice(0, A + 1);
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
  var h = h.slice(0, k).replace(d.v, "=>");
  return new V({J:h, I:a.replace(d.v, "=>"), content:f.replace(d.v, "=>"), tagName:b});
};
class V {
  constructor(a) {
    Object.assign(this, a);
  }
}
;const xb = a => {
  let b = "", c = "";
  a = a.replace(/^(\n\s*)([\s\S]+)?/, (d, e, f = "") => {
    b = e;
    return f;
  }).replace(/([\s\S]+?)?(\n\s*)$/, (d, e = "", f) => {
    c = f;
    return e;
  });
  return `${b}${a ? `\`${a}\`` : ""}${c}`;
}, zb = a => {
  const b = [];
  let c = {}, d = 0, e = 0;
  P(a, [{g:/[<{}]/g, h(f, g) {
    if (!(g < e)) {
      if (/[{}]/.test(f)) {
        d += "{" == f ? 1 : -1, 1 == d && void 0 == c.from ? c.from = g : 0 == d && (c.K = g + 1, c.na = a.slice(c.from + 1, g), b.push(c), c = {});
      } else {
        if (d) {
          return f;
        }
        f = wb(a.slice(g));
        e = g + f.J.length;
        c.oa = f;
        c.K = e;
        c.from = g;
        b.push(c);
        c = {};
      }
    }
  }}, {}]);
  return b.length ? yb(a, b) : [xb(a)];
}, yb = (a, b) => {
  let c = 0;
  b = b.reduce((d, {from:e, K:f, na:g, oa:k}) => {
    (e = a.slice(c, e)) && d.push(xb(e));
    c = f;
    g ? d.push(g) : k && d.push(k);
    return d;
  }, []);
  if (c < a.length) {
    const d = a.slice(c, a.length);
    d && b.push(xb(d));
  }
  return b;
};
const Bb = (a, b = {}) => {
  const {Ca:c, warn:d} = b;
  var e = mb(a);
  if (null === e) {
    return a;
  }
  var f = a.slice(e);
  const {I:g = "", content:k, tagName:h, J:{length:l}} = wb(f);
  f = Ab(k, c, d);
  const {P:m, N:n, C:p} = T(g.replace(/^ */, ""));
  var q = /\s*$/.exec(g) || [""];
  q = U(h, m, f, n, c, d, p, q);
  f = a.slice(0, e);
  a = a.slice(e + l);
  e = l - q.length;
  0 < e && (q = `${" ".repeat(e)}${q}`);
  a = `${f}${q}${a}`;
  return Bb(a, b);
}, Ab = (a, b = !1, c) => a ? zb(a).reduce((d, e) => {
  if (e instanceof V) {
    const {I:k = "", content:h, tagName:l} = e, {P:m, N:n} = T(k);
    e = Ab(h, b, c);
    e = U(l, m, e, n, b, c);
    return [...d, e];
  }
  const f = mb(e);
  if (f) {
    var g = e.slice(f);
    const {J:{length:k}, I:h = "", content:l, tagName:m} = wb(g), {P:n, N:p} = T(h);
    g = Ab(l, b, c);
    g = U(m, n, g, p, b, c);
    const q = e.slice(0, f);
    e = e.slice(f + k);
    return [...d, `${q}${g}${e}`];
  }
  return [...d, e];
}, []) : [];
const Cb = (a, b = {}) => {
  const {e:c, la:d, F:e, ra:f, sa:g} = qb({e:/^ *export\s+(?:default\s+)?/mg, la:/^ *export\s+{[^}]+}\s+from\s+(['"])(?:.+?)\1/mg, F:/^ *import(\s+([^\s,]+)\s*,?)?(\s*{(?:[^}]+)})?\s+from\s+['"].+['"]/gm, ra:/^ *import\s+(?:(.+?)\s*,\s*)?\*\s+as\s+.+?\s+from\s+['"].+['"]/gm, sa:/^ *import\s+['"].+['"]/gm}, {O(k, h) {
    return `/*%%_RESTREAM_${k.toUpperCase()}_REPLACEMENT_${h}_%%*/`;
  }, pa(k) {
    return new RegExp(`/\\*%%_RESTREAM_${k.toUpperCase()}_REPLACEMENT_(\\d+)_%%\\*/`, "g");
  }});
  a = P(a, [R(d), R(c), R(e), R(f), R(g)]);
  b = Bb(a, b);
  return P(b, [Q(d), Q(c), Q(e), Q(f), Q(g)]);
};
const Db = {black:30, red:31, green:32, yellow:33, blue:34, magenta:35, cyan:36, white:37, grey:90};
const Eb = async(a, b) => {
  b && (b = w(b), a = x(b, a));
  b = await z(a);
  var c = a, d = !1;
  if (!b) {
    if (c = `${a}.js`, (b = await z(c)) || (c = `${a}.jsx`), b = await z(c), !b) {
      throw Error(`${a}.js or ${a}.jsx is not found.`);
    }
  } else {
    if (b.isDirectory()) {
      d = `${a}/index.js`;
      (b = await z(d)) || (d = `${d}x`);
      b = await z(d);
      if (!b) {
        throw Error(`index.jsx? file is not found in ${a}.`);
      }
      c = d;
      d = !0;
    }
  }
  return {path:a.startsWith(".") ? y("", c) : c, ua:d};
};
const Gb = async a => {
  const b = await Fb(a);
  return b.filter((c, d) => {
    var {internal:e, a:f} = c;
    return e ? b.findIndex(g => {
      ({internal:g} = g);
      return g == e;
    }) == d : b.findIndex(g => {
      ({a:g} = g);
      return f == g;
    }) == d;
  }).map(c => {
    const {a:d, internal:e} = c, f = b.filter(g => {
      var {internal:k, a:h} = g;
      if (e) {
        return e == k;
      }
      if (d) {
        return d == h;
      }
    }).map(g => {
      ({from:g} = g);
      return g;
    }).filter((g, k, h) => h.indexOf(g) == k);
    return Object.assign({}, c, {from:f});
  });
}, Fb = async(a, b) => {
  b = void 0 === b ? {} : b;
  if (a in b) {
    return [];
  }
  b[a] = 1;
  var c = await G(a), d = Na(c);
  c = Hb(c);
  d = [...d, ...c];
  let e;
  try {
    e = await Ib(a, d);
  } catch (f) {
    throw f.message = `${a}\n [!] ${f.message}`, f;
  }
  d = e.map(f => Object.assign({}, f, {from:a}));
  return await e.filter(f => {
    ({a:f} = f);
    return f && !(f in b);
  }).reduce(async(f, g) => {
    var {a:k, j:h} = g;
    f = await f;
    g = (await Fb(k, b)).map(l => Object.assign({}, l, {from:l.from ? l.from : k}, !l.f && h ? {j:h} : {}));
    return [...f, ...g];
  }, d);
}, Ib = async(a, b) => {
  const c = w(a);
  b = b.map(async d => {
    if (Ia.includes(d)) {
      return {internal:d};
    }
    if (/^[./]/.test(d)) {
      try {
        const {path:l} = await Eb(d, a);
        return {a:l};
      } catch (l) {
      }
    }
    const {a:e, f, version:g, H:k, j:h} = await I(c, d);
    return Object.assign({}, {a:e, f, version:g, name:k}, h ? {j:h} : {});
  });
  return await Promise.all(b);
}, Hb = a => H(/(?:^|\s+)require\((['"])(.+?)\1\)/gm, a, ["q", "from"]).map(b => b.from);
class Jb extends rb {
  constructor(a, b) {
    super();
    const c = this.h.bind(this);
    this.rules = [{g:/^( *import(?:\s+[^\s,]+\s*,?)?(?:\s*{(?:[^}]+)})?\s+from\s+)['"](.+)['"]/gm, h:c}, {g:/^( *export\s+{[^}]+?}\s+from\s+)['"](.+?)['"]/gm, h:c}];
    this.ga = [];
    this.fa = [];
    this.path = a;
    this.K = b;
  }
  get u() {
    return this.ga;
  }
  get D() {
    return this.fa;
  }
  async h(a, b, c) {
    a = w(this.path);
    if (/^[./]/.test(c)) {
      return {path:c} = await Eb(c, this.path), c = y(a, c), this.D.push(c), `${b}'./${c}'`;
    }
    ({a:c} = await I(a, c));
    this.u.push(c);
    c = y(this.K, c);
    return `${b}'${c}'`;
  }
}
;const Lb = async(a, b, c) => {
  const {Z:d, Y:e} = c, {B:f, w:g} = b;
  var k = await G(a), h = a.endsWith(".jsx");
  const l = y("", w(a));
  var m = x(f, l);
  m = new Jb(a, m);
  m.end(g && h ? `import { h } from 'preact'
${k}` : k);
  k = await M(m);
  h = h ? await Kb(k, a) : k;
  a = x(f, a);
  await Ha(a);
  await J(a, h);
  a = m.D.map(n => x(l, n)).filter(n => !(n in e));
  m = m.u.filter(n => !(n in d));
  m.forEach(n => {
    d[n] = 1;
  });
  a.forEach(n => {
    e[n] = 1;
  });
  await m.reduce(async(n, p) => {
    await n;
    (await Gb(p)).forEach(({a:q, f:A}) => {
      A && (d[A] = 1);
      d[q] = 1;
    });
  }, {});
  await a.reduce(async(n, p) => {
    await n;
    await Lb(p, b, c);
  }, {});
}, Kb = async(a, b) => await Cb(a, {Ca:"dom", warn(c) {
  {
    const d = Db.yellow;
    c = d ? `\x1b[${d}m${c}\x1b[0m` : c;
  }
  console.warn(c);
  console.log(b);
}});
const Mb = async(a, b = {}) => {
  const {B:c = "depack-temp", w:d} = b;
  b = {Y:{[y("", a)]:1}, Z:{}};
  await Lb(a, {B:c, w:d}, b);
  return [...Object.keys(b.Y).map(e => x(c, e)), ...Object.keys(b.Z)];
};
const Nb = async({src:a, B:b = "depack-temp", output:c, w:d, m:e, debug:f, s:g}, k = []) => {
  if (!a) {
    throw Error("Entry file is not given.");
  }
  a = await Mb(a, {B:b, w:d});
  k = [...k, "--source_map_include_content", "--module_resolution", "NODE", ...a.reduce((h, l) => [...h, "--js", l], [])];
  a = Va(k, h => h.startsWith(b) ? y(b, h) : h);
  console.log(a);
  await N(k, {debug:f, m:e, output:c, s:g, qa:() => !1});
  c && !g && await Ya(c, b);
  await Fa(b);
};
const Ob = {fs:["events", "stream"], stream:["events"], child_process:["events", "stream"], Fa:["events", "net", "stream"], Ga:["http", "tls"], Qa:["events", "net", "stream", "crypto"], crypto:["stream"], Ia:["events"], zlib:["stream"], Ma:["stream", "events"]}, Rb = async({src:a, output:b, xa:c, Ea:d, m:e, s:f, debug:g}, k = []) => {
  if (!a) {
    throw Error("Source is not given.");
  }
  k = [...k, "--module_resolution", "NODE", "--package_json_entry_names", "module,main"];
  var h = await Ta(a);
  const l = Ua(h), {$:m, ka:n, G:p, ca:q, za:A} = l;
  var F = await bb({G:p});
  const L = await Pb(p);
  await cb(n, A);
  a = [a, ...n, ...A, ...q, ...m, ...F].sort((da, Wb) => {
    if (da.startsWith("node_modules")) {
      return -1;
    }
    if (Wb.startsWith("node_modules")) {
      return 1;
    }
  });
  F = Za(p);
  (h = h.some(({a:da}) => da.endsWith(".json"))) && console.log(B("You're importing a JSON file. Make sure to use require instead of import.", "yellow"));
  h = [...k, ...L, ...m.length || h ? ["--process_common_js_modules"] : [], ...F ? ["--output_wrapper", F] : [], "--js", ...a];
  d ? console.error(h.join(" ")) : Qb(k, L, l);
  await N(h, {debug:g, m:e, output:b, s:f});
  c && await Xa(b);
  b && await v(ba, [b, "755"]);
}, Qb = (a, b, c) => {
  a = [...a, ...b].join(" ").replace(/--js_output_file (\S+)/g, (k, h) => `--js_output_file ${B(h, "red")}`).replace(/--externs (\S+)/g, (k, h) => `--externs ${B(h, "grey")}`).replace(/--compilation_level (\S+)/g, (k, h) => `--compilation_level ${B(h, "green")}`);
  console.error(a);
  const {$:d, G:e, ca:f, D:g} = c;
  c = f.filter(Sb);
  a = d.filter(Sb);
  g.length && console.log("%s: %s", B("Dependencies", "yellow"), g.filter((k, h, l) => l.indexOf(k) == h).join(" "));
  c.length && console.log("%s: %s", B("Modules", "yellow"), c.join(" "));
  a.length && console.log("%s: %s", B("CommonJS", "yellow"), a.join(" "));
  e.length && console.log("%s: %s", B("Built-ins", "yellow"), e.join(", "));
}, Sb = a => !a.startsWith("node_modules"), Pb = async a => {
  const b = y("", w(require.resolve("@depack/externs/package.json"))), c = x(b, "v8");
  a = [...a.reduce((d, e) => {
    const f = Ob[e] || [];
    return [...d, e, ...f];
  }, []).filter((d, e, f) => f.indexOf(d) == e), "global", "nodejs"].map(d => {
    ["module", "process", "console"].includes(d) && (d = `_${d}`);
    return x(c, `${d}.js`);
  });
  await Promise.all(a.map(async d => {
    if (!await z(d)) {
      throw Error(`Externs ${d} don't exist.`);
    }
  }));
  return a.reduce((d, e) => [...d, "--externs", e], []);
};
const Tb = (a, b, c, d, e) => {
  d = void 0 === d ? !1 : d;
  e = void 0 === e ? !1 : e;
  const f = new RegExp(`^-(${c}|-${b})`);
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
}, Ub = a => {
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
const W = process.env.GOOGLE_CLOSURE_COMPILER, Vb = async() => {
  var a = "target";
  const b = W ? "target" : require.resolve("google-closure-compiler-java/package.json");
  W || (a = await G(b), {version:a} = JSON.parse(a), [a] = a.split("."));
  return a;
};
const Xb = {black:30, red:31, green:32, yellow:33, blue:34, magenta:35, cyan:36, white:37, grey:90};
function Yb(a, b) {
  return (b = Xb[b]) ? `\x1b[${b}m${a}\x1b[0m` : a;
}
;var Zb = {};
var $b = () => {
  const a = Zb({line:"depack SOURCE [-c] [-o output.js] [-IO 2018] [-awVvh] [-l LEVEL] [... --generic-args]", usage:{SOURCE:"The source file to build.", "--output, -o":"Where to save the output. STDOUT by default.", "--language_in, -I":"Language Input. Can pass ECMA year.", "--language_out, -O":"Language Output. Can pass ECMA year.", "--level, -l":"The optimisation level (generic -O).\nWHITESPACE, SIMPLE (default), ADVANCED", "--advanced, -a":"Turn on advanced optimisation.", "--no-warnings, -w":"Don't print warnings. Same as\n--warning_level QUIET", 
  "--compile, -c":"Set the mode to compilation.", "--verbose, -V":"Print all compiler arguments.", "--pretty-print, -p":"Add --formatting=PRETTY_PRINT flag.", "--debug, -d":"Set --print_source_after_each_pass\nand save stderr to the specified file.", "--version, -v":"Show version.", "--help, -h":"Print help information.", "--no-sourcemap, -S":"Do not add source maps."}}), b = Zb({line:"depack SOURCE -c [-o output.js] [-s]", ma:"depack source.js -c -o bundle.js -I 2018 -O 2018", usage:{"--no-strict -s":'Remove "use strict" from the output.'}}), 
  c = Zb({line:"depack SOURCE [-o output.js] [-H]", ma:"depack source.js -o bundle.js -I 2018 -H", usage:{"-H":"Add import { h } from 'preact' to files."}});
  return `Google Closure Compiler-based packager for front and back-end.
https://github.com/dpck/depack
Performs static analysis on the source files to find out all dependencies.
Generic flags: https://github.com/google/closure-compiler/wiki/Flags-and-Options

${a}
${Yb("BACKEND", "blue")}: Creates a single executable file.
${b}
${Yb("FRONTEND", "cyan")}: Creates a bundle for the web.
${c}`;
};
const X = function(a, b) {
  a = void 0 === a ? {} : a;
  b = void 0 === b ? process.argv : b;
  [, , ...b] = b;
  const c = Ub(b);
  b = b.slice(c.length);
  let d = !c.length;
  return Object.keys(a).reduce((e, f) => {
    var g = Object.assign({}, e);
    e = e.l;
    g = (delete g.l, g);
    if (0 == e.length && d) {
      return Object.assign({}, {l:e}, g);
    }
    const k = a[f];
    let h;
    if ("string" == typeof k) {
      ({value:h, argv:e} = Tb(e, f, k));
    } else {
      try {
        const {b:l, c:m, Ka:n, ja:p, multiple:q} = k;
        p && q && c.length ? (h = c, d = !0) : p && c.length ? (h = c[0], d = !0) : {value:h, argv:e} = Tb(e, f, l, m, n);
      } catch (l) {
        return Object.assign({}, {l:e}, g);
      }
    }
    return void 0 === h ? Object.assign({}, {l:e}, g) : Object.assign({}, {l:e}, g, {[f]:h});
  }, {l:b});
}({src:{ja:!0}, advanced:{b:"a", c:!0}, help:{b:"h", c:!0}, output:{b:"o"}, compile:{b:"c", c:!0}, version:{b:"v", c:!0}, "no-warnings":{b:"w", c:!0}, level:{b:"l"}, language_in:{b:"I"}, iife:{b:"i", c:!0}, language_out:{b:"O"}, node:{b:"n", c:!0}, temp:{}, "just-temp":{b:"T", c:!0}, "no-strict":{b:"s", c:!0}, verbose:{b:"V", c:!0}, "no-sourcemap":{b:"S", c:!0}, "pretty-print":{b:"p", c:!0}, preact:{b:"H", c:!0}, debug:{b:"d"}}), ac = X.src, bc = X["pretty-print"], cc = X["no-sourcemap"], dc = X["no-strict"], 
ec = X.verbose, fc = X.temp, gc = X.language_in, hc = X.language_out, ic = X.level, jc = X.l, kc = X.compile, lc = X["no-warnings"], mc = X.version, nc = X.advanced, Y = X.output, oc = X.preact, Z = X.debug, pc = X.iife;
X.help && (console.log($b()), process.exit(0));
(async() => {
  try {
    const a = await Vb();
    mc && (console.log("Depack version: %s", "0.0.1-alpha"), await N([...eb({aa:W}), "--version"], {m:a}), process.exit(0));
    const b = eb({aa:W, src:ac, output:Y, level:ic, va:gc, wa:hc, argv:jc, advanced:nc, Da:!!Y && !cc, Ba:bc, ya:lc, debug:Z, ta:pc});
    if (kc) {
      return await Rb({src:ac, output:Y, xa:dc, Ea:ec, m:a, s:cc || Z, debug:Z}, b);
    }
    await Nb({src:ac, output:Y, B:fc, m:a, w:oc, debug:Z, s:cc || Z}, b);
  } catch (a) {
    process.env.DEBUG ? console.log(a.stack) : console.log(a.message);
  }
})();


//# sourceMappingURL=depack.js.map