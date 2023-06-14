// 给定一棵二叉树的头节点head，
// 返回这颗二叉树中最大的二叉搜索子树的头节点
//整颗树不是二叉搜索树，但是局部是，返回最大二叉搜索子树（节点最多）的头节点
export class Node {
  value: any;
  left: Node;
  right: Node;
  constructor(v: number) {
    this.value = v;
  }
}

export class info {
  constructor(
    public isBST = true,
    public max = Number.MIN_SAFE_INTEGER,
    public min = Number.MAX_SAFE_INTEGER,
    public maxSize = 0, //搜索二叉树最大节点个数
    public maxHead: Node = null //搜索二叉树最大头节点
  ) {}
}

function maxBSTSize(head: Node): info {
  if (!head) {
    return new info();
  }

  const l = maxBSTSize(head.left);
  const r = maxBSTSize(head.right);

  let isBST = false;
  if (l.isBST && r.isBST && head.value > l.max && head.value < r.min) {
    isBST = true;
  }

  let maxSize = 0;
  let maxHead = null;
  if (isBST) {
    maxHead = head;
    maxSize = l.maxSize + r.maxSize + 1;
  } else {
    maxSize = Math.max(l.maxSize, r.maxSize);
    maxHead = l.maxSize > r.maxSize ? l.maxHead : r.maxHead;
  }

  const max = Math.max(head.value, r.max);
  const min = Math.min(head.value, l.min);

  return new info(isBST, max, min, maxSize, maxHead);
}
