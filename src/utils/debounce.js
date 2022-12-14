// debounce 함수
const debounce = (func, delay = 0) => {
  let inDebounce;
  return function (...rest) {
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(this, rest), delay);
  };
};

export { debounce };
