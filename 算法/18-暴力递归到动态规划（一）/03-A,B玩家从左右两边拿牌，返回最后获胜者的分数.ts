// 给定一个整型数组arr，代表数值不同的纸牌排成一条线。玩家A和玩家B依次拿走每张纸牌，规定玩家A先拿，玩家B后拿，但是每个玩家每次只能拿走最左或最右的纸牌，玩家A和玩家B都绝顶聪明。请返回最后获胜者的分数。
// 【举例】
// arr=[1,2,100,4]。
// 开始时，玩家A只能拿走1或4。如果开始时玩家A拿走1，则排列变为[2,100,4]，接下来玩家B可以拿走2或4，然后继续轮到玩家A...
// 如果开始时玩家A拿走4，则排列变为[1,2,100]，接下来玩家B可以拿走1或100，然后继续轮到玩家A...
// 玩家A作为绝顶聪明的人不会先拿4，因为拿4之后，玩家B将拿走100。所以玩家A会先拿1，让排列变为[2,100,4]，接下来玩家B不管怎么选，100都会被玩家A拿走。玩家A会获胜，分数为101。所以返回101。
// arr=[1,100,2]。
// 开始时，玩家A不管拿1还是2，玩家B作为绝顶聪明的人，都会把100拿走。玩家B会获胜，分数为100。所以返回100。

//先手拿牌，先手获得的最大价值
function firstHandle(arr: number[], i: number, j: number): number {
  if (i == j) {
    return arr[i];
  }

  const p1 = arr[i] + backHandle(arr, i + 1, j);
  const p2 = arr[j] + backHandle(arr, i, j - 1);
  return Math.max(p1, p2);
}

//后手拿牌,返回先手获得的最大价值
function backHandle(arr: number[], i: number, j: number): number {
  if (i == j) {
    return 0;
  }
  const p1 = firstHandle(arr, i + 1, j);
  const p2 = firstHandle(arr, i, j - 1);
  return Math.min(p1, p2);
}
//暴力递归版本
function cardsInLine(arr: number[]) {
  const p1 = firstHandle(arr, 0, arr.length - 1);
  const p2 = backHandle(arr, 0, arr.length - 1);
  return Math.max(p1, p2);
}

//动态规划
//i:0~N-1 j:0~N-1
function cardsInLineDp(arr: number[]) {
  const N = arr.length;
  const firstDp = Array.from(new Array(N), () => new Array(N));
  const backDp = Array.from(new Array(N), () => new Array(N));

  for (let i = 0; i < firstDp.length; i++) {
    firstDp[i][i] = arr[i];
    backDp[i][i] = 0;
  }
  for (let i = firstDp.length - 2; i >= 0; i--) {
    for (let j = i + 1; j < firstDp[0].length; j++) {
      const fP1 = arr[i] + backDp[i + 1][j];
      const fP2 = arr[j] + backDp[i][j - 1];
      firstDp[i][j] = Math.max(fP1, fP2);

      const bP1 = firstDp[i + 1][j];
      const bP2 = firstDp[i][j - 1];
      backDp[i][j] = Math.min(bP1, bP2);
    }
  }

  return Math.max(firstDp[0][N - 1], backDp[0][N - 1]);
}

console.log(cardsInLine([1, 2, 100, 4]));
console.log(cardsInLineDp([1, 2, 100, 4]));
