const user = {
  "": 1,
  " ": 1, // 'id': 1, '0y': 2 모두 OK!
  123: 1, // user[123], user['123'] OK, but user.123 is SyntaxError!!
  [12345n]: 2, // user[12345], user[12345n], user['12345'] OK, but user['12345n'] is undefined!
  true: 1, // OK  user[true]  user.true
  id: 2,
  [`name`]: "Hong", // But, `name`: 'Hong'은 SyntaxError: Unexpected template string!
  [Symbol()]: "Hong", // OK But, Symbol(): 'Hong'은 SyntaxError: Unexpected token ':'
  [`${new Date()}`]: 365, // OK! 'Sun Jul …': 365
  "my-friends": ["Han", "Kim"],
  getInfo: () => `${this.id}-${this.name}`, // OK! But, this is not user!
  getInfo() {
    return `${this.id}-${this.name}`;
  }, // OK! getInfo의 최종 <f.o>
};

console.log(user);

const keys = Object.keys(user);
const keys2 = Reflect.ownKeys(user);
console.log("🚀 ~ keys2:", keys2);
console.log("🚀 ~ keys:", keys);

function entriesWithSymbol(obj) {
  if (!obj || typeof obj !== "object") return [];

  const entriesExceptSymbols = Object.entries(obj);
  const onlySymbolKeys = Object.getOwnPropertySymbols(obj);
  for (const sym of onlySymbolKeys) {
    entriesExceptSymbols.push([sym, obj[sym]]);
  }

  return entriesExceptSymbols;
}

console.log(
  "🚀 ~ entriesWithSymbol ~ entriesExceptSymbols:",
  entriesExceptSymbols
);
