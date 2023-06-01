// 跳表不是搜索二叉树，而是一种特殊存在的格式，可以用这种格式来简单的表达有序表，添加和删除的代价都是O(logN)
//具体实现：当有一个新的key进来的时候，扔骰子，当<0.5的时候让该key的表长度增加1
//假设一共有N个点，最底层为N个数，第二层1/2的概率小于0.5，有N/2个数，第三层有1/4的概率又小于0.5，所以有N/4个数，N/8，N/16...
//当查找的时候首先从最顶层查小于等于查找的数的第一个位置，最顶层移动一次，下面的层移动好多，然后基于顶层找到的位置在次顶层继续找，最终代价是O(logN)

class skipListNode {
  key: number;
  value: any;
  nodeList: skipListNode[];
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
    this.maxLevel = 0;
  }
}
