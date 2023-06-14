const SyncHook = require('./SyncHook.js')

let hook = new SyncHook(['name', 'age'])

hook.tap('fn1', function (name, age) {
  console.log('fn1-->', name, age)
})

hook.tap('fn2', function (name, age) {
  console.log('fn2-->', name, age)
})

hook.call('zoe66', 18)

/**
 * 01 实例化 hook ， 定义 _x = [f1, f2, ...] taps = [{}, {}]
 * 02 实例调用 tap  taps = [{}, {}]
 * 03 调用 call 方法， HookCodeFactory  setup create
 * 04 Hook SyncHook HookCodeFactory
 */