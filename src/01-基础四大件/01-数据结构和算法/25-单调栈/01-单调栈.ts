//在一个无序数组中针对于每一个位置i,如何很快得到小于（大于）arr[i]左侧第一个位置和右侧的第一个位置
//利用单调栈可以O(N)

function getNearLess(arr: number[]): [number, number][] {
  //获取最近的最小的数，在栈中从底向上是从小向大排序
  //如果当前的数比栈顶小，一直弹出，直到null或者找到比它小的数
  const res: [number, number][] = [];
  const stack: number[][] = [];
  let stackIndex = -1;

  for (let i = 0; i < arr.length; i++) {
    while (stackIndex >= 0 && arr[stack[stackIndex][0]] > arr[i]) {
      let leftIndex =
        stackIndex - 1 < 0
          ? -1
          : stack[stackIndex - 1][stack[stackIndex - 1].length - 1];
      stack[stackIndex].map((idx) => {
        res[idx] = [leftIndex, i];
      });
      stackIndex--;
    }
    if (stackIndex == -1) {
      stack[++stackIndex] = [i];
    } else {
      if (arr[stack[stackIndex][0]] == arr[i]) {
        stack[stackIndex].push(i);
      } else {
        stack[++stackIndex] = [i];
      }
    }
  }

  while (stackIndex >= 0) {
    let leftIndex =
      stackIndex - 1 == -1
        ? -1
        : stack[stackIndex - 1][stack[stackIndex - 1].length - 1];
    stack[stackIndex].map((idx) => {
      res[idx] = [leftIndex, -1];
    });
    stackIndex--;
  }
  return res;
}

console.log(getNearLess([3, 4, 6, 1, 2, 4, 3, 7, 3]));
