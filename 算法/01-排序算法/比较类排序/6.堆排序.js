const { swap } = require("../util.js");
const { compare } = require("../对数器.js");

function heapRemoveMax(arr) {
  let start = 0;
  let end = arr.length - 1;
  const MAX = Number.MAX_SAFE_INTEGER;
  swap(arr, start, end);
  while (start < end - 1) {
    let leftIndex = 2 * start + 1;
    let rightIndex = 2 * start + 2;
    let leftNode = leftIndex >= end ? MAX : arr[leftIndex];
    let rightNode = rightIndex >= end ? MAX : arr[rightIndex];
    let minChildNode = Math.min(leftNode, rightNode);
    if (minChildNode !== MAX && minChildNode < arr[start]) {
      let minIndex = leftIndex;
      if (rightNode !== MAX) {
        minIndex = leftNode < rightNode ? 2 * start + 1 : 2 * start + 2;
      }
      swap(arr, start, minIndex);
      start = minIndex;
    } else {
      break;
    }
  }
  return arr.pop();
}

function heapInsert(arr, value) {
  arr.push(value);
  let end = arr.length - 1;
  let parentIndex = (end - 1) >> 1;
  while (arr[parentIndex] > value && parentIndex >= 0) {
    swap(arr, parentIndex, end);
    end = parentIndex;
    parentIndex = (end - 1) >> 1;
  }
  return arr;
}

function heapSort(arr) {
  let heapArr = [];
  let sortArr = [];
  for (let i = 0; i < arr.length; i++) {
    heapInsert(heapArr, arr[i]);
  }
  for (let i = 0; i < arr.length; i++) {
    sortArr.push(heapRemoveMax(heapArr));
  }
  return sortArr;
}

compare(heapSort);
