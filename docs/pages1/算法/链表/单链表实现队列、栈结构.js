class Node {
  value = null;
  next = null;
  constructor(val, next = null) {
    this.value = val;
    this.next = next;
  }
}

//实现队列功能 先进先出
class myQueue {
  head = null;
  tail = null;
  size = 0;
  constructor() {}
  //是否为空
  isEmpty() {
    return this.head == null;
  }
  //有多少节点
  sizes() {
    return this.size;
  }
  //加入节点
  offer(val) {
    const cur = new Node(val);
    if (this.head == null) {
      this.head = cur;
      this.tail = cur;
    } else {
      this.tail.next = cur;
      this.tail = cur;
    }
    this.size++;
    return val;
  }
  //弹出节点
  poll() {
    if (!this.head) {
      return null;
    } else if (this.head == this.tail) {
      const value = this.head.value;
      this.head = null;
      this.tail = null;
      this.size--;
      return value;
    } else {
      const value = this.head.value;
      this.head = this.head.next;
      this.size--;
      return value;
    }
  }
  //此时要弹出的节点是什么
  peek() {
    if (!this.tail) {
      return null;
    } else {
      return this.head.value;
    }
  }
}
//实现栈 后进先出
class myStack {
  head = null;
  size = 0;
  //是否为空
  isEmpty() {
    return this.head == null;
  }
  //有多少节点
  sizes() {
    return this.size;
  }
  push(val) {
    const cur = new Node(val);
    if (!this.head) {
      this.head = cur;
    } else {
      cur.next = this.head;
      this.head = cur;
    }
    this.size++;
  }
  pop() {
    if (!this.head) {
      return null;
    } else {
      const value = this.head.value;
      this.head = this.head.next;
      this.size--;
      return value;
    }
  }
  //此时要弹出的节点是什么
  peek() {
    if (!this.head) {
      return null;
    } else {
      return this.head.value;
    }
  }
}

function main() {
//   const queue = new myQueue();
//   console.log(queue.isEmpty());
//   console.log(queue.sizes());
//   queue.offer(888);
//   queue.offer(999);
//   queue.offer(100);
//   console.log(queue.sizes());
//   console.log(queue.peek());
//   console.log(queue.poll());
//   console.log(queue.peek());
//   console.log(queue.poll());
//   console.log(queue.peek());
//   console.log(queue.poll());
//   console.log(queue.peek());
//   console.log(queue.poll());
//   console.log(queue.isEmpty());
//   console.log(queue.sizes());


  const stack = new myStack();
  console.log(stack.isEmpty());
  console.log(stack.sizes());
  stack.push(888);
  stack.push(999);
  stack.push(100);
  console.log(stack.sizes());
  console.log(stack.peek());
  console.log(stack.pop());
  console.log(stack.peek());
  console.log(stack.pop());
  console.log(stack.peek());
  console.log(stack.pop());
  console.log(stack.peek());
  console.log(stack.pop());
  console.log(stack.isEmpty());
  console.log(stack.sizes());
}

main();
