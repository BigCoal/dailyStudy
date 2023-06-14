/*
 * @Author: bigCoal 1048506792@qq.com
 * @Date: 2023-02-23 21:02:46
 * @LastEditors: bigCoal 1048506792@qq.com
 * @LastEditTime: 2023-02-25 17:01:21
 * @FilePath: /算法/06-堆相关/001-heap.ts
 * @Description:大根堆的heapInsert
 */
const defaultComparator = (a: number, b: number) => {
  return a - b > 0 ? true : false;
};
export function swap(arr: any[], i: number, j: number) {
  let t = arr[i];
  arr[i] = arr[j];
  arr[j] = t;
}

export function heapInsert(
  arr: any[],
  index: number,
  comparator = defaultComparator
) {
  while (index !== 0) {
    let parentIndex = Math.floor((index - 1) / 2);
    if (comparator(arr[index], arr[parentIndex])) {
      swap(arr, index, parentIndex);
      index = parentIndex;
    } else {
      break;
    }
  }
}
export function heapify(
  arr: any[],
  index: number,
  lastIndex: number,
  comparator = defaultComparator
) {
  let left = index * 2 + 1;
  while (left <= lastIndex) {
    let right = left + 1;
    let maxChild =
      right <= lastIndex && comparator(arr[right], arr[left]) ? right : left;
    if (comparator(arr[maxChild], arr[index])) {
      swap(arr, index, maxChild);
      left = maxChild * 2 + 1;
    } else {
      break;
    }
  }
}

export default class heap {
  heapSize: number;
  heap: any[];
  comparator: (a: any, b: any) => boolean = defaultComparator;
  constructor(comparator?: (a: any, b: any) => boolean) {
    this.heap = [];
    this.heapSize = 0;
    if (comparator) {
      this.comparator = comparator;
    }
  }

  push(val: any) {
    this.heap[this.heapSize] = val;
    heapInsert(this.heap, this.heapSize++, this.comparator);
  }
  pop() {
    let val = this.heap[0];
    swap(this.heap, --this.heapSize, 0);
    heapify(this.heap, 0, this.heapSize - 1, this.comparator);
    return val;
  }
  peek() {
    return this.isEmpty() ? null : this.heap[0];
  }
  isEmpty() {
    return this.heapSize == 0;
  }
  size() {
    return this.heapSize;
  }
}

if (require.main === module) {
  function runner() {
    const h = new heap();
    h.push(4);
    h.push(7);
    h.push(8);
    h.push(2);
    h.push(8);
    h.push(8);
    while (!h.isEmpty()) {
      console.log(h.pop());
    }
  }

  runner();
}
