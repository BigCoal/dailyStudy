# The Jest Object（Jest 对象）

`jest` 对象自动在每个测试文件的范围内存在。`jest` 对象中的方法有助于创建模拟并让控制 Jest 的整体行为。也可以通过 `import {jest} from '@jest/globals'` 显式导入。

## methods - 方法

- [Mock Modules](#mock-modules)
  - [`jest.disableAutomock()`](#jestdisableautomock)
  - [`jest.enableAutomock()`](#jestenableautomock)
  - [`jest.createMockFromModule(moduleName)`](#jestcreatemockfrommodulemodulename)
  - [`jest.mock(moduleName, factory?, options?)`](#jestmockmodulename-factory-options)
  - [`jest.unmock(moduleName)`](#jestunmockmodulename)
  - [`jest.doMock(moduleName, factory, options)`](#jestdomockmodulename-factory-options)
  - [`jest.dontMock(moduleName)`](#jestdontmockmodulename)
  - [`jest.setMock(moduleName, moduleExports)`](#jestsetmockmodulename-moduleexports)
  - [`jest.requireActual(moduleName)`](#jestrequireactualmodulename)
  - [`jest.requireMock(moduleName)`](#jestrequiremockmodulename)
  - [`jest.resetModules()`](#jestresetmodules)
  - [`jest.isolateModules(fn)`](#jestisolatemodulesfn)
- [Mock functions](#mock-functions)
  - [`jest.fn(implementation?)`](#jestfnimplementation)
  - [`jest.isMockFunction(fn)`](#jestismockfunctionfn)
  - [`jest.spyOn(object, methodName)`](#jestspyonobject-methodname)
  - [`jest.spyOn(object, methodName, accessType?)`](#jestspyonobject-methodname-accesstype)
  - [`jest.clearAllMocks()`](#jestclearallmocks)
  - [`jest.resetAllMocks()`](#jestresetallmocks)
  - [`jest.restoreAllMocks()`](#jestrestoreallmocks)
- [Mock timers](#mock-timers)
  - [`jest.useFakeTimers(implementation?: 'modern' | 'legacy')`](#jestusefaketimersimplementation-modern--legacy)
  - [`jest.useRealTimers()`](#jestuserealtimers)
  - [`jest.runAllTicks()`](#jestrunallticks)
  - [`jest.runAllTimers()`](#jestrunalltimers)
  - [`jest.runAllImmediates()`](#jestrunallimmediates)
  - [`jest.advanceTimersByTime(msToRun)`](#jestadvancetimersbytimemstorun)
  - [`jest.runOnlyPendingTimers()`](#jestrunonlypendingtimers)
  - [`jest.advanceTimersToNextTimer(steps)`](#jestadvancetimerstonexttimersteps)
  - [`jest.clearAllTimers()`](#jestclearalltimers)
  - [`jest.getTimerCount()`](#jestgettimercount)
  - [`jest.setSystemTime(now?: number | Date)`](#jestsetsystemtimenow-number--date)
  - [`jest.getRealSystemTime()`](#jestgetrealsystemtime)
- [Misc](#misc)
  - [`jest.setTimeout(timeout)`](#jestsettimeouttimeout)
  - [`jest.retryTimes()`](#jestretrytimes)

---

## Reference - 参考

### Mock Modules

#### `jest.disableAutomock()`

在模块加载器中禁用自动模拟。

> 更多信息请参阅 [configuration](/apis/ConfiguringJest.md) 的 `automock` 部分

调用此方法后，所有 `require()` 将返回每个模块的真实版本（而不是模拟版本）。

Jest 配置：

```json
{
  "automock": true
}
```

例子：

```javascript
// utils.js
export default {
  authorize: () => {
    return "token";
  },
};
```

```javascript
// __tests__/disableAutomocking.js
import utils from "../utils";

jest.disableAutomock();

test("original implementation", () => {
  // 现在我们有了最初的实现方法
  // 即便是我们在 Jest 中配置了自动模拟
  expect(utils.authorize()).toBe("token");
});
```

当依赖项**要模拟的数量**远小于**不模拟的数量**时，这通常很有用。例如，如果你正在编写测试模块使用了大量的依赖项，这些依赖项可以合理地归类为模块的“实现细节”，那么你可能不想模拟它们。

可能被视为“实现细节”的依赖项示例包括从语言内置方法（例如 Array.prototype）到高度通用的实用程序方法（例如下划线/lodash、数组实用程序等）和整个库（如 React.js）。

返回用于链接的 `jest` 对象。

_注意：此方法以前称为 `autoMockOff`。使用 `babel-jest` 时，对 `disableAutomock` 的调用将自动提升到代码块的顶部。如果想明确避免这种行为请使用 `autoMockOff`。_

#### `jest.enableAutomock()`

在模块加载器中启用自动模拟。

返回用于链接的 `jest` 对象。

> 更多信息请参阅 [configuration](/apis/ConfiguringJest.md) 的 `automock` 部分

例子：

```javascript
// utils.js
export default {
  authorize: () => {
    return "token";
  },
  isAuthorized: (secret) => secret === "wizard",
};
```

```javascript
// __tests__/enableAutomocking.js
jest.enableAutomock();

import utils from "../utils";

test("original implementation", () => {
  // 现在我们有了模拟的实现
  expect(utils.authorize._isMockFunction).toBeTruthy();
  expect(utils.isAuthorized._isMockFunction).toBeTruthy();
});
```

_注意：此方法以前称为 `autoMockOn`。使用 `babel-jest` 时，对 `enableAutomock` 的调用将自动提升到代码块的顶部。如果想明确避免这种行为请使用 `autoMockOn`。_

#### `jest.createMockFromModule(moduleName)`

**_在 Jest 26.0.0+ 中重命名_**

别名：`.genMockFromModule(moduleName)`

给定模块的名称，使用自动模拟系统为你生成模块的模拟版本。

当你想要创建扩展自动模拟行为的[手动模拟](https://www.jestjs.cn/docs/manual-mocks)时，这很有用。

举个例子：

```javascript
// utils.js
export default {
  authorize: () => {
    return "token";
  },
  isAuthorized: (secret) => secret === "wizard",
};
```

```javascript
// __tests__/createMockFromModule.test.js
const utils = jest.createMockFromModule("../utils").default;
utils.isAuthorized = jest.fn((secret) => secret === "not wizard");

test("implementation created by jest.createMockFromModule", () => {
  expect(utils.authorize.mock).toBeTruthy();
  expect(utils.isAuthorized("not wizard")).toEqual(true);
});
```

这是 `createMockFromModule` 模拟以下数据类型的方式：

**`Function`**

创建一个新的 [模拟函数](https://www.jestjs.cn/docs/mock-functions)，新函数没有形参，调用时将返回 `undefined`。此功能也适用于异步函数。

**`Class`**

创建一个新的类。原始类的接口被保留，所有的类成员函数和属性都将被模拟。

**`Object`**

创建一个新的深拷贝对象。对象的键被维护并且模拟它们的值。

**`Array`**

创建一个空数组，无视原有的数组。

**`Primitives`**

创建一个与原始属性具有相同值的新属性。

举个例子：

```javascript
// example.js
module.exports = {
  function: function square(a, b) {
    return a * b;
  },
  asyncFunction: async function asyncSquare(a, b) {
    const result = (await a) * b;
    return result;
  },
  class: new (class Bar {
    constructor() {
      this.array = [1, 2, 3];
    }
    foo() {}
  })(),
  object: {
    baz: "foo",
    bar: {
      fiz: 1,
      buzz: [1, 2, 3],
    },
  },
  array: [1, 2, 3],
  number: 123,
  string: "baz",
  boolean: true,
  symbol: Symbol.for("a.b.c"),
};
```

```javascript
// __tests__/example.test.js
const example = jest.createMockFromModule("./example");

test("should run example code", () => {
  // 创建一个新的模拟数组，没有正式的参数
  expect(example.function.name).toEqual("square");
  expect(example.function.length).toEqual(0);

  // 异步函数得到与标准同步函数相同的处理
  expect(example.asyncFunction.name).toEqual("asyncSquare");
  expect(example.asyncFunction.length).toEqual(0);

  // 创建一个具有相同接口的新类，成员函数和属性将被模拟。
  expect(example.class.constructor.name).toEqual("Bar");
  expect(example.class.foo.name).toEqual("foo");
  expect(example.class.array.length).toEqual(0);

  // 创建原始对象的深度克隆版本。
  expect(example.object).toEqual({
    baz: "foo",
    bar: {
      fiz: 1,
      buzz: [],
    },
  });

  // 创建一个空数组，无视原有的数组。
  expect(example.array.length).toEqual(0);

  // 创建一个与原始属性具有相同原始值的新属性。
  expect(example.number).toEqual(123);
  expect(example.string).toEqual("baz");
  expect(example.boolean).toEqual(true);
  expect(example.symbol).toEqual(Symbol.for("a.b.c"));
});
```

#### `jest.mock(moduleName, factory?, options?)`

在引用时模拟模块自动模拟版本。`factory` 和 `options` 是可选的。例如：

```javascript
// banana.js
module.exports = () => "banana";

// __tests__/test.js
jest.mock("../banana");

const banana = require("../banana"); // banana 将被明确的模拟

banana(); // 将返回 'undefined' ，因为这个函数是自动模拟的
```

第二个参数是指定正在运行的方法，而不是使用 Jest 的自动模拟功能：

```javascript
jest.mock("../moduleName", () => {
  return jest.fn(() => 42);
});

// 将调用 `jest.mock` 中的第二个方法参数
const moduleName = require("../moduleName");
moduleName(); // return '42';
```

当对默认导出的 ES6 模块使用 `factory` 参数时，需要指定 `__esModule: true` 属性。该属性一般由 Babel/TypeScript 生成，但这里需要手动设置。导入默认导出时，这是从导出对象导入名为 `default` 的属性的指令：

```javascript
import moduleName, { foo } from "../moduleName";

jest.mock("../moduleName", () => {
  return {
    __esModule: true,
    default: jest.fn(() => 42),
    foo: jest.fn(() => 43),
  };
});

moduleName(); // return 42
foo(); // return 43
```

第三个参数可用于创建虚拟模拟——系统中不存在的模块的模拟：

```javascript
jest.mock(
  "../moduleName",
  () => {
    /*
     * JS中不存在的模块的自定义实现，
     * 像 react-native 中生成的模块或原生模块。
     */
  },
  { virtual: true }
);
```

> 警告：在安装文件中导入模块（由 `setupTestFrameworkScriptFile` 指定）将防止对有问题的模块及其导入的所有模块进行模拟。

使用 `jest.mock` 模拟的模块仅针对调用 `jest.mock` 的文件进行模拟。另一个导入模块的文件将获得原始实现，即使它在模拟模块的测试文件之后运行。

返回用于链接的 `jest` 对象。

#### `jest.unmock(moduleName)`

表示模块系统不应从 `require()` 返回指定模块的模拟版本（例如，它应始终返回真实模块）。

此 API 最常见的用途是指定测试打算测试的模块（因此不想自动模拟）。

返回用于链接的 `jest` 对象。

#### `jest.doMock(moduleName, factory, options)`

使用 `babel-jest` 时，对 `mock` 的调用会自动提升到代码块的顶部。如果想明确避免这种行为，请使用此方法。

一个例子，当你想在同一个文件中以不同的方式模拟同一个模块时：

```javascript
beforeEach(() => {
  jest.resetModules();
});

test("moduleName 1", () => {
  jest.doMock("../moduleName", () => {
    return jest.fn(() => 1);
  });
  const moduleName = require("../moduleName");
  expect(moduleName()).toEqual(1);
});

test("moduleName 2", () => {
  jest.doMock("../moduleName", () => {
    return jest.fn(() => 2);
  });
  const moduleName = require("../moduleName");
  expect(moduleName()).toEqual(2);
});
```

在 ES6 导入中使用 `jest.doMock()` 需要额外的步骤。如果不想在测试中使用 `require`，请遵循以下步骤：

- 必须指定 `__esModule: true` 属性（有关更多信息，请参阅 `jest.mock()` API）。
- 静态 ES6 模块导入被提升到文件的顶部，因此必须使用 `import()` 动态导入它们。
- 最后，我们需要一个支持动态导入的环境。请参阅[使用 Babel](https://www.jestjs.cn/docs/getting-started#using-babel) 进行初始设置。然后将插件 [babel-plugin-dynamic-import-node](https://www.npmjs.com/package/babel-plugin-dynamic-import-node) 或跟它功能相同的插件添加到你的 Babel 配置中，以在 Node.js 中启用动态导入。

```javascript
beforeEach(() => {
  jest.resetModules();
});

test("moduleName 1", () => {
  jest.doMock("../moduleName", () => {
    return {
      __esModule: true,
      default: "default1",
      foo: "foo1",
    };
  });
  return import("../moduleName").then((moduleName) => {
    expect(moduleName.default).toEqual("default1");
    expect(moduleName.foo).toEqual("foo1");
  });
});

test("moduleName 2", () => {
  jest.doMock("../moduleName", () => {
    return {
      __esModule: true,
      default: "default2",
      foo: "foo2",
    };
  });
  return import("../moduleName").then((moduleName) => {
    expect(moduleName.default).toEqual("default2");
    expect(moduleName.foo).toEqual("foo2");
  });
});
```

返回用于链接的 `jest` 对象。

#### `jest.dontMock(moduleName)`

使用 `babel-jest` 时，对 `unmock` 的调用将自动提升到代码块的顶部。如果想明确避免这种行为，请使用此方法。

返回用于链接的 `jest` 对象。

#### `jest.setMock(moduleName, moduleExports)`

显式提供模块系统应为指定模块返回的模拟对象。

模块系统通常提供的自动生成的模拟有时不足以满足你的测试需求。这些情况下，你应该编写一个更适合相关内容的[手动模拟](https://www.jestjs.cn/docs/manual-mocks)。在极少数情况下，即使是手动模拟也达不成你的目的，那么你需要在测试中自己构建模拟。

在这些罕见的情况下，你可以使用此 API 手动填充模块系统的**模拟模块注册表**中的插槽。

_注意：建议使用 `jest.mock()` 代替。`jest.mock` API 的第二个参数是指定正在运行的方法，而不是使用 Jest 的自动模拟功能。_

#### `jest.requireActual(moduleName)`

返回实际模块而不是模拟模块，绕过对模块是否应该接收模拟实现的所有检查。

```javascript
jest.mock("../myModule", () => {
  // 导入的原始模块不被模拟
  const originalModule = jest.requireActual("../myModule");

  return {
    __esModule: true, // 在处理 esModules 时使用它
    ...originalModule,
    getRandom: jest.fn().mockReturnValue(10),
  };
});

const getRandom = require("../myModule").getRandom;

getRandom(); // 总是 return 10
```

#### `jest.requireMock(moduleName)`

返回一个模拟模块而不是实际模块，绕过对模块是否应该正常需要的所有检查。

#### `jest.resetModules()`

重置模块注册表 - 所有必需模块的缓存。这对于**隔离在本地测试中模块的冲突状态**很有用。

```javascript
const sum1 = require("../sum");
jest.resetModules();
const sum2 = require("../sum");
sum1 === sum2;
// > false (两个 sum 模块都是 sum 模块的单独实例)
```

在测试中的例子：

```javascript
beforeEach(() => {
  jest.resetModules();
});

test("works", () => {
  const sum = require("../sum");
});

test("works too", () => {
  const sum = require("../sum");
  // sum 是 sum 模块测试的副本不同。
});
```

返回用于链接的 `jest` 对象。

#### `jest.isolateModules(fn)`

`jest.isolateModules(fn)` 比 `jest.resetModules()` 更进一步，并为回调函数中加载的模块创建一个沙箱注册表。这对于隔离每个测试的特定模块非常有用，这样本地模块的状态就不会在测试之间发生冲突。

```javascript
let myModule;
jest.isolateModules(() => {
  myModule = require("myModule");
});

const otherCopyOfMyModule = require("myModule");
```

### Mock functions

#### `jest.fn(implementation?)`

返回一个新的、未使用的模拟函数。可选的进行模拟 `implementation`。

```javascript
const mockFn = jest.fn();
mockFn();
expect(mockFn).toHaveBeenCalled();

// 自定义模拟实现
const returnsTrue = jest.fn(() => true);
console.log(returnsTrue()); // true;
```

#### `jest.isMockFunction(fn)`

确定给定的函数是否是模拟函数。

#### `jest.spyOn(object, methodName)`

创建一个类似于 `jest.fn` 的模拟函数，但跟踪对 `object[methodName]` 的调用。返回一个 Jest 模拟函数。

_注意：默认情况下， `jest.spyOn` 也会调用 **spied** 方法。这是与其他大多数测试库不同的行为。如果要覆盖原来的函数，可以使用 `jest.spyOn(object, methodName).mockImplementation(() => customImplementation)` 或 `object[methodName] = jest.fn(() => customImplementation);`_

```javascript
const video = {
  play() {
    return true;
  },
};

module.exports = video;
```

测试例子：

```javascript
const video = require("./video");

test("plays video", () => {
  const spy = jest.spyOn(video, "play");
  const isPlaying = video.play();

  expect(spy).toHaveBeenCalled();
  expect(isPlaying).toBe(true);

  spy.mockRestore();
});
```

#### `jest.spyOn(object, methodName, accessType?)`

从 Jest 22.1.0+ 开始，`jest.spyOn` 方法接受一个可选的第三个 accessType 参数，它可以是 `get` 或 `set`，这用于分别监视 getter 或 setter。

```javascript
const video = {
  // getter!
  get play() {
    return true;
  },
};

module.exports = video;

const audio = {
  _volume: false,
  // setter!
  set volume(value) {
    this._volume = value;
  },
  get volume() {
    return this._volume;
  },
};

module.exports = audio;
```

测试例子：

```javascript
const audio = require("./audio");
const video = require("./video");

test("plays video", () => {
  const spy = jest.spyOn(video, "play", "get"); // 调用 'get'
  const isPlaying = video.play;

  expect(spy).toHaveBeenCalled();
  expect(isPlaying).toBe(true);

  spy.mockRestore();
});

test("plays audio", () => {
  const spy = jest.spyOn(audio, "volume", "set"); // 调用 'set'
  audio.volume = 100;

  expect(spy).toHaveBeenCalled();
  expect(audio.volume).toBe(100);

  spy.mockRestore();
});
```

#### `jest.clearAllMocks()`

清除所有模拟的 `mock.calls` 和 `mock.instances` 属性。相当于在每个模拟函数上调用 `.mockClear()`。

返回用于链接的 `jest` 对象。

#### `jest.resetAllMocks()`

重置所有模拟状态，相当于在每个模拟函数上调用 `.mockReset()`。

返回用于链接的 `jest` 对象。

#### `jest.restoreAllMocks()`

将所有模拟恢复到其原始值。相当于在每个模拟函数上调用 `.mockRestore()` 。请注意 `jest.restoreAllMocks()` 仅在使用 `jest.spyOn` 创建模拟时有效；其他模拟则需要手动恢复它们。

### Mock timers

#### `jest.useFakeTimers(implementation?: 'modern' | 'legacy')`

指示 Jest 使用标准计时器函数的伪造版本（ `setTimeout`、`setInterval`、`clearTimeout`、`clearInterval`、`nextTick`、`setImmediate` 和 `clearImmediate` 以及 `Date`）。

如果你将 `'legacy'` 作为参数传递，则将使用 Jest 的遗留的实现，而不是基于 [`@sinonjs/fake-timers`](https://github.com/sinonjs/fake-timers) 的实现。

返回用于链接的 `jest` 对象。

#### `jest.useRealTimers()`

指示 Jest 使用标准计时器函数的真实版本。

返回用于链接的 `jest` 对象。

#### `jest.runAllTicks()`

耗尽微任务队列（通常通过节点连接到 `process.nextTick`）。

调用此 API 时，所有通过 `process.nextTick` 排队的待处理微任务都将被执行。此外，如果这些微任务自己调度新的微任务，这些微任务将不断执行，直到队列中没有更多的微任务。

#### `jest.runAllTimers()`

耗尽宏任务队列（即所有由 `setTimeout()`、`setInterval()` 和 `setImmediate()` 队列中的任务）和微任务队列（通常通过节点连接到 `process.nextTick`）。

调用此 API 时，将执行所有未完成的宏任务和微任务。如果这些任务自己调度了新任务，那么这些任务将不断执行，直到队列中没有剩余任务为止。

这对于在测试期间同步执行 `setTimeouts` 通常很有用，以便同步某些仅在 `setTimeout()` 或 `setInterval()` 回调后才会发生的行为。更多信息，请参阅[计时器模拟](https://www.jestjs.cn/docs/timer-mocks)文档。

#### `jest.runAllImmediates()`

耗尽 `setImmediate()` 队列中的所有任务。

> 注意：此功能不可用与使用现代伪定时器的实现

#### `jest.advanceTimersByTime(msToRun)`

仅执行宏任务队列（即由 `setTimeout()` 或 `setInterval()` 和 `setImmediate()` 队列中的所有任务）。

调用此 API 时，所有计时器都会提前 `msToRun` 毫秒。所有已通过 `setTimeout()` 或 `setInterval()` 排队并在此时间范围内未完成执行的“宏任务”都将被执行。此外，如果这些宏任务在同一时间范围内执行的新宏任务，则这些宏任务将一直执行，直到队列中不再有宏任务为止，但这些都在 `msToRun` 毫秒内运行。

#### `jest.runOnlyPendingTimers()`

仅执行当前挂起的宏任务（即仅执行到目前为止已由 `setTimeout()` 或 `setInterval()` 排队的任务）。如果当前挂起的宏任务调度新的宏任务，则并不会执行这些新任务。

这对于被测试模块调用 `setTimeout()` 的场景很有用，当其回调以递归方式调用另一个 `setTimeout()`（意味着调度永不停止）。在这情况下，能够一次只向前运行一次是很有用的。

#### `jest.advanceTimersToNextTimer(steps)`

通过将所有计时器所需的时间提前，以便仅运行下一个 超时/间隔。

或者，你可以提供 `steps`，因此它将运行下一个 超时/间隔 的 `steps` 数量。

#### `jest.clearAllTimers()`

从计时器系统中删除任何已挂起的计时器。

这意味着，如果任何计时器已被调度（但尚未执行），它们将被清除并且将来永远不会执行。

#### `jest.getTimerCount()`

返回仍要运行的假计时器的数量。

#### `jest.setSystemTime(now?: number | Date)`

设置假定时器使用的当前系统时间。模拟用户在程序运行时更改系统时钟的操作。它会影响当前时间，但它本身不会导致定时器触发；将会完全按照不调用 `jest.setSystemTime()` 的方式进行触发。

> 注意：此功能仅在使用现代伪计时器实现时可用

#### `jest.getRealSystemTime()`

当模拟时间时，`Date.now()` 也会被模拟。如果你出于某种原因需要访问实时当前时间，你可以调用此方法。

> 注意：此功能仅在使用现代伪计时器实现时可用

### Misc

#### `jest.setTimeout(timeout)`

以毫秒为单位设置测试和挂钩之前/之后的默认超时间隔。这仅影响调用此方法的测试文件。

_注意：如果不调用此方法，默认超时间隔为 5 秒。_

_注意：如果你想为所有测试文件设置超时，`setupFilesAfterEnv` 是一个好方法。_

```javascript
jest.setTimeout(1000); // 1s
```

#### `jest.retryTimes()`

运行失败的测试 n 次，直到它们通过或用尽最大重试次数。这仅适用于默认的 [jest-circus](https://github.com/facebook/jest/tree/master/packages/jest-circus) 运行。

测试示例：

```javascript
jest.retryTimes(3);
test("will fail", () => {
  expect(true).toBe(false);
});
```

返回用于链接的 `jest` 对象。

[上一章-Mock Functions](/apis/MockFunctions.md)

[下一章-Configuring Jest](/apis/ConfiguringJest.md)
