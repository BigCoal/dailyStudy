// 给定5个参数，N，M，row，col，k
// 表示在N\\*M的区域上，醉汉Bob初始在(row,col)位置
// Bob一共要迈出k步，且每步都会等概率向上下左右四个方向走一个单位
// 任何时候Bob只要离开N\\*M的区域，就直接死亡
// 返回k步之后，Bob还在N\\*M的区域的概率

//活着的概率
export function process(
  N: number,
  M: number,
  row: number,
  col: number,
  k: number
) {
  if (row == N || row < 0 || col == M || col < 0) {
    return 0;
  }
  if (k == 0) {
    return 1;
  }
  let res = 0;
  res += process(N, M, row + 1, col, k - 1);
  res += process(N, M, row - 1, col, k - 1);
  res += process(N, M, row, col + 1, k - 1);
  res += process(N, M, row, col - 1, k - 1);
  return res;
}

// row:0-N col:0-M k:0-k 三维动态规划
//可以用二层数据做数据压缩，因为每一层只依赖自己下一层
function DP(N: number, M: number, row: number, col: number, K: number) {
  const dp = Array.from(new Array(K + 1), () =>
    Array.from(new Array(N + 1), () => new Array(M + 1).fill(0))
  );
  for (let i = 0; i < N + 1; i++) {
    for (let j = 0; j < M + 1; j++) {
      dp[0][i][j] = 1;
    }
  }
  for (let k = 1; k < K + 1; k++) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        dp[k][i][j] += fn(i + 1, j, k - 1, dp);
        dp[k][i][j] += fn(i - 1, j, k - 1, dp);
        dp[k][i][j] += fn(i, j - 1, k - 1, dp);
        dp[k][i][j] += fn(i, j + 1, k - 1, dp);
      }
    }
  }

  function fn(row: number, col: number, k: number, dp: number[][][]) {
    if (row == N || row < 0 || col == M || col < 0) {
      return 0;
    }
    return dp[k][row][col];
  }

  return dp[K][row][col];
}

function bobLiveProbability() {
  const N = 50;
  const M = 50;
  const row = 6;
  const col = 6;
  const k = 10;

  //总的概率
  const all = Math.pow(4, 10);

  console.log(process(N, M, row, col, k) / all);
  console.log(DP(N, M, row, col, k) / all);
}

bobLiveProbability();
