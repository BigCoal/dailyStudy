const babylon = require('babylon')
const { Tapable } = require('tapable')

class Parser extends Tapable {
  parse(source) {
    return babylon.parse(source, {
      sourceType: 'module',
      plugins: ['dynamicImport']  // 当前插件可以支持 import() 动态导入的语法
    })
  }
}

module.exports = Parser

