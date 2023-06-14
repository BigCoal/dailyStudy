# Expect（预期）

在编写测试时，你经常需要检查值是否满足特定条件。`expect` 让你可以访问许多“matchers（匹配器）”，让你验证不同的东西。

对于 Jest 社区维护的其他 Jest 匹配器，请查看[Jest-extended](https://github.com/jest-community/jest-extended)

## methods - 方法

- [`expect(value)`](#expectvalue)
- [`expect.extend(matchers)`](#expectextendmatchers)
- [`expect.anything()`](#expectanything)
- [`expect.any(constructor)`](#expectanyconstructor)
- [`expect.arrayContaining(array)`](#expectarraycontainingarray)
- [`expect.assertions(number)`](#expectassertionsnumber)
- [`expect.hasAssertions()`](#expecthasassertions)
- [`expect.not.arrayContaining(array)`](#expectnotarraycontainingarray)
- [`expect.not.objectContaining(object)`](#expectnotobjectcontainingobject)
- [`expect.not.stringContaining(string)`](#expectnotstringcontainingstring)
- [`expect.not.stringMatching(string | regexp)`](#expectnotstringmatchingstring--regexp)
- [`expect.objectContaining(object)`](#expectobjectcontainingobject)
- [`expect.stringContaining(string)`](#expectstringcontainingstring)
- [`expect.stringMatching(string | regexp)`](#expectstringmatchingstring--regexp)
- [`expect.addSnapshotSerializer(serializer)`](#expectaddsnapshotserializerserializer)
- [`.not`](#not)
- [`.resolves`](#resolves)
- [`.rejects`](#rejects)
- [`.toBe(value)`](#tobevalue)
- [`.toHaveBeenCalled()`](#tohavebeencalled)
- [`.toHaveBeenCalledTimes(number)`](#tohavebeencalledtimesnumber)
- [`.toHaveBeenCalledWith(arg1, arg2, ...)`](#tohavebeencalledwitharg1-arg2-)
- [`.toHaveBeenLastCalledWith(arg1, arg2, ...)`](#tohavebeenlastcalledwitharg1-arg2-)
- [`.toHaveBeenNthCalledWith(nthCall, arg1, arg2, ....)`](#tohavebeennthcalledwithnthcall-arg1-arg2-)
- [`.toHaveReturned()`](#tohavereturned)
- [`.toHaveReturnedTimes(number)`](#tohavereturnedtimesnumber)
- [`.toHaveReturnedWith(value)`](#tohavereturnedwithvalue)
- [`.toHaveLastReturnedWith(value)`](#tohavelastreturnedwithvalue)
- [`.toHaveNthReturnedWith(nthCall, value)`](#tohaventhreturnedwithnthcall-value)
- [`.toHaveLength(number)`](#tohavelengthnumber)
- [`.toHaveProperty(keyPath, value?)`](#tohavepropertykeypath-value)
- [`.toBeCloseTo(number, numDigits?)`](#tobeclosetonumber-numdigits)
- [`.toBeDefined()`](#tobedefined)
- [`.toBeFalsy()`](#tobefalsy)
- [`.toBeGreaterThan(number | bigint)`](#tobegreaterthannumber--bigint)
- [`.toBeGreaterThanOrEqual(number | bigint)`](#tobegreaterthanorequalnumber--bigint)
- [`.toBeLessThan(number | bigint)`](#tobelessthannumber--bigint)
- [`.toBeLessThanOrEqual(number | bigint)`](#tobelessthanorequalnumber--bigint)
- [`.toBeInstanceOf(Class)`](#tobeinstanceofclass)
- [`.toBeNull()`](#tobenull)
- [`.toBeTruthy()`](#tobetruthy)
- [`.toBeUndefined()`](#tobeundefined)
- [`.toBeNaN()`](#tobenan)
- [`.toContain(item)`](#tocontainitem)
- [`.toContainEqual(item)`](#tocontainequalitem)
- [`.toEqual(value)`](#toequalvalue)
- [`.toMatch(regexp | string)`](#tomatchregexp--string)
- [`.toMatchObject(object)`](#tomatchobjectobject)
- [`.toMatchSnapshot(propertyMatchers?, hint?)`](#tomatchsnapshotpropertymatchers-hint)
- [`.toMatchInlineSnapshot(propertyMatchers?, inlineSnapshot)`](#tomatchinlinesnapshotpropertymatchers-inlinesnapshot)
- [`.toStrictEqual(value)`](#tostrictequalvalue)
- [`.toThrow(error?)`](#tothrowerror)
- [`.toThrowErrorMatchingSnapshot(hint?)`](#tothrowerrormatchingsnapshothint)
- [`.toThrowErrorMatchingInlineSnapshot(inlineSnapshot)`](#tothrowerrormatchinginlinesnapshotinlinesnapshot)

---

## Reference - 参考

### `expect(value)`

每次你想测试一个值时都会使用 `expect` 函数。你很少会单独调用 `expect` 。相反，你将使用 `expect` 和“matcher（匹配器）”函数来断言某个值。

举个例子更容易理解。假设你有一个方法 `bestLaCroixFlavor()`，它应该返回字符串 `"grapefruit"`。以下是测试的方法：

```javascript
test("the best flavor is grapefruit", () => {
  expect(bestLaCroixFlavor()).toBe("grapefruit");
});
```

在这个例子中，`toBe` 是匹配器函数，有许多不同的匹配器函数，以帮助你测试不同的东西。

`expect` 的参数是你的代码产生的值，并且匹配器的任何参数都应该是正确的值。如果你把它们混在一起，虽然测试仍可以工作，但是测试失败的错误消息看起来会很奇怪。

### `expect.extend(matchers)`

你可以使用 `expect.extend` 将你自己的匹配器添加到 Jest。例如，假设正在测试一个数字实用程序库，并且你经常断言数字出现在其他数字的特定范围内。你可以将其抽象为 `toBeWithinRange` 匹配器：

```javascript
expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
});

test("numeric ranges", () => {
  expect(100).toBeWithinRange(90, 110);
  expect(101).not.toBeWithinRange(0, 100);
  expect({ apples: 6, bananas: 3 }).toEqual({
    apples: expect.toBeWithinRange(1, 10),
    bananas: expect.not.toBeWithinRange(11, 20),
  });
});
```

_注意_：在 TypeScript 中，例如使用 `@types/jest` 时，你可以像这样在导入的模块中声明新的 `toBeWithinRange` 匹配器：

```typescript
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeWithinRange(a: number, b: number): R;
    }
  }
}
```

**_Async Matchers（异步匹配器）_**

`expect.extend` 还支持异步匹配器。异步匹配器返回一个 Promise，因此你需要等待返回的值。让我们使用一个示例匹配器来说明它们的用法。我们将实现一个名为 `toBeDivisibleByExternalValue` 的匹配器，其中的可整除数将从外部源中提取。

```javascript
expect.extend({
  async toBeDivisibleByExternalValue(received) {
    const externalValue = await getExternalValueFromRemoteSource();
    const pass = received % externalValue == 0;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be divisible by ${externalValue}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be divisible by ${externalValue}`,
        pass: false,
      };
    }
  },
});

test("is divisible by external value", async () => {
  await expect(100).toBeDivisibleByExternalValue();
  await expect(101).not.toBeDivisibleByExternalValue();
});
```

**_Custom Matchers API（自定义匹配器 API）_**

匹配器应该返回一个带有两个键的对象（或一个对象的 Promise）。`pass` 代表是否存在匹配，并且 `message` 提供了一个没有参数的函数，如果失败则返回错误消息。因此，当 `pass` 为 false 时， `message` 应该返回 `expect(x).yourMatcher()` 失败时的错误消息。当 `pass` 为 true 时，`message` 应该返回 `expect(x).not.yourMatcher()` 失败时的错误消息。

```javascript
expect.extend({
  yourMatcher(x, y, z) {
    return {
      pass: true,
      message: () => "",
    };
  },
});
```

这些辅助函数和属性可以在自定义匹配器 `this` 中找到：

**`this.isNot`**

布尔值，让你知道此匹配器是使用否定的 `.not` 修饰符调用的，可以显示清晰正确的匹配器提示（请参阅示例代码）。

**`this.promise`**

字符串，可以显示清晰正确的匹配器提示：

- 如果使用 promise `.rejects` 修饰符调用 `'rejects'` 匹配器
- 如果使用 promise `.resolves` 修饰符调用 `'resolves'` 匹配器
- 如果没有使用承诺修饰符调用 `''` 匹配器

**`this.equals(a, b)`**

这是一个深度相等函数，如果两个对象（a 和 b）具有相同的值（递归地），它将返回 `true`。

**`this.expand`**

布尔值，让你知道这个匹配器是用 `expand` 选项调用的。当使用 `--expand` 标志调用 Jest 时，`this.expand` 可用于确定 Jest 是否应显示完整的差异和错误。

**`this.utils`**

`this.utils` 上公开了许多有用的工具，主要由 [jest-matcher-utils](https://github.com/facebook/jest/tree/master/packages/jest-matcher-utils) 的导出组成。

最有用的是 `matcherHint`、`printExpected` 和 `printReceived` 来很好地格式化错误消息。举个例子，看一下 `toBe` 匹配器的实现：

```javascript
const { diff } = require("jest-diff");
expect.extend({
  toBe(received, expected) {
    const options = {
      comment: "Object.is equality",
      isNot: this.isNot,
      promise: this.promise,
    };

    const pass = Object.is(received, expected);

    const message = pass
      ? () =>
          this.utils.matcherHint("toBe", undefined, undefined, options) +
          "\n\n" +
          `Expected: not ${this.utils.printExpected(expected)}\n` +
          `Received: ${this.utils.printReceived(received)}`
      : () => {
          const diffString = diff(expected, received, {
            expand: this.expand,
          });
          return (
            this.utils.matcherHint("toBe", undefined, undefined, options) +
            "\n\n" +
            (diffString && diffString.includes("- Expect")
              ? `Difference:\n\n${diffString}`
              : `Expected: ${this.utils.printExpected(expected)}\n` +
                `Received: ${this.utils.printReceived(received)}`)
          );
        };

    return { actual: received, message, pass };
  },
});
```

这将打印这样的东西：

```javascript
  expect(received).toBe(expected)

    Expected value to be (using Object.is):
      "banana"
    Received:
      "apple"
```

当断言失败时，错误消息应向用户提供尽可能多的信息，以便他们能够快速解决问题。你应该编写精确的失败消息，以确保用户使用你的自定义断言时拥有良好的开发体验。

**_Custom snapshot matchers（自定义快照匹配器）_**

要在自定义匹配器中使用快照测试，你可以导入 `jest-snapshot` 并从匹配器中使用它。

举个例子，这是一个修剪字符串以存储指定长度功能的快照匹配器，`.toMatchTrimmedSnapshot(length)`：

```javascript
const { toMatchSnapshot } = require("jest-snapshot");

expect.extend({
  toMatchTrimmedSnapshot(received, length) {
    return toMatchSnapshot.call(
      this,
      received.substring(0, length),
      "toMatchTrimmedSnapshot"
    );
  },
});

it("stores only 10 characters", () => {
  expect("extra long string oh my god").toMatchTrimmedSnapshot(10);
});

/*
存储的快照看起来像这样：

exports[`stores only 10 characters: toMatchTrimmedSnapshot 1`] = `"extra long"`;
*/
```

它也可以为内联快照创建自定义匹配器，快照将正确添加到自定义匹配器中。但是，当第一个参数是属性匹配器时，内联快照将始终尝试附加到第一个参数或第二个参数，因此无法在自定义匹配器中接受自定义参数。

```javascript
const { toMatchInlineSnapshot } = require("jest-snapshot");

expect.extend({
  toMatchTrimmedInlineSnapshot(received, ...rest) {
    return toMatchInlineSnapshot.call(this, received.substring(0, 10), ...rest);
  },
});

it("stores only 10 characters", () => {
  expect("extra long string oh my god").toMatchTrimmedInlineSnapshot();
  /*
  快照将像这样被内联添加：
  expect('extra long string oh my god').toMatchTrimmedInlineSnapshot(
    `"extra long"`
  );
  */
});
```

**_async（异步）_**

如果你的自定义内联快照匹配器是异步的，即使用 `async` - `await`，你可能会遇到“Multiple inline snapshots for the same call are not supported（不支持同一调用的多个内联快照）”之类的错误。Jest 需要额外的上下文信息来查找自定义内联快照匹配器来正确的更新快照位置。

```javascript
const { toMatchInlineSnapshot } = require("jest-snapshot");

expect.extend({
  async toMatchObservationInlineSnapshot(fn, ...rest) {
    // 必须在 `await` 之前创建错误（及堆栈跟踪）
    this.error = new Error();

    // `observe` 的实现无关紧要
    // 重要的是自定义快照匹配器是异步的
    const observation = await observe(async () => {
      await fn();
    });

    return toMatchInlineSnapshot.call(this, recording, ...rest);
  },
});

it("observes something", async () => {
  await expect(async () => {
    return "async action";
  }).toMatchTrimmedInlineSnapshot();
  /*
    快照将像这样被内联添加：
    await expect(async () => {
      return 'async action';
    }).toMatchTrimmedInlineSnapshot(`"async action"`);
  */
});
```

**_Bail out（救助?）_**

通常 `jest` 会尝试匹配测试中预期的每个快照。

有时候，如果先前的快照失败，那么继续测试可能没有意义。比如当你在各种转换后制作状态机的快照时，一旦一个转换产生了错误的状态，你就可以中止测试。

在这种情况下，你可以实现一个自定义快照匹配器，它会抛出第一个不匹配的项而不是收集每个不匹配的内容。

```javascript
const { toMatchInlineSnapshot } = require("jest-snapshot");

expect.extend({
  toMatchStateInlineSnapshot(...args) {
    this.dontThrow = () => {};

    return toMatchInlineSnapshot.call(this, ...args);
  },
});

let state = "initial";

function transition() {
  // 执行中的错别字会导致测试失败
  if (state === "INITIAL") {
    state = "pending";
  } else if (state === "pending") {
    state = "done";
  }
}

it("transitions as expected", () => {
  expect(state).toMatchStateInlineSnapshot(`"initial"`);

  transition();
  // 已经产生了错误匹配，继续执行测试没有意义
  expect(state).toMatchStateInlineSnapshot(`"loading"`);

  transition();
  expect(state).toMatchStateInlineSnapshot(`"done"`);
});
```

### `expect.anything()`

`expect.anything()` 可以匹配除 `null` 或者 `undefined` 之外的任何内容。你可以在 `isEqual` 或者 `toBeCalledWith` 中使用它而不是使用文字值。举个例子，如果要检查是否使用了非空参数调用了模拟函数：

```javascript
test("map calls its argument with a non-null argument", () => {
  const mock = jest.fn();
  [1].map((x) => mock(x));
  expect(mock).toBeCalledWith(expect.anything());
});
```

### `expect.any(constructor)`

`expect.any(constructor)` 匹配使用给定构造函数创建的任何内容。你可以在 `isEqual` 或者 `toBeCalledWith` 中使用它而不是使用文字值。举个例子，如果要检查是否使用数字调用了模拟函数：

```javascript
function randomCall(fn) {
  return fn(Math.floor(Math.random() * 6 + 1));
}

test("randomCall calls its callback with a number", () => {
  const mock = jest.fn();
  randomCall(mock);
  expect(mock).toBeCalledWith(expect.any(Number));
});
```

### `expect.arrayContaining(array)`

`expect.arrayContaining(array)` 匹配接收到的数组，该数组包含预期数组中的所有元素。也就是说，预期数组是接收数组的**子集**。因此，接受数组中含有元素**不在**预期数组中它也匹配。

你可以使用它代替文字值：

- 在 `isEqual` 或者 `toBeCalledWith`
- 在 `objectContaining` 或者 `toMatchObject` 匹配属性

```javascript
describe("arrayContaining", () => {
  const expected = ["Alice", "Bob"];
  // 即使接收数组包含其它元素也匹配
  it("matches even if received contains additional elements", () => {
    expect(["Alice", "Bob", "Eve"]).toEqual(expect.arrayContaining(expected));
  });

  // 没有预期的 Alice 项则不匹配
  it("does not match if received does not contain expected elements", () => {
    expect(["Bob", "Eve"]).not.toEqual(expect.arrayContaining(expected));
  });
});
```

```javascript
describe("Beware of a misunderstanding! A sequence of dice rolls", () => {
  const expected = [1, 2, 3, 4, 5, 6];

  // 即使有其它的数字 7 也匹配
  it("matches even with an unexpected number 7", () => {
    expect([4, 1, 6, 7, 3, 5, 2, 5, 4, 6]).toEqual(
      expect.arrayContaining(expected)
    );
  });

  // 没有预期的数字 2 不匹配
  it("does not match without an expected number 2", () => {
    expect([4, 1, 6, 7, 3, 5, 7, 5, 4, 6]).not.toEqual(
      expect.arrayContaining(expected)
    );
  });
});
```

### `expect.assertions(number)`

`expect.assertions(number)` 用来验证在测试期间调用了一定数量的断言。它经常被用来测试异步代码，以确保回调中的断言确实被调用。

举个例子，我们有一个函数 `doAsync`，它接受两个回调 `callback1` 和 `callback2`，它将以未知的顺序异步地回调它们，我们可以用以下方法测试：

```javascript
test("doAsync calls both callbacks", () => {
  expect.assertions(2);
  function callback1(data) {
    expect(data).toBeTruthy();
  }
  function callback2(data) {
    expect(data).toBeTruthy();
  }

  doAsync(callback1, callback2);
});
```

`expect.assertions(2)` 用来确保两个回调都被实际调用。

### `expect.hasAssertions()`

`expect.hasAssertions()` 用来验证在测试期间至少调用了一个断言。它经常被用来测试异步代码，以确保回调中的断言确实被调用。

举个例子，假设我们有一些函数都处理状态，`prepareState` 使用状态对象调用回调，`validateState` 在该状态对象上运行，`waitOnState` 等待所有的 `prepareState` 完成返回一个 promise，我们可以用以下方法测试：

```javascript
test("prepareState prepares a valid state", () => {
  expect.hasAssertions();
  prepareState((state) => {
    expect(validateState(state)).toBeTruthy();
  });
  return waitOnState();
});
```

`expect.hasAssertions()` 用来确保实际调用了 `prepareState`。

### `expect.not.arrayContaining(array)`

`expect.not.arrayContaining(array)` 匹配接收到的数组不包含预期数组中所有元素。也就是说，预期数组不是接收数组的子集。

它是 `expect.arrayContaining` 的反函数。

```javascript
describe("not.arrayContaining", () => {
  const expected = ["Samantha"];

  it("matches if the actual array does not contain the expected elements", () => {
    expect(["Alice", "Bob", "Eve"]).toEqual(
      expect.not.arrayContaining(expected)
    );
  });
});
```

### `expect.not.objectContaining(object)`

`expect.not.objectContaining(object)` 匹配接收对象不递归匹配预期属性。也就是说，预期对象不是接收对象的子集。因此它匹配包含不在预期对象中的属性的接收对象。

它是 `expect.objectContaining` 的反函数。

```javascript
describe("not.objectContaining", () => {
  const expected = { foo: "bar" };

  it("matches if the actual object does not contain expected key: value pairs", () => {
    expect({ bar: "baz" }).toEqual(expect.not.objectContaining(expected));
  });
});
```

### `expect.not.stringContaining(string)`

`expect.not.stringContaining(string)` 匹配接收到的值**不是一个字符串**或者**是一个与预期值不匹配字符串**

它是 `expect.stringContaining` 的反函数。

```javascript
describe("not.stringContaining", () => {
  const expected = "Hello world!";

  it("matches if the received value does not contain the expected substring", () => {
    expect("How are you?").toEqual(expect.not.stringContaining(expected));
  });
});
```

### `expect.not.stringMatching(string | regexp)`

`expect.not.stringMatching(string | regexp)` 匹配接收到的值**不是一个字符串**或者**是一个与预期值不匹配的字符串或正则表达式**

它是 `expect.stringMatching` 的反函数。

```javascript
describe("not.stringMatching", () => {
  const expected = /Hello world!/;

  it("matches if the received value does not match the expected regex", () => {
    expect("How are you?").toEqual(expect.not.stringMatching(expected));
  });
});
```

### `expect.objectContaining(object)`

`expect.objectContaining(object)` 匹配接收对象递归匹配预期属性。也就是说，预期对象是接收对象的子集。因此它匹配包含存在于预期对象中的属性的接收对象。

你可以使用匹配器、`expect.anything()` 等来代替预期对象中的文字属性值。

举个例子，假设我们期望使用 `Event` 对象调用 `onPress` 函数，并且我们需要验证的是该事件是否具有 `event.x` 和 `event.y` 属性。我们可以这样做：

```javascript
test("onPress gets called with the right thing", () => {
  const onPress = jest.fn();
  simulatePresses(onPress);
  expect(onPress).toBeCalledWith(
    expect.objectContaining({
      x: expect.any(Number),
      y: expect.any(Number),
    })
  );
});
```

### `expect.stringContaining(string)`

`expect.stringContaining(string)` 匹配包含确切的值的预期字符串。

### `expect.stringMatching(string | regexp)`

`expect.stringMatching(string | regexp)` 匹配包含确切值的预期字符串和正则表达式。

你可以使用它代替文字值：

- 在 `isEqual` 或者 `toBeCalledWith`
- 在 `arrayContaining` 中匹配元素
- 在 `objectContaining` 或者 `toMatchObject` 匹配属性

这个例子展示了如何嵌套多个非对称匹配器，在 `expect.arrayContaining` 中使用 `expect.stringMatching`。

```javascript
describe("stringMatching in arrayContaining", () => {
  const expected = [
    expect.stringMatching(/^Alic/),
    expect.stringMatching(/^[BR]ob/),
  ];
  it("matches even if received contains additional elements", () => {
    expect(["Alicia", "Roberto", "Evelina"]).toEqual(
      expect.arrayContaining(expected)
    );
  });
  it("does not match if received does not contain expected elements", () => {
    expect(["Roberto", "Evelina"]).not.toEqual(
      expect.arrayContaining(expected)
    );
  });
});
```

### `expect.addSnapshotSerializer(serializer)`

你可以调用 `expect.addSnapshotSerializer` 来添加格式化特定于应用程序的数据结构模块。

对于单个测试文件，添加的模块位于 `snapshotSerializers（快照序列化器）` 配置中的任何模块之前，后者位于内置 JavaScript 类型和 React 元素的默认快照序列化程序之前。添加的最后一个模块是测试的第一个模块。

```javascript
import serializer from "my-serializer-module";
expect.addSnapshotSerializer(serializer);

// 影响测试文件中的 expect(value).toMatchSnapshot() 断言
```

如果你在单个测试文件中添加**快照序列化程序**而不是将其添加到 `snapshotSerializers` 配置中

- 你将使依赖显示引用而不是隐式引用
- 你避免了可能从 [create-react-app](https://github.com/facebook/create-react-app) 中弹出的配置限制。

更多信息请参阅 [configuring Jest](/apis/ConfiguringJest.md)。

### `.not`

如果你知道如何测试某些东西，`.not` 会让你测试它相反的值。例如，此代码测试 `best La Croix` 不是 `coconut`：

```javascript
test("the best flavor is not coconut", () => {
  expect(bestLaCroixFlavor()).not.toBe("coconut");
});
```

### `.resolves`

使用 `resolves` 来展开已经完成的的 promise 的值，以便链接任何其他匹配器。如果 promise 失败，则断言失败。

举个例子，此代码测试 promise 成功 resolves 并且返回值是 `'lemon'`

```javascript
test("resolves to lemon", () => {
  // 确保添加了 return 语句
  return expect(Promise.resolve("lemon")).resolves.toBe("lemon");
});
```

请注意，由于你仍在测试 promise，因此测试仍然是异步的。因此，你需要[告诉 Jest 等待](https://www.jestjs.cn/docs/asynchronous#promises)来通过返回未包装的断言。

或者，你可以将 `async/await` 和 `.resolves` 结合使用：

```javascript
test("resolves to lemon", async () => {
  await expect(Promise.resolve("lemon")).resolves.toBe("lemon");
  await expect(Promise.resolve("lemon")).resolves.not.toBe("octopus");
});
```

### `.rejects`

使用 `.rejects` 来展开 promise 失败的原因，以便链接任何其他匹配器。如果 promise 被实现，则断言失败。

举个例子，此代码测试 promise 是否以 `'octopus'` 为原因失败：

```javascript
test("rejects to octopus", () => {
  return expect(Promise.reject(new Error("octopus"))).rejects.toThrow(
    "octopus"
  );
});
```

请注意，由于你仍在测试 promise，因此测试仍然是异步的。因此，你需要[告诉 Jest 等待](https://www.jestjs.cn/docs/asynchronous#promises)来通过返回未包装的断言。

或者，你可以将 `async/await` 和 `.rejects` 结合使用：

```javascript
test("rejects to octopus", async () => {
  await expect(Promise.reject(new Error("octopus"))).rejects.toThrow("octopus");
});
```

### `.toBe(value)`

使用 `.toBe` 比较原始值或检查对象实例的引用标识。它使用 `Object.is` 来比较值，这比 `===` 严格相等运算符更适合于测试。

举个例子，此代码将验证 `can` 对象的某些属性：

```javascript
const can = {
  name: "pimpleMousse",
  ounces: 12,
};

describe("the can", () => {
  test("has 12 ounces", () => {
    expect(can.ounces).toBe(12);
  });

  test("has a sophisticated name", () => {
    expect(can.name).toBe("pimpleMousse");
  });
});
```

不要使用 `.toBe` 去验证浮点数。例如由于四舍五入和小数精度问题，在 JS 中 `0.2 + 0.1` 是不完全相等于 `0.3` 的，如果你想测试浮点数，请改用 `.toBeCloseTo`。

尽管 `.toBe` 匹配器**会检查引用标识**，但如果断言失败，它会**报告值的深度比较**。如果属性之间的差异不能帮助你解决测试失败的问题，尤其是在报告很大的情况下，那么你可以将比较移动到 `expect` 函数中，比如要断言元素是否是同一个实例：

- 将 `expect(received).toBe(expected)` 改写为 `expect(Object.is(received, expected)).toBe(true)`
- 将 `expect(received).not.toBe(expected)` 改写为 `expect(Object.is(received, expected)).toBe(false)`

### `.toHaveBeenCalled()`

别名：`.toBeCalled()`

使用 `.toHaveBeenCalled` 确保模拟函数被调用。

例如，假设你有一个 `drinkAll(drink, flavor)` 函数，它接受一个 `drink` 函数，。你可能想检查的内容是 `'lemon'` 而不是 `'octopus'`，可以使用如下测试套件实现这一点：

```javascript
function drinkAll(callback, flavour) {
  if (flavour !== "octopus") {
    callback(flavour);
  }
}

describe("drinkAll", () => {
  test("drinks something lemon-flavoured", () => {
    const drink = jest.fn();
    drinkAll(drink, "lemon");
    expect(drink).toHaveBeenCalled();
  });

  test("does not drink something octopus-flavoured", () => {
    const drink = jest.fn();
    drinkAll(drink, "octopus");
    expect(drink).not.toHaveBeenCalled();
  });
});
```

### `.toHaveBeenCalledTimes(number)`

别名：`.toBeCalledTimes(number)`

使用 `.toHaveBeenCalledTimes` 确保模拟函数被调用的次数准确无误。

例如，假设你有一个 `drinkEach(drink, Array<flavor>)` 函数，它接受一个 `drink` 函数并将其应用于传入的 `flavor` 数组。你可能想要检查 `drink` 函数被调用的确切次数。你可以用这个测试套件做到这一点：

```javascript
test("drinkEach drinks each drink", () => {
  const drink = jest.fn();
  drinkEach(drink, ["lemon", "octopus"]);
  expect(drink).toHaveBeenCalledTimes(2);
});
```

### `.toHaveBeenCalledWith(arg1, arg2, ...)`

别名：`toBeCalledWith()`

使用 `.toHaveBeenCalledWith` 确保模拟函数使用特定参数。

例如，假设你可以使用 `register` 函数注册 `beverage`，而 `applyToAll(f)` 应该将函数 `f` 应用于所有已注册的 `beverage`。为了确保有效可以这么写：

```javascript
test("registration applies correctly to orange La Croix", () => {
  const beverage = new LaCroix("orange");
  register(beverage);
  const f = jest.fn();
  applyToAll(f);
  expect(f).toHaveBeenCalledWith(beverage);
});
```

### `.toHaveBeenLastCalledWith(arg1, arg2, ...)`

别名：`.lastCalledWith(arg1, arg2, ...)`

如果你有一个模拟函数，你可以使用 `.toHaveBeenLastCalledWith` 来测试它最后被调用的参数。例如，假设你有一个 `applyToAllFlavors(f)` 函数，它将 `f` 应用于一堆参数，你希望在调用它时，它操作的最后一个参数是 `'mango'`。可以这么写：

```javascript
test("applying to all flavors does mango last", () => {
  const drink = jest.fn();
  applyToAllFlavors(drink);
  expect(drink).toHaveBeenLastCalledWith("mango");
});
```

### `.toHaveBeenNthCalledWith(nthCall, arg1, arg2, ....)`

别名：`.nthCalledWith(nthCall, arg1, arg2, ...)`

如果你有一个模拟函数，你可以使用 `.toHaveBeenNthCalledWith` 来测试它是用什么参数调用的。例如，假设你有一个 `drinkEach(drink, Array<flavor>)` 函数，该函数将 `f` 应用于一堆参数，并且你希望在调用它时，它操作的第一个参数是 `'lemon'`，而第二个是 `'octopus'`。可以这么写：

```javascript
test("drinkEach drinks each drink", () => {
  const drink = jest.fn();
  drinkEach(drink, ["lemon", "octopus"]);
  expect(drink).toHaveBeenNthCalledWith(1, "lemon");
  expect(drink).toHaveBeenNthCalledWith(2, "octopus");
});
```

注意：第 n 个参数必须是从 1 开始的正整数。

### `.toHaveReturned()`

别名：`toReturn()`

如果你有一个模拟函数，你可以使用 `.toHaveReturned` 来测试模拟函数是否成功返回（即没有抛出错误）至少一次。例如，假设你有一个返回 `true` 的 `drink` 方法。可以这么写：

```javascript
test("drinks returns", () => {
  const drink = jest.fn(() => true);
  drink();
  expect(drink).toHaveReturned();
});
```

### `.toHaveReturnedTimes(number)`

别名：`.toReturnTimes(number)`

使用 `.toHaveReturnedTimes` 确保模拟函数成功返回（即没有抛出错误）准确的次数。任何抛出错误的模拟函数调用都不会计入函数返回的次数。

比如说你想测试 `drink` 返回 `true` 的次数：

```javascript
test("drink returns twice", () => {
  const drink = jest.fn(() => true);

  drink();
  drink();

  expect(drink).toHaveReturnedTimes(2);
});
```

### `.toHaveReturnedWith(value)`

别名：`.toReturnWith(value)`

使用 `.toHaveReturnedWith(value)` 确保模拟函数返回特定的值。

比如你有一个 `drink` 函数返回特定的值，可以这么写：

```javascript
test("drink returns La Croix", () => {
  const beverage = { name: "La Croix" };
  const drink = jest.fn((beverage) => beverage.name);

  drink(beverage);

  expect(drink).toHaveReturnedWith("La Croix");
});
```

### `.toHaveLastReturnedWith(value)`

别名：`.lastReturnedWith(value)`

使用 `.toHaveLastReturnedWith(value)` 来测试模拟函数最后返回的特定值。如果模拟函数的最后一次调用抛出错误，则无论你提供什么值作为预期返回值，此匹配器都将失败。

比如你有一个 `drink` 函数返回特定的值，可以这么写：

```javascript
test("drink returns La Croix (Orange) last", () => {
  const beverage1 = { name: "La Croix (Lemon)" };
  const beverage2 = { name: "La Croix (Orange)" };
  const drink = jest.fn((beverage) => beverage.name);

  drink(beverage1);
  drink(beverage2);

  expect(drink).toHaveLastReturnedWith("La Croix (Orange)");
});
```

### `.toHaveNthReturnedWith(nthCall, value)`

别名：`.nthReturnedWith(nthCall, value)`

使用 `.toHaveNthReturnedWith` 测试模拟函数为第 n 次调用返回的特定值。如果对模拟函数的第 n 次调用抛出错误，则无论你提供什么值作为预期返回值，此匹配器都将失败。

举个例子：

```javascript
test("drink returns expected nth calls", () => {
  const beverage1 = { name: "La Croix (Lemon)" };
  const beverage2 = { name: "La Croix (Orange)" };
  const drink = jest.fn((beverage) => beverage.name);

  drink(beverage1);
  drink(beverage2);

  expect(drink).toHaveNthReturnedWith(1, "La Croix (Lemon)");
  expect(drink).toHaveNthReturnedWith(2, "La Croix (Orange)");
});
```

注意：第 n 个参数必须是从 1 开始的正整数。

### `.toHaveLength(number)`

使用 `.toHaveLength` 检查对象是否具有 `.length` 属性并判断其是否等于某个数值。

这对于检查数组或字符串大小特别有用。

```javascript
expect([1, 2, 3]).toHaveLength(3);
expect("abc").toHaveLength(3);
expect("").not.toHaveLength(5);
```

### `.toHaveProperty(keyPath, value?)`

使用 `.toHaveProperty` 检查对象是否存在 `keyPath` 处的属性。为了检查对象中深度嵌套的属性，你可以使用点表示法或包含用于深度引用的 `keyPath` 的数组。

你可以提供一个可选的 `value` 参数来比较接收到的属性值（递归地用于对象实例的所有属性，也称为深度相等，如 `toEqual` 匹配器）。

以下示例包含具有嵌套属性的 `houseForSale` 对象。我们使用 `toHaveProperty` 来检查对象中各种属性的存在和值。

```javascript
// 包含需要测试的 house 对象
const houseForSale = {
  bath: true,
  bedrooms: 4,
  kitchen: {
    amenities: ["oven", "stove", "washer"],
    area: 20,
    wallColor: "white",
    "nice.oven": true,
  },
  "ceiling.height": 2,
};

test("this house has my desired features", () => {
  // 示例
  expect(houseForSale).toHaveProperty("bath");
  expect(houseForSale).toHaveProperty("bedrooms", 4);

  expect(houseForSale).not.toHaveProperty("pool");

  // 使用点表示法进行深度引用
  expect(houseForSale).toHaveProperty("kitchen.area", 20);
  expect(houseForSale).toHaveProperty("kitchen.amenities", [
    "oven",
    "stove",
    "washer",
  ]);

  expect(houseForSale).not.toHaveProperty("kitchen.open");

  // 使用包含 keyPath 的数组进行深度引用
  expect(houseForSale).toHaveProperty(["kitchen", "area"], 20);
  expect(houseForSale).toHaveProperty(
    ["kitchen", "amenities"],
    ["oven", "stove", "washer"]
  );
  expect(houseForSale).toHaveProperty(["kitchen", "amenities", 0], "oven");
  expect(houseForSale).toHaveProperty(["kitchen", "nice.oven"]);
  expect(houseForSale).not.toHaveProperty(["kitchen", "open"]);

  // 在键本身中引用键（？这个 tall 哪来的，文档这么写的，没搞明白）
  expect(houseForSale).toHaveProperty(["ceiling.height"], "tall");
});
```

### `.toBeCloseTo(number, numDigits?)`

使用 `toBeCloseTo` 比较浮点数的近似相等性。

可选的 `numDigits` 参数是用来限制**小数点后**要检查的位数。默认值为 `2`，测试标准是 `Math.abs(expected - received) < 0.005`（即 `10 ** -2 / 2`）。

直观的相等比较经常失败，因为十进制值的算术通常在有限精度的二进制表示中存在舍入误差（常见于 JS 的精度问题）。比如这个测试将不会成功：

```javascript
test("adding works sanely with decimals", () => {
  expect(0.2 + 0.1).toBe(0.3); // 失败
});
```

因为在 JS 中 `0.1 + 0.2` 实际上等于 `0.30000000000000004`（JavaScript 精度问题）

所以下面例子会以测试小数点后 5 位比较通过：

```javascript
test("adding works sanely with decimals", () => {
  expect(0.2 + 0.1).toBeCloseTo(0.3, 5); // 通过
});
```

由于浮点错误是 `toBeCloseTo` 解决的问题，所以它不支持大整数值。

### `.toBeDefined()`

使用 `.toBeDefined` 检查变量是否是 undefined。例如你想检查一个函数 `fetchNewFlavorIdea()` 是否返回内容，可以这样写：

```javascript
test("there is a new flavor idea", () => {
  expect(fetchNewFlavorIdea()).toBeDefined();
});
```

你可以编写 `expect(fetchNewFlavorIdea()).not.toBe(undefined)`，但最好避免在代码中直接引用 `undefined`。

### `.toBeFalsy()`

当你不关心测试的值的内容只想确保在布尔值中表示为 false 时，请使用 `.toBeFalsy()`。例如有如下代码：

```javascript
drinkSomeLaCroix();
if (!getErrors()) {
  drinkMoreLaCroix();
}
```

你可能并不关心 `getErrors` 返回什么，特别是 - 它可能返回 `false`、`null` 或 `0`时你的代码仍然可以工作。所以如果你想在 `drinkMoreLaCroix` 后测试有没有错误，你可以写：

```javascript
test("drinking La Croix does not lead to errors", () => {
  drinkSomeLaCroix();
  expect(getErrors()).toBeFalsy();
});
```

在 JavaScript 中，存在六个假值：`false`, `0`, `''`, `null`, `undefined` 和 `NaN`，其它的均为真值。

### `.toBeGreaterThan(number | bigint)`

使用 `toBeGreaterThan` 比较 `收到的 > 预期的` 数字或大整数值。

```javascript
// ouncesPerCan() 的值是否超过 10
test("ounces per can is more than 10", () => {
  expect(ouncesPerCan()).toBeGreaterThan(10);
});
```

### `.toBeGreaterThanOrEqual(number | bigint)`

使用 `toBeGreaterThanOrEqual` 比较 `收到的 >= 预期的` 数字或大整数值。

```javascript
// ouncesPerCan() 的值大于等于 12
test("ounces per can is at least 12", () => {
  expect(ouncesPerCan()).toBeGreaterThanOrEqual(12);
});
```

### `.toBeLessThan(number | bigint)`

使用 `toBeLessThan` 比较 `收到的 < 预期的` 数字或大整数值。

```javascript
// ouncesPerCan() 的值小于 20
test("ounces per can is less than 20", () => {
  expect(ouncesPerCan()).toBeLessThan(20);
});
```

### `.toBeLessThanOrEqual(number | bigint)`

使用 `toBeLessThanOrEqual` 比较 `收到的 <= 预期的` 数字或大整数值。

```javascript
// ouncesPerCan() 的值小于等于12
test("ounces per can is at most 12", () => {
  expect(ouncesPerCan()).toBeLessThanOrEqual(12);
});
```

### `.toBeInstanceOf(Class)`

使用 `.toBeInstanceOf(Class)` 检查对象是否是类的实例。`instanceof` 在这个匹配器下面使用。

```javascript
class A {}

expect(new A()).toBeInstanceOf(A);
expect(() => {}).toBeInstanceOf(Function);
expect(new A()).toBeInstanceOf(Function); // throws
```

### `.toBeNull()`

`.toBeNull()` 跟 `.toBe(null)` 相等，但是它的错误信息会更好一些。所以你想检查某些内容是否为空时，使用 `.toBeNull()`

```javascript
function bloop() {
  return null;
}

test("bloop returns null", () => {
  expect(bloop()).toBeNull();
});
```

### `.toBeTruthy()`

当你不关心测试的值的内容只想确保在布尔值中表示为 true 时，请使用 `.toBeTruthy()`。例如有如下代码：

```javascript
drinkSomeLaCroix();
if (thirstInfo()) {
  drinkMoreLaCroix();
}
```

你可能不在乎 `thirstInfo` 返回什么，特别是 - 它可能返回 `true` 或一个复杂的对象，而且你的代码仍然可以工作。因此，如果你想在 `drinkSomeLaCroix` 后测试 `thirstInfo` 是否为真，你可以这样写：

```javascript
test("drinking La Croix leads to having thirst info", () => {
  drinkSomeLaCroix();
  expect(thirstInfo()).toBeTruthy();
});
```

在 JavaScript 中，存在六个假值：`false`, `0`, `''`, `null`, `undefined` 和 `NaN`，其它的均为真值。

### `.toBeUndefined()`

使用 `.toBeUndefined` 检查变量是否 `undefined（未定义）`。例如，如果你想检查函数 `bestDrinkForFlavor('octopus')` 返回 `undefined`：

```javascript
test("the best drink for octopus flavor is undefined", () => {
  expect(bestDrinkForFlavor("octopus")).toBeUndefined();
});
```

你可以编写 `expect(bestDrinkForFlavor('octopus')).toBe(undefined)`，但最好避免在代码中直接引用 `undefined`。

### `.toBeNaN()`

使用 `.toBeNaN()` 判断值是 `NaN`。

```javascript
test("passes when value is NaN", () => {
  expect(NaN).toBeNaN();
  expect(1).not.toBeNaN();
});
```

### `.toContain(item)`

当你想检查一个项目是否存在于数组中时，请使用 `.toContain`。为了测试数组中的项目，这使用 `===` 严格的相等检查。 `.toContain` 还可以检查一个字符串是否是另一个字符串的子字符串。

例如，如果 `getAllFlavors()` 返回一个数组，并且你想确保里面有 `lime`，你可以这样写：

```javascript
test("the flavor list contains lime", () => {
  expect(getAllFlavors()).toContain("lime");
});
```

### `.toContainEqual(item)`

当你想要检查具有特定的结构和值的项目是否包含在数组中时，请使用 `.toContainEqual`。为了测试数组中的项目，这个匹配器会递归地检查所有字段的相等性，而不是检查对象的身份。

```javascript
describe("my beverage", () => {
  test("is delicious and not sour", () => {
    const myBeverage = { delicious: true, sour: false };
    expect(myBeverages()).toContainEqual(myBeverage);
  });
});
```

### `.toEqual(value)`

使用 `.toEqual` 递归比较对象实例的所有属性。它调用 `Object.is` 来比较原始值，这比 `===` 严格相等操作更适合测试。

举个例子，在这个测试套件中 `toEqual` 和 `toBe` 表现不同，所以所有测试都通过了：

```javascript
const can1 = {
  flavor: "grapefruit",
  ounces: 12,
};
const can2 = {
  flavor: "grapefruit",
  ounces: 12,
};

describe("the La Croix cans on my desk", () => {
  // 具有完全相同的属性
  test("have all the same properties", () => {
    expect(can1).toEqual(can2);
  });
  // 不完全一样
  test("are not the exact same can", () => {
    expect(can1).not.toBe(can2);
  });
});
```

> 注意：`.toEqual` 不会对两个错误执行深度相等检查。只有 Error 的 `message` 属性被认为是相等的。建议使用 `.toThrow` 匹配器来测试错误。

如果属性之间的差异不能帮助你理解测试失败的原因，尤其是在报告很大的情况下，那么你可以将比较移到 expect 函数中。例如，使用 `Buffer` 类的 `equals` 方法来断言缓冲区是否包含相同的内容：

- 将 `expect(received).toEqual(expected)` 替换为 `expect(received.equals(expected)).toBe(true)`
- 将 `expect(received).not.toEqual(expected)` 替换为 `expect(received.equals(expected)).toBe(false)`

### `.toMatch(regexp | string)`

使用 `.toMatch` 检查字符串是否与正则表达式匹配。

比如你可能不知道 `essayOnTheBestFlavor()` 返回的究竟是什么，但你知道它是一个非常长的字符串，并且子字符串中含有 `grapefruit`。你可以使用以下方法进行测试：

```javascript
describe("an essay on the best flavor", () => {
  test("mentions grapefruit", () => {
    expect(essayOnTheBestFlavor()).toMatch(/grapefruit/);
    expect(essayOnTheBestFlavor()).toMatch(new RegExp("grapefruit"));
  });
});
```

这个匹配器也可以接受一个字符串：

```javascript
describe("grapefruits are healthy", () => {
  test("grapefruits are a fruit", () => {
    expect("grapefruits").toMatch("fruit");
  });
});
```

### `.toMatchObject(object)`

使用 `.toMatchObject` 检查 JavaScript 对象是否与对象的属性子集匹配。它会将接收到的对象与**不在预期对象中的属性**进行匹配。

你还可以传递一个对象数组，这种情况下，只有当接收到的数组中的**每个对象都匹配预期数组中的对应对象**时（在上述 `toMatchObject` 意义上），该方法才会返回 `true`。如果你想检查两个数组的元素数量是否匹配时使用这个方法，而不是 `arrayContaining`，它允许接收数组中的额外元素。

你可以将属性与值或匹配器进行匹配。

```javascript
const houseForSale = {
  bath: true,
  bedrooms: 4,
  kitchen: {
    amenities: ["oven", "stove", "washer"],
    area: 20,
    wallColor: "white",
  },
};
const desiredHouse = {
  bath: true,
  kitchen: {
    amenities: ["oven", "stove", "washer"],
    wallColor: expect.stringMatching(/white|yellow/),
  },
};

test("the house has my desired features", () => {
  expect(houseForSale).toMatchObject(desiredHouse);
});
```

```javascript
describe("toMatchObject applied to arrays", () => {
  // 元素的数量必须完全匹配
  test("the number of elements must match exactly", () => {
    expect([{ foo: "bar" }, { baz: 1 }]).toMatchObject([
      { foo: "bar" },
      { baz: 1 },
    ]);
  });

  // toMatchObject 为每个元素调用，所以可以存在额外的对象属性
  test(".toMatchObject is called for each elements, so extra object properties are okay", () => {
    expect([{ foo: "bar" }, { baz: 1, extra: "quux" }]).toMatchObject([
      { foo: "bar" },
      { baz: 1 },
    ]);
  });
});
```

### `.toMatchSnapshot(propertyMatchers?, hint?)`

这可以确保值与最近的快照匹配。点击[快照测试指南](https://www.jestjs.cn/docs/snapshot-testing)了解更多消息。

你可以提供一个可选的 `propertyMatchers` 对象参数，如果接收到的值是对象实例，则该参数具有不对称匹配器作为预期属性子集的值。它就像 `toMatchObject` 具有灵活的子集，然后是快照测试作为其余属性的精确标准。

你可以提供一个附加到测试名称的可选字符串参数 `hint` 。尽管 Jest 总是在快照名称的末尾附加一个数字，但在区分**单个** `it` 或 `test` 块中的**多个快照**时，简短的描述性提示可能比数字更有用。 Jest 在相应的 `.snap` 文件中按名称对快照进行排序。

### `.toMatchInlineSnapshot(propertyMatchers?, inlineSnapshot)`

确保值与最近的快照相匹配。

你可以提供一个可选的 `propertyMatchers` 对象参数，如果接收到的值是对象实例，则该参数具有不对称匹配器作为预期属性子集的值。它就像 `toMatchObject` 具有灵活的子集，然后是快照测试作为其余属性的精确标准。

在第一次运行测试时，Jest 将 `inlineSnapshot` 字符串参数添加到测试文件（而不是外部 `.snap` 文件）中的匹配器。

查看[内联快照](https://www.jestjs.cn/docs/snapshot-testing#inline-snapshots)部分了解更多信息。

### `.toStrictEqual(value)`

使用 `.toStrictEqual` 来测试对象是否具有相同的类型和结构。

与 `.toEqual` 的区别：

- 检查具有未定义属性的键。例如 `{a: undefined, b: 2}` 在使用 `.toStrictEqual` 时与 `{b: 2}` 不匹配。
- 检查数组稀疏性。例如 `[, 1]` 在使用 `.toStrictEqual` 时与 `[undefined, 1]` 不匹配。
- 检查对象类型是否相等。例如具有字段 `a` 和 `b` 的类实例不等于具有字段 `a` 和 `b` 的文字对象。

```javascript
class LaCroix {
  constructor(flavor) {
    this.flavor = flavor;
  }
}

describe("the La Croix cans on my desk", () => {
  test("are not semantically the same", () => {
    expect(new LaCroix("lemon")).toEqual({ flavor: "lemon" });
    expect(new LaCroix("lemon")).not.toStrictEqual({ flavor: "lemon" });
  });
});
```

### `.toThrow(error?)`

别名：`.toThrowError(error?)`

使用 `.toThrow` 来模拟函数在调用时是否抛出。例如，如果我们想测试 `drinkFlavor('octopus')` 抛出的情况，我们可以这样写：

```javascript
test("throws on octopus", () => {
  expect(() => {
    drinkFlavor("octopus");
  }).toThrow();
});
```

> 注意：必须将代码包裹在一个函数中，否则无法捕获错误，断言失败。

你可以提供一个可选参数来测试是否抛出了特定错误：

- 正则表达式：匹配错误消息
- 字符串：错误消息包括子字符串
- 错误对象：错误消息等于对象的消息属性
- 错误类：错误对象是类的实例

例如，假设 `drinkFlavor` 是这样写的：

```javascript
function drinkFlavor(flavor) {
  if (flavor == "octopus") {
    throw new DisgustingFlavorError("yuck, octopus flavor");
  }
  // 执行其它东西
}
```

我们可以通过几种方式测试这个错误是否被抛出：

```javascript
test("throws on octopus", () => {
  function drinkOctopus() {
    drinkFlavor("octopus");
  }

  // 测试错误消息是否在某处显示 "yuck"，以下两种方法是相等的
  expect(drinkOctopus).toThrowError(/yuck/);
  expect(drinkOctopus).toThrowError("yuck");

  // 精确匹配测试错误消息
  expect(drinkOctopus).toThrowError(/^yuck, octopus flavor$/);
  expect(drinkOctopus).toThrowError(new Error("yuck, octopus flavor"));

  // 测试得到 DisgustingFlavorError
  expect(drinkOctopus).toThrowError(DisgustingFlavorError);
});
```

### `.toThrowErrorMatchingSnapshot(hint?)`

使用 `.toThrowErrorMatchingSnapshot` 模拟函数在调用时是否抛出与最近的快照相匹配的错误。

你可以提供一个附加到测试名称的可选字符串参数 `hint` 。尽管 Jest 总是在快照名称的末尾附加一个数字，但在区分**单个** `it` 或 `test` 块中的**多个快照**时，简短的描述性提示可能比数字更有用。 Jest 在相应的 `.snap` 文件中按名称对快照进行排序。

例如，假设你有一个 `DrinkFlavor` 函数，该函数在 flavor 等于 `'octopus'` 时抛出，其编码如下：

```javascript
function drinkFlavor(flavor) {
  if (flavor == "octopus") {
    throw new DisgustingFlavorError("yuck, octopus flavor");
  }
  // 执行其它内容
}
```

这个函数的测试看起来像这样：

```javascript
test("throws on octopus", () => {
  function drinkOctopus() {
    drinkFlavor("octopus");
  }

  expect(drinkOctopus).toThrowErrorMatchingSnapshot();
});
```

它将生成以下快照：

```javascript
exports[`drinking flavors throws on octopus 1`] = `"yuck, octopus flavor"`;
```

查看 [React Tree Snapshot Testing](https://www.jestjs.cn/blog/2016/07/27/jest-14) 以获取有关快照测试的更多信息。

### `.toThrowErrorMatchingInlineSnapshot(inlineSnapshot)`

使用 `.toThrowErrorMatchingInlineSnapshot` 模拟函数在调用时是否抛出与最近的快照相匹配的错误。

在第一次运行测试时，Jest 将 `inlineSnapshot` 字符串参数添加到测试文件（而不是外部 .snap 文件）中的匹配器。

查看[内联快照](https://www.jestjs.cn/docs/snapshot-testing#inline-snapshots)部分了解更多信息。

[上一章-Globals](/apis/Globals.md)

[下一章-Mock Functions](/apis/MockFunctions.md)
