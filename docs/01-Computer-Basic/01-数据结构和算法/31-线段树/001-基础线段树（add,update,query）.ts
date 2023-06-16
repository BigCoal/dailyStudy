class SegmentTree {
  //i从1开始，好计算
  private treeArr: number[] = [];
  private lazy: number[] = [];
  private sum: number[] = [];
  private updateStatus: boolean[] = [];
  private change: number[] = [];

  constructor(arr: number[]) {
    const len = arr.length + 1;
    this.treeArr.length = len;
    //下标从1开始建立初始线段树
    arr.unshift(0);
    this.build(arr, 1, len - 1, 1);
  }

  //arr 初始化构建从L...R的累加和填到sum[rt]位置
  private build(arr: number[], L: number, R: number, rt: number): number {
    if (L == R) {
      this.sum[rt] = arr[L];
      return this.sum[rt];
    }
    const mid = L + ((R - L) >> 1); //下标从1开始所以是向上取整
    //下标从1开始计算 左树是rt*2 右树是rt*2+1
    const leftRt = rt * 2;
    const rightRt = leftRt + 1;

    const leftSum = this.build(arr, L, mid, leftRt);
    const rightSum = this.build(arr, mid + 1, R, rightRt);

    this.sum[rt] = leftSum + rightSum;
    return this.sum[rt];
  }

  //懒不住了，下发更新
  //ln 左侧节点个数 rn 右侧节点个数
  private pushDown(rt: number, ln: number, rn: number) {
    if (this.updateStatus[rt]) {
      const updataNum = this.change[rt];
      this.updateStatus[rt << 1] = true;
      this.updateStatus[(rt << 1) | 1] = true;
      this.change[rt << 1] = updataNum;
      this.change[(rt << 1) | 1] = updataNum;
      this.lazy[rt << 1] = 0;
      this.lazy[(rt << 1) | 1] = 0;
      this.sum[rt << 1] += updataNum * ln;
      this.sum[(rt << 1) | 1] += updataNum * rn;
      this.updateStatus[rt] = false;
      this.change[rt] = 0;
    }
    if (this.lazy[rt]) {
      const lazeNum = this.lazy[rt];
      this.lazy[rt << 1] += lazeNum;
      this.lazy[(rt << 1) | 1] += lazeNum;
      this.sum[rt << 1] += lazeNum * ln;
      this.sum[(rt << 1) | 1] += lazeNum * rn;
      this.lazy[rt] = 0;
    }
  }
  //在L,R区间内累加M
  // 在arr[l~r]范围上，去add，1~N，
  // rt : 这个范围在sum中的下标
  public add(
    L: number,
    R: number,
    M: number,
    l: number,
    r: number,
    rt: number
  ): void {
    //全包 懒住数据
    if (L <= l && r <= R) {
      this.lazy[rt] += M;
      this.sum[rt] += (r - l + 1) * M;
      return;
    }

    const mid = l + ((r - l) >> 1); //向上取整
    this.pushDown(rt, mid - l + 1, r - mid);

    if (L <= mid) {
      this.add(L, R, M, l, mid, mid << 1);
    }
    if (R > mid) {
      this.add(L, R, M, mid + 1, r, (mid << 1) | 1);
    }
    this.sum[rt] = this.sum[rt << 1] + this.sum[(rt << 1) | 1];
  }

  public update(
    L: number,
    R: number,
    C: number,
    l: number,
    r: number,
    rt: number
  ): void {
    if (L <= l && r <= R) {
      this.updateStatus[rt] = true;
      this.change[rt] = C;
      this.lazy[rt] = 0;
      this.sum[rt] = C * (r - l + 1);
      return;
    }
    const mid = l + ((r - l) >> 1);
    this.pushDown(rt, mid - l + 1, r - mid);
    if (L <= mid) {
      this.update(L, R, C, l, mid, rt << 1);
    }
    if (R > mid) {
      this.update(L, R, C, mid + 1, r, (rt << 1) | 1);
    }
    this.sum[rt] = this.sum[rt << 1] + this.sum[(rt << 1) | 1];
  }

  public query(L: number, R: number, l: number, r: number, rt: number): number {
    if (L <= l && r <= R) {
      return this.sum[rt];
    }
    const mid = l + ((r - l) >> 1);
    this.pushDown(rt, mid - l + 1, r - mid);
    let sum = 0;
    console.log("---", mid, L, R, l, r);
    if (L <= mid) {
      sum += this.query(L, R, l, mid, rt << 1);
      console.log(sum);
    }
    if (R > mid) {
      sum += this.query(L, R, mid + 1, r, (rt << 1) | 1);
      console.log(sum);
    }
    return sum;
  }
}

(() => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const end = arr.length;
  const seg = new SegmentTree(arr);
  const start = 1;

  const root = 1;
  console.log(seg.query(7, 7, start, end, root));
  seg.add(7, 7, 4, start, end, root);
  console.log(seg.query(7, 7, start, end, root));
  seg.update(7, 7, 4, start, end, root);
  console.log(seg.query(7, 7, start, end, root));
})();
