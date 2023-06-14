function swap(arr, i, j) {
  const cache = arr[i];
  arr[i] = arr[j];
  arr[j] = cache;
}

function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j < arr.length && j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        swap(arr, j, j - 1);
      }
    }
  }
  return arr;
}

if (require.main == module) {
  const arr = [38, -57, 14, 7, -47];
  insertionSort(arr);
  console.log(arr);
}

module.exports = {
  insertionSort,
};
