function swap(arr, i, j) {
  const cache = arr[i];
  arr[i] = arr[j];
  arr[j] = cache;
}

function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minValIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      minValIndex = arr[j] < arr[minValIndex] ? j : minValIndex;
    }
    swap(arr, i, minValIndex);
  }
  return arr;
}

if (require.main == module) {
  const arr = [3, 8, 45, 2, 3, 6, 7, 8, 2, 3, 67, 1];
  selectionSort(arr);
  console.log(arr);
}

module.exports = {
  selectionSort,
};
