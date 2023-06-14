// 1. 划分单链表，将单向链表按某值划分成左边小、中间相等、右边大的形式

//    1)把链表放入数组里，在数组上做 partition(笔试用)
//    2)分成小、中、大三部分，再把各个部分之间串起来（面试用）

const { randomArr, randomLinks, swap } = require("./basic.js");

class Node {
  value = null;
  next = null;
  constructor(val) {
    this.value = val;
  }
}
function partition(arr, val) {
  let left = -1;
  let right = arr.length;
  let index = 0;
  while (index < right) {
    if (arr[index] > val) {
      swap(arr, index, --right);
    } else if (arr[index] < val) {
      swap(arr, index++, ++left);
    } else {
      index++;
    }
  }
  return arr;
}
function SmallerEqualBiggerArr(links, pivot) {
  const partitionArr = [];
  while (links) {
    partitionArr.push(links.value);
    links = links.next;
  }
  partition(partitionArr, pivot);
  return randomLinks(partitionArr);
}
function SmallerEqualBigger(links, pivot) {
  let sHead = null; //小于区域开始节点
  let sEnd = null; //小于区域结束节点
  let mHead = null; //等于区域开始节点
  let mEnd = null; //等于区域结束节点
  let eHead = null; //大于区域开始节点
  let eEnd = null; //大于区域结束节点
  while (links) {
    const val = links.value;
    if (val < pivot) {
      if (sHead == null) {
        sHead = new Node(val);
        sEnd = sHead;
      } else {
        let n = new Node(val);
        sEnd.next = n;
        sEnd = n;
      }
    } else if (val == pivot) {
      if (mHead == null) {
        mHead = new Node(val);
        mEnd = mHead;
      } else {
        let n = new Node(val);
        mEnd.next = n;
        mEnd = n;
      }
    } else {
      if (eHead == null) {
        eHead = new Node(val);
        eEnd = eHead;
      } else {
        let n = new Node(val);
        eEnd.next = n;
        eEnd = n;
      }
    }
    links = links.next;
  }
  console.log("sHead", JSON.stringify(sHead));
  console.log("mHead", JSON.stringify(mHead));
  console.log("eHead", JSON.stringify(eHead));
  const head = sHead || mHead || eHead;
  if (head == mHead && eHead) {
    mEnd.next = eHead;
  }
  if (head == sHead) {
    if (mHead && eHead) {
      mEnd.next = eHead;
      sEnd.next = mHead;
    } else if (mHead && !eHead) {
      sEnd.next = mHead;
    } else if (eHead && !mHead) {
      sEnd.next = eHead;
    }
  }
  return head;
}
function main() {
  const maxValue = 5;

  const arr = randomArr(5, maxValue);
  const randomValue = arr[Math.floor(arr.length / 2)];
  console.log(arr, randomValue);
  const links = randomLinks(arr);
  const sqbLink1 = SmallerEqualBiggerArr(links, randomValue);
  const sqbLink2 = SmallerEqualBigger(links, randomValue);

  console.log(JSON.stringify(sqbLink1));
  console.log(JSON.stringify(sqbLink2));
}

main();
