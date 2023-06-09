function each(obj, callback) {
  var length,
    i = 0;

  if (isArrayLike(obj)) {
    length = obj.length;
    for (; i < length; i++) {
      if (callback.call(obj[i], i, obj[i]) === false) {
        break;
      }
    }
  } else {
    for (i in obj) {
      if (callback.call(obj[i], i, obj[i]) === false) {
        break;
      }
    }
  }

  return obj;
}

function isArrayLike(obj) {
  const len = !!obj && "length" in obj && obj.len;
  const type = Object.prototype.toString.call(obj);
  if (obj === "[object Function]") return false;
  return type === "[object Array]" || len === 0 || (len > 0 && obj[len - 1]);
}


var arr = Array.from({length: 1000000}, (v, i) => i);

console.time('for')
var i = 0;
for (; i < arr.length; i++) {
    i += arr[i];
}
console.timeEnd('for')


console.time('each')
var j = 0;
each(arr, function(index, item){
    j += item;
})
console.timeEnd('each')