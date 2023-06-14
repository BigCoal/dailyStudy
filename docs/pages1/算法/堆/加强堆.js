//实现加强堆，
// 要求
// 1.按照自定义比较器比较大小

// 2.当某个对象里的值变化的时候重新进行排序

class HeapGreater {
  comp = null;
  heap = null;
  heapSize = 0;
  heapPosMap = null; //堆中每个节点在Map中对应的位置
  constructor(comp) {
    this.comp = comp;
    this.heap = [];
    this.heapPosMap = new Map();
  }

  push(val) {
    this.heap.push(val);
    this.heapPosMap.set(val, this.heapSize);
    this.heapInsert(this.heapSize++);
  }

  pop() {
    if (this.heapSize == 0) return;
    const ans = this.heap[0];
    this.swap(0, --this.heapSize);
    this.heap.pop();
    this.heapPosMap.delete(ans);
    this.heapify(0);
    return ans;
  }

  remove(obj) {
    const pos = this.heapPosMap.get(obj);
    if (pos) {
      const replace = this.heap[--this.heapSize];
      this.heap.pop();
      this.heapPosMap.delete(obj);
      if (replace !== obj) {
        this.heap[pos] = replace;
        this.heapPosMap.set(replace, pos);
        this.resign(replace);
      }
    }
  }

  resign(obj) {
    const pos = this.heapPosMap.get(obj);
    if (pos) {
      this.heapify(pos);
      this.heapInsert(pos);
    }
  }

  getAllElement(){
      return [...this.heap ]
  }

  heapInsert(pos) {
    let parent = Math.floor((pos - 1) / 2);
    while (parent >= 0 && this.comp(this.heap[pos], this.heap[parent]) < 0) {
      this.swap(parent, pos);
      pos = parent;
      parent = Math.floor((pos - 1) / 2);
    }
  }

  heapify(pos) {
    let left = pos * 2 + 1;
    while (left < this.heapSize) {
      let right = left + 1;
      const condition =
        right < this.heapSize &&
        this.comp(this.heap[right], this.heap[left]) < 0;
      const index = condition ? right : left;
      if (this.comp(this.heap[index], this.heap[pos]) < 0) {
        this.swap(pos, index);
      } else {
        return;
      }
      pos = index;
      left = pos * 2 + 1;
    }
  }

  swap(i, j) {
    let o1 = this.heap[i];
    let o2 = this.heap[j];
    this.heap[i] = o2;
    this.heap[j] = o1;
    this.heapPosMap.set(o1, j);
    this.heapPosMap.set(o2, i);
  }

  peek() {
    const cur = this.heapSize;
    if (cur < 0) {
      return null;
    } else {
      this.heapSize--;
    }
  }
}

function main() {
  const heap = new HeapGreater(function (a, b) {
    return a.val - b.val;
  });
  const obj = { name: "六号", val: 6 };
  heap.push({ name: "四号", val: 4 });
  heap.push({ name: "五号", val: 5 });
  heap.push(obj);
  heap.push({ name: "二号", val: 2 });
  heap.push({ name: "一号", val: 1 });
  heap.push({ name: "三号", val: 3 });

  console.log(heap.heapPosMap);
  heap.remove(obj);
  //   heap.pop();
  console.log(heap.heapPosMap);
}

main();
