// 二叉树的节点个数必须是 (2^N)-1

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
    public isFull: boolean = true, //是否是满
    public maxHeight: number = 0 //最大高度
  ) {}
}

function isFullBTree(head: Node): info {
  if (!head) {
    return new info();
  }

  const l = isFullBTree(head.left);
  const r = isFullBTree(head.right);

  let isFull = false;
  const maxHeight = Math.max(l.maxHeight, r.maxHeight);
  if (l.isFull && r.isFull && l.maxHeight == r.maxHeight) {
    isFull = true;
  }

  return new info(isFull, maxHeight);
}
