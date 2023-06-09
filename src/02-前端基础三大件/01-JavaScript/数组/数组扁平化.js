const arr = [1, 2, [3, 4, [5, 6, 7, [8, 9]]], [10, 11]];

//遍历方法实现
function flatten1(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    const ele = arr[i];
    if (Array.isArray(ele)) {
      newArr = newArr.concat(flatten1(ele));
    } else {
      newArr.push(ele);
    }
  }
  return newArr;
}

//toString()
function flatten2(arr) {
  return arr
    .toString()
    .split(",")
    .map((item) => +item);
}

//reduce()
function flatten3(arr) {
  return arr.reduce((pre, next) => {
    return pre.concat(Array.isArray(next) ? flatten3(next) : next);
  }, []);
}

//es6 扩展运算符...
function flatten4(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}

function flatten(input, shallow, strict, output) {
  // 递归使用的时候会用到output
  output = output || [];
  var idx = output.length;

  for (var i = 0, len = input.length; i < len; i++) {
    var value = input[i];
    // 如果是数组，就进行处理
    if (Array.isArray(value)) {
      // 如果是只扁平一层，遍历该数组，依此填入 output
      if (shallow) {
        var j = 0,
          length = value.length;
        while (j < length) output[idx++] = value[j++];
      }
      // 如果是全部扁平就递归，传入已经处理的 output，递归中接着处理 output
      else {
        flatten(value, shallow, strict, output);
        idx = output.length;
      }
    }
    // 不是数组，根据 strict 的值判断是跳过不处理还是放入 output
    else if (!strict) {
      output[idx++] = value;
    }
  }

  return output;
}
// console.log(flatten1(arr));
// console.log(flatten2(arr));

console.log(flatten(arr));
