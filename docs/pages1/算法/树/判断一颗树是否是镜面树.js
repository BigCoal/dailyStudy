class Node {
  left = null;
  right = null;
  value = null;
  constructor(value) {
    this.value = value;
  }
}

//生成随机树  treeDeep树的深度 maxValue节点随机最大值  isIntact是否是完全二叉树
function treeRandom(treeDeep, arr, isIntact) {
  if (!treeDeep || arr.length == 0) return null;
  let node = new Node(arr.shift());
  node.left = treeRandom(treeDeep - 1, arr, isIntact);
  node.right = treeRandom(treeDeep - 1, arr, isIntact);
  return node;
}

//判断两棵树相等
function isMirrorTree(tree1, tree2) {
  if ((tree1 == null) ^ (tree2 == null)) {
    return false;
  }
  if (tree1 == null && tree2 == null) {
    return true;
  }

  return (
    tree1.value === tree2.value &&
    isMirrorTree(tree1.left, tree2.right) &&
    isMirrorTree(tree1.right, tree2.left)
  );
}

function main() {
  const deep = 3;
  const arr1 = [1, 2, 3, 4, 2, 4, 4];
  const tree1 = treeRandom(deep, arr1, true);
  console.log(isMirrorTree(tree1.left, tree1.right));
}

main();
