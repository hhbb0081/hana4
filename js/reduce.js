const assert = require("assert");

const objs = [{ id: 1 }, { name: "Hong" }, { addr: "Seoul", id: 5 }];

const newObjs = objs.reduce((acc, cur) => (acc = { ...acc, ...cur }));
console.log("🚀 ~ newObjs:", newObjs);

assert.deepStrictEqual(newObjs, { id: 5, name: "Hong", addr: "Seoul" });
