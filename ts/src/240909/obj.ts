// Freshness! 끄는 방법
//  1) 변수 할당
//  2) type casting(type assertion)
//  3) union으로 체크에서 제외시키기

let xuser: { id: number; name: string };
xuser = { id: 1, name: "xx" }; // OK
// xuser = {id: 1}; // Error (Property 'name' missing in type)
// xuser = { id: 1, name: "xx", age: 30 }; // freshness on
const tmp = { id: 1, name: "xx", age: 30 }; // 할당을 통해 freshness off // Error ({id, name, age} is not assignable to type {id,name} )
xuser = tmp;

// strictFunctionTypes = true  (false라면 bivariance)
function f(cb: (input: string | number) => number) {
  return cb(1);
}
function f2(input: string | number | boolean) {
  return 1;
}
function f3(input: string | number) {
  return 1;
}
function f4(input: string) {
  return 1;
}

f(f2); // OK
f(f3); // OK
// f(f4); // strictFunctionTypes가 false라면 OK, 아니면 Fail!

// 타입 별칭(type alias)
type TUser = {
  id: number;
  name: string;
};

type TUser2 = {
  id: number;
  name: string;
  addr?: string;
};

// let hong: TUser;
// hong = {id: 1, name: 'Hong'}; // OK
// hong = {id: 1}; // Error (name property missing)
// hong = {id: 1, name: 'Hong', addr: 'Pusan'}; // Error(not assignable)  Freshness!
// hong = {id: 1, name: 'Hong', addr: 'Pusan'} as TUser; // OK (turn-off Freshness!)

// TUser < TUser2
// const hon: TUser = {id: 1, name: 'Hong', addr: 'Pusan'};  // freshness on
const hon: TUser = { id: 1, name: "Hong" };
const lee: TUser2 = { id: 1, name: "Lee", addr: "Seoul" }; // OK

let tmpUser: TUser = lee;
let partner: TUser = { ...lee, id: 2, name: "Kim" }; // ?
console.log("🚀 ~ partner:", partner); // { id: 2, name: 'Kim', addr: 'Seoul' } // id, name은 덮어씀
// let partner2: TUser = { ...hon, id: 3, addr: "Daejeon" }; // ?
// console.log("🚀 ~ partner2:", partner2);
let friend: TUser = { ...lee }; // ?
console.log("🚀 ~ friend:", friend);
const xxx = { id: 9, addr: "Sokcho" };
// let friend2: TUser = { ...xxx, id: 8 }; // name이 없음

// How to turn-off Freshness

// 1) 변수에 할당(메모리 주소로 사용할 때)
const users = [{ id: 1, name: "Hong", addr: "Seoul" }];
let hong2 = users[0]; // OK
const obj = { id: 1, name: "Hong", addr: "Seoul" };
hong2 = obj; // OK

// 2) 강제로 Type Casting
// hong2 = { id: 1, name: "Hong", addr: "Seoul" } as User;
// cf) Union으로 제외시키기
// u: Member | Guest 일 경우 Member와 Guest의 키는 체크에서 제외!
