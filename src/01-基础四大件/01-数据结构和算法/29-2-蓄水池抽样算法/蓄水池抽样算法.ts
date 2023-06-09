/*
 * @Author: dingtalk_dtgfuk 1048506792@qq.com
 * @Date: 2023-05-22 17:23:44
 * @LastEditors: dingtalk_dtgfuk 1048506792@qq.com
 * @LastEditTime: 2023-05-23 14:18:20
 * @FilePath: /algorithm/算法/29-2-蓄水池抽样算法/蓄水池抽样算法.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 算法的过程：
// 假设数据序列的规模为 𝑛，需要采样的数量的为 𝑘。
// 首先构建一个可容纳 𝑘个元素的数组，将序列的前 𝑘个元素放入数组中。
// 然后从第 𝑘+1个元素开始，以 𝑘/𝑛的概率来决定该元素是否被替换到数组中（数组中的元素被替换的概率是相同的）。 当遍历完所有元素之后，数组中剩下的元素即为所需采取的样本。

//从1-num上任意选一个数
function random(num: number) {
    return Math.floor(Math.random() * num)
}
class RandomBox {
    private n: number; //数据规模
    private k: number; //容器长度
    arr: number[];//容器

    constructor(k: number) {
        this.k = k;
        this.n = 0;
        this.arr = []
    }
    //添加进来的数
    add(num: number) {
        this.n++
        if (this.n <= this.k) {
            this.arr.push(num)
        } else {
            //以k/n的概率要不要放进容器中
            if (random(this.n) < this.k) {
                //从容器中随机选一个数,替换掉该数
                const i = random(this.k)
                this.arr[i] = num
            }
        }
    }
}


function test() {
    const time = 50000;
    const n = 100;
    const k = 10;
    const tol: number[] = []
    for (let i = 0; i < time; i++) {
        const rb = new RandomBox(k)
        for (let j = 0; j < n; j++) {
            rb.add(j)
        }
        for (let k = 0; k < rb.arr.length; k++) {
            const num = rb.arr[k]
            tol[num] == undefined ? tol[num] = 1 : tol[num]++;
        }
    }

    for (let index = 0; index < tol.length; index++) {
        console.log(index, "times", tol[index])
    }
}



test() 