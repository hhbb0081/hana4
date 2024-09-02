function f() {
  console.log("f>>", this.name);
}

f();

f.bind({ name: "Binding" })();
f.call({ name: "Binding" });
