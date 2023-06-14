const { randomArr, swap } = require("../basic.js");

//版本1:在数组中给定一个数x，要求小于等于x的数放在左边，大于x的数放在右边
function flag1(arr, val) {
  if (!arr || arr.length < 2) {
    return arr;
  }
  let left = -1; //左侧小于区域
  let index = 0;
  while (index < arr.length) {
    if (arr[index] <= val) {
      swap(arr, ++left, index++);
    } else {
      index++;
    }
  }
  return arr;
}

//版本2:在数组中给定一个数x,要求小于x的数放在左边，等于x的数放中间，大于x的数放在右边
function flag2(arr, val) {
  if (!arr || arr.length < 2) {
    return arr;
  }
  let left = -1;//左边已经排好小于区域，默认null
  let right = arr.length; //右边已经排好大于区域，默认null
  let index = 0;
  while(index<right){
      if(arr[index]<val){
          swap(arr,++left,index++)
      }else if(arr[index]>val){
          swap(arr,index,--right)
      }else{
          index++
      }
  }
  return arr
}
function main() {
  const len = 10;
  const maxValue = 10;
  const arr = randomArr(len, maxValue);
  const value = arr[Math.floor(Math.random() * len)];
  console.log(arr);
  console.log(value);
  console.log(flag2([...arr], value));
}

main();
