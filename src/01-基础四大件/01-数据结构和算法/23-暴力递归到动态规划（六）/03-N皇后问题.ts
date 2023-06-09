// 按照国际象棋的规则，皇后可以攻击与之处在同一行或同一列或同一斜线上的棋子。
// n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。
// 给你一个整数 n ，返回所有不同的 n 皇后问题 的解决方案。
// 每一种解法包含一个不同的 n 皇后问题 的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。
// 输入：n = 4
// 输出：[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
// 解释：如上图所示，4 皇后问题存在两个不同的解法。

//当前在index行，已经放的位置在col中，其中col每个索引代表行数，值代表哪列已经放了皇后，后续还有多少种方法
//最优解法 时间复杂度O(N*N)
export function process(N: number, index: number, cols: number[]): number[][] {
  if (index == N) {
    return [[...cols]];
  }
  let ans: number[][] = [];
  for (let i = 0; i < N; i++) {
    if (hasValid(i, cols, index)) {
      cols.push(i);
      ans = [...ans, ...process(N, index + 1, cols)];
      cols.pop();
    }
  }
  //判断位置是否有效可以放皇后
  function hasValid(col: number, cols: number[], row: number) {
    for (let i = 0; i < cols.length; i++) {
      if (cols[i] == col) {
        //在同一列上
        return false;
      } else if (cols[i] + (row - i) == col || cols[i] - (row - i) == col) {
        //在同一斜线上
        return false;
      }
    }
    return true;
  }
  return ans;
}

function nQueens() {
  const n = 4;
  console.log(process(n, 0, []));
}

nQueens();
