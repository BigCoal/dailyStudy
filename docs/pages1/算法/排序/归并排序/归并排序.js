const { randomArr, swap, logarithm } = require("../basic.js");

//合并两个已经拍好序的区间数组,双指针
function mergeArr(arr, L, M, R) {
  let p1 = L;
  let p2 = M + 1;
  const newArr = [];
  while (p1 <= M && p2 <= R) {
    newArr.push(arr[p1] <= arr[p2] ? arr[p1++] : arr[p2++]);
  }
  while (p1 <= M) {
    newArr.push(arr[p1++]);
  }
  while (p2 <= R) {
    newArr.push(arr[p2++]);
  }
  for (let i = 0; i < newArr.length; i++) {
    arr[L + i] = newArr[i];
  }
  return arr;
}

//以最后一个数为节点，把小于该数的数放在前面，大于的放在后面，然后深入左侧未排好的和右侧未排好的
//递归版本
function mergeSort(arr, L, R) {
  if (L == R) {
    return -1;
  }
  const mid = L + ((R - L) >> 1);
  mergeSort(arr, L, mid);
  mergeSort(arr, mid + 1, R);
  mergeArr(arr, L, mid, R);
  return arr;
}

//非递归版本：用步长来实现
function notRecursionMergeSort(a){
  let arr = [...a]
  let step = 1;
  while(step<arr.length){
    let L = 0
    while(L<arr.length){
      //左边起点必须小于长度
      const nextL = step*2
      let R = Math.min(L+nextL-1,arr.length-1)
      const mid =Math.min( L +step-1,arr.length-1);
      if(R>mid){
        //只有两侧都有的时候进行合并位置
        mergeArr(arr, L, mid, R);
      }
      L+=nextL
    }
    if(step>arr.length/2){
      break; //防止溢出
    }
    step <<=1
  }
  return arr
}


function main() {
  const len = 10;
  const maxValue = 100;
  const times = 10000;
  for (let i = 0; i < times; i++) {
    const arr = randomArr(len, maxValue);
    if (!arr || arr.length < 2) {
      return arr;
    }
    if (
      notRecursionMergeSort(arr).toString() !== logarithm(arr).toString()
    ) {
      console.log("排序错误");
    }
    if (
      mergeSort(arr, 0, arr.length - 1).toString() !== logarithm(arr).toString()
    ) {
      console.log("排序错误");
    }
  }
}

main();
