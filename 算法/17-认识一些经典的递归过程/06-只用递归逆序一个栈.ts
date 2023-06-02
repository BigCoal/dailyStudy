//栈 ：后进先出结构 如何不用其他结构，只用递归来实现栈的逆序

//移除栈底元素并返回
function f(arr: number[]): number {
  if (arr.length == 1) {
    return arr.pop();
  }
  const cur = arr.pop();
  const end = f(arr);
  arr.push(cur);
  return end;
}

function reverse(arr: number[]) {
  if (arr.length == 0) {
    return;
  }
  const end = f(arr);
  reverse(arr);
  arr.push(end);
  return arr;
}

console.log(reverse([1, 2, 3, 4, 5]));
