const { logarithm, randomArr, swap } = require("./basic.js");

//双侧写法
function moveEndToMiddle(arr, start, end) {
  let left = start - 1;
  let right = end;
  let i = start;
  while (i < right) {
    if (arr[i] < arr[end]) {
      swap(arr, ++left, i++);
    } else if (arr[i] > arr[end]) {
      swap(arr, i, --right);
    } else {
      i++;
    }
  }
  swap(arr, i, end);
  return [left, right + 1]; //返回左侧小于最后一个值的最大的点 和 右侧大雨最后一个值的最小的点
}

//快速排序 递归版本
function quickSort(arr, start, end) {
  if (!arr || arr.length == 0) {
    return arr;
  }
  swap(arr,start+Math.floor(Math.random()*(end-start+1)),end)
  const [left, right] = moveEndToMiddle(arr, start, end);
  if (left > start) {
    quickSort(arr, start, left);
  }
  if (right < end) {
    quickSort(arr, right, end);
  }
  return arr;
}
//快速排序 非递归版本
function quickSort1(arr, start, end) {
  if (!arr || arr.length < 2) {
    return arr;
  }
  const stack = [];
  const [left, right] = moveEndToMiddle(arr, start, end);
  stack.push([0, left]);
  stack.push([right, end]);
  while (stack.length !== 0) {
    const [L, R] = stack.pop();
    if (L < R) {
      const [left, right] = moveEndToMiddle(arr, L, R);
      stack.push([L, left]);
      stack.push([right, R]);
    }
  }
  return arr;
}

function main() {
  const times = 1;
  for (let i = 0; i < times; i++) {
    const len = 5;
    const maxValue = 10;
    // const len = i;
    // const maxValue = Math.floor(Math.random() * i);
    const arr = randomArr(len, maxValue);
    
    if (
      quickSort1([...arr], 0, arr.length - 1).toString() !==
      logarithm(arr).toString()
    ) {
      console.log("排序错误");
    }
    if (
      quickSort([...arr], 0, arr.length - 1).toString() !==
      logarithm(arr).toString()
    ) {
      console.log("排序错误");
    }
  }
}

main();
