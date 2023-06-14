// 拷贝特殊链表，一种特殊的单链表节点类描述如下

// ```
// class Node{
//     int value;
//     Node next;
//     Node rand;
//     Node(int val){value val};
// }
// ```
// rand 指针是单链表节点结构中新增的指针，rand 可能指向链表中的任意一个节点，也可能指向 null。
// 给定一个由 Node 节点类型组成的无环单链表的头节点 head,请实现一个函数完成这个链表的复制，并返回复制的新链表的头节点。
// 【要求】时间复杂度 O(N),额外空间复杂度 O(1)
const { randomArr, swap } = require("./basic.js");

class Node {
  value = null;
  next = null;
  rand = null;
  constructor(val) {
    this.value = val;
  }
}
function productLinks(arr) {
  if (!arr || arr.length == 0) {
    return null;
  }
  const head = new Node(arr.shift());
  let cur = head;
  let nodeArr = [null];
  while (arr.length) {
    const n = new Node(arr.shift());
    nodeArr.push(n);
    cur.next = n;
    cur = n;
  }
  cur = head;
  while (cur) {
    const index = Math.floor(Math.random() * nodeArr.length);
    cur.rand = nodeArr[index];
    cur = cur.next;
  }
  return head;
}
//使用额外空间实现
function copyRandomList1(head) {
  const nodeMap = new Map();
  let curNode = head;
  while (curNode) {
    const n = new Node(curNode.value);
    nodeMap.set(curNode, n);
    curNode = curNode.next;
  }
  curNode = head;
  while (curNode) {
    const copyCurNode = nodeMap.get(curNode);
    const copyNextNode = nodeMap.get(curNode.next) || null;
    const copyRandNode = nodeMap.get(curNode.rand) || null;
    copyCurNode.next = copyNextNode;
    copyCurNode.rand = copyRandNode;
    curNode = curNode.next;
  }

  return nodeMap.get(head);
}

function copyRandomList2(head) {
  let curNode = head;
  //每个节点后面插入一个相同的节点
  while (curNode) {
    const next = curNode.next;
    const node = new Node(curNode.value);
    curNode.next = node;
    node.next = next;
    curNode = next;
  }

  //设置每个copy节点的rand指针
  curNode = head;
  while (curNode) {
    const copyNode = curNode.next;
    const curNodeRand = curNode.rand;
    copyNode.rand = curNodeRand ? curNodeRand.next : null;
    curNode = curNode.next.next;
  }
  //摘出copy节点
  curNode = head;
  let copyHead = null;
  let curCopyNode = null;
  while (curNode) {
    const copyNode = curNode.next;
    if (!copyHead) {
      copyHead = copyNode;
      curCopyNode = copyNode;
    } else {
      curCopyNode.next = copyNode;
      curCopyNode = copyNode;
    }
    const next = curNode.next.next;
    curNode.next = next;
    curNode = next;
  }

  return copyHead;
}
function isEqual(links1, links2) {
  while (links1 && links2) {
    if (links1.value !== links2.value) {
      console.log(1);
      return false;
    }
    const rand1 = links1.rand ? links1.rand.value : null;
    const rand2 = links2.rand ? links2.rand.value : null;
    if (rand1 !== rand2) {
      console.log(2);
      return false;
    }
    links1 = links1.next;
    links2 = links2.next;
  }
  if (links1 || links2) {
    return false;
  }
  return true;
}
function main() {
  const maxValue = 5;
  const times = 100000;
  for (let i = 0; i < times; i++) {
    const arr = randomArr(i, maxValue);
    const links = productLinks(arr);
    const copyLinks1 = copyRandomList1(links);
    const copyLinks2 = copyRandomList2(links);
    if (!isEqual(links, copyLinks1)) {
      console.log("错误");
    }
    if (!isEqual(links, copyLinks2)) {
        console.log("错误");
      }
  }
}

main();
