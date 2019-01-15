             
const g = require("fs"), {createWriteStream:h} = g;
const k = (b, c = 0, d = !1) => {
  if (0 === c && !d) {
    return b;
  }
  b = b.split("\n", d ? c + 1 : Number.Infinity);
  return d ? b[b.length - 1] : b.slice(c).join("\n");
}, m = (b) => ({callee:{caller:b}} = b);
const n = require("os"), {homedir:p} = n;
const q = /\s+at.*(?:\(|\s)(.*)\)?/, r = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, t = p(), v = (b) => {
  const {b:c = !1, a:d = ["pirates"]} = {}, e = new RegExp(r.source.replace("IGNORED_MODULES", d.join("|")));
  return b.replace(/\\/g, "/").split("\n").filter((a) => {
    a = a.match(q);
    if (null === a || !a[1]) {
      return !0;
    }
    a = a[1];
    return a.includes(".app/Contents/Resources/electron.asar") || a.includes(".app/Contents/Resources/default_app.asar") ? !1 : !e.test(a);
  }).filter((a) => "" !== a.trim()).map((a) => c ? a.replace(q, (a, b) => a.replace(b, b.replace(t, "~"))) : a).join("\n");
};
function w(b, c, d = !1) {
  return function(e) {
    var a = m(arguments), {stack:f} = Error();
    const u = k(f, 2, !0), l = (f = e instanceof Error) ? e.message : e;
    a = [`Error: ${l}`, ...null !== a && b === a || d ? [c] : [u, c]].join("\n");
    a = v(a);
    return Object.assign(f ? e : Error(), {message:l, stack:a});
  };
}
;function x(b) {
  var {stack:c} = Error();
  const d = m(arguments);
  c = k(c, 2 + (b ? 1 : 0));
  return w(d, c, b);
}
;async function y() {
  const b = x(!0), c = h("test.js");
  await new Promise((d, e) => {
    c.on("error", (a) => {
      a = b(a);
      e(a);
    }).on("close", d).end("data");
  });
}
;(async() => {
  await y();
})();


//# sourceMappingURL=testt.js.map