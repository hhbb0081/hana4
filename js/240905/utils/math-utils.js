export const dateRand = Array.from(
  { length: 5 },
  () => 1 + Math.floor(moment(new Date()).daysInMonth() * Math.random())
).sort((a, b) => a - b);
console.log(
  "🚀 ~ ex01 ~ dateRand:",
  dateRand.sort((a, b) => a - b)
);
