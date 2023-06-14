class Node {
  left = null;
  right = null;
  value = null;
  constructor(val) {
    this.value = val;
  }
}

//生成随机树  treeDeep树的深度 maxValue节点随机最大值  isIntact是否是完全二叉树
function treeRandom(treeDeep, maxValue, isIntact) {
  if (!treeDeep || (!isIntact && Math.random() > 0.7)) return null;
  let node = new Node(Math.floor(Math.random() * maxValue));
  node.left = treeRandom(treeDeep - 1, maxValue, isIntact);
  node.right = treeRandom(treeDeep - 1, maxValue, isIntact);
  return node;
}

function preOrderTree(tree) {
  if (!tree) return [];
  return [].concat(
    tree.value,
    preOrderTree(tree.left),
    preOrderTree(tree.right)
  );
}

function midOrderTree(tree) {
  if (!tree) return [];
  return [].concat(
    midOrderTree(tree.left),
    tree.value,
    midOrderTree(tree.right)
  );
}
function equalTree(tree1, tree2) {
  if ((tree1 == null) ^ (tree2 == null)) {
    return false;
  }
  if (tree1 !== null && tree2 !== null) {
    return true;
  }

  return (
    tree1.value === tree2.value &&
    equalTree(tree1.left, tree2.left) &&
    equalTree(tree1.right, tree2.right)
  );
}

var buildTree = function (preorder, inorder) {
  //边界条件
  if (
    preorder.length !== inorder.length ||
    preorder == null ||
    inorder == null
  ) {
    return null;
  }

  return buildTree2(
    preorder,
    0,
    preorder.length - 1,
    inorder,
    0,
    inorder.length - 1
  );
};
function buildTree2(preorder, L1, R1, inorder, L2, R2) {
  if (L1 > R1) return null;
  const node = new Node(preorder[L1]);
  if (L1 === R1) {
    return node;
  }
  let find = 0;
  while (inorder[find] !== preorder[L1]) {
    find++;
  }
  node.left = buildTree2(
    preorder,
    L1 + 1,
    L1 + find - L2,
    inorder,
    L2,
    find - 1
  );
  node.right = buildTree2(
    preorder,
    L1 + find - L2 + 1,
    R1,
    inorder,
    find + 1,
    R2
  );

  return node;
}
function main() {
  for (let i = 1; i < 6; i++) {
    const treeNode = treeRandom(i, 200, false);
    if (!treeNode) continue;
    const preOrder = preOrderTree(treeNode);
    const midOrder = midOrderTree(treeNode);
    // console.log(preOrder, midOrder);

    const midMap = new Map();
    for (let i = 0; i < midOrder.length; i++) {
      midMap.set(midOrder[i], i);
    }
    const treeNode2 = buildTree(preOrder, midOrder);
    if (!equalTree(treeNode, treeNode2)) {
      console.log("失败");
    }
  }
}

main();
