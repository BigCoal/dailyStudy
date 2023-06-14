const { selectionSort } = require("./001-选择排序.ts");
const { bubbleSort } = require("./002-冒牌排序.ts");
const { insertionSort } = require("./003-插入排序.ts");

//获取从[low,upper)上任意一个整数
function random(low, upper) {
  return Math.floor(Math.random() * (upper - low) + low);
}

function generatorArr(maxSize, maxValue) {
  let arr = new Array(random(0, maxSize));
  for (let i = 0; i < arr.length; i++) {
    arr[i] = random(0, maxValue) - random(0, maxValue);
  }
  return arr;
}

if (require.main == module) {
  for (let k = 0; k < 100000; k++) {
    const arr = generatorArr(1000, 100);
    let res1 = selectionSort([...arr]);
    let res2 = bubbleSort([...arr]);
    let res3 = insertionSort([...arr]);

    for (let i = 0; i < arr.length; i++) {
      if (res1[i] == res2[i] && res1[i] == res3[i]) {
      } else {
        console.log("失败");
      }
    }
  }
}
