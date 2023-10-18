// 给定一个正整数组成的无序数组arr，给定一个正整数值K
// 找到arr的所有子数组里，哪个子数组的累加和等于K，并且是长度最大的
// 返回其长度

//滑动窗口，如果i开头到j位置正好超过k，则判断i+1到j位置（小于j位置不用考虑，都是正数具有单调性）

function getMaxLen1(arr: number[], k: number) {
  let left = 0;
  let right = 0;
  let sum = arr[0];
  let maxLen = 0;
  while (right < arr.length) {
    if (sum == k) {
      maxLen = Math.max(maxLen, right - left + 1);
      sum -= arr[left++];
    } else if (sum < k) {
      right++;
      if (right == arr.length) {
        break;
      }
      sum += arr[right];
    } else {
      sum -= arr[left++];
    }
  }
  return maxLen;
}

console.log(getMaxLen1([3, 2, 1, 1, 2], 6));
