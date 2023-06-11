const fs = require('fs')

class NodeEnvironmentPlugin {
  constructor(options) {
    this.options = options || {}
  }

  apply(complier) {
    complier.inputFileSystem = fs
    complier.outputFileSystem = fs
  }
}

module.exports = NodeEnvironmentPlugin
