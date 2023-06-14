//用固定长度的数组实现栈和队列

//思路：用index来代表栈中的位置来实现
class Stack {
  index = 0;
  len = 5;
  arr = new Array(this.len);
  push(val) {
    if (index < len - 1) {
      arr[index++] = val;
    }
  }
  pop() {
    if (index !== 0) {
      index--;
    }
  }
  isEmpty() {
    return index === 0;
  }
}
//思路：用两个循环索引来表示进出，用size控制长度
class Queue {
  i = 0;
  j = 0;
  size = 0;
  len = 5;
  arr = new Array(this.len);
  push(val) {
    if (this.size < this.len) {
      this.arr[this.i % this.len] = val;
      this.size++;
      this.i++;
    } else {
      console.warn("溢出");
    }
  }
  pop() {
    if (this.size !== 0) {
      this.size--;
      return this.arr[this.j++ % this.len];
    } else {
      return null;
    }
  }
  getSize() {
    return this.size;
  }
}

function main() {
  let myQueue = new Queue();
  myQueue.push(1);
  myQueue.push(2);
  myQueue.push(3);

  myQueue.push(4);
  myQueue.push(5);

  console.log(myQueue.pop());
  myQueue.push(6);
  console.log(myQueue.pop());
  console.log(myQueue.pop());
  console.log(myQueue.pop());
  console.log(myQueue.pop());
  myQueue.push(1);
  myQueue.push(2);
  myQueue.push(3);

  myQueue.push(4);
  console.log(myQueue.pop());
  console.log(myQueue.pop());
  console.log(myQueue.pop());
  console.log(myQueue.pop());
}

main();
