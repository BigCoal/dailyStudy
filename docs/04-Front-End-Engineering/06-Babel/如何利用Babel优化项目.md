# 如何利用 Babel 优化项目

`Babel`优化项目的方向主要包括以下两点：

- 减少项目文件体积
- 设置访问公共函数，避免创建重复函数方法（也是间接减少体积）

## 测试环境搭建

本次，我们基于`webpack`，搭建测试 demo。

```
// 初始化项目
npm init -y

// 添加webpack
npm install webpack webpack-cli --save-dev

// 添加babel相关，进行js代码转换
npm install -D babel-loader @babel/core @babel/preset-env

// 生成html文件
npm install -D html-webpack-plugin
```

创建`webpack.config.js`文件

```
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: {main: ['./src/index.js']},
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        }
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin()],
};
```

创建`index.html`和`index.js`、`util.js`文件

![](./static/a1f74700fc084450a4bb9e2d6aba68d5~tplv-k3u1fbpfcp-zoom-in-crop-mark-4536-0-0-0.png?)

```
// util.js
async function requestUtil() {
  await 0;
}
export { requestUtil }

// index.js
require('./util');
```

添加`package.json`

```
"webpack": "npx webpack --config webpack.config.js"
```

执行打包命令：`yarn webpack`

![](./static/80a57dc4a050442e887d54eb8ff09c00~tplv-k3u1fbpfcp-zoom-in-crop-mark-4536-0-0-0.png?)

**打包后的文件为`1.09k`**

## 引入`Polyfill`

为了向后兼容浏览器，需要添加`Polyfill`。

> 从 Babel 7.4.0 开始，该包已被弃用，取而代之的是直接包含 core-js/stable（用于填充 ECMAScript 功能）和 regenerator-runtime/runtime（需要使用转译的生成器函数）

因为已经被废弃了，所以不需要再单独安装`@babel/polyfill`，直接在项目中使用`core-js/stable`和`regenerator-runtime/runtime`即可。

**在`index.js`中直接引入。**

```
import "core-js/stable";
import "regenerator-runtime/runtime";

require('./util');
```

执行打包命令：`yarn webpack`

![](./static/9343b408edd14dfc8c9f17d4cf475309~tplv-k3u1fbpfcp-zoom-in-crop-mark-4536-0-0-0.png?)

**打包后的文件为`158k`**

## 减少项目文件体积

问题：比较上次两次打包的大小：`1.09k` -> `158k`。由于添加了浏览器兼容的代码，导致项目体积增大。

添加浏览器兼容代码导致项目增大无可厚非，但是打包后的项目中包含了大量无效的代码。

因为我们添加的兼容代码是全量添加的，就是我们项目中只用到了很少一部分的语法兼容代码。但是最后打包时，却把所有语法的兼容代码打入到项目中，出现了很多无效的代码。该如何处理？

那我们就按需加载，就是我们用到了哪个语法，就加入哪个语法的兼容的代码。在`"@babel/preset-env"`中，添加属性`"useBuiltIns": "usage"`即可，同时需要安装`core-js@3`。

```
npm install core-js@3 --save
```

```
// webpack.config.js
...
module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
              // 按需加载
                useBuiltIns: 'usage',
                corejs: 3,
            }]],
          }
        }
      }
    ]
  },
...
```

**因为要按需加载，所以要去除`index.js`中的`core-js/stable`和`regenerator-runtime/runtime`**

```
// import "core-js/stable";
// import "regenerator-runtime/runtime";
require('./util');
```

执行打包命令：`yarn webpack`

![](./static/f4646a142b3740c3b0ae3c7422ed7cdc~tplv-k3u1fbpfcp-zoom-in-crop-mark-4536-0-0-0.png?)

**打包后的文件为`158k` -> `30.3k`**。比较两次包体积，可以看出按需加载有效。

## 防止重复函数创建

使用插件`@babel/plugin-transform-runtime`, 可以重用 Babel 的注入帮助代码以节省代码大小。

安装插件

```
npm install --save-dev @babel/plugin-transform-runtime

npm install --save @babel/runtime // 需要配合添加
```

```
// webpack.config.js
     ...
     options: {
       presets: [['@babel/preset-env', {
          // 按需加载
          useBuiltIns: 'usage',
          corejs: 3,
        }]],
       // 避免公共函数重复创建；避免造成作用域污染
       plugins: ["@babel/plugin-transform-runtime"]
   }
    ...
```

![](./static/a0d64c8d98c5423992bcc52ae5703bdc~tplv-k3u1fbpfcp-zoom-in-crop-mark-4536-0-0-0.png?)

执行打包命令：`yarn webpack` **打包后的文件为`30.3k` -> `7.53`**。比较两次包体积，可以看出防重复有效

**这个插件，除了能够减少项目体积，也能防止`作用域污染`。这在写一个`包项目`时特别有用。**
