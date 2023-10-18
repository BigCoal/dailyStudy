// 给定一个长方形矩阵matrix，实现转圈打印

// a  b  c  d
// e  f   g  h
// i   j   k   L

// 打印顺序：a b c d h L k j I e f g

function printMatrix(matrix: string[][]) {
  let a = 0;
  let b = 0;
  let c = matrix.length - 1;
  let d = matrix[0].length - 1;
  while (a <= c && b <= d) {
    if (a == c) {
      console.log(matrix[a][b++]);
    } else if (b == d) {
      console.log(matrix[a++][b]);
    } else {
      let aIndex = a;
      let bIndex = b;
      while (bIndex < d) {
        console.log(matrix[a][bIndex++]);
      }

      while (aIndex < c) {
        console.log(matrix[aIndex++][d]);
      }

      while (bIndex > b) {
        console.log(matrix[c][bIndex--]);
      }

      while (aIndex > a) {
        console.log(matrix[aIndex--][b]);
      }

      a++, b++, c--, d--;
    }
  }
}

const data = [
  ["1", "2", "3", "4"],
  ["5", "6", "7", "8"],
  ["9", "10", "11", "12"],
];

console.log(printMatrix(data));
