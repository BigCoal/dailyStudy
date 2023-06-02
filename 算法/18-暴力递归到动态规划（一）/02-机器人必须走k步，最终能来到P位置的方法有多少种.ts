// 假设有排成一行的N个位置，记为1~N，N 一定大于或等于 2
// 开始时机器人在其中的M位置上(M 一定是 1~N 中的一个)
// 如果机器人来到1位置，那么下一步只能往右来到2位置；
// 如果机器人来到N位置，那么下一步只能往左来到 N-1 位置；
// 如果机器人来到中间位置，那么下一步可以往左走或者往右走；
// 规定机器人必须走 K 步，最终能来到P位置(P也是1~N中的一个)的方法有多少种
// 给定四个参数 N、M、K、P，返回方法数。

//暴力递归：其中有大量的重复的内容
export function process(N: number, P: number, index: number, reset: number) {
  if (reset == 0) {
    return index == P ? 1 : 0;
  }
  let ans = 0;
  if (index == 1) {
    ans += process(N, P, index + 1, reset - 1);
  } else if (index == N) {
    ans += process(N, P, index - 1, reset - 1);
  } else {
    ans += process(N, P, index + 1, reset - 1);
    ans += process(N, P, index - 1, reset - 1);
  }
  return ans;
}
//动态规划：两个可变参数，index的变化范围：1～N reset的变化范围0～K 创建二维表
export function DP(N: number, K: number, P: number, M: number) {
  const dp = Array.from(new Array(K + 1), () => new Array(N + 1).fill(0));
  //i==0位置弃而不用
  for (let i = 1; i <= N; i++) {
    dp[0][i] = i == P ? 1 : 0;
  }
  for (let i = 1; i < dp.length; i++) {
    for (let j = 1; j < dp[i].length; j++) {
      let ans = 0;
      if (j == 1) {
        ans += dp[i - 1][j + 1];
      } else if (j == N) {
        ans += dp[i - 1][j - 1];
      } else {
        ans += dp[i - 1][j - 1];
        ans += dp[i - 1][j + 1];
      }
      dp[i][j] = ans;
    }
  }
  return dp[K][M];
}

function robotWalk(N: number, M: number, K: number, P: number) {
  //   const p1 = process(N, P, M, K);
  const p2 = DP(N, K, P, M);
  //   console.log(p1);
  console.log(p2);
}

robotWalk(150, 2, 50, 4);
