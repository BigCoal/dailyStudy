const {
  Tapable,
  SyncHook,
  SyncBailHook,
  AsyncSeriesHook,
  AsyncParallelHook
} = require('tapable')

const Stats = require('./Stats')
const NormalModuleFactory = require('./NormalModuleFactory')
const Compilation = require('./Compilation')

class Compiler extends Tapable {
  constructor(context) {
    super()
    this.context = context
    this.hooks = {
      done: new AsyncSeriesHook(["stats"]),
      entryOption: new SyncBailHook(["context", "entry"]),

      beforeRun: new AsyncSeriesHook(["compiler"]),
      run: new AsyncSeriesHook(["compiler"]),

      thisCompilation: new SyncHook(["compilation", "params"]),
      compilation: new SyncHook(["compilation", "params"]),

      beforeCompile: new AsyncSeriesHook(["params"]),
      compile: new SyncHook(["params"]),
      make: new AsyncParallelHook(["compilation"]),
      afterCompile: new AsyncSeriesHook(["compilation"]),
    }
  }
  run(callback) {
    console.log('run 方法执行了~~~~')

    const finalCallback = function (err, stats) {
      callback(err, stats)
    }

    const onCompiled = function (err, compilation) {
      console.log('onCompiled~~~~')
      finalCallback(err, new Stats(compilation))
    }

    this.hooks.beforeRun.callAsync(this, (err) => {
      this.hooks.run.callAsync(this, (err) => {
        this.compile(onCompiled)
      })
    })
  }

  compile(callback) {
    const params = this.newCompilationParams()

    this.hooks.beforeRun.callAsync(params, (err) => {
      this.hooks.compile.call(params)
      const compilation = this.newCompilation(params)

      this.hooks.make.callAsync(compilation, (err) => {
        console.log('make钩子监听触发了~~~~~')
        callback(err, compilation)
      })
    })
  }

  newCompilationParams() {
    const params = {
      normalModuleFactory: new NormalModuleFactory()
    }

    return params
  }

  newCompilation(params) {
    const compilation = this.createCompilation()
    this.hooks.thisCompilation.call(compilation, params)
    this.hooks.compilation.call(compilation, params)
    return compilation
  }

  createCompilation() {
    return new Compilation(this)
  }
}

module.exports = Compiler
