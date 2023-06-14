const { swap, randomArr } = require("./basic.js");

function heapInsert(arr, index) {
  let parent = Math.floor((index - 1) / 2);
  while (parent >= 0 && arr[index] < arr[parent]) {
    swap(arr, parent, index);
    index = parent;
    parent = Math.floor((index - 1) / 2);
  }
}

function heapify(arr, heapSize) {
  if (!arr && arr.length == 0) {
    return null;
  }
  const minValue = arr[0];
  let cur = 0;
  swap(arr, cur, heapSize);
  let left = cur * 2 + 1;
  while (left < heapSize) {
    const right = left + 1;
    const childMinIndex =
      right < heapSize && arr[right] < arr[left] ? right : left;
    if (arr[cur] > arr[childMinIndex]) {
      swap(arr, cur, childMinIndex);
    } else {
      break;
    }
    cur = childMinIndex;
    left = cur * 2 + 1;
  }
  return minValue;
}

//优先级队列-小根堆
 class priorityQueue {
  heapSize = -1; //索引所在位置
  heapArr = [];//收集大根堆数组
  add(num) {
    this.heapArr[++this.heapSize] = num;
    heapInsert(this.heapArr, this.heapSize);
  }
  poll() {
    return this.heapSize == -1 ? null : heapify(this.heapArr, this.heapSize--);
  }
  peek() {
    return this.heapSize == -1 ? null : this.heapArr[0];
  }
  isEmpty() {
    // if(this.heapSize == -1){
    //   console.log("排好序的数组是",this.heapArr)
    // }
    return this.heapSize == -1;
  }
}

function main() {
  const heap = new priorityQueue()
  heap.add(7)
  heap.add(3)
  
  console.log(heap.peek())
  console.log(heap.poll())
  console.log(heap.peek())
  console.log(heap.poll())
  console.log(heap.peek())
  heap.add(2)
  heap.add(5)
  heap.add(1)
  heap.add(7)
  heap.add(5)
  heap.add(8)
  console.log("-------")
  while(!heap.isEmpty()){
    console.log(heap.poll())
  }
}

// main();


module.exports = {
  priorityQueue
}