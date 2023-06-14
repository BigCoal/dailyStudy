const { swap, randomArr, logarithm } = require("./basic.js");

function heapInsert(arr, index) {
  let parent = Math.floor((index - 1) / 2);
  while (parent >= 0 && arr[index] > arr[parent]) {
    swap(arr, parent, index);
    index = parent;
    parent = Math.floor((index - 1) / 2);
  }
}

function heapify(arr, heapSize) {
  if (!arr && arr.length == 0) {
    return null;
  } 
  let cur = 0;
  swap(arr, cur, heapSize);
  let left = cur * 2 + 1;
  while (left < heapSize) {
    const right = left + 1;
    const childMaxIndex =
      right < heapSize && arr[right] > arr[left] ? right : left;
    if (arr[cur] < arr[childMaxIndex]) {
      swap(arr, cur, childMaxIndex);
    } else {
      break;
    }
    cur = childMaxIndex;
    left = cur * 2 + 1;
  }
}

function heapSort(arr) {
  if (!arr || arr.length < 2) {
    return arr;
  }
  
  let heapSize = -1; //大根堆数组索引

  //生成大根堆 复杂度O(NLogN)
//   let heapArr = []; //大根堆数组
//   for (let i = 0; i < arr.length; i++) {
//     heapArr.push(arr[++heapSize]);
//     heapInsert(heapArr, heapSize);
//   }

  let heapArr = [...arr]; //大根堆数组
  console.log(arr)
  for (let i = arr.length-1; i >=0; i--) {
    heapSize++
    heapify(heapArr, i);
    console.log(heapArr)
  }
 

return heapArr
  while (heapSize !== 0) {
    heapify(heapArr, heapSize--);
  }
  return heapArr;
}
function main() {
  const times = 1;
  for (let i = 0; i < times; i++) {
    const len = 5;
    const maxValue = 100;
    const arr = randomArr(len, maxValue);
    if (heapSort([...arr]).toString() !== logarithm([...arr]).toString()) {
      console.log("排序错误");
    }
  }
}

main();
