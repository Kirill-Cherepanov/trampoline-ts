type Thunk<T> = () => T;
type AnyFn = (...args: any[]) => any;
type MirrorFn<T extends AnyFn> = (...args: Parameters<T>) => ReturnType<T>;

const isFunction = (fn: unknown): fn is AnyFn => typeof fn === 'function';

const trampolineInternal = <T>(fn: T | Thunk<T>): T => {
  while (isFunction(fn)) fn = fn();
  return fn;
};

export const trampoline = <T extends AnyFn>(makeFn: (fn: MirrorFn<T>) => T): MirrorFn<T> => {
  const fn: T = makeFn((...args) => (() => fn(...args)) as ReturnType<T>);
  return (...args) => trampolineInternal(fn(...args));
};
