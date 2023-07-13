# 详解 TypeScript 中的 const 断言

在我看来，`const assertions` 是 TypeScript 3.4 的杀手级新功能，正如我稍后将要解释的，我们可以用这个新功能省略很多繁琐的类型声明。

## 介绍

```
const x = { text: "hello" } as const;
```

[官方文档](https://link.juejin.cn?target=https%3A%2F%2Fwww.typescriptlang.org%2Fdocs%2Fhandbook%2Frelease-notes%2Ftypescript-3-4.html "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html")中给出了这样的解释：

> TypeScript 3.4 引入了一个名为 const 断言的字面值的新构造。它的语法是一个类型断言，用 const 代替类型名称（例如 `123 as const`）断言构造新的文字表达式时，我们可以向语言发出以下信号：
>
> 该表达式中的字面类型不应被扩展（例如：不能从 “hello” 转换为字符串）
>
> 对象字面量获取只读属性
>
> 数组文字成为只读元组

感觉有点枯燥，还有点混乱。让我们来各个击破。

## 没有类型扩展的字面类型

并不是每个人都知道类型扩展，并且由于某些意外行为而首次发现它时都会觉得意外。

当我们使用关键字 `const` 声明一个字面量时，类型是等号右边的文字，例如：

```
const x = 'x'; // x has the type 'x'
```

`const` 关键字确保不会发生对变量进行重新分配，并且只保证该字面量的严格类型。

但是如果我们用 `let` 而不是 `const`， 那么该变量会被重新分配，并且类型会被扩展为字符串类型，如下所示：

```
let x = 'x'; // x has the type string;
```

以下是两个不同的声明：

```
const x = 'x'; // has the type 'x'
let y = 'x';   // has the type string
```

`y` 被扩展为更通用的类型，并允许将其重新分配给该类型的其他值，而变量 `x` 只能具有 `'x'`的值。

用新的 `const` 功能，我可以这样做：

```
let y = 'x' as const; // y has type 'x'`
```

## 对象字面量获取只读属性

在 Typescript 3.4 之前，类型扩展发生在对象字面量中：

```
const action = { type: 'INCREMENT', } // has type { type: string }
```

即使我们将 `action` 声明为 `const`，仍然可以重新分配 `type` 属性，因此，该属性被扩展成了字符串类型。

这看上去令人觉得不是那么*有用*，所以让我们换一个更好的例子。

如果你熟悉 [Redux](https://link.juejin.cn?target=https%3A%2F%2Fredux.js.org%2F "https://redux.js.org/")，就可能会发现上面的 `action` 变量可以用作 Redux action。如果你不知道 Redux 我来简单解释一下，Redux 是一个全局不可变的 state 存储。通过向所谓的 `reducers` 发送动作来修改状态。 reducers 是纯函数，它在调度每个 action 后返回全局状态的新更新版本，以反映 acion 中指定的修改。

在 Redux 中，标准做法是从名为 [action creators](https://link.juejin.cn?target=https%3A%2F%2Fread.reduxbook.com%2Fmarkdown%2Fpart1%2F04-action-creators.html "https://read.reduxbook.com/markdown/part1/04-action-creators.html") 的函数创建操作。 action creators 只是纯函数，它返回 Redux 操作对象字面量以及提供给函数的所有参数。

用一个例子可以更好地说明这一点。应用程序可能需要一个全局 `count` 属性，为了更新这个 `count` 属性，我们可以调度类型为 `'SET_COUNT'` 的动作，它只是将全局 `count` 属性设置为一个新的值，这是一个字面对象属性。这个 action 的 action creator 将是一个函数，它接受一个数字作为参数，并返回一个具有属性为 `type`、值为 `SET_COUNT` 和类型为 `number` 的 payload 属性的对象，它将指定 `count` 的新值：

```
const setCount = (n: number) => {
  return {
    type: 'SET_COUNT',
    payload: n,
  }
}

const action = setCount(3)
// action has type
// { type: string, payload: number }
```

从上面显示的代码中可以看出，`type` 属性已经被扩展为 `string` 类型而不再是 `SET_COUNT`。这不是很安全的类型，我们可以保证的是 `type` 是一个字符串。 redux 中的每个 action 都有一个 `type` 属性，它是一个字符串。

这不是很好，如果我们想要利用 type 属性上的[可区分联合](https://link.juejin.cn?target=https%3A%2F%2Fbasarat.gitbooks.io%2Ftypescript%2Fdocs%2Ftypes%2Fdiscriminated-unions.html "https://basarat.gitbooks.io/typescript/docs/types/discriminated-unions.html")的话，那么在 TypeScript 3.4 之前，则需要为每个 action 声明一个接口或类型：

```
interface SetCount {
  type: 'SET_COUNT';
  payload: number;
}

const setCount = (n: number): SetCount => {
  return {
    type: 'SET_COUNT',
    payload: n,
  }
}

const action = setCount(3)
// action has type SetCount
```

这确实增加了编写 Redux action 和 reducers 的负担，但我们可以通过添加一个 `const assertion` 来解决这个问题：

```
const setCount = (n: number) => {
  return <const>{
    type: 'SET_COUNT',
    payload: n
  }
}

const action = setCount(3);
// action has type
//  { readonly type: "SET_COUNT"; readonly payload: number };
```

你会注意到从 `setCount` 推断的类型已经在每个属性中附加了 `readonly` 修饰符，正如文档的项目符号所述。

这就是所发生的事情：

```
{
  readonly type: "SET_COUNT";
  readonly payload: number
};
```

action 中的每个字面量都被添加了 `readonly` 修饰符。

在 redux 中，我们创建了一个接受 action 的联合，reducer 函数可以通过这种操作来获得良好的类型安全性。在 TypeScript 3.4 之前，我们会这样做：

```
interface SetCount {
  type: 'SET_COUNT';
  payload: number;
}

interface ResetCount {
  type: 'RESET_COUNT';
}

const setCount = (n: number): SetCount => {
  return {
    type: 'SET_COUNT',
    payload: n,
  }
}

const resetCount = (): ResetCount => {
  return {
    type: 'RESET_COUNT',
  }
}

type CountActions = SetCount | ResetCount
```

我们创建了两个接口 `RESET_COUNT` 和 `SET_COUNT` 来对两个 `resetCount` 和 `setCount` 的返回类型进行归类。

`CountActions` 是这两个接口的联合。

使用 `const assertions`，我们可以通过使用 `const`、 [`ReturnType`](https://link.juejin.cn?target=https%3A%2F%2Fdev.to%2Fbusypeoples%2Fnotes-on-typescript-returntype-3m5a "https://dev.to/busypeoples/notes-on-typescript-returntype-3m5a") 和 `typeof` 的组合来消除声明这些接口的需要：

```
const setCount = (n: number) => {
  return <const>{
    type: 'SET_COUNT',
    payload: n
  }
}

const resetCount = () => {
  return <const>{
    type: 'RESET_COUNT'
  }
}

type CountActions = ReturnType<typeof setCount> | ReturnType<typeof resetCount>;
```

我们从 action creator 函数 `setCount` 和 `resetCount` 的返回类型中推断出一个很好的 action 联合。

## 数组字面量成为只读元组

在 TypeScript 3.4 之前，声明一个字面量数组将被扩展并且可以修改。

使用 const，我们可以将字面量锁定为其显式值，也不允许修改。

如果我们有一个用于设置小时数组的 redux action 类型，它可能看起来像这样：

```
const action = {
  type: 'SET_HOURS',
  payload: [8, 12, 5, 8],
}
//  { type: string; payload: number[]; }

action.payload.push(12) // no error
```

在 TypeScript 3.4 之前，扩展会使上述操作的字面量属性更加通用，因为它们是可以修改的。

如果我们将 `const` 应用于对象字面量，那么就可以很好地控制所有内容：

```
const action = <const>{
  type: 'SET_HOURS',
  payload: [8, 12, 5, 8]
}

// {
//  readonly type: "SET_HOURS";
//  readonly payload: readonly [8, 12, 5, 8];
// }

action.payload.push(12);  // error - Property 'push' does not exist on type 'readonly [8, 12, 5, 8]'.
```

这里发生的事情恰恰是文档的要点：

payload 数组确实是 [8,12,5,8] 的 “只读” 元组（不过我并没有从文档中看到这方面的说明）。

## 结论

我用以下代码总结以上所有内容：

```
let obj = {
  x: 10,
  y: [20, 30],
  z: {
    a:
      {  b: 42 }
  }
} as const;
```

对应于：

```
let obj: {
  readonly x: 10;
  readonly y: readonly [20, 30];
  readonly z: {
    readonly a: {
      readonly b: 42;
    };
  };
};
```

在这里，我可以推断出类型，而不是去编写多余的样板类型。这对于 redux 特别有用。
