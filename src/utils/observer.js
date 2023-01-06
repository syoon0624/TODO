let currentObserver = null;

export const observe = (fn) => {
  currentObserver = fn;
  fn();
  currentObserver = null;
};

export const observable = (state) => {
  Object.keys(state).forEach((key) => {
    let _value = state[key];
    const observers = [];

    Object.defineProperty(state, key, {
      get() {
        if (currentObserver) observers.push(currentObserver);
        return state;
      },
      set(value) {
        _value = value;
        observers.forEach((observer) => observer());
      },
    });
  });
  return state;
};
