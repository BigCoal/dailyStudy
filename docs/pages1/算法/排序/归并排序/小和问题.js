//给定一个数组，求每个索引前面比他小的数的累加和的所有索引的累加和
//例如[6,3,2,1,6,7]的每个索引前面比他小的数的累加和数组为[0,0,0,6,12],所以最终所有索引相加结果是18

const { randomArr } = require("../basic.js");

//合并两个已经拍好序的区间数组,双指针
function mergeArr(arr, L, M, R) {
  let sum = 0;
  let p1 = L;
  let p2 = M + 1;
  const newArr = [];
  while (p1 <= M && p2 <= R) {
       //如果左侧指针小于右侧指针，则代表右边指针后的数都比左侧指针要大
    sum += arr[p1] < arr[p2]?(R - p2 + 1) * arr[p1]:0;
    newArr.push(arr[p1] < arr[p2] ? arr[p1++] : arr[p2++]);
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
  return sum;
}

//以最后一个数为节点，把小于该数的数放在前面，大于的放在后面，然后深入左侧未排好的和右侧未排好的
//递归版本
function mergeSortSum(arr, L, R) {
  if (L == R) {
    return 0;
  }
  const mid = L + ((R - L) >> 1);
  return (
    mergeSortSum(arr, L, mid) +
    mergeSortSum(arr, mid + 1, R) +
    mergeArr(arr, L, mid, R)
  );
}

//暴力解法
function logarithm(arr) {
  let sumArr = [];
  for (let i = 0; i < arr.length; i++) {
    let sum = 0;
   
    for (let j = 0; j < i ; j++) {
        if(arr[j] < arr[i])sum += arr[j];
    }
    sumArr[i] = sum;
  }
  return sumArr.reduce((a, b) => a + b);
}

function main() {
  const len = 3000;
  const maxValue = 1000;
  const times = 1000;
  for (let i = 0; i < times; i++) {
    const arr = randomArr(len, maxValue);
    if (!arr) {
      return arr;
    }
    if (mergeSortSum([...arr], 0, arr.length - 1) !== logarithm([...arr])) {
      console.log("小和错误");
    }
  }
}

main();
