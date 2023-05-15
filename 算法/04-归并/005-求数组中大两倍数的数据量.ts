// 在一个数组中，
// 对于每个数num，求有多少个后面的数 * 2 依然<num，求总个数

// 比如：[3,1,7,0,2]
// 3的后面有：1，0
// 1的后面有：0
// 7的后面有：0，2
// 0的后面没有
// 2的后面没有
// 所以总共有5个

function mergeSort5(arr: number[], L: number, R: number): number {
  if (L === R) {
    return 0;
  }
  const mid = L + ((R - L) >> 1);

  return (
    mergeSort5(arr, L, mid) +
    mergeSort5(arr, mid + 1, R) +
    merge5(arr, L, mid, R)
  );
}

function merge5(arr: number[], L: number, mid: number, R: number) {
  let LIndex = L;
  let RIndex = mid + 1;
  const newArr = new Array(R - L + 1);
  let newIndex = 0;
  let num = 0;
  let windowR = mid + 1;

  for (let i = L; i <= mid; i++) {
    while (windowR <= R && arr[i] > arr[windowR] * 2) {
      windowR++; //保证R不回退
    }
    num += windowR - (mid + 1);
  }

  while (LIndex <= mid && RIndex <= R) {
    if (arr[LIndex] <= arr[RIndex]) {
      newArr[newIndex++] = arr[LIndex++];
    } else {
      newArr[newIndex++] = arr[RIndex++];
    }
  }
  while (LIndex <= mid) {
    newArr[newIndex++] = arr[LIndex++];
  }
  while (RIndex <= R) {
    newArr[newIndex++] = arr[RIndex++];
  }
  for (let i = 0; i < newArr.length; i++) {
    arr[L + i] = newArr[i];
  }
  return num;
}

if (require.main === module) {
  const arr = [3, 1, 7, 0, 2];
  const sum = mergeSort5(arr, 0, arr.length - 1);
  console.log(arr);
  console.log(sum);
}
