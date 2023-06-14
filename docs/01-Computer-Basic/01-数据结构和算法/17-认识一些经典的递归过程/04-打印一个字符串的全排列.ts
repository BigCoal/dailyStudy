function swap(arr: string[], i: number, j: number) {
  const cache = arr[i];
  arr[i] = arr[j];
  arr[j] = cache;
}
function printFullPermutation(str: string[], index: number) {
  if (index == str.length) {
    console.log(str.join(""));
    return;
  }
  for (let i = index; i < str.length; i++) {
    swap(str, index, i); //每一步选择谁做index位置的字符
    printFullPermutation(str, index + 1);
    swap(str, i, index); //恢复现场
  }
}

function main(str: string) {
  const strArr = str.split("");
  printFullPermutation(strArr, 0);
}

main("abc");
