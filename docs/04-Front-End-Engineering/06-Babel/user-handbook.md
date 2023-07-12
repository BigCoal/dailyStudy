# Babel 用户手册

这本手册涵盖了关于 [Babel](https://babeljs.io) 的使用及其相关工具的内容。

## <a id="toc-introduction"></a>介绍

Babel 是一个通用的多用途 JavaScript 编译器。通过 Babel 你可以使用（并创建）下一代的 JavaScript，以及下一代的 JavaScript 工具。

作为一种语言，JavaScript 在不断发展，新的标准／提案和新的特性层出不穷。 在得到广泛普及之前，Babel 能够让你提前（甚至数年）使用它们。

Babel 把用最新标准编写的 JavaScript 代码向下编译成可以在今天随处可用的版本。 这一过程叫做“源码到源码”编译， 也被称为<strong style="background:yellow">转换编译</strong>（transpiling，是一个自造合成词，即转换＋编译。以下也简称为转译）。

例如，Babel 能够将新的 ES2015 箭头函数语法：

```js
const square = (n) => n * n;
```

转译为：

```js
const square = function square(n) {
  return n * n;
};
```

不过 Babel 的用途并不止于此，它支持语法扩展，能支持像 React 所用的 JSX 语法，同时还支持用于静态类型检查的流式语法（Flow Syntax）。

更重要的是，<strong style='background:yellow'>Babel 的一切都是简单的插件(和 webpack 的概念相同)</strong>，谁都可以创建自己的插件，利用 Babel 的全部威力去做任何事情。

_再进一步_，Babel 自身被分解成了数个核心模块，任何人都可以利用它们来创建下一代的 JavaScript 工具。

已经有很多人都这样做了，围绕着 Babel 涌现出了非常大规模和多样化的生态系统。 在这本手册中，我将介绍如何使用 Babel 的内建工具以及一些来自于社区的非常有用的东西。

> **_在 Twitter 上关注 [@thejameskyle](https://twitter.com/thejameskyle)，第一时间获取更新。_**

---

## <a id="toc-setting-up-babel"></a>运行 Babel 的四种方式

由于 JavaScript 社区没有统一的构建工具、框架、平台等等，因此 Babel 正式集成了对所有主流工具的支持。 从 Gulp 到 Browserify，从 Ember 到 Meteor，不管你的环境设置如何，Babel 都有正式的集成支持。

本手册的目的主要是介绍 Babel 内建方式的安装，不过你可以访问交互式的[安装页面](http://babeljs.io/docs/setup)来查看其它的整合方式。

> **注意：** 本手册将涉及到一些命令行工具如 `node` 和 `npm`。在继续阅读之前请确保你已经熟悉这些工具了。

### <a id="toc-@babel/cli"></a>`@babel/cli`

Babel 的 CLI 是一种在命令行下使用 Babel 编译文件的简单方法。

让我们先全局安装它来学习基础知识。

```sh
$ npm install --global @babel/cli
```

我们可以这样来编译我们的第一个文件：

```sh
$ babel my-file.js
```

这将把编译后的结果直接输出至终端。使用 `--out-file` 或着 `-o` 可以将结果写入到指定的文件。.

```sh
$ babel example.js --out-file compiled.js
## 或
$ babel example.js -o compiled.js
```

如果我们想要把一个目录整个编译成一个新的目录，可以使用 `--out-dir` 或者 `-d`。.

```sh
$ babel src --out-dir lib
## 或
$ babel src -d lib
```

#### <a id="toc-running-@babel/cli-from-within-a-project"></a>在项目内运行 Babel CLI

尽管你*可以*把 Babel CLI 全局安装在你的机器上，但是按项目逐个安装在**本地**会更好。

有两个主要的原因。

1. 在同一台机器上的不同项目或许会依赖不同版本的 Babel 并允许你有选择的更新。
2. 这意味着你对工作环境没有隐式依赖，这让你的项目有很好的可移植性并且易于安装。

要在（项目）本地安装 Babel CLI 可以运行：

```sh
$ npm install --save-dev @babel/cli
```

> **注意：**因为全局运行 Babel 通常不是什么好习惯所以如果你想要卸载全局安装的 Babel 的话，可以运行：
>
> ```sh
> $ npm uninstall --global @babel/cli
> ```

````

安装完成后，你的 `package.json` 应该如下所示：

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "devDependencies": {
    "@babel/cli": "^6.0.0"
  }
}
````

现在，我们不直接从命令行运行 Babel 了，取而代之我们将把运行命令写在 **npm scripts** 里，这样可以使用 Babel 的本地版本。

只需将 `"scripts"` 字段添加到你的 `package.json` 文件内并且把 babel 命令写成 `build` 字段。.

```diff
  {
    "name": "my-project",
    "version": "1.0.0",
+   "scripts": {
+     "build": "babel src -d lib"
+   },
    "devDependencies": {
      "@babel/cli": "^6.0.0"
    }
  }
```

现在可以在终端里运行：

```js
npm run build
```

这将以与之前同样的方式运行 Babel，但这一次我们使用的是本地副本。

### <a id="toc-@babel/register"></a>`@babel/register`

下一个常用的运行 Babel 的方法是通过 `@babel/register`。这种方法只需要引入文件就可以运行 Babel，或许能更好地融入你的项目设置。

babel-register 模块改写 require 命令，为它加上一个钩子。此后，每当使用 require 加载.js、.jsx、.es 和.es6 后缀名的文件，就会先用 Babel 进行转码。

但请注意这种方法并不适合正式产品环境使用。 直接部署用此方式编译的代码不是好的做法。 在部署之前预先编译会更好。 不过用在构建脚本或是其他本地运行的脚本中是非常合适的。

让我们先在项目中创建 `index.js` 文件。

```js
console.log("Hello world!");
```

如果我们用 `node index.js` 来运行它是不会使用 Babel 来编译的。所以我们需要设置 `@babel/register`。.

首先安装 `@babel/register`。.

```sh
$ npm install --save-dev @babel/register
```

接着，在项目中创建 `register.js` 文件并添加如下代码：

```js
require("@babel/register")({
  presets: ["@babel/preset-env"],
  ignore: [
    function (filepath) {
      console.log("路径", filepath);
      return false;
    },
  ],
});
require("./index.js");
```

这样做可以把 Babel *注册*到 Node 的模块系统中并开始编译其中 `require` 的所有文件。

现在我们可以使用 `register.js` 来代替 `node index.js` 来运行了。

```sh
$ node register.js
```

> **注意：**你不能在你要编译的文件内同时注册 Babel，因为 node 会在 Babel 编译它之前就将它执行了。
>
> ```js
> require("@babel/register");
> // 未编译的：
> console.log("Hello world!");
> ```

> babel-register 只会对 require 命令加载的文件转码，而不会对当前文件转码。另外，由于它是实时转码，所以只适合在开发环境使用。

### <a id="toc-@babel/node"></a> @babel/node

如果你要用 `node` CLI 来运行代码，那么整合 Babel 最简单的方式就是使用 `@babel/node` CLI，它是 `node` CLI 的替代品，提供了比 Node.js 更强大的功能，`@babel/node`提供一个支持 ES6 的 REPL 环境。它支持 Node 的 REPL 环境的所有功能，而且可以直接运行 ES6 代码。

> 该工具执行的时候需要占用大量内存空间，Babel 官方不建议在生产环境使用该工具。实时转码

首先确保 `@babel/cli` 已经安装了。

```sh
$ npm install --save-dev @babel/core
$ npm install --save-dev @babel/node

```

> **注意:** 如果您想知道我们为什么要在本地安装，请阅读 上面[在项目内运行 Babel CLI](#toc-running-@babel/cli-from-within-a-project)的部分。

然后用 `@babel/node` 来替代 `node` 运行所有的代码 。.

如果用 npm `scripts` 的话只需要这样做：

```diff
  {
    "scripts": {
-     "script-name": "node script.js"
+     "script-name": "@babel/node script.js"
    }
  }
```

要不然的话你需要写全 `@babel/node` 的路径。

```diff
- node script.js
+ ./node_modules/.bin/@babel/node script.js
```

> 提示：你可以使用 [`npm-run`](https://www.npmjs.com/package/npm-run)。.

### <a id="toc-@babel/core"></a>`@babel/core`

如果你需要以编程的方式来使用 Babel，可以使用 `@babel/core` 这个包。

首先安装 `@babel/core`。.

```sh
$ npm install @babel/core
```

```js
var babel = require("@babel/core");
```

字符串形式的 JavaScript 代码可以直接使用 `babel.transform` 来编译。.

```js
babel.transform("code();", options);
// => { code, map, ast }
```

如果是文件的话，可以使用异步 api：

```js
babel.transformFile("filename.js", options, function (err, result) {
  result; // => { code, map, ast }
});
```

或者是同步 api：

```js
babel.transformFileSync("filename.js", options);
// => { code, map, ast }
```

要是已经有一个 Babel AST（抽象语法树）了就可以直接从 AST 进行转换。

```js
babel.transformFromAst(ast, code, options);
// => { code, map, ast }
```

对于上述所有方法，`options` 指的都是 http://babeljs.io/docs/usage/options/

---

## <a id="toc-configuring-babel"></a>Babel 配置文件

你或许已经注意到了，目前为止通过运行 Babel 自己我们并没能“翻译”代码，而仅仅是把代码从一处拷贝到了另一处。

这是因为我们还没告诉 Babel 要做什么。

> 由于 Babel 是一个可以用各种花样去使用的通用编译器，因此默认情况下它反而什么都不做。你必须明确地告诉 Babel 应该要做什么。

你可以通过安装**插件（plugins）**或**预设（presets，也就是一组插件）**来指示 Babel 去做什么事情。

### <a id="toc-babelrc"></a>`.babelrc`

在我们告诉 Babel 该做什么之前，我们需要创建一个配置文件。你需要做的就是在项目的根路径下创建 `.babelrc` 文件。然后输入以下内容作为开始：

```js
{
  "presets": [],
  "plugins": []
}
```

这个文件就是用来让 Babel 做你要它做的事情的配置文件。

> **注意：**尽管你也可以用其他方式给 Babel 传递选项，但 `.babelrc` 文件是约定也是最好的方式。

### <a id="toc-babelrc"></a>`babel.config.js`

```js
module.exports = function (api) {
  api.cache(true);

  const presets = [ ... ];
  const plugins = [ ... ];

  if (process.env["ENV"] === "prod") {
    plugins.push(...);
  }

  return {
    presets,
    plugins
  };
}
```

### <a id="toc-babelrc"></a>`package.json`

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "babel": {
    "presets": [ ... ],
    "plugins": [ ... ],
  }
}
```

## <a id="toc-executing-babel-generated-code"></a>Babel Polyfill 及优化方案

即便你已经用 Babel 编译了你的代码，但这还不算完。

### <a id="toc-babel-polyfill"></a>`babel-polyfill`

Babel 几乎可以编译所有时新的 JavaScript 语法，但对于 APIs 来说却并非如此。

比方说，下列含有箭头函数的需要编译的代码：

```js
function addAll() {
  return Array.from(arguments).reduce((a, b) => a + b);
}
```

最终会变成这样：

```js
function addAll() {
  return Array.from(arguments).reduce(function (a, b) {
    return a + b;
  });
}
```

然而，它依然无法随处可用因为不是所有的 JavaScript 环境都支持 `Array.from`。

```
    Uncaught TypeError: Array.from is not a function
```

为了解决这个问题，我们使用一种叫做 [Polyfill（代码填充，也可译作兼容性补丁）](https://remysharp.com/2010/10/08/what-is-a-polyfill) 的技术。 简单地说，polyfill 即是在当前运行环境中用来复制（意指模拟性的复制，而不是拷贝）尚不存在的原生 api 的代码。 能让你提前使用还不可用的 APIs，`Array.from` 就是一个例子。

Babel 用了优秀的 [core-js](https://github.com/zloirock/core-js) 用作 polyfill，并且还有定制化的 [regenerator](https://github.com/facebook/regenerator) 来让 generators（生成器）和 async functions（异步函数）正常工作。

要使用 Babel polyfill，首先用 npm 安装它：

```sh
$ npm install --save babel-polyfill
```

然后只需要在文件顶部导入 polyfill 就可以了：

```js
import "babel-polyfill";
```

> 它会”加载整个 polyfill 库”，会使打包后的库变得臃肿

### <a id="toc-babel-runtime"></a>`babel-runtime`

babel-runtime 更像是一种按需加载（babel-polyfill）的实现，比如你哪里需要使用 Promise，只要在这个文件头部

```js
import Promise from "babel-runtime/core-js/promise";
```

就行了

不过如果你许多文件都要使用 Promise，难道每个文件都要 import 一下吗？当然不是，Babel 官方已考虑这种情况，只需要使用 @babel/plugin-transform-runtime 就可以解决手动 import 的苦恼了。

#### @babel/plugin-transform-runtime

@babel/plugin-transform-runtime 装了就不需要装 babel-runtime 了，因为前者依赖后者。
总的来说，@babel/plugin-transform-runtime 就是可以在我们使用新 API 时 自动 import babel-runtime 里面的 polyfill，具体插件做了以下三件事情：

当我们使用 async/await 时，自动引入 babel-runtime/regenerator  
当我们使用 ES6 的静态事件或内置对象时，自动引入 babel-runtime/core-js  
移除内联 babel helpers 并替换使用 babel-runtime/helpers 来替换

@babel/plugin-transform-runtime 优点：

- 不会污染全局变量
- 多次使用只会打包一次
- 依赖统一按需引入,无重复引入,无多余引入
- 避免 babel 编译的工具函数在每个模块里重复出现，减小库和工具包的体积

```js
{
    "presets":[
        ["@babel/preset-env",{
            "targets": {

                "chrome": "67"
              }
        }]
    ],
    "plugins": ["@babel/plugin-transform-runtime"]
}
```

再来看一个示例，以上配置，当我们没有设置` "plugins": ["@babel/plugin-transform-runtime"]`
源代码

```js
const key = "babel";
const obj = {
  [key]: "polyfill",
};
```

打包后代码

```js
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var key = "babel";
var obj = _defineProperty({}, key, Object.assign({}, { key: "polyfill" }));
```

babel-polyfill（@babel/preset-env 已经内置了 babel-polyfill） 解决了 Babel 不转换新 API 的问题，但是直接在代码中插入帮助函数，会导致污染了全局环境，并且不同的代码文件中包含重复的代码，导致编译后的代码体积变大。 （比如：上述的帮助函数\_defineProperty 有可能在很多的代码模块文件中都会被插入）

启用插件 @babel/plugin-transform-runtime 后，Babel 就会使用 babel-runtime 下的工具函数，上述的代码就会变成这样

```js
var _defineProperty2 = __webpack_require__(
  "./node_modules/babel-runtime/helpers/defineProperty.js"
);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = __webpack_require__(
  "./node_modules/babel-runtime/core-js/object/assign.js"
);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var key = "babel";
var obj = (0, _defineProperty3.default)(
  {},
  key,
  (0, _assign2.default)({}, { key: "polyfill" })
);
```

---

## <a id="toc-configuring-babel-advanced"></a>配置 Babel（进阶）

大多数人使用 Babel 的内建预设就足够了，不过 Babel 提供了更多更细粒度的能力。

### <a id="toc-manually-specifying-plugins"></a>手动指定插件

Babel 预设就是一些预先配置好的插件的集合，如果你想要做一些不一样的事情你会手动去设定插件，这和使用预设几乎完全相同。

首先安装插件：

```sh
$ npm install --save-dev @babel/plugin-transform-runtime
```

然后往 `.babelrc` 文件添加 `plugins` 字段。.

```diff
  {
+   "plugins": [
+     "@babel/plugin-transform-runtime"
+   ]
  }
```

这能让你对正在使用的转换器进行更细致的控制。

完整的官方插件列表请见 [Babel 插件页面](http://babeljs.io/docs/plugins/)。.

同时也别忘了看看[由社区构建的其他插件](https://www.npmjs.com/search?q=babel-plugin)。 如果你想学习如何编写自己的插件可以阅读 [Babel 插件手册](plugin-handbook.md)。.

### <a id="toc-plugin-options"></a>插件选项

很多插件也有选项用于配置他们自身的行为。

要为插件添加选项，只需要做出以下更改：

```diff
  {
    "plugins": [
-     "@babel/plugin-transform-runtime"
+     ["@babel/plugin-transform-runtime", {
+         "absoluteRuntime": false,
+         "corejs": false
+      }]
    ]
  }
```

### <a id="toc-making-your-own-preset"></a>制作你自己的预设（preset）

要制作你自己的预设（本地使用或 npm），您需要导出一个配置对象。

```js
//myPreset.js
module.exports = () => ({
  presets: [require("@babel/preset-env")],
  plugins: [
    [require("@babel/plugin-proposal-class-properties"), { loose: true }],
    require("@babel/plugin-proposal-object-rest-spread"),
  ],
});
```

预设排序是倒序（从最后一个到第一个）。

```js
{
  "presets": ["a", "b", "c"]
}
```

将按以下顺序运行：c，b，然后 a。

插件和预设都可以通过将名称和选项对象包装在你的配置的一个数组内来指定选项。

```js
{
  "presets": [
    "presetA", // 单字符串
    ["presetA"], // 包装在数组中
    ["presetA", {}] // 第 2 个参数是一个空的配置对象
  ]
}
```

最后在你的.babelrc 文件中引入自己设置的预设

```js
{
  "presets": ["./myPreset"]
}
```

---

## <a id="toc-babel-and-other-tools"></a>Babel 和其他工具

一旦你掌握的窍门，安装 Babel 还是十分简明的，不过和其他工具搭配在一起就会变得困难多了。 不过我们一直在与其他项目密切合作以确保这种体验尽可能简单。

### <a id="toc-static-analysis-tools"></a>静态分析工具

新标准为语言带来了许多新的语法，静态分析工具正在将此利用起来。

### <a id="toc-linting"></a>语法检查（Linting）

[ESLint](http://eslint.org) 是最流行的语法检查工具之一，因此我们维护了一个官方的 [`babel-eslint`](https://github.com/babel/babel-eslint) 整合软件包。

首先安装 `eslint` 和 `babel-eslint`。.

```sh
$ npm install --save-dev eslint babel-eslint
```

然后创建或使用项目现有的 `.eslintrc` 文件并设置 `parser` 为 `babel-eslint`。.

```diff
  {
+   "parser": "babel-eslint",
    "rules": {
      ...
    }
  }
```

现在添加一个 `lint` 任务到 npm 的 `package.json` 脚本中：

```diff
  {
    "name": "my-module",
    "scripts": {
+     "lint": "eslint my-files.js"
    },
    "devDependencies": {
      "babel-eslint": "...",
      "eslint": "..."
    }
  }
```

接着只需要运行这个任务就一切就绪了。

```sh
$ npm run lint
```

详细信息请咨询 [`babel-eslint`](https://github.com/babel/babel-eslint) 或者 [`eslint`](http://eslint.org) 的文档。

### <a id="toc-documentation"></a>文档

使用 Babel，ES2015，还有 Flow 你可以对你的代码进行大量的推断。使用 [documentation.js](http://documentation.js.org) 可以非常简便地生成详细的 API 文档。

Documentation.js 使用 Babel 来支持所有最新的语法，包括用于在你的代码中声明类型所用的 Flow 注解在内，

### <a id="toc-babel-issues"></a>Babel 问题

Babel 使用[Github](http://github.com)提供的问题跟踪器。.

您可以在[Github](https://github.com/babel/babel/issues)上看到所有的开放和封闭的问题.

如果你想要打开一个新的问题：

- [先搜搜看有没有现存的类似问题](https://github.com/babel/babel/issues)
- 创建一个新的错误报告</> 或请求新功能</>
