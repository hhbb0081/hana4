function* gener() {
  const x = yield 1;
  const y = yield x + 10;
  console.log("x y =", x, y);
  return x + y;
}
const it3 = gener();
console.log(it3.next()); // { value: 1, done: false }
console.log(it3.next(3)); // { value: 13, done: false }

console.log(it3.next(5));
// x y = 3 5
// { value: 8, done: true }

// class ItDog2 extends Dog {
//   *[Symbol.iterator]() {
//     const names = this.name.split(/,\s?/);
//     for (let i = 0; i < names.length; i++) {
//       yield names[i];
//     }
//   }
// }

// const idog2 = new ItDog2("Toby, Max, Sam");
// for (const d of idog2) console.log(d);

// console.log([...idog2]); // 4회 반복

const array = [1, 2, 3];
const list = {
  value: 1,
  rest: {
    // memory addr (link)
    value: 2,
    rest: {
      value: 3,
      rest: null,
    },
  },
};

const readline = require("readline");
const { stdin: input, stdout: output } = require("process");

const rl = readline.createInterface({ input, output });

rl.question("What do you think of Node.js? ", (answer) => {
  console.log(`Thank you for your valuable feedback: ${answer}`);

  rl.close();
});

rl.on("close", function () {
  process.exit();
});
