# Code Transformation（代码转换）

Jest 将项目中的代码作为 JavaScript 运行，但是如果你使用 Node.js 不支持的一些开箱即用的语法（例如 JSX、TypeScript 中的类型、Vue 模板等），那么你需要将该代码转换为纯 JavaScript，类似于你在为浏览器构建时所做的事情。

Jest 通过[转换配置选项](https://github.com/superPufferfish/JEST-API-Chinese/blob/feature/others/apis/ConfiguringJest.md#transform-objectstring-pathtotransformer--pathtotransformer-object)支持这一点。

转换器是一个模块，提供转换源文件的同步功能。例如，如果你希望能够在 node 尚不支持的模块或测试中使用新的语言功能，你可以插入许多编译器之一，将未来版本的 JavaScript 编译为当前版本

Jest 将缓存转换的结果，并根据一些因素（例如被转换的文件的来源和更改的配置）试图使结果无效。

## Defaults（默认值）

Jest 附带一个开箱即用的变压器 - `babel-jest`。它会自动加载你项目的 Babel 配置并转换任何与以下正则匹配的文件：`/\.[jt]sx?$/` 意味着任何 `.js`、`.jsx`、`.ts` 和 `.tsx` 文件。另外，`babel-jest` 会注入 [ES Module mocking](https://jestjs.io/docs/manual-mocks#using-with-es-module-imports) 中讲到的 mock hoisting 所必需的 Babel 插件。

如果你覆盖 `transform` 配置选项 `babel-jest` 将不再处于活动状态，如果你想使用 Babel，则需要手动添加它。

## Writing custom transformers（编写自定义转换器）

你可以编写自定义转换器，转换器的 API 如下：

```ts
interface Transformer<OptionType = unknown> {
  /**
   * 指示转换器是否能够检测代码以实现代码覆盖。
   *
   * 如果 V8 覆盖率 _not_ 处于活动状态，并且这是 `true` ，则 Jest 将假定代码已检测。
   * 如果 V8 覆盖率 _not_ 处于活动状态，并且这是 `false`。 Jest 将使用 Babel 检测这个转换器返回的代码。
   */
  canInstrument?: boolean;
  createTransformer?: (options?: OptionType) => Transformer;

  getCacheKey?: (
    sourceText: string,
    sourcePath: string,
    options: TransformOptions<OptionType>
  ) => string;

  process: (
    sourceText: string,
    sourcePath: string,
    options: TransformOptions<OptionType>
  ) => TransformedSource;
}

interface TransformOptions<OptionType> {
  /**
   * 如果转换器执行模块解析并读取文件，它应该填充`cacheFS`
   * 以便 Jest 避免再次读取相同的文件，从而提高性能。 `cacheFS` 存储条目：
   * <file path, file contents>
   */
  cacheFS: Map<string, string>;
  config: Config.ProjectConfig;
  /** 配置的字符串化版本 - 用于缓存破坏 */
  configString: string;
  instrument: boolean;
  // 名字是从 babel 复制过来的：https://babeljs.io/docs/en/options#caller
  supportsDynamicImport: boolean;
  supportsExportNamespaceFrom: boolean;
  supportsStaticESM: boolean;
  supportsTopLevelAwait: boolean;
  /** 用户通过 Jest 配置传递的选项 */
  transformerConfig: OptionType;
}

type TransformedSource =
  | { code: string; map?: RawSourceMap | string | null }
  | string;

// Config.ProjectConfig 可以在代码中看到 https://github.com/facebook/jest/blob/v26.6.3/packages/jest-types/src/Config.ts#L323
// RawSourceMap 来自 https://github.com/mozilla/source-map/blob/0.6.1/source-map.d.ts#L6-L12
```

可以看出，只有 `process` 是必须实现的，尽管我们强烈建议也实现 `getCacheKey`，因此，当我们可以从磁盘读取先前的结果时，我们不会浪费资源来转译相同的源文件。你可以使用 [`@jest/create-cache-key-function`](https://www.npmjs.com/package/@jest/create-cache-key-function) 来协助实现它。

请注意，[ECMAScript 模块](https://jestjs.io/docs/ecmascript-modules)支持由传入的 `supports*` 选项指示。具体来说 `supportsDynamicImport: true` 表示转换器可以返回 `import()` 表达式，ESM 和 CJS 都支持。如果 `supportsStaticESM: true` 表示支持顶级 `import`​​ 语句，并且代码将被解释为 ESM 而不是 CJS。有关差异的详细信息，请参阅 Node 的[文档](https://nodejs.org/api/esm.html#esm_differences_between_es_modules_and_commonjs)。

## Examples（例子）

### TypeScript with type checking（带类型检查的 TypeScript）

虽然默认情况下 `babel-jest` 会转译 TypeScript 文件，但 Babel 不会验证类型。如果你愿意，你可以使用 [ts-jest](https://github.com/kulshekhar/ts-jest)。

#### Transforming images to their path（将图像转换为他们的路径）

导入图像是将它们包含在浏览器包中的一种方式，但它们不是有效的 JavaScript。在 Jest 中处理它的一种方法是用其文件名替换导入的值。

```js
// fileTransformer.js
const path = require("path");

module.exports = {
  process(src, filename, config, options) {
    return "module.exports = " + JSON.stringify(path.basename(filename)) + ";";
  },
};
```

```js
// jest.config.js

module.exports = {
  transform: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/fileTransformer.js",
  },
};
```

[上一章-Environment Variables](/apis/EnvironmentVariables.md)
