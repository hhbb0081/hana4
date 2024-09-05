this.n = "M";
globalThis.n = "G";

const Cat = (n) => {
  this.bark1 = function () {
    return this.n;
  };
  this.bark2 = () => this.n;
};
c = Cat("x");
c.bark1();
c.bark2();
