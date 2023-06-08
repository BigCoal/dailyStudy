function mergeSort(arr: number[], L: number, R: number) {
  if (L == R) {
    return arr[L];
  }
  const mid = Math.floor((R - L) / 2) + L;
  mergeSort(arr, L, mid);
  mergeSort(arr, mid + 1, R);
  merge(arr, L, mid, R);
}

function merge(arr: number[], L: number, mid: number, R: number) {
  let LIndex = L;
  let RIndex = mid + 1;

  const LEnd = mid;
  const REnd = R;

  const newArr = new Array(R - L + 1);
  let newArrIndex = 0;

  while (LIndex <= LEnd && RIndex <= REnd) {
    if (arr[LIndex] <= arr[RIndex]) {
      newArr[newArrIndex++] = arr[LIndex++];
    } else {
      newArr[newArrIndex++] = arr[RIndex++];
    }
  }

  while (LIndex <= LEnd) {
    newArr[newArrIndex++] = arr[LIndex++];
  }
  while (RIndex <= REnd) {
    newArr[newArrIndex++] = arr[RIndex++];
  }

  for (let i = 0; i < newArr.length; i++) {
    arr[L + i] = newArr[i];
  }
}
if (require.main === module) {
  const arr = [9, 3, 6, 1, 23, 45, 12, 4, 6];
  mergeSort(arr, 0, arr.length - 1);
  console.log(arr);
}
