//SB 树 适用更广，平衡性没有AVL那么严格，如果在磁盘中采用AVL树调整，每次IO都要调整，影响太大
//SB 的调整策略： 叔叔的节点数量>=任何一个侄子节点数量
// 高手在删除的时候可以不做调整，因为在添加的时候会一次性调整好

class SBNode {
  key: number;
  value: any;
  left: SBNode;
  right: SBNode;
  size: number = 1; //所有孩子节点的数量（包含本节点）
  constructor(key: number, value: any) {
    this.key = key;
    this.value = value;
  }
}

class SBTree {
  root: SBNode;
  //左旋
  leftRotate(cur: SBNode) {
    const right = cur.right;
    cur.right = right.left;
    right.left = cur;
    cur.size =
      (cur.left ? cur.left.size : 0) + (cur.right ? cur.right.size : 0) + 1;
    right.size =
      (right.left ? right.left.size : 0) +
      (right.right ? right.right.size : 0) +
      1;
    return right;
  }
  //右旋
  rightRotate(cur: SBNode) {
    const left = cur.left;
    cur.left = left.right;
    left.right = cur;
    cur.size =
      (cur.left ? cur.left.size : 0) + (cur.right ? cur.right.size : 0) + 1;
    left.size =
      (left.left ? left.left.size : 0) + (left.right ? left.right.size : 0) + 1;
    return left;
  }
  maintain(cur: SBNode) {
    const leftSize = cur.left ? cur.left.size : 0;
    const rightSize = cur.right ? cur.right.size : 0;
    const leftLeftSize = leftSize && cur.left.left ? cur.left.left.size : 0;
    const leftRightSize = leftSize && cur.left.right ? cur.left.right.size : 0;
    const rightLeftSize = rightSize && cur.right.left ? cur.right.left.size : 0;
    const rightRightSize =
      rightSize && cur.right.right ? cur.right.right.size : 0;

    if (leftLeftSize > rightSize) {
      //LL
      cur = this.rightRotate(cur);
      //调整完后叔叔和侄子的关系改变了，重新maintain
      cur.right = this.maintain(cur.right);
      cur = this.maintain(cur);
    } else if (leftRightSize > rightSize) {
      //LR
      cur.left = this.leftRotate(cur.left);
      cur = this.rightRotate(cur);
      cur.right = this.maintain(cur.right);
      cur.left = this.maintain(cur.left);
      cur = this.maintain(cur);
    } else if (rightRightSize > leftSize) {
      //RR
      cur = this.leftRotate(cur);
      cur.left = this.maintain(cur.left);
      cur = this.maintain(cur);
    } else if (rightLeftSize > leftSize) {
      //RL
      cur.right = this.rightRotate(cur.right);
      cur = this.leftRotate(cur.left);
      cur.right = this.maintain(cur.right);
      cur.left = this.maintain(cur.left);
      cur = this.maintain(cur);
    }

    return cur;
  }
  put(cur: SBNode, key: number, value: any) {
    if (!cur) {
      return new SBNode(key, value);
    } else {
      cur.size++;
      if (key < cur.key) {
        cur.left = this.put(cur.left, key, value);
      } else if (key > cur.key) {
        cur.right = this.put(cur.right, key, value);
      }
    }

    return this.maintain(cur);
  }

  delete(cur: SBNode, key: number) {
    if (key < cur.key) {
      cur.size--;
      cur.left = this.delete(cur.left, key);
    } else if (key > cur.key) {
      cur.size--;
      cur.right = this.delete(cur.right, key);
    } else {
      if (!cur.left && !cur.right) {
        cur = null;
      } else if (cur.left && !cur.right) {
        cur = cur.left;
      } else if (!cur.left && cur.right) {
        cur = cur.right;
      } else {
        let des = cur.right;
        let pre = null;
        while (des.left) {
          pre = des;
          des.size--;
          des = des.left;
        }

        if (pre) {
          pre.left = des.right;
          des.right = cur.right;
        }
        des.left = cur.left;
        des.size =
          (cur.left ? cur.left.size : 0) + (cur.right ? cur.right.size : 0) + 1;
        cur = des;
      }
    }

    // cur = this.maintain(cur);  删除时候可以不调整
    return cur;
  }
}
