function ex00() {
  const arr = [1, 2];
  [arr[0], arr[1]] = [arr[1], arr[0]];
  console.log(arr);

  const hong = { id: 1, name: "Hong" };
  const lee = { id: 2, name: "Lee" };

  // 호이스팅 관련 예제

  // let r = q * 10;
  // let q = 1;
  // console.log(r, q);

  let rr;
  let qq;
  rr = qq * 10;
  qq = 1;
  console.log(rr, qq);
}

function ex01() {
  function f1(user) {
    console.log("🚀 id:", user.id, " name:", user.name);
    const { id, name } = user;
    console.log("🚀 id:", id, " name:", name);
  }

  function f2({ id, name }) {
    console.log("🚀 id:", id, " name:", name);
  }

  const f3 = ({ id, name }) => console.log("🚀 id:", id, " name:", name);

  f1(hong);
  f2(lee);
  f3(hong);
}

// ex01();

function ex02() {
  const user = {
    id: 1,
    name: "Hong",
    passwd: "xxx",
    addr: "Seoul",
  };

  // delete user.passwd; // 이 방식은 비순수함수가 되기 때문에 새로운 변수에 할당해서 지워야함
  const userInfo = { ...user };
  delete userInfo.passwd;
  // const { passwd, ...userInfo } = user;
  console.log(userInfo);
}

// ex02();

function ex03() {
  const arr = [[{ id: 1 }], [{ id: 2 }], [{ id: 3 }]];
  const [[{ id: id1 }], [{ id: id2 }], [{ id: id3 }]] = arr;
  console.log(id1, id2, id3);
}

// ex03();

function ex04() {
  const user = { name: "Hong", passwd: "xyz", addr: "Seoul" };
  function getValueExceptInitial(k) {
    // const { [k]: val } = user;
    if (typeof val !== "string") return;

    const [, ...result] = [...val];
    return result.join("");
  }
  console.log(getValueExceptInitial("name")); // 'ong'
  console.log(getValueExceptInitial("passwd")); // 'yz'
  console.log(getValueExceptInitial("addr")); // 'eoul'
}

// ex04();

function ex05() {
  user.f = function () {
    console.log("🚀 ~ ex05 ~ f:", user.name);
  };
}

function getDiffMillis(dt1, dt2) {
  const { getTime: getTime1 } = new Date(dt1);
  const { getTime: getTime2 } = new Date(dt2);
  return getTime1.bind(d1)() - getTime2.bond(d2)();
}
getDiffMillis("2021-01-01", "2021-01-02");
