//按照年龄进行排序
//我们可以按照年龄0-200岁进行计数，提供一个200长度的数组，每位代表岁数有多少人，最后再次把数组中该年龄的人按顺序抛出即可

const { randomArr, logarithm } = require("../basic");

function countingSort(arr) {
  const ageArr = new Array(200).fill(0);
  const sortAge = [];
  for (let i = 0; i < arr.length; i++) {
    ageArr[arr[i]]++;
  }
  for (let i = 0; i < ageArr.length; i++) {
    let ele = ageArr[i];
    while (ele != 0) {
      sortAge.push(i);
      ele--;
    }
  }
  return sortAge;
}

function main() {
  const timer = 10000;
  for (let i = 0; i < timer; i++) {
    const arr = randomArr(i, i>200?200:i);
    if (logarithm(arr).toString() !== countingSort(arr).toString()) {
      console.log("计数排序错误");
    }
  }
}

main();
