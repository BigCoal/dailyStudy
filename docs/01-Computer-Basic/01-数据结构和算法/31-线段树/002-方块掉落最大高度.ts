// 在二维平面上的 x 轴上，放置着一些方块。
// 给你一个二维整数数组 positions ，其中 positions[i] = [lefti, sideLengthi] 表示：第 i 个方块边长为 sideLengthi ，其左侧边与 x 轴上坐标点 lefti 对齐。
// 每个方块都从一个比目前所有的落地方块更高的高度掉落而下。方块沿 y 轴负方向下落，直到着陆到 另一个正方形的顶边 或者是 x 轴上 。一个方块仅仅是擦过另一个方块的左侧边或右侧边不算着陆。一旦着陆，它就会固定在原地，无法移动。
// 在每个方块掉落后，你必须记录目前所有已经落稳的 方块堆叠的最高高度 
// 返回一个整数数组 ans ，其中 ans[i] 表示在第 i 块方块掉落后堆叠的最高高度。
// 链接：https://leetcode.cn/problems/falling-squares

// 输入：positions = [[1,2],[2,3],[6,1]]
// 输出：[2,5,5]
// 解释：
// 第 1 个方块掉落后，最高的堆叠由方块 1 组成，堆叠的最高高度为 2 。
// 第 2 个方块掉落后，最高的堆叠由方块 1 和 2 组成，堆叠的最高高度为 5 。
// 第 3 个方块掉落后，最高的堆叠仍然由方块 1 和 2 组成，堆叠的最高高度为 5 。
// 因此，返回 [2, 5, 5] 作为答案。

class segmentTree {
    private treeLen: number;
    private updateStatus: boolean[] = [];
    private change: number[] = [];

    constructor(num: number) {
        this.treeLen = num + 1
    }

    private pushDown(rt: number) {
        if (this.updateStatus[rt]) {
            this.updateStatus[rt << 1] = true
            this.updateStatus[rt << 1 | 1] = true
            this.change[rt << 1] = this.change[rt]
            this.change[rt << 1 | 1] = this.change[rt]
            this.updateStatus[rt] = false;
        }
    }

    private update(L: number, R: number, M: number, l: number, r: number, rt: number): void {
        //懒住了
        if (L <= l && r <= R) {
            this.updateStatus[rt] = true;
            this.change[rt] = M;
            return
        }
        //没懒住
        this.pushDown(rt)

        const mid = l + ((r - l) >> 1)
        if (L <= mid) {
            this.update(L, R, M, l, mid, rt << 1)
        }
        if (R > mid) {
            this.update(L, R, M, mid + 1, r, rt << 1 | 1)
        }
        this.change[rt] = Math.max(this.change[rt << 1] || 0, this.change[rt << 1 | 1] || 0)

    }

    private query(L: number, R: number, l: number, r: number, rt: number): number {
        //懒住了
        if (L <= l && r <= R) {
            return this.change[rt] || 0
        }
        //没懒住
        this.pushDown(rt)
        const mid = l + ((r - l) >> 1)
        let max = 0;
        if (L <= mid) {
            max = Math.max(max, this.query(L, R, l, mid, rt << 1))
        }
        if (R > mid) {
            max = Math.max(max, this.query(L, R, mid + 1, r, rt << 1 | 1))
        }
        return max
    }

    push(L: number, R: number, M: number) {
        this.update(L, R - 1, M, 1, this.treeLen - 1, 1)
    }

    find(L: number, R: number): number {
        let n = this.query(L, R - 1, 1, this.treeLen - 1, 1)
        return n
    }
}

function fallingSquares(positions: number[][]): number[] {
    let maxRight = 0;
    for (let i = 0; i < positions.length; i++) {
        maxRight = Math.max(maxRight, positions[i][0] + positions[i][1])
    }
    const seg = new segmentTree(maxRight);
    const ans: number[] = [];
    for (let i = 0; i < positions.length; i++) {
        const L = positions[i][0];
        const R = positions[i][0] + positions[i][1]
        const M = positions[i][1]
        const preH = seg.find(L, R) || 0
        console.log(L, R, M, preH);

        seg.push(L, R, M + preH)
        ans.push(seg.find(1, maxRight))
    }
    return ans
};

(() => {
    const positions = [[1, 2], [2, 3], [6, 1]]
    fallingSquares(positions)
})()