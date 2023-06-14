
//indexOf 方法的实现，时间复杂度O(N)

//在str1中查找str2，如果存在返回第一次出现的下标，如果不存在返回-1
function KMP(str1: string, str2: string) {
    const nexts = productNexts(str2)
    let point1 = 0;
    let point2 = 0;
    while (point1 < str1.length && point2 < str2.length) {
        if (str1[point1] == str2[point2]) {
            point1++
            point2++
        } else if (nexts[point2] == -1) {
            point1++
        } else {
            point2 = nexts[point2]
        }
    }
    return point2 == str2.length ? point1 - point2 : -1
}

//产生字符串的next数组
//next[i]代表i前面，max(后缀==前缀)（在不满的前提下）
//固定0位置是-1，1位置是0
function productNexts(str: string) {
    const nexts = [-1, 0]
    for (let i = 2; i < str.length; i++) {
        const preStr = str[i - 1];
        let preNext = nexts[i - 1]
        while (preNext !== -1) {
            if (str[preNext] == preStr) {
                nexts[i] = preNext + 1
                break;
            }
            preNext = nexts[preNext]
        }
        if (preNext == -1) {
            nexts[i] = 0
        }

    }
    return nexts
}


console.log(KMP("ababc", 'abc'))