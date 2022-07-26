const { swap } = require("../util.js");
const { compare } = require("../对数器.js");

function bubbleSort(arr) {
  for (let i = arr.length; i >= 0; i--) {
    for (let j = 1; j < i; j++) {
      if (arr[j - 1] > arr[j]) {
        swap(arr, j - 1, j);
      }
    }
  }
  return arr;
}

compare(bubbleSort);
