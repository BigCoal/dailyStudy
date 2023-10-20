//根据能力和钱谁的极限小选谁，
// 这就意味着你要填的动态规划表谁规模小，
// 你肯定选规模小的动态规划去尝试

// int[] d，d[i]：i号怪兽的能力
// int[] p，p[i]：i号怪兽要求的钱
// 开始时你的能力是0，你的目标是从0号怪兽开始，通过所有的怪兽。
// 如果你当前的能力，小于i号怪兽的能力，你必须付出p[i]的钱，贿赂这个怪兽，然后怪兽就会加入你，他的能力直接累加到你的能力上；
// 如果你当前的能力，大于等于i号怪兽的能力，你可以选择直接通过，你的能力并不会下降，
// 你也可以选择贿赂这个怪兽，然后怪兽就会加入你，他的能力直接累加到你的能力上。
// 返回通过所有的怪兽，需要花的最小钱数。

//站在能力的角度分析
function MoneyProblem(
  mAbilitys: number[],
  mMoneys: number[],
  i: number,
  uAblity: number
): number {
  if (i == mAbilitys.length) {
    return 0;
  }
  //用户能力不够时：花钱获取能力
  if (uAblity < mAbilitys[i]) {
    return (
      mMoneys[i] +
      MoneyProblem(mAbilitys, mMoneys, i + 1, uAblity + mAbilitys[i])
    );
  } else {
    //用户能力够时
    //分支1:花钱获取更多能力
    const p1 =
      mMoneys[i] +
      MoneyProblem(mAbilitys, mMoneys, i + 1, uAblity + mAbilitys[i]);
    //分支2:直接通过
    const p2 = MoneyProblem(mAbilitys, mMoneys, i + 1, uAblity);
    return Math.min(p1, p2);
  }
}
//此方法适用于怪兽的能力不是太大的情况，如果怪兽的能力太大，会让y轴太长，最终跑不完
function dp1(mAbilitys: number[], mMoneys: number[]) {
  //构建二维数组，含义从x:index位置 y:当前用户能力 Money[x][y]通过后续怪兽花费最少的钱时多时
  //x的变化范围0～length
  const x = mAbilitys.length;
  //y的变化范围0～全部贿赂怪兽
  const y = mAbilitys.reduce((a, b) => a + b);
  const money = Array.from(new Array(x + 1), () => new Array(y + 1).fill(0));
  for (let i = x - 1; i >= 0; i--) {
    for (let j = 0; j < y; j++) {
      if (j < mAbilitys[i]) {
        money[i][j] = mMoneys[i] + money[i + 1][j + mAbilitys[i]];
      } else {
        const p1 = mMoneys[i] + money[i + 1][j + mAbilitys[i]];
        const p2 = money[i + 1][j];
        money[i][j] = Math.min(p1, p2);
      }
    }
  }
  return money[0][0];
}

//站在钱的角度分析，
//在index位置我身上还有uMoney的钱能不能正好的完成关卡
function minMoney(mAbilitys: number[], mMoneys: number[]) {
  const sumMoney = mMoneys.reduce((a, b) => a + b);
  const end = mAbilitys.length - 1;
  for (let money = 0; money <= sumMoney; money++) {
    if (MoneyProblem1(mAbilitys, mMoneys, end, money) !== -1) {
      return money;
    }
  }
  return sumMoney;
}

//在index正好花uMoney获取的最大能力
function MoneyProblem1(
  mAbilitys: number[],
  mMoneys: number[],
  i: number,
  uMoney: number
): number {
  //还没有怪兽,这时候余额应该是0，代表钱花光了，如果不是0代表钱有剩余，不是正好花这么多钱
  if (i == -1) {
    return uMoney == 0 ? 0 : -1;
  }
  //可能性1:不贿赂当前怪物，正好花这么多钱能不能把i-1项过完，并且最大能力比当前能力大,返回最大能力
  let p1 = MoneyProblem1(mAbilitys, mMoneys, i - 1, uMoney);
  if (p1 < mAbilitys[i]) {
    p1 = -1;
  }
  //可能性2:贿赂当前怪物，正好花这么多钱能不能把i项过完
  let p2 = MoneyProblem1(mAbilitys, mMoneys, i - 1, uMoney - mMoneys[i]);
  if (p2 !== -1) {
    p2 += mAbilitys[i];
  }
  return Math.max(p1, p2);
}

function dp2(mAbilitys: number[], mMoneys: number[]) {
  const sumMoney = mMoneys.reduce((a, b) => a + b);
  const x = mMoneys.length; //怪兽的次序，用0位置代表没有怪兽的位置
  const y = sumMoney + 1; //正好花的钱数
  //x,y位置代表在x位置正好花y的钱获取的最大能力
  const arr = Array.from(new Array(x), () => new Array(y).fill(-1));
  // 经过0～i的怪兽，花钱数一定为p[0]，达到武力值d[0]的地步。其他第0行的状态一律是无效的
  arr[0][mMoneys[0]] = mAbilitys[0];
  for (let i = 1; i < x; i++) {
    for (let j = 0; j < y; j++) {
      //可能性1:贿赂当前怪物，正好花这么多钱能不能把i项过完
      if (j - mMoneys[i] >= 0 && arr[i - 1][j - mMoneys[i]] !== -1) {
        arr[i][j] = arr[i - 1][j - mMoneys[i]] + mAbilitys[i];
      }
      //可能性2:不贿赂当前怪物，正好花这么多钱能不能把i-1项过完，并且最大能力比当前能力大,返回最大能力
      if (arr[i - 1][j] >= mAbilitys[i]) {
        arr[i][j] = Math.max(arr[i][j], arr[i - 1][j]);
      }
    }
  }

  for (let j = 0; j < y; j++) {
    if (arr[x - 1][j] !== -1) {
      return j;
    }
  }
}

const d = [5, 31, 10, 20];
const p = [2, 3, 4, 40];
console.log(MoneyProblem(d, p, 0, 0));
console.log(dp1(d, p));
console.log(minMoney(d, p));
console.log(dp2(d, p));
