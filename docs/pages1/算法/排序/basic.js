//对数器
function logarithm(arr) {
  return arr.sort(function (a, b) {
    return a - b;
  });
}

//生成随机数量数组
function randomArr(len, maxValue,isAbs = true) {
  return new Array(len).fill("").map((item) => {
    const symbol = isAbs?1:[1,-1][Math.round(Math.random())]
    return Math.floor(Math.random() * maxValue)*symbol;
  });
}

//交换位置
function swap(arr, i, j) {
  let tem = arr[i];
  arr[i] = arr[j];
  arr[j] = tem;
}

module.exports = {
  randomArr,
  swap,
  logarithm,
};
