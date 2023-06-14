// 1. 最大线段重合问题
// 给定多条线段，每格线段都有两个数组[start,end],表示线段的开始和结束位置，左右都是闭区间
// 规定：
//    线段开始和结束一定都是整数值
//    线段重合区域长度必须>=1
// 返回线段重合最多重合区域中，包含几条线段
const { priorityQueue } = require("./小根堆.js");

function randomNum(maxValue = 1) {
  return Math.floor(Math.random() * maxValue + 1);
}

//生成随机数量数组
function randomArr(len, maxValue, isAbs = true) {
  return new Array(len).fill("").map((item) => {
    let left = randomNum(maxValue);
    let right = randomNum(maxValue);
    while (right <= left) {
      left = randomNum(maxValue);
      right = randomNum(maxValue);
    }

    return [left, right];
  });
}

function logarithm(arr) {
  let max = 0;
  for (let i = 0; i < arr.length; i++) {
    let len = 0;
    for (let j = 0; j < arr.length; j++) {
      if (arr[i][1] > arr[j][0] && arr[i][1] <= arr[j][1]) {
        len++;
      }
    }
    max = Math.max(len, max);
  }
  return max;
}

function maxCoincideLen(list) {
  const arr = [...list];
  if (arr.length == 0) {
    return 0;
  }
  arr.sort((a, b) => a[0] - b[0]);
  let max = 0;
  const heap = new priorityQueue();
  for (let i = 0; i < arr.length; i++) {
    const ele = arr[i];
    let min = heap.peek();
    if (!min) {
      heap.add(ele[1]);
    } else if (ele[0] < min) {
      heap.add(ele[1]);
      max = Math.max(max, heap.heapSize);
    } else {
      while (ele[0] >= heap.peek() && heap.peek() != null) {
        heap.poll();
      }
      heap.add(ele[1]);
      max = Math.max(max, heap.heapSize);
    }
  }
  return max + 1;
}

function main() {
  const times = 1000;
  for (let i = 0; i < times; i++) {
    const arr = randomArr(i, i + 2);
    if (logarithm(arr) !== maxCoincideLen(arr)) {
      console.log("失败", arr);
    }
  }
}

main();
