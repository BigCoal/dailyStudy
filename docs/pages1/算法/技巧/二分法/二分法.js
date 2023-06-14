//获取随机数组
function randomArray(len, maxValue) {
  const arr = new Array(len);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Math.floor(Math.random() * maxValue);
  }
  return arr;
}

//获取有序数组中某个数最左（右）侧索引
function getArrLeftOrRightIndex(arr, num, position = "left") {
  if (position === "left") {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === num) {
        return i;
      }
    }
  } else {
    for (let i = arr.length - 1; i; i--) {
      if (arr[i] === num) {
        return i;
      }
    }
  }
}

//二分法，在有序数组中找到num
function binarySearch(arr, num) {
  let L = 0;
  let R = arr.length;
  while (L <= R) {
    mid = Math.floor(L + (R - L) / 2); //防止溢出
    if (arr[mid] < num) {
      L = mid + 1;
    } else if (arr[mid] > num) {
      R = mid - 1;
    } else {
      return mid;
    }
  }
  return false;
}
//有序数组中找到>=num最左侧位置
function binarySearchLeft(arr, num) {
  let L = 0;
  let R = arr.length - 1;
  let T = -1;
  while (L <= R) {
    let mid = Math.floor(L + (R - L) / 2); //防止溢出
    if (arr[mid] >= num) {
      T = mid;
      R = mid - 1;
    } else {
      L = mid + 1;
    }
  }
  return T;
}

//有序数组中找到<=num最右侧位置
function binarySearchRight(arr, num, start = 0, end = arr.length - 1) {
  let L = 0;
  let R = arr.length - 1;
  let T = -1;
  while (L <= R) {
    let mid = Math.floor(L + (R - L) / 2); //防止溢出
    if (arr[mid] <= num) {
      T = mid;
      L = mid + 1;
    } else {
      R = mid - 1;
    }
  }
  return T;
}

function main() {
  const len = 10000;
  const maxValue = 300000;
  const time = 1000;
  const arr = randomArray(len, maxValue);
  const sortArr = arr.sort((a, b) => a - b);
  const randomKey = Math.floor(Math.random() * len);
  const randomKeyValue = sortArr[randomKey];
  for (let i = 0; i < time; i++) {
    //验证二分法，在有序数组中找到num是否正确
    if (sortArr[binarySearch(sortArr, randomKeyValue)] !== randomKeyValue) {
      console.log("二分法错误");
    }

    //验证有序数组中找到>=num最左侧位置
    if (
      getArrLeftOrRightIndex(sortArr, randomKeyValue, "left") !==
      binarySearchLeft(sortArr, randomKeyValue)
    ) {
      console.log("最左侧二分法错误");
    }

    //验证有序数组中找到<=num最右侧位置
    if (
      getArrLeftOrRightIndex(sortArr, randomKeyValue, "right") !==
      binarySearchRight(sortArr, randomKeyValue)
    ) {
      console.log("最右侧二分法错误");
    }
  }
}

main();
