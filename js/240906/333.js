// PromiseAll 구현하기
const assert = require("assert");
const vals = [1, 2, 3];
const randTime = (val) =>
  new Promise((resolve) => {
    console.log(resolve, val);
    setTimeout(resolve, Math.random() * 1000, val);
  });

// const promiseAll = (...prop) => {
//   console.log("🚀 ~ promiseAll ~ args:", prop.map(randTime));
//   let arr = [];
//   prop.forEach((p) =>
//     p
//       .then((res) => {
//         console.log(res);
//         arr.push(res);
//         resolve(res);
//       })
//       .catch(console.error)
//   );
// };

const promiseAll = (promises) =>
  new Promise((resolve, reject) => {
    const results = [];
    let cntToRun = promises.length;
    for (let i = 0; i < promises.length; i++) {
      promises[i]
        .then((succ) => {
          results[i] = succ;
          cntToRun--;
          if (cntToRun === 0) resolve(results);
        })
        .catch(reject);
    }
  });

promiseAll([randTime(1), randTime(2), randTime(3)])
  .then((arr) => {
    // console.log("🚀 ~ .then ~ arr:", arr);
    console.table(arr);
    assert.deepStrictEqual(arr, vals);
  })
  .catch(console.error);

// promiseAll([randTime(11), Promise.reject("RRR"), randTime(33)])
//   .then((array) => {
//     console.log("🚀 ~ .then ~ array:", array);
//     console.log("여긴 과연 호출될까?!");
//   })
//   .catch((error) => {
//     console.log("reject!!!!!!>>", error);
//   });
