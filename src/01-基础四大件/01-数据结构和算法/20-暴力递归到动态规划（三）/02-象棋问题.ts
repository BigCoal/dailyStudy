// 请同学们自行搜索或者想象一个象棋的棋盘，
// 然后把整个棋盘放入第一象限，棋盘的最左下角是(0,0)位置
// 那么整个棋盘就是横坐标上9条线、纵坐标上10条线的区域
// 给你三个 参数 x，y，k
// 返回“马”从(0,0)位置出发，必须走k步
// 最后落在(x,y)上的方法数有多少种?

export function process(
  finalX: number, //终点坐标x
  finalY: number, //终点坐标y
  x: number, //当前坐标x
  y: number, //当前坐标y
  rest: number //还剩余多少步
): number {
  if (x < 0 || x > 9 || y < 0 || y > 8) {
    return 0;
  }
  if (rest == 0) {
    return x == finalX && y == finalY ? 1 : 0;
  }
  let ans = 0;
  ans += process(finalX, finalY, x + 2, y + 1, rest - 1);
  ans += process(finalX, finalY, x + 2, y - 1, rest - 1);
  ans += process(finalX, finalY, x + 1, y + 2, rest - 1);
  ans += process(finalX, finalY, x + 1, y - 2, rest - 1);
  ans += process(finalX, finalY, x - 2, y + 1, rest - 1);
  ans += process(finalX, finalY, x - 2, y - 1, rest - 1);
  ans += process(finalX, finalY, x - 1, y + 2, rest - 1);
  ans += process(finalX, finalY, x - 1, y - 2, rest - 1);

  return ans;
}
//x:0~9  y:0~8 rest:0~step  三维动态规划表
export function DP(
  finalX: number, //终点坐标x
  finalY: number, //终点坐标y
  rest: number //还剩余多少步
) {
  const M = 10;
  const N = 9;
  const Z = rest + 1;
  const dp = Array.from(new Array(Z), () =>
    Array.from(new Array(M), () => new Array(N).fill(0))
  );

  dp[0][finalX][finalY] = 1;
  for (let z = 1; z < Z; z++) {
    for (let x = 0; x < M; x++) {
      for (let y = 0; y < N; y++) {
        let ans = 0;
        ans += fn(dp, z - 1, x + 2, y + 1);
        ans += fn(dp, z - 1, x + 2, y - 1);
        ans += fn(dp, z - 1, x + 1, y + 2);
        ans += fn(dp, z - 1, x + 1, y - 2);
        ans += fn(dp, z - 1, x - 2, y + 1);
        ans += fn(dp, z - 1, x - 2, y - 1);
        ans += fn(dp, z - 1, x - 1, y + 2);
        ans += fn(dp, z - 1, x - 1, y - 2);
        dp[z][x][y] = ans;
      }
    }
  }
  function fn(dp: number[][][], z: number, x: number, y: number) {
    if (x < 0 || x > 9 || y < 0 || y > 8) {
      return 0;
    }
    return dp[z][x][y];
  }
  return dp[Z - 1][0][0];
}

function horseJump() {
  const x = 7;
  const y = 7;
  const step = 10;

  console.log(process(x, y, 0, 0, step));
  console.log(DP(x, y, step));
}

horseJump();
