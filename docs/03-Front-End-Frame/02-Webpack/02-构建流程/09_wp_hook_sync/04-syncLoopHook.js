const { SyncLoopHook } = require("tapable");

let hook = new SyncLoopHook(["name", "age"]);

let count1 = 0;
let count2 = 0;
let count3 = 0;

hook.tap("fn1", function (name, age) {
  console.log("fn1--->", name, age);
  if (++count1 === 1) {
    count1 = 0;
    return undefined;
  }
  return true;
});

hook.tap("fn2", function (name, age) {
  console.log("fn2--->", name, age);
  if (++count2 === 2) {
    count2 = 0;
    return undefined;
  }
  return true;
});

hook.tap("fn3", function (name, age) {
  console.log("fn3--->", name, age);
});

hook.call("foo", 100);
