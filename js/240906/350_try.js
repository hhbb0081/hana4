const assert = require("assert");

const vals = [1, 2, 3];
const randTime = (val) =>
  new Promise((resolve) => {
    console.log(resolve, val);
    setTimeout(resolve, Math.random() * 1000, val);
  });

const promiseAllAsync = async (promises) => {
  // const results = [];
  // let cntToRun = promises.length;
  // try {
  //   for (let i = 0; i < promises.length; i++) {
  //     const res = await promises[i];
  //     console.log("🚀 ~ promiseAllAsync ~ e:", res);
  //     results[i] = res;
  //     cntToRun--;
  //     if (cntToRun === 0) randTime(results);
  //   }
  // } catch (err) {
  //   console.error(err);
  // }

  const results = [];
  let idx = 0;
  for (const promise of promises) {
    results[idx++] = await promise;
  }
  for await (const promise of promises) {
    results[idx++] = promise;
  }

  return results;
};

async function fetchPromise() {
  try {
    const promiseRes = await promiseAllAsync([
      randTime(1),
      randTime(2),
      randTime(3),
    ]);

    console.table(promiseRes);
    assert.deepStrictEqual(promiseRes, vals);
  } catch (err) {
    console.error(err);
  }
}

fetchPromise();
// promiseAllAsync([randTime(11), Promise.reject("RRR"), randTime(33)])
//   .then((array) => {
//     console.log("여긴 과연 호출될까?!");
//   })
//   .catch((error) => {
//     console.log("reject!!!!!!>>", error);
//   });
