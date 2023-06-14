class Node {
  pass = 0;
  end = 0;
  next = new Array(26);
}

class Tree {
  treeNode;
  constructor() {
    this.treeNode = new Node();
  }

  add(val) {
    if (!val) return;
    let curNode = this.treeNode;
    curNode.pass++;
    for (let i = 0; i < val.length; i++) {
      const num = val[i].charCodeAt() - "a".charCodeAt();
      let next = curNode.next[num];
      if (!next) {
        curNode.next[num] = next = new Node();
      }
      curNode = next;
      curNode.pass++;
    }
    curNode.end++;
  }
  remove(val) {
    if (this.search(val)) {
     let  curNode = this.treeNode;
      curNode.pass--;
      for (let i = 0; i < val.length; i++) {
        const num = val[i].charCodeAt() - "a".charCodeAt();
        const next = curNode.next[num];
        if (next.pass == 1) {
          curNode.next[num] = null;
          return;
        }
        next.pass--;
        curNode = next;
      }
      curNode.end--;
    }
  }
  search(val) {
    if (!val) return false;
    let curNode = this.treeNode;
    for (let i = 0; i < val.length; i++) {
      const num = val[i].charCodeAt() - "a".charCodeAt();
      curNode = curNode.next[num];
      if (!curNode) {
        return false;
      }
    }
    return curNode.end > 0;
  }
  searchPrefix(val) {
    if (!val) return 0;
    let curNode = this.treeNode;
    for (let i = 0; i < val.length; i++) {
      const num = val[i].charCodeAt() - "a".charCodeAt();
      curNode = curNode.next[num];
      if (!curNode) {
        return false;
      }
    }
    return curNode.pass;
  }
}

function main() {
  let tree = new Tree();
  let arr = ["dac","djs","dg","dab"];
  for (let i = 0; i < arr.length; i++) {
    tree.add(arr[i]);
  }
  tree.remove("dac")
  tree.remove("djs")
  tree.remove("dg")
  tree.remove("dab")
//   console.log(tree.remove("dab"));
//   console.log(tree.remove("dac"));
  console.log(tree.treeNode);
}

main();
