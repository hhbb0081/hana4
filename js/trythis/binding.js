// const dog = {
//   name: "Maxx",
//   showMyName() {
//     // # 1
//     console.log(`My name is ${this.name}.`);

//     // # 2
//     return () => console.log(`My name is ${this.name}.`);
//   },
//   whatsYourName() {
//     // # 1
//     setTimeout(this.showMyName, 1000);
//     setTimeout(() => this.showMyName(), 1000);

//     // # 2
//     setTimeout(this.showMyName(), 1000);
//   },
// };

// dog.whatsYourName();

const dog = {
  name: "Maxx",
  showMyName() {
    console.log(`My name is ${this.name}.`);
  },
  whatsYourName() {
    const self = this; // es5에 유행
    setTimeout(() => this.showMyName(), 1000);
    setTimeout(function () {
      self.showMyName();
    }, 1000);
    setTimeout(this.showMyName.bind(this), 1000);
  },
};

dog.whatsYourName();

globalThis.id = "Global_ID";
this.id = "Module_ID";

const obj = {
  id: 123,
  f: function () {
    console.log("obj > f =", this.id);
  },
  af: () => console.log("obj > af =", this.id),
  subObj: {
    id: 999,
    f: function () {
      console.log("obj > subObj > f =", this.id);
    },
    af: () => console.log("obj > subObj > af =", this.id),
  },
};

obj.f();
obj.af();

obj.subObj.f();
obj.subObj.af();

// window.addEventListener("load", (event) => {
//   document.getElementById("button").addEventListener("click", (event) => {
//     console.log(event.currentTarget); // (가)
//   });

//   console.log("The End"); // (다)
// });

for (let i = 0; i < 5; i += 1) {
  // ⇒ ⇒ ⇒
  setTimeout(console.log, 100, i); // (나)
  // ⇐⇒ setTimeout((i) => console.log(i), 100);
}
