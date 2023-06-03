// 跳表不是搜索二叉树，而是一种特殊存在的格式，可以用这种格式来简单的表达有序表，添加和删除的代价都是O(logN)
//具体实现：当有一个新的key进来的时候，扔骰子，当<0.5的时候让该key的表长度增加1
//假设一共有N个点，最底层为N个数，第二层1/2的概率小于0.5，有N/2个数，第三层有1/4的概率又小于0.5，所以有N/4个数，N/8，N/16...
//当查找的时候首先从最顶层查小于等于查找的数的第一个位置，最顶层移动一次，下面的层移动好多，然后基于顶层找到的位置在次顶层继续找，最终代价是O(logN)
class skipListNode {
  key: number;
  value: any;
  nodeList: skipListNode | null[];
  constructor(key: number, value: any) {
    this.key = key;
    this.value = value;
    this.nodeList = [];
  }
}
class SkipList {
  head: skipListNode; //头节点
  maxLevel: number; //最大高度
  constructor() {
    this.head = new skipListNode(null, null);
    this.head.nodeList.push(null);
    this.maxLevel = 0;
  }
  delete(key: number) {
    const pre = this.mostRightLessNodeInTree(key);
    const find = pre.nodeList[0];
    if (find !== null && find.key == key) {
      let level = this.maxLevel;
      let pre = this.head;
      while (level >= 0) {
        pre = this.mostRightLessNodeInLevel(pre, key, level);
        const next = pre.nodeList[level];
        if (next != null && next.key == key) {
          pre.nodeList[level] = next[level];
        } //删除空行

        if (level !== 0 && pre == this.head && pre.nodeList[level] == null) {
          this.head.nodeList.pop();
          this.maxLevel--;
        }
        level--;
      }
    }
  }

  mostRightLessNodeInTree(key: number) {
    let level = this.maxLevel;
    let cur = this.head;
    while (level >= 0) {
      cur = this.mostRightLessNodeInLevel(cur, key, level);
      level--;
    }
    return cur;
  }
  mostRightLessNodeInLevel(cur: skipListNode, key: number, level: number) {
    let next = cur.nodeList[level];
    while (next !== null && next.key < key) {
      cur = next;
      next = cur.nodeList[level];
    }
    return cur;
  }
  put(key: number, value: any) {
    const pre = this.mostRightLessNodeInTree(key);
    const find = pre.nodeList[0];
    if (find && find.key == key) {
      find.value = value;
    } else {
      let curLevel = 0;
      while (Math.random() < 0.5) {
        curLevel++;
      }

      while (this.maxLevel < curLevel) {
        this.maxLevel++;
        this.head.nodeList.push(null);
      }

      const node = new skipListNode(key, value);
      for (let i = 0; i < curLevel; i++) {
        node.nodeList.push(null);
      }

      let level = this.maxLevel;

      let pre = this.head;
      while (level >= 0) {
        pre = this.mostRightLessNodeInLevel(pre, key, level);
        if (level <= curLevel) {
          node.nodeList[level] = pre.nodeList[level];
          pre.nodeList[level] = node;
        }
        level--;
      }
    }
  }
}
