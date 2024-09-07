const assert = require("assert");

//1) 문자열이 한글 자음으로 끝나는지 체크하는
//   함수를 작성하시오.
// 모음으로 끝나는 건 28의 배수로 유니코드에 들어가있음

function isEndJaum(str) {
  console.log("🚀 ~ isEndJaum ~ str:", str);
  const lastSt = str[str.length - 1];
  const moumreg = /[ㅏ-ㅣ]/;
  const alphaReg = /[lmnr136780]/i;
  const lastCharCode =
    str.trim().charCodeAt(str.length - 1) - "가".charCodeAt();
  console.log(
    lastSt,
    alphaReg.test(lastSt),
    moumreg.test(lastSt),
    lastCharCode % 28 !== 0
  );
  if (alphaReg.test(lastSt)) return true;
  if (moumreg.test(lastSt)) return false;
  if (lastCharCode % 28 !== 0) return true;
  return false;
}
// isEndJaum("아지오");
// isEndJaum("북한강");
// console.log(isEndJaum("아지오")); // false
// console.log(isEndJaum("북한강")); // true
// console.log(isEndJaum("뷁")); // true
// console.log(isEndJaum("강원도")); // false
// console.log(isEndJaum("바라당")); // true
// console.log(isEndJaum("ㅜㅜ")); // false
// console.log(isEndJaum("케잌")); // true
// console.log(isEndJaum("점수 A")); // false lmnr   cf. isEndJaum('알파벳L')은 true
// console.log(isEndJaum("24")); // false   cf. isEndJaum('23')은 true 136780
// console.log(isEndJaum("아악")); // false   cf. isEndJaum('23')은 true 136780
// console.log(isEndJaum("아아")); // false   cf. isEndJaum('23')은 true 136780

//2) 조사 '이/가, 을/를, 은/는'를 알아서 붙이는 함수를 작성하시오.
// console.log(`고성군${iga("고성군")}`); // 고성군이  cf. `강원도${iga('강원도')}` ⇒ 강원도가
// console.log(`고성군${eunun("고성군")}`); // 고성군은  cf. `강원도${eunun('강원도')}` ⇒ 강원도는
// console.log(`고성군${eulul("고성군")}`); // 고성군을  cf. `강원도${eulul('강원도')}` ⇒ 강원도를

function iga(str) {
  return isEndJaum(str) ? `가` : `이`;
}

function eunun(str) {
  return isEndJaum(str) ? `는` : `은`;
}

function eulul(str) {
  return isEndJaum(str) ? `를` : `을`;
}

assert.equal(isEndJaum("아지오"), false);
assert.equal(isEndJaum("북한강"), true);
assert.equal(isEndJaum("뷁"), true);
assert.equal(isEndJaum("강원도"), false);
assert.equal(isEndJaum("바라당"), true);
assert.equal(isEndJaum("케잌"), true);
assert.equal(isEndJaum("알파벳L"), true);
assert.equal(isEndJaum("23"), true);
assert.equal(isEndJaum("ㅜㅜ"), false);

assert.equal(isEndJaum("점수 A"), false);
assert.equal(isEndJaum("24"), false);
