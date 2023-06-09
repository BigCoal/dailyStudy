// curLevelNum 记录当前层还有几个 nextLevelNum 记录下一层有几个节点

export class Node {
  value: any;
  left: Node;
  right: Node;
  constructor(v: any) {
    this.value = v;
  }
}
function BFPMaxNum(n: Node) {
  const queue = [n];
  let curLevelNum = 1;
  let nextLevelNum = 0;
  let maxLevelNum = 0;
  while (queue.length) {
    const node = queue.pop();
    curLevelNum--;

    if (node.left) {
      queue.unshift(node.left);
      nextLevelNum++;
    }
    if (node.right) {
      queue.unshift(node.right);
      nextLevelNum++;
    }

    if (curLevelNum == 0) {
      maxLevelNum = Math.max(maxLevelNum, nextLevelNum);
      curLevelNum = nextLevelNum;
      nextLevelNum = 0;
    }
  }

  return maxLevelNum;
}

function main() {
  let n1 = new Node(1);
  let n2 = new Node(2);
  let n3 = new Node(3);
  let n4 = new Node(4);
  let n5 = new Node(5);
  let n6 = new Node(6);
  let n7 = new Node(7);

  n1.left = n2;
  n1.right = n3;
  n2.left = n4;

  console.log(BFPMaxNum(n1));
}

main();
