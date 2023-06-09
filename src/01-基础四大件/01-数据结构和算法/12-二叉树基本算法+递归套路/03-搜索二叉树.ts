//对于任何一颗子树来说，左树的所有的值比头小 右侧的所有的值比头大

//判断一颗树是不是搜索二叉树

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
    public isSearch: boolean = true, //是否是搜索二叉树
    public max: number = Number.MIN_SAFE_INTEGER, //当前树的最大值
    public min: number = Number.MAX_SAFE_INTEGER //当前树的最小值
  ) {}
}

function isSearchBTree(head: Node): info {
  if (!head) {
    return new info();
  }

  const l = isSearchBTree(head.left);
  const r = isSearchBTree(head.right);

  let isSearch = false;
  console.log(l.max < head.value);
  console.log(r.min > head.value);

  if (l.isSearch && r.isSearch && l.max < head.value && r.min > head.value) {
    isSearch = true;
  }
  const max = Math.max(head.value, r.max);
  const min = Math.min(head.value, l.min);

  return new info(isSearch, max, min);
}

console.log(isSearchBTree(new Node(0)).isSearch);
