function exist(arr, num) {
  let L = 0;
  let R = arr.length - 1;
  while (L <= R) {
    const mid = ((R - L) >> 1) + L;
    if (arr[mid] == num) {
      return true;
    } else if (arr[mid] > num) {
      R = mid - 1;
    } else if (arr[mid] < num) {
      L = mid + 1;
    }
  }
  return false;
}

if (require.main == module) {
  const arr = [1, 3, 4, 6, 7, 8, 12, 15, 18, 22];
  console.log(exist(arr, 22));
}
