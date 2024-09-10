const afterTime = (sec) =>
  new Promise((resolve) => setTimeout(resolve, sec * 1000, sec));
console.time("for-await-of");
const arr = [afterTime(1), afterTime(2)];

for (const fo of arr.values()) {
  console.log("fo=", await fo);
}

for await (const fao of arr.values()) {
  console.log("fao=", fao);
}

console.timeEnd("for-await-of");

const rf1 = f1();
const rf2 = await f2();

function layout() {
  (async () => {
    const r3 = await afterTime(1);
    console.log("🚀 ~ r3:", r3);
  })();
}
layout();
