//>=3的最左侧位置
function nearestIndex(arr: number[], num: number) {
  let L = 0;
  let R = arr.length - 1;
  let index = -1;
  while (L <= R) {
    const mid = L + ((R - L) >> 1);
    if (arr[mid] <= num) {
      index = mid;
      L = mid + 1;
    } else {
      R = mid - 1;
    }
  }
  return index;
}

if (require.main == module) {
  const arr = [1, 3, 3, 3, 3, 3, 4, 6, 7, 8, 12, 15, 18, 22];
  console.log(nearestIndex(arr, 3));
}
