function ex01() {
  function once(f, rebirthDelay = 1000) {
    let isFirst = true;
    return function (x, y) {
      if (isFirst) {
        isFirst = false;
        // setTimeout(() => (this.isFirst = true), rebirthDelay);
        return f.bind(this)(x, y); // f.apply(this, args); // this를 bind 해줘야 함
      }
    };
  }

  // function once(f, rebirthDelay = 1000) {
  //   let done = false;
  //   return (...args) =>
  //     !done &&
  //     setTimeout(() => (done = !done), rebirthDelay) &&
  //     ((done = true), f(...args));
  // }

  // const fn = once((x, y) => `금일 운행금지 차량은 끝번호 ${x}, ${y}입니다!`);
  // const maxRunCnt = 20;
  // let runCnt = 0;
  // const intl = setInterval(() => {
  //   console.log(fn(3, 8));
  //   if (++runCnt >= maxRunCnt) clearInterval(intl);
  // }, 100);

  const fn = once((x, y) => `금일 운행금지 차량은 끝번호 ${x}, ${y}입니다!`);
  console.log(fn(1, 6)); // 금일 운행금지 차량은 끝번호 1, 6입니다!
  console.log(fn(2, 7)); // undefined
  console.log(fn(3, 8)); // undefined

  // function fivePart(x, y) {
  //   console.log(x, y, this);
  //   return `fivePart ${x}, ${y}, id: ${this.id}`;
  // }
  // const fn = once(fivePart.bind({ id: 11 }));
  // console.log(fn(1, 2));
  // console.log(fn(1, 2));
  // const fn2 = once(fivePart);
  // console.log(fn2.bind({ id: 22 })(3, 4));
}

// ex01();

function ex02() {
  const before = () => console.log("before....");
  const after = () => console.log("after...");

  const someFn = (name, greeting) => console.log(`${greeting}, ${name}`);
  const someFn2 = (id, nickname, email, level) =>
    console.log(`${id}/${nickname}/${email}/${level}`);

  const template =
    (f) =>
    async (...args) => {
      before();
      const res = f(...args);
      after();
      return res;
    }; // 코드를 완성하세요.

  const temp = template(someFn); // before → someFn → after 실행
  const temp2 = template(someFn2); // before → someFn2 → after 실행

  temp("sico", "hello");
  temp2(1, "sico", "sico@gmail.com", 5);
  console.log(
    "square of 7 =",
    template((n) => {
      console.log(n ** 2);
      return n ** 2;
    })(7)
  );
}

// ex02();

function ex03() {
  const weeks = ["일", "월", "화", "수", "목", "금", "토"];

  const counter = (function () {
    let widx = -1;
    return {
      inc(n) {
        widx += n;
      },
      getIdx() {
        return widx;
      },
      setIdx(n) {
        widx = n;
      },
    };
  })();

  const getNextWeek = (() => {
    let widx = -1;
    return () => {
      const tmpIdx = counter.getIdx();
      if (tmpIdx >= weeks.length) counter.setIdx(0);
      return `${weeks[tmpIdx]}요일`;
    };
  })();

  let cnt = 0;
  const intl = setInterval(() => {
    // counter.inc(2); // side-effect!
    console.log("call", cnt, getNextWeek());
    if ((cnt += 1) === 8) clearInterval(intl);
  }, 500);
}

ex03();
