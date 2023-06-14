//正序查询
function findIndex(arr, fn) {
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i, arr)) {
      return i;
    }
  }
  return -1;
}

//倒序查询
function findLastIndex(arr, fn) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (fn(arr[i], i, arr)) {
      return i;
    }
  }
  return -1;
}

//混合版本
function createIndexFinder(dir) {
  return function (arr) {
    const len = arr.length;
    let i = dir === 1 ? 0 : len - 1;
    for (; i >= 0 && i < len; i += dir) {
      if (fn(arr[i], i, arr)) {
        return i;
      }
    }
    return -1;
  };
}

const findIndex1 = createIndexFinder(1)
const findLastIndex1 = createIndexFinder(-1)