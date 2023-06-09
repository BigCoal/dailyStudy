//Breadth-first traversal
export class Node {
  value: any;
  left: Node;
  right: Node;
  constructor(v: any) {
    this.value = v;
  }
}
function BFP(n: Node) {
  const queue = [n];
  while (queue.length) {
    const node = queue.pop();
    console.log(node.value);

    if (node.left) {
      queue.unshift(node.left);
    }
    if (node.right) {
      queue.unshift(node.right);
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

  BFP(n1);
}

main();
