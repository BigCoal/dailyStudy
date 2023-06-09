// 1. 有若干个样本a、b、c、d…类型假设是V
// 2. 在并查集中一开始认为每个样本都在单独的集合里
// 3. 用户可以在任何时候调用如下两个方法 ：
//    boolean isSameSet(V x, V y) : 查询样本x和样本y是否属于一个集合
//    void union(V x, V y) : 把x和y各自所在集合的所有样本合并成一个集合
// 4. isSameSet和union方法的代价越低越好,单次均摊调用代价 O(1)

export class Node<V> {
  value: V;
  constructor(v: V) {
    this.value = v;
  }
}

class unionSet<V> {
  Nodes: Map<V, Node<V>> = new Map();
  sizeMap: Map<Node<V>, number> = new Map();
  parentMap: Map<Node<V>, Node<V>> = new Map();
  constructor(arr: Array<V>) {
    arr.forEach((item) => {
      const node = new Node(item);
      this.Nodes.set(item, node);
      this.sizeMap.set(node, 1);
      this.parentMap.set(node, node);
    });
  }
  findFather(node: Node<V>) {
    let n = node;
    while (this.parentMap.get(n) !== n) {
      n = this.parentMap.get(n);
    }

    //扁平化数据
    let t = node;
    while (this.parentMap.get(t) !== n) {
      this.parentMap.set(t, n);
      t = this.parentMap.get(t);
    }

    return n;
  }
  isSameSet(a: V, b: V) {
    const aNode = this.Nodes.get(a);
    const bNode = this.Nodes.get(b);
    if (aNode && bNode && this.findFather(aNode) == this.findFather(bNode)) {
      return true;
    }
    return false;
  }
  union(a: V, b: V) {
    const aNode = this.Nodes.get(a);
    const bNode = this.Nodes.get(b);
    if (aNode && bNode) {
      const aFather = this.findFather(aNode);
      const bFather = this.findFather(bNode);
      if (aFather !== bFather) {
        const aFatherSize = this.sizeMap.get(aFather);
        const bFatherSize = this.sizeMap.get(bFather);
        if (aFatherSize >= bFatherSize) {
          this.parentMap.set(bFather, aFather);
          this.sizeMap.set(aFather, aFatherSize + bFatherSize);
          this.sizeMap.delete(bFather);
        } else {
          this.parentMap.set(aFather, bFather);
          this.sizeMap.set(bFather, aFatherSize + bFatherSize);
          this.sizeMap.delete(aFather);
        }
      }
    }
  }
}

function main() {
  let arr = [1, 2, 3, 4, 5, 6, 7, 8];
  const u = new unionSet(arr);
  u.union(1, 3);
  u.union(3, 4);
  u.union(1, 6);
  u.union(3, 6);
  u.union(2, 4);
  u.union(5, 8);
  console.log(u.parentMap);
  console.log(u.sizeMap);
}

main();
