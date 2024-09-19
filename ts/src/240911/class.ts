interface AgeIsANumber {
  age: number;
  m(): void; // OK
}
interface AgeIsNotANumber {
  age: () => string;
  m(n: number): void;
}

// class AsNumber implements AgeIsANumber, AgeIsNotANumber {
//   age = 0;
//   // Error : Property 'age' in type 'AsNumber' is not assignable to the same property in base type 'AgeIsNotANumber'.
//   // Type 'number' is not assignable to type '() => string'.
// }

// class NotAsNumber implements AgeIsANumber, AgeIsNotANumber {
//   age() {
//     return "";
//   }
//   // Error : Property 'age' in type 'NotAsNumber' is not assignable to the same property in base type 'AgeIsANumber'.
//   // Type '() => string' is not assignable to type 'number'.
// }
