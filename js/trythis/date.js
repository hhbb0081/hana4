// 평가 문제

const moment = require("moment");
const assert = require("assert");

function ex01() {
  // #1
  console.log(Math.abs(moment("1970-01-01").diff(moment("1970-01-02"), "s")));

  // -----------------------------

  const d1 = new Date("1970-01-01T00:00:00.000Z");
  const d2 = new Date("1970-01-02T00:00:00.000Z");
  const time = d2.getTime() - d1.getTime();
  console.log(time);
  assert.strictEqual(time, 86400);

  // #2
  const dateRand = Array.from(
    { length: 5 },
    () => 1 + Math.floor(moment(new Date()).daysInMonth() * Math.random())
  ).sort((a, b) => a - b);
  console.log(
    "🚀 ~ ex01 ~ dateRand:",
    dateRand.sort((a, b) => a - b)
  );

  // ---------------------------------

  const d = new Date();
  d.setMonth(d.getMonth() + 1);
  d.setMonth(0);
  const lastDate = d.getDate();
  let randDates = [];
  do {
    const rdate = rand(1, lastDate);
    if (!randDates.includes(rdate)) randDates.push(rdate);
  } while (randDates.length < 5);
  const r1 = Array(5)
    .fill(0)
    .map(() => rand(1, lastDate));
  console.log(d.getDate(), r1);

  // #3
  console.log(moment(new Date("2025-09-03")).format("dddd"));

  // -----------------------------

  const now = new Date();
  const nextYear = d.setFullYear(now.getFullYear() + 1);
  const nextYearWeek = "일월화수목금토"[nextYear.getDay()];
  console.log("🚀 ~ ex01 ~ nextYearWeek:", nextYearWeek);

  // #4
  console.log(moment().add(100, "d").format("YYYY년 MM월 DD일"));

  // ----------------------------

  const after100 = new Date();
  after100.setDate(after100.getDate() + 100);
}

// ex01();

function cal() {
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

  console.log(moment().daysInMonth());
  console.log(moment().date(1).day());
  console.log(moment().subtract(1, "month").date(1).day());
  const day = moment().date(1).day(); // 이번달 1일의 요일
  console.log(moment().format("YYYY년 MM월").padStart(15, " "));
  const dayCnt = moment().daysInMonth(); // 이번달 일수
  [..."일월화수목금토"].forEach((d) => {
    process.stdout.write(d.padStart(2, " ")); // 줄 바꿈 없이 출력
  });
  console.log("");
  for (let j = 0; j < dayCnt / 7 + 1; j++) {
    Array.from({ length: dayCnt }, (_, i) => i + 1)
      .filter((_, i) => Math.floor((i - day) / 7) === j)
      .forEach((d) => {
        // if (d === moment(new Date()).format("D"))
        process.stdout.write(String(d).padStart(3, " "));
      });
    console.log("");
  }
}

cal();
