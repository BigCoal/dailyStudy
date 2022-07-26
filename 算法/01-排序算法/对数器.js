//生成maxLen长度数组，随机值最大为maxValue
const createRandomArr = function (maxLen, maxValue) {
  const arr = [];
  for (let i = 0; i < maxLen; i++) {
    arr.push(parseInt(Math.random() * maxValue));
  }
  return arr;
};

//对数器，fn为排序方法
function compare(fn) {
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 1000; j++) {
      const arr = createRandomArr(i, j);
      let sort1 = [...arr].sort((a, b) => a - b);
      let sort2 = fn([...arr]);

      if (sort1.toString() !== sort2.toString()) {
        console.log("排序错误", arr);
        console.log(sort1);
        console.log(sort2);
        return;
      }
    }
  }
}

module.exports = {
  compare,
};
