function ex02() {
  const LINE2 = [
    "신도림",
    "성수",
    "신설동",
    "용두",
    "신답",
    "용답",
    "시청",
    "충정로",
    "아현",
    "이대",
    "신촌",
    "공항철도",
    "홍대입구",
    "합정",
    "당산",
    "영등포구청",
    "문래",
    "대림",
    "구로디지털단지",
    "신대방",
    "신림",
    "봉천",
    "서울대입구",
    "낙성대",
    "사당",
    "방배",
    "서초",
    "교대",
    "강남",
    "역삼",
    "선릉",
    "삼성",
    "종합운동장",
    "신천",
    "잠실",
    "잠실나루",
    "강변",
    "구의",
    "건대입구",
    "뚝섬",
    "한양대",
    "왕십리",
    "상왕십리",
    "신당",
    "동대문역사문화공원",
    "을지로4가",
    "을지로3가",
    "을지로입구",
  ];

  class Subway {
    constructor(...args) {
      const [start, end] = args;
      this.startIdx = LINE2.indexOf(start);
      this.endIdx = LINE2.indexOf(end);
    }

    *[Symbol.iterator]() {
      if (this.startIdx > this.endIdx) {
        let i = this.startIdx;
        while (true) {
          console.log("🚀 ~ Subway ~ ex02 ~ i:", i);

          yield LINE2[i++ % LINE2.length];
          if ((i % LINE2.length) - 1 === this.endIdx) break;
        }
      } else {
        for (let i = this.startIdx; i <= this.endIdx; i++) {
          yield LINE2[i];
        }
      }
    }
  }

  // const routes = new Subway("문래", "신림");
  // const it1 = routes[Symbol.iterator]();
  // console.log([...routes]); // [ '문래', '대림', '구로디지털단지', '신대방', '신림' ]
  // console.log(it1.next()); // { value: '문래', done: false }
  // console.log(it1.next()); // { value: '대림', done: false }
  // console.log(it1.next()); // { value: '구로디지털단지', done: false }
  // console.log(it1.next()); // { value: '신대방', done: false }
  // console.log(it1.next()); // { value: '신림', done: false }
  // console.log(it1.next()); // { value: undefined, done: true }
  // console.log(it1.next()); // { value: undefined, done: true }

  const routes2 = new Subway("구로디지털단지", "성수"); // 32개 정거장
  console.log([...routes2]); // ['구로디지털단지', '신대방', ..., '성수']
  const it2 = routes2[Symbol.iterator]();
  while (true) {
    const x = it2.next();
    console.log(x);
    if (x.done) break;
  }

  // const route3 = new Subway("문래", "합정"); // 46개 정거장이면 통과!
  // console.log("🚀 ~ ex02 ~ route3:", [...route3]);

  // const route4 = new Subway("신도림", "을지로입구"); // 48개 정거장이면 통과
  // console.log("🚀 ~ ex02 ~ route4:", [...route4]);
}

// ex02();

function ex03() {
  const assert = require("assert");

  class ArrayList {
    static listToArray(list) {
      const arr = [];
      for (let tmpList = list; tmpList; tmpList = tmpList.rest) {
        arr.push(tmpList.value);
      }
      return arr;
    }
    static arrayToList(arr) {
      const list = {
        value: arr[0],
      };
      let tmpList = list;
      for (let i = 1; i < arr.length; i++) {
        tmpList.rest = { value: arr[i] }; // tmpList[rest] => 에러, tmpList.rest => 성공
        tmpList = tmpList.rest;
      }
      return list;
    }
    constructor(args) {
      this.arr = args;
    }

    get size() {
      return this.arr.length;
    }
    get isEmpty() {
      return !this.size;
    }
    get peek() {
      return this.arr[this.size - 1];
    }

    toArray() {
      return this.arr;
    }
    splice(...args) {
      const [i, n, v] = args;
      if (i === undefined || n === undefined || v === undefined) return;
      return this.arr.splice(i, n, v);
    }
    add(...args) {
      const [v, i = this.size] = args;
      this.splice(i, 0, v); // splice(시작 인덱스, 제거할 요소 수, 추가할 요소)
      console.log("🚀 ~ ArrayList ~ add ~ this.arr:", this.arr);
      return ArrayList.arrayToList(this.arr);
    }
    remove(v) {
      // 없어도 에러 안 나야 함
      this.arr = this.arr.filter((a) => a !== v);
      return ArrayList.arrayToList(this.arr);
    }
    toString() {
      return ArrayList.arrayToList(this.arr);
    }
    set(...args) {
      const [i, v] = args;
      this.splice(i, 1, v);
      return ArrayList.arrayToList(this.arr);
    }
    get(idx) {
      // idx 범위 넘어가는 경우 에러 처리
      if (idx >= this.size || idx < 0) return -1;
      return this.arr[idx];
    }
    indexOf(v) {
      return this.arr.indexOf(v);
    }
    contains(v) {
      return this.arr.includes(v);
    }
    clear() {
      this.arr.length = 0;
      return this.arr;
    }

    [Symbol.iterator]() {
      let idx = 0;
      const arr = this.arr;
      return {
        next() {
          return { value: arr[idx++], done: idx > arr.length };
        },
      };
    }

    iterator() {
      return this[Symbol.iterator]();
    }
  }

  console.log(ArrayList.listToArray({ value: 1, rest: { value: 2 } })); //[1,2]
  assert.deepStrictEqual(
    ArrayList.listToArray({ value: 1, rest: { value: 2 } }),
    [1, 2]
  ); //[1,2]
  console.log(ArrayList.arrayToList([1, 2])); // { value: 1, rest: { value: 2 } };
  assert.deepStrictEqual(ArrayList.arrayToList([1, 2]), {
    value: 1,
    rest: { value: 2 },
  });

  const alist = new ArrayList([1, 2]);
  assert.deepStrictEqual(alist.add(3), {
    value: 1,
    rest: { value: 2, rest: { value: 3 } },
  });
  // assert.deepStrictEqual(alist.add(5, 1), {
  //   value: 1,
  //   rest: { value: 5, rest: { value: 2, rest: { value: 3 } } },
  // }); // { value: 1, rest: { value: 5, rest: { value: 2, rest: { value: 3 } }}
  assert.deepStrictEqual(alist.remove(2), { value: 1, rest: { value: 3 } });
  assert.deepStrictEqual(alist.add(22, 1), {
    value: 1,
    rest: { value: 22, rest: { value: 3 } },
  });
  assert.deepStrictEqual(alist.add(33, 1), {
    value: 1,
    rest: { value: 33, rest: { value: 22, rest: { value: 3 } } },
  });
  console.log(alist.toString());
  // alist.toString(); // ArrayList(4) { value: 1, rest: { value: 33, rest: { value: 22, rest: { value: 3 } } } }
  assert.deepStrictEqual(alist.set(1, 300), {
    value: 1,
    rest: { value: 300, rest: { value: 22, rest: { value: 3 } } },
  });
  assert.strictEqual(alist.get(2), 22);
  assert.strictEqual(alist.size, 4);
  assert.strictEqual(alist.indexOf(300), 1);
  assert.strictEqual(alist.contains(300), true);
  assert.strictEqual(alist.contains(301), false);
  assert.strictEqual(alist.isEmpty, false);
  assert.strictEqual(alist.peek, 3);
  assert.deepStrictEqual(alist.toArray(), [1, 300, 22, 3]);
  assert.deepStrictEqual(alist.iterator().next(), { value: 1, done: false });
  assert.deepStrictEqual(alist.clear(), []); // all clear
}

ex03();
