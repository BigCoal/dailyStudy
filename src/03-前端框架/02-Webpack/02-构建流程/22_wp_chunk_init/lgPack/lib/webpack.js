const Compiler = require('./Compiler')
const NodeEnvironmentPlugin = require('./node/NodeEnvironmentPlugin')
const WebpackOptionsApply = require('./WebpackOptionsApply')

const webpack = function (options) {
  // 01 实例化 compiler 对象
  let compiler = new Compiler(options.context)
  compiler.options = options

  // 02 初始化 NodeEnvironmentPlugin(让compiler具体文件读写能力)
  new NodeEnvironmentPlugin().apply(compiler)

  // 03 挂载所有 plugins 插件至 compiler 对象身上 
  if (options.plugins && Array.isArray(options.plugins)) {
    for (const plugin of options.plugins) {
      plugin.apply(compiler)
    }
  }

  // 04 挂载所有 webpack 内置的插件（入口）
  new WebpackOptionsApply().process(options, compiler);

  // 05 返回 compiler 对象即可
  return compiler
}

module.exports = webpack