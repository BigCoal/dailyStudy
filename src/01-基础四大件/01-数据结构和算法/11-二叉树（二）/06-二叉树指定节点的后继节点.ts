// 二叉树结构如下定义：
// ```java
// Class Node {
//  V value;
//  Node left;
//  Node right;
//  Node parent;
// }
// ```
// 给你二叉树中的某个节点，返回该节点的后继节点(中序遍历中一个节点的下一个节点叫后继节点)

//中序遍历：左中右
//规则：
// 1) X有右树:
// X 中序遍历中的下一个是 X 右树上的最左孩子
// 只要 X 有右树, X的后继节点一定是 X 右树上的最左孩子
// 2) 如果X没有右树, 往上看
// 如果它是它父节点的右孩子就继续往上找, 一直找到某一个时刻
// 这个节点是它父节点的左孩子, 该父亲节点就是带查找节点的后继
// 如果是父亲节点的左孩子, 该父亲节点就是X的后继节点

export class Node {
  value: any;
  left: Node;
  right: Node;
  parent: Node;
  constructor(v: any) {
    this.value = v;
  }
}

export function getSuccessorNode(n: Node) {
  if (n.right) {
    let node = n.right;
    while (node.left) {
      node = node.left;
    }
    return node;
  } else {
    let node = n;
    let parent = node.parent;
    while (parent && parent.right == node) {
      node = parent;
      parent = node.parent;
    }
    return parent;
  }
}
