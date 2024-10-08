// function counter() {
//   let count = 0;
//   return function X() {
//     count += 1;
//     return count;
//   };
// }
// const counter1 = counter();
// console.log("🚀 ~ counter1:", counter1);
// const counter2 = counter();
// console.log(counter1()); // 1
// console.log(counter1()); // 2
// console.log(counter2()); // 1

// const intl = setInterval(() => {
//   console.log("xxx");
//   clearInterval(intl);
// }, 1000);

globalThis.id = "Golobal_ID";
this.id = "Module_ID";

const user = {
  "": 1,
  " ": 1, // 'id': 1, '0y': 2 모두 OK!
  123: 1, // user[123], user['123'] OK, but user.123 is SyntaxError!!
  // 12345n: 2, // user[12345], user[12345n], user['12345'] OK, but user['12345n'] is undefined!
  true: 1, // OK  user[true]  user.true
  id: 2,
  [`name`]: "Hong", // But, `name`: 'Hong'은 SyntaxError: Unexpected template string!
  [Symbol()]: "Hong", // OK But, Symbol(): 'Hong'은 SyntaxError: Unexpected token ':'
  [`${new Date()}`]: 365, // OK! 'Sun Jul …': 365
  "my-friends": ["Han", "Kim"],
  getInfo1: () => `${this.id}-${this.name}`, // OK! But, this is not user!
  getInfo() {
    return `${this.id}-${this.name}`;
  }, // OK! getInfo의 최종 <f.o>
};

console.log(user.getInfo1());
