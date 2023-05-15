//利用异或的特性（无进位相加）0^N=N N^N=0
//注意i和j不能只想同一个内存地址，否则该内存地址中的数会被置为0
function swap(arr, i, j) {
  arr[i] = arr[i] ^ arr[j];
  arr[j] = arr[i] ^ arr[j];
  arr[i] = arr[i] ^ arr[j];
}

if (require.main == module) {
  const arr = [1, 2];
  swap(arr, 0, 1);
  console.log(arr);
}
