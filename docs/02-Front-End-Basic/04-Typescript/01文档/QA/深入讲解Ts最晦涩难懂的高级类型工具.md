# 深入讲解 Ts 最晦涩难懂的高级类型工具

本文基本分为三部分：

- 第一部分讲解一些基本的关键词的特性（比如索引查询、索引访问、映射、`extends`等），但是该部分更多的讲解小伙伴们不清晰的一些特性，而基本功能则不再赘述。更多的关键词及技巧将包含在后续的例子演示中再具体讲述；
- 第二部分讲解 Ts 内置的类型工具以及实现原理，比如`Pick`、`Omit`等；
- 第三部分讲解自定义的工具类型，该部分也是最难的部分，将通过一些复杂的类型工具示例进行逐步剖析，对于其中的晦涩的地方以及涉及的知识点逐步讲解。此部分也会包含大量 Ts 类型工具的编程技巧，也希望通过此部分的讲解，小伙伴的 Ts 功底可以进一步提升！

## 第一部分 前置内容

### `keyof` 索引查询

对应任何类型`T`,`keyof T`的结果为该类型上所有公有属性 key 的联合：

```ts
interface Eg1 {
  name: string;
  readonly age: number;
}
// T1的类型实则是name | age
type T1 = keyof Eg1;

class Eg2 {
  private name: string;
  public readonly age: number;
  protected home: string;
}
// T2实则被约束为 age
// 而name和home不是公有属性，所以不能被keyof获取到
type T2 = keyof Eg2;
```

- `T[K]` 索引访问

```ts
interface Eg1 {
  name: string;
  readonly age: number;
}
// string
type V1 = Eg1["name"];
// string | number
type V2 = Eg1["name" | "age"];
// any
type V2 = Eg1["name" | "age2222"];
// string | number
type V3 = Eg1[keyof Eg1];
```

<strong style='background:yellow'>
`T[keyof T]`的方式，可以获取到`T`所有`key`的类型组成的联合类型； `T[keyof K]`的方式，获取到的是`T`中的`key`且同时存在于`K`时的类型组成的联合类型； 注意：如果`[]`中的 key 有不存在 T 中的，则是 any；因为 ts 也不知道该 key 最终是什么类型，所以是 any；且也会报错；
</strong>

- `&` 交叉类型注意点

交叉类型取的多个类型的并集，但是如果相同`key`但是类型不同，则该`key`为`never`。

```ts
interface Eg1 {
  name: string;
  age: number;
}

interface Eg2 {
  color: string;
  age: string;
}

/**
 * T的类型为 {name: string; age: never; color: string}
 * 注意，age因为Eg1和Eg2中的类型不一致，所以交叉后age的类型是never
 */
type T = Eg1 & Eg2;
// 可通过如下示例验证
const val: T = {
  name: "",
  color: "",
  age: (function a() {
    throw Error();
  })(),
};
```

### extends 关键词特性（重点）

- 用于接口，表示继承

```ts
interface T1 {
  name: string;
}

interface T2 {
  sex: number;
}

/**
 * @example
 * T3 = {name: string, sex: number, age: number}
 */
interface T3 extends T1, T2 {
  age: number;
}
```

> 如果继承过程中有属性的类型不相同，则会抛出错误

注意，接口支持多重继承，语法为逗号隔开。如果是 type 实现继承，则可以使用交叉类型`type A = B & C & D`。

- 表示条件类型，可用于条件判断

表示条件判断，如果前面的条件满足，则返回问号后的第一个参数，否则第二个。类似于 js 的三元运算。

```ts
/**
 * @example
 * type A1 = 1
 */
type A1 = "x" extends "x" ? 1 : 2;

/**
 * @example
 * type A2 = 2
 */
type A2 = "x" | "y" extends "x" ? 1 : 2;

/**
 * @example
 * type A3 = 1 | 2
 */
type P<T> = T extends "x" ? 1 : 2;
type A3 = P<"x" | "y">;
```

提问：为什么`A2`和`A3`的值不一样？

- 如果用于简单的条件判断，则是直接判断前面的类型是否可分配给后面的类型
- 若`extends`前面的类型是泛型，且泛型传入的是联合类型时，则会依次判断该联合类型的所有子类型是否可分配给 extends 后面的类型（是一个分发的过程）。

**总结，就是`extends`前面的参数为联合类型时则会分解（依次遍历所有的子类型进行条件判断）联合类型进行判断。然后将最终的结果组成新的联合类型。**

- 阻止 extends 关键词对于联合类型的分发特性

如果不想被分解（分发），做法也很简单，可以通过简单的元组类型包裹以下：

```ts
type P<T> = [T] extends ["x"] ? 1 : 2;
/**
 * type A4 = 2;
 */
type A4 = P<"x" | "y">;
```

[条件类型的分布式特性文档](https://link.juejin.cn?target=https%3A%2F%2Fwww.typescriptlang.org%2Fdocs%2Fhandbook%2F2%2Fconditional-types.html%23distributive-conditional-types "https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types")

### 类型兼容性

> 集合论中，如果一个集合的所有元素在集合 B 中都存在，则 A 是 B 的子集；
>
> 类型系统中，如果一个类型的属性更具体，则该类型是子类型。（因为属性更少则说明该类型约束的更宽泛，是父类型）

**因此，我们可以得出基本的结论：子类型比父类型更加具体, 父类型比子类型更宽泛。** 下面我们也将基于类型的可复制性（可分配性）、协变、逆变、双向协变等进行进一步的讲解。

- 可赋值性

```ts
interface Animal {
  name: string;
}

interface Dog extends Animal {
  break(): void;
}

let a: Animal;
let b: Dog;

// 可以赋值，子类型更佳具体，可以赋值给更佳宽泛的父类型
a = b;
// 反过来不行
b = a;
```

- 可赋值性在联合类型中的特性

```ts
type A = 1 | 2 | 3;
type B = 2 | 3;
let a: A;
let b: B;

// 不可赋值
b = a;
// 可以赋值
a = b;
```

是不是`A`的类型更多，`A`就是子类型呢？恰恰相反，`A`此处类型更多但是其表达的类型更宽泛，所以`A`是父类型，`B`是子类型。

因此`b = a`不成立（父类型不能赋值给子类型），而`a = b`成立（子类型可以赋值给父类型）。

- 协变

```ts
interface Animal {
  name: string;
}

interface Dog extends Animal {
  break(): void;
}

let Eg1: Animal;
let Eg2: Dog;
// 兼容，可以赋值
Eg1 = Eg2;

let Eg3: Array<Animal>;
let Eg4: Array<Dog>;
// 兼容，可以赋值
Eg3 = Eg4;
```

通过`Eg3`和`Eg4`来看，在`Animal`和`Dog`在变成数组后，`Array<Dog>`依旧可以赋值给`Array<Animal>`，因此对于`type MakeArray = Array<any>`来说就是协变的。

最后引用维基百科中的定义：

> <strong style='background:yellow'>
>  协变与逆变 (Covariance and contravariance) 是在计算机科学中，描述具有父 / 子型别关系的多个型别通过型别构造器、构造出的多个复杂型别之间是否有父 / 子型别关系的用语。</strong>

<strong style='background:yellow'>简单说就是，具有父子关系的多个类型，在通过某种构造关系构造成的新的类型，如果还具有父子关系则是协变的，而关系逆转了（子变父，父变子）就是逆变的。</strong>可能听起来有些抽象，下面我们将用更具体的例子进行演示说明：

- 逆变

```ts
interface Animal {
  name: string;
}

interface Dog extends Animal {
  break(): void;
}

type AnimalFn = (arg: Animal) => void;
type DogFn = (arg: Dog) => void;

let Eg1: AnimalFn;
let Eg2: DogFn;
// 不再可以赋值了，
// AnimalFn = DogFn不可以赋值了, Animal = Dog是可以的
Eg1 = Eg2;
// 反过来可以
Eg2 = Eg1;
```

理论上，`Animal = Dog`是类型安全的，那么`AnimalFn = DogFn`也应该类型安全才对，为什么 Ts 认为不安全呢？看下面的例子：

```ts
let animal: AnimalFn = (arg: Animal) => {};
let dog: DogFn = (arg: Dog) => {
  arg.break();
};

// 假设类型安全可以赋值
animal = dog;
// 那么animal在调用时约束的参数，缺少dog所需的参数，此时会导致错误
animal({ name: "cat" });
```

从这个例子看到，如果 dog 函数赋值给 animal 函数，那么 animal 函数在调用时，约束的是参数必须要为 Animal 类型（而不是 Dog），但是 animal 实际为 dog 的调用，此时就会出现错误。

因此，`Animal`和`Dog`在进行`type Fn<T> = (arg: T) => void`构造器构造后，父子关系逆转了，此时成为 “逆变”。

- 双向协变

<strong style='background:yellow'>在 TypeScript 中，由于灵活性等权衡，对于函数参数默认的处理是 双向协变 的。也就是既可以 animal = dog，也可以 dog = animal ,只有在 tsconfig 中配置 strictFunctionType:true 后才会严格按照 逆变 来约束赋值关系。</strong>

这是不稳定的，因为调用者可能传入了一个具有更精确类型信息的函数，但是调用这个传入的函数的时候却使用了不是那么精确的类型信息（典型的就是上述的逆变）。 但是实际上，这极少会发生错误，并且能够实现很多 JavaScript 里的常见模式：

```ts
// lib.dom.d.ts中EventListener的接口定义
interface EventListener {
  (evt: Event): void;
}
// 简化后的Event
interface Event {
  readonly target: EventTarget | null;
  preventDefault(): void;
}
// 简化合并后的MouseEvent
interface MouseEvent extends Event {
  readonly x: number;
  readonly y: number;
}

// 简化后的Window接口
interface Window {
  // 简化后的addEventListener
  addEventListener(type: string, listener: EventListener);
}

// 日常使用
window.addEventListener("click", (e: Event) => {});
window.addEventListener("mouseover", (e: MouseEvent) => {});
```

可以看到`Window`的`listener`函数要求参数是`Event`，但是日常使用时更多时候传入的是`Event`子类型。但是这里可以正常使用，正是其默认行为是双向协变的原因。可以通过`tsconfig.js`中修改`strictFunctionType`属性来严格控制协变和逆变。

**敲重点！！！敲重点！！！敲重点！！！**

`infer`关键词的功能暂时先不做太详细的说明了，主要是用于`extends`的条件类型中让 Ts 自己推到类型，具体的可以查阅官网。但是关于`infer`的一些容易让人忽略但是非常重要的特性，这里必须要提及一下：

- `infer`推导的名称相同并且都处于**逆变**的位置，则推导的结果将会是**交叉类型**。

```ts
type Bar<T> = T extends {
  a: (x: infer U) => void;
  b: (x: infer U) => void;
}
  ? U
  : never;

// type T1 = string
type T1 = Bar<{ a: (x: string) => void; b: (x: string) => void }>;

// type T2 = never
type T2 = Bar<{ a: (x: string) => void; b: (x: number) => void }>;
```

- `infer`推导的名称相同并且都处于**协变**的位置，则推导的结果将会是**联合类型**。

```ts
type Foo<T> = T extends {
  a: infer U;
  b: infer U;
}
  ? U
  : never;

// type T1 = string
type T1 = Foo<{ a: string; b: string }>;

// type T2 = string | number
type T2 = Foo<{ a: string; b: number }>;
```

[inter 与协变逆变的参考文档点击这里](https://link.juejin.cn?target=https%3A%2F%2Fwww.typescriptlang.org%2Fdocs%2Fhandbook%2Frelease-notes%2Ftypescript-2-8.html%23type-inference-in-conditional-types "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#type-inference-in-conditional-types")

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ceedd42d490435688bf9c236a4f19ad~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

## 第二部分 Ts 内置类型工具原理解析

### Partial 实现原理解析

`Partial<T>`将`T`的所有属性变成可选的。

```ts
/**
 * 核心实现就是通过映射类型遍历T上所有的属性，
 * 然后将每个属性设置为可选属性
 */
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

- `[P in keyof T]`通过映射类型，遍历`T`上的所有属性
- `?:`设置为属性为可选的
- `T[P]`设置类型为原来的类型

扩展一下，将制定的`key`变成可选类型:

```ts
/**
 * 主要通过K extends keyof T约束K必须为keyof T的子类型
 * keyof T得到的是T的所有key组成的联合类型
 */
type PartialOptional<T, K extends keyof T> = {
  [P in K]?: T[P];
};

/**
 * @example
 *     type Eg1 = { key1?: string; key2?: number }
 */
type Eg1 = PartialOptional<
  {
    key1: string;
    key2: number;
    key3: "";
  },
  "key1" | "key2"
>;
```

### Readonly 原理解析

```ts
/**
 * 主要实现是通过映射遍历所有key，
 * 然后给每个key增加一个readonly修饰符
 */
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

/**
 * @example
 * type Eg = {
 *   readonly key1: string;
 *   readonly key2: number;
 * }
 */
type Eg = Readonly<{
  key1: string;
  key2: number;
}>;
```

### Pick

挑选一组属性并组成一个新的类型。

```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

基本和上述同样的知识点，就不再赘述了。

### Record

构造一个`type`，`key`为联合类型中的每个子类型，类型为`T`。文字不好理解，先看例子：

```ts
/**
 * @example
 * type Eg1 = {
 *   a: { key1: string; };
 *   b: { key1: string; };
 * }
 * @desc 就是遍历第一个参数'a' | 'b'的每个子类型，然后将值设置为第二参数
 */
type Eg1 = Record<"a" | "b", { key1: string }>;
```

Record 具体实现：

```ts
/**
 * 核心实现就是遍历K，将值设置为T
 */
type Record<K extends keyof any, T> = {
  [P in K]: T;
};

/**
 * @example
 * type Eg2 = {a: B, b: B}
 */
interface A {
  a: string;
  b: number;
}
interface B {
  key1: number;
  key2: string;
}
type Eg2 = Record<keyof A, B>;
```

- <strong style='background:yellow'>值得注意的是`keyof any`得到的是`string | number | symbol`</strong>
- <strong style='background:yellow'>原因在于类型 key 的类型只能为`string | number | symbol`</strong>

**扩展: 同态与非同态。划重点！！！ 划重点！！！ 划重点！！！**

- `Partial`、`Readonly`和`Pick`都属于同态的，即其实现需要输入类型 T 来拷贝属性，因此属性修饰符（例如 readonly、?:）都会被拷贝。可从下面例子验证：

```ts
/**
 * @example
 * type Eg = {readonly a?: string}
 */
type Eg = Pick<{ readonly a?: string }, "a">;
```

从`Eg`的结果可以看到，Pick 在拷贝属性时，连带拷贝了`readonly`和`?:`的修饰符。

- `Record`是非同态的，不需要拷贝属性，因此不会拷贝属性修饰符

可能到这里就有小伙伴疑惑了，为什么`Pick`拷贝了属性，而`Record`没有拷贝？我们来对比一下其实现：

```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```

可以看到`Pick`的实现中，注意`P in K`（本质是`P in keyof T`），T 为输入的类型，而`keyof T`则遍历了输入类型；而`Record`的实现中，并没有遍历所有输入的类型，K 只是约束为`keyof any`的子类型即可。

最后再类比一下`Pick、Partial、readonly`这几个类型工具，无一例外，都是使用到了`keyof T`来辅助拷贝传入类型的属性。

### Exclude 原理解析

`Exclude<T, U>`提取存在于`T`，但不存在于`U`的类型组成的联合类型。

```ts
/**
 * 遍历T中的所有子类型，如果该子类型约束于U（存在于U、兼容于U），
 * 则返回never类型，否则返回该子类型
 */
type Exclude<T, U> = T extends U ? never : T;

/**
 * @example
 * type Eg = 'key1'
 */
type Eg = Exclude<"key1" | "key2", "key2">;
```

敲重点！！！

- `never`表示一个不存在的类型
- `never`与其他类型的联合后，是没有`never`的

```ts
/**
 * @example
 * type Eg2 = string | number
 */
type Eg2 = string | number | never;
```

因此上述`Eg`其实就等于`key1 | never`, 也就是`type Eg = key1`

### Extract

`Extract<T, U>`提取联合类型 T 和联合类型 U 的所有交集。

```ts
type Extract<T, U> = T extends U ? T : never;

/**
 * @example
 *  type Eg = 'key1'
 */
type Eg = Extract<"key1" | "key2", "key1">;
```

### Omit 原理解析

`Omit<T, K>`从类型`T`中剔除`K`中的所有属性。

```ts
/**
 * 利用Pick实现Omit
 */
type Omit = Pick<T, Exclude<keyof T, K>>;
```

- 换种思路想一下，其实现可以是利用`Pick`提取我们需要的 keys 组成的类型
- 因此也就是 `Omit = Pick<T, 我们需要的属性联合>`
- 而我们需要的属性联合就是，从 T 的属性联合中排出存在于联合类型 K 中的
- 因此也就是`Exclude<keyof T, K>`;

如果不利用 Pick 实现呢?

```ts
/**
 * 利用映射类型Omit
 */
type Omit2<T, K extends keyof any> = {
  [P in Exclude<keyof T, K>]: T[P];
};
```

- 其实现类似于 Pick 的原理实现
- 区别在于是遍历的我们需要的属性不一样
- 我们需要的属性和上面的例子一样，就是`Exclude<keyof T, K>`
- 因此，遍历就是`[P in Exclude<keyof T, K>]`

### Parameters 和 ReturnType

**Parameters 获取函数的参数类型，将每个参数类型放在一个元组中。**

```ts
/**
 * @desc 具体实现
 */
type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

/**
 * @example
 * type Eg = [arg1: string, arg2: number];
 */
type Eg = Parameters<(arg1: string, arg2: number) => void>;
```

- `Parameters`首先约束参数`T`必须是个函数类型，所以`(...args: any) => any>`替换成`Function`也是可以的
- 具体实现就是，判断`T`是否是函数类型，如果是则使用`inter P`让 ts 自己推导出函数的参数类型，并将推导的结果存到类型`P`上，否则就返回`never`；

**敲重点！！！敲重点！！！敲重点！！！**

- `infer`关键词作用是让 Ts 自己推导类型，并将推导结果存储在其参数绑定的类型上。Eg:`infer P` 就是将结果存在类型`P`上，供使用。
- `infer`关键词只能在`extends`条件类型上使用，不能在其他地方使用。

**再敲重点！！！再敲重点！！！再敲重点！！！**

- `type Eg = [arg1: string, arg2: number]`这是一个元组，但是和我们常见的元组`type tuple = [string, number]`。官网未提到该部分文档说明，其实可以把这个作为类似命名元组，或者具名元组的意思去理解。实质上没有什么特殊的作用，比如无法通过这个具名去取值不行的。但是从语义化的角度，个人觉得多了语义化的表达罢了。
- 定义元祖的可选项，只能是最后的选项

```ts
/**
 * 普通方式
 */
type Tuple1 = [string, number?];
const a: Tuple1 = ["aa", 11];
const a2: Tuple1 = ["aa"];

/**
 * 具名方式
 */
type Tuple2 = [name: string, age?: number];
const b: Tuple2 = ["aa", 11];
const b2: Tuple2 = ["aa"];
```

扩展：`infer`实现一个推导数组所有元素的类型：

```ts
/**
 * 约束参数T为数组类型，
 * 判断T是否为数组，如果是数组类型则推导数组元素的类型
 */
type FalttenArray<T extends Array<any>> = T extends Array<infer P> ? P : never;

/**
 * type Eg1 = number | string;
 */
type Eg1 = FalttenArray<[number, string]>;
/**
 * type Eg2 = 1 | 'asd';
 */
type Eg2 = FalttenArray<[1, "asd"]>;
```

**ReturnType 获取函数的返回值类型。**

```ts
/**
 * @desc ReturnType的实现其实和Parameters的基本一样
 * 无非是使用infer R的位置不一样。
 */
type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any;
```

### ConstructorParameters

`ConstructorParameters`可以获取类的构造函数的参数类型，存在一个元组中。

```ts
/**
 * 核心实现还是利用infer进行推导构造函数的参数类型
 */
type ConstructorParameters<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: infer P) => any ? P : never;

/**
 * @example
 * type Eg = string;
 */
interface ErrorConstructor {
  new (message?: string): Error;
  (message?: string): Error;
  readonly prototype: Error;
}
type Eg = ConstructorParameters<ErrorConstructor>;

/**
 * @example
 * type Eg2 = [name: string, sex?: number];
 */
class People {
  constructor(public name: string, sex?: number) {}
}
type Eg2 = ConstructorParameters<typeof People>;
```

- 首先约束参数`T`为拥有构造函数的类。注意这里有个`abstract`修饰符，等下会说明。
- 实现时，判断`T`是满足约束的类时，利用`infer P`自动推导构造函数的参数类型，并最终返回该类型。

**敲重点！！！敲重点！！！敲重点！！！**

那么疑问来了，为什么要对 T 要约束为`abstract`抽象类呢？看下面例子：

```ts
/**
 * 定义一个普通类
 */
class MyClass {}
/**
 * 定义一个抽象类
 */
abstract class MyAbstractClass {}

// 可以赋值
const c1: typeof MyClass = MyClass;
// 报错，无法将抽象构造函数类型分配给非抽象构造函数类型
const c2: typeof MyClass = MyAbstractClass;

// 可以赋值
const c3: typeof MyAbstractClass = MyClass;
// 可以赋值
const c4: typeof MyAbstractClass = MyAbstractClass;
```

由此看出，如果将类型定义为抽象类（抽象构造函数），则既可以赋值为抽象类，也可以赋值为普通类；而反之则不行。

**再敲重点！！！再敲重点！！！再敲重点！！！**

这里继续提问，直接使用类作为类型，和使用`typeof 类`作为类型，有什么区别呢？

```ts
/**
 * 定义一个类
 */
class People {
  name: number;
  age: number;
  constructor() {}
}

// p1可以正常赋值
const p1: People = new People();
// 等号后面的People报错，类型“typeof People”缺少类型“People”中的以下属性: name, age
const p2: People = People;

// p3报错，类型 "People" 中缺少属性 "prototype"，但类型 "typeof People" 中需要该属性
const p3: typeof People = new People();
// p4可以正常赋值
const p4: typeof People = People;
```

结论是这样的：

- 当把类直接作为类型时，该类型约束的是该类型必须是类的实例；即该类型获取的是该类上的实例属性和实例方法（也叫原型方法）；
- 当把`typeof 类`作为类型时，约束的满足该类的类型；即该类型获取的是该类上的静态属性和方法。

最后，只需要对`infer`的使用换个位置，便可以获取构造函数返回值的类型：

```ts
type InstanceType<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: any) => infer R ? R : any;
```

### Ts compiler 内部实现的类型

- Uppercase

```ts
/**
 * @desc 构造一个将字符串转大写的类型
 * @example
 * type Eg1 = 'ABCD';
 */
type Eg1 = Uppercase<"abcd">;
```

- Lowercase

```ts
/**
 * @desc 构造一个将字符串转小大写的类型
 * @example
 * type Eg2 = 'abcd';
 */
type Eg2 = Lowercase<"ABCD">;
```

- Capitalize

```ts
/**
 * @desc 构造一个将字符串首字符转大写的类型
 * @example
 * type Eg3 = 'abcd';
 */
type Eg3 = Capitalize<"Abcd">;
```

- Uncapitalize

```ts
/**
 * @desc 构造一个将字符串首字符转小写的类型
 * @example
 * type Eg3 = 'ABCD';
 */
type Eg3 = Uncapitalize<"aBCD">;
```

这些类型工具，在`lib.es5.d.ts`文件中是看不到具体定义的：

```ts
type Uppercase<S extends string> = intrinsic;
type Lowercase<S extends string> = intrinsic;
type Capitalize<S extends string> = intrinsic;
type Uncapitalize<S extends string> = intrinsic;
```

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29417b98f5bd4870bf65396992f913d8~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

## 第三部分 自定义 Ts 高级类型工具及类型编程技巧

### SymmetricDifference

`SymmetricDifference<T, U>`获取没有同时存在于 T 和 U 内的类型。

```ts
/**
 * 核心实现
 */
type SymmetricDifference<A, B> = SetDifference<A | B, A & B>;

/**
 * SetDifference的实现和Exclude一样
 */
type SymmetricDifference<T, U> = Exclude<T | U, T & U>;

/**
 * @example
 * type Eg = '1' | '4';
 */
type Eg = SymmetricDifference<"1" | "2" | "3", "2" | "3" | "4">;
```

其核心实现利用了 3 点：分发式联合类型、交叉类型和 Exclude。

- 首先利用 Exclude 从获取存在于第一个参数但是不存在于第二个参数的类型
- `Exclude`第 2 个参数是`T & U`获取的是所有类型的交叉类型
- `Exclude`第一个参数则是`T | U`，这是利用在联合类型在 extends 中的分发特性，可以理解为`Exclude<T, T & U> | Exclude<U, T & U>`;

总结一下就是，提取存在于`T`但不存在于`T & U`的类型，然后再提取存在于`U`但不存在于`T & U`的，最后进行联合。

### FunctionKeys

获取`T`中所有类型为函数的`key`组成的联合类型。

```ts
/**
 * @desc NonUndefined判断T是否为undefined
 */
type NonUndefined<T> = T extends undefined ? never : T;

/**
 * @desc 核心实现
 */
type FunctionKeys<T extends object> = {
  [K in keyof T]: NonUndefined<T[K]> extends Function ? K : never;
}[keyof T];

/**
 * @example
 * type Eg = 'key2' | 'key3';
 */
type AType = {
  key1: string;
  key2: () => void;
  key3: Function;
};
type Eg = FunctionKeys<AType>;
```

- 首先约束参数 T 类型为`object`
- 通过映射类型`K in keyof T`遍历所有的 key，先通过`NonUndefined<T[K]>`过滤`T[K]`为`undefined | null`的类型，不符合的返回 never
- 若`T[K]`为有效类型，则判断是否为`Function`类型，是的话返回`K`, 否则`never`；此时可以得到的类型，例如：

```ts
/**
 * 上述的Eg在此时应该是如下类型，伪代码：
 */
type TempType = {
  key1: never;
  key2: "key2";
  key3: "key3";
};
```

- 最后经过`{省略}[keyof T]`索引访问，取到的为值类型的联合类型`never | key2 | key3`, 计算后就是`key2 | key3`;

**敲重点！！！敲重点！！！敲重点！！！**

- `T[]`是索引访问操作，可以取到值的类型
- `T['a' | 'b']`若`[]`内参数是联合类型，则也是分发索引的特性，依次取到值的类型进行联合
- `T[keyof T]`则是获取`T`所有值的类型类型；
- `never`和其他类型进行联合时，`never`是不存在的。例如：`never | number | string`等同于`number | string`

**再敲重点！！！再敲重点！！！再敲重点！！！**

- `null`和`undefined`可以赋值给其他类型（开始该类型的严格赋值检测除外）, 所以上述实现中需要使用`NonUndefined`先行判断。
- `NonUndefined`中的实现，只判断了`T extends undefined`，其实也是因为两者可以互相兼容的。所以你换成`T extends null`或者`T extends null | undefined`都是可以的。

```ts
// A = 1
type A = undefined extends null ? 1 : 2;
// B = 1
type B = null extends undefined ? 1 : 2;
```

最后，如果你想写一个获取非函数类型的 key 组成的联合类型，无非就是`K`和`never`的位置不一样罢了。同样，你也可以实现`StringKeys`、`NumberKeys`等等。但是记得可以抽象个工厂类型哈：

```ts
type Primitive = string | number | bigint | boolean | symbol | null | undefined;

/**
 * @desc 用于创建获取指定类型工具的类型工厂
 * @param T 待提取的类型
 * @param P 要创建的类型
 * @param IsCheckNon 是否要进行null和undefined检查
 */
type KeysFactory<
  T,
  P extends Primitive | Function | object,
  IsCheckNon extends boolean
> = {
  [K in keyof T]: IsCheckNon extends true
    ? NonUndefined<T[K]> extends P
      ? K
      : never
    : T[K] extends P
    ? K
    : never;
}[keyof T];

/**
 * @example
 * 例如上述KeysFactory就可以通过工厂类型进行创建了
 */
type FunctionKeys<T> = KeysFactory<T, Function, true>;
type StringKeys<T> = KeysFactory<T, string, true>;
type NumberKeys<T> = KeysFactory<T, string, true>;
```

### MutableKeys

`MutableKeys<T>`查找`T`所有非只读类型的 key 组成的联合类型。

```ts
/**
 * 核心实现
 */
type MutableKeys<T extends object> = {
  [P in keyof T]-?: IfEquals<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    P
  >;
}[keyof T];

/**
 * @desc 一个辅助类型，判断X和Y是否类型相同，
 * @returns 是则返回A，否则返回B
 */
type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? A
  : B;
```

`MutableKeys`还是有一定难度的，讲解`MutableKeys`的实现，我们要分下面几个步骤：

**第一步，先理解只读和非只读的一些特性**

```ts
/**
 * 遍历类型T，原封不动的返回，有点类似于拷贝类型的意思
 */
type RType1<T> = {
  [P in keyof T]: T[P];
};
/**
 * 遍历类型T，将每个key变成非只读
 * 或者理解成去掉只读属性更好理解。
 */
type RType2<T> = {
  -readonly [P in keyof T]: T[P];
};

// R0 = { a: string; readonly b: number }
type R0 = RType1<{ a: string; readonly b: number }>;

// R1 = { a: string }
type R1 = RType1<{ a: string }>;
// R2 = { a: string }
type R2 = RType2<{ a: string }>;

// R3 = { readonly a: string }
type R3 = RType1<{ readonly a: string }>;
// R4 = { a: string }
type R4 = RType2<{ readonly a: string }>;
```

可以看到：`RType1`和`RType2`的参数为**非只读**的属性时，`R1`和`R2`的结果是一样的；`RType1`和`RType2`的参数为**只读**的属性时，得到的结果 R3 是**只读**的，`R4`是**非只读**的。所以，这里要敲个重点了：

- `[P in Keyof T]`是映射类型，而映射是同态的，同态即会拷贝原有的属性修饰符等。可以参考 R0 的例子。
- 映射类型上的`-readonly`表示为**非只读**，或者可以理解为去掉**只读**。对于**只读**属性加上`-readonly`变成了**非只读**，而对**非只读**属性加上`-readonly`后还是**非只读**。一种常见的使用方式，比如你想把属性变成都是非只读的，不能前面不加修饰符（虽然不写就表示非只读），但是要考虑到同态拷贝的问题。

**第二步，解析 IfEquals**

`IfEquals`用于判断类型`X`和`Y`是否相同，相等则返回`A`，否则返回`B`。这个函数是比较难的，也别怕啦，下面讲完就妥妥的明白啦~

```ts
type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? A
  : B;
```

- 首先`IfEquals<X, Y, A, B>`的四个参数，`X和Y`是待比较的两个类型，如果相等则返回`A`，不相等返回`B`。
- `IfEquals`的基本骨架是`type IfEquals<> = (参数1) extends (参数2) ? A : B`这样的，就是判断如果参数 1 的类型能够分配给参数 2 的类型，则返回`A`，否则返回`B`;
- 参数 1 和参数 2 的基本结构是一样的，唯一区别在于 X 和 Y 不同。这里看下具体下面的例子：

```ts
// A = <T>() => T extends string ? 1 : 2;
type A = <T>() => T extends string ? 1 : 2;
// B = <T>() => T extends number ? 1 : 2;
type B = <T>() => T extends number ? 1 : 2;

// C = 2
type C = A extends B ? 1 : 2;
```

是不是很奇怪，为什么能推导出`A`和`B`类型是不一样的？告诉你答案：

- 这是利用了 Ts 编译器的一个特点，就是 Ts 编译器会认为如果两个类型（比如这里的`X`和`Y`）仅被用于约束两个相同的泛型函数则是相同的。这理解起来有些不可思议，或者说在逻辑上这种逻辑并不对（因为可以举出反例），但是 Ts 开发团队保证了这一特性今后不会变。可参考[这里](https://link.juejin.cn?target=https%3A%2F%2Fstackoverflow.com%2Fquestions%2F52443276%2Fhow-to-exclude-getter-only-properties-from-type-in-typescript "https://stackoverflow.com/questions/52443276/how-to-exclude-getter-only-properties-from-type-in-typescript")。
- 注意，这里也会判断的属性修饰符，例如`readonly`, `可选属性`等，看通过下面的例子验证：

```ts
/**
 * T2比T1多了readonly修饰符
 * T3比T1多了可选修饰符
 * 这里控制单一变量进行验证
 */
type T1 = { key1: string };
type T2 = { readonly key1: string };
type T3 = { key1?: string };

// A1 = false
type A1 = IfEquals<T1, T2, true, false>;
// A2 = false
type A2 = IfEquals<T1, T3, true, false>;
```

- `IfEquals`最后就是借助 1 和 2 来辅助判断（语法层面的），还有就是给`A`的默认值为`X`，`B`的默认值为`never`。

最后，如果你是个爱（搞）钻（事）研（情）的小宝宝，你或许会对我发出灵魂拷问：判断类型是否相等（兼容）为什么不直接使用`type IfEquals<X, Y, A, B> = X extends Y ? A : B`呢？既简单有粗暴（PS：来自你的邪魅一笑~）。答案，我们看下下面的示例：

```ts
type IfEquals<X, Y, A, B> = X extends Y ? A : B;

/**
 * 还用上面的例子
 */
type T1 = { key1: string };
type T2 = { readonly key1: string };
type T3 = { key1?: string };

// A1 = true
type A1 = IfEquals<T1, T2, true, false>;
// A2 = true
type A2 = IfEquals<T1, T3, true, false>;
```

答案显而易见，对 readonly 等这些修饰符，真的无能无力了。夸爪 Kill~~~

**第 3 步，解析`MutableKeys`实现逻辑**

- `MutableKeys`首先约束 T 为 object 类型
- 通过映射类型`[P in keyof T]`进行遍历，key 对应的值则是`IfEquals<类型1, 类型2, P>`，如果类型 1 和类型 2 相等则返回对应的 P（也就是 key），否则返回 never。

而`P`其实就是一个只有一个当前 key 的联合类型，所以`[Q in P]: T[P]`也只是一个普通的映射类型。但是要注意的是参数 1`{ [Q in P]: T[P] }`是通过`{}`构造的一个类型，参数 2`{ -readonly [Q in P]: T[P] }`也是通过`{}`构造的一个类型, 两者的唯一区别即使`-readonly`。

所以这里就有意思了，回想一下上面的第一步的例子，是不是就理解了：如果`P`是只读的，那么参数 1 和参数 2 的`P`最终都是只读的；如果`P`是非只读的，则参数 1 的`P`为非只读的，而参数 2 的`P`被`-readonly`去掉了非只读属性从而变成了只读属性。因此就完成了筛选：`P`为非只读时`IfEquals`返回的`P`，`P`为只读时`IfEquals`返回`never`。

- 所以 key 为非只读时，类型为`key`，否则类型为`never`，最后通过`[keyof T]`得到了所有`非只读key`的联合类型。

### OptionalKeys

`OptionalKeys<T>`提取 T 中所有可选类型的 key 组成的联合类型。

```ts
type OptionalKeys<T> = {
  [P in keyof T]: {} extends Pick<T, P> ? P : never;
}[keyof T];

type Eg = OptionalKeys<{ key1?: string; key2: number }>;
```

- 核心实现，用映射类型遍历所有 key，通过`Pick<T, P>`提取当前 key 和类型。注意，这里也是利用了同态拷贝会拷贝可选修饰符的特性。
- 利用`{} extends {当前key: 类型}`判断是否是可选类型。

```ts
// Eg2 = false
type Eg2 = {} extends { key1: string } ? true : false;
// Eg3 = true
type Eg3 = {} extends { key1?: string } ? true : false;
```

利用的就是`{}`和只包含可选参数类型`{key?: string}`是兼容的这一特性。把`extends`前面的`{}`替换成`object`也是可以的。

### 增强 Pick

- PickByValue 提取指定值的类型

```ts
// 辅助函数，用于获取T中类型不为never的类型组成的联合类型
type TypeKeys<T> = T[keyof T];

/**
 * 核心实现
 */
type PickByValue<T, V> = Pick<
  T,
  TypeKeys<{ [P in keyof T]: T[P] extends V ? P : never }>
>;

/**
 * @example
 *  type Eg = {
 *    key1: number;
 *    key3: number;
 *  }
 */
type Eg = PickByValue<{ key1: number; key2: string; key3: number }, number>;
```

Ts 的类型兼容特性，所以类似`string`是可以分配给`string | number`的，因此上述并不是精准的提取方式。如果实现精准的方式，则可以考虑下面个这个类型工具。

- PickByValueExact 精准的提取指定值的类型

```ts
/**
 * 核心实现
 */
type PickByValueExact<T, V> = Pick<
  T,
  TypeKeys<{
    [P in keyof T]: [T[P]] extends [V]
      ? [V] extends [T[P]]
        ? P
        : never
      : never;
  }>
>;

// type Eg1 = { b: number };
type Eg1 = PickByValueExact<{ a: string; b: number }, number>;
// type Eg2 = { b: number; c: number | undefined }
type Eg2 = PickByValueExact<
  { a: string; b: number; c: number | undefined },
  number
>;
```

`PickByValueExact`的核心实现主要有三点：

一是利用`Pick`提取我们需要的`key`对应的类型

二是利用给泛型套一层元组规避`extends`的**分发式联合类型**的特性

三是利用两个类型互相兼容的方式判断是否相同。

具体可以看下下面例子：

```ts
type Eq1<X, Y> = X extends Y ? true : false;
type Eq2<X, Y> = [X] extends [Y] ? true : false;
type Eq3<X, Y> = [X] extends [Y] ? ([Y] extends [X] ? true : false) : false;

// boolean, 期望是false
type Eg1 = Eq1<string | number, string>;
// false
type Eg2 = Eq2<string | number, string>;

// true，期望是false
type Eg3 = Eq2<string, string | number>;
// false
type Eg4 = Eq3<string, string | number>;

// true，非strictNullChecks模式下的结果
type Eg5 = Eq3<number | undefined, number>;
// false，strictNullChecks模式下的结果
type Eg6 = Eq3<number | undefined, number>;
```

- 从`Eg1`和`Eg2`对比可以看出，给`extends`参数套上元组可以避免分发的特性，从而得到期望的结果；
- 从`Eg3`和`Eg4`对比可以看出，通过判断两个类型互相是否兼容的方式，可以得到从属类型的正确相等判断。
- 从`Eg5`和`Eg6`对比可以看出，非`strictNullChecks`模式下，undefined 和 null 可以赋值给其他类型的特性，导致`number | undefined, number`是兼容的，因为是非`strictNullChecks`模式，所以有这个结果也是符合预期。如果不需要此兼容结果，完全可以开启`strictNullChecks`模式。

最后，同理想得到`OmitByValue`和`OmitByValueExact`基本一样的思路就不多说了，大家可以自己思考实现。

### Intersection

`Intersection<T, U>`从`T`中提取存在于`U`中的`key`和对应的类型。（注意，最终是从`T`中提取`key`和类型）

```ts
/**
 * 核心思路利用Pick提取指定的key组成的类型
 */
type Intersection<T extends object, U extends object> = Pick<
  T,
  Extract<keyof T, keyof U> & Extract<keyof U, keyof T>
>;

type Eg = Intersection<{ key1: string }, { key1: string; key2: number }>;
```

- 约束`T`和`U`都是`object`，然后利用`Pick`提取指定的`key`组成的类型
- 通过`Extract<keyof T, keyof U>`提取同时存在于 T 和 U 中的 key，`Extract<keyof U, keyof T>`也是同样的操作

那么为什么要做 **2** 次`Extract`然后再交叉类型呢？原因还是在于处理类型的兼容推导问题，还记得`string`可分配给`string | number`的兼容吧:

```ts
type A = {
  [p: string]: 2;
};
type B = {
  aaa: 2;
};
// string | number
type AKEY = keyof A;
// "aaa"
type BKEY = keyof B;

// 1
type D = BKEY extends AKEY ? 1 : 2;
// 2
type F = AKEY extends BKEY ? 1 : 2;
```

扩展：

定义`Diff<T, U>`，从`T`中排除存在于`U`中的 key 和类型。

```ts
type Diff<T extends object, U extends object> = Pick<
  T,
  Exclude<keyof T, keyof U>
>;
```

### Overwrite 和 Assign

`Overwrite<T, U>`从`U`中的同名属性的类型覆盖`T`中的同名属性类型。(后者中的同名属性覆盖前者)

```ts
/**
 * Overwrite实现
 * 获取前者独有的key和类型，再取两者共有的key和该key在后者中的类型，最后合并。
 */
type Overwrite<
  T extends object,
  U extends object,
  I = Diff<T, U> & Intersection<U, T>
> = Pick<I, keyof I>;

/**
 * @example
 * type Eg1 = { key1: number; }
 */
type Eg1 = Overwrite<{ key1: string }, { key1: number; other: boolean }>;
```

- 首先约束`T`和`U`这两个参数都是`object`
- 借助一个参数 I 的默认值作为实现过程，使用的时候不需要传递 I 参数（只是辅助实现的）
- 通过`Diff<T, U>`获取到存在于`T`但是不存在于`U`中的 key 和其类型。（即获取`T`自己特有`key`和类型）。
- 通过`Intersection<U, T>`获取`U`和`T`共有的`key`已经该 key 在`U`中的类型。即获取后者同名`key`已经类型。
- 最后通过交叉类型进行合并，从而曲线救国实现了覆盖操作。

扩展：如何实现一个`Assign<T, U>`（类似于`Object.assign()`）用于合并呢？

```ts
// 实现
type Assign<T extends object, U extends object, I = Diff<T, U> & U> = Pick<
  I,
  keyof I
>;

/**
 * @example
 * type Eg = {
 *   name: string;
 *   age: string;
 *   other: string;
 * }
 */
type Eg = Assign<{ name: string; age: number }, { age: string; other: string }>;
```

想一下，是不是就是先找到前者独有的 key 和类型，再和`U`交叉。

### DeepRequired

`DeepRequired<T>`将`T`转换成必须属性。如果`T`为对象，则将递归对象将所有`key`转换成`required`，类型转换为`NonUndefined`；如果`T`为数组则递归遍历数组将每一项设置为`NonUndefined`。

```ts
/**
 * DeepRequired实现
 */
type DeepRequired<T> = T extends (...args: any[]) => any
  ? T
  : T extends Array<any>
  ? _DeepRequiredArray<T[number]>
  : T extends object
  ? _DeepRequiredObject<T>
  : T;

// 辅助工具，递归遍历数组将每一项转换成必选
interface _DeepRequiredArray<T> extends Array<DeepRequired<NonUndefined<T>>> {}

// 辅助工具，递归遍历对象将每一项转换成必选
type _DeepRequiredObject<T extends object> = {
  [P in keyof T]-?: DeepRequired<NonUndefined<T[P]>>;
};
```

- `DeepRequired`利用`extends`判断如果是函数或`Primitive`的类型，就直接返回该类型。
- 如果是数组类型，则借助`_DeepRequiredArray`进行递归，并且传递的参数为数组所有子项类型组成的联合类型，如下：

```ts
type A = [string, number];
/**
 * @description 对数组进行number索引访问，
 * 得到的是所有子项类型组成的联合类型
 * type B = string | number
 */
type B = A[number];
```

- `_DeepRequiredArray`是个接口（定义成 type 也可以），其类型是`Array<T>`, 完整的如下：

```ts
Array<
    // DeepRequired的参数最终是个联合类型，会走DeepRequired的子类型分发逻辑进行遍历
    DeepRequired<
        NonUndefined<
            // T[number]实际类似如下：
            T<
                a | b | c | ....
            >
        >
    >
>
```

而此处的`T`则通过`DeepRequired<T>`进行对每一项进行递归；在`T`被使用之前，先被`NonUndefined<T>`处理一次，去掉无效类型。

- 如果是对象类型，则借助`_DeepRequiredObject`实现对象的递归遍历。`_DeepRequiredObject`只是一个普通的映射类型进行变量，然后对每个 key 添加`-?`修饰符转换成`required`类型。

### DeepReadonlyArray

`DeepReadonlyArray<T>`将`T`的转换成只读的，如果`T`为`object`则将所有的 key 转换为只读的，如果`T`为数组则将数组转换成只读数组。整个过程是深度递归的。

```ts
/**
 * DeepReadonly实现
 */
type DeepReadonly<T> = T extends ((...args: any[]) => any) | Primitive
  ? T
  : T extends _DeepReadonlyArray<infer U>
  ? _DeepReadonlyArray<U>
  : T extends _DeepReadonlyObject<infer V>
  ? _DeepReadonlyObject<V>
  : T;

/**
 * 工具类型，构造一个只读数组
 */
interface _DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

/**
 * 工具类型，构造一个只读对象
 */
type _DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};
```

- 基本实现原理和`DeepRequired`一样，但是注意`infer U`自动推导数组的类型，`infer V`推导对象的类型。

### UnionToIntersection

将联合类型转变成交叉类型。

```ts
type UnionToIntersection<T> = (
  T extends any ? (arg: T) => void : never
) extends (arg: infer U) => void
  ? U
  : never;
type Eg = UnionToIntersection<{ key1: string } | { key2: number }>;
```

- `T extends any ? (arg: T) => void : never`该表达式一定走 true 分支，用此方式构造一个逆变的联合类型`(arg: T1) => void | (arg: T2) => void | (arg: Tn) => void`
- 再利用第二个`extends`配合`infer`推导得到 U 的类型，但是利用`infer`对**协变类型的特性得到交叉类型**。

## 参考内容

- Ts 官网 [www.typescriptlang.org/docs/handbo…](https://link.juejin.cn?target=https%3A%2F%2Fwww.typescriptlang.org%2Fdocs%2Fhandbook%2Futility-types.html "https://www.typescriptlang.org/docs/handbook/utility-types.html")
- utility-types [github.com/piotrwitek/…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fpiotrwitek%2Futility-types "https://github.com/piotrwitek/utility-types")

转载请注明作者及出处！
