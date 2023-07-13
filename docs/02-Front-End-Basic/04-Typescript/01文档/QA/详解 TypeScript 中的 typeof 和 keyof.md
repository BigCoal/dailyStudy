# 详解 TypeScript 中的 typeof 和 keyof

`typeof`和`keyof`是 TypeScript 中常用的两个操作符，本文会对这两个操作符的基本概念和实际应用做一个详细的阐述。

## 字面量类型

在了解`typeof`和`keyof`之前，我们首先需要了解什么是字面量类型以及联合字面量类型。

TypeScript 中的字面量类型是更具体的`string`、`number`或`boolean`类型，它可以被这样定义：

```
type Greeting = 'hello';
```

这意味着类型为`Greeting`的变量只能有一个字符串值`'hello'`：

```
const foo: Greeting = 'hello';
const bar: Greeting = 'world'; // Type '"world"' is not assignable to type '"hello"'.ts(2322)
```

字面量类型本身可能并不是很实用，但是它可以和联合类型一起组合出强大的抽象，也就是我们说的联合字面量类型：

```
type Greeting = 'hello' | 'world';

const foo: Greeting = 'hello';
const bar: Greeting = 'world';
```

## typeof

`typeof`操作符用于获取变量的类型，因此操作符后面接的始终是一个变量。

### 基本用法

假如我们在定义类型之前已经有了对象`obj`，就可以用`typeof`来定义一个类型。

```
const p = {
  name: 'CJ',
  age: 18
};

type Person = typeof p;

// 等同于
type Person = {
  name: string;
  age: number;
}
```

### 从嵌套对象获取类型

如果对象是一个嵌套的对象，`typeof`也能够正确获取到它们的类型。

```
const p = {
  name: 'CJ',
  age: 18,
  address: {
    city: 'SH'
  }
};

type Person = typeof p;

// 相当于
type Person = {
  name: string;
  age: number;
  address: {
    city: string;
  };
};
```

### 从数组获取类型

假如我们有一个字符串数组，可以把数组的所有元素组合成一个新的类型：

```
const data = ['hello', 'world'] as const;
type Greeting = typeof data[number];

// type Greeting = "hello" | "world"
```

> `as const` 是 TypeScript 3.4 中新增的一个特性，具体的可以看[这里](https://link.juejin.cn?target=https%3A%2F%2Fwww.typescriptlang.org%2Fdocs%2Fhandbook%2Frelease-notes%2Ftypescript-3-4.html%23const-assertions "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions")

甚至我们可以从对象数组中获取我们想要的类型：

```
export const locales = [
  {
    locale: 'se',
    language: 'Swedish'
  },
  {
    locale: 'en',
    language: 'English'
  }
] as const;

type Locale = typeof locales[number]['locale'];

// type Locale = "se" | "en"
```

## keyof

`keyof`操作符后面接一个类型，生成由`string`或者`number`组成的联合字面量类型。

### 基本用法

一个最基本的`keyof`用法如下，我们通过`keyof Person`得到一个`PersonKeys`类型，它是一个联合字面量类型，包含了`Person`所有的属性。所以我们在对类型为`PersonKeys`的变量赋值时，只能赋值为`'name'`或者`'age'`。

```
type Person = {
  name: string;
  age: number;
};

type PersonKeys = keyof Person;

const key1: PersonKeys = 'name';
const key2: PersonKeys = 'age';
// Type '"addr"' is not assignable to type 'keyof Person'.
const key3: PersonKeys = 'addr';
```

### 与泛型一起使用

我们希望获取一个对象给定属性名的值，为此，我们需要确保我们不会获取  `obj`  上不存在的属性。所以我们在两个类型之间建立一个约束：

```
export const getProperty = <T, K extends keyof T>(obj: T, key: K) => {
  return obj[key];
};

const person = {
  name: 'CJ',
  age: 18
};

console.log(getProperty(person, 'name'));
// Argument of type '"addr"' is not assignable to parameter of type '"name" | "age"'.
console.log(getProperty(person, 'addr'));
```

`keyof T`返回`T`的联合字面量类型，`extends`用来对`K`进行约束，表示`K`为联合字面量类型中的一个。

由于我们使用了类型约束，这样我们在调用`getProperty`的时候，第二个参数`key`就必须为第一个参数`obj`中的属性。在尝试传入不存在的`addr`属性时 TypeScript 就会报错。

### 与映射类型一起使用

`keyof`运算符的另一个常见用途是映射类型，通过遍历键将现有类型转换为新类型。

下面是如何使用`OptionsFlags`映射类型转换`FeatureFlags`类型的示例。

```
type OptionsFlags<T> = {
  [Property in keyof T]: boolean;
};
// use the OptionsFlags
type FeatureFlags = {
  darkMode: () => void;
  newUserProfile: () => void;
};

type FeatureOptions = OptionsFlags<FeatureFlags>;
// 相当于
// type FeatureOptions = {
//   darkMode: boolean;
//   newUserProfile: boolean;
// };
```

在这个例子中，`OptionFlags`被定义为类型参数为`T`的一个泛型，`[Property in keyof T]`表示`T`所有属性名的迭代，方括号是索引签名语法。所以，`OptionFlags`包含`T`类型的所有属性，并将它们的值重新映射为`boolean`型。

### 与条件映射类型一起使用

在上一个例子中，我们把所有属性都映射成了`boolean`型。我们还可以更进一步，使用条件类型来进行类型映射。

在下面的例子中，我们只映射非函数属性为`boolean`型。

```
type OptionsFlags<T> = {
  [Property in keyof T]: T[Property] extends Function ? T[Property] : boolean;
};

type Features = {
  darkMode: () => void;
  newUserProfile: () => void;
  userManagement: string;
  resetPassword: string;
};

type FeatureOptions = OptionsFlags<Features>;
// 相当于
// type FeatureOptions = {
//   darkMode: () => void;
//   newUserProfile: () => void;
//   userManagement: boolean;
//   resetPassword: boolean;
// };
```

### 与 utility types 一起使用

TypeScript 内置了一些映射类型，叫做`utility types`。`Record`就是其中之一，为了理解`Record`类型如何工作，我们来看一下它的定义：

```
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```

可以看到，`Record`只是将所有属性映射为`T`类型之后返回的一个新类型。所以我们可以很容易通过`Record`实现上面映射类型中的例子。

```
type FeatureOptions = Record<keyof FeatureFlags, boolean>;
```

另外一个常见的用到`keyof`的类型是`Pick`。它允许从一个对象类型中选择一个或多个属性，并创建一个新类型。

```
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```

## 总结

本篇文章到这里就结束了，主要介绍了`typeof`和`keyof`的一些常见的用法。在 TypeScript 的类型系统中，如果我们恰当地使用这两个操作符，可以帮助我们构造简洁并且受约束的类型，来提高我们代码的类型安全性。
