//https://leetcode-cn.com/problems/add-two-numbers/submissions/

class Node {
  val = null;
  next = null;
  constructor(val) {
    this.val = val;
  }
}
//获取随机数组
function randomArray(len, maxValue) {
  const arr = new Array(len);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Math.floor(Math.random() * maxValue);
  }
  return arr;
}

//创建单项链表
function ArrayToSingleLinks(arr) {
  const headNode = new Node(arr[0]);
  let curNode = headNode;
  for (let i = 1; i < arr.length; i++) {
    const node = new Node(arr[i]);
    curNode.next = node;
    curNode = node;
  }
  return headNode;
}

function linkAdd(l1, l2) {
  const l1Len = linkLen(l1);
  const l2Len = linkLen(l2);
  let l = l1Len > l2Len ? l1 : l2; //最长的链
  let s = l == l1 ? l2 : l1; //最短的链
  let pre = null;
  const head = l;
  let carry = 0;
  while (l && s) {
    const sum = l.val + s.val + carry;
    carry = sum >= 10 ? 1 : 0;
    l.val = sum % 10;
    pre = l;
    l = l.next;
    s = s.next;
  }

  while (l && carry) {
    console.log(l, carry);
    const sum = l.val + carry;
    carry = sum >= 10 ? 1 : 0;
    l.val = sum % 10;
    pre = l;
    l = l.next;
  }

  if (carry) {
    pre.next = new Node(1);
  }

  return head;
}

function linkLen(head) {
  let curNode = head;
  let len = 0;
  while (curNode) {
    len++;
    curNode = curNode.next;
  }
  return len;
}

function main() {
  let arr1 = randomArray(5, 10);
  let arr2 = randomArray(3, 10);
  const link1 = ArrayToSingleLinks([9, 9, 9, 9, 9, 9, 9]);
  const link2 = ArrayToSingleLinks([9, 9, 9, 9]);
  console.log(arr1, arr2);

  console.log(JSON.stringify(linkAdd(link1, link2)));
}

main();
