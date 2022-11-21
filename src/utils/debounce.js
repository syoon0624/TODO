// debounce 함수
export default (func, delay = 0) => {
  let inDebounce;
  return function (...rest) {
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(this, rest), delay);
  };
};
