// 给定一个正数数组arr，
// 请把arr中所有的数分成两个集合，尽量让两个集合的累加和接近
// 返回：
// 最接近的情况下，较小集合的累加和
let minAbs = 0;
let ans = 0;
export function process(
  arr: number[],
  index: number,
  set1: number,
  set2: number
) {
  if (index == arr.length) {
    minAbs = Math.min(Math.abs(set1 - set2), minAbs);
    ans = minAbs == Math.abs(set1 - set2) ? (set1 < set2 ? set1 : set2) : ans;
    return;
  }
  process(arr, index + 1, set1 + arr[index], set2);
  process(arr, index + 1, set1, set2 + arr[index]);
}

//解法2:上述其实是求最接近所有数的累加sum/2和并且不超过sum/2最近的数
function process1(arr: number[], index: number, rest: number): number {
  if (index == arr.length) {
    return 0;
  }

  const p1 = process1(arr, index + 1, rest);
  let p2 = 0;
  if (rest - arr[index] >= 0) {
    p2 = process1(arr, index + 1, rest - arr[index]) + arr[index];
  }
  return Math.max(p1, p2);
}

//index:0~arr.length reset:0~rest dp[i][j]
export function DP(arr: number[], rest: number) {
  const N = arr.length;
  const dp = Array.from(new Array(N + 1), () => new Array(rest + 1).fill(0));
  for (let i = N - 1; i >= 0; i--) {
    for (let j = 0; j < rest + 1; j++) {
      const p1 = dp[i + 1][j];
      let p2 = 0;
      if (j - arr[i] >= 0) {
        p2 = arr[i] + dp[i + 1][j - arr[i]];
      }
      dp[i][j] = Math.max(p1, p2);
    }
  }
  return dp[0][rest];
}

function splitSumClosed() {
  const arr = [10, 23, 33, 18, 35, 39, 29, 3, 32];
  process(arr, 0, 0, 0);
  console.log(ans);
  let sum = 0;
  arr.forEach((item) => (sum += item));
  console.log(process1(arr, 0, sum >> 1));
  console.log(DP(arr, sum >> 1));
}

splitSumClosed();
