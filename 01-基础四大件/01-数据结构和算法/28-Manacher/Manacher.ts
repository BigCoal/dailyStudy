
// 在一个字符串中找最长回文子串
//O(N) 利用每一项的回文半径数组，当前最长回文半径右边界和当前最长回文半径右边界的中心点可以让指针不回退

function Manacher(str: string): number {
    //回文半径数组
    const rightArr: number[] = [];
    //当前回文半径最右右边界
    let mostRight = -1;
    //前回文半径最右右边界的中心点
    let mostRightCenter = -1;
    //最长回文半径
    let max = 0;

    const strArr = joinPlaceholder(str.split(""))
    for (let i = 0; i < strArr.length; i++) {
        let right = i;
        let left = i;
        //只有i在在最右右边界里面时才可以加速
        if (mostRight > i) {
            //假设i`是i的相对于最右右边界的中心点对称点
            //如果i`的回文半径在最左回文半径中，则i的回文半径和i`一样
            //如果i`的回文半径大于当前最左回文半径，则i的回文半径就是mostRight-i
            //如果i`的回文半径正好等于最左回文半径，则i的回文半径最少时mostRight-i
            const leftIndex = mostRightCenter - (i - mostRightCenter)
            if (rightArr[leftIndex]) {

                right = Math.min(mostRight, i + rightArr[leftIndex])
                left = i - (right - i)
            }
        }
        while (right < strArr.length && strArr[right + 1] == strArr[left - 1]) {
            right++;
            left--;
        }
        if (right > mostRight) {
            mostRight = right;
            mostRightCenter = i;
        }

        rightArr[i] = mostRight - mostRightCenter + 1
        max = Math.max(rightArr[i], max)
    }
    return max - 1
}
//加入占位符，由于偶数个无法统计,加入占位符后保证永远都是奇数统计
function joinPlaceholder(arr: string[]) {
    const newArr = []
    for (let i = 0; i < arr.length; i++) {
        newArr.push("#")
        newArr.push(arr[i])
    }
    newArr.push("#")
    return newArr
}

console.log(Manacher('cbababd'))