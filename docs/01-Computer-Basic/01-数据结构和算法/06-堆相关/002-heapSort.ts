import { heapInsert, heapify, swap } from "./001-heap";

function heapSort(arr: any[]) {
  //调整成大根堆 O(N*logN)
  // for (let i = 0; i < arr.length; i++) {
  //   heapInsert(arr, i);
  // }
  //如果数据一次性给全，可以从底向上建立大根堆，复杂度为O(N),但是如果一个一个数的给，就只能用heapInsert的方式进行加入了
  for (let i = arr.length - 1; i >= 0; i--) {
    heapify(arr, i, arr.length - 1);
  }
  let heapSize = arr.length;
  while (heapSize !== 0) {
    swap(arr, 0, --heapSize);
    heapify(arr, 0, heapSize - 1);
  }
}

if (require.main === module) {
  function runner() {
    const arr = [1, 4, 5, 2, 7, 9, 4];
    heapSort(arr);
    console.log(arr);
  }

  runner();
}
