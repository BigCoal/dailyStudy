// 给定很多线段，每个线段都有两个数组[start, end]，
// 表示线段开始位置和结束位置，左右都是闭区间
// 规定：
// 1）线段的开始和结束位置一定都是整数值
// 2）线段重合区域的长度必须>=1
// 返回线段最多重合区域中，包含了几条线段
import heap from "./001-heap";

class Line {
  start;
  end;
  constructor(s: number, e: number) {
    this.start = s;
    this.end = e;
  }
}

function main() {
  const l1 = new Line(4, 9);
  const l2 = new Line(1, 4);
  const l3 = new Line(7, 15);
  const l4 = new Line(2, 4);
  const l5 = new Line(4, 6);
  const l6 = new Line(3, 7);
  const l7 = new Line(5, 7);

  const priorityQueue = new heap((a: Line, b: Line) => {
    return b.start - a.start > 0 ? true : false; //小根堆比较器
  });

  priorityQueue.push(l1);
  priorityQueue.push(l2);
  priorityQueue.push(l3);
  priorityQueue.push(l4);
  priorityQueue.push(l5);
  priorityQueue.push(l6);
  priorityQueue.push(l7);

  const coverPriorityQueue = new heap((a: number, b: number) => {
    return b - a > 0 ? true : false;
  });
  let maxCoverNum = 0;
  while (!priorityQueue.isEmpty()) {
    const line = priorityQueue.pop();
    if (coverPriorityQueue.peek() && coverPriorityQueue.peek() <= line.start) {
      coverPriorityQueue.pop();
    }
    coverPriorityQueue.push(line.end);
    maxCoverNum = Math.max(maxCoverNum, coverPriorityQueue.size());
  }
  return maxCoverNum;
}

console.log(main());
