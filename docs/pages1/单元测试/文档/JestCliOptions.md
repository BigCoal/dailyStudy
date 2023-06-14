# Jest CLI Options（Jest 命令行选项）

`jest` 命令行运行程序有许多有用的选项。你可以运行 `jest --help` 来查看所有可用选项。下面显示的许多选项也可以一起使用，以完全按照你想要的方式运行测试。 Jest 的每一个[配置选项](/apis/ConfiguringJest.md)也可以通过 CLI 指定。

以下是简要概述：

## Running from the command line（命令行运行）

运行测试（默认）：

```zsh
jest
```

仅运行指定模式或文件的测试：

```zsh
jest my-test #或者
jest path/to/my-test.js
```

基于 hg/git（未提交的文件）运行与更改文件相关的测试：

```zsh
jest -o
```

运行与 `path/to/fileA.js` 文件和 `path/to/fileB.js` 文件相关的测试：

```zsh
jest --findRelatedTests path/to/fileA.js path/to/fileB.js
```

运行与此规范名称匹配的测试（基本上与 `describe` 或 `test` 中的名称匹配）。

```zsh
jest -t name-of-spec
```

运行监视模式：

```zsh
jest --watch #默认运行 run jest -o
jest --watchAll #运行所有测试
```

监视模式还允许指定文件的名称或路径，以集中于一组特定的测试。

## Using with yarn（使用 yarn）

如果你通过 `yarn test` 运行 Jest，你可以将命令行参数直接作为 Jest 参数传递。

例如：

```zsh
jest -u -t="ColorPicker"
```

可以使用以下方法代替：

```zsh
yarn test -u -t="ColorPicker"
```

## Using with npm scripts（与 npm 脚本一起使用）

如果你通过 `npm test` 运行 Jest，你仍然可以通过在 `npm test` 和 Jest 参数之间插入 `--` 来使用命令行参数。

例如：

```zsh
jest -u -t="ColorPicker"
```

可以使用以下方法代替：

```zsh
npm test -- -u -t="ColorPicker"
```

## Camelcase & dashed args support（驼峰和虚线写法）

Jest 支持驼峰格式和虚线 arg 格式。以下示例结果相同：

```zsh
jest --collect-coverage
jest --collectCoverage
```

参数也可以混合使用：

```zsh
jest --update-snapshot --detectOpenHandles
```

## Options（选项）

_注意：CLI 选项优先于[配置](/apis/ConfiguringJest.md)中的值。_

- [`jest <regexForTestFiles>`](#jest-regexfortestfiles)
- [`--bail`](#--bail)
- [`--cache`](#--cache)
- [`--changedFilesWithAncestor`](#--changedfileswithancestor)
- [`--changedSince`](#--changedsince)
- [`--ci`](#--ci)
- [`--clearCache`](#--clearcache)
- [`--collectCoverageFrom=<glob>`](#--collectcoveragefromglob)
- [`--colors`](#--colors)
- [`--config=<path>`](#--configpath)
- [`--coverage[=<boolean>]`](#--coverageboolean)
- [`--coverageProvider=<provider>`](#--coverageproviderprovider)
- [`--debug`](#--debug)
- [`--detectOpenHandles`](#--detectopenhandles)
- [`--env=<environment>`](#--envenvironment)
- [`--errorOnDeprecated`](#--errorondeprecated)
- [`--expand`](#--expand)
- [`--filter=<file>`](#--filterfile)
- [`--findRelatedTests <spaceSeparatedListOfSourceFiles>`](#--findrelatedtests-spaceseparatedlistofsourcefiles)
- [`--forceExit`](#--forceexit)
- [`--help`](#--help)
- [`--init`](#--init)
- [`--injectGlobals`](#--injectglobals)
- [`--json`](#--json)
- [`--outputFile=<filename>`](#--outputfilefilename)
- [`--lastCommit`](#--lastcommit)
- [`--listTests`](#--listtests)
- [`--maxConcurrency=<num>`](#--maxconcurrencynum)
- [`--maxWorkers=<num>|<string>`](#--maxworkersnumstring)
- [`--noStackTrace`](#--nostacktrace)
- [`--notify`](#--notify)
- [`--onlyChanged`](#--onlychanged)
- [`--passWithNoTests`](#--passwithnotests)
- [`--projects <path1> ... <pathN>`](#--projects-path1--pathn)
- [`--reporters`](#--reporters)
- [`--roots`](#--roots)
- [`--runInBand`](#--runinband)
- [`--selectProjects <project1> ... <projectN>`](#--selectprojects-project1--projectn)
- [`--runTestsByPath`](#--runtestsbypath)
- [`--setupTestFrameworkScriptFile=<file>`](#--setuptestframeworkscriptfilefile)
- [`--showConfig`](#--showconfig)
- [`--silent`](#--silent)
- [`--testNamePattern=<regex>`](#--testnamepatternregex)
- [`--testLocationInResults`](#--testlocationinresults)
- [`--testPathPattern=<regex>`](#--testpathpatternregex)
- [`--testPathIgnorePatterns=<regex>|[array]`](#--testpathignorepatternsregexarray)
- [`--testRunner=<path>`](#--testrunnerpath)
- [`--testSequencer=<path>`](#--testsequencerpath)
- [`--testTimeout=<number>`](#--testtimeoutnumber)
- [`--updateSnapshot`](#--updatesnapshot)
- [`--useStderr`](#--usestderr)
- [`--verbose`](#--verbose)
- [`--version`](#--version)
- [`--watch`](#--watch)
- [`--watchAll`](#--watchall)
- [`--watchman`](#--watchman)

---

## Reference（参考）

### `jest <regexForTestFiles>`

当你使用一个参数运行 `jest` 时，该参数将被视为正则表达式以匹配项目中的文件。可以通过提供模式来运行测试套件。只有模式匹配的文件才会被选取并执行。根据你的终端，你可能需要引用此参数：`jest "my.*(complex)?pattern"`。在 Windows 上，你需要使用 `/` 作为路径分隔符或将 `\` 转义为 `\\`。

### `--bail`

别名：`-b`。

在出现 `n` 个失败的测试套件时立即退出测试套件。默认为 `1`。

### `--cache`

是否使用缓存。默认为 true。使用 `--no-cache` 禁用缓存。注意：只有在遇到缓存相关问题时才应禁用缓存。一般来说，禁用缓存会使 Jest 至少慢两倍。

如果要检查缓存，请使用 `--showConfig` 并查看 `cacheDirectory` 值。如果需要清除缓存，请使用 `--clearCache`。

### `--changedFilesWithAncestor`

运行与当前更改和上次提交中所做更改相关的测试。行为类似于 `--onlyChanged`。

### `--changedSince`

运行提供的分支或提交散列的更改相关的测试。如果当前分支与给定分支有分歧，则只会测试本地所做的更改。行为类似于 `--onlyChanged`。

### `--ci`

提供此选项时，Jest 将假定它在 CI 环境中运行。这会在遇到新快照时更改行为。与自动存储新快照的常规行为不同，它会使测试失败并需要使用 `--updateSnapshot` 运行 Jest。

### `--clearCache`

删除 Jest 缓存目录，然后退出而不运行测试。如果该选项运行通过，将删除 `cacheDirectory（缓存目录）` 或 Jest 的默认缓存目录。默认缓存目录可以通过调用 `jest --showConfig` 找到。注意：清除缓存会降低性能。

### `--collectCoverageFrom=<glob>`

相对于 `rootDir` 的 glob 模式，匹配需要从中收集覆盖率信息的文件。

### `--colors`

强制测试结果输出高亮显示，即使标准输出不是 [TTY](https://baike.baidu.com/item/TTY)。

### `--config=<path>`

别名：`-c`。

指定查找和执行测试的配置文件的路径的规则。如果在配置中没有设置 `rootDir`，那么会假定包含配置文件的目录是项目的 `rootDir` 目录（根目录）。这也可以是 json 编码的值，Jest 将使用它作为配置。

### `--coverage[=<boolean>]`

别名：`--collectCoverage`

指示应该输出测试覆盖率信息的收集和报告。可选地传递 `<boolean>` 以覆盖配置中设置的选项。

### `--coverageProvider=<provider>`

指示应使用哪个提供程序来检测代码。允许的值为 `babel`（默认）或 `v8`。

请注意，`v8` 是实验性的。这使用了 V8 而不是基于 Babel 的代码覆盖率。它没有经过很好的测试，在 Node.js 的最后几个版本中也得到了改进。使用最新版本的 node（原文编写时为 v14）效果会更好。

### `--debug`

打印有关 Jest 配置的调试信息。

### `--detectOpenHandles`

试图收集和打印打开的句柄，以防止 Jest 干净地退出。在你需要使用 `--forceExit` 以便 Jest 退出以潜在地追踪原因的情况下使用此选项。这意味着 `--runInBand`，使测试连续运行。使用 [async_hooks](https://nodejs.org/api/async_hooks.html) 实现。此选项具有显着的性能损失，应仅用于调试。

### `--env=<environment>`

用于所有测试的测试环境。这可以指向任何文件或节点模块。示例：`jsdom`、`node` 或 `path/to/my-environment.js`。

### `--errorOnDeprecated`

使调用已弃用的 API 抛出有用的错误消息。有助于简化升级过程。

### `--expand`

别名：`-e`

使用此标志来显示完整的差异和错误而不是补丁。

### `--filter=<file>`

导出过滤功能的模块的路径。此方法接收一个测试列表，可以操纵从运行中排除测试。当与测试基础设施结合使用以用来过滤已知损坏时特别有用。

### `--findRelatedTests <spaceSeparatedListOfSourceFiles>`

查找并运行包含作为参数传入的以空格分隔的源文件列表的测试。对于预提交钩子集成以运行最少数量的必要测试很有用。可以与 `--coverage` 一起使用以包含源文件的测试覆盖率，不需要重复的 `--collectCoverageFrom` 参数。

### `--forceExit`

在所有测试完成运行后强制 Jest 退出。当测试代码设置的资源无法充分清理时这很有用。

_注意：此功能是一个逃生舱。如果 Jest 在测试运行结束时没有退出，则意味着你的代码中仍在使用外部资源或计时器仍在等待中。建议在每次测试后拆除外部资源，以确保 Jest 可以干净地关闭。你可以使用 `--detectOpenHandles` 来帮助追踪它。_

### `--help`

显示帮助信息。

### `--init`

生成基本配置文件。根据的项目，Jest 会问几个问题，这些问题将有助于生成 `jest.config.js` 文件，其中包含每个选项的简短描述。

### `--injectGlobals`

将 Jest 的全局变量（`expect`、`test`、`describe`、`beforeEach` 等）插入到全局环境中。如果将此设置为 `false`，则应从 `@jest/globals` 导入，例如：

```js
import { expect, jest, test } from "@jest/globals";

jest.useFakeTimers();

test("some test", () => {
  expect(Date.now()).toBe(0);
});
```

_注意：此选项仅支持使用默认的 `jest-circus` 测试运行程序。_

### `--json`

以 JSON 格式打印测试结果。此模式会将所有其他测试输出和用户消息发送到 [stderr](https://baike.baidu.com/item/stderr/8046227)。

### `--outputFile=<filename>`

当还指定了 `--json` 选项时，将测试结果写入文件。返回的 JSON 结构记录在 [testResultsProcessor](https://github.com/superPufferfish/JEST-API-Chinese/blob/main/apis/ConfiguringJest.md#testresultsprocessor-string) 中。

### `--lastCommit`

运行上次提交中受文件更改影响的所有测试。行为类似于 `--onlyChanged`。

### `--listTests`

将所有测试列为 JSON，在给定参数的情况下 Jest 将运行这些测试，然后退出。这可以与 `--findRelatedTests` 一起使用来知道 Jest 将运行哪些测试。

### `--maxConcurrency=<num>`

防止 Jest 同时执行超过指定数量的测试。只影响使用 `test.concurrent` 的测试。

### `--maxWorkers=<num>|<string>`

别名：`-w`

指定工作池将为运行测试生成的最大工作线程数。在单次运行模式下，这默认占用你一个机器上可用内核的一个主线程。在监视模式下，这默认占用你机器上可用内核的一半，以确保 Jest 不引人注目并且不会使你的机器停止运行。在 CI 等资源有限的环境中进行调整可能很有用，但对于大多数情况来说，默认值应该足够了。

对于具有可变 CPU 可用的环境，可以使用基于百分比的配置：`--maxWorkers=50%`

### `--noStackTrace`

在测试结果输出中禁用堆栈跟踪。

### `--notify`

激活测试结果通知。当你不希望自己专注于 JavaScript 测试之外的事情时，这很有用。

### `--onlyChanged`

别名：`-o`

尝试根据当前存储库中已更改的文件来确定要运行的测试。仅当你目前在 git/hg 存储库中运行测试并且需要静态依赖关系图（即没有动态需要）时才有效。

### `--passWithNoTests`

当没有找到文件时，允许测试通过。

### `--projects <path1> ... <pathN>`

从一个或多个在指定路径中找到的项目运行测试；也采路径 globs。此选项是项目[配置选项](https://github.com/superPufferfish/JEST-API-Chinese/blob/main/apis/ConfiguringJest.md#projects-arraystring--projectconfig)的 CLI 等效项。请注意，如果在指定路径中找到配置文件，则将运行这些配置文件中指定的 _所有项目_。

### `--reporters`

使用指定的报告器运行测试。无法通过 CLI 使用[报告器选项](https://github.com/superPufferfish/JEST-API-Chinese/blob/main/apis/ConfiguringJest.md#reporters-arraymodulename--modulename-options)。

多个报告器的例子：

```zsh
jest --reporters="default" --reporters="jest-junit"
```

### `--roots`

Jest 用来搜索文件的目录路径列表。

### `--runInBand`

别名：`-i`

在当前进程中连续运行所有测试，而不是创建运行测试的子进程的工作池。这对于调试很有用。

### `--selectProjects <project1> ... <projectN>`

仅运行指定项目的测试。 Jest 在配置中使用属性 `displayName` 来标识每个项目。如果使用此选项，则应为所有项目提供一个 `displayName`。

### `--runTestsByPath`

仅运行以其确切路径指定的测试。

_注意：默认的正则表达式匹配在小规模运行中工作正常，但如果提供多个模式或针对大量测试则会变慢。此选项替换正则表达式匹配逻辑，从而优化 `Jest` 过滤特定测试文件所需的时间_

### `--setupTestFrameworkScriptFile=<file>`

在每次测试之前运行一些代码以配置或设置测试框架的模块的路径。请注意，在测试期间不会模拟由安装脚本导入的文件。

### `--showConfig`

打印你的 Jest 配置，然后退出。

### `--silent`

阻止测试通过控制台打印消息。

### `--testNamePattern=<regex>`

别名：`-t`

仅运行名称与正则表达式匹配的测试。例如，假设你只想运行与授权相关的测试，其名称类似于 `"GET /api/posts with auth"`，那么你可以使用 `jest -t=auth`。

_注意：正则表达式与全名匹配，全名是测试名称及其周围所有描述块的组合。_

### `--testLocationInResults`

向测试结果添加 `location` 字段。如果你想在报告器中报告测试的位置，则很有用。

请注意，`column` 是 0 索引的，而 `line` 不是。

```js
{
  "column": 4,
  "line": 5
}
```

### `--testPathPattern=<regex>`

在执行测试之前与所有测试路径匹配的正则字符串。在 Windows 上，你需要使用 `/` 作为路径分隔符或将 `\` 转义为 `\\`。

### `--testPathIgnorePatterns=<regex>|[array]`

在执行测试之前针对所有测试路径测试的单个或一组正则表达式模式字符串。与 `--testPathPattern` 相反，它只会运行那些路径与提供的正则表达式不匹配的测试。

要作为数组传递，请使用转义括号和空格分隔的正则表达式，例如 `\(/node_modules/ /tests/e2e/\)`。或者，你可以通过将正则表达式组合成单个正则表达式（如 `/node_modules/|/tests/e2e/`）来省略括号。这两个例子是等价的。

### `--testRunner=<path>`

允许你指定自定义测试运行程序。

### `--testSequencer=<path>`

允许你指定自定义测试定序器。具体请参考对应配置属性的文档。

### `--testTimeout=<number>`

测试的默认超时（以毫秒为单位）。默认值：5000。

### `--updateSnapshot`

别名：`-u`

使用此标志重新记录在此测试运行期间失败的每个快照。可以与测试套件模式或 `--testNamePattern` 一起使用以重新记录快照。

### `--useStderr`

将所有输出转移到 stderr。

### `--verbose`

使用测试套件层次结构显示单个测试结果。

### `--version`

别名：`-v`。打印版本并退出。

### `--watch`

监视文件的更改并重新运行与更改文件相关的测试。如果要在文件更改时重新运行所有测试，请改用 `--watchAll` 选项。

### `--watchAll`

观察文件的变化并在发生变化时重新运行所有测试。如果你只想重新运行依赖于已更改文件的测试，请使用 `--watch` 选项。

### `--watchman`

是否使用 [`watchman`](https://facebook.github.io/watchman/) 进行文件抓取。默认为 `true`。使用 `--no-watchman` 禁用。

[上一章-Configuring Jest](/apis/ConfiguringJest.md)

[下一章-Environment Variables](/apis/EnvironmentVariables.md)
