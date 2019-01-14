'use strict';
const k = (b, a, c, d, f) => {
  d = void 0 === d ? !1 : d;
  f = void 0 === f ? !1 : f;
  const g = new RegExp(`^-(${c}|-${a})`);
  a = b.findIndex((a) => g.test(a));
  if (-1 == a) {
    return {argv:b};
  }
  if (d) {
    return {value:!0, argv:[...b.slice(0, a), ...b.slice(a + 1)]};
  }
  d = a + 1;
  c = b[d];
  if (!c || "string" == typeof c && c.startsWith("--")) {
    return {argv:b};
  }
  f && (c = parseInt(c, 10));
  return {value:c, argv:[...b.slice(0, a), ...b.slice(d + 1)]};
}, m = (b) => {
  const a = [];
  for (let c = 0; c < b.length; c++) {
    const d = b[c];
    if (d.startsWith("-")) {
      break;
    }
    a.push(d);
  }
  return a;
};
const n = function(b, a) {
  b = void 0 === b ? {} : b;
  a = void 0 === a ? process.argv : a;
  [, , ...a] = a;
  const c = m(a);
  a = a.slice(c.length);
  let d = !c.length;
  return Object.keys(b).reduce((a, g) => {
    var e = Object.assign({}, a);
    a = a.b;
    e = (delete e.b, e);
    if (0 == a.length && d) {
      return Object.assign({}, {b:a}, e);
    }
    const f = b[g];
    let h;
    if ("string" == typeof f) {
      ({value:h, argv:a} = k(a, g, f));
    } else {
      try {
        const {a:b, c:e, g:p, f:l, multiple:q} = f;
        l && q && c.length ? (h = c, d = !0) : l && c.length ? (h = c[0], d = !0) : {value:h, argv:a} = k(a, g, b, e, p);
      } catch (t) {
        return Object.assign({}, {b:a}, e);
      }
    }
    return void 0 === h ? Object.assign({}, {b:a}, e) : Object.assign({}, {b:a}, e, {[g]:h});
  }, {b:a});
}({src:{f:!0}, analyze:{a:"a", c:!0}, output:{a:"o"}, compile:{a:"c", c:!0}, version:{a:"v", c:!0}, externs:{a:"e"}, "no-warnings":{a:"w", c:!0}, level:{a:"l"}, language_in:{a:"I"}, language_out:{a:"O"}, node:{a:"n", c:!0}}), r = n.src;
console.log(n);
console.log(r);

