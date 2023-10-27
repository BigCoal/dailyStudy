// 给定一个非负数组arr，和一个正数m
// 返回arr的所有子序列中累加和%m之后的最大值。

//经典暴力方式:收集所有的累加和，可做对数器
function violence(arr: number[], m: number) {
  const arrSet: Set<number> = new Set();
  let max = 0;
  processVio(arr, arrSet, 0, 0);
  arrSet.forEach((item) => (max = Math.max(item % m, max)));
  return max;
}
function processVio(
  arr: number[],
  arrSet: Set<number>,
  index: number,
  sum: number
) {
  if (index == arr.length) {
    return arrSet.add(sum);
  }
  //可能性1:不要当前的数
  processVio(arr, arrSet, index + 1, sum);
  //可能性2:要当前的数
  processVio(arr, arrSet, index + 1, sum + arr[index]);
}

//方式2:动态规划：适用于累加和不大的情况
//dp[i][j]的含义是0..i上的数自由选择，是否正好可以搞出累加和是j
//在dp最后一行i==lenth-1是可以搞出j的数都%m，求得最大值
function dp(arr: number[], m: number) {
  const x = arr.length;
  const y = arr.reduce((a, b) => a + b);
  const dpArr = Array.from(new Array(x), () => new Array(y + 1).fill(false));
  //当y==0的时候全部是true:代表全都不选可以搞出累加和0来
  for (let i = 0; i < x; i++) {
    dpArr[i][0] = true;
  }
  dpArr[0][arr[0]] = true;

  for (let i = 1; i < x; i++) {
    for (let j = 1; j <= y; j++) {
      //TODO：这里是<=y并不是小于
      //可能性1:不要当前的数,看i-1的位置是否能搞出累加和j
      dpArr[i][j] = dpArr[i - 1][j];
      if (j - arr[i] >= 0) {
        //可能性2:要当前的数,看i-1的位置是否能搞出累加和j-arr[i]
        dpArr[i][j] = dpArr[i][j] || dpArr[i - 1][j - arr[i]];
      }
    }
  }

  let max = 0;
  for (let j = 0; j <= y; j++) {
    if (dpArr[x - 1][j]) {
      max = Math.max(max, j % m);
    }
  }
  return max;
}

//方式3 动态规划：适用于模数不大的情况
//dp[i][j]的含义是0..i上的数自由选择，是否正好可以搞出模数是j
function dp2(arr: number[], m: number) {
  const x = arr.length;
  const dpArr = Array.from(new Array(x), () => new Array(m).fill(false));
  //一个数也不选的时候m为true
  for (let i = 0; i < x; i++) {
    dpArr[i][0] = true;
  }
  dpArr[0][arr[0] % m] = true;
  for (let i = 1; i < x; i++) {
    for (let j = 1; j < m; j++) {
      //可能性1:不要当前的数,看i-1的位置是否能搞出模数是j
      dpArr[i][j] = dpArr[i - 1][j];
      //可能性2:要当前的数,看i-1的位置是否能搞出累加和j-arr[i]
      const rest = arr[i] % m;
      if (j >= rest) {
        dpArr[i][j] = dpArr[i][j] || dpArr[i - 1][j - rest];
      } else {
        dpArr[i][j] = dpArr[i][j] || dpArr[i - 1][rest + m - j];
      }
    }
  }

  let max = 0;
  for (let j = 0; j < m; j++) {
    if (dpArr[x - 1][j]) {
      max = j;
    }
  }
  return max;
}

//方式4: 如果m很大，并且arr中每个数也都很大，但是数量在30以内
// 2^30 约等于10^9
//可以用分治的思想，分左侧15累加和统计 右侧15个累加和统计
//最后的答案要不在左边，要不在右边，要不在合并里 （可以使用有虚表查找另外一个表中<=k最大的数）

const arr = [14, 2, 51, 31, 53, 550, 12, 43];
const m = 433; //433错误

console.log(violence(arr, m));
console.log(dp(arr, m));
console.log(dp2(arr, m));
