const { AsyncParallelBailHook } = require('tapable')

let hook = new AsyncParallelBailHook(['name'])

console.time('time')
hook.tapAsync('fn1', function (name, callback) {
  setTimeout(() => {
    console.log('fn1--->', name)
    callback()
  }, 1000)
})

hook.tapAsync('fn2', function (name, callback) {
  setTimeout(() => {
    console.log('fn2--->', name)
    callback('err')
  }, 2000)
})

hook.tapAsync('fn3', function (name, callback) {
  setTimeout(() => {
    console.log('fn3--->', name)
    callback()
  }, 3000)
})

hook.callAsync('zce', function () {
  console.log('最后的回调执行了')
  console.timeEnd('time')
})
