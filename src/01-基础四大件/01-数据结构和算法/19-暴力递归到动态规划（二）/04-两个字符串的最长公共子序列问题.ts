//str1 a12bc345def
//str2 mnp123qrs45e
//最长公共子序列是12345 返回长度是5

export function process(
  strArr1: string[],
  strArr2: string[],
  i: number,
  j: number
): number {
  if (i == 0 || j == 0) {
    return strArr1[i] == strArr2[j] ? 1 : 0;
  }
  //最长公共子序列以strARR1[i]结尾
  let p1 = process(strArr1, strArr2, i - 1, j);
  //最长公共子序列以strARR2[j]结尾
  let p2 = process(strArr1, strArr2, i, j - 1);
  let p3 = 0;
  if (strArr1[i] == strArr2[j]) {
    p3 = 1 + process(strArr1, strArr2, i - 1, j - 1);
  }

  return Math.max(p3, Math.max(p1, p2));
}

//i:0-strArr1.length-1  j:0-strArr2.length-1  二维动态规划 一个样本做行 一个样本做列 的样本对应模型
function DP(strArr1: string[], strArr2: string[]) {
  const M = strArr1.length;
  const N = strArr2.length;

  const dp = Array.from(new Array(M), () => new Array(N).fill(0));

  for (let i = 0; i < dp.length; i++) {
    if (strArr1[i] == strArr2[0]) {
      dp[i][0] = 1;
    }
  }

  for (let j = 0; j < dp[0].length; j++) {
    if (strArr1[0] == strArr2[j]) {
      dp[0][j] = 1;
    }
  }

  for (let i = 1; i < dp.length; i++) {
    for (let j = 1; j < dp[0].length; j++) {
      //最长公共子序列以strARR1[i]结尾
      let p1 = dp[i - 1][j];
      //最长公共子序列以strARR2[j]结尾
      let p2 = dp[i][j - 1];
      let p3 = 0;
      if (strArr1[i] == strArr2[j]) {
        p3 = 1 + dp[i - 1][j - 1];
      }
      dp[i][j] = Math.max(p3, Math.max(p1, p2));
    }
  }

  return dp[M - 1][N - 1];
}

function longestCommonSubsequence() {
  let str1 = "a12bc345def".split("");
  let str2 = "mnp123qrs45g".split("");

  console.log(process(str1, str2, str1.length - 1, str2.length - 1));
  console.log(DP(str1, str2));
}

longestCommonSubsequence();
