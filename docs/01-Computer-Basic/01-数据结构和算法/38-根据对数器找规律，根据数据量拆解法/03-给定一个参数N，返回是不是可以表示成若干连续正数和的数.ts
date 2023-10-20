// 定义一种数：可以表示成若干（数量>1）连续正数和的数
// 比如:
// 5 = 2+3，5就是这样的数
// 12 = 3+4+5，12就是这样的数
// 1不是这样的数，因为要求数量大于1个、连续正数和
// 2 = 1 + 1，2也不是，因为等号右边不是连续正数
// 给定一个参数N，返回是不是可以表示成若干连续正数和的数

//解法：有单调性可以用双指针
function hasSequentialSum(n: number) {
  if (n == 1 || n == 2) return false;
  let left = 1;
  let right = 2;
  let sum = left + right;
  while (left < right) {
    if (sum == n) return true;
    if (sum < n) {
      right++;
      sum += right;
    }
    if (sum > n) {
      sum -= left;
      left++;
    }
  }
  return false;
}

//好理解的方法

function hasSequentialSum1(n: number) {
  if (n == 1 || n == 2) return false;
  for (let start = 1; start < n; start++) {
    let sum = start;
    for (let j = start + 1; j < n; j++) {
      if (sum + j > n) {
        break;
      }
      if (sum + j == n) {
        return true;
      }
      sum += j;
    }
  }
  return false;
}
//根据对数器找规律发现
// 0 false
// 1 false
// 2 false
// 4 false
// 8 false
// 16 false
// 32 false
// 64 false

function hasSequentialSum2(n: number) {
  if (n <= 0) return false;
  return (n & (n - 1)) == 0 ? false : true;
}

for (let i = 0; i < 10000; i++) {
  //   if (!hasSequentialSum(i)) {
  //     console.log(i, hasSequentialSum(i));
  //   }
  if (hasSequentialSum1(i) !== hasSequentialSum2(i)) {
    console.log(i);
  }
}
