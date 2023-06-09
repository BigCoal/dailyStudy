function shallowCopy(obj) {
  if (typeof obj !== "object") return false;
  const copyObj = Array.isArray(obj) ? [] : {};
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      copyObj[i] = obj[i];
    }
  }
  return copyObj;
}

console.log(shallowCopy(["3", 2, 3, [4, 5, 6, { a: 1 }]]));
