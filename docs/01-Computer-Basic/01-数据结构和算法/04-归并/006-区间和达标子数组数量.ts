// 给你一个整数数组 nums 以及两个整数 lower 和 upper 。求数组中，值位于范围 [lower, upper] （包含 lower 和 upper）之内的 区间和的个数 。

// 区间和 S(i, j) 表示在 nums 中，位置从 i 到 j 的元素之和，包含 i 和 j (i ≤ j)。

// 输入：nums = [-2,5,-1], lower = -2, upper = 2
// 输出：3
// 解释：存在三个区间：[0,0]、[2,2] 和 [0,2] ，对应的区间和分别是：-2 、-1 、2 。

//>思路：以某个位置结尾的时候，可以达标的累加和
function coutRangeSum(arr: number[], lower: number, upper: number) {
  //求前缀和数组
  const sum = new Array(arr.length + 1);
  sum.push(0);
  for (let i = 0; i < arr.length; i++) {
    sum[i + 1] = arr[i] + sum[i];
  }
  //如果以第j个位置结尾的时候某个范围[i,j]的累加和在[lower,upper]内，如果[0,j]的总体累加和是Sum，则从[0,i-1]的累加和落在[Sum-upper,Sum-lower]内
  const mid = lower + ((lower + upper) >> 1);
  coutRangeSum(arr, lower, mid);
  coutRangeSum(arr, mid + 1, upper);
  coutRangeSumMerge(arr, lower, mid, upper);
}

function coutRangeSumMerge(arr: number[], L: number, mid: number, R: number) {}

if (require.main == module) {
  function main() {
    const nums = [-2, 5, 1];
    const lower = -2;
    const upper = 2;
    const num = coutRangeSum(nums, lower, upper);
    console.log(num);
  }

  main();
}
