const { SyncHook } = require('tapable')

let hook = new SyncHook(['name', 'age'])

hook.tap('fn1', function (name, age) {
  console.log('fn1--->', name, age)
})

hook.tap('fn2', function (name, age) {
  console.log('fn2--->', name, age)
})

hook.call('zoe', 18)
