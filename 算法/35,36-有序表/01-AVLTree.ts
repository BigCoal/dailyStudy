//AVLTree 平衡条件：任何节点的左孩子高度和右孩子的高度差必须<2

class AVLNode {
  key: number | string; //必须是可比较的，应该是唯一的，对于重复的key，做修改value操作
  value: any;
  height: number = 1; //高度
  left: AVLNode = null; //左树
  right: AVLNode = null; //右树
  constructor(key: number | string, value: any) {
    this.key = key;
    this.value = value;
  }
}

class AVLTree {
  root: AVLNode;
  //节点右旋
  rightRotate(cur: AVLNode) {
    const left = cur.left;
    cur.left = left.right;
    left.right = cur;
    cur.height =
      Math.max(
        cur.left ? cur.left.height : 0,
        cur.right ? cur.right.height : 0
      ) + 1;
    left.height =
      Math.max((left.left ? left.left.height : 0, left.right.height)) + 1;
    return left;
  }
  //节点左旋
  leftRotate(cur: AVLNode) {
    const right = cur.right;
    cur.right = right.left;
    right.left = cur;
    cur.height =
      Math.max(
        cur.left ? cur.left.height : 0,
        cur.right ? cur.right.height : 0
      ) + 1;
    right.height =
      Math.max(
        right.left ? right.left.height : 0,
        right.right ? right.right.height : 0
      ) + 1;
    return right;
  }

  //维持平衡 (LL LR RR RL)
  maintain(cur: AVLNode) {
    const leftHeight = cur.left ? cur.left.height : 0;
    const rightHeight = cur.right ? cur.right.height : 0;

    if (Math.abs(rightHeight - leftHeight) > 1) {
      if (leftHeight > rightHeight) {
        const leftLeftHeight =
          leftHeight && cur.left.left ? cur.left.left.height : 0;
        const leftRightHeight =
          leftHeight && cur.left.right ? cur.left.right.height : 0;

        if (leftLeftHeight >= leftRightHeight) {
          //LL调整
          cur = this.leftRotate(cur);
        } else {
          //LR调整
          cur.left = this.rightRotate(cur.left);
          cur = this.leftRotate(cur);
        }
      } else {
        //RR 或RL
        const rightLeftHeight =
          rightHeight && cur.right.left ? cur.right.left.height : 0;
        const rightRightHeight =
          rightHeight && cur.right.right ? cur.right.right.height : 0;
        if (rightRightHeight >= rightLeftHeight) {
          //RR 调整
          cur = this.leftRotate(cur);
        } else {
          //RL 调整
          cur.right = this.rightRotate(cur.right);
          cur = this.leftRotate(cur);
        }
      }
    }
    return cur;
  }

  //添加
  add(cur: AVLNode, key: number | string, value: any) {
    if (cur == null) {
      return new AVLNode(key, value);
    }
    if (key > cur.key) {
      cur.right = this.add(cur.right, key, value);
    } else if (key < cur.key) {
      cur.left = this.add(cur.left, key, value);
    }

    cur.height =
      Math.max(
        cur.left ? cur.left.height : 0,
        cur.right ? cur.right.height : 0
      ) + 1;

    return this.maintain(cur);
  }

  //删除
  delete(cur: AVLNode, key: number | string) {
    if (key > cur.key) {
      cur.right = this.delete(cur.right, key);
    } else if (key < cur.key) {
      cur.left = this.delete(cur.left, key);
    } else {
      if (!cur.left && !cur.right) {
        cur = null;
      } else if (!cur.left && cur.right) {
        cur = cur.right;
      } else if (cur.left && !cur.right) {
        cur = cur.left;
      } else {
        let des = cur.right;
        while (des.left) {
          des = des.left;
        }
        cur.right = this.delete(cur.right, des.key);
        des.left = cur.left;
        des.right = cur.right;
        cur = des;
      }
    }
    if (cur !== null) {
      cur.height =
        Math.max(
          cur.left ? cur.left.height : 0,
          cur.right ? cur.right.height : 0
        ) + 1;
    }

    return this.maintain(cur);
  }
}
