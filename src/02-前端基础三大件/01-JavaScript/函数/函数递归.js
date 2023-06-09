//尾调用版本阶乘
function factorial(n, result=1) {
  if (n == 1) {
    return result;
  }
  return factorial(n - 1, result * n);
}

console.log(factorial(5));
