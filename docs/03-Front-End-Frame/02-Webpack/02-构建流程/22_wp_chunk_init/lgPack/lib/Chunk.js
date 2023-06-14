

class Chunk {
  constructor(entryModule) {
    this.entryModule = entryModule
    this.name = entryModule.name
    this.files = []  // 记录每个 chunk的文件信息
    this.modules = [] // 记录每个 chunk 里的所包含的 module
  }
}

module.exports = Chunk

