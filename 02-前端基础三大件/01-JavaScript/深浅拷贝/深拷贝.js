function deepCopy(obj) {
  if (typeof obj !== "object") return false;
  const copyObj = Array.isArray(obj) ? [] : {};
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      copyObj[i] = deepCopy(obj[i]) || obj[i];
    }
  }
  return copyObj;
}

console.log(deepCopy(["3", 2, 3, [4, 5, 6, { a: 1 }]]));
