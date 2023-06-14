const path = require('path')
const types = require('@babel/types')
const generator = require('@babel/generator').default
const traverse = require('@babel/traverse').default

class NormalModule {
  constructor(data) {
    this.context = data.context
    this.name = data.name
    this.moduleId = data.moduleId
    this.rawRequest = data.rawRequest
    this.parser = data.parser // TODO: 等待完成
    this.resource = data.resource
    this._source  // 存放某个模块的源代码
    this._ast // 存放某个模板源代码对应的 ast 
    this.dependencies = [] // 定义一个空数组用于保存被依赖加载的模块信息
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

      // 这里的 _ast 就是当前 module 的语法树，我们可以对它进行修改，最后再将 ast 转回成 code 代码 
      traverse(this._ast, {
        CallExpression: (nodePath) => {
          let node = nodePath.node

          // 定位 require 所在的节点
          if (node.callee.name === 'require') {
            // 获取原始请求路径
            let modulePath = node.arguments[0].value  // './title'  
            // 取出当前被加载的模块名称
            let moduleName = modulePath.split(path.posix.sep).pop()  // title
            // [当前我们的打包器只处理 js ]
            let extName = moduleName.indexOf('.') == -1 ? '.js' : ''
            moduleName += extName  // title.js
            // 【最终我们想要读取当前js里的内容】 所以我们需要个绝对路径
            let depResource = path.posix.join(path.posix.dirname(this.resource), moduleName)
            // 【将当前模块的 id 定义OK】
            let depModuleId = './' + path.posix.relative(this.context, depResource)  // ./src/title.js

            // 记录当前被依赖模块的信息，方便后面递归加载
            this.dependencies.push({
              name: this.name, // TODO: 将来需要修改 
              context: this.context,
              rawRequest: moduleName,
              moduleId: depModuleId,
              resource: depResource
            })

            // 替换内容
            node.callee.name = '__webpack_require__'
            node.arguments = [types.stringLiteral(depModuleId)]
          }
        }
      })

      // 上述的操作是利用ast 按要求做了代码修改，下面的内容就是利用 .... 将修改后的 ast 转回成 code 
      let { code } = generator(this._ast)
      this._source = code
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
