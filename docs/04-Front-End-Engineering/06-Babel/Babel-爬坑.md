# Babel 爬坑

## require 引用 ES 模块

正常来说，babel 的 @babel/plugin-transform-modules-commonjs 插件可以把 ES 模块转换为 commonjs 模块，有时候在 node_modules 中部分包有这种 require 引用 ES 模块引用关系，默认 babel 是不解析 node_modules

当报错信息为 `Error [ERR_REQUIRE_ESM]: Must use import to load ES Module`
可以在本地用@babel/register 插件 并去除 node_modules 报错包的 type:"module"，babel 就能正常解析 es 为 commonjs
