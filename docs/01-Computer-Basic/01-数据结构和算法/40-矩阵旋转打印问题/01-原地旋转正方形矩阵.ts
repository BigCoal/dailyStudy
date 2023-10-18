//给定一个正方形矩阵matrix，原地调整成顺时针90度转动的样子

// a  b  c      g  d  a
// d  e  f      h  e  b
// g  h  i      i  f  c
//简单做法
function rotationMatrix2(matrix: string[][]) {
  let a = 0;
  let b = 0;
  let c = matrix.length - 1;
  let d = matrix.length - 1;
  while (a < c) {
    for (let i = 0; i < d - b; i++) {
      const cache = matrix[a][b + i];
      matrix[a][b + i] = matrix[c - i][b];
      matrix[c - i][b] = matrix[c][d - i];
      matrix[c][d - i] = matrix[a + i][d];
      matrix[a + i][d] = cache;
    }
    a++, b++, c--, d--;
  }
  return matrix;
}

//复杂做法
function rotationMatrix(matrix: string[][]) {
  const len = matrix.length;
  const level = Math.ceil(len / 2);
  let cache = "";

  for (let i = 0; i < level; i++) {
    for (let j = i; j < len - i - 1; j++) {
      let curX = j;
      let curY = i;
      let nextX = curY;
      let nextY = len - curX - 1;
      cache = matrix[curX][curY];
      for (let k = 0; k < 3; k++) {
        let a = matrix[nextX][nextY];
        matrix[nextX][nextY] = cache;
        cache = a;
        curX = nextX;
        curY = nextY;
        nextX = curY;
        nextY = len - curX - 1;
      }
      matrix[nextX][nextY] = cache;
    }
  }
  return matrix;
}

const data = [
  ["1", "2", "3", "4"],
  ["5", "6", "7", "8"],
  ["9", "10", "11", "12"],
  ["13", "14", "15", "16"],
];

console.log(rotationMatrix2(data));
