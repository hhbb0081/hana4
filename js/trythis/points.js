function ex01() {
  console.log("\n# 1번");
  for (let i = 0.1; i < 1; i = i + 0.1) {
    // 한 자리 수로 고정 : toFixed(1)
    // 정수는 정수로 출력: +
    console.log(+i.toFixed(1));
  }
}

function ex02() {
  console.log("\n# 2 - 1번");
  for (let i = 1; i <= 10; i += 1) {
    const num = +Math.sqrt(i).toFixed(3);
    // if (s % 1 !== 0)
    if (!Number.isInteger(num)) console.log(i, num);
  }

  function printIrr(n) {
    for (let i = n; ; i++) {
      console.log(i, Math.sqrt(i).toFixed(3));
      if (Number.isInteger(+Math.sqrt(i + 1).toFixed(3))) break;
    }

    do {
      const s = Math.sqrt(n);
      console.log("🚀 s:", s.toFixed(3));
      if (Math.sqrt(n + 1) % 1 === 0) break;
      n += 1;
    } while (true);
  }

  console.log("\n# 2 - 2번");
  console.log("\nprintIrr(5): ");
  printIrr(5);
  console.log("\nprintIrr(9): ");
  printIrr(9);
}

function ex03() {
  console.log("\n# 3번");
  const WEEK_NAMES = "일월화수목금토";
  const today = new Date();
  console.log(WEEK_NAMES[today.getDay()]);
}

function ex04() {
  function pointLength(f) {
    return f.toString().split(".")[1]?.length ?? 0;
    return f.toString().length - Math.trunc(a).toString().length - 1;
  }
  function addPoints(a, b) {
    // 방법 1
    const as = a.toString().split(".")[1]?.length ?? 0; // a 소수점 자리수 구하기
    const bs = b.toString().split(".")[1]?.length ?? 0; // b 소수점 자리수 구하기
    const l = as > bs ? as : bs;
    console.log((a + b).toFixed(l));

    // 방법 2
    const alen = a.toString().length - Math.trunc(a).toString().length - 1; // 전체 자릿수에서 정수부 길이를 빼기
    const blen = a.toString().length - Math.trunc(b).toString().length - 1;
    const longer = Math.max(alen, blen);
    console.log((a + b).toFixed(longer));
  }

  console.log("\n# 4번");
  addPoints(0.21354, 0.1);
  addPoints(0.14, 0.28);
  addPoints(0.34, 0.226);
}

ex01();
ex02();
ex03();
ex04();
