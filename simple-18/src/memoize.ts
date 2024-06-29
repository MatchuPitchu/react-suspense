export default function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (!cache.has(key)) {
      cache.set(key, fn(...args));
    }
    return cache.get(key);
  };
}

const memoizeExampleFunc = <TNum extends number>(fn: (num: TNum) => Promise<TNum>) => {
  const cache = new Map<string, Promise<TNum>>();

  return (num: TNum) => {
    const key = JSON.stringify(num);

    if (!cache.has(key)) {
      cache.set(key, fn(num));
    }
    console.log('Cache', cache);

    return cache.get(key);
  };
};

const startPromise = memoizeExampleFunc((num) => {
  return new Promise((resolve) => setTimeout(() => resolve(num), num * 1_000));
});

startPromise(5)?.then((res) => console.log('Result: A', res));
startPromise(1)?.then((res) => console.log('Result: B', res));
setTimeout(
  () => startPromise(5)?.then((res) => console.log('Result: A | triggered later before resolve time', res)),
  4_000
);
setTimeout(
  () => startPromise(5)?.then((res) => console.log('Result: A | triggered later after resolve time', res)),
  10_000
);
