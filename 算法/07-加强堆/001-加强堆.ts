class HeapGreater<T> {
  heap: T[];
  heapSize: number;
  indexMap: Map<T, number>;
  comparator: (a: T, b: T) => number;
  constructor(comparator: (a: T, b: T) => number) {
    this.heap = [];
    this.heapSize = 0;
    this.indexMap = new Map();
    this.comparator = comparator;
  }

  swap(i: number, j: number) {
    const obj1 = this.heap[i];
    const obj2 = this.heap[j];
    this.heap[i] = obj2;
    this.heap[j] = obj1;
    this.indexMap.set(obj1, j);
    this.indexMap.set(obj2, i);
  }

  heapInsert(index: number) {
    let parentIndex = Math.floor((index - 1) / 2);

    while (
      parentIndex >= 0 &&
      this.comparator(this.heap[index], this.heap[parentIndex]) > 0
    ) {
      this.swap(index, parentIndex);
      index = parentIndex;
      parentIndex = Math.floor((parentIndex - 1) / 2);
    }
  }

  heapify(index: number) {
    let left = index * 2 + 1;
    const lastIndex = this.heapSize - 1;
    if (left <= lastIndex) {
      const best =
        left + 1 <= lastIndex &&
        this.comparator(this.heap[left + 1], this.heap[left]) > 0
          ? left + 1
          : left;

      if (this.comparator(this.heap[index], this.heap[best]) < 0) {
        this.swap(index, best);
        index = left;
        left = best * 2 + 1;
      }
    }
  }

  push(obj: T) {
    this.heap.push(obj);
    let index = this.heapSize;
    this.indexMap.set(obj, index);
    this.heapInsert(index);
    this.heapSize++;
  }

  pop() {
    let ans = this.heap[0];
    this.swap(0, this.heapSize - 1);
    this.indexMap.delete(this.heap[this.heapSize - 1]);
    this.heap.pop();
    this.heapSize--;
    this.heapify(0);

    return ans;
  }

  update(obj: T) {
    let index = this.indexMap.get(obj);
    if (index !== undefined) {
      this.resign(index);
    }
  }

  resign(index: number) {
    this.heapInsert(index);
    this.heapify(index);
  }

  remove(obj: T) {
    let index = this.indexMap.get(obj);
    if (index !== undefined) {
      this.swap(index, this.heapSize - 1);
      this.heap.pop();
      this.indexMap.delete(obj);
      this.heapSize--;
      if (index !== this.heapSize) {
        //如果删除的是最后一个，则不用进行resign
        this.resign(index);
      }
      //
    }
  }

  isEmpty() {
    return this.heapSize == 0;
  }
}

if (require.main == module) {
  class Student {
    age: number;
    name: string;
    constructor(age: number, name: string) {
      this.age = age;
      this.name = name;
    }
  }

  let stu1 = new Student(15, "李白");
  let stu2 = new Student(26, "章三");
  let stu3 = new Student(12, "里斯");
  let stu4 = new Student(29, "王武");
  let stu5 = new Student(8, "熙熙");
  const comparatorFn = (a: Student, b: Student) => {
    return a.age - b.age;
  };
  const priorityQueue = new HeapGreater<Student>(comparatorFn);
  priorityQueue.push(stu1);
  priorityQueue.push(stu2);
  priorityQueue.push(stu3);
  priorityQueue.push(stu4);
  priorityQueue.push(stu5);

  stu4.age = 17;
  priorityQueue.update(stu4);

  priorityQueue.remove(stu3);
  priorityQueue.remove(stu1);

  while (!priorityQueue.isEmpty()) {
    console.log(priorityQueue.pop());
  }
}
