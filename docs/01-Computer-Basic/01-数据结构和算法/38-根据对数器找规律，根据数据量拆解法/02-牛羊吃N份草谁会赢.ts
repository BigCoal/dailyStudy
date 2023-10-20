// 给定一个正整数N，表示有N份青草统一堆放在仓库里有一只牛和一只羊，牛先吃，羊后吃，它俩轮流吃草不管是牛还是羊，每一轮能吃的草量必须是：
// 1，4，16，64…(4的某次方)
// 谁最先把草吃完，谁获胜假设牛和羊都绝顶聪明，都想赢，都会做出理性的决定根据唯一的参数N，返回谁会赢

function cattleEat(n: number) {
  for (let i = 1; i <= n; i = i * 4) {
    const rest = n - i;
    if (rest == 0 || sheepEat(rest) == "lose") return "win";
  }
  return "lose";
}

function sheepEat(n: number) {
  for (let i = 1; i <= n; i = i * 4) {
    const rest = n - i;
    if (rest == 0 || cattleEat(rest) == "lose") return "win";
  }
  return "lose";
}

//根据数据量找到以下规律
function cattleEat2(n: number) {
  if (n % 5 == 0 || n % 5 == 2) {
    return "lose";
  } else {
    return "win";
  }
}

for (let i = 0; i < 50; i++) {
  console.log(i);

  if (cattleEat(i) !== cattleEat2(i)) {
    console.log(i);
  }
}
