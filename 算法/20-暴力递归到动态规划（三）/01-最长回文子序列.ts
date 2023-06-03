// 给你一个字符串 s ，找出其中最长的回文子序列，并返回该序列的长度。
// 子序列定义为：不改变剩余字符顺序的情况下，删除某些字符或者不删除任何字符形成的一个序列。

// 输入：s = "bbbab"
// 输出：4
// 解释：一个可能的最长回文子序列为 "bbbb" 。

// 输入：s = "cbbd"
// 输出：2
// 解释：一个可能的最长回文子序列为 "bb" 。

export function process(strArr: string[], L: number, R: number): number {
  if (L >= R) {
    return L == R ? 1 : 0;
  }
  const p1 = process(strArr, L + 1, R);
  const p2 = process(strArr, L, R - 1);
  let p3 = 0;
  if (strArr[L] == strArr[R]) {
    p3 = 2 + process(strArr, L + 1, R - 1);
  }
  return Math.max(p1, Math.max(p2, p3));
}
//L:0~strArr.length-1  R:0-StrArr.length-1
export function DP(strArr: string[]) {
  const N = strArr.length;
  const dp = Array.from(new Array(N), () => new Array(N).fill(0));
  for (let i = 0; i < dp.length; i++) {
    dp[i][i] = 1;
  }
  for (let i = dp.length - 2; i >= 0; i--) {
    for (let j = i + 1; j < dp[0].length; j++) {
      const p1 = dp[i + 1][j];
      const p2 = dp[i][j - 1];
      let p3 = 0;
      if (strArr[i] == strArr[j]) {
        p3 = 2 + dp[i + 1][j - 1];
      }
      dp[i][j] = Math.max(p1, Math.max(p2, p3));
    }
  }
  return dp[0][N - 1];
}

function maxSubsequence() {
  const str = "bbbab".split("");

  console.log(process(str, 0, str.length - 1));
  console.log(DP(str));
}

maxSubsequence();
