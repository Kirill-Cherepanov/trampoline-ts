import { trampoline } from '../src';

describe('trampoline', () => {
  it('should compute factorial correctly', () => {
    const factorial = trampoline<(n: number, a?: number) => number>(
      (fn) =>
        (n, a = 1) =>
          n === 0 ? a : fn(n - 1, n * a)
    );

    expect(factorial(0)).toBe(1);
    expect(factorial(1)).toBe(1);
    expect(factorial(5)).toBe(120);
    expect(factorial(10)).toBe(3628800);
  });

  it('should handle large input without stack overflow', () => {
    const factorial = trampoline<(n: number, a?: number) => number>(
      (fn) =>
        (n, a = 1) =>
          n === 0 ? a : fn(n - 1, n * a)
    );

    const largeNumber = 1000000;
    expect(() => factorial(largeNumber)).not.toThrow();
  });

  it('should work with non-recursive functions', () => {
    const identity = trampoline<(x: number) => number>(() => (x) => x);

    expect(identity(42)).toBe(42);
  });

  it('should handle functions with multiple arguments', () => {
    const sum = trampoline<(a: number, b: number, c?: number) => number>(
      (fn) =>
        (a, b, c = 0) =>
          a === 0 ? b + c : fn(a - 1, b, c + 1)
    );

    expect(sum(0, 10)).toBe(10);
    expect(sum(5, 10)).toBe(15);
    expect(sum(10, 20)).toBe(30);
  });

  it('should handle functions with no arguments', () => {
    const constant = trampoline<() => number>(() => () => 42);

    expect(constant()).toBe(42);
  });
});
