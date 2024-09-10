function add(a: number, b?: number) {
  if (typeof b === "number") return a + b; // 타입 narrowing
  if (b) return a + b;
  return a;
}

console.log(add(1)); // argument 1개지만 b optional로 수정하면서 실행 가능
console.log(add(1, 2));
// add(1, 'b') // 타입 불일치
// add(1, 2, 3);

// function func(a: number): void;
// function func(a: number, b: number, c: number): void;

// ----------------------------------------------

const introduce2 = (name: string, height: number | undefined) => {
  console.log(`이름 : ${name}`);
  if (typeof height === "number") {
    console.log(`키 : ${height + 10}`);
  }
};

// optional 은 argument가 없어도 되지만 | undefined 타입으로 정의하면 매개변수가 제공되어야 한다.
// introduce2("김현준"); // Error : Expected 2 arguments, but got 1.
introduce2("김현준", undefined); // OK
introduce2("김현준", 170); // OK

// 실제 구현부 -> `구현 시그니처`
// 선택적 매개변수의 위치는 항상 마지막이어야 한다.
// 필수 매개변수 전에 선택적 매개변수를 위치시키면 구문 오류 발생
function func(a: number, b?: number, c?: number) {
  if (typeof b === "number" && typeof c === "number") {
    console.log(a + b + c);
  } else {
    console.log(a * 20);
  }
}

func(1);
func(1, 2, 3);

const introduce4 = (name: string, height = 0) => {
  console.log(`이름 : ${name}`);
  console.log(`키 : ${height + 10}`);
};

introduce4("김현준"); // OK
introduce4("김현준", undefined);
introduce4("김현준", 170);

// introduce4("김현준", "이재현"); 타입 다름

// -----------------------------------------------

const getSum = (...rest: number[]) => {
  let sum = 0;
  rest.forEach((el) => (sum += el));

  const Sum = rest.reduce((acc, cur) => (acc += cur));
  return console.log(sum);
};

getSum(1);
getSum(1, 2, 3);
getSum(1, 2, 3, 4, 5);
getSum();

// 튜플로 개수 지정 (총 3개여야함)
const getSum2 = (a: number, ...rest: [number, number]) => {
  let sum = 0;
  rest.forEach((el) => (sum += el));
  return console.log(sum);
};

// getSum2(3, 2); // OK
getSum2(3, 2, 1); // OK
// getSum2(1, 2, 3, 4, 5);

// -----------------------------------------------

function singSong(songs: string[]) {
  for (const song of songs) {
    console.log(`${song}`);
  }
  return songs.length;
}

function getSongAt(songs: string[], index: number) {
  return index < songs.length ? songs[index] : undefined;
}

function singSongRecursive(songs: string[], count = 0): number {
  return songs.length ? singSongRecursive(songs.slice(1), count + 1) : count;
}

const singSongsRecursive = (songs: string[], count = 0): number =>
  songs.length ? singSongsRecursive(songs.slice(1), count + 1) : count;

// ---------------------------------------------

function getSongRecordingDate(song: string): Date | undefined {
  switch (song) {
    case "Strong Man":
      return new Date("April 20, 2010"); //OK

    case "Painkiller":
    // return "unknown";
    // Error : Type 'string' is not assignable to type 'Date'.
    default:
      return undefined; //OK
  }
}

// ----------------------------------------------------

const songs = ["Juice", "Painkiller", "Candy"];

function runOnSongs(getSongAt: (index: number) => string) {
  for (let i = 0; i < songs.length; i += 1) {
    console.log(getSongAt(i));
    // console.log(`${songs[index]}`)
  }
}
function getSongAtX(index: number) {
  return `${songs[index]}`;
}
runOnSongs(getSongAtX); // OK

function logSong(song: string) {
  return `${song}`;
}
runOnSongs(() => logSong("a"));

// ------------------------------------------------------

// 타입은 string | undefined 유니언을 반환하는 함수
let returnsStringOrUndefined: () => string | undefined;

// 타입은 undefined나 string 을 반환하는 함수
let maybeReturnsString: (() => string) | undefined;

function fail(message: string): never {
  throw new Error(`Invariant Failure : ${message}`);
  // JS는 return undefined; 가 생략
}

function workWithUnsafeParam(param: unknown) {
  if (typeof param !== "string") {
    fail(`param should be a string, not ${typeof param}`);
  }

  // 여기에서 param의 타입은 string으로 알려짐
  param.toUpperCase();
}

function returnVoid() {
  return;
}

let lazyValue: string | undefined;

// lazyValue = returnVoid();

const records: string[] = [];

function saveRecords(newRecords: string[]) {
  newRecords.forEach((record) => records.push(record));
}

saveRecords(["Go", "Walk", "Run"]);

// function logSong(song: string): void {
//   if (!song) {
//     return; // OK!  return undefined; 도 OK!
//   }
//   console.log(`${song}`);

//   // return true; // Error! - Type 'boolean' is not assignable to type 'void'.
// }

// ← void를 반환하도록 선언되었으므로 값 반환을 허용하지 않음.

// But, 다음과 같이 화살표 함수는 구문 오류 없음!

type VoidReturn = () => void;
const test2: VoidReturn = () => 11; // OK!
// test2().toString(); // ?
