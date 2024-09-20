const user = {
  // [1, 2, 3]: 1,
  // id: 1,
  // name: "Hong",
  // addr: { city: "Seoul", road: "길" },
  // [1, 2, 3]
};

const mainField = user.id > 5 ? "name" : "addr";
const { [mainField]: target } = user;
console.log("🚀 ~ mainField:", target);
