//可以任意修改L..R上的一个值，还可以迅速得到L..R范围上的累加和
//时间复杂度是O(LogN)

class indexTree {
    //某一个位置负责 拆开末尾的1的第一个数到它自己
    //比如说 6 0110 拆开后第一个数到自己是 0101-0110 负责 5-6  
    //8 1000 拆开后是0001-1000 负责 1-8
    //为了简便，我们都从1开始
    private tree: number[] = [0];

    constructor(arr: number[]) {
        //构建下标从1开始
        const newArr = new Array(arr.length + 1)
        newArr[0] = 0
        for (let i = 1; i < newArr.length; i++) {
            newArr[i] = arr[i - 1]
        }
        this.build(newArr)

    }

    private build(arr: number[]) {
        const sum: number[] = [0]
        for (let i = 1; i < arr.length; i++) {
            sum[i] = sum[i - 1] + arr[i]
        }
        for (let i = 1; i < arr.length; i++) {
            const startIndex = i - (i & -i)
            this.tree[i] = sum[i] - sum[startIndex]
        }
    }

    //获取1...Index区间的累加和
    private sum(index: number) {
        let n = index;
        let sum = 0;
        while (n !== 0) {
            sum += this.tree[n];
            n = n - (n & -n)
        }
        return sum;
    }

    getSum(start: number, end: number) {
        return this.sum(end + 1) - this.sum(start)
    }

    // 把index位置上的数加上num
    add(index: number, num: number) {
        let n = index + 1;
        while (n < this.tree.length) {
            this.tree[n] += num;
            n = n + (n & -n)
        }
    }


}


(() => {
    const arr = [3, 4, 1, 2, -1, -3]
    const iTree = new indexTree(arr)
    console.log(iTree.getSum(3, 5))
    iTree.add(3, 5)
    console.log(iTree.getSum(3, 5))
    iTree.add(1, 5)
    console.log(iTree.getSum(0, 5))
})()