const path = require('path')
const Parser = require('./Parser')
const NormalModuleFactory = require('./NormalModuleFactory')
const { Tapable, SyncHook } = require('tapable')

// 实例化一个 normalModuleFactory parser 
const normalModuleFactory = new NormalModuleFactory()
const parser = new Parser()

class Compilation extends Tapable {
  constructor(compiler) {
    super()
    this.compiler = compiler
    this.context = compiler.context
    this.options = compiler.options
    // 让 compilation 具备文件的读写能力
    this.inputFileSystem = compiler.inputFileSystem
    this.outputFileSystem = compiler.outputFileSystem
    this.entries = []  // 存入所有入口模块的数组
    this.modules = [] // 存放所有模块的数据
    this.hooks = {
      succeedModule: new SyncHook(['module'])
    }
  }

  /**
   * 完成模块编译操作
   * @param {*} context 当前项目的根
   * @param {*} entry 当前的入口的相对路径
   * @param {*} name chunkName main 
   * @param {*} callback 回调
   */
  addEntry(context, entry, name, callback) {
    this._addModuleChain(context, entry, name, (err, module) => {
      callback(err, module)
    })
  }

  _addModuleChain(context, entry, name, callback) {
    let entryModule = normalModuleFactory.create({
      name,
      context,
      rawRequest: entry,
      resource: path.posix.join(context, entry),  // 当前操作的核心作用就是返回 entry 入口的绝对路径
      parser
    })

    const afterBuild = function (err) {
      callback(err, entryModule)
    }

    this.buildModule(entryModule, afterBuild)

    // 当我们完成了本次的 build 操作之后将 module 进行保存
    this.entries.push(entryModule)
    this.modules.push(entryModule)
  }

  /**
   * 完成具体的 build 行为
   * @param {*} module 当前需要被编译的模块
   * @param {*} callback 
   */
  buildModule(module, callback) {
    module.build(this, (err) => {
      // 如果代码走到这里就意味着当前 Module 的编译完成了
      this.hooks.succeedModule.call(module)
      callback(err)
    })
  }
}

module.exports = Compilation

