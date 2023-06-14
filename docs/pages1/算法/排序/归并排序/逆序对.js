//在一个数组中，假设左边的数和右边的数是降序关系则称为逆序对，求一个数组中有多少逆序对
//例如[3,1,0,4,3,1],index为1时的有[3,1][3,0][3,1]，索引为2时有[1,0] ...

const { randomArr } = require("../basic.js");

//合并两个已经拍好序的区间数组,双指针
function mergeArr(arr, L, M, R) {
  let p1 = M;
  let p2 = R;
  let sum = 0;
  const newArr = [];
  while (p2 >= M + 1 && p1 >= L) {
    sum += arr[p1] > arr[p2] ? p2 - M : 0;
    newArr.unshift(arr[p1] > arr[p2] ? arr[p1--] : arr[p2--]);
  }
  while (p1 >= L) {
    newArr.unshift(arr[p1--]);
  }
  while (p2 >= M + 1) {
    newArr.unshift(arr[p2--]);
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

//暴力解法 复杂度 N^2
function logarithm(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[i]) sum++;
    }
  }
  return sum;
}

function main() {
  const len = 3000;
  const maxValue = 1000;
  const times = 100;
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
