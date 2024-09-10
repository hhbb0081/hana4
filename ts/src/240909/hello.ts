const myName: string = "Senior Coding"; // global에 name이 있기 때문에 name은 불가
const myAge: number = 33;
console.log(`Hello, ${myName}`);

let x: number | string;
x = 1;
console.log("🚀 ~ x:", x);
x = "abc";
console.log("🚀 ~ x:", x);

const len = x.length;

type User = {
  id: number;
  name: string;
  age: number;
  address: string;
};
let hong: User;

const something = ({
  id,
  name,
  age,
  address,
}: {
  id: number;
  name: string;
  age: number;
  address: string;
}) => {
  // Do something...
  const hong = {
    id,
    name,
    age,
    address,
  };
  console.log("🚀 ~ hong:", hong);
};

// type Member = {
//   name: string;
//   addr: string;
//   discountRate: number;
// };
// type Guest = {
//   name: string;
//   age: number;
// };

// const member: Member = {
//   name: "홍길동",
//   addr: "용산구",
//   discountRate: 0.1,
// };
// const guest: Guest = {
//   name: "김길동",
//   age: 28,
// };
// const who: Member;

// who.name = "마길동"; // OK 접근 가능

// // Error! Property 'discountRate' does not exist on type 'Member | Guest'.
// //  Property 'discountRate' does not exist on type 'Guest'.
// const price = 10000 - 10000 * who.discountRate;

type Member = {
  name: string;
  spend: number[];
  addr: string;
  discountRate: number;
};
type Guest = {
  name: string;
  spend: number;
  age: number;
};

const member: Member = {
  name: "hong",
  spend: [1000, 30000, 50000], // number[]
  addr: "yong",
  discountRate: 0.1,
};
const guest: Guest = {
  name: "kim",
  spend: 5500, // number
  age: 28,
};

const who = Math.random() > 0.5 ? member : guest;

let totalAmount: number;
if (typeof who.spend !== "number") {
  // who.spend === number[]
  totalAmount = who.spend.reduce((s, c) => s + c, 0);

  // who.discountRate;
  // 조건문을 통해서 who.spend가 number[] 타입임을 알았다고 해도 다른 타입이 일치한다는 보장이 없기 때문에 에러를 발생시킴.
  // 이 에러를 해결하기 위해서는 타입 단언 또는 타입 추론을 이용해야 함
} else {
  totalAmount = who.spend;
}
// who.spend.reduce((s, c) => s + c, 0); // Error!!
