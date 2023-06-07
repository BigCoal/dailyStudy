// 先序：任何子树的处理顺序都是，先头节点、再左子树、然后右子树
// 中序：任何子树的处理顺序都是，先左子树、再头节点、然后右子树
// 后序：任何子树的处理顺序都是，先左子树、再右子树、然后头节点
//都是通过栈来从递归版本变成非递归版本
export class Node {
  value: any;
  left: Node;
  right: Node;
  constructor(v: any) {
    this.value = v;
  }
}

//先序遍历 头左右  头入栈 -》栈顶出栈（出打印）-》右孩子入 ，左孩子入 -》栈顶出栈（出打印）...循环到栈空结束
function preorder(n: Node) {
  const stack = [n];
  while (stack.length) {
    const node = stack.pop();
    console.log(node.value);
    const left = node.left;
    const right = node.right;
    if (right) stack.push(right);
    if (left) stack.push(left);
  }
}
//后序遍历 左右头-》先打印出头左右，然后调换下顺序就是左右头
//头入栈 -》栈顶出栈（出打印）-》左孩子入，右孩子入 -》栈顶出栈（出打印）...循环到栈空结束，调换顺序
function postorder(n: Node) {
  const stack = [n];
  let printNode = [];
  while (stack.length) {
    const node = stack.pop();
    printNode.push(node);
    const left = node.left;
    const right = node.right;
    if (left) stack.push(left);
    if (right) stack.push(right);
  }
  for (let i = printNode.length - 1; i >= 0; i--) {
    console.log(printNode[i].value);
  }
}
//中序遍历 左头右 先把头节点和所有的左孩子全部放入栈中-》栈顶出栈（出打印）-》把出栈的右孩子和所有右孩子的孩子全部放入栈中-》栈顶出栈（出打印）...直到栈空结束
function inorder(n: Node) {
  const stack: Node[] = [];
  let node = n;
  stack.push(node);
  while (node.left) {
    node = node.left;
    stack.push(node);
  }

  while (stack.length) {
    node = stack.pop();
    console.log(node.value);
    let right = node.right;
    if (right) {
      stack.push(right);
      while (right.left) {
        right = right.left;
        stack.push(right);
      }
    }
  }
}

function main() {
  let n1 = new Node(1);
  let n2 = new Node(2);
  let n3 = new Node(3);
  let n4 = new Node(4);
  let n5 = new Node(5);
  let n6 = new Node(6);
  let n7 = new Node(7);

  n1.left = n2;
  n1.right = n3;
  n2.left = n4;
  n2.right = n5;
  n3.left = n6;
  n3.right = n7;

  //   preorder(n1);
  inorder(n1);
  //   postorder(n1);
}

main();
