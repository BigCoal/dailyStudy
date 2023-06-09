// 在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组，求出这个数组中的逆序对的总数。

// 输入: [7,5,6,4]
// 7,5; 7,6; 7,4; 5,4; 6,4
// 输出: 5
//思路：求比某个位置大的前面的数

function mergeSort4(arr: number[], L: number, R: number): number {
  if (L === R) {
    return 0;
  }
  const mid = L + ((R - L) >> 1);

  return (
    mergeSort4(arr, L, mid) +
    mergeSort4(arr, mid + 1, R) +
    merge4(arr, L, mid, R)
  );
}

function merge4(arr: number[], L: number, mid: number, R: number) {
  let LIndex = L;
  let RIndex = mid + 1;
  const newArr = new Array(R - L + 1);
  let newIndex = 0;
  let num = 0;
  while (LIndex <= mid && RIndex <= R) {
    if (arr[LIndex] <= arr[RIndex]) {
      newArr[newIndex++] = arr[LIndex++];
    } else {
      //左侧还剩几个数
      const LNum = mid - LIndex + 1;
      num += LNum;
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
  //   const arr = [7, 5, 6, 4];
  const arr = [6, 6, 6, 7, 6, 6, 7];
  const sum = mergeSort4(arr, 0, arr.length - 1);
  console.log(arr);
  console.log(sum);
}
