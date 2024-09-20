import { HelloType } from "../types/props";

function Hello({ name, age, count, plusCount, minusCount }: HelloType) {
  return (
    <>
      <div>
        Hello, {name}! ({age})
      </div>
      <div>
        <span onClick={minusCount}>-</span>
        <span>{count}</span>
        <span onClick={plusCount}>+</span>
      </div>
    </>
  );
}

export default Hello;
