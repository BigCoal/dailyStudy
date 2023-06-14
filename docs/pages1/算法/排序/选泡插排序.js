//对数器
function logarithm(arr) {
  return arr.sort(function (a, b) {
    return a - b;
  });
}

//生成随机数量数组
function createRandomArr(num) {
  return new Array(num).fill("").map(() => Math.floor(Math.random() * 1000));
}

//交换位置
function swap(arr, i, j) {
  let tem = arr[i];
  arr[i] = arr[j];
  arr[j] = tem;
}

//选择排序：从0～N个数组中选择一个最小的数，放到第0位置，从剩余的1～N个数组中选择一个最小的数，放到第1位置
function selectSort(arr) {
  if (arr == null || arr.length < 2) {
    return arr;
  }
  for (let i = 0; i < arr.length; i++) {
    let minValueIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minValueIndex]) {
        minValueIndex = arr[j] < arr[minValueIndex] ? j : minValueIndex;
      }
    }
    swap(arr, i, minValueIndex);
  }
}

//冒泡排序：从0～N-1上对每个相邻的数进行比对，如果后面的比前面的大就交换，最终N-1位置为第一次比对后最大的数，然后从0～N-2上继续比对

function bubbleSort(arr) {
  if (arr == null || arr.length < 2) {
    return arr;
  }
  for (let i = arr.length - 1; i >= 0; i--) {
    for (let j = 1; j <= i; j++) {
      if (arr[j - 1] > arr[j]) {
        swap(arr, j - 1, j);
      }
    }
  }
}

//插入排序
function insertSort(arr) {
  if (arr == null || arr.length < 2) {
    return arr;
  }
  for (let i = 1; i < arr.length; i++) {
    for (let j = i - 1; j >= 0 && arr[j+1] < arr[j]; j--) {
      swap(arr, j+1, j);
    }
  }
}

//插入排序2
function insertSort2(arr) {
  if (arr == null || arr.length < 2) {
    return arr;
  }
  for (let i = 1; i < arr.length; i++) {
    let newNumIndex = i;
    while (newNumIndex - 1 >= 0 && arr[newNumIndex] < arr[newNumIndex - 1]) {
      swap(arr, newNumIndex - 1, newNumIndex);
      newNumIndex--;
    }
  }
}

function main() {
  const arr = createRandomArr(200000);
  // selectSort(arr);
  // bubbleSort(arr);
  insertSort(arr)
  // insertSort2(arr);
  console.log(arr.toString() === logarithm(arr).toString());
}

main();
