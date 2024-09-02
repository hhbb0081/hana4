function ex01() {
  // p.124 연습문제

  let ll = [];
  function makeArr(n) {
    if (n < 1) return ll;
    ll = [n, ...ll];
    return makeArr(n - 1);
  }

  function makeArr2(n) {
    if (n === 1) return [1];
    return [...makeArr2(n - 1), n];
  }

  function makeArrTCO(n, ll) {
    if (n < 1) return ll;
    return makeArrTCO(n - 1, [n, ...ll]);
  }

  function makeArrTCO2(n, ll) {
    if (n < 1) return ll;
    const t = [n, ...ll];
    return makeArrTCO(n - 1, t);
  }

  console.log(makeArr(10));
  console.log(makeArr2(10));
  console.log(makeArrTCO(10, []));

  let ll2 = [];
  function makeReverseArray(n) {
    if (n < 1) return ll2;
    ll2 = [...ll2, n];
    return makeReverseArray(n - 1);
  }

  function makeReverseArray2(n) {
    if (n === 1) return [1];
    return [n, ...makeReverseArray2(n - 1)];
    // [5, ...makrReverseArray(4)]
    // [4, ...makrReverseArray(3)]
    // [3, ...makrReverseArray(2)]
    // [2, ...makrReverseArray(1)]
    // [2, [1]]
  }

  function makeReverseArrayTCO(n, ll2) {
    if (n < 1) return ll2;
    return makeReverseArrayTCO(n - 1, [...ll2, n]);
  }

  console.log(makeReverseArray(5));
  console.log(makeReverseArray2(5));
  console.log(makeReverseArrayTCO(5, []));
}

function ex02() {
  function loopFibonacci(n) {
    if (n <= 1) return n;

    const arr = [0, 1];
    for (let i = 2; i <= n; i++) {
      arr.push(arr[i - 1] + arr[i - 2]);
    }

    return arr[n];
  }

  function loopFibonacci(n) {
    if (n <= 1) return n;

    const arr = [0, 1];
    for (let i = 2; i <= n; i++) {
      [arr[0], arr[1]] = [arr[1], arr[0] + arr[1]];
    }

    return arr[1];
  }

  // function loopFibonacci(n) {
  //   const arr = [0, 1];
  //   arr.reduce((acc, prev) => (acc = acc + prev));
  // }
  console.log(loopFibonacci(5));
  console.log(loopFibonacci(7));
  console.log(loopFibonacci(15));

  function recursiveFibonacci(n) {
    if (n === 0 || n === 1) return n;
    return recursiveFibonacci(n - 1) + recursiveFibonacci(n - 2);
  }

  console.log(recursiveFibonacci(7));

  const memoized = (fn) => {
    const memoizedFibo = {};
    return (k) => memoizedFibo[k] ?? (memoizedFibo[k] = fn(k));
  };

  const memoizedFibonacci = memoized(function mm(n) {
    if (n === 0 || n === 1) return n;
    return memoizedFibonacci(n - 1) + memoizedFibonacci(n - 2);
  });
  console.log(memoizedFibonacci(15));
  console.log(memoizedFibonacci(100));
  console.log(memoizedFibonacci(5000));
}

ex02();
