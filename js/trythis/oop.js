function ex01() {
  const assert = require("assert");
  class Emp {
    firstName;
    lastName;
    constructor() {
      // hong: instanceof Proxy, 생성 당시의 this: instanceof Emp
      return new Proxy(this, {
        set(target, prop, value) {
          if (prop === "fullName") {
            const tmp = value?.split(" ") || [];
            target["lastName"] = (tmp[1] || tmp[0])?.toUpperCase();
            target["firstName"] = tmp[1] ? tmp[0] : target.firstName;
          } else {
            this[prop] = value;
          }
        },
        get(target, prop) {
          if (prop === "fullName") {
            return `${this.firstName}${this.firstName ? " " : ""}${
              this.lastName
            }`;
          }
          return this[prop];
        },
      });
    }
  }
  const hong = new Emp();

  hong.fullName = "Kildong Hong"; // split하여 firstName, lastName 셋
  console.log(hong.fullName); // 'Kildong HONG' 출력하면 통과!
  assert.strictEqual(hong.fullName, "Kildong HONG");
  hong.fullName = "Lee";
  console.log(hong.firstName, hong.lastName); // 'Kildong LEE' 출력하면 통과!
  assert.strictEqual(hong.fullName, "Kildong LEE");
}

// ex01();

function ex02() {
  const assert = require("assert");

  Object.defineProperties(Array.prototype, {
    firstObject: {
      // get을 붙여줘야 function이 아니라 property 처럼 쓸 수 있음
      get() {
        return this[0];
      },
      set(value) {
        this[0] = value;
      },
    },
    lastObject: {
      get() {
        return this.at([-1]);
      },
      set(value) {
        this[this.length - 1] = value;
        // this.with(-1, value); // 순수함수라서 원 값은 바꾸지 못함
      },
    },
  });

  const arr = [1, 2, 3, 4, 5]; // arr.firstObject; // 1    arr.lastObject; // 5
  assert.deepStrictEqual([arr.firstObject, arr.lastObject], [1, 5]);
  arr.firstObject = 100;
  arr.lastObject = 900;
  assert.deepStrictEqual([arr.firstObject, arr.lastObject], [100, 900]);

  const arr2 = [1];
  console.log("🚀 ~ ex02 ~ arr2:", arr2.firstObject, arr2.lastObject);

  const hong = { id: 1, name: "Hong" };
  const kim = { id: 2, name: "Kim" };
  const lee = { id: 3, name: "Lee" };
  const users = [hong, lee, kim];

  Array.prototype.mapBy = function (prop) {
    return this?.map((a) => a[prop]) || [];
  };
  Array.prototype.filterBy = function (prop, value, isIncludes = false) {
    const cb = isIncludes
      ? (a) => a[prop]?.includes(value)
      : (a) => a[prop] === value;

    return this?.filter(cb) || [];
  };
  Array.prototype.rejectBy = function (prop, value, isIncludes = false) {
    const cb = isIncludes
      ? (a) => !a[prop]?.includes(value)
      : (a) => a[prop] !== value;

    return this?.filter(cb) || [];
  };
  Array.prototype.findBy = function (prop, value) {
    return this?.filter((a) => a[prop] === value)[0];
  };
  Array.prototype.sortBy = function (prop) {
    // name | name:desc | name:asc
    const [k, direction = "asc"] = prop?.split(":");
    const dir = direction?.toLowerCase() === "desc" ? -1 : 1;
    return this?.sort((a, b) => (a[k] > b[k] ? dir : -dir));
  };

  assert.deepStrictEqual(users.mapBy("id"), [1, 3, 2]);
  assert.deepStrictEqual(users.mapBy("name"), ["Hong", "Lee", "Kim"]);
  assert.deepStrictEqual(users.filterBy("id", 2), [kim]);
  assert.deepStrictEqual(users.filterBy("name", "i", true), [kim]);
  assert.deepStrictEqual(users.rejectBy("id", 2), [hong, lee]);
  assert.deepStrictEqual(users.rejectBy("name", "i", true), [hong, lee]);
  assert.deepStrictEqual(users.findBy("name", "Kim"), kim);
  assert.deepStrictEqual(users.sortBy("name"), [hong, kim, lee]);
  assert.deepStrictEqual(users.sortBy("name:desc"), [lee, kim, hong]);
  assert.deepStrictEqual(users.firstObject, hong);
  assert.deepStrictEqual(users.lastObject, lee);
  users.firstObject = kim;
  assert.deepStrictEqual(users.firstObject, kim);
  users.lastObject = hong;
  assert.deepStrictEqual(users.lastObject, hong);

  return;
}

// ex02();

function ex03() {
  const assert = require("assert");

  // Stack, Queue, ArrayList
  class Collection {
    #arr = [];

    constructor(...args) {
      this.#arr.push(...args);
    }

    get _arr() {
      return this.#arr;
    }
    get peek() {
      return this.#isQueue() ? this.#arr[0] : this.#arr.at(-1);
    }
    get poll() {
      return this.#isQueue() ? this.#arr.shift() : this.#arr.pop();
    }
    get isEmpty() {
      return !this.#arr.length;
    }
    get length() {
      return this.#arr.length;
    }
    push(...args) {
      this.#arr.push(...args);
      return this.#arr;
    }
    toArray() {
      return this.#isQueue() ? this.#arr.toReversed() : this.#arr;
    }
    clear() {
      this.#arr.length = 0;
    }
    print() {
      console.log(this.#arr);
      return `<${this.constructor.name}: [${this.toArray()}]>`;
    }
    remove() {
      return this.poll;
    }
    #isQueue() {
      return this instanceof Queue;
    }

    [Symbol.iterator]() {
      let idx = 0;
      const arr = this.toArray();
      return {
        next: () => ({ value: arr[idx++], done: idx > this.length }),
      };
    }

    *[Symbol.iterator]() {
      const arr = this.toArray();
      for (let i = 0; i < arr.length; i++) {
        yield arr[i];
      }
    }
  }
  class Stack extends Collection {
    pop() {
      return this._arr.pop();
    }
  }

  class Queue extends Collection {
    enqueue(...args) {
      this.push(...args);
      return this._arr;
    }

    dequeue() {
      return this._arr.shift();
    }
  }

  const stack = new Stack();
  assert.deepStrictEqual(stack.toArray(), []);
  stack.push(3); // 추가하기
  assert.deepStrictEqual(stack.toArray(), [3]);
  stack.pop();
  assert.deepStrictEqual(stack.toArray(), []);
  stack.push(1, 2, 3);

  const stackT = new Stack(...[[1], [2]]);
  assert.deepStrictEqual(stackT.toArray(), [[1], [2]]);

  // const stack2 = new Stack(1, 2);
  const stack2 = new Stack(...[1, 2]);
  assert.deepStrictEqual(stack2.toArray(), [1, 2]);
  stack2.push(2).push(3); // 추가하기
  assert.deepStrictEqual(stack2.toArray(), [1, 2, 2, 3]);
  assert.strictEqual(stack2.pop(), 3);
  // assert.deepStrictEqual(stack2.toArray(), [1, 2]);
  stack2.push(4, 5); // 추가하기
  assert.deepStrictEqual(stack2.toArray(), [1, 2, 2, 4, 5]);

  assert.strictEqual(stack2.peek, 5);
  assert.strictEqual(stack2.poll, 5);
  assert.deepStrictEqual(stack2.toArray(), [1, 2, 2, 4]);
  assert.strictEqual(stack2.remove(), 4);
  assert.deepStrictEqual(stack2.toArray(), [1, 2, 2]);

  stack2.arr = [5, 6, 7]; //error
  assert.notDeepStrictEqual(stack2.toArray(), [5, 6, 7]);
  stack2.print();

  stack2.clear();
  assert.deepStrictEqual(stack2.toArray(), []);
  assert.strictEqual(stack2.isEmpty, true);

  //--------------------------------

  const queue = new Queue();
  assert.deepStrictEqual(queue.toArray(), []);
  queue.enqueue(3); // 추가하기
  assert.deepStrictEqual(queue.toArray(), [3]);
  queue.enqueue(2); // 추가하기
  assert.deepStrictEqual(queue.toArray(), [2, 3]);
  assert.strictEqual(queue.dequeue(), 3);
  assert.deepStrictEqual(queue.toArray(), [2]);
  queue.enqueue(5, 6); // 추가하기
  assert.deepStrictEqual(queue.toArray(), [6, 5, 2]);
  queue.print();

  assert.strictEqual(queue.peek, 2); // [6, 5, 2] ==>
  assert.strictEqual(queue.poll, 2); // [6, 5]
  assert.strictEqual(queue.remove(), 5); // [6]
  assert.deepStrictEqual(queue.toArray(), [6]);

  queue.clear();
  assert.deepStrictEqual(queue.toArray(), []);
  assert.strictEqual(queue.isEmpty, true);

  const queue2 = new Queue(1, 2);
  assert.deepStrictEqual(queue2.toArray(), [2, 1]);

  // iterator 연습문제
  console.log([...stack], [...queue]);
  for (const s of stack) console.log(s);
  for (const q of queue) console.log(q);
  const itStack = stack[Symbol.iterator](); // 또는 const itStack = stack.iterator();
  console.log(itStack.next());
  console.log(itStack.next());
  // const itQueue = queue.iterator();
  // console.log(itQueue.next());

  stack2.push(1, 2, 2, 4, 5);
  assert.deepStrictEqual(stack2.toArray(), [1, 2, 2, 4, 5]);
  assert.deepStrictEqual([...stack2], [1, 2, 2, 4, 5]);

  //...

  queue.enqueue(2, 5, 6);
  assert.deepStrictEqual(queue.toArray(), [6, 5, 2]);
  assert.deepStrictEqual([...queue], [6, 5, 2]);

  const itStack2 = stack.iterator();
}

ex03();
