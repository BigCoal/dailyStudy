# 理解 TypeScript 中 any 和 unknown

在我们的项目中实现 TypeScript 时，我们努力写出最好的类型。我们可能经常觉得使用 any 类型违背了 TypeScript 的目的，确实如此。还有其他一些类型值得了解，我们可能会发现它们在尝试不使用 any 时很有用，比如 unknown 。

## **Any**

any 类型类似于纯 JavaScript 的工作方式。我们有时可能需要描述一个我们根本不知道类型的变量。

```js
let uncertain: any = 'Hello world'!;
uncertain = 5;
uncertain = { hello: () => 'Hello world!' };
```

在 TypeScript 中，任何东西可以赋值给 any 。它通常被称为 top type 。

以这种方式编写代码似乎不太合适。它是不可预测的，很难维持。您可能觉得在处理一些没有为其创建类型的第三方库时需要使用它，而且您不确定它们是如何工作的。另外，使用 any 可以将 TypeScript 添加到现有的 JavaScript 代码库中。

> 译者: any 和 unknown 的最大区别是, unknown 是 top type (任何类型都是它的 subtype) , 而 any 即是 top type, 又是 bottom type (它是任何类型的 subtype ) , 这导致 any 基本上就是放弃了任何类型检查.

通过使用 any，我们破坏了 TypeScript 的能力引起了一些麻烦。没有强制的类型检查，可能会给您带来一些麻烦。

```js
const uncertain: any = "Hello world!";
uncertain.hello();
```

好了，一个错误已经准备好发布到生产环境了! 上面的例子很生动，但它可能更微妙。比如下面:

```js
const dog: any = {
  name: "Fluffy",
  sayHello: () => "woof woof",
};

dog.hello();
```

这样子, 一个更细微的错误也发布到生产环境了.

## **Unknown**

TypeScript 3.0 中引入的 unknown 类型也被认为是 top type ，但它更安全。与 any 一样，所有类型都可以分配给 unknown。

```js
let uncertain: unknown = 'Hello'!;
uncertain = 12;
uncertain = { hello: () => 'Hello!' };
```

我们只能将 unknown 类型的变量赋值给 any 和 unknown。

```js
let uncertain: unknown = 'Hello'!;
let notSure: any = uncertain;
```

它确实在很多方面不同于 any 类型。如果不缩小类型，就无法对 unknown 类型执行任何操作。

```js
function getDog() {
  return "22";
}

const dog: unknown = getDog();
dog.hello(); //Object is of type 'unknown'
```

**使用类型断言缩小未知范围.**

上述机制具有很强的预防性，但对我们的限制过于有限。要对未知类型执行某些操作，首先需要使用类型断言来缩小范围。

```js
const getDogName = () => {
 let x: unknown;
 return x;
};

const dogName = getDogName();
console.log((dogName as string).toLowerCase());
```

在上面的代码中，我们强制 TypeScript 编译器相信我们知道自己在做什么。

以上的一个重要缺点是它只是一个假设。它没有运行时效果，也不能防止我们在不小心的情况下造成错误。 比如下面的代码, 他实际上是错误的, 但却可以通过 typescript 的检测.

```js
const number: unknown = 15;
(number as string).toLowerCase();
```

TypeScript 编译器接收到我们的数字是一个字符串的假设，因此它并不反对这样处理它。

**使用类型收缩**

一种更类型安全的缩小未知类型的方法是使用 类型收缩 。TypeScript 编译器会分析我们的代码，并找出一个更窄的类型。

```js
const dogName = getDogName();
if (typeof dogName === "string") {
  console.log(dogName.toLowerCase());
}
```

在上面的代码中，我们在运行时检查了 dogName 变量的类型。因此，我们可以确保只在 dogName 是变量时调用 toLowerCase 函数。

除了使用 typeof，我们还可以使用 instanceof 来缩小变量的类型。

```js
type getAnimal = () => unknown;

const dog = getAnimal();

if (dog instanceof Dog) {
  console.log(dog.name.toLowerCase());
}
```

在上面的代码中，我们确保只有在变量是某个原型的实例时才调用 dog.name.toLowerCase。TypeScript 编译器理解这一点，并假设类型。

关于类型收缩, 更多的可以看 [typescript 最佳实践](https://link.zhihu.com/?target=https%3A//mp.weixin.qq.com/s/Fi7RINtu71NuXM3GUmbiQQ)

## 总结

在本文中，我们已经讨论了 any 和 unknown 之间的区别。从以上比较中得出的结论是，unknown 类型要安全得多，因为它迫使我们执行额外的类型检查来对变量执行操作。
