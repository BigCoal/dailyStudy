// ; 在一个无序数组中, 值有可能正, 负, 或者零, 数组中任由两个相邻的数一定不相等.
// ; 定义局部最小:
// ; 1.长度为1，arr[0]就是局部最小；
// ; 2.数组的开头，如果arr[0] < arr[1] ，arr[0]被定义为局部最小。
// ; 3.数组的结尾，如果arr[N-1] < arr[N-2] ，arr[N-1]被定义为局部最小。
// ; 任何一个中间位置i, 即数组下标1~N-2之间, 必须满足arr[i-1] < arr[i] <arr[i+1] ,叫找到一个局部最小。
// ; 请找到任意一个局部最小并返回。

function getLessIndex(arr) {
  let lastIndex = arr.length - 1;
  //一个数
  if (arr.length == 1) {
    return arr[0];
  }

  //两个数
  if (arr[0] < arr[1]) {
    return arr[0];
  }

  if (arr[lastIndex] < arr[lastIndex - 1]) {
    return arr[lastIndex];
  }

  //三个数及以上的情况
  let L = 0;
  let R = lastIndex;

  while (L < R) {
    const mid = ((R - L) >> 1) + L;
    if (arr[mid] < arr[mid - 1] && arr[mid] < arr[mid + 1]) {
      return arr[mid];
    } else if (arr[mid] > arr[mid - 1]) {
      R = mid - 1;
    } else if (arr[mid] > arr[mid + 1]) {
      L = mid - 1;
    }
  }
  return L;
}

if (require.main == module) {
  const arr = [9, 7, 5, 3, 6, 7, 3, 6, 7, 8, 2, 4, 5, 9];
  console.log(getLessIndex(arr));
}
