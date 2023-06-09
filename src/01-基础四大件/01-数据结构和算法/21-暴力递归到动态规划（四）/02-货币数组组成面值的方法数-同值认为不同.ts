// arr是货币数组，其中的值都是正数。再给定一个正数aim。
// 每个值都认为是一张货币，
// 即便是值相同的货币也认为每一张都是不同的，
// 返回组成aim的方法数
// 例如：arr = {1,1,1}，aim = 2
// 第0个和第1个能组成2，第1个和第2个能组成2，第0个和第2个能组成2
// 一共就3种方法，所以返回3
export function process(arr: number[], index: number, rest: number): number {
  if (index == arr.length) {
    return rest == 0 ? 1 : 0;
  }

  const p1 = process(arr, index + 1, rest);
  const p2 = process(arr, index + 1, rest - arr[index]);
  return p1 + p2;
}

//index:0~arr.length reset:0~aim
function DP(arr: number[], aim: number) {
  const M = arr.length + 1;
  const N = aim + 1;
  const dp = Array.from(new Array(M), () => new Array(N).fill(0));
  dp[M - 1][0] = 1;
  for (let i = M - 2; i >= 0; i--) {
    for (let j = 0; j < N; j++) {
      const p1 = dp[i + 1][j];
      let p2 = 0;
      if (j - arr[i] >= 0) {
        p2 = dp[i + 1][j - arr[i]];
      }
      dp[i][j] = p1 + p2;
    }
  }
  return dp[0][N - 1];
}

//空间压缩

function DP1(arr: number[], aim: number) {
  const M = arr.length + 1;
  const N = aim + 1;
  const dp = new Array(N).fill(0);
  dp[0] = 1;
  for (let i = M - 2; i >= 0; i--) {
    for (let j = N - 1; j >= 0; j--) {
      const p1 = dp[j];
      let p2 = 0;
      if (j - arr[i] >= 0) {
        p2 = dp[j - arr[i]];
      }
      dp[j] = p1 + p2;
    }
  }
  return dp[N - 1];
}
function coinsWays() {
  const arr = [1, 2, 1];
  console.log(process(arr, 0, 2));
  console.log(DP(arr, 2));
  console.log(DP1(arr, 2));
}

coinsWays();
