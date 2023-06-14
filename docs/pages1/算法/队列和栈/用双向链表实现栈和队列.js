//思路：双端队列实现栈和队列比较简单，只需要对头尾节点操作即可
class Node {
  value = null;
  next = null;
  last = null;
  constructor(val) {
    this.value = val;
  }
}
class Stack {
  head = null;
  size = 0;
  push(val) {
    let node = new Node(val);
    if (!this.head) {
      this.head = node;
    } else {
      node.next = this.head;
      this.head.last = node;
      this.head = node;
    }
    this.size++;
  }
  pop() {
    if (this.head) {
      this.size--;
      const value = this.head.value;
      this.head = this.head.next;
      return value;
    } else {
      return null;
    }
  }
  isEmpty() {
    return this.head === null;
  }
  getSize() {
    return this.size;
  }
}
//思路：用两个循环索引来表示进出，用size控制长度
class Queue {
  head = null;
  end = null;
  push(val) {
    let node = new Node(val);
    if (!this.head) {
      this.head = node;
      this.end = node;
    } else {
      node.next = this.head;
      this.head.last = node;
      this.head = node;
    }
  }
  pop() {
    if (this.head !== null) {
      const value = this.end.value;
      this.end = this.end.last;
      if (this.end == null) {
        this.head = null;
      }
      return value;
    } else {
      return null;
    }
  }
  isEmpty() {
    return this.head === null;
  }
}

function main() {
  let queue = new Queue();
  queue.push(1);
  queue.push(2);
  queue.push(3);
  console.log(queue.pop());
  console.log(queue.pop());
  console.log(queue.pop());
  queue.push(4);
  queue.push(5);
  queue.push(6);
  console.log(queue.pop());
  console.log(queue.pop());
  console.log(queue.pop());
  console.log(queue.pop());
}
// main();

module.exports = {
  Stack,
  Queue,
};
