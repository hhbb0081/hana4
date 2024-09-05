const assert = require("assert");

// Stack, Queue, ArrayList
export class Collection {
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
export class Stack extends Collection {
  pop() {
    return this._arr.pop();
  }
}

export class Queue extends Collection {
  enqueue(...args) {
    this.push(...args);
    return this._arr;
  }

  dequeue() {
    return this._arr.shift();
  }
}

export class ArrayList {
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
