// 给定一个整数组成的无序数组arr，值可能正、可能负、可能0
// 给定一个整数值K
// 找到arr的所有子数组里，哪个子数组的累加和等于K，并且是长度最大的
// 返回其长度

function getMaxLen(arr: number[], k: number) {
  const sumMap = new Map();
  let sum = 0;
  let maxLen = 0;
  sumMap.set(0, -1); //设置0出现的位置是-1
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    if (sumMap.has(sum - k)) {
      maxLen = Math.max(maxLen, i - sumMap.get(sum - k));
    }
    if (!sumMap.has(sum)) {
      sumMap.set(sum, i); //记录第一次出现的位置
    }
  }

  return maxLen;
}

console.log(getMaxLen([3, 2, 1, 1, 2], 6));
