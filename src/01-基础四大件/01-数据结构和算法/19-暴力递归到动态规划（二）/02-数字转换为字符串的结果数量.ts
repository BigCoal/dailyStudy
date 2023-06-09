// 规定1和A对应、2和B对应、3和C对应...
// 那么一个数字字符串比如\"111”就可以转化为:
// \"AAA\"、\"KA\"和\"AK\"
// 给定一个只有数字字符组成的字符串str，返回有多少种转化结果

function process(strArr: string[], index: number): number {
  if (index == strArr.length) {
    return 1;
  }

  if (strArr[index] == "0") {
    return 0;
  }

  let p1 = process(strArr, index + 1);
  let p2 = 0;
  let num = Number(strArr[index] + strArr[index + 1]);
  if (num <= 26) {
    p2 = process(strArr, index + 2);
  }
  return p1 + p2;
}

//index:0~strArr.length 一个可变参数的一维动态规划
function DP(strArr: string[]) {
  const dp = new Array(strArr.length + 1);
  dp[strArr.length] = 1;
  for (let i = dp.length - 2; i >= 0; i--) {
    if (strArr[i] == "0") {
      dp[i] = 0;
      continue;
    }
    const p1 = dp[i + 1];
    let p2 = 0;
    let num = Number(strArr[i] + strArr[i + 1]);
    if (num <= 26) {
      p2 = dp[i + 2];
    }
    dp[i] = p1 + p2;
  }
  return dp[0];
}

function convertToLetterString() {
  const strArr = "1011".split("");
  console.log(process(strArr, 0));
  console.log(DP(strArr));
}

convertToLetterString();
