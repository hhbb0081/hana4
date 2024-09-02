function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}

console.log(factorial(3));
console.log(factorial(5));

// for문
let sum = 0;
for (let i = 1; i <= 100; i++) {
  sum += i;
}

console.log("🚀 ~ sum:", sum);

// 재귀
function addTo100(a) {
  if (a === 100) return 100;
  return a + addTo100(a + 1);
}

console.log(addTo100(1));

// TCO: 리턴문에 함수 호출만 존재하는 것
function addTo100TCO(a, sum) {
  if (a === 100) return sum + 100;
  return addTo100TCO(a + 1, sum + a);
}
