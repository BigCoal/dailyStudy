# Globals

在你的测试文件中，Jest 将这些方法和对象都放入全局环境中。你不必 request 或 import 任何东西即可使用它们。但是如果你更喜欢显式导入，则可以使用 `import {descirbe, expect, test} from '@jest/globals'` 导入。

## Methods - 方法

- [`afterAll(fn, timeout)`](#afterallfn-timeout)
- [`afterEach(fn, timeout)`](#aftereachfn-timeout)
- [`beforeAll(fn, timeout)`](#beforeallfn-timeout)
- [`beforeEach(fn, timeout)`](#beforeeachfn-timeout)
- [`describe(name, fn)`](#describename-fn)
- [`describe.each(table)(name, fn, timeout)`](#describeeachtablename-fn-timeout)
- [`describe.only(name, fn)`](#describeonlyname-fn)
- [`describe.only.each(table)(name, fn)`](#describeonlyeachtablename-fn)
- [`describe.skip(name, fn)`](#describeskipname-fn)
- [`describe.only.skip(table)(name, fn)`](#describeonlyskiptablename-fn)
- [`test(name, fn, timeout)`](#testname-fn-timeout)
- [`test.concurrent(name, fn, timeout)`](#testconcurrentname-fn-timeout)
- [`test.concurrent.each(table)(name, fn, timeout)`](#testconcurrenteachtablename-fn-timeout)
- [`test.concurrent.only.each(table)(name, fn)`](#testconcurrentonlyeachtablename-fn)
- [`test.concurrent.skip.each(table)(name, fn)`](#testconcurrentskipeachtablename-fn)
- [`test.each(table)(name, fn, timeout)`](#testeachtablename-fn-timeout)
- [`test.only(name, fn, timeout)`](#testonlyname-fn-timeout)
- [`test.only.each(table)(name, fn)`](#testonlyeachtablename-fn)
- [`test.skip(name, fn)`](#testskipname-fn)
- [`test.skip.each(table)(name, fn)`](#testskipeachtablename-fn)
- [`test.todo(name)`](#testtodoname)

---

## Reference - 参考

**_注_：`timeout` 作用是指定在中止之前等待的时间（以毫秒为单位），所有的 `timeout` 默认均为 5s，后面不再单独说明。**

### `afterAll(fn, timeout)`

在所有测试完成后运行一个功能，如果函数返回的是 promise 或 generator，则会等待该异步完成再继续。

如果你想清理一些跨测试共享的全局设置状态，这通常很有用。

举例：

```javascript
const globalDatabase = makeGlobalDatabase();

function cleanUpDatabase(db) {
  db.cleanUp();
}

afterAll(() => {
  // 这里确保所有测试完成后运行该方法
  cleanUpDatabase(globalDatabase);
});

test("can find things", () => {
  return globalDatabase.find("thing", {}, (results) => {
    expect(results.length).toBeGreaterThan(0);
  });
});

test("can insert a thing", () => {
  return globalDatabase.insert("thing", makeThing(), (response) => {
    expect(response.success).toBeTruthy();
  });
});
```

如果 `afterAll` 放在 `describe` 内，则会在描述块末尾执行。

如果想在每次测试完成后运行一些功能，请改用 `afterEach`。

### `afterEach(fn, timeout)`

在每个测试完成后都运行一个功能，如果函数返回的是 promise 或 generator，则会等待该异步完成再继续。

如果你想清理每个测试创建的一些临时状态，这通常很有用。

举例：

```javascript
const globalDatabase = makeGlobalDatabase();

function cleanUpDatabase(db) {
  db.cleanUp();
}

afterEach(() => {
  // 确保在每次测试完成后运行该方法
  cleanUpDatabase(globalDatabase);
});

test("can find things", () => {
  return globalDatabase.find("thing", {}, (results) => {
    expect(results.length).toBeGreaterThan(0);
  });
});

test("can insert a thing", () => {
  return globalDatabase.insert("thing", makeThing(), (response) => {
    expect(response.success).toBeTruthy();
  });
});
```

如果 `afterEach` 在 `describe` 内，则它仅在此 `describe` 块内的测试之后运行。

如果你只想在所有测试运行后运行一次清理，请改用 `afterAll`。

### `beforeAll(fn, timeout)`

在所有测试执行前运行一个功能，如果函数返回的是 promise 或 generator，则会等待该异步完成再继续。

如果你想设置一些将被许多测试使用的全局状态，这通常很有用。

举例：

```javascript
const globalDatabase = makeGlobalDatabase();

beforeAll(() => {
  // 清除数据库并添加一些测试数据。
  // Jest 将在运行测试之前等待此 promise 完成。
  return globalDatabase.clear().then(() => {
    return globalDatabase.insert({ testData: "foo" });
  });
});

// 因为我们在这个例子中只设置了一次数据库，这个很重要
// 我们的测试不会修改它。
test("can find things", () => {
  return globalDatabase.find("thing", {}, (results) => {
    expect(results.length).toBeGreaterThan(0);
  });
});
```

在这里的 `beforeAll` 可以确保在测试之前设置一些东西。如果这个设置是同步的，那么不使用 `beforeAll` 也没有什么问题，如果存在异步操作，就可以使用 `beforeAll` 来设置。

如果设置到 `describe` 块中，它将在 `describe` 开头运行。

如果想在每次测试之前都运行一些东西，请改用 `beforeEach`。

### `beforeEach(fn, timeout)`

在每个测试开始前都运行一个功能，如果函数返回的是 promise 或 generator，则会等待该异步完成再继续。

如果你想重置一些将被许多测试使用的全局状态，这通常很有用。

举例：

```javascript
const globalDatabase = makeGlobalDatabase();

beforeEach(() => {
  // 清除数据库并添加一些测试数据。
  // Jest 将在运行测试之前等待此 promise 解决。
  return globalDatabase.clear().then(() => {
    return globalDatabase.insert({ testData: "foo" });
  });
});

test("can find things", () => {
  return globalDatabase.find("thing", {}, (results) => {
    expect(results.length).toBeGreaterThan(0);
  });
});

test("can insert a thing", () => {
  return globalDatabase.insert("thing", makeThing(), (response) => {
    expect(response.success).toBeTruthy();
  });
});
```

这里 `beforeEach` 确保为每个测试重置数据库。

如果 `beforeEach` 在 `describe` 内，它会针对 `describe` 中的每个测试运行。

如果你只需要运行一些设置代码，在任何测试运行之前，请改用 `beforeAll`。

### `describe(name, fn)`

`describe(name, fn)` 将创建一个块，将几个相关的测试分到一组。

举例：

```javascript
const myBeverage = {
  delicious: true,
  sour: false,
};

describe("my beverage", () => {
  test("is delicious", () => {
    expect(myBeverage.delicious).toBeTruthy();
  });

  test("is not sour", () => {
    expect(myBeverage.sour).toBeFalsy();
  });
});
```

_这不是必要的_：可以在顶层编写测试块，如果想要将测试组织成组，使用 `describe` 会很方便。

如果希望有层次的测试结构，也可以嵌套 `describe`：

```javascript
const binaryStringToNumber = (binString) => {
  if (!/^[01]+$/.test(binString)) {
    throw new CustomError("Not a binary number.");
  }

  return parseInt(binString, 2);
};

describe("binaryStringToNumber", () => {
  describe("given an invalid binary string", () => {
    test("composed of non-numbers throws CustomError", () => {
      expect(() => binaryStringToNumber("abc")).toThrowError(CustomError);
    });

    test("with extra whitespace throws CustomError", () => {
      expect(() => binaryStringToNumber("  100")).toThrowError(CustomError);
    });
  });

  describe("given a valid binary string", () => {
    test("returns the correct number", () => {
      expect(binaryStringToNumber("100")).toBe(4);
    });
  });
});
```

### `describe.each(table)(name, fn, timeout)`

如果你不断使用不同的数据复制相同的测试套件，请使用 `describe.each`。 `describe.each` 允许你编写一次测试套件并传入数据。

`describe.each` 提供两个 API：

**1. `describe.each(table)(name, fn, timeout)`**

- `table`: `Array` 的数组，其参数传递到每行的 `fn` 中。
  - 注意如果传入一个一维数组，它会在内部映射到一个表，即 `[1, 2, 3] -> [[1], [2], [3]]`。
- `name`: 测试套件的标题
  - 通过使用 [`printf 格式`](https://nodejs.org/api/util.html#util_util_format_format_args) 按位置注入参数来生成唯一的测试标题：
    - `%p` - [pretty-format](https://www.npmjs.com/package/pretty-format)
    - `%s` - String
    - `%d` - Number
    - `%i` - Integer
    - `%f` - 浮点值
    - `%j` - JSON
    - `%o` - Object
    - `%#` - 测试用例索引
    - `%%` - 相当于单个百分号 ('%')。这不消耗参数。
  - 或者通过使用 `$variable` 注入测试用例对象的属性来生成唯一的测试标题
    - 要注入嵌套对象值，可以提供一个 keyPath，即 `$variable.path.to.value`
    - 可以使用 `$#` 注入测试用例的索引
    - 除了 `%%` 之外，不能将 `$variable` 与 `printf 格式` 一起使用
- `fn`: `Function` 要运行的测试套件，这将接收每一行中的参数作为函数参数的函数。

举例：

```javascript
describe.each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
])(".add(%i, %i)", (a, b, expected) => {
  test(`returns ${expected}`, () => {
    expect(a + b).toBe(expected);
  });

  test(`returned value not be greater than ${expected}`, () => {
    expect(a + b).not.toBeGreaterThan(expected);
  });

  test(`returned value not be less than ${expected}`, () => {
    expect(a + b).not.toBeLessThan(expected);
  });
});
```

```javascript
describe.each([
  { a: 1, b: 1, expected: 2 },
  { a: 1, b: 2, expected: 3 },
  { a: 2, b: 1, expected: 3 },
])(".add($a, $b)", ({ a, b, expected }) => {
  test(`returns ${expected}`, () => {
    expect(a + b).toBe(expected);
  });

  test(`returned value not be greater than ${expected}`, () => {
    expect(a + b).not.toBeGreaterThan(expected);
  });

  test(`returned value not be less than ${expected}`, () => {
    expect(a + b).not.toBeLessThan(expected);
  });
});
```

**2. `` describe.each`table`(name, fn, timeout) ``**

- `table`: 使用标记模板文字
  - 变量名列标题的第一行用 `|` 分隔
  - 使用 `${value}` 语法作为模板文字表达式提供的一个或多个后续数据行
- `name`: `String` 测试套件的标题，使用 `$variable` 从标记的模板表达式中将测试数据注入套件标题，并使用 `$#` 作为行的索引。
  - 要注入嵌套对象值，你可以提供一个 `keyPath`，即 `$variable.path.to.value`

举例：

```javascript
describe.each`
  a    | b    | expected
  ${1} | ${1} | ${2}
  ${1} | ${2} | ${3}
  ${2} | ${1} | ${3}
`("$a + $b", ({ a, b, expected }) => {
  test(`returns ${expected}`, () => {
    expect(a + b).toBe(expected);
  });

  test(`returned value not be greater than ${expected}`, () => {
    expect(a + b).not.toBeGreaterThan(expected);
  });

  test(`returned value not be less than ${expected}`, () => {
    expect(a + b).not.toBeLessThan(expected);
  });
});
```

### `describe.only(name, fn)`

别名：`fdescribe(name, fn)`

如果只想运行一个描述块，可以使用该方法。

```javascript
describe.only("my beverage", () => {
  test("is delicious", () => {
    expect(myBeverage.delicious).toBeTruthy();
  });

  test("is not sour", () => {
    expect(myBeverage.sour).toBeFalsy();
  });
});

describe("my other beverage", () => {
  // ... 将被跳过
});
```

### `describe.only.each(table)(name, fn)`

别名：`fdescribe.each(table)(name, fn)` 和 `` fdescribe.each`table`(name, fn) ``

如果你只想运行数据驱动测试的特定测试套件请使用 `describe.only.each`

`describe.only.each` 提供两个 API：

**`describe.only.each(table)(name, fn)`**

```javascript
describe.only.each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
])(".add(%i, %i)", (a, b, expected) => {
  test(`returns ${expected}`, () => {
    expect(a + b).toBe(expected);
  });
});

test("will not be ran", () => {
  expect(1 / 0).toBe(Infinity);
});
```

**`` describe.only.each`table`(name, fn) ``**

```javascript
describe.only.each`
  a    | b    | expected
  ${1} | ${1} | ${2}
  ${1} | ${2} | ${3}
  ${2} | ${1} | ${3}
`("returns $expected when $a is added $b", ({ a, b, expected }) => {
  test("passes", () => {
    expect(a + b).toBe(expected);
  });
});

test("will not be ran", () => {
  expect(1 / 0).toBe(Infinity);
});
```

### `describe.skip(name, fn)`

别名：`xdescribe(name, fn)`

如果你不想运行特定的描述块，可以使用`describe.skip`

```javascript
describe("my beverage", () => {
  test("is delicious", () => {
    expect(myBeverage.delicious).toBeTruthy();
  });

  test("is not sour", () => {
    expect(myBeverage.sour).toBeFalsy();
  });
});

describe.skip("my other beverage", () => {
  // ... 将被跳过
});
```

使用 `describe.skip` 通常是临时注释掉一大块测试内容更干净的替代方案

### `describe.only.skip(table)(name, fn)`

别名：`xdescribe.each(table)(name, fn)` 和 `xdescribe.each`table`(name, fn)`

如果你想停止运行一套数据驱动测试，请使用 `describe.skip.each`。

`describe.skip.each` 提供两个 API：

**`describe.skip.each(table)(name, fn)`**

```javascript
describe.skip.each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
])(".add(%i, %i)", (a, b, expected) => {
  test(`returns ${expected}`, () => {
    expect(a + b).toBe(expected); // 不会运行
  });
});

test("will be ran", () => {
  expect(1 / 0).toBe(Infinity);
});
```

**`` describe.skip.each`table`(name, fn) ``**

```javascript
describe.skip.each`
  a    | b    | expected
  ${1} | ${1} | ${2}
  ${1} | ${2} | ${3}
  ${2} | ${1} | ${3}
`("returns $expected when $a is added $b", ({ a, b, expected }) => {
  test("will not be ran", () => {
    expect(a + b).toBe(expected); // 不会运行
  });
});

test("will be ran", () => {
  expect(1 / 0).toBe(Infinity);
});
```

### `test(name, fn, timeout)`

别名：`it(name, fn, timeout)`。

在测试文件中你需要的只是运行测试的 `test` 方法。例如，假设有一个函数 `inchesOfRain()` 应该为零。你的整个测试可能是：

```javascript
test("did not rain", () => {
  expect(inchesOfRain()).toBe(0);
});
```

第一个参数是测试名称；第二个参数是一个包含要测试的函数。

> 注意：如果测试返回了一个 promise，Jest 将等待 promise 的 resolve，然后让测试完成。如果你向模拟函数提供参数，通常称为 done，Jest 也会等待。当你想测试回调时这会很方便。在[此处](https://www.jestjs.cn/docs/asynchronous#callbacks)查看如何测试异步代码。

例如，假设 `fetchBeverageList()` 返回一个 promise，该 promise 应该解析为一个包含 `lemon` 的列表。你可以使用以下方法进行测试：

```javascript
test("has lemon in it", () => {
  return fetchBeverageList().then((list) => {
    expect(list).toContain("lemon");
  });
});
```

即使对 `test` 的调用会立即返回，测试也不会在 promise 的 resolve 之前完成。

### `test.concurrent(name, fn, timeout)`

别名：`it.concurrent(name, fn, timeout)`

如果想同时运行多个测试，可以使用 `it.concurrent`

Note: test.concurrent is considered experimental - see here for details on missing features and other issues

> 注意：`test.concurrent` 被认为是实验性的 - 有关缺失功能和其他问题的详细信息，请参见[此处](https://github.com/facebook/jest/labels/Area%3A%20Concurrent)

第一个参数是测试名称；第二个参数是一个异步函数，包含要测试的期望。

```javascript
test.concurrent("addition of 2 numbers", async () => {
  expect(5 + 3).toBe(8);
});

test.concurrent("subtraction 2 numbers", async () => {
  expect(5 - 3).toBe(2);
});
```

> 注意：在配置中使用 `maxConcurrency` 防止 Jest 同时执行超过指定数量的测试

### `test.concurrent.each(table)(name, fn, timeout)`

别名：`it.concurrent.each(table)(name, fn, timeout)`

如果你不断用不同的数据重复相同的测试，请使用 `test.concurrent.each`。`test.each` 允许你编写一次测试并传入数据，测试都是异步运行的。

`test.concurrent.each` 提供两个 API：

**1. `test.concurrent.each(table)(name, fn, timeout)`**

- `table`: `Array` 的数组，其参数传递到每行的 `fn` 中。
  - 注意如果传入一个一维数组，它会在内部映射到一个表，即 `[1, 2, 3] -> [[1], [2], [3]]`。
- `name`: 测试套件的标题
  - 通过使用 [`printf 格式`](https://nodejs.org/api/util.html#util_util_format_format_args) 按位置注入参数来生成唯一的测试标题：
    - `%p` - [pretty-format](https://www.npmjs.com/package/pretty-format)
    - `%s` - String
    - `%d` - Number
    - `%i` - Integer
    - `%f` - 浮点值
    - `%j` - JSON
    - `%o` - Object
    - `%#` - 测试用例索引
    - `%%` - 相当于单个百分号 ('%')。这不消耗参数。
- `fn`: `Function` 要运行的测试套件，这将接收每一行中的参数作为函数参数的函数，**这必须是一个异步函数**。

举例：

```javascript
test.concurrent.each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
])(".add(%i, %i)", async (a, b, expected) => {
  expect(a + b).toBe(expected);
});
```

**2. `` test.concurrent.each`table`(name, fn, timeout) ``**

- `table`: 使用标记模板文字
  - 变量名列标题的第一行用 `|` 分隔
  - 使用 `${value}` 语法作为模板文字表达式提供的一个或多个后续数据行
- `name`: `String` 测试套件的标题，使用 `$variable` 从标记的模板表达式中将测试数据注入套件标题，并使用 `$#` 作为行的索引。
  - 要注入嵌套对象值，你可以提供一个 `keyPath`，即 `$variable.path.to.value`
- `fn`: `Function` 要运行的测试套件，这将接收每一行中的参数作为函数参数的函数，**这必须是一个异步函数**。

举例：

```javascript
test.concurrent.each`
  a    | b    | expected
  ${1} | ${1} | ${2}
  ${1} | ${2} | ${3}
  ${2} | ${1} | ${3}
`("returns $expected when $a is added $b", async ({ a, b, expected }) => {
  expect(a + b).toBe(expected);
});
```

### `test.concurrent.only.each(table)(name, fn)`

别名：`it.concurrent.only.each(table)(name, fn)`

如果只想同时运行具有不同测试数据的特定测试，可以使用 `test.concurrent.only.each`。

`test.concurrent.only.each` 提供两个 API：

**`test.concurrent.only.each(table)(name, fn)`**

```javascript
test.concurrent.only.each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
])(".add(%i, %i)", async (a, b, expected) => {
  expect(a + b).toBe(expected);
});

test("will not be ran", () => {
  expect(1 / 0).toBe(Infinity);
});
```

`` test.only.each`table`(name, fn) ``

```javascript
test.concurrent.only.each`
  a    | b    | expected
  ${1} | ${1} | ${2}
  ${1} | ${2} | ${3}
  ${2} | ${1} | ${3}
`("returns $expected when $a is added $b", async ({ a, b, expected }) => {
  expect(a + b).toBe(expected);
});

test("will not be ran", () => {
  expect(1 / 0).toBe(Infinity);
});
```

### `test.concurrent.skip.each(table)(name, fn)`

别名：`it.concurrent.skip.each(table)(name, fn)`

如果想停止运行一组异步数据驱动的测试，可以使用 `it.concurrent.skip.each`。

`it.concurrent.skip.each` 提供两个 API：

**`test.concurrent.skip.each(table)(name, fn)`**

```javascript
test.concurrent.skip.each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
])(".add(%i, %i)", async (a, b, expected) => {
  expect(a + b).toBe(expected); // 不会执行
});

test("will be ran", () => {
  expect(1 / 0).toBe(Infinity);
});
```

**`` test.concurrent.skip.each`table`(name, fn) ``**

```javascript
test.concurrent.skip.each`
  a    | b    | expected
  ${1} | ${1} | ${2}
  ${1} | ${2} | ${3}
  ${2} | ${1} | ${3}
`("returns $expected when $a is added $b", async ({ a, b, expected }) => {
  expect(a + b).toBe(expected); // 不会执行
});

test("will be ran", () => {
  expect(1 / 0).toBe(Infinity);
});
```

### `test.each(table)(name, fn, timeout)`

别名：`it.each(table)(name, fn)` 和 `it.each`table`(name, fn)`

如果你不断用不同的数据重复相同的测试，请使用 `test.each`。`test.each` 允许你编写一次测试并传入数据。

`test.each` 提供两个 API：

**1. `test.each(table)(name, fn, timeout)`**

- `table`: `Array` 的数组，其参数传递到每行的 `fn` 中。
  - 注意如果传入一个一维数组，它会在内部映射到一个表，即 `[1, 2, 3] -> [[1], [2], [3]]`。
- `name`: 测试套件的标题
  - 通过使用 [`printf 格式`](https://nodejs.org/api/util.html#util_util_format_format_args) 按位置注入参数来生成唯一的测试标题：
    - `%p` - [pretty-format](https://www.npmjs.com/package/pretty-format)
    - `%s` - String
    - `%d` - Number
    - `%i` - Integer
    - `%f` - 浮点值
    - `%j` - JSON
    - `%o` - Object
    - `%#` - 测试用例索引
    - `%%` - 相当于单个百分号 ('%')。这不消耗参数。
  - 或者通过使用 `$variable` 注入测试用例对象的属性来生成唯一的测试标题
    - 要注入嵌套对象值，可以提供一个 keyPath，即 `$variable.path.to.value`
    - 可以使用 `$#` 注入测试用例的索引
    - 除了 `%%` 之外，不能将 `$variable` 与 `printf 格式` 一起使用
- `fn`: `Function` 要运行的测试套件，这将接收每一行中的参数作为函数参数的函数。

举例：

```javascript
test.each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
])(".add(%i, %i)", (a, b, expected) => {
  expect(a + b).toBe(expected);
});
```

```javascript
test.each([
  { a: 1, b: 1, expected: 2 },
  { a: 1, b: 2, expected: 3 },
  { a: 2, b: 1, expected: 3 },
])(".add($a, $b)", ({ a, b, expected }) => {
  expect(a + b).toBe(expected);
});
```

**2. `` test.each`table`(name, fn, timeout) ``**

- `table`: 使用标记模板文字
  - 变量名列标题的第一行用 `|` 分隔
  - 使用 `${value}` 语法作为模板文字表达式提供的一个或多个后续数据行
- `name`: `String` 测试套件的标题，使用 `$variable` 从标记的模板表达式中将测试数据注入套件标题，并使用 `$#` 作为行的索引。
  - 要注入嵌套对象值，你可以提供一个 `keyPath`，即 `$variable.path.to.value`

举例：

```javascript
test.each`
  a    | b    | expected
  ${1} | ${1} | ${2}
  ${1} | ${2} | ${3}
  ${2} | ${1} | ${3}
`("returns $expected when $a is added $b", ({ a, b, expected }) => {
  expect(a + b).toBe(expected);
});
```

### `test.only(name, fn, timeout)`

别名：`it.only(name, fn, timeout)` 和 `fit(name, fn, timeout)`

当你调试大型测试文件时，你通常只想运行测试的子集。你可以使用 `.only` 指定哪些测试是你要在该测试文件中运行的唯一测试。

举个例子，假设运行了以下测试：

```javascript
test.only("it is raining", () => {
  expect(inchesOfRain()).toBeGreaterThan(0);
});

test("it is not snowing", () => {
  // 不会执行
  expect(inchesOfSnow()).toBe(0);
});
```

这里只会执行“it is raining”，因为它使用了 `test.only`

通常情况下，你不会使用 `test.only` 将代码推到主干分支中 - 你使用它进行调试，并在修复损坏的测试后将其删除。

### `test.only.each(table)(name, fn)`

别名：`it.only.each(table)(name, fn)`, `fit.each(table)(name, fn)`, `` it.only.each`table`(name, fn) `` 和 `` fit.each`table`(name, fn) ``

如果你只想运行具有不同测试数据的特定测试，可以使用 `test.only.each`

`test.only.each` 提供两个 API：

**`test.only.each(table)(name, fn)`**

```javascript
test.only.each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
])(".add(%i, %i)", (a, b, expected) => {
  expect(a + b).toBe(expected);
});

test("will not be ran", () => {
  expect(1 / 0).toBe(Infinity);
});
```

**`` test.only.each`table`(name, fn) ``**

```javascript
test.only.each`
  a    | b    | expected
  ${1} | ${1} | ${2}
  ${1} | ${2} | ${3}
  ${2} | ${1} | ${3}
`("returns $expected when $a is added $b", ({ a, b, expected }) => {
  expect(a + b).toBe(expected);
});

test("will not be ran", () => {
  expect(1 / 0).toBe(Infinity);
});
```

### `test.skip(name, fn)`

别名：`it.skip(name, fn)`, `xit(name, fn)` 和 `xtest(name, fn)`

当你维护大型代码库时，你有时可能会发现某个测试由于某种原因暂时中断。如果你想跳过运行此测试，但又不想删除此代码，则可以使用 `test.skip` 指定要跳过的一些测试。

举个例子，假设有这些测试：

```javascript
test("it is raining", () => {
  expect(inchesOfRain()).toBeGreaterThan(0);
});

test.skip("it is not snowing", () => {
  // 不会执行
  expect(inchesOfSnow()).toBe(0);
});
```

只会执行“it is raining”，因为其它的测试使用了 `test.skip`

你可以将测试注释掉，但使用 `test.skip` 通常会更好一些，因为它会保持缩进和语法突出显示。

### `test.skip.each(table)(name, fn)`

别名：`it.skip.each(table)(name, fn)`, `xit.each(table)(name, fn)`, `xtest.each(table)(name, fn)`, `` it.skip.each`table`(name, fn) ``, `` xit.each`table`(name, fn) `` 和 `` xtest.each`table`(name, fn) ``

如果你想停止运行一组数据驱动的测试，可以使用 `test.skip.each`

`test.skip.each` 提供两个 API：

**`test.skip.each(table)(name, fn)`**

```javascript
test.skip.each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
])(".add(%i, %i)", (a, b, expected) => {
  expect(a + b).toBe(expected); // 不会运行
});

test("will be ran", () => {
  expect(1 / 0).toBe(Infinity);
});
```

**`` test.skip.each`table`(name, fn) ``**

```javascript
test.skip.each`
  a    | b    | expected
  ${1} | ${1} | ${2}
  ${1} | ${2} | ${3}
  ${2} | ${1} | ${3}
`("returns $expected when $a is added $b", ({ a, b, expected }) => {
  expect(a + b).toBe(expected); // 不会执行
});

test("will be ran", () => {
  expect(1 / 0).toBe(Infinity);
});
```

### `test.todo(name)`

别名：`it.todo(name)`

当你计划编写测试时，使用 `test.todo`。这些测试将在最后的摘要输出中突出显示，以便你知道还需要执行多少测试。

注意：如果你提供了一个测试回调函数，那么 `test.todo` 会抛出一个错误。如果你已经实现了测试并且它已损坏且不希望它运行，那么请改用 `test.skip`。

`name`: 计划测试的标题。

举例：

```javascript
const add = (a, b) => a + b;

test.todo("add should be associative");
```

[下一章-Expect](/apis/Expect.md)
