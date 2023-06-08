// 给定数组arr，arr中所有的值都为正数且不重复
// 每个值代表一种面值的货币，每种面值的货币可以使用任意张
// 再给定一个整数 aim，代表要找的钱数
// 求组成 aim 的方法数
function process(kinds: number[], index: number, aim: number): number {
  if (index == kinds.length) {
    return aim == 0 ? 1 : 0;
  }
  let ans = 0;
  for (let zhang = 0; zhang <= Number.MAX_VALUE; zhang++) {
    if (aim - zhang * kinds[index] >= 0) {
      ans += process(kinds, index + 1, aim - zhang * kinds[index]);
    } else {
      break;
    }
  }
  return ans;
}

// index:0~kind.length  rest:0~ami
export function DP(kinds: number[], aim: number) {
  const M = kinds.length + 1;
  const N = aim + 1;
  const dp = Array.from(new Array(M), () => new Array(N).fill(0));
  dp[M - 1][0] = 1;
  for (let i = M - 2; i >= 0; i--) {
    for (let j = 0; j < N; j++) {
      let ans = 0;
      for (let zhang = 0; zhang <= Number.MAX_VALUE; zhang++) {
        if (j - zhang * kinds[i] >= 0) {
          ans += dp[i + 1][j - zhang * kinds[i]];
        } else {
          break;
        }
      }
      dp[i][j] = ans;
    }
  }
  return dp[0][N - 1];
}

//观察临近位置省掉枚举行为
export function DP1(kinds: number[], aim: number) {
  const M = kinds.length + 1;
  const N = aim + 1;
  const dp = Array.from(new Array(M), () => new Array(N).fill(0));
  dp[M - 1][0] = 1;
  for (let i = M - 2; i >= 0; i--) {
    for (let j = 0; j < N; j++) {
      dp[i][j] = (j - kinds[i] >= 0 ? dp[i][j - kinds[i]] : 0) + dp[i + 1][j];
    }
  }
  return dp[0][N - 1];
}
export function coinsWays() {
  const aim = 4;
  const arr = [1, 2];

  console.log(process(arr, 0, aim));
  console.log(DP(arr, aim));
  console.log(DP1(arr, aim));
}

coinsWays();
