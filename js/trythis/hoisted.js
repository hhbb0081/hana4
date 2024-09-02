// 선언
var gg = undefined;
let bb = NIY;
var zz = undefined;
function f1(x, y) {
  var gg;
  let bb;
  var zz;
  function f2(t, u, v) {
    console.log(t, "`inner2`", xx, zz);
  }
  // -------------------------
  x = 1;
  y = 2;
  gg = 11;
  bb = 22;
  console.log("f1>", gg, bb, zz, f2, f2.length);
  f2("* first"); //
  {
    const xx = 99;
    function f2(t) {
      console.log(t, "`nested`", xx, zz);
    }
    f2("* nest-first");
    zz = 88;
  }
  zz = 800;
  console.log("🚀  gg:", gg);
  f2("* second");
}
function f2(g) {
  console.log(g, "global f2>", gg, bb, xx, kk);
}
let xx = NIY;
var kk = undefined;
console.log("kkkkk>>", kk);

// ------------------------------------
gg = 1;
bb = 2;
xx = 9;
if (gg > 0) {
  const yy = NIY;
  kk = 33;
  yy = 9;
}

f1(1, 2);
console.log("kkkkk>>", kk);
f2("* third");
