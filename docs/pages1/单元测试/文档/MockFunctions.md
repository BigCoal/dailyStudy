# Mock Functions（模拟函数）

Mock Functions（模拟函数）也被称为“spies（间谍）”，因为它们让你可以监视由其他代码间接调用的函数行为，而不仅仅是测试输出。你可以使用 `jest.fn()` 创建一个模拟函数。如果未给出实现，则模拟函数在调用时将返回 `undefined`。

## methods - 方法

- [Reference - 参考](#reference---参考)
  - [`mockFn.getMockName()`](#mockfngetmockname)
  - [`mockFn.mock.calls`](#mockfnmockcalls)
  - [`mockFn.mock.results`](#mockfnmockresults)
  - [`mockFn.mock.instances`](#mockfnmockinstances)
  - [`mockFn.mockClear()`](#mockfnmockclear)
  - [`mockFn.mockReset()`](#mockfnmockreset)
  - [`mockFn.mockRestore()`](#mockfnmockrestore)
  - [`mockFn.mockImplementation(fn)`](#mockfnmockimplementationfn)
  - [`mockFn.mockImplementationOnce(fn)`](#mockfnmockimplementationoncefn)
  - [`mockFn.mockName(value)`](#mockfnmocknamevalue)
  - [`mockFn.mockReturnThis()`](#mockfnmockreturnthis)
  - [`mockFn.mockReturnValue(value)`](#mockfnmockreturnvaluevalue)
  - [`mockFn.mockReturnValueOnce(value)`](#mockfnmockreturnvalueoncevalue)
  - [`mockFn.mockResolvedValue(value)`](#mockfnmockresolvedvaluevalue)
  - [`mockFn.mockResolvedValueOnce(value)`](#mockfnmockresolvedvalueoncevalue)
  - [`mockFn.mockRejectedValue(value)`](#mockfnmockrejectedvaluevalue)
  - [`mockFn.mockRejectedValueOnce(value)`](#mockfnmockrejectedvalueoncevalue)
- [TypeScript](#typescript)
  - [`jest.MockedFunction`](#jestmockedfunction)
  - [`jest.MockedClass`](#jestmockedclass)

---

### Reference - 参考

下面的 `mockFn` 是模拟函数的名称

#### `mockFn.getMockName()`

返回通过调用 `mockFn.mockName(value)` 设置的模拟名称字符串。

#### `mockFn.mock.calls`

包含对此模拟函数进行的调用的所有回调参数的数组。数组中的每一项都是调用时传递的参数数组。

例如：一个模拟函数 `f` 被调用了两次，一次 `f('arg1', 'arg2')`，然后 `f('arg3', 'arg4')`，`mock.calls` 数组看起来像这样：

```javascript
[
  ["arg1", "arg2"],
  ["arg3", "arg4"],
];
```

#### `mockFn.mock.results`

一个包含对此模拟函数所有回调结果的数组。该数组中的每一项都是一个包含 `type` 属性和 `value` 属性的对象。`type` 将是以下之一：

- `'return'`：表示调用正常返回开完成调用。
- `'throw'`：表示调用抛出值来完成调用。
- `'incomplete'`：表示呼叫尚未完成。如果从模拟函数本身或从模拟调用的函数中测试结果，则会发生这种情况。

`value` 属性是包含 return 或者 throw 的值，如果 `type === 'incomplete'`，那么 `value` 为 undefined。

举个例子，一个模拟函数 `f` 被调用了三次，返回 `'result1'`，抛出一个错误然后返回 `'result2'`，`mock.results` 数组看起来像这样：

```javascript
[
  {
    type: "return",
    value: "result1",
  },
  {
    type: "throw",
    value: {
      /* 错误内容 */
    },
  },
  {
    type: "return",
    value: "result2",
  },
];
```

#### `mockFn.mock.instances`

一个数组包含使用 `new` 从此模拟函数实例化的所有对象实例。

举个例子，一个模拟函数已经被实例化两次，那么 `mock.instances` 看起来像这样：

```javascript
const mockFn = jest.fn();

const a = new mockFn();
const b = new mockFn();

mockFn.mock.instances[0] === a; // true
mockFn.mock.instances[1] === b; // true
```

#### `mockFn.mockClear()`

重置所有存储在 `mockFn.mock.calls` 和 `mockFn.mock.instances` 数组中的信息。

当想要清理两个断言之间的模拟数据时，这通常很有用。

请注意，`mockClear` 将取代 `mockFn.mock`，而不仅仅是 `mockFn.mock.calls` 和 `mockFn.mock.instances`。所以无论是不是临时分配，模拟函数应该避免将 `mockFn.mock` 分配给其他变量。以确保模拟函数不会访问过时的数据。

[`clearMocks`](/apis/ConfiguringJest.md) 配置选项可用于在测试之间自动清除模拟。

#### `mockFn.mockReset()`

执行 `mockFn.mockClear()` 的所有方法，并删除所有模拟的返回值或实现。

当你想将模拟完全重置回初始状态时，这很有用。（注意：重置 spy 将导致函数没有返回值）。

请注意，`mockReset` 将取代 `mockFn.mock`，而不仅仅是 `mockFn.mock.calls` 和 `mockFn.mock.instances`。所以无论是不是临时分配，模拟函数应该避免将 `mockFn.mock` 分配给其他变量。以确保模拟函数不会访问过时的数据。

#### `mockFn.mockRestore()`

执行 `mockFn.mockRestore()` 的所有方法，并恢复了所有原始实现（非模拟的）。

当你想在使用模拟函数在某些测试用例中，并在其他测试用例中恢复原始实现时，这很有用。

请注意，`mockFn.mockRestore` 仅在使用 `jest.spyOn` 创建模拟时才有效。因此，你必须在手动分配 `jest.fn()` 时自行处理恢复。

[`restoreMocks`](/apis/ConfiguringJest.md) 配置选项可用于在测试之间自动恢复模拟。

#### `mockFn.mockImplementation(fn)`

接受一个应用用作模拟实现的函数。模拟本身仍然会记录所有进入的调用和来自自身的实例——唯一的区别是调用模拟时也会执行实现。

_注意： `jest.fn(implementation)` 是 `jest.fn().mockImplementation(implementation)` 的简写。_

```javascript
const mockFn = jest.fn().mockImplementation((scalar) => 42 + scalar);
// or: jest.fn(scalar => 42 + scalar);

const a = mockFn(0);
const b = mockFn(1);

a === 42; // true
b === 43; // true

mockFn.mock.calls[0][0] === 0; // true
mockFn.mock.calls[1][0] === 1; // true
```

`mockImplementation` 也可用于模拟类构造函数：

```javascript
// SomeClass.js
module.exports = class SomeClass {
  m(a, b) {}
};

// OtherModule.test.js
jest.mock("./SomeClass"); // 这会通过 automocking 自动发生
const SomeClass = require("./SomeClass");
const mMock = jest.fn();
SomeClass.mockImplementation(() => {
  return {
    m: mMock,
  };
});

const some = new SomeClass();
some.m("a", "b");
console.log("Calls to m: ", mMock.mock.calls);
```

#### `mockFn.mockImplementationOnce(fn)`

接受一个函数，该函数将用作对模拟函数的一次调用的实现。可以进行链接，以便函数连续调用产生不同的结果。

```javascript
const myMockFn = jest
  .fn()
  .mockImplementationOnce((cb) => cb(null, true))
  .mockImplementationOnce((cb) => cb(null, false));

myMockFn((err, val) => console.log(val)); // true

myMockFn((err, val) => console.log(val)); // false
```

当模拟函数用完用 `mockImplementationOnce` 定义的实现时，如果调用 `jest.fn(() => defaultValue)` 或 `.mockImplementation(() => defaultValue)`，它将执行默认实现：

```javascript
const myMockFn = jest
  .fn(() => "default")
  .mockImplementationOnce(() => "first call")
  .mockImplementationOnce(() => "second call");

// 'first call', 'second call', 'default', 'default'
console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
```

#### `mockFn.mockName(value)`

在测试结果中使用字符串代替 `jest.fn()` 以指示引用的模拟函数。

```javascript
const mockFn = jest.fn().mockName("mockedFunction");
// mockFn();
expect(mockFn).toHaveBeenCalled();
```

会导致这个错误：

```zsh
expect(mockedFunction).toHaveBeenCalled()

Expected mock function "mockedFunction" to have been called, but it was not called.
```

#### `mockFn.mockReturnThis()`

语法糖函数：

```javascript
jest.fn(function () {
  return this;
});
```

#### `mockFn.mockReturnValue(value)`

接受一个在调用模拟函数时返回的值。

```javascript
const mock = jest.fn();
mock.mockReturnValue(42);
mock(); // 42
mock.mockReturnValue(43);
mock(); // 43
```

#### `mockFn.mockReturnValueOnce(value)`

接受在一次调用模拟函数时返回的值。可以进行链接，以便对模拟函数连续调用返回不同的值。当没有更多的 `mockReturnValueOnce` 值可以使用时，调用将返回一个由 `mockReturnValue` 指定的值。

```javascript
const myMockFn = jest
  .fn()
  .mockReturnValue("default")
  .mockReturnValueOnce("first call")
  .mockReturnValueOnce("second call");

// 'first call', 'second call', 'default', 'default'
console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
```

#### `mockFn.mockResolvedValue(value)`

语法糖函数：

```javascript
jest.fn().mockImplementation(() => Promise.resolve(value));
```

在异步测试中模拟异步函数很有用：

```javascript
test("async test", async () => {
  const asyncMock = jest.fn().mockResolvedValue(43);

  await asyncMock(); // 43
});
```

#### `mockFn.mockResolvedValueOnce(value)`

语法糖函数：

```javascript
jest.fn().mockImplementationOnce(() => Promise.resolve(value));
```

解决多个异步调用的不同值：

```javascript
test("async test", async () => {
  const asyncMock = jest
    .fn()
    .mockResolvedValue("default")
    .mockResolvedValueOnce("first call")
    .mockResolvedValueOnce("second call");

  await asyncMock(); // first call
  await asyncMock(); // second call
  await asyncMock(); // default
  await asyncMock(); // default
});
```

#### `mockFn.mockRejectedValue(value)`

语法糖函数：

```javascript
jest.fn().mockImplementation(() => Promise.reject(value));
```

用于创建状态永远是 `reject` 的异步函数：

```javascript
test("async test", async () => {
  const asyncMock = jest.fn().mockRejectedValue(new Error("Async error"));

  await asyncMock(); // throws "Async error"
});
```

#### `mockFn.mockRejectedValueOnce(value)`

语法糖函数：

```javascript
jest.fn().mockImplementationOnce(() => Promise.reject(value));
```

```javascript
test("async test", async () => {
  const asyncMock = jest
    .fn()
    .mockResolvedValueOnce("first call")
    .mockRejectedValueOnce(new Error("Async error"));

  await asyncMock(); // first call
  await asyncMock(); // throws "Async error"
});
```

### TypeScript

Jest 本身就是用 [TypeScript](https://www.typescriptlang.org/) 编写的。

如果你使用 [Create React App](https://create-react-app.dev/)，那么 [TypeScript 模板](https://create-react-app.dev/docs/adding-typescript/) 拥有你开始在 TypeScript 中编写测试所需的一切内容。

否则，请参阅我们的[入门指南](https://www.jestjs.cn/docs/getting-started#using-typescript)以使用 TypeScript 进行设置。

你可以在我们的 [GitHub](https://github.com/facebook/jest/tree/master/examples/typescript) 中查看 Jest 与 TypeScript 结合使用的示例。

#### `jest.MockedFunction`

> `jest.MockedFunction` 在 `@types/jest` 的 `24.9.0` 版本中可用。

阅读以下例子前建议先阅读 [Jest 的模拟函数在 JavaScript 中的使用](https://www.jestjs.cn/docs/mock-functions)。

你可以使用 `jest.MockedFunction` 表示已被 Jest 模拟替换的函数。

使用 [`automatic（自动）jest.mock`](/apis/TheJestObject.md) 的示例：

```typescript
// 假设 `add` 被导入并在 `calculate` 中使用
import add from "./add";
import calculate from "./calc";

jest.mock("./add");

// 对 `add` 的模拟已经完全导入
const mockAdd = add as jest.MockedFunction<typeof add>;

test("calculate calls add", () => {
  calculate("Add", 1, 2);

  expect(mockAdd).toBeCalledTimes(1);
  expect(mockAdd).toBeCalledWith(1, 2);
});
```

使用 [`jest.fn`](https://www.jestjs.cn/docs/jest-object#jestfnimplementation) 的例子：

```typescript
// 这里的 `add` 是作为其类型导入的
import add from "./add";
import calculate from "./calc";

test("calculate calls add", () => {
  // 创建一个新的模拟来替换 `add`
  const mockAdd = jest.fn() as jest.MockedFunction<typeof add>;

  // 你也可以像这样直接使用 `jest.fn`：
  // const mockAdd = jest.fn<ReturnType<typeof add>, Parameters<typeof add>>();
  // `jest.MockedFunction` 是更友好的使用方式

  // 现在我们可以轻松的设置模拟的实现
  // 所有的 `.mock*` API 现在都可以提供正确的 `add`
  // https://jestjs.io/docs/mock-function-api

  // `.mockImplementation` 现在可以推算 `a` 和 `b` 是 `number`
  // 并且返回值也是一个 `number`.
  mockAdd.mockImplementation((a, b) => {
    // 这个模拟虽然添加两个数字但是想象一下我们在模拟一个复杂函数
    return a + b;
  });

  // `mockAdd` 类型正确，所以接受任何被 `add` 的内容
  calculate(mockAdd, 1, 2);

  expect(mockAdd).toBeCalledTimes(1);
  expect(mockAdd).toBeCalledWith(1, 2);
});
```

#### `jest.MockedClass`

> `jest.MockedClass` 在 `@types/jest` 的 `24.9.0` 版本中可用。

阅读以下示例前建议先阅读 [Jest 模拟类如何与 JavaScript 协同工作](https://www.jestjs.cn/docs/es6-class-mocks)

你可以使用 `jest.MockedClass` 来表示已被 Jest 模拟替换的类。

转换 [ES6 类自动模拟示例](https://www.jestjs.cn/docs/es6-class-mocks#automatic-mock)如下所示：

```typescript
import SoundPlayer from "../sound-player";
import SoundPlayerConsumer from "../sound-player-consumer";

jest.mock("../sound-player"); // SoundPlayer 现在是一个构造函数

const SoundPlayerMock = SoundPlayer as jest.MockedClass<typeof SoundPlayer>;

beforeEach(() => {
  // 清除所有实例和对构造函数方法的调用：
  SoundPlayerMock.mockClear();
});

// 检查是否使用了构造函数
it("We can check if the consumer called the class constructor", () => {
  const soundPlayerConsumer = new SoundPlayerConsumer();
  expect(SoundPlayerMock).toHaveBeenCalledTimes(1);
});

// 检查是否调用了类实例方法
it("We can check if the consumer called a method on the class instance", () => {
  // mockClear() 正常工作：
  expect(SoundPlayerMock).not.toHaveBeenCalled();

  const soundPlayerConsumer = new SoundPlayerConsumer();
  // 构造函数应该被再次调用：
  expect(SoundPlayerMock).toHaveBeenCalledTimes(1);

  const coolSoundFileName = "song.mp3";
  soundPlayerConsumer.playSomethingCool();

  // mock.instances 可用于自动模拟：
  const mockSoundPlayerInstance = SoundPlayerMock.mock.instances[0];

  // 然而它不允许在 TypeScript 中使用 `.mock`，因为正在返回 `SoundPlayer`,
  // 相反，你可以检查一个像这样完全类型化的方法：
  expect(SoundPlayerMock.prototype.playSoundFile.mock.calls[0][0]).toEqual(
    coolSoundFileName
  );

  // 跟上面的检查相等：
  expect(SoundPlayerMock.prototype.playSoundFile).toHaveBeenCalledWith(
    coolSoundFileName
  );
  expect(SoundPlayerMock.prototype.playSoundFile).toHaveBeenCalledTimes(1);
});
```

[上一章-Expect](/apis/Expect.md)

[下一章-The Jest Object](/apis/TheJestObject.md)
