function findOddNum(arr) {
  let num = 0;
  for (let i = 0; i < arr.length; i++) {
    num ^= arr[i];
  }
  return num;
}

if (require.main == module) {
  const arr = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 4, 4, 4];
  console.log(findOddNum(arr));
}
