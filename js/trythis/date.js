const moment = require("moment");

function ex01() {
  // #1
  console.log(Math.abs(moment("1970-01-01").diff(moment("1970-01-02"), "s")));

  // #2
  const dateRand = [];
  for (let i = 0; i < 5; i++) {
    dateRand.push(1 + Math.floor(30 * Math.random()));
  }
  console.log(
    "🚀 ~ ex01 ~ dateRand:",
    dateRand.sort((a, b) => a - b)
  );

  // #3
  console.log(moment(new Date("2025-09-03")).format("dddd"));

  // #4
  console.log(moment().add(100, "d").format("YYYY년 MM월 DD일"));
}

// ex01();

function cal() {
  console.log(moment(new Date()).format("YYYY년 MM월"));
  console.log(moment(new Date()).daysInMonth());
  const dayCnt = moment(new Date()).daysInMonth();
  [..."일월화수목금토"].forEach((d) => {
    process.stdout.write(`${d}  `);
  });
  for (let j = 0; j < dayCnt / 7 + 1; j++) {
    Array.from({ length: dayCnt }, (_, i) => i + 1)
      // .filter(dd => )
      .forEach((d) => {
        process.stdout.write(`${3 - String(d).length}${d}`);
      });
  }
}

cal();
