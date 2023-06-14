//给定一个单链表的head节点和一个正数k，实现k个节点的小组内部逆序调整，如果最后一个组不够k个，则不进行调整
//获取随机数组
function randomArray(len, maxValue) {
  const arr = new Array(len);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Math.floor(Math.random() * maxValue);
  }
  return arr;
}
//单链表反转
function singleLinkedListReversal(head) {
  let pre = null;
  const end = head;
  while (head) {
    const next = head.next;
    head.next = pre;
    pre = head;
    head = next;
  }
  return {
      head:pre,
      end
  };
}
//创建单项链表
function ArrayToSingleLinks(arr) {
  class Node {
    value = null;
    next = null;
    constructor(val, next) {
      (this.value = val), (this.next = next);
    }
  }
  let nextNode = null;
  for (let i = arr.length - 1; i >= 0; i--) {
    nextNode = new Node(arr[i], nextNode);
  }
  return nextNode;
}
function singleLinkGroupReserve(head, k) {
  let pre = null;
  let groupStart = null;
  let i = 1;
  while (head) {
    if (i %3==0) {
      
    }
    
    i++;
  }
  return head;
}

function main() {
  const arr = randomArray(6, 100);
  console.log(arr);

  const singleLink = ArrayToSingleLinks(arr);
  console.log(JSON.stringify(singleLinkGroupReserve(singleLink, 3)));
}

main();
