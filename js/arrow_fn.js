function p146() {
  globalThis.name = "GloalName";
  this.name = "ModuleName";

  function tf() {
    console.log("11=", self.name); // 선언할 때를 기준으로 하므로 self는 없음 (global에는 self가 없기 때문)
    console.log("12=", this); // this는 global
  }

  const obj = {
    name: "ObjName",
    bark1: function () {
      console.log("1=", this.name);
      const self = this; // OLD version // this는 obj의 주소
      setTimeout(
        function (x) {
          console.log("11=", self.name, x); // ObjName
          console.log("12=", this); // this는 Timer 객체와 바인딩 // Timeout
        },
        1000,
        123
      ); // .bind(this) // 123은 콜백함수의 arg
      console.log("xxxx");
    },
    bark2() {
      // same as bark2: function() {
      console.log("2=", this.name); // this는 obj
      setTimeout(() => {
        console.log("22=", this.name); // this는 obj => setTimeout은 화살표 함수기 때문에 bark2의 env인 obj를 가리킴
      }, 1000);
    },
    bark3() {
      // ⇐⇒ bark3: function() {
      function innerFn() {
        console.log(this); // 일반 함수 => 바인딩 된게 없으므로 global을 가리킴
      }
      innerFn();
    },
    bark4: () => {
      console.log(this.name); // ModuleName => 화살표 함수기 때문에 this는 global, 일반 함수였으면 this는 obj
    }, // bark4의 소유자(obj)의 Lexical Scope의 this
  };

  obj.bark1(); // vs  var x = obj.bark1; // bark1.bind(obj)()
  obj.bark2();
  obj.bark3();
  obj.bark4();
}

function p147() {
  // ⇔ function declareFn(name) {
  const expressFn = function (name) {
    // if, 'use strict' ?
    this.name = name;
    console.log(this, new.target, this.name, name);
  };

  const arrowFn = (name) => {
    this.name = name;
    console.log(this, new.target, this.name, name); // {name: 'afn', age: 33} undefined afn afn
    // new.target이 undefined면 new가 생성된 게 아님
  };

  expressFn("expfn");
  arrowFn("afn");

  const dfn = new expressFn("D");
  const afn = new arrowFn("A"); // error!
}

p147();
