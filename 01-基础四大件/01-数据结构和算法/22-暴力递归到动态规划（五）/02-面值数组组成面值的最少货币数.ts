// arr是面值数组，其中的值都是正数且没有重复。再给定一个正数aim。
// 每个值都认为是一种面值，且认为张数是无限的。
// 返回组成aim的最少货币数
function process(kinds: number[], index: number, aim: number): number {
  if (index == kinds.length) {
    return aim == 0 ? 0 : Number.MAX_SAFE_INTEGER;
  }
  let ans = Number.MAX_SAFE_INTEGER;
  for (let zhang = 0; zhang <= Number.MAX_SAFE_INTEGER; zhang++) {
    if (aim - zhang * kinds[index] >= 0) {
      const next = process(kinds, index + 1, aim - zhang * kinds[index]);
      if (next !== Number.MAX_SAFE_INTEGER) {
        ans = Math.min(ans, zhang + next);
      }
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
  const dp = Array.from(new Array(M), () =>
    new Array(N).fill(Number.MAX_SAFE_INTEGER)
  );
  dp[M - 1][0] = 0;
  for (let i = M - 2; i >= 0; i--) {
    for (let j = 0; j < N; j++) {
      let ans = Number.MAX_SAFE_INTEGER;
      for (let zhang = 0; zhang <= Number.MAX_SAFE_INTEGER; zhang++) {
        if (j - zhang * kinds[i] >= 0) {
          const next = dp[i + 1][j - zhang * kinds[i]];
          if (next !== Number.MAX_SAFE_INTEGER) {
            ans = Math.min(ans, zhang + next);
          }
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
  const dp = Array.from(new Array(M), () =>
    new Array(N).fill(Number.MAX_SAFE_INTEGER)
  );
  dp[M - 1][0] = 0;
  for (let i = M - 2; i >= 0; i--) {
    for (let j = 0; j < N; j++) {
      dp[i][j] = dp[i + 1][j];
      if (
        j - kinds[i] >= 0 &&
        dp[i][j - kinds[i]] !== Number.MAX_SAFE_INTEGER
      ) {
        dp[i][j] = Math.min(dp[i + 1][j], dp[i][j - kinds[i]] + 1); //TODO 这里非常有意思，有时间再好好想想
      }
    }
  }
  return dp[0][N - 1];
}
export function minCoinsNum() {
  const aim = 4;
  const arr = [1, 2, 4];

  console.log(process(arr, 0, aim));
  console.log(DP(arr, aim));
  console.log(DP1(arr, aim));
}

minCoinsNum();
