// 给定一棵二叉树的头节点head，任何两个节点之间都存在距离，
// 返回整棵二叉树的最大距离
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
    public maxDistance: number = 0, //最大距离
    public maxHeight: number = 0 //最大高度
  ) {}
}

function maxDis(head: Node): info {
  if (!head) {
    return new info();
  }

  const l = maxDis(head.left);
  const r = maxDis(head.right);

  const maxHeight = Math.max(l.maxHeight, r.maxHeight) + 1;
  let maxDistance = l.maxHeight + r.maxHeight + 1;
  maxDistance = Math.max(maxDistance, Math.max(l.maxDistance, r.maxDistance));

  return new info(maxDistance, maxHeight);
}
