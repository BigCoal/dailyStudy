// 给定一个正方形或者长方形矩阵matrix，实现zigzag打印
// ```
// 0 1 2
// 3 4 5
// 6 7 8
// ```
// 打印: 0 1 3 6 4 2 5 7 8

function PrintZigZag(matrix: string[][]) {
  let xLength = matrix.length;
  let yLength = matrix[0].length;
  //   let maxLen = xLength >= yLength ? xLength : yLength;
  //   let maxLenHasX = xLength >= yLength ? true : false;
  const obliqueNum = xLength + yLength - 1;
  for (let i = 0; i < obliqueNum; i++) {
    let x = 0;
    let y = 0;
    if (i % 2 == 0) {
      //从下向上斜线
      if (i < xLength) {
        x = i;
        y = 0;
      } else {
        x = xLength - 1;
        y = i - xLength + 1;
      }
      while (y < yLength && x >= 0) {
        console.log(matrix[x][y]);
        x--, y++;
      }
    } else {
      //从上向下斜线
      if (i < yLength) {
        x = 0;
        y = i;
      } else {
        x = i - yLength + 1;
        y = yLength - 1;
      }
      while (x < xLength && y >= 0) {
        console.log(matrix[x][y]);
        x++, y--;
      }
    }
  }
}

const data = [
  ["1", "2"],
  ["5", "6"],
  ["9", "10"],
  ["13", "14"],
];

console.log(PrintZigZag(data));
