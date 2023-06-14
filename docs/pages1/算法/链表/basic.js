function randomArr(len, maxValue) {
  return new Array(len).fill("").map((item) => {
    return Math.floor(Math.random() * maxValue);
  });
}

function randomLinks(a) {
  class Node {
    value = null;
    next = null;
    constructor(val) {
      this.value = val;
    }
  }

  const arr = [...a];
  if (!arr||arr.length==0) return;
 
  const head = new Node(arr.shift());
  let cur = head;
  while (arr.length) {
    let node = new Node(arr.shift());
    cur.next = node;
    cur = node;
  }
  return head;
}

//创建双项链表
function randomDoubleLinks(arr) {
  class Node {
    value = null;
    next = null;
    last = null;
    constructor(val) {
      this.value = val;
    }
  }
  let head = new Node(arr[0]);
  let lastNode = null;
  let nextNode = head;
  let curNode = nextNode;
  for (let i = 0; i < arr.length; i++) {
     curNode = nextNode;
    curNode.last =lastNode;
    nextNode = i + 1 == arr.length ? null : new Node(arr[i + 1]);
    lastNode = curNode;
    curNode.next =nextNode;
  }

  return {head,end:curNode};
}

//交换位置
function swap(arr, i, j) {
  let tem = arr[i];
  arr[i] = arr[j];
  arr[j] = tem;
}
module.exports = {
  swap,
  randomArr,
  randomLinks,
  randomDoubleLinks
};
