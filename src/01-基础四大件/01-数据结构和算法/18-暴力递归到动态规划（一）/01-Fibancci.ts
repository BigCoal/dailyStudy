// Fibancci : F(N)=F(N-1)+F(N-2) 已知第1项和第二项都是1

export function Fibancci1(N: number): number {
  if (N == 1 || N == 2) {
    return 1;
  } else {
    return Fibancci1(N - 1) + Fibancci1(N - 2);
  }
}

export function Fibancci2(N: number, cacheMap: Map<number, number>): number {
  if (cacheMap.has(N)) {
    return cacheMap.get(N);
  }
  let val = 1;
  if (N == 1 || N == 2) {
    val = 1;
  } else {
    val = Fibancci2(N - 1, cacheMap) + Fibancci2(N - 2, cacheMap);
  }
  cacheMap.set(N, val);
  return val;
}
console.time("Fibancci2");
console.log(Fibancci2(50, new Map()));
console.timeEnd("Fibancci2");
console.time("Fibancci1");
console.log(Fibancci1(50));
console.timeEnd("Fibancci1");
