console.log(
  "1234-2323-2323-2323".replace(/(\d{4})-(\d{4})-(.*)$/, "$1-####-$3")
);
console.log(
  "1234-2323-2323-2323".replace(
    /(\d{4})-(\d{4})-(\d{2})(.*)(\d{2})$/,
    "$1-$2-####-##$5"
  )
);

const str = "Senior Coding Learning JS";
const r = str.replace(/[A-Z]/g, (...args) => {
  console.log(args);
  return args[0].toLowerCase();
});

const r2 = str.replace(/[a-z]/g, (matchedStr, position, orgString) => {
  console.log("🚀 ~ r2 ~ matchedStr:", matchedStr);
  return matchedStr.toUpperCase();
});

const swapCase = (str) => {
  return str.replace(/[a-zA-Z]/g, (char) => {
    return char === char.toUpperCase()
      ? char.toLowerCase()
      : char.toUpperCase();
  });
}; // 테스트 예시
const originalString = "HeLLo WoRLd";
const swappedString = swapCase(originalString);
console.log(swappedString); // "hEllO wOrlD"
