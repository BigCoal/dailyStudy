// 先序方式序列化
//  认为空不可忽略, 补全
//  遍历到谁就序列化谁, 一个值结束后面加,

//后序方式类似
//中序无法序列化  2-left-1  和  1-right-2  序列化答案都是[null,1,null,2,null]

export class Node {
  value: any;
  left: Node;
  right: Node;
  constructor(v: any) {
    this.value = v;
  }
}

function serialize(n: Node) {
  const stack = [n];
  const serArr = [];
  while (stack.length) {
    const node = stack.pop();
    serArr.push(node ? node.value : null);
    if (node) {
      stack.push(node.right);
      stack.push(node.left);
    }
  }
  return serArr;
}

function deserialization(se: any[]) {
  let v = se.shift();
  if (v == null) {
    return;
  }
  const head = new Node(v);
  head.left = deserialization(se);
  head.right = deserialization(se);
  return head;
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

  const se = serialize(n1);
  console.log(se);
  console.log(deserialization(se));
}

main();
