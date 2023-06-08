// 给定一棵二叉树的头节点head，和另外两个节点a和b。
// 返回a和b的最低公共祖先

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
    public minCommonParent: Node = null, //最小公共祖先
    public isIncludeNode = false //是否包含其子节点
  ) {}
}

function commonParentNode(head: Node, n1: Node, n2: Node): info {
  if (!head) {
    return new info();
  }

  const l = commonParentNode(head.left, n1, n2);
  const r = commonParentNode(head.right, n1, n2);
  let minCommonParent = null;
  let isIncludeNode = false;
  if (
    l.isIncludeNode ||
    r.isIncludeNode ||
    head.value == n1.value ||
    head.value == n2.value
  ) {
    isIncludeNode = true;
  }

  //当前点包含两个值
  if (head.value == n1.value && head.value == n2.value) {
    minCommonParent = head;
  }
  //一个值在当前身上，另外一个值在孩子身上
  if ((head.value == n1.value || head.value == n2.value) && l.isIncludeNode) {
    minCommonParent = head;
  }
  //一个值在当前身上，另外一个值在孩子身上
  if ((head.value == n1.value || head.value == n2.value) && r.isIncludeNode) {
    minCommonParent = head;
  }
  //两个值分别在左右孩子身上
  if (l.isIncludeNode && r.isIncludeNode) {
    minCommonParent = head;
  }

  if (l.minCommonParent) {
    minCommonParent = l.minCommonParent;
  }

  if (r.minCommonParent) {
    minCommonParent = r.minCommonParent;
  }

  return new info(minCommonParent, isIncludeNode);
}

function deserialization(se: any[]) {
  let v = se.shift();
  if (v == null) {
    return;
  }
  const head = new Node(v);
  const queue = [head];

  while (se.length) {
    const node = queue.pop();
    const n1 = se.shift();
    node.left = new Node(n1);
    if (n1) {
      queue.unshift(node.left);
    }

    if (se.length) {
      const n2 = se.shift();
      node.right = new Node(n2);
      if (n2) {
        queue.unshift(node.right);
      }
    }
  }

  return head;
}

function main() {
  let tree = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4];
  const head = deserialization(tree);
  const p1 = commonParentNode(head, new Node(5), new Node(4));
  console.log(p1);
}

main();
