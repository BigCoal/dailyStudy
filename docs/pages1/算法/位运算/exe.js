//打印16位二进制数
function printBit(num, digit = 8) {
  let bit = "";
  for (let i = digit - 1; i >= 0; i--) {
    bit += ((num & 1 << i) === 0 ? 0 : 1); //根据1左移动后&来判断某一位是否是1
  }
  console.log(bit);
}

// printBit(Math.pow(2,53)-1,53);


