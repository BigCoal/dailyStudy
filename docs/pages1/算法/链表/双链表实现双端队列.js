class Node {
  value = null;
  next = null;
  last = null;
  constructor(val) {
    this.value = val;
  }
}

class doubleStack {
  head = null;
  tail = null;
  unshift(val) {
    const cur = new Node(val);
    if (this.head == null) {
      this.head = cur;
      this.tail = cur;
    } else {
      this.head.last = cur;
      cur.next = this.head;
      this.head = cur;
    }
    return val;
  }
  shift() {
    if (!this.head) {
        return null;
      } else if (this.head == this.tail) {
        const value = this.head.value;
        this.head = null;
        this.tail = null;
        return value;
      } else {
        const value = this.head.value;
        this.head = this.head.next;
        this.head.last = null;
        return value;
      }
  }
  //加入节点
  push(val) {
    const cur = new Node(val);
    if (this.head == null) {
      this.head = cur;
      this.tail = cur;
    } else {
      this.tail.next = cur;
      cur.last = this.tail;
      this.tail = cur;
    }
    return val;
  }

  //弹出节点
  pop() {
    if (!this.head) {
      return null;
    } else if (this.head == this.tail) {
      const value = this.head.value;
      this.head = null;
      this.tail = null;
      return value;
    } else {
      const value = this.tail.value;
      this.tail = this.tail.last;
      this.tail.next = null;
      return value;
    }
  }
}

function main() {
  const dStack = new doubleStack();
  dStack.push(1)
  dStack.push(3)
  dStack.push(5)
  console.log(dStack.pop())
  console.log(dStack.pop())
  dStack.unshift(100)
  dStack.unshift(102)
  dStack.unshift(105)
  console.log(dStack.shift())
  console.log(dStack.shift())
  console.log(dStack.shift())
  console.log(dStack.shift())
  console.log(dStack.shift())
  console.log(dStack.pop())
}


main()