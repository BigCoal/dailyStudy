let mode = 0b1001

// if (!(mode & 1)) {
//   console.log('第四位上的值不是1')
// }

if (mode & 1) {
  console.log('第四位上是1')
}

if (mode & 8) {
  console.log('第1位上是1')
}
