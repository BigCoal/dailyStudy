// arr是货币数组，其中的值都是正数。再给定一个正数aim。
// 每个值都认为是一张货币，
// 认为值相同的货币没有任何不同，
// 返回组成aim的方法数
// 例如：arr = {1,2,1,1,2,1,2}，aim = 4
// 方法：1+1+1+1、1+1+2、2+2
// 一共就3种方法，所以返回3
function process(
  kinds: number[],
  nums: number[],
  index: number,
  aim: number
): number {
  if (index == kinds.length) {
    return aim == 0 ? 1 : 0;
  }
  let ans = 0;
  for (let zhang = 0; zhang <= nums[index]; zhang++) {
    if (aim - zhang * kinds[index] >= 0) {
      ans += process(kinds, nums, index + 1, aim - zhang * kinds[index]);
    }
  }
  return ans;
}

export function coinsWays() {
  const aim = 4;
  const arr = [1, 2, 1, 1, 2, 1, 2];
  const kinds = [];
  const nums: number[] = [];
  const kindIndexMap = new Map();
  for (let i = 0; i < arr.length; i++) {
    if (!kindIndexMap.has(arr[i])) {
      kindIndexMap.set(arr[i], kinds.length);
      nums[kinds.length] = 1;
      kinds.push(arr[i]);
    } else {
      const idx = kindIndexMap.get(arr[i]);
      nums[idx]++;
    }
  }
  console.log(process(kinds, nums, 0, aim));
}

coinsWays();
