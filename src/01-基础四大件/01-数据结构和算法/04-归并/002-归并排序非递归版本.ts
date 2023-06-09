function mergeSort2(arr: number[]) {
  let step = 1; //步长
  const len = arr.length;
  while (step < len) {
    let L = 0;
    let R = L + step * 2 - 1;
    let mid = L + Math.floor((R - L) / 2);
    const lastIndex = len - 1;
    //左右都有数据段的时候
    while (mid < lastIndex) {
      R = Math.min(R, lastIndex);
      merge2(arr, L, mid, R);
      L = L + step * 2;
      R = L + step * 2 - 1;
      mid = L + Math.floor((R - L) / 2);
    }
    //防止溢出
    if (step > len / 2) {
      break;
    }
    step = step * 2;
  }
}

function merge2(arr: number[], L: number, mid: number, R: number) {
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
  mergeSort2(arr);
  console.log(arr);
}
