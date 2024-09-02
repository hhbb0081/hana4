function getDiffMillis(dt1, dt2) {
  const d1 = new Date(dt1);
  const d2 = new Date(dt2);

  const { getTime: getTime1 } = d1; // this 유실 => Date 객체여야 하는데 global 객체가 됨
  const { getTime: getTime2 } = d2;
  return Math.abs(getTime1.bind(d1)() - getTime2.apply(d2));
}

Date.prototype.getTime = function () {
  return this.getMilliseconds();
};

getDiffMillis("2021-01-01", "2021-01-02");

class Dog {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  fn() {
    return "FN";
  }

  // static => 정적, 메모리 영역에 들어감
  static sfn() {
    return "SFN";
  }
}
const lucy = new Dog("Lucy"); // 인스턴스는 heap에
const { sfn } = Dog;
const { name: aa, fn: fnnn, getName } = lucy;

console.log(aa, sfn(), fnnn(), getName); // ?
getName().call(lucy); // ?
lucy.getName();
// class의 메소드들은 this가 다르게 정의됨

const obj = {
  name: "Obj",
  getName() {
    console.log("this>>>", this);
    return this.name;
  },
};

const getNameObj = obj.getName;
console.log(getNameObj());
