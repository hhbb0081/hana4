// 평가 문제

import { useCallback, useEffect, useRef } from "react";

type TimerFn = typeof setTimeout | typeof setInterval;
type ClearFn = typeof clearTimeout | typeof clearInterval;

// eslint-disable-next-line no-unused-vars
function useTimer<T extends (...args: Parameters<T>) => ReturnType<T>>(
  this: { timerFn: TimerFn; clearFn: ClearFn },
  cb: T,
  delay: number,
  ...args: Parameters<T>
) {
  const cbRef = useRef(cb);
  const argsRef = useRef(args);
  const timerRef = useRef<ReturnType<typeof this.timerFn>>();

  const { timerFn, clearFn } = this;
  const setup = useCallback(() => {
    timerRef.current = timerFn(cbRef.current, delay, ...argsRef.current);
  }, [delay, timerFn]);
  const clear = useCallback(() => clearFn(timerRef.current), [clearFn]);
  const reset = useCallback(() => {
    clear();
    setup();
  }, [clear, setup]);

  useEffect(() => {
    setup();
    return clear;
  }, [setup, clear]);

  return { reset, clear };
}

// useTimer의 this와 bind
export const useTimeout = useTimer.bind({
  timerFn: setTimeout,
  clearFn: clearTimeout,
});
export const useInterval = useTimer.bind({
  timerFn: setInterval,
  clearFn: clearInterval,
});

// export function useDebounce<
//   T extends (...args: Parameters<T>) => ReturnType<typeof setTimeout>,
// >(cb: T, delay: number, ...args: Parameters<T>) {
//   const { reset, clear } = useTimeout(cb, delay, args);
//   // let timer: NodeJS.Timeout;

//   return (...args: Parameters<T>) => {
//     let timer = clear();
//     reset();
//     // return useTimeout;
//   };
// }

// eslint-disable-next-line no-unused-vars
export const useDebounce = <T extends (...args: unknown[]) => ReturnType<T>>(
  cb: T,
  delay: number,
  depArr: unknown[] = []
) => {
  // # 1
  // [...depArr] => 은 input 값이기 때문에 이 값을 의존성으로 주입하면 값이 변할 때만 reset이 실행됨.
  // reset은 clear 먼저 하고 setup하기 때문에 return 할 필요 없음 (생성될 때 clear 먼저 함) => 근데? clear 하는게 더 깔끔할 듯
  // setInterval은 clear 해줘야 함
  const { reset, clear } = useTimeout(cb, delay);
  useEffect(() => {
    reset();
    return clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...depArr, delay]);

  // # 2
  // const cbRef = useRef(cb);
  // const argsRef = useRef(args);
  // const timerRef = useRef<ReturnType<typeof setTimeout> | number>();

  // useEffect(() => {
  //   if (timerRef.current) clearTimeout(timerRef.current);
  //   timerRef.current = setTimeout(cbRef.current, delay);

  //   return () => clearTimeout(timerRef.current);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [...depArr, delay]);
};
