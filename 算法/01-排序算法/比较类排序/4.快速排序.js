const { swap } = require("../util.js");
const { compare } = require("../对数器.js");

function moveEndToMiddle(arr, start, end) {
  let startPoint = start - 1; //小于区域指针
  let endPoint = end; //大于区域指针
  let curPoint = start;
  let midValue = arr[end];
  while (curPoint < endPoint) {
    if (arr[curPoint] > midValue) {
      swap(arr, curPoint, --endPoint);
    } else if (arr[curPoint] < midValue) {
      swap(arr, curPoint, ++startPoint);
      curPoint++;
    } else {
      curPoint++;
    }
  }
  swap(arr, curPoint, end);
  endPoint++;
  return { startPoint, endPoint };
}
function quickSort(arr, start, end) {
  const { startPoint, endPoint } = moveEndToMiddle(arr, start, end);
  if (startPoint > start) {
    quickSort(arr, start, startPoint);
  }
  if (end > endPoint) {
    quickSort(arr, endPoint, end);
  }
  return arr;
}

function main(arr) {
  return quickSort(arr, 0, arr.length - 1);
}
compare(main);
