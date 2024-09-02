const assert = require("assert");

function ex01() {
  const arr = [100, 200, 300, 400, 500, 600, 700];
  console.log("--------[arr] for-in---------");
  for (const a in arr) {
    console.log(a, arr[a]);
  }

  const obj = {
    name: "Kim",
    addr: "Yongsan",
    level: 1,
    role: 9,
    receive: false,
  };

  console.log("--------[obj] for-in---------");
  for (const s in obj) {
    console.log(s, obj[s]);
  }

  console.log("--------[obj] for-of---------");
  for (const ss of Object.values(obj)) {
    console.log(ss);
  }

  Object.defineProperty(obj, "level", { enumerable: false });
  Object.defineProperty(obj, "role", { writable: false });
}

ex01();

function ex02() {
  const arr = [
    ["A", 10, 20],
    ["B", 30, 40],
    ["C", 50, 60, 70],
  ];

  function makeObjectFromArray() {
    const obj = {};

    for (const [key, ...value] of arr) {
      obj[key] = value;
    }
    console.log("🚀 ~ makeObjectFromArray ~ obj:", obj);
  }

  makeObjectFromArray();

  const obj = { A: [10, 20], B: [30, 40], C: [50, 60, 70] };

  function makeArrayFromObject() {
    const arr = [];
    for (const en of Object.entries(obj)) {
      arr.push([en[0], ...en[1]]);
    }
    console.log("🚀 ~ makeArrayFromObject ~ arr:", arr);
  }

  makeArrayFromObject();
}

ex02();

function ex03() {
  function sallowCopy(obj) {
    const kim = { nid: 3, nm: "Kim", addr: "Pusan" };
    const newKim = {};
    for (const k in kim) {
      newKim[k] = kim[k];
    }
    assert.deepStrictEqual(kim, newKim);
    newKim.addr = "Daegu";
    assert.notDeepStrictEqual(kim, newKim);
    console.log("shallow>>", kim.addr !== newKim.addr); // true면 통과!
    console.log("🚀  kim newKim:", kim, newKim);
  }
  // sallowCopy();

  function isObject(obj) {
    return obj && typeof obj === "object";
  }

  const KIM = { nid: 3, nm: "Kim", addr: { city: "Pusan" }, [Symbol()]: "sym" };
  function copyObject(obj) {
    if (!isObject(obj)) return obj;

    const newer = {};
    for (const k of Reflect.ownKeys(obj)) {
      newer[k] = copyObject(obj[k]);
    }
    // for (const k in obj) {
    //   newer[k] = copyObject(obj[k]);
    // }

    // const symbols = Object.getOwnPropertySymbols(obj);
    // console.log('🚀  symbols:', symbols);
    // for (const symKey of symbols) {
    //   newer[symKey] = obj[symKey];
    // }

    return newer;
  }

  const newKim = copyObject(KIM);
  assert.deepStrictEqual(KIM, newKim);
  newKim.addr.city = "Daegu";
  assert.notDeepStrictEqual(KIM, newKim);
  console.log("shallow>>", KIM.addr.city !== newKim.addr.city); // true면 통과!
  console.log("🚀  kim newKim:", KIM, newKim);
}

ex03();

assert.deepStrictEqual();
