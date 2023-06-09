// 设计一个算法，可以将 N 叉树编码为二叉树，并能将该二叉树解码为原 N 叉树。一个 N 叉树是指每个节点都有不超过 N 个孩子节点的有根树。
//类似地，一个二叉树是指每个节点都有不超过 2 个孩子节点的有根树。你的编码 / 解码的算法的实现没有限制，你只需要保证一个 N 叉树可以编码为二叉树且该二叉树可以解码回原始 N 叉树即可。
// 例如，你可以将下面的 3-叉 树以该种方式编码：
// 注意，上面的方法仅仅是一个例子，可能可行也可能不可行。你没有必要遵循这种形式转化，你可以自己创造和实现不同的方法。
// 注意：
// N 的范围在 [1, 1000]
// 不要使用类成员 / 全局变量 / 静态变量来存储状态。你的编码和解码算法应是无状态的。
export class MulNode {
  value: any;
  children: MulNode[] = [];
  constructor(v: any) {
    this.value = v;
  }
}

export class Node {
  value: any;
  left: Node;
  right: Node;
  constructor(v: any) {
    this.value = v;
  }
}
//把每个孩子放到左孩子的右树上
function encode(n: MulNode) {
  const v = n.value;
  const children = n.children;
  let head = new Node(v);
  let curNode = head;
  for (let i = 0; i < children.length; i++) {
    const node = children[i];
    if (i == 0) {
      curNode.left = encode(node);
      curNode = curNode.left;
    } else {
      curNode.right = encode(node);
      curNode = curNode.right;
    }
  }
  return head;
}

function decode(n: Node) {
  const v = n.value;
  const mHead = new MulNode(v);
  let curNode = n;
  if (curNode.left) {
    curNode = curNode.left;
    mHead.children.push(decode(curNode));
    while (curNode.right) {
      curNode = curNode.right;
      mHead.children.push(decode(curNode));
    }
  }
  return mHead;
}

function main() {
  let n1 = new MulNode(1);
  let n2 = new MulNode(2);
  let n3 = new MulNode(3);
  let n4 = new MulNode(4);
  let n5 = new MulNode(5);
  let n6 = new MulNode(6);
  let n7 = new MulNode(7);

  n1.children.push(n2);
  n1.children.push(n3);
  n1.children.push(n4);
  n1.children.push(n5);

  n5.children.push(n6);
  n5.children.push(n7);

  const bTree = encode(n1);
  const mTree = decode(bTree);
  console.log(bTree);
  console.log(mTree);
}

main();
