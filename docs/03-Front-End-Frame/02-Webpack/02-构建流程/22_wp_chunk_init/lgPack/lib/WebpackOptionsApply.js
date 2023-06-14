const EntryOptionPlugin = require("./EntryOptionPlugin")


class WebpackOptionsApply {
  process(options, compiler) {
    new EntryOptionPlugin().apply(compiler)

    compiler.hooks.entryOption.call(options.context, options.entry)
  }
}

module.exports = WebpackOptionsApply
