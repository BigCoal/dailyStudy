function getLastOne(num) {
  return num & -num;
}

if (require.main == module) {
  const num = 12; //二进制 0000 1100 提出 0000 0100
  console.log(getLastOne(num));
}
