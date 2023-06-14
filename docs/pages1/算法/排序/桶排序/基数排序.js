// 1. 找最大位，其余不够补0
// 2. 准备10个桶，编号0-9，先按照个位数大小进桶，按顺序倒出，再按照十位进桶。按循序倒出...

const { randomArr, logarithm } = require("../basic");

function radixSort(list) {
  const arr = [...list];
  const bucketList = new Array(10).fill("").map(() => new Array());

  const pos = getMaxPos(arr);

  for (let i = 1; i <= pos; i++) {
    for (let j = 0; j < arr.length; j++) {
      const val = getNumPos(arr[j], i);
      bucketList[val].push(arr[j]);
    }
    let index = 0;
    for (let j = 0; j < bucketList.length; j++) {
      let val = bucketList[j].shift();
      while (!isNaN(val)) {
        arr[index++] = val;
        val = bucketList[j].shift();
      }
    }
  }

  return arr;
}

function getNumPos(num, pos) {
  const numArr = num.toString().split("").reverse();
  return Number(numArr[pos - 1]) || 0;
}

function getMaxPos(arr) {
  let max = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < arr.length; i++) {
    max = Math.max(max, arr[i]);
  }
  let pos = 0;
  while (max >= 1) {
    max = max / 10;
    pos++;
  }
  return pos;
}

function main() {
  const timer = 10000;
  for (let i = 0; i < timer; i++) {
    const arr = randomArr( i ,  i );
    if (logarithm(arr).toString() !== radixSort(arr).toString()) {
      console.log("计数排序错误");
    }
  }
}

main();
