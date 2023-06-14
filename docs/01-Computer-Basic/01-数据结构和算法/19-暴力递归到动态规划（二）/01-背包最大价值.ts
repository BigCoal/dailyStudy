// 给定两个长度都为N的数组weights和values，
// weights[i]和values[i]分别代表 i号物品的重量和价值。
// 给定一个正数bag，表示一个载重bag的袋子，
// 你装的物品不能超过这个重量。
// 返回你能装下最多的价值是多少?

function bagMaxValue(
  weights: number[],
  values: number[],
  index: number,
  reset: number
): number {
  if (reset == 0) {
    return 0;
  }
  if (index == weights.length) {
    return 0;
  }

  let p1 = bagMaxValue(weights, values, index + 1, reset);
  let p2 = 0;
  if (reset - weights[index] >= 0) {
    p2 =
      values[index] +
      bagMaxValue(weights, values, index + 1, reset - weights[index]);
  }

  return Math.max(p1, p2);
}

//两个可变参数index:0~weight.length reset:0~bag 二维动态规划
function bagMaxValueDp(
  weights: number[],
  values: number[],
  index: number,
  bag: number
) {
  const M = weights.length + 1;
  const R = bag + 1;
  const dp = Array.from(new Array(M), () => new Array(R));

  for (let i = 0; i < dp[0].length; i++) {
    dp[M - 1][i] = 0;
  }

  for (let i = 0; i < dp.length; i++) {
    dp[i][0] = 0;
  }

  for (let i = dp.length - 2; i >= 0; i--) {
    for (let j = 1; j < dp[0].length; j++) {
      const p1 = dp[i + 1][j];
      let p2 = 0;
      if (j - weights[i] >= 0) {
        p2 = values[i] + dp[i + 1][j - weights[i]];
      }
      dp[i][j] = Math.max(p1, p2);
    }
  }

  return dp[0][bag];
}

function main() {
  const weights = [3, 2, 4, 7, 3, 1, 7];
  const values = [5, 6, 3, 19, 12, 4, 2];
  const bag = 15;
  console.log(bagMaxValue(weights, values, 0, bag));
  console.log(bagMaxValueDp(weights, values, 0, bag));
}

main();
