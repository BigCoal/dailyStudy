// 给定一个整数组成的无序数组arr，值可能正、可能负、可能0
// 给定一个整数值K
// 找到arr的所有子数组里，哪个子数组的累加和<=K，并且是长度最大的
// 返回其长度

function getMaxLen(arr: number[], k: number) {
  const minSum: number[] = []; //以i位置开头所得到的最小累加和
  const minSumEnd: number[] = []; //以i位置开头所得到的最小累加和的结尾位置

  for (let i = arr.length - 1; i >= 0; i--) {
    if (i == arr.length - 1) {
      minSum[i] = arr[i];
      minSumEnd[i] = i;
      continue;
    }
    minSum[i] = arr[i] + (minSum[i + 1] > 0 ? 0 : minSum[i + 1]);
    minSumEnd[i] = minSum[i + 1] > 0 ? i : minSumEnd[i + 1];
  }

  let end = 0; //迟迟扩不进来的位置
  let sum = 0;
  let maxLen = 0;

  for (let i = 0; i < arr.length; i++) {
    //一直扩，扩到超过k为止
    while (end < arr.length && sum + minSum[end] <= k) {
      sum += minSum[end];
      end = minSumEnd[i] + 1;
    }
    maxLen = Math.max(maxLen, end - i);

    if (end > i) {
      //还有窗口
      sum -= arr[i];
    } else {
      //窗口维持不住，i==end时，minSum[end]>k,直接到下一个数从新开始
      end = i + 1;
    }
  }
  return maxLen;
}

console.log(getMaxLen([7, 3, -2, -9, -1, 10, 7, 3, -2, 4, -4], 6));
