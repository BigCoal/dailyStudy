const toString = {}.toString;

function extend() {
  let oriObj = arguments[0];
  let extendObj = Array.prototype.slice.call(arguments, 1);
  for (let i = 0; i < extendObj.length; i++) {
    const ele = extendObj[i];
    merge(oriObj, ele);
  }
  return oriObj;
}

function merge(obj1, obj2) {
  for (const i in obj2) {
    if (Object.hasOwnProperty.call(obj2, i)) {
      if (
        toString.call(obj2[i]) === toString.call(obj1[i]) &&
        ["[object Array]", "[object Object]"].includes(toString.call(obj2[i]))
      ) {
        obj1[i] = extend(obj1[i], obj2[i]);
      } else {
        obj1[i] = obj2[i];
      }
    }
  }
}

var obj1 = {
  a: 1,
  b: { b1: 1, b2: 2, c1: 2, c3: { d: 12 } },
};

var obj2 = {
  b: { b1: 3, b3: 4 },
  c: 3,
};

var obj3 = {
  d: 4,
};

console.log(extend(obj1, obj2, obj3));


var obj4 = {
    a: 1,
    b: {
        c: 2
    } 
}

var obj5 = {
    b: {
        c: [5],

    }
}

console.log(extend(obj4, obj5));