
//利用快排的思路，达到复杂度是O(N)的算法

//arr :无序数组
//k：第k小的数
function findMinKth(arr: number[], k: number) {
    if (k < 0 && k >= arr.length) {
        return -1
    }

    let left = 0;
    let right = arr.length - 1
    while (left < right) {
        //在left～right中随机取一个位置
        const randomIdx = Math.floor(Math.random() * (right - left + 1)) + left
        const range = partition(arr, left, right, randomIdx)
        if (k >= range[0] && k <= range[1]) {
            return arr[k]
        }
        if (k < range[0]) {
            right = range[0] - 1
        }
        if (k > range[1]) {
            left = range[1] + 1
        }
    }

    return arr[left]
}

//分区函数，比idx小的数放左边，大的数放右边，返回等于idx的左右指针
function partition(arr: number[], l: number, r: number, idx: number): [number, number] {
    let left = l - 1;//左边阔不到的地方
    let right = r + 1;//右边阔不到的地方
    let cur = l;
    const num = arr[idx]
    while (cur < right) {
        if (arr[cur] > num) {
            swap(arr, cur, --right)
        } else if (arr[cur] < num) {
            swap(arr, cur++, ++left)
        } else {
            cur++
        }
    }
    return [left + 1, right - 1]
}


function swap(arr: number[], i: number, j: number) {
    const cache = arr[i]
    arr[i] = arr[j]
    arr[j] = cache
}


console.log(findMinKth([5, 3, 7, 3, 4, 5, 6, 2, 3, 7, 3, 5, 5, 5, 1, 5], 2))