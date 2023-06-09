// 给定一个正数数组arr，请把arr中所有的数分成两个集合
// 如果arr长度为偶数，两个集合包含数的个数要一样多
// 如果arr长度为奇数，两个集合包含数的个数必须只差一个
// 请尽量让两个集合的累加和接近
// 返回:
// 最接近的情况下，较小集合的累加和
// （较大集合的累加和一定是所有数累加和减去较小集合的累加和）

//解法2:上述其实是求最接近所有数的累加sum/2和并且不超过sum/2最近的数

export function process(
  arr: number[],
  index: number,
  rest: number,
  restIndex: number
): number {
  if (restIndex == 0) {
    return 0;
  }
  if (index == arr.length) {
    return 0;
  }

  const p1 = process(arr, index + 1, rest, restIndex);
  let p2 = 0;
  if (rest - arr[index] >= 0) {
    p2 = process(arr, index + 1, rest - arr[index], restIndex - 1) + arr[index];
  }
  return Math.max(p1, p2);
}

//index:0~arr.length rest:0~rest restIndex:0~restIndex
export function DP(arr: number[], rest: number, restIndex: number) {
  const N = arr.length;
  const dp = Array.from(new Array(N + 1), () =>
    Array.from(new Array(rest + 1), () => new Array(restIndex + 1).fill(0))
  );
  for (let k = N - 1; k >= 0; k--) {
    for (let i = 0; i < rest + 1; i++) {
      for (let j = 0; j < restIndex + 1; j++) {
        const p1 = dp[k + 1][i][j];
        let p2 = 0;
        if (i - arr[k] >= 0 && j - 1 >= 0) {
          p2 = dp[k + 1][i - arr[k]][j - 1] + arr[k];
        }
        dp[k][i][j] = Math.max(p1, p2);
      }
    }
  }
  return dp[0][rest][restIndex];
}

function splitSumClosed() {
  const arr = [26, 33, 10, 37, 31, 36, 31, 8]; //106
  let sum = 0;
  arr.forEach((item) => (sum += item));
  console.log(process(arr, 0, sum >> 1, arr.length >> 1));
  console.log(DP(arr, sum >> 1, arr.length >> 1));
}

splitSumClosed();
