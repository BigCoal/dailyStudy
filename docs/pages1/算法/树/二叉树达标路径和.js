class Node {
  left = null;
  right = null;
  value = null;
  constructor(value) {
    this.value = value;
  }
}

//按层遍历生成随机树
function treeRandom(arr) {
  if (!arr || arr.length == 0) {
    return null;
  }
  let i = 0;
  let j = 0;
  const nodeArr = [];
  const tree = new Node(arr[i]);
  let treeNode = tree;
  while (i !== arr.length) {
    if (arr[++j]) {
      treeNode.left = new Node(arr[j]);
      nodeArr.push(treeNode.left);
    }
    if (arr[++j]) {
      treeNode.right = new Node(arr[j]);
      nodeArr.push(treeNode.right);
    }
    treeNode = nodeArr.shift();
    i++;
  }
  return tree;
}

function treeLinkSumIsNum(tree, linkArr, sum, target, matchArr) {
  sum = sum + tree.value;
  linkArr.push(tree.value);
  if (!tree.left && !tree.right) {
    if (sum === target) {
      console.log("命中", JSON.stringify([...linkArr, tree.value]));
      matchArr.push([...linkArr]);
    }
    linkArr.pop()
    return false;
  }

  if (tree.left) {
    treeLinkSumIsNum(tree.left, linkArr, sum, target, matchArr);
  }
  if (tree.right) {
    treeLinkSumIsNum(tree.right, linkArr, sum, target, matchArr);
  }
  linkArr.pop();
}

function main() {
  const tree = treeRandom([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1]);
  console.log(tree);
  console.log(pathSum(tree, 22));
}

var pathSum = function (root, target) {
  const matchArr = [];
  if(root){
    treeLinkSumIsNum(root, [], 0, target, matchArr);
  }
  return matchArr;
};

main();
