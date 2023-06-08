const class2type = {};
const basicTypes = [
  "Null",
  "Undefined",
  "Boolean",
  "Number",
  "String",
  "Function",
  "Array",
  "Date",
  "RegExp",
  "Object",
  "Error",
];
basicTypes.map((item) => {
  class2type[`[object ${item}]`] = item.toLowerCase();
});

function type(obj) {
  //解决IE6 中，null 和 undefined 会被 Object.prototype.toString 识别成 [object Object]
  if (!obj) {
    return obj + "";
  }
  const class2 = typeof obj;
  return class2 !== "object" || class2 == "function"
    ? class2
    : class2type[Object.prototype.toString.call(obj)] || "object";
}

// 以下是11种：
var number = 1; // [object Number]
var string = "123"; // [object String]
var boolean = true; // [object Boolean]
var und = undefined; // [object Undefined]
var nul = null; // [object Null]
var obj = { a: 1 }; // [object Object]
var array = [1, 2, 3]; // [object Array]
var date = new Date(); // [object Date]
var error = new Error(); // [object Error]
var reg = /a/g; // [object RegExp]
var func = function a() {}; // [object Function]

function checkType() {
  for (var i = 0; i < arguments.length; i++) {
    console.log(type(arguments[i]));
  }
}

checkType(
  number,
  string,
  boolean,
  und,
  nul,
  obj,
  array,
  date,
  error,
  reg,
  func
);
