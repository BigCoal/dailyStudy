class Node {
  val = null;
  next = null;
  constructor(val) {
    this.val = val;
  }
}
//获取随机数组
function randomArray(maxLen, maxValue) {
  const arr = new Array(Math.floor(Math.random() * maxLen));
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Math.floor(Math.random() * maxValue);
  }
  return arr;
}

//创建单项链表
function ArrayToSingleLinks(arr) {
  if (arr === null || arr.length == 0) {
    return null;
  }
  const headNode = new Node(arr[0]);
  let curNode = headNode;
  for (let i = 1; i < arr.length; i++) {
    const node = new Node(arr[i]);
    curNode.next = node;
    curNode = node;
  }
  return headNode;
}

function mergeLink(l1, l2) {
  if (l1 === null || l2 === null) {
    return l1 ? l1 : l2;
  }

  let F = l1.val <= l2.val ? l1 : l2; //起始链表，基础链表
  let S = F === l1 ? l2 : l1; //待混入链表
  let pre = F;
  const head = F;

  while (F && S) {
    if (F.val <= S.val) {
      pre = F;
      F = F.next;
    } else {
      pre.next = S;
      pre = S;
      const next = S.next;
      S.next = F;
      S = next;
    }
  }
  if (S) {
    pre.next = S;
  }

  return head;
}

function mergeLink2(l1, l2) {
  if (l1 === null || l2 === null) {
    return l1 ? l1 : l2;
  }

  let head = l1.val <= l2.val ? l1 : l2; //头节点
  let pre = head;
  let cur1 = head.next;
  let cur2 = head === l1 ? l2 : l1;

  while (cur1 && cur2) {
    if (cur1.val <= cur2.val) {
      pre.next = cur1;
      cur1 = cur1.next;
    } else {
      pre.next = cur2;
      cur2 = cur2.next;
    }
    pre = pre.next;
  }
  pre.next = cur1 ? cur1 : cur2;

  return head;
}
function sortNum(arr) {
  return arr.sort((a, b) => a - b);
}
function main() {
  for (let i = 0; i < 1000; i++) {
    let arr1 = randomArray(i, 10000);
    let arr2 = randomArray(i, 10000);
    // let arr1 = [ 2, 7, 9 ];
    // let arr2 =  [ 1, 2, 2, 5, 7 ];

    let head1 = ArrayToSingleLinks(sortNum(arr1));
    let head2 = ArrayToSingleLinks(sortNum(arr2));
    const strMergeLink = JSON.stringify(mergeLink2(head1, head2));
    const strMergeArrLink = JSON.stringify(
      ArrayToSingleLinks(sortNum([...arr1, ...arr2]))
    );

    if (strMergeLink !== strMergeArrLink) {
      console.log(sortNum(arr1), sortNum(arr2), head1, head2,strMergeLink);
      console.log("合并错误");
    }
  }
}
main();
