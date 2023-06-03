//给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
// 输入：
// grid =
//     [[1, 3, 1],
//      [1, 5, 1],
//      [4, 2, 1]
// ]

// 输出：7
// 解释：因为路径 1→3→1→1→1 的总和最小。

function DP(grid: number[][]) {
  const M = grid.length;
  const N = grid[0].length;
  const dp = Array.from(new Array(M), () => new Array(N).fill(0));
  dp[M - 1][N - 1] = grid[M - 1][N - 1];
  for (let i = dp.length - 2; i >= 0; i--) {
    dp[i][N - 1] = dp[i + 1][N - 1] + grid[i][N - 1];
  }

  for (let j = dp[0].length - 2; j >= 0; j--) {
    dp[M - 1][j] = dp[M - 1][j + 1] + grid[M - 1][j];
  }

  for (let i = dp.length - 2; i >= 0; i--) {
    for (let j = dp[0].length - 2; j >= 0; j--) {
      dp[i][j] = Math.min(dp[i + 1][j], dp[i][j + 1]) + grid[i][j];
    }
  }
  return dp[0][0];
}
//空间压缩技巧
function DP2(grid: number[][]) {
  const M = grid.length;
  const N = grid[0].length;
  const dp = new Array(N).fill(0);
  dp[N - 1] = grid[M - 1][N - 1];

  for (let j = N - 2; j >= 0; j--) {
    dp[j] = dp[j + 1] + grid[M - 1][j];
  }

  for (let i = M - 2; i >= 0; i--) {
    for (let j = N - 1; j >= 0; j--) {
      dp[j] = (j == N - 1 ? dp[j] : Math.min(dp[i], dp[j + 1])) + grid[i][j];
    }
  }
  return dp[0];
}

function minPathSum() {
  const grid = [
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1],
  ];
  console.log(DP(grid));
  console.log(DP2(grid));
}

minPathSum();
