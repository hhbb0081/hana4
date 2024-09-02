function spliceSlice() {
  const arr2 = [1, 2, 3, 4, 5];

  // ex1) [2,3]을 추출
  const ex1 = arr2.slice(1, 2);
  console.log("🚀 ~ ex1:", ex1, arr2);

  // ex2) [3]부터 모두 다 추출
  const ex2 = arr2.slice(2);
  console.log("🚀 ~ ex1:", ex2, arr2);

  // ex3) [2,3,4] 제거하기
  const ex3 = arr2.splice(1, 3);
  console.log("🚀 ~ ex1:", ex3, arr2);

  // ex4) 복원하기
  const ex4 = arr2.splice(1, 0, ...ex3);
  console.log("🚀 ~ ex1:", ex4, arr2);

  // ex5) [3] 부터 끝까지 제거하기
  const ex5 = arr2.splice(2);
  console.log("🚀 ~ ex1:", ex5, arr2);

  // ex6) 복원하기
  const ex6 = arr2.splice(2, 0, ...ex5);
  console.log("🚀 ~ ex1:", ex6, arr2);

  // ex7) [1,2, 'X', 'Y', 'Z', 4, 5] 만들기
  const ex7 = arr2.splice(2, Infinity, "X", "Y", "Z", 4, 5);
  console.log("🚀 ~ ex1:", ex7, arr2);
  const ex7_2 = arr2.splice(2, 1, "X", "Y", "Z");
  console.log("🚀 ~ ex7_2:", ex7_2);

  // ex8) 위 7번 문제를 splice를 사용하지 말고 작성하시오.
  const ex8 = arr2.splice(2, Infinity, ...ex7);
  console.log("🚀 ~ ex8:", ex8, arr2);

  const ex8_2 = arr2.slice(0, 2).concat("X", "Y", "Z", 4, 5);
  console.log("🚀 ~ ex8_2:", ex8_2);

  const ex8_2_2 = Array.from(arr2.join("").replace("3", "XYZ"));
  console.log("🚀 ~ ex8_2_2:", ex8_2_2);
}

function ex01() {
  const assert = require("assert");
  function push(array, ...args) {
    const newArray = [...array, ...args];
    return newArray.length === 1 ? newArray[0] : newArray;
  }
  function pop(array, cnt = 1) {
    const newArray = array.slice(array.length - cnt);
    return newArray.length === 1 ? newArray[0] : newArray;
  }
  function shift(array, cnt = 1) {
    const newArray = array.slice(cnt);
    return newArray.length === 1 ? newArray[0] : newArray;
  }
  function unshift(array, ...args) {
    const newArray = [...args, ...array];
    return newArray.length === 1 ? newArray[0] : newArray;
  }
  const arr = [1, 2, 3, 4];
  console.log(push(arr, 5, 6));
  console.log(pop(arr));
  console.log(pop(arr, 2));
  console.log(shift(arr));
  console.log(shift(arr, 2));
  console.log(unshift(arr, 0));
  console.log(unshift(arr, 7, 8));
  assert.deepstrictEqual(push(arr, 5, 6), [1, 2, 3, 4, 5, 6]);
  assert.deepstrictEqual(pop(arr), 4);
  assert.deepstrictEqual(pop(arr, 2), [3, 4]); // 2개 팝(꺼내 줘)!
  assert.deepstrictEqual(unshift(arr, 0), [0, 1, 2, 3, 4]);
  assert.deepstrictEqual(unshift(arr, 7, 8), [7, 8, 1, 2, 3, 4]);
  assert.deepstrictEqual(shift(arr), [2, 3, 4]);
  assert.deepstrictEqual(shift(arr, 2), [3, 4]);
  assert.deepstrictEqual(arr, [1, 2, 3, 4]);
}

// ex01();

function ex02() {
  const assert = require("assert");

  const arr = [1, 2, 3, 4];

  function deleteArray(array, startIdx = 0, endIdx = array.length) {
    if (
      array.some((a) => {
        const k = Object.keys(a);
        return k.length > 0 && k.includes(startIdx);
      })
    )
      return array.filter((aa) => aa[startIdx] != endIdx);
    else return array.filter((_, i) => startIdx > i || endIdx <= i);
  }
  console.log(deleteArray(arr, 2));
  console.log(deleteArray(arr, 1, 3));
  assert.deepStrictEqual(deleteArray(arr, 2), [1, 2]);
  assert.deepStrictEqual(deleteArray(arr, 1, 3), [1, 4]);
  assert.deepStrictEqual(arr, [1, 2, 3, 4]);

  const Hong = { id: 1, name: "Hong" };
  const Kim = { id: 2, name: "Kim" };
  const Lee = { id: 3, name: "Lee" };
  const users = [Hong, Kim, Lee];

  console.log(deleteArray(users, 2));
  console.log(deleteArray(users, 1, 2));
  console.log(deleteArray(users, "id", 2));
  console.log(deleteArray(users, "name", "Lee"));
  assert.deepStrictEqual(deleteArray(users, 2), [Hong, Kim]);
  assert.deepStrictEqual(deleteArray(users, 1, 2), [Hong, Lee]);
  assert.deepStrictEqual(deleteArray(users, "id", 2), [Hong, Lee]);
  assert.deepStrictEqual(deleteArray(users, "name", "Lee"), [Hong, Kim]);
}

// ex02();

function ex03() {
  const hong = { id: 1, name: "Hong" };
  const choi = { id: 5, name: "Choi" };
  const kim = { id: 2, name: "kim" };
  const lee = { id: 3, name: "Lee" };
  const park = { id: 4, name: "Park" };
  const users = [kim, lee, park];

  users.addUser = function (user) {
    console.log("🚀 ~ addUser ~ newUsers:", [...this, user]);
    return [...this, user];
  };

  users.removeUser = function (user) {
    const newUsers = this.filter((us) => us.name !== user.id);
    console.log("🚀 ~ removeUser ~ newUsers:", newUsers);
    return newUsers;
  };

  users.changeUser = function (prev, next) {
    const newUsers = this.map((user) => {
      if (user === prev) return next;
      else return user;
    });
    console.log("🚀 ~ newUsers ~ newUsers:", newUsers);
    return newUsers;
  };

  console.log("🚀 ~ ex03 ~ users:", users);

  ["addUser", "removeUser", "changeUser"].forEach((fn) =>
    Object.defineProperty(users, fn, {
      enumerable: false,
    })
  );

  users.addUser(hong); // [kim, lee, park, hong]
  users.removeUser(lee); // [kim, park]
  users.changeUser(kim, choi); // [choi, lee, park]
}

// ex03();

function ex04() {
  // ex1) 배열의 각 원소를 String으로 변환하시오.
  const assert = require("assert");
  const arr = [1, 2, 3, true];
  const ret1 = arr.map(String); // input, arg는 같기 때문에 생략 가능
  console.log("🚀 ~ ex04 ~ ret1:", ret1);
  assert.deepStrictEqual(ret1, ["1", "2", "3", "true"]);

  // ex2) 다음과 같이 작동하는 classNames 함수를 작성하시오.
  const classNames = (...args) => {
    return args.filter(Boolean).join(" "); // boolean으로 casting
  };
  const classNames2 = (...args) => {
    return args
      .filter((a) => !!a?.trim())
      .join(" ")
      .replace(/\s{2,}/g, " "); // 공백으로 들어온 경우에 대한 예외처리
  };
  const ret2 = classNames("", "a b c", "d", "", "e"); // cf. clsx
  console.log("🚀 ~ ex04 ~ ret2:", ret2);
  assert.strictEqual(ret2, "a b c d e");
}

// ex04();

function ex05() {
  const assert = require("assert");
  const reduce = (arr, fn, initValue) => {
    if (!arr || !Array.isArray(arr)) return 0; // arr 예외처리 해야함
    const result = [initValue ?? arr[0]];
    arr.slice(initValue ?? 1).map((a, i) => result.push(fn(result[i], a)));
    return result[result.length - 1];
  };

  console.log(reduce([1, 2, 3], (a, b) => a + b, 0)); // 6이면 통과!
  console.log([1, 2, 3].reduce((a, b) => a + b, 0)); // 6
  console.log(reduce([1, 2, 3, 4, 5], (a, b) => a + b)); // 15면 통과!
  console.log(reduce([1, 2, 3, 4, 5], (a, b) => a * b, 1)); // 120이면 통과!
  console.log(reduce([2, 2, 2], (a, b) => a * b)); // 8이면 통과!
  console.log(reduce([3, 3, 3], (a, b) => a * b, 0)); // 0이면 통과!
  assert.deepStrictEqual(
    reduce([1, 2, 3], (a, b) => a + b, 0),
    6
  );
  assert.deepStrictEqual(
    reduce([1, 2, 3, 4, 5], (a, b) => a + b),
    15
  );
  assert.deepStrictEqual(
    reduce([1, 2, 3, 4, 5], (a, b) => a * b, 1),
    120
  );
  assert.deepStrictEqual(
    reduce([2, 2, 2], (a, b) => a * b),
    8
  );
  assert.deepStrictEqual(
    reduce([3, 3, 3], (a, b) => a * b, 0),
    0
  );

  const a10 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  assert.deepStrictEqual(
    reduce(a10, (acc, cur) => acc + cur, 0),
    a10.reduce((acc, cur) => acc + cur, 0)
  );

  const kim = { id: 2, name: "kim" };
  const lee = { id: 3, name: "Lee" };
  const park = { id: 4, name: "Park" };
  const users = [kim, lee, park];
  assert.deepStrictEqual(
    reduce(users, (acc, user) => acc + user.name),
    users.reduce((acc, user) => acc + user.name)
  );
}

// ex05();

function ex06() {
  const arr = [1, 2, 3, 4, 5];
  const square = (a) => a ** 2;
  const sqrt = (a) => Math.sqrt(a);
  const cube = (a) => a ** 3;

  // reduce 사용
  const baseJobs = [square, sqrt, cube];
  // console.log(
  //   "🚀s ~ ex06 ~ result:",
  //   arr.reduce(
  //     (acc, cur) => [
  //       ...acc,
  //       ...baseJobs.map((job) => job(cur))[baseJobs.length - 1],
  //     ],
  //     []
  //   ),
  //   arr.map((a) => baseJobs.reduce((acc, job) => job(acc), a))
  // );
  // return arr.reduce(
  //   (acc, cur) => [
  //     ...acc,
  //     ...baseJobs.map((job) => job(cur))[baseJobs.length - 1],
  //   ],
  //   []
  // );

  const assert = require("assert");
  const aJobs = [square, sqrt, cube];
  const bJobs = [cube, square];
  const robot = (arr, jobs) => {
    return arr.map((a) => jobs.reduce((acc, job) => job(acc), a));
  };

  console.log(robot(arr, aJobs));
  console.log(robot(arr, bJobs));
  assert.deepStrictEqual(robot(arr, aJobs), [1, 8, 27, 64, 125]);
  assert.deepStrictEqual(robot(arr, bJobs), [1, 64, 729, 4096, 15625]);
}

// ex06();

// 시험 문제로 나올거임
// 테스트 다 통과하면 95점
// 나머지 5점은 코드뭘리티로
function ex07() {
  function range2(start, end, step = start > end ? -1 : 1) {
    if (step === 0 || start === end) return [start];

    // (start - end) * step > 0
    if ((start > end && step > 0) || (start < end && step < 0)) return [];

    // # 1
    if (end === undefined) {
      if (start > 0) {
        end = start;
        start = 1;
      } else if (start < 0) {
        end = -1;
      } else {
        end = 0;
      }
    }

    // # 2
    let tmp = start;
    end = end ?? (start > 0 ? ((start = 1), tmp) : start < 0 ? -1 : 0);

    const results = [];
    for (let i = start; start > end ? i <= end : i >= end; i += step) {
      results.push(i);
    }
    return results;
  }

  function range(start, end, step = start > end ? -1 : 1) {
    //   * rule f(s, e, step)
    //  - step 기본값 = s > e ? -1 : 1
    //  - step === 0 || s === e ? [s]
    //  - e 가 없다면,
    //   ⇒ s > 0 ? e = s, s = 1
    //   ⇒ s < 0 ? e = -1
    //   ⇒ s === 0 ? [0]
    // - 비정상
    //   ⇒ s > e && step > 0 ? []
    //   ⇒ s < e && setp < 0 ? []
    //   즉, (s - e) * step > 0

    // 예외처리
    if (step === 0 || start === end) return [start];

    if ((start > end && step > 0) || (start < end && step < 0)) return [];

    // # 1
    if (end === undefined) {
      if (start > 0) {
        end = start;
        start = 1;
      } else if (start < 0) {
        end = -1;
      } else {
        end = 0;
      }
    }

    console.log(
      Array.from({ length: end - start + 1 }, (_, i) => start + step * i)
    );
    // if (start < end) {
    //   const tmpStep = step ?? 1;
    //   console.log(
    //     Array.from({ length: end - start + 1 }, (_, i) => i + 1).filter(
    //       (a) => (a - start) % tmpStep === 0
    //     )
    //   );
    // } else {
    //   const tmpStep = step ?? -1;
    //   console.log(
    //     Array.from(
    //       { length: start - end + 1 },
    //       (_, i) => start - i + 1 + tmpStep
    //     ).filter((a) => a % (step < 0 ? -step : step) === 0)
    //   );
    // }
  }

  // range(1, 10, 1); // [1, 2, 3, 4,  5, 6, 7, 8, 9, 10]
  // range(1, 10, 2); // [1, 3, 5, 7, 9]
  // range(1, 10); // [1, 2, 3, 4,  5, 6, 7, 8, 9, 10]
  // range(10, 1); // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
  range(10, 1, -2); // [10, 8, 6, 4, 2]
  range(5); // [1, 2, 3, 4, 5]
  range(100); // [1, 2, 3, 4, 5, …, 99, 100]
  range(-5); // [-5, -4, -3, -2, -1]
  range(5, 5); // [5]
  range(1, 5, 0); // [1]
  range(5, 5, 0); // [5]
  range(0, 5); // [0, 1, 2, 3, 4, 5]
  range(5, 5, -1); // [5]
  range(0, -1); // [0, -1]
  range(5, 1, 1); // []
  range(0, -3); // [0, -1, -2, -3]
  range(1, 5, -1); // []
  range(-3, 0); // [-3, -2, -1, 0]
  range(1, 5, 6); // [1]
  range(5, 1); // [5, 4, 3, 2, 1]
  range(0); // [0]
  range(0, 0); // [0]
  range(0, 0, 5); // [0]
  range(2, 1, -5); // [2]
  range(0, -1, -5); // [0]

  // assert.deepStrictEqual(range(1, 10, 1), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  // assert.deepStrictEqual(range(1, 10, 2), [1, 3, 5, 7, 9]);
  // assert.deepStrictEqual(range(1, 10), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  // assert.deepStrictEqual(range(10, 1), [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);

  // assert.deepStrictEqual(range(5, 5, 0), [5]);
  // assert.deepStrictEqual(range(1, 5, 0), [1]);
  // assert.deepStrictEqual(range(5, 5, -1), [5]);
  // assert.deepStrictEqual(range(5, 5), [5]);
  // assert.deepStrictEqual(range(0, 0, 5), [0]);
  // assert.deepStrictEqual(range(1, 5, -1), []);

  // assert.deepStrictEqual(range(1, 5, 6), [1]);
  // assert.deepStrictEqual(range(0, 5), [0, 1, 2, 3, 4, 5]);
  // assert.deepStrictEqual(range(-3, 0), [-3, -2, -1, 0]);

  // assert.deepStrictEqual(range(5, 1, 1), []);
  // assert.deepStrictEqual(range(0, -1), [0, -1]);
  // assert.deepStrictEqual(range(0, -3), [0, -1, -2, -3]);
  // assert.deepStrictEqual(range(5, 1), [5, 4, 3, 2, 1]);
  // assert.deepStrictEqual(range(10, 1, -2), [10, 8, 6, 4, 2]);

  // assert.deepStrictEqual(range(5), [1, 2, 3, 4, 5]);
  // assert.deepStrictEqual(range(0), [0]);
  // assert.deepStrictEqual(range(0, 0), [0]);
  // assert.deepStrictEqual(range(2, 1, -5), [2]);
  // assert.deepStrictEqual(range(0, -1, -5), [0]);
  // assert.deepStrictEqual(range(-5), [-5, -4, -3, -2, -1]);
  // assert.deepStrictEqual(
  //   range(50),
  //   Array.from({ length: 50 }, (_, i) => i + 1)
  // );
  // assert.deepStrictEqual(
  //   range(1, 150, 3),
  //   Array.from({ length: 50 }, (_, i) => i * 3 + 1)
  // );
}

ex07();

function ex08() {
  const keyPair = (arr, n) => {
    arr.sort((a, b) => a - b);

    let s = 0;
    const ssum = arr.map((a) => {
      return (s += a);
    });
    console.log("🚀 ~ keyPair ~ ssum:", ssum);
  };

  const keyPair2 = (arr, n) => {
    const cache = {}; // {짝이 되는 값 : 짝의 인덱스}
    for (let i = 0; i < arr.length; i++) {
      const val = arr[i];
      if (val in cache) return [cache[val], i];
      cache[n - val] = i;
    }
  };
  keyPair([1, 3, 4, 5], 7); // [1, 2]
  keyPair([1, 4, 45, 6, 10, 8], 16); // [3, 4]
  keyPair([1, 2, 4, 3, 6], 10); // [2, 4]
  keyPair([1, 2, 3, 4, 5, 7], 9); // [3, 4]  or [1, 5]
  // cf. O(n^2) ⇒ ⇒ ⇒ O(N) || O(logN)
  assert.deepStrictEqual(keyPair([1, 3, 4, 5], 7), [1, 2]);
  assert.deepStrictEqual(keyPair([1, 4, 45, 6, 10, 8], 16), [3, 4]);
  assert.deepStrictEqual(keyPair([1, 2, 4, 3, 6], 10), [2, 4]);
  assert.deepStrictEqual(keyPair([1, 2, 3, 4, 5, 7], 9), [3, 4]);
}

// ex08();
