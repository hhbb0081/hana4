// mods/C.js
import { afn } from "./A.js";
import { b, callDepth } from "./B.js";

console.log("cccc");

export function c(depth = 0) {
  console.log(`${callDepth(depth)}C-c`);
  b(depth + 1);
}
export default (depth = 0) => {
  console.log(`${callDepth(depth)}C-def`);
  afn();
};
