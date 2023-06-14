//给定一个数组arr和两个整数lower，upper，返回数组arr中有多少个子数组累加和在`[lower,upper]`之间

const { randomArr } = require("../basic.js");

//返回数组每一位相对于前面的累加和数组
function cumulationArr(arr) {
  if (!arr && arr.length < 2) {
    return arr;
  }
  const sumArr = [arr[0]];
  for (let i = 1; i < arr.length; i++) {
    sumArr[i] = sumArr[i - 1] + arr[i];
  }
  return sumArr;
}

function arrIntervalSum(sumArr, i, j) {
  return i == 0 ? sumArr[j] : sumArr[j] - sumArr[i - 1];
}
//合并两个已经拍好序的区间数组,双指针
function mergeArr(sumArr, L, M, R, lower, upper) {
  let i = L;
  let j = L;
  let total = 0;
  for (let r = M + 1; r <= R; r++) {
    //如果以r结尾的区间在[lower,upper]中，则mid左边的节点必须在[sum-upper,sum-lower]中，才可以命中
    const lowerL = sumArr[r] - upper;
    const upperL = sumArr[r] - lower;
    while (i <= M&&sumArr[i] <lowerL) {
      i++;
    }
    while (j <= M&&sumArr[j] <= upperL) {
      j++;
    }
    total += j - i;
  }

  let p1 = M;
  let p2 = R;

  const newArr = [];
  while (p2 >= M + 1 && p1 >= L) {
    newArr.unshift(sumArr[p1] > sumArr[p2] ? sumArr[p1--] : sumArr[p2--]);
  }
  while (p1 >= L) {
    newArr.unshift(sumArr[p1--]);
  }
  while (p2 >= M + 1) {
    newArr.unshift(sumArr[p2--]);
  }
  for (let i = 0; i < newArr.length; i++) {
    sumArr[L + i] = newArr[i];
  }
  return total;
}

//以最后一个数为节点，把小于该数的数放在前面，大于的放在后面，然后深入左侧未排好的和右侧未排好的
//递归版本
function mergeSortSum(sumArr, L, R, lower, upper) {
  if (L == R) {
    return sumArr[L] >= lower && sumArr[L] <= upper ? 1 : 0; //L等于R代表从0到R位置的累加和
  }

  const mid = L + ((R - L) >> 1);
  return (
    mergeSortSum(sumArr, L, mid, lower, upper) +
    mergeSortSum(sumArr, mid + 1, R, lower, upper) +
    mergeArr(sumArr, L, mid, R, lower, upper)
  );
}

//暴力解法 复杂度 N^2
function logarithm(arr, lower, upper) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    //以i结尾的数  如以1结尾的区间有 0-1 1-1 以2结尾的区间有 0-2 1-2 2-2
    for (let j = 0; j <= i; j++) {
      const sum = arrIntervalSum(arr, j, i);
      if (sum >= lower && sum <= upper) total++;
    }
  }
  return total;
}

function main() {
  const len = 3000;
  const maxValue = 1000;
  const times = 1000;
  for (let i = 0; i < times; i++) {
    const arr = randomArr(len, maxValue,false);
    const lower = 1;
    const upper = 5;
    const sumArr = cumulationArr(arr);
    if (
      logarithm([...sumArr], lower, upper) !==
      mergeSortSum([...sumArr], 0, sumArr.length - 1, lower, upper)
    ) {
      console.log("两倍数错误");
    }
  }
}

main();
