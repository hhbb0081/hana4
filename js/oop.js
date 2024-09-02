const obj = { id: 1, name: "Hong" };
// cf. obj = {..., __proto__: { x: 11 }};

console.log(obj.toString);
console.log(
  ((Object.getPrototypeOf(obj) === Object.prototype) ===
    obj.constructor.prototype) ===
    obj.__proto__
);

class Animal {
  // instance(this) + prototpye 생성! (무엇보다 먼저 실행!)
  static id = 1;
  constructor(name) {
    // {name: …}
    this.name = name || super.constructor.name;
  }
}
const dog = new Animal("Dog");
console.log("ok=", Object.keys(obj));
console.log("ak=", Object.keys(dog));
for (let k in dog) console.log("k=", k);
console.log("oh=", obj.hasOwnProperty("id"));
console.log("dh=", dog.hasOwnProperty("id"));

dog.constructor === Animal; // ?
Object.values(dog);
Object.entries(dog);

class Cat extends Animal {
  kukuki() {
    console.log("Kookkkkk");
  }
}
const cat = new Cat("Happy");

const assert = require("assert");

class Emp {
  firstName;
  lastName;
}
const hong = new Emp();
const proxyObj = new Proxy(hong, {
  get(target, prop) {
    // receiver: this binding object
    console.log("proxy.get>>", target, prop);
    if (prop === "fullName") {
      return `${target.firstName} ${target.lastName}`;
    } else {
      return target[prop]?.toUpperCase();
    }
  },

  set(target, prop, value) {
    console.log("proxy.set>>", target, prop, value);
    if (prop === "fullName") {
      const [f, l] = value.split(" ");
      target.firstName = f;
      target.lastName = l;
    } else {
      target[prop] = value;
    }
    return target;
  },
});

proxyObj.fullName = "Nanda Kim";
console.log("proxy>>", proxyObj.fullName);
console.log("proxy>>", proxyObj);
console.log("instance>>", proxyObj instanceof Emp);
g.fullName = "Kildong Hong";
assert.strictEqual(hong.fullName, "Kildong HONG");
hong.fullName = "Lee";
assert.strictEqual(hong.fullName, "Kildong LEE");
