// 在一个数组中，一个数左边比它小的数的总和，叫数的小和，所有数的小和累加起来，叫数组小和。求数组小和。
// 例子： [1,3,4,2,5]
// 1左边比1小的数：没有
// 3左边比3小的数：1
// 4左边比4小的数：1、3
// 2左边比2小的数：1
// 5左边比5小的数：1、3、4、 2
// 所以数组的小和为1+1+3+1+1+3+4+2=16

function mergeSort3(arr: number[], L: number, R: number): number {
  if (L === R) {
    return 0;
  }
  const mid = L + ((R - L) >> 1);

  return (
    mergeSort3(arr, L, mid) +
    mergeSort3(arr, mid + 1, R) +
    merge3(arr, L, mid, R)
  );
}

function merge3(arr: number[], L: number, mid: number, R: number) {
  let LIndex = L;
  let RIndex = mid + 1;
  const newArr = new Array(R - L + 1);
  let newIndex = 0;
  let sum = 0;
  while (LIndex <= mid && RIndex <= R) {
    if (arr[LIndex] < arr[RIndex]) {
      //左右两个数相等的时候一定要放右边的
      //右侧还剩几个数
      const RNum = R - RIndex + 1;
      sum += arr[LIndex] * RNum;
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
  return sum;
}

if (require.main === module) {
  const arr = [1, 3, 4, 2, 5]; //注意相等的情况
  const sum = mergeSort3(arr, 0, arr.length - 1);
  console.log(arr);
  console.log(sum);
}
