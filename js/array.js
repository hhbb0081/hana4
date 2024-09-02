const a100 = Array.from({ length: 100 }, (_, i) => i + 1);
// console.log(a100);

const orr = [{ id: 1 }, { id: 2 }, { id: 1 }];
orr.findIndex((a, i) => a.id === 1);

const find3 = (a) => a.id === 1;

const findId = (i) => (a) => a.id === i;
const idxId1 = orr.findLastIndex(findId(1));
const idxId2 = orr.findLastIndex(findId(2));
const idxId3 = orr.findLastIndex(findId(3));
console.log("🚀 ~ idxId1:", idxId1);
console.log("🚀 ~ idxId2:", idxId2);
console.log("🚀 ~ idxId3:", idxId3);

orr.forEach((a, i, orr) => console.log(a.id));

// 1 ~ cnt 배열 만들기
const makeArray = (cnt, startNum = 1) =>
  Array.from(
    {
      length: cnt,
    },
    (_, i) => i + startNum
  );

// 소수 판별
const arr = [1, 2, 3, 4, 5];
// const isOdd = (n) => n % 2 !== 0;
// arr.forEach((a) => console.log(isOdd(a))); // forEach는 반환값 없음
// const kim2 = orr.find((a) => a.id === 1);

const assert = require("assert");
// check prime number
// 1) 소수를 가지고 있는지
const isPrime = (num) => {
  if (num === 1) return false;

  return makeArray(num, 2).every((n) => num % n !== 0);
};

const hasPrime = (arr) => {
  return arr.some((a) => isPrime(a) === true);
};

assert.strictEqual(hasPrime([1, 2, 3]), true);

// 2) 소수를 가지고 있다면, 추출
const primeNumbers = (arr) => {
  const primeArr = arr.filter((a) => isPrime(a));
  console.log("🚀 ~ primeArr:", primeArr);
  return primeArr;
};

if (hasPrime(arr)) {
  primeNumbers(arr);
}

const arr100 = makeArray(100);
assert.deepStrictEqual(
  primeNumbers(arr100),
  [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
    73, 79, 83, 89, 97,
  ]
);
