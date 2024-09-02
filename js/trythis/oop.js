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
  const hong = { id: 1, name: "Hong" };
  const kim = { id: 2, name: "Kim" };
  const lee = { id: 3, name: "Lee" };
  const users = [hong, lee, kim];

  users.mapBy = function (col) {};

  const arr = [1, 2, 3, 4, 5]; // arr.firstObject; // 1    arr.lastObject; // 5
  assert.deepStrictEqual(users.mapBy("id"), [1, 3, 2]);
  assert.deepStrictEqual(users.mapBy("name"), ["Hong", "Lee", "Kim"]);
  assert.deepStrictEqual(users.filterBy("id", 2), [kim]);
  assert.deepStrictEqual(users.rejectBy("id", 2), [hong, lee]);
  assert.deepStrictEqual(users.findBy("name", "Kim"), kim);
  assert.deepStrictEqual(users.sortBy("name"), [hong, kim, lee]);
  assert.deepStrictEqual(users.sortBy("name:desc", [lee, kim, hong]));
  assert.deepStrictEqual(users.firstObject, hong);
  assert.deepStrictEqual(users.lastObject, kim);
  users.lastObject = lee;
  assert.deepStrictEqual(users.firstObject, lee);
  users.lastObject = hong;
  assert.deepStrictEqual(users.lastObject, hong);
}

ex02();
