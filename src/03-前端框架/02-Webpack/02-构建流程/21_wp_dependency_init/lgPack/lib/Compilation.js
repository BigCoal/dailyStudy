const path = require('path')
const async = require('neo-async')
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
    this.createModule({
      parser,
      name: name,
      context: context,
      rawRequest: entry,
      resource: path.posix.join(context, entry),
      moduleId: './' + path.posix.relative(context, path.posix.join(context, entry))
    }, (entryModule) => {
      this.entries.push(entryModule)
    }, callback)
  }

  /**
   * 定义一个创建模块的方法，达到复用的目的
   * @param {*} data 创建模块时所需要的一些属性值 
   * @param {*} doAddEntry 可选参数，在加载入口模块的时候，将入口模块的id 写入 this.entries 
   * @param {*} callback 
   */
  createModule(data, doAddEntry, callback) {
    let module = normalModuleFactory.create(data)

    const afterBuild = (err, module) => {
      // 在 afterBuild 当中我们就需要判断一下，当前次module 加载完成之后是否需要处理依赖加载
      if (module.dependencies.length > 0) {
        // 当前逻辑就表示module 有需要依赖加载的模块，因此我们可以再单独定义一个方法来实现
        this.processDependencies(module, (err) => {
          callback(err, module)
        })
      } else {
        callback(err, module)
      }
    }

    this.buildModule(module, afterBuild)

    // 当我们完成了本次的 build 操作之后将 module 进行保存
    doAddEntry && doAddEntry(module)
    this.modules.push(module)
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
      callback(err, module)
    })
  }

  processDependencies(module, callback) {
    // 01 当前的函数核心功能就是实现一个被依赖模块的递归加载
    // 02 加载模块的思想都是创建一个模块，然后想办法将被加载模块的内容拿进来?
    // 03 当前我们不知道 module 需要依赖几个模块， 此时我们需要想办法让所有的被依赖的模块都加载完成之后再执行 callback？【 neo-async 】
    let dependencies = module.dependencies

    async.forEach(dependencies, (dependency, done) => {
      this.createModule({
        parser,
        name: dependency.name,
        context: dependency.context,
        rawRequest: dependency.rawRequest,
        moduleId: dependency.moduleId,
        resource: dependency.resource
      }, null, done)
    }, callback)
  }
}

module.exports = Compilation

