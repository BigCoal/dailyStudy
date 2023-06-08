// 已知一个几乎有序的数组。几乎有序是指，如果把数组排好顺序的话，每个元素移动的距离一定不超过k，并且k相对于数组长度来说是比较小的。
// 请选择一个合适的排序策略，对这个数组进行排序。
import heap from "./001-heap";

function sortArrDistanceK(arr: any[], k: number) {
  let priorityQueue = new heap();
  //先插入k个数，把前k个数变成优先级队列,则第一个值就是在k区间内的最大值
  for (let i = 0; i <= k; i++) {
    priorityQueue.push(arr[i]);
  }

  for (let i = 0; i < arr.length; i++) {
    arr[i] = priorityQueue.pop();
    if (k + i + 1 < arr.length) {
      priorityQueue.push(arr[k + i + 1]);
    }
  }
}

if (require.main === module) {
  function runner() {
    const arr = [5, 2, 1, 4, 3];
    const k = 2;
    sortArrDistanceK(arr, k);
    console.log(arr);
  }

  runner();
}
