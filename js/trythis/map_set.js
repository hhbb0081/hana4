function ex01() {
  const assert = require("assert");

  const hrTeam = { id: 1, dname: "인사팀" }; // 홍길동 (인사팀)
  const devTeam = { id: 2, dname: "개발팀" };
  const depts = [hrTeam, devTeam];
  const hong = { id: 1, name: "Hong", dept: 1 }; // hong.dept.name ⇒ deptMap.get(hong.dept)?.name
  const kim = { id: 2, name: "Kim", dept: 2 };
  const emps = [
    hong,
    kim,
    { id: 3, name: "Park", dept: 2 },
    { id: 4, name: "Choi", dept: 2 },
  ];
  // # 1

  // const deptMap = new Map();
  // for (let i = 0; i < depts.length; i++) {
  //   deptMap.set(i + 1, depts[i]);
  // }

  // const empMap = new Map();
  // for (let i = 0; i < emps.length; i++) {
  //   empMap.set(i + 1, emps[i]);
  // }

  const empDept = new Map();
  for (let i = 0; i < deptMap.size + empMap.size; i++) {
    if (emps[i]) {
      const { id, name } = emps[i];
      empDept.set(
        {
          id: id,
          name: name,
        },
        ...depts.filter((d) => d.id === emps[i].dept)
      );
    }
  }

  // # 2
  const deptMap = new Map(depts.map((dept) => [dept.id, dept]));
  const empMap = new Map(emps.map((emp) => [emp.id, emp]));
  // const empDept = new Map(
  //   [...empMap.values()].map((emp) => [emp, deptMap.get(emp.dept)])
  // );

  console.log("🚀 ~ deptMap:", deptMap);

  console.log("🚀 ~ empMap:", empMap);

  console.log("🚀 ~ empDept:", empDept);

  function getEmp(empId) {
    let result;
    for (const [k, v] of [...empDept]) {
      console.log(k, v);
      if (k.id === empId) {
        const newMap = {
          ...k,
          dept: v,
        };
        result = newMap;
        break;
      }
    }

    // console.log(
    //   [...empDept]
    //     .filter(([_, dept]) => dept.id === deptMap.id)
    //     .map(([emp]) => emp.name)
    // );

    return result;
  }

  getEmp(1);

  assert.deepStrictEqual(getEmp(1), {
    id: 1,
    name: "Hong",
    dept: { id: 1, dname: "인사팀" },
  });
}
// ex01();

function ex02() {
  const assert = require("assert");
  const hong = { id: 1, name: "Hong", dept: "HR" };
  const kim = { id: 2, name: "Kim", dept: "Server" };
  const lee = { id: 3, name: "Lee", dept: "Front" };
  const park = { id: 4, name: "Park", dept: "HR" };
  const ko = { id: 7, name: "Ko", dept: "Server" };
  const loon = { id: 6, name: "Loon", dept: "Sales" };
  const choi = { id: 5, name: "Choi", dept: "Front" };
  const users = [hong, kim, lee, park, ko, loon, choi];

  Array.prototype.uniqBy = function (prop) {
    console.log(prop);
    if (prop) return Array.from(new Set(this.map((uu) => uu[prop])));
    return [...new Set(this)];
  };
  // users.uniqBy = function (key) {
  //   return Array.from(new Set(users.map((uu) => uu[key])));
  // };
  console.log(users.uniqBy("dept")); // [ 'HR', 'Server', 'Front', 'Sales' ]
  assert.deepStrictEqual(users.uniqBy("dept"), [
    "HR",
    "Server",
    "Front",
    "Sales",
  ]);

  const arr = [1, 2, 2, 3, 4, 5, 6, 5];
  console.log(arr.uniqBy());
  assert.deepStrictEqual(arr.uniqBy(), [...new Set(arr)]);
}

ex02();

function ex03() {
  const hong = { id: 1, name: "Hong", dept: "HR" };
  const kim = { id: 2, name: "Kim", dept: "Server" };
  const lee = { id: 3, name: "Lee", dept: "Front" };
  const park = { id: 4, name: "Park", dept: "HR" };
  const ko = { id: 7, name: "Ko", dept: "Server" };
  const loon = { id: 6, name: "Loon", dept: "Sales" };
  const choi = { id: 5, name: "Choi", dept: "Front" };
  const users = [hong, kim, lee, park, ko, loon, choi];
  users.uniqBy("dept");
}

// ex03();
