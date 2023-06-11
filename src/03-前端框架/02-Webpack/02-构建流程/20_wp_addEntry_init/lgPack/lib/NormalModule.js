

class NormalModule {
  constructor(data) {
    this.name = data.name
    this.entry = data.entry
    this.rawRequest = data.rawRequest
    this.parser = data.parser // TODO: 等待完成
    this.resource = data.resource
    this._source  // 存放某个模块的源代码
    this._ast // 存放某个模板源代码对应的 ast 
  }

  build(compilation, callback) {
    /**
     * 01 从文件中读取到将来需要被加载的 module 内容，这个
     * 02 如果当前不是 js 模块则需要 Loader 进行处理，最终返回 js 模块 
     * 03 上述的操作完成之后就可以将 js 代码转为 ast 语法树
     * 04 当前 js 模块内部可能又引用了很多其它的模块，因此我们需要递归完成 
     * 05 前面的完成之后，我们只需要重复执行即可
     */
    this.doBuild(compilation, (err) => {
      this._ast = this.parser.parse(this._source)
      callback(err)
    })
  }

  doBuild(compilation, callback) {
    this.getSource(compilation, (err, source) => {
      this._source = source
      callback()
    })
  }

  getSource(compilation, callback) {
    compilation.inputFileSystem.readFile(this.resource, 'utf8', callback)
  }
}

module.exports = NormalModule
