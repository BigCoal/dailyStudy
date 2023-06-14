class Node {
  left = null;
  right = null;
  value = null;
  constructor(value) {
    this.value = value;
  }
}

//生成随机树  treeDeep树的深度 maxValue节点随机最大值  isIntact是否是完全二叉树
function treeRandom(treeDeep, maxValue, isIntact) {
  if (!treeDeep || (!isIntact && Math.random() > 0.7)) return null;
  let node = new Node(Math.floor(Math.random() * maxValue));
  node.left = treeRandom(treeDeep - 1, maxValue, isIntact);
  node.right = treeRandom(treeDeep - 1, maxValue, true);
  return node;
}

//树的最大深度
function treeDeep(tree) {
  if (tree == null) {
    return 0;
  }
  return Math.max(treeDeep(tree.left), treeDeep(tree.right)) + 1;
}

function main() {
  const deep = 18;
  const maxValue = 100;
  const tree1 = treeRandom(deep, maxValue, false);
  console.log(treeDeep(tree1));
}

main();
