// 先序：任何子树的处理顺序都是，先头节点、再左子树、然后右子树
// 中序：任何子树的处理顺序都是，先左子树、再头节点、然后右子树
// 后序：任何子树的处理顺序都是，先左子树、再右子树、然后头节点

//递归的本质是递归序，对于二叉树上的每一个节点都会访问三次
//把打印的时机放到第一次来到该节点的时候就是先序
//把打印的时机放到第二次来到该节点的时候就是中序
//把打印的时机放到第三次来到该节点的时候就是后序
export class Node {
  value: any;
  left: Node;
  right: Node;
}

export function fn(n: Node) {
  if (n == null) {
    return;
  }
  //console.log(n.value)先序遍历
  fn(n.left);
  //console.log(n.value)中序遍历
  fn(n.right);
  //console.log(n.value)后序遍历
}
