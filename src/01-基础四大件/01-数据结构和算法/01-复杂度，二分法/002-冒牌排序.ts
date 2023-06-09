function swap(arr, i, j) {
  const cache = arr[i];
  arr[i] = arr[j];
  arr[j] = cache;
}

function bubbleSort(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }
  return arr;
}

if (require.main == module) {
  const arr = [3, 8, 45, 2, 3, 6, 7, 8, 2, 3, 67, 1];
  bubbleSort(arr);
  console.log(arr);
}

module.exports = {
  bubbleSort,
};
