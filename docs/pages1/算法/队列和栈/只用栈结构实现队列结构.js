const { Stack } = require("./用双向链表实现栈和队列.js");

//思路，准备两个栈，来回倒腾数据

class StackToQueue {
  size = 0;
  stack1 = new Stack();
  stack2 = new Stack();
  push(val) {
    this.stack1.push(val);
    this.size++;
  }
  pop() {
    if (this.size == 0) {
      //两个栈都为null时，返回null
      return null;
    } else if (!this.stack2.isEmpty()) {
      //如果栈2有数据，直接2pop
      this.size--;
      return this.stack2.pop();
    } else {
      //如果栈2没有数据，stack1的数据押入2中,并且返回最后一个栈1的底数据
      this.size--;
      while (this.stack1.getSize() !== 1) {
        this.stack2.push(this.stack1.pop());
      }
      return this.stack1.pop();
    }
  }
  getSize() {
    return this.size;
  }
}

function main() {
  const queue = new StackToQueue();
  queue.push(1);
  queue.push(2);
  queue.push(3);
  console.log(queue.pop());
  console.log(queue.getSize());
  console.log(queue.pop());
  console.log(queue.pop());
  console.log(queue.pop());
  queue.push(4);
  queue.push(5);
  queue.push(6);
  console.log(queue.getSize());
  console.log(queue.pop());
  console.log(queue.pop());
  console.log(queue.pop());
  console.log(queue.pop());
}

main();
