// 对于任意一颗子树来说，左树和右树的高度不能超过1

//判断一颗树是不是完全二叉树

export class Node {
  value: any;
  left: Node;
  right: Node;
}

export class info {
  constructor(public isBalance: Boolean = true, public height: number = 0) {}
}

function isBalanceBTree(head: Node): info {
  if (!head) {
    return new info();
  }

  const l = isBalanceBTree(head.left);
  const r = isBalanceBTree(head.right);

  const isBalance =
    l.isBalance && r.isBalance && Math.abs(l.height - r.height) <= 1;
  const height = Math.max(l.height, r.height) + 1;

  return new info(isBalance, height);
}
