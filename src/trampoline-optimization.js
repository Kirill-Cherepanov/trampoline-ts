const trampolineInternal = (fn) => {
  while (typeof fn == 'function') fn = fn();
  return fn;
};

const trampoline = (makeFn) => {
  // prettier-ignore
  const fn = makeFn((...args) => () => fn(...args));
  return (...args) => trampolineInternal(fn(...args));
};

const factorial = trampoline(
  (fn) =>
    (n, a = 1) =>
      n == 0 ? a : fn(n - 1, n * a)
);
