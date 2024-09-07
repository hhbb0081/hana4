const assert = require("assert");

//1)  문자열 str에서 대문자만 골라 소문자로 변환하세요.
const upperToLower = (str) => {
  return str.replace(/([A-Z])/g, (args) => {
    return String(args).toLowerCase();
  });
};

console.log(upperToLower("Senior Coding Learning JS"));

// ⇒ '*s*-enior *c*-oding *l*-earning *j*-*s*-'

const swapCase = (str) => {
  return str.replace(/([A-Z]*)([a-z]*)/g, (_matchedStr, upper, lower) => {
    return `${upper.toLowerCase()}${lower.toUpperCase()}`;
  });
};

console.log(swapCase("Senior Coding Learning JS"));
assert.equal(
  swapCase("Senior Coding Learning JS"),
  "sENIOR cODING lEARNING js"
);
assert.equal(swapCase("Hanaro 4 Class"), "hANARO 4 cLASS");
assert.equal(swapCase("HeLLo WoRLd"), "hEllO wOrlD");

//2) 전화번호를 정확한 형식으로 출력하는 함수를 작성하시오.
const telfmt = (str) => {
  console.log(str.length);
  if (str.length < 7) return str;
  else if (str.length < 9) return str.replace(/(\d{3,4})(\d{4})/g, "$1-$2");
  else
    return str.startsWith("02")
      ? str.replace(/(\d{2})(\d{3,4})(\d{4})/g, "$1-$2-$3")
      : str.replace(/(\d{2,3})(\d{3,4})(\d{4})/g, "$1-$2-$3");

  const reg = "/(d{2,3})/";
};

console.log(telfmt("0101234567")); // '010-123-4567’
console.log(telfmt("01012345678")); // '010-1234-5678’
console.log(telfmt("0212345678")); // '02-1234-5678’
console.log(telfmt("021234567")); // '02-123-4567’
console.log(telfmt("0331234567")); // '033-123-4567’
console.log(telfmt("15771577")); // '1577-1577’
console.log(telfmt("07012341234")); // '070-1234-1234’
//  ex) in JSX
//        <small>{console.log(telfmt(user.tel)}<)/small>
