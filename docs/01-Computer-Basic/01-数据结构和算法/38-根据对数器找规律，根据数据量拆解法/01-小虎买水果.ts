// 小虎去买苹果，商店只提供两种类型的塑料袋，每种类型都有任意数量。
// 1）能装下6个苹果的袋子
// 2）能装下8个苹果的袋子
// 小虎可以自由使用两种袋子来装苹果，但是小虎有强迫症，他要求自己使用的袋子数量必须最少，且使用的每个袋子必须装满。
// 给定一个正整数N，返回至少使用多少袋子。如果N无法让使用的每个袋子必须装满，返回-1

function getPlasticBagNum(n: number) {
  //袋子最少尽多使用装下8个苹果的袋子
  let maxNum = n >> 3;
  let i = 0;
  while (maxNum >= 0) {
    let restNum = (n % 8) + i * 8;
    if (restNum % 6 == 0) {
      return maxNum + restNum / 6;
    }
    maxNum--;
    i++;
  }

  return -1;
}
//根据对数器找出规律

function getPlasticBagNum2(n: number) {
  if ((n & 1) !== 0) {
    return -1;
  }
  if (n == 0) return 0;
  if ([6, 8].indexOf(n) !== -1) {
    return 1;
  }
  if ([12, 14, 16].indexOf(n) !== -1) {
    return 2;
  }
  if (n >= 18) {
    if (n % 2 == 0) {
      return Math.ceil(n / 8);
    }
  }
  return -1;
}

for (let i = 0; i < 5000; i++) {
  if (getPlasticBagNum(i) !== getPlasticBagNum2(i)) {
    console.log(i, getPlasticBagNum(i), getPlasticBagNum2(i));
  }
}
