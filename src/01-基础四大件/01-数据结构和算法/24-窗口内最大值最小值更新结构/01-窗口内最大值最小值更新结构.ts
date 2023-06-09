//在数组滑动窗口中，如何快速取得窗口内的最大值
//在窗口进入或者移除的时候，获取最大值的代价是O(1)

//假设窗口长度是3，返回每次形成窗口的最大值

function getWindowMax(arr: number[], w: number) {
  const res: number[] = [];
  const queue: number[] = [];

  for (let i = 0; i < arr.length; i++) {
    while (queue.length > 0 && arr[i] >= arr[queue[queue.length - 1]]) {
      queue.pop();
    }
    queue.push(i);
    if (i >= w - 1) {
      res.push(queue[0]);
      const start = i - w + 1;
      if (start == queue[0]) {
        queue.shift();
      }
    }
  }
  return res;
}

console.log(getWindowMax([2, 3, 4, 2, 1, 4, 5, 6, 3, 5, 7, 9, 2], 3));
