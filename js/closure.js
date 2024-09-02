function counter() {
  let count = 0;
  return function X() {
    count += 1;
    return count;
  };
}
const counter1 = counter();
console.log("🚀 ~ counter1:", counter1);
const counter2 = counter();
console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter2()); // 1

const intl = setInterval(() => {
  console.log("xxx");
  clearInterval(intl);
}, 1000);
