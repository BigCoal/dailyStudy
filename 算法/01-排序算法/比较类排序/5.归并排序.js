const { compare } = require("../对数器.js");

function merge(arr1, arr2) {
  let i = 0;
  let j = 0;
  let newArr = [];
  while (i < arr1.length && j < arr2.length) {
    newArr.push(arr1[i] < arr2[j] ? arr1[i++] : arr2[j++]);
  }
  while (i < arr1.length) {
    newArr.push(arr1[i++]);
  }
  while (j < arr2.length) {
    newArr.push(arr2[j++]);
  }
  return newArr;
}

function mergeSort(arr, start, end) {
  if (start > end) {
    return [];
  }
  if (start == end) {
    return [arr[start]];
  }
  const mid = start + ((end - start) >> 1);

  const leftArr = mergeSort(arr, start, mid);
  const rightArr = mergeSort(arr, mid + 1, end);

  return merge(leftArr, rightArr);
}

function main(arr) {
  return mergeSort(arr, 0, arr.length - 1);
}

compare(main);
