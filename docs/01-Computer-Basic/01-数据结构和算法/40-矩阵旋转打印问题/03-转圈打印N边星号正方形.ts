//输入N，在控制台上输出初始边长为N的图案

function PrintN(n: number) {
  const arr = Array.from(new Array(n), () => new Array(n).fill(" "));
  let a = 0;
  let b = 0;
  let c = n - 1;
  let d = n - 1;
  while (a <= c) {
    let indexA = a;
    let indexB = b;
    arr[a][b] = "*";
    while (indexB < d) {
      arr[a][indexB++] = "*";
    }
    while (indexA < c) {
      arr[indexA++][d] = "*";
    }
    while (indexB > b) {
      arr[c][indexB--] = "*";
    }

    while (indexA > a + 1) {
      arr[indexA--][b + 1] = "*";
    }

    (a = a + 2), (b = b + 2), (c = c - 2), (d = d - 2);
  }
  console.log(arr);
}

PrintN(8);
