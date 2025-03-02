const trampoline = (fn) => {
  while (typeof fn == 'function') fn = fn();
  return fn;
};

const optimizeWithTrampoline = (makeFn) => {
  // prettier-ignore
  const fn = makeFn((...args) => () => fn(...args));
  return (...args) => trampoline(fn(...args));
};

const factorial = optimizeWithTrampoline(
  (fn) =>
    (n, a = 1) =>
      n == 0 ? a : fn(n - 1, n * a)
);
