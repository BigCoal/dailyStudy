// 给定一个正数1，裂开的方法有一种，(1)
// 给定一个正数2，裂开的方法有两种，(1和1)、(2)
// 给定一个正数3，裂开的方法有三种，(1、1、1)、(1、2)、(3)
// 给定一个正数4，裂开的方法有五种，(1、1、1、1)、(1、1、2)、(1、3)、(2、2)、 (4)
// 给定一个正数n，求裂开的方法数。

export function process(num: number, start: number) {
  if (num == 0) {
    return 1;
  }

  let ans = 0;
  for (let i = start; i <= num; i++) {
    if (num - i >= 0) {
      ans += process(num - i, i);
    }
  }
  return ans;
}
// curNum:0~num start:1~num(0位置弃而不用)  dp[i][j]:当前数字是curNum,并且开始数字是start时，裂开的方法数
export function DP(num: number) {
  const dp = Array.from(new Array(num + 1), () => new Array(num + 1));
  for (let j = 1; j < num + 1; j++) {
    dp[0][j] = 1;
  }

  for (let i = 1; i < num + 1; i++) {
    for (let j = 1; j < num + 1; j++) {
      let ans = 0;
      for (let m = j; m <= num; m++) {
        if (i - m >= 0) {
          ans += dp[i - m][m];
        }
      }
      dp[i][j] = ans;
    }
  }
  return dp[num][1];
}
// TODO 去掉枚举行为的动态规划有时间搞
export function DP1(num: number) {}

function splitNumber() {
  const num = 5;
  console.log(process(num, 1));
  console.log(DP(num));
}

splitNumber();
