// 주석
const R = 1,
  W = 2,
  E = 4; // 0b001, 0b010, 0b100
let auth = parseInt("011", 2);
console.log("🚀 ~ auth:", auth);
console.log("auth-bin >> ", `0b0${auth.toString(2)}`);
const hasWriteAuth = !!(auth & W);
console.log("🚀 ~ hasWriteAuth:", hasWriteAuth);
const hasExeAuth = !!(auth & E);
console.log("🚀 ~ hasExeAuth:", hasExeAuth);
const hasReadAndExeAuth = !!(auth & (R | E));
console.log("🚀 ~ hasReadAndExeAuth:", hasReadAndExeAuth);
auth = auth ^ E; // XOR
console.log("🚀 ~ auth:", auth);
