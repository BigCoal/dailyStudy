// 字典序严格定义:
//  认为字符串就是K进制的正数, 分两种情况:
//      当两个字符串长度一样, 直接认为是K进制的正数进行比较
//      当两个字符串长度不一样的时候, 短的要补的跟长的一样长,通过补0完成(认为0的ASCII比a还小)

//给定一个由字符串组成的数组strs，必须把所有的字符串拼接起来，
// 返回所有可能的拼接结果中，字典序最小的结果
function minStr(arr: string[]) {
  return arr.sort().join("");
}

function swap(arr: string[], i: number, j: number) {
  const cache = arr[j];
  arr[j] = arr[i];
  arr[i] = cache;
}
//数组的全排列
function permutation(arr: string[], index: number, all: string[]) {
  if (index == arr.length) {
    all.push(arr.join(""));
    return;
  }
  for (let i = index; i < arr.length; i++) {
    swap(arr, index, i);
    permutation(arr, index + 1, all);
    swap(arr, i, index);
  }
}

function violent(arr: string[]) {
  //获取全排列
  let all: string[] = [];
  permutation(arr, 0, all);
  let minStr = all[0];
  all.map((item) => (minStr = minStr < item ? minStr : item));
  return minStr;
}

function main() {
  const arr = ["ccc", "d", "abd", "aca", "b", "a"];
  console.log(violent(arr));
  console.log(minStr(arr));
}

main();
