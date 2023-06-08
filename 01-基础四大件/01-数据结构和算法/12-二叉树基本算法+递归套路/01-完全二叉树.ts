// 要不是满二叉树，要不就是在满的路上

//判断一颗树是不是完全二叉树

export class Node {
  value: any;
  left: Node;
  right: Node;
}

//BFS 解法
//1.如果某个节点只有右孩子没有左孩子，那一定不是
//2.满足1后，如果某个节点没有孩子节点，那么后序的都是叶子节点
function hasCompleteBTree1(head: Node) {
  let leaf = false;
  const queue: Node[] = [head];
  while (queue.length > 0) {
    const node = queue.pop();
    const l = node.left;
    const r = node.right;
    if ((leaf && (l || r)) || (!l && r)) {
      return false;
    }
    if (l) {
      queue.unshift(l);
    }
    if (r) {
      queue.unshift(r);
    }
    if (!l && !r) {
      leaf = true;
    }
  }
  return true;
}

//递归套路解法
//满足以下四点，则为完全二叉树：
//1.左树是满的，右树也是满的，并且右树height==左树height
//2.左树是满的，右树也是满的，并且右树height==左树height-1
//3.左树是满的，右树不是满的，并且右树height==左树height
//4.左树不是满的，右树是满的，并且右树height==左树height-1
class info {
  constructor(
    public isComplate: Boolean = true,
    public isFull: Boolean = true,
    public height: number = 0
  ) {}
}
function hasCompleteBTree2(head: Node): info {
  if (!head) {
    return new info();
  }

  const left = hasCompleteBTree2(head.left);
  const right = hasCompleteBTree2(head.right);

  let isComplate = false;
  let isFull = false;
  let height = left.height + 1;

  if (left.isFull && right.isFull && right.height == left.height) {
    isFull = true;
    isComplate = true;
  }
  if (left.isFull && right.isFull && right.height == left.height - 1) {
    isComplate = true;
  }
  if (left.isFull && right.isComplate && right.height == left.height) {
    isComplate = true;
  }
  if (left.isComplate && right.isFull && right.height == left.height - 1) {
    isComplate = true;
  }

  return new info(isComplate, isFull, height);
}
