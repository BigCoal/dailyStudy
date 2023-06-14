const AsyncParallelHook = require('./AsyncParallelHook.js')
// const { AsyncParallelHook } = require('tapable')

let hook = new AsyncParallelHook(['name', 'age'])

hook.tapAsync('fn1', function (name, age, callback) {
  console.log('fn1-->', name, age)
  callback()
})

hook.tapAsync('fn2', function (name, age, callback) {
  console.log('fn2-->', name, age)
  callback()
})

hook.callAsync('zoe66', 18, function () {
  console.log('end----')
})
