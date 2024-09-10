const { execSync } = require("child_process");

execSync("sleep 2");

const afterTime = async (val) => {
  return await setTimeout(() => {
    console.log(val);
    return val;
  }, 1000);
};

const mapResult = [1, 2, 3].map(async (val) => {
  const r = await afterTime(val);
  console.log(r);
  return r;
});
console.log("mapResult=", mapResult);

const odds = [1, 2, 3].filter(async (val) => {
  const r = await afterTime(val);
  console.log(r);
  return r % 2 === 1;
});
console.log("odds=", odds);

const ps = [1, 2, 3].map(afterTime);
Promise.all(ps);

const rrr = (await Promise.all(ps)).filter((n) => n % 2);

const r1 = await afterTime(1);

function f1() {}

async function sleep(n) {
  await new Promise((resolve) => setTimeout(resolve, n * 1000));
}
