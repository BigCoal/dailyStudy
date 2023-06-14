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
//创建双项链表
function ArrayToDoubleLinks(arr) {
  class Node {
    value = null;
    next = null;
    last = null;
    constructor(val) {
      this.value = val;
    }
    setLastNode(last) {
      this.last = last;
    }
    setNextNode(next) {
      this.next = next;
    }
  }
  let head = new Node(arr[0]);
  let lastNode = null;
  let nextNode = head;

  for (let i = 0; i < arr.length; i++) {
    let curNode = nextNode;
    curNode.setLastNode(lastNode);
    nextNode = i + 1 == arr.length ? null : new Node(arr[i + 1]);
    lastNode = curNode;
    curNode.setNextNode(nextNode);
  }

  return head;
}

//单链表反转
function singleLinkedListReversal(head) {
  let pre = null;
  while (head) {
    const next = head.next;
    head.next = pre;
    pre = head;
    head = next;
  }
  return pre;
}

//双向链表反转
function doubleLinkedListReversal(head) {
  let pre = null;
  while (head) {
    const next = head.next;
    head.next = pre;
    head.last = next;
    pre = head;
    head = next;
  }
  return pre;
}

function validateDoubleLinkEqual(head1, head2) {
  let position = "right";
  while (true) {
    if (head1.value !== head2.value) {
      return false;
    }

    if (head1.next === null && head2.next === null) {
      position = "left";
    }

    head1 = position == "right" ? head1.next : head1.last;
    head2 = position == "right" ? head2.next : head2.last;

    if (position == "left" && !head1 && !head2) {
      return true;
    }
  }
}

function main() {
  const arr = randomArray(50, 100);
//   console.log(arr);

  //   //验证单链表反转是否正确
  //  const singleLink = ArrayToSingleLinks(arr);
  //   const reverseSingleLink = singleLinkedListReversal(link);
  //   if (
  //     JSON.stringify(reverseSingleLink) !==
  //     JSON.stringify(ArrayToSingleLinks(arr.reverse()))
  //   ) {
  //     console.log(JSON.stringify(reverseSingleLink));
  //     console.log("单链表反转失败");
  //   }
  const doubleLink = ArrayToDoubleLinks(arr);
  const reverseDoubleLink = doubleLinkedListReversal(doubleLink);
  if (!validateDoubleLinkEqual(reverseDoubleLink, ArrayToDoubleLinks(arr.reverse()))) {
    console.log("双链表反转失败");
  }
}

main();
