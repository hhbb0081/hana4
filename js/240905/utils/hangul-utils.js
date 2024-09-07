export default function isEndJaum(str) {
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

const jamo = (str, ja_mo) => {
  const [ja, mo] = ja_mo;
  isEndJaum(str) ? ja : mo;
};

console.log(`고성군${iga("고성군")}`); // 고성군이  cf. `강원도${iga('강원도')}` ⇒ 강원도가
console.log(`고성군${eunun("고성군")}`); // 고성군은  cf. `강원도${eunun('강원도')}` ⇒ 강원도는
console.log(`고성군${eulul("고성군")}`);

export { eulul, eunum, josa };
