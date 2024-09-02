globalThis.name = "Global Name";

const obj = {
  name: "Obj Name",
  printName() {
    console.log(this.name);
  },
};

const printName = obj.printName;
// obj.printName(); // printName.bind(obj)();
printName();
