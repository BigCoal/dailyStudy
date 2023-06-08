var toUpperCase = function (x) {
  return x.toUpperCase();
};
var hello = function (x) {
  return "HELLO, " + x;
};

function compose() {
  const argsFun = [...arguments];
  return function () {
    let params = arguments;
    for (let i = 0; i < argsFun.length; i++) {
      params =
        i === 0
          ? argsFun[0].apply(this, params)
          : argsFun[i].call(this, params);
    }
    return params;
  };
}

var greet = compose(hello, compose(hello, toUpperCase));

console.log(greet("kevin"));
