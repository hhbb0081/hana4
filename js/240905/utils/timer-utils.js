// 디바운스 & 쓰로틀링 (평가문제 - 타입스크립트로)
export const debounce = (cb, delay) => {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(cb, delay, ...args);
  };
};

export const throttle = (cb, delay) => {
  let timer;
  return (...args) => {
    if (timer) return; // timer가 도는 동안은 이벤트 무시
    timer = setTimeout(() => {
      cb(...args);
      timer = null;
    }, delay);
  };
};
