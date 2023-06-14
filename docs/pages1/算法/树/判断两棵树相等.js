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
function isEqualTree(tree1, tree2) {
  //判断是否左树和右树是否有一个是null
  if ((tree1 == null) ^ (tree2 == null)) {
    return false;
  }

  if (tree1 == null && tree2 == null) {
    return true;
  }
  //如果两个头节点的值相同，判断左树结构是否相同，再次判断右树是否相同
  return (
    tree1.value == tree2.value &&
    isEqualTree(tree1.left, tree2.left) &&
    isEqualTree(tree1.right, tree2.right)
  );
}

function main() {
  const deep = 3;
  const arr1 = [57, 47, 18, 16, 77, 31];
  const arr2 = [57, 47, 18, 16, 77, 31];
  const tree1 = treeRandom(deep, arr1, true);
  const tree2 = treeRandom(deep, arr2, true);
  console.log(isEqualTree(tree1, tree2));
}

main();
