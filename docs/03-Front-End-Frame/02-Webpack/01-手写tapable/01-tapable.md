> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [juejin.cn](https://juejin.cn/post/7040982789650382855)

# 前言

Webpack 在前端工程化中可谓是大名鼎鼎，在 Webpack 编译过程中存在两个核心对象。

- 负责整体编译流程的 Compiler 对象。
- 负责编译 Module 的 Compilation 对象。

在 Webpack 的世界中，围绕着两个配套的生态 Loader 以及 Plugin 两种机制。

**如果你有兴趣了解 Webpack Plugin 的话，那么 Tapable 是你必须要掌握的前置知识**。

在文章中会带你一步一步从使用到原理去学习 Tapable，一篇文章带你彻底掌握 Tapable。

> 关于 Webpack 构建相关原理以及 Loader 机制，你也可以在这里查阅往期知识：[从原理玩转 Webpack 专栏](https://juejin.cn/column/7031912597133721631 "https://juejin.cn/column/7031912597133721631")。

# Tapable 使用姿势

> The tapable package expose(揭露) many Hook(钩) classes, which can(可以) be used to create hooks for plugins.

在 Webpack 的编译过程中，本质上通过 Tapable 实现了在编译过程中的一种**发布订阅者**模式的插件 Plugin 机制。

关于 Plugin 的使用，我会在专栏的后续详细为大家解读使用和原理，Plugin 的本质上基于 Tapable 这个库去实现的。

这里，我会解耦 Webpack 编译流程，单独带大家去熟悉 Tapable 的使用和原理，所以并不需要太多的前置知识请大家放心大胆食用。

## 何谓 Tapable

上边说到 Tapable 提供了一系列事件的发布订阅 API ，通过 Tapable 我们可以注册事件，从而在不同时机去触发注册的事件进行执行。

Webpack 中的 Plugin 机制正是基于这种机制实现在不同编译阶段调用不同的插件从而影响编译结果。

Tapable 官方文档提供了这九种钩子：

```
const {
	SyncHook,
	SyncBailHook,
	SyncWaterfallHook,
	SyncLoopHook,
	AsyncParallelHook,
	AsyncParallelBailHook,
	AsyncSeriesHook,
	AsyncSeriesBailHook,
	AsyncSeriesWaterfallHook
 } = require("tapable");
```

我们以最简单的 SyncHook 为例：

```
// 初始化同步钩子
const hook = new SyncHook(["arg1", "arg2", "arg3"]);

// 注册事件
hook.tap('flag1', (arg1,arg2,arg3) => {
    console.log('flag1:',arg1,arg2,arg3)
})

hook.tap('flag2', (arg1,arg2,arg3) => {
    console.log('flag2:',arg1,arg2,arg3)
})

// 调用事件并传递执行参数
hook.call('19Qingfeng','wang','haoyu')

// 打印结果
flag1: 19Qingfeng wang haoyu
flag2: 19Qingfeng wang haoyu
```

- 第一步我们需要通过 new 关键字实例不同种类的 Hook(钩)。

  - new Hook(钩) 时候接受一个字符串数组作为参数，数组中的值不重要，**重要的是数组中对应的字符串个数**，后续会和详细和大家说到。
  - 其实 new Hook(钩) 时还接受第二个参数 name ，它是一个 string(字符串)。这里文档上并没有你可以先忽略这个参数。

- 其次通过 tap(点击) 函数监听对应的事件，注册事件时接受两个参数：

  - 第一个参数是一个字符串，它没有任何实际意义仅仅是一个标识位而已。这个参数还可以为一个对象，同样后续源码分析中我会给你讲到。
  - 第二个参数表示本次注册的函数，在**调用时会执行这个函数。**

- 当然最后就是我们通过 call 方法传入对应的参数，调用注册在 hook(钩) 内部的事件函数进行执行。

  - 同时在 call 方法执行时，会**将 call 方法传入的参数传递给每一个注册的事件函数作为实参进行调用。**

接下来让我们先从使用出发，谈谈这九种钩子分别代表的含义。

## 按照同步 / 异步分类

在 Tapable 中所有注册的事件可以分为**同步、异步**两种执行方式，正如名称表述的那样：

- 同步表示注册的事件函数会同步进行执行。
- 异步表示注册的事件函数会异步进行执行。

![](./static/3744ee0e150641f0b29e4476577bb67a~tplv-k3u1fbpfcp-zoom-in-crop-mark-1512-0-0-0.png?)

- 针对同步钩子来 tap(点击) 方法是唯一的注册事件的方法，通过 call 方法触发同步钩子的执行。
- 异步钩子可以通过 tap(点击)、tapAsync、tapPromise 三种方式来注册，同时可以通过对应的 call、callAsync、promise(承诺) 三种方式来触发注册的函数。

同时异步钩子可以分为：

- 异步串行钩子 (AsyncSeries)：可以被串联（连续按照顺序调用）执行的异步钩子函数。
- 异步并行钩子 (AsyncParallel)：可以被并联（并发调用）执行的异步钩子函数。

## 按照执行机制分类

Tapable 可以按照异步 / 同步执行分类的同时也可以按照执行机制进行分类，比如：

- **Basic(基本) Hook(钩)** : 基本类型的钩子，它仅仅执行钩子注册的事件，并不关心每个被调用的事件函数返回值如何。

![](./static/c6482701844c4982b621cdb310d82f94~tplv-k3u1fbpfcp-zoom-in-crop-mark-1512-0-0-0.png?)

- **Waterfall(瀑布)** : 瀑布类型的钩子，瀑布类型的钩子和基本类型的钩子基本类似，唯一不同的是瀑布类型的钩子会在注册的事件执行时将事件函数执行非 undefined 的返回值传递给接下来的事件函数作为参数。

![](./static/6888d93e835b44caa5b48e23101556ac~tplv-k3u1fbpfcp-zoom-in-crop-mark-1512-0-0-0.png?)

- **Bail** : 保险类型钩子，保险类型钩子在基础类型钩子上增加了一种保险机制，如果任意一个注册函数执行返回非 undefined 的值，那么整个钩子执行过程会立即中断，之后注册事件函数就不会被调用了。

![](./static/55eabe214f654bdf93aeaa01206d5a3c~tplv-k3u1fbpfcp-zoom-in-crop-mark-1512-0-0-0.png?)

- **Loop** : 循环类型钩子，循环类型钩子稍微比较复杂一点。循环类型钩子通过 call 调用时，如果任意一个注册的事件函数返回值非 undefeind , 那么会立即重头开始重新执行所有的注册事件函数，直到所有被注册的事件函数都返回 undefined。

![](./static/9b9f573ebba048d4abfcf1e60746bdf6~tplv-k3u1fbpfcp-zoom-in-crop-mark-1512-0-0-0.png?)

## 使用 9 种类型钩子

本来不打算在文章中列举九种类型钩子的使用，思来想去还是为大家做一些简短的使用 Demo 用例进行说明。

奈何 Tapable 的官方文档是在是过于简陋了...

### SyncHook

SyncHook 是最基础的同步钩子：

```
const { SyncHook } = require('tapable');

// 初始化同步钩子
const hook = new SyncHook(['arg1', 'arg2', 'arg3']);

// 注册事件
hook.tap('flag1', (arg1, arg2, arg3) => {
  console.log('flag1:', arg1, arg2, arg3);
});

hook.tap('flag2', (arg1, arg2, arg3) => {
  console.log('flag2:', arg1, arg2, arg3);
});

// 调用事件并传递执行参数
hook.call('19Qingfeng', 'wang', 'haoyu');
// 打印结果
flag1: 19Qingfeng wang haoyu
flag2: 19Qingfeng wang haoyu
```

### SyncBailHook

SyncBailHook 中如果任何事件函数存在返回值，那么会立即中断后续事件函数的调用：

```
const { SyncBailHook } = require('tapable');

const hook = new SyncBailHook(['arg1', 'arg2', 'arg3']);

// 注册事件
hook.tap('flag1', (arg1, arg2, arg3) => {
  console.log('flag1:', arg1, arg2, arg3);
  // 存在返回值 阻断flag2事件的调用
  return true
});

hook.tap('flag2', (arg1, arg2, arg3) => {
  console.log('flag2:', arg1, arg2, arg3);
});

// 调用事件并传递执行参数
hook.call('19Qingfeng', 'wang', 'haoyu');
// 打印结果
flag1: 19Qingfeng wang haoyu
```

### SyncWaterfallHook

SyncWaterfallHook 瀑布钩子会将上一个函数的返回值传递给下一个函数作为参数：

```
const { SyncWaterfallHook } = require('tapable');

// 初始化同步钩子
const hook = new SyncWaterfallHook(['arg1', 'arg2', 'arg3']);

// 注册事件
hook.tap('flag1', (arg1, arg2, arg3) => {
  console.log('flag1:', arg1, arg2, arg3);
  // 存在返回值 修改flag2函数的实参
  return 'github';
});

hook.tap('flag2', (arg1, arg2, arg3) => {
  console.log('flag2:', arg1, arg2, arg3);
});

hook.tap('flag3', (arg1, arg2, arg3) => {
  console.log('flag3:', arg1, arg2, arg3);
});

// 调用事件并传递执行参数
hook.call('19Qingfeng', 'wang', 'haoyu');
// 输出结果
flag1: 19Qingfeng wang haoyu
flag2: github wang haoyu
flag3: github wang haoyu
```

> 需要额外注意的是当存在多个参数时，通过 SyncWaterfallHook 仅能修改第一个参数的返回值。

### SyncLoopHook

SyncLoopHook 会在任意一个被监听的函数存在非 undefined 返回值时返回重头开始执行：

```
const { SyncLoopHook } = require('tapable');

let flag1 = 2;
let flag2 = 1;

// 初始化同步钩子
const hook = new SyncLoopHook(['arg1', 'arg2', 'arg3']);

// 注册事件
hook.tap('flag1', (arg1, arg2, arg3) => {
  console.log('flag1');
  if (flag1 !== 3) {
    return flag1++;
  }
});

hook.tap('flag2', (arg1, arg2, arg3) => {
  console.log('flag2');
  if (flag2 !== 3) {
    return flag2++;
  }
});

// 调用事件并传递执行参数
hook.call('19Qingfeng', 'wang', 'haoyu');
// 执行结果
flag1
flag1
flag2
flag1
flag2
flag1
flag2
```

这段代码其实比较简单，只是稍微比较绕而已。

终究还是把握一个原则，事件存在非 undefined 返回值那么就掉头从最开始进行重新执行。

### AsyncSeriesHook

AsyncSeriesHook 表示异步串联执行：

```
const { AsyncSeriesHook } = require('tapable');

// 初始化同步钩子
const hook = new AsyncSeriesHook(['arg1', 'arg2', 'arg3']);

console.time('timer');

// 注册事件
hook.tapAsync('flag1', (arg1, arg2, arg3, callback) => {
  console.log('flag1:', arg1, arg2, arg3);
  setTimeout(() => {
    // 1s后调用callback表示 flag1执行完成
    callback();
  }, 1000);
});

hook.tapPromise('flag2', (arg1, arg2, arg3) => {
  console.log('flag2:', arg1, arg2, arg3);
  // tapPromise返回Promise
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
});

// 调用事件并传递执行参数
hook.callAsync('19Qingfeng', 'wang', 'haoyu', () => {
  console.log('全部执行完毕 done');
  console.timeEnd('timer');
});
// 打印结果
flag1: 19Qingfeng wang haoyu
flag2: 19Qingfeng wang haoyu
全部执行完毕 done
timer: 2.012s
```

代码很简单，这里有两点是我想额外强调的：

- tapAsync 注册时实参结尾额外接受一个 callback ，调用 callback 表示本次事件执行完毕。

  callback 的机制和 node 中是一致的，也就是说 callback 函数调用时，如果第一个参数表示错误对象，如果传递第一个参数的话那么就表示本次执行出现错误会中断执行。

  当然后续参数和 nodejs 中同理，从 callback 函数第二个参数表示开始表示本次函数调用的返回值。

- Promise(承诺) 同理，如果这个 Promise(承诺) 返回的结果是 reject(拒绝) 状态，那么和 callback 传递错误参数同样效果，也会中断后续的执行。

### AsyncSeriesBailHook

AsyncSeriesBailHook 表示异步串行保险钩子：

```
const { AsyncSeriesBailHook } = require('tapable');

// 初始化同步钩子
const hook = new AsyncSeriesBailHook(['arg1', 'arg2', 'arg3']);

console.time('timer');

// 注册事件
hook.tapPromise('flag1', (arg1, arg2, arg3, callback) => {
  console.log('flag2:', arg1, arg2, arg3);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve函数存在任何值表示存在返回值
      // 存在返回值 bail保险打开 中断后续执行
      resolve(true);
    }, 1000);
  });
});

// flag2 不会被执行了
hook.tapAsync('flag2', (arg1, arg2, arg3,callback) => {
  console.log('flag1:', arg1, arg2, arg3);
  setTimeout(() => {
    callback();
  }, 1000);
});

// 调用事件并传递执行参数
hook.callAsync('19Qingfeng', 'wang', 'haoyu', () => {
  console.log('全部执行完毕 done');
  console.timeEnd('timer');
});
// 打印结果
flag2: 19Qingfeng wang haoyu
全部执行完毕 done
timer: 1.012s
```

### AsyncSeriesWaterfallHook

AsyncSeriesWaterfallHook 异步串行瀑布钩子：

```
const { AsyncSeriesWaterfallHook } = require('tapable');

// 初始化同步钩子
const hook = new AsyncSeriesWaterfallHook(['arg1', 'arg2', 'arg3']);

console.time('timer');

// 注册事件
hook.tapPromise('flag1', (arg1, arg2, arg3) => {
  console.log('flag2:', arg1, arg2, arg3);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
});

hook.tapAsync('flag2', (arg1, arg2, arg3, callback) => {
  console.log('flag1:', arg1, arg2, arg3);
  setTimeout(() => {
    callback();
  }, 1000);
});

// 调用事件并传递执行参数
hook.callAsync('19Qingfeng', 'wang', 'haoyu', () => {
  console.log('全部执行完毕 done');
  console.timeEnd('timer');
});
// 输出结果
flag2: 19Qingfeng wang haoyu
flag1: true wang haoyu
全部执行完毕 done
timer: 2.012s
```

### AsyncParallelHook

AsyncParallelHook 异步并行钩子，会并发执行所有异步钩子：

```
const { AsyncParallelHook } = require('tapable');

// 初始化同步钩子
const hook = new AsyncParallelHook(['arg1', 'arg2', 'arg3']);

console.time('timer');

// 注册事件
hook.tapPromise('flag1', (arg1, arg2, arg3) => {
  console.log('flag2:', arg1, arg2, arg3);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
});

hook.tapAsync('flag2', (arg1, arg2, arg3, callback) => {
  console.log('flag1:', arg1, arg2, arg3);
  setTimeout(() => {
    callback();
  }, 1000);
});

// 调用事件并传递执行参数
hook.callAsync('19Qingfeng', 'wang', 'haoyu', () => {
  console.log('全部执行完毕 done');
  console.timeEnd('timer');
});
// 执行结果
flag2: 19Qingfeng wang haoyu
flag1: 19Qingfeng wang haoyu
全部执行完毕 done
timer: 1.010s
```

可以看到最终的回调函数执行时打印的事件为`1s`稍微多一点，也就是说 flag1 、 flage2 两个事件函数并行开始执行，在 1s 后两个异步函数执行结束，整体回调结束。

### AsyncParallelBailHook

AsyncParallelBailHook 这个钩子就比较有意思了，异步并行保险钩子。

稍微修改一下 Demo 我们再来看一下执行结果：

```
const { AsyncParallelBailHook } = require('tapable');

// 初始化同步钩子
const hook = new AsyncParallelBailHook(['arg1', 'arg2', 'arg3']);

console.time('timer');

// 注册事件
hook.tapPromise('flag1', (arg1, arg2, arg3) => {
  return new Promise((resolve, reject) => {
    console.log('flag1 done:', arg1, arg2, arg3);
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
});

hook.tapAsync('flag2', (arg1, arg2, arg3, callback) => {
  setTimeout(() => {
    console.log('flag2 done:', arg1, arg2, arg3);
    callback();
  }, 3000);
});

hook.callAsync('19Qingfeng', 'wang', 'haoyu', () => {
  console.log('全部执行完毕 done');
  console.timeEnd('timer');
});

// 执行结果
flag1 done: 19Qingfeng wang haoyu
全部执行完毕 done
timer: 1.013s
flag2 done: 19Qingfeng wang haoyu
```

可以看到我们在 flag1 事件函数中 resolve(解决)(true) 返回了非 undefined 的值，此时 hook(钩) 会发生保险效果（停止后续所有的事件函数调用）。

所以首先会打印出：

```
// flag1执行完毕打印
flag1 done: 19Qingfeng wang haoyu

// 整体钩子执行完毕打印
全部执行完毕 done
timer: 1.013s
```

之后由于是异步并行的原因，所以在最开始所有的事件函数都会被并行执行。

由于 flag2 事件函数最开始已经调用了定时器，所以最终定时器在 3s 后打印。但是此时由于 flag1 发生 bail 效应在 flag1 执行完毕时，整体钩子都已经执行完毕了。

所以最终会打印：

```
flag1 done: 19Qingfeng wang haoyu
全部执行完毕 done
timer: 1.013s

// 此时表示hook执行完毕的callback已经执行完毕了
// 但是因为之前的异步并行的定时器并没有被终止 所以3s后会执行定时器的打印
flag2 done: 19Qingfeng wang haoyu
```

### Additional(额外) Hooks

官方 Readme 上仅仅提供了上述 9 个钩子，在源码中还暴露了一个 AsyncSeriesLoopHook 。

钩子的用法正如名称那样，异步串行循环钩子。具体用法我就不展开了，有兴趣的同学可以私下尝试一下。

## 拦截器

Tapable 提供的所有 Hook(钩) 都支持注入 Interception ，它和 Axios 中的拦截器的效果非常类似。

我们可以通过拦截器对整个 Tapable 发布 / 订阅流程进行监听，从而触发对应的逻辑。

```
const hook = new SyncHook(['arg1', 'arg2', 'arg3']);

hook.intercept({
  // 每次调用 hook 实例的 tap() 方法注册回调函数时, 都会调用该方法,
  // 并且接受 tap 作为参数, 还可以对 tap 进行修改;
  register: (tapInfo) => {
    console.log(`${tapInfo.name} is doing its job`);
    return tapInfo; // may return a new tapInfo object
  },
  // 通过hook实例对象上的call方法时候触发拦截器
  call: (arg1, arg2, arg3) => {
    console.log('Starting to calculate routes');
  },
  // 在调用被注册的每一个事件函数之前执行
  tap: (tap) => {
    console.log(tap, 'tap');
  },
  // loop类型钩子中 每个事件函数被调用前触发该拦截器方法
  loop: (...args) => {
    console.log(args, 'loop');
  },
});
```

- register: 每次通过 tap(点击)、tapAsync、tapPromise 方法注册事件函数时，会触发 register 拦截器。这个拦截器中接受注册的 Tap(点击) 作为参数，同时可以对于注册的事件进行修改。
- call: 通过调用 hook(钩) 实例对象的 call 方法时执行。（包括 callAsync, promise(承诺)）接受的参数为调用 Hook(钩) 时传入的参数。
- tap(点击): 在每一个被注册的事件函数调用之前执行，接受参数为对应的 Tap(点击) 对象。
- loop: loop 类型钩子中 每次重新开始 loop 之前会执行该拦截器，拦截器函数接受的参数为调用时传入的参数。

## HookMap && Context && MultiHook &&

关于 Tapable 其实还有相关的模块 API 分别是 B efore && stage 、 HookMap、Context 、HookMap。

### Before && stage

Tapable 在注册事件函数时，第一个参数同时支持传入一个对象。

我们可以通过这个对象上的 stage 和 before 属性来控制本次注册的事件函数执行时机。

#### Before 属性

before 属性的值可以传入一个数组或者字符串, 值为注册事件对象时的名称，它可以修改当前事件函数在传入的事件名称对应的函数之前进行执行。

比如:

```
const { SyncHook } = require('tapable');

const hooks = new SyncHook();

hooks.tap(
  {
    name: 'flag1',
  },
  () => {
    console.log('This is flag1 function.');
  }
);

hooks.tap(
  {
    name: 'flag2',
    // flag2 事件函数会在flag1之前进行执行
    before: 'flag1',
  },
  () => {
    console.log('This is flag2 function.');
  }
);

hooks.call();

// result
This is flag2 function.
This is flag1 function.
```

#### stage 属性

stage 这个属性的类型是数字，数字越大事件回调执行的越晚，支持传入负数，不传时默认为 0.

```
const { SyncHook } = require('tapable');

const hooks = new SyncHook();

hooks.tap(
  {
    name: 'flag1',
    stage: 1,
  },
  () => {
    console.log('This is flag1 function.');
  }
);

hooks.tap(
  {
    name: 'flag2',
    // 默认为stage: 0,
  },
  () => {
    console.log('This is flag2 function.');
  }
);

hooks.call();

// result
This is flag2 function.
This is flag1 function.
```

> 如果同时使用 before 和 stage 时，优先会处理 before ，在满足 before 的条件之后才会进行 stage 的判断。

> 关于 before 和 stage 都可以修改事件回调函数的执行时间，但是不建议混用这两个属性。换句话说如果你选择在你的 hooks.tap(点击) 中使用 stage 的话就不要在出现 before ，反之亦然。

### HookMap

HookMap 本质上就是一个辅助类，通过 HookMap 我们可以更好的管理 Hook(钩) ：

```
const { HookMap, SyncHook } = require('tapable');

// 创建HookMap实例
const keyedHook = new HookMap((key) => new SyncHook(['arg']));

// 在keyedHook中创建一个name为key1的hook，同时为该hook通过tap注册事件
keyedHook.for('key1').tap('Plugin 1', (arg) => {
  console.log('Plugin 1', arg);
});

// 在keyedHook中创建一个name为key2的hook，同时为该hook通过tap注册事件
keyedHook.for('key2').tap('Plugin 2', (arg) => {
  console.log('Plugin 2', arg);
});

// 在keyedHook中创建一个name为key1的hook，同时为该hook通过tap注册事件
keyedHook.for('key3').tap('Plugin 3', (arg) => {
  console.log('Plugin 3', arg);
});

// 从HookMap中拿到name为key1的hook
const hook = keyedHook.get('key1');

if (hook) {
  // 通过call方法触发Hook
  hook.call('hello');
}
```

### MultiHook

MultiHook 在日常应用中并不是很常见，它的主要作用也就是通过 MultiHook 批量注册事件函数在多个钩子中。

关于它的使用我后续在源码分析章节简单提到，它的实现无非就是多了一层上层封装而已。

### Context

关于 Context 在源码中如果你传递了 Context 参数，那么会进入这段逻辑：

![](./static/b7ee46a4e6d74bb1942587b3722fee00~tplv-k3u1fbpfcp-zoom-in-crop-mark-1512-0-0-0.png?)

在使用 Context Api 时控制台会告诉你这个 API 将来会被废弃，一个即将废弃且使用场景不多的情况这里就不和大家展开讲解了。

# Tapable 源码实现

## 我为什么我建议你一定要读 Tapable 原理

如果你仅仅为了满足 Webpack Plugin 的开发，其实上边的内容足够你在日常业务中使用了。

关于 Tapable 内部的原理其实并没有很多代码，学习 Tapable 的原理首当其冲的一定是可以让你在日常 Webpack Plugin 的开发中更的得心应手。

其次，关于 Tapable 这个库的内部实现在我看来是特别巧妙的方式去实现了一种发布订阅模式，这之中会有非常多的知识点：比如动态生成执行代码思路，关于类与继承抽象类的面向对象思想以及 this 指向的升华等等...

在我个人看来， Tapable 源代码中的设计原则和实现过程是非常值得每一个前端开发者去阅读的。

## 深入源码之前

在深入到源码之前我稍微带你来看这样一段代码 :

![](./static/09d55199fe44440092a815b5f773ec96~tplv-k3u1fbpfcp-zoom-in-crop-mark-1512-0-0-0.png?)

看起来很简单对吧，这段代码通过 SyncHook 创建了一个同步 Hook(钩) 的实例之后，然后通过 tap(点击) 方法注册了两个事件，最后通过 call 方法来调用。

实质上这段代码在调用 hook(钩).call('arg1','agr2') 时， Tapable 会动态编译出来这样一个函数：

```
function fn(arg1, arg2) {
    "use strict";
    var _context;
    var _x = this._x;
    var _fn0 = _x[0];
    _fn0(arg1, arg2);
    var _fn1 = _x[1];
    _fn1(arg1, arg2);
}
```

- 通过 this.\_x 获取调用者的 \_x 属性。之后从 \_x 属性中获取到对应下标元素。

**这里的 \_x[0] 正是我们监听的第一个 flag1 对应的事件函数体。**

**同理 \_x[1] 正是通过 tap(点击) 方法监听的 flag2 函数体内容。**

同时会生成一个 Hook(钩) 对象，它具有如下属性：

```
const hook = {
  _args: [ 'arg1', 'arg2' ],
  name: undefined,
  taps: [
    { type: 'sync', fn: [Function (anonymous)], name: 'flag1' },
    { type: 'sync', fn: [Function (anonymous)], name: 'flag2' }
  ],
  interceptors: [],
  _call: [Function: CALL_DELEGATE],
  call: [Function: anonymous],
  _callAsync: [Function: CALL_ASYNC_DELEGATE],
  callAsync: [Function: CALL_ASYNC_DELEGATE],
  _promise: [Function: PROMISE_DELEGATE],
  promise: [Function: PROMISE_DELEGATE],
  _x: [ [Function (anonymous)], [Function (anonymous)] ],
  compile: [Function: COMPILE],
  tap: [Function: tap],
  tapAsync: [Function: TAP_ASYNC],
  tapPromise: [Function: TAP_PROMISE],
  constructor: [Function: SyncHook]
}
```

Tapable 所做的事件就是根据 Hook(钩) 中对应的内容动态编译上述的函数体以及创建 Hook(钩) 实例对象。

最终在我们通过 Call 调用时，相当于执行这段代码：

```
// fn 为我们上述动态生成最终需要执行的fn函数
// hook 为我们上边 tapable 内部创建的hook实例对象
hook.call = fn
hook.call(arg1, arg2)
```

Tapable 源码中的核心正是围绕生成这两部分内容（一个是动态生成的 fn 、 一个是调用 fn 的 hook(钩) 实例对象）。

源码中分别存在两个 class 去管理这两块的内容：

- Hook(钩) 类，负责创建管理上边的 hook(钩) 实例对象。下文简称这个对象为**核心 hook(钩) 实例对象**。
- HookCodeFactory 类，负责根据内容编译最终需啊哟通过 hook(钩) 调用的 函数 fn 。下文简称这个函数为**最终生成的执行函数**。

## 深入 Tapable 源码

> 文章中实现的代码你可以在[这里看到](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2F19Qingfeng%2F19webpack%2Ftree%2Fmaster%2Ftapable "https://github.com/19Qingfeng/19webpack/tree/master/tapable")，强烈建议 clone 代码对比文章阅读。

### 入口文件

接下来让我们深入 Tapable 源码来聊一聊它的具体实现。

首先在它的入口文件中导出了很多中钩子函数：

```
"use strict";

exports.__esModule = true;
exports.SyncHook = require("./SyncHook");
exports.SyncBailHook = require("./SyncBailHook");
exports.SyncWaterfallHook = require("./SyncWaterfallHook");
exports.SyncLoopHook = require("./SyncLoopHook");
exports.AsyncParallelHook = require("./AsyncParallelHook");
exports.AsyncParallelBailHook = require("./AsyncParallelBailHook");
exports.AsyncSeriesHook = require("./AsyncSeriesHook");
exports.AsyncSeriesBailHook = require("./AsyncSeriesBailHook");
exports.AsyncSeriesLoopHook = require("./AsyncSeriesLoopHook");
exports.AsyncSeriesWaterfallHook = require("./AsyncSeriesWaterfallHook");
exports.HookMap = require("./HookMap");
exports.MultiHook = require("./MultiHook");
```

这里我们先从最基础的 SyncHook 出发来一步一步尝试实现 Tapable。

> 文章中我并不会按照源码照本宣读，这是因为我个人觉得那样的方式对于大多数人来说难以消化且晦涩难懂。

> 这里我会一步一步带你去实现 Tapable，在实现的过程中我会尽量的按照源码一比一的进行还原。但同时我也会剔除一些无用且会影响你思路的代码，比如上边我们提到关于 Context 参数的处理。

### 从 SyncHook 出发

让我们先从最简单的 SyncHook 出发来一步一步实现基本的 SyncHook 流程。

#### 工欲善其事，必先利其器。

在源码的入口文件中我们可以看到不同的 Hook(钩) 存放在不同的文件中，让我们先来创建好基本的目录吧。

![](./static/3c86f0c298ea4e1a8f4f878b163ecf57~tplv-k3u1fbpfcp-zoom-in-crop-mark-1512-0-0-0.png?)

- 这里我们创建了一个 index(指数).js 作为项目入口文件
- 同时创建了一个 SyncHook.js 保存同步基本钩子相关逻辑。
- 同时创建 Hook(钩).js ，该文件是所有类型 Hook(钩) 的父类，所有 Hook(钩) 都是基于该类派生而来的。
- 同时创建一个 HookCodeFactory.js 作为生成最终需要执行的函数的文件。

```
// 入口文件做的事情非常简单
exports.SyncHook = require('./SyncHook');
```

```
// 基础的SyncHook文件
function SyncHook () {

}

module.exports = SyncHook
```

Hook(钩).js 以及 HookCodeFactory.js 暂时我们不需要填充任何逻辑。

#### 实现 SyncHook.js

让我们先来填充一下基本的 SyncHook 逻辑:

```
const Hook = require("./Hook");

const TAP_ASYNC = () => {
	throw new Error("tapAsync is not supported on a SyncHook");
};

const TAP_PROMISE = () => {
	throw new Error("tapPromise is not supported on a SyncHook");
};

function SyncHook(args = [], name = undefined) {
	const hook = new Hook(args, name);
	hook.constructor = SyncHook;
	hook.tapAsync = TAP_ASYNC;
	hook.tapPromise = TAP_PROMISE;
        // COMPILE 方法你可以暂时忽略它 这里我也没有实现COMPILE方法
	hook.compile = COMPILE;
	return hook;
}

SyncHook.prototype = null;

module.exports = SyncHook;
```

这里我们补充了 SyncHook 函数的基础逻辑，在使用时我们清楚通过 new SyncHook 来实例化 Hook(钩) 对象。

所以这里当我们进行 new SyncHook 时

- 首先通过 new Hook(钩)(args, name) 创建了基础的 hook(钩) 实例对象。
- 同步的 hook(钩) 是不存在 tapAsync 和 tapPromise 方法的，所以这里给 hook(钩) 对象这两个方法分别赋予对应的错误函数。
- 返回 hook(钩) 实例对象，并且将 SyncHook 的原型置为 null。

此时我们通过 new SyncHook([1,2]) 时就会返回对应的 hook(钩) 实例对象。

> 这里其实利用 ES6 的 class 来书写的话可能会更加直观，但是为了还原源码我仍然使用了传统构造函数方式。

细心的同学可能发现 SyncHook 中有两点并没有实现：

- Hook(钩) 父类。
- hook(钩).compile(汇总) = COMPILE(汇总) 方法中的 COMPILE(汇总) 方法。

我们先来看看 Hook(钩) 父类对象，所有类型的 Hook(钩) 都是基于这个 Hook(钩) 类去继承而来的，同时这个基础的 Hook(钩) 类的实例也就是所谓的**核心 hook(钩) 实例对象**。

#### 初探 Hook(钩).js

##### 初始化

```
class Hook {
  constructor(args = [], name = undefined) {
    // 保存初始化Hook时传递的参数
    this._args = args;
    // name参数没什么用可以忽略掉
    this.name = name;
    // 保存通过tap注册的内容
    this.taps = [];
    // 保存拦截器相关内容 我们暂时先忽略拦截器
    this.interceptors = [];
    // hook.call 调用方法
    this._call = CALL_DELEGATE;
    this.call = CALL_DELEGATE;
    // _x存放hook中所有通过tap注册的函数
    this._x = undefined;

    // 动态编译方法
    this.compile = this.compile;
    // 相关注册方法
    this.tap = this.tap;

    // 与SyncHook无关的代码
    // this._callAsync = CALL_ASYNC_DELEGATE;
    // this.callAsync = CALL_ASYNC_DELEGATE;
    // this._promise = PROMISE_DELEGATE;
    // this.promise = PROMISE_DELEGATE;
    // this.tapAsync = this.tapAsync;
    // this.tapPromise = this.tapPromise;
  }

  compile(options) {
    throw new Error('Abstract: should be overridden');
  }
}

module.exports = Hook;
```

让我们先来填充一下基础的 Hook(钩).js 中的代码，这里我将与 SyncHook 无关的代码都先行注释掉了。

可以看到我们在 Hook(钩) 的构造函数中初始化了一系列属性。

关于 this.tap(水龙头) 注册方法、CALL_DELEGATE 方法接下来我会带你一步一步去实现。

这里你需要搞清楚，在 new SyncHook(args) 时 Tapable 内部究竟保存了哪些属性。

所谓 compile(汇总) 方法正是编译我们**最终生成的执行函数**的入口方法，同时我们可以看到在 Hook(钩) 类中并没有实现 compile(汇总) 方法，

**这是因为不同类型的 Hook(钩) 最终编译出的执行函数是不同的形式**，所以这里以一种抽象方法的方式将 compile(汇总) 方法交给了子类进行实现。

##### 实现 tap(点击) 注册方法

接下里让我们来实现 Hook(钩) 中的 tap(点击)() 注册方法，在使用上通常我们通过这种方式来向 SyncHook 实例对象上注册事件：

```
hook.tap(name, (arg) => {
    // dosomething
})
```

**因为通过 tap(点击)() 方法进行注册的逻辑在不同种类的 Hook(钩) 中是一致的逻辑**，通过改方法将监听的 name 以及对应的执行函数 fn 添加进入 this.taps 中去，所以放在父类中统一实现是最好不过的。

```
// Hook.js

class Hook {
    ...

  tap(options, fn) {
    // 这里额外多做了一层封装 是因为this._tap是一个通用方法
    // 这里我们使用的是同步 所以第一参数表示类型传入 sync
    // 如果是异步同理为sync、promise同理为 promise 这样就很好的区分了三种注册方式
    this._tap('sync', options, fn);
  }

  /**
   *
   * @param {*} type 注册的类型 promise、async、sync
   * @param {*} options 注册时传递的第一个参数对象
   * @param {*} fn 注册时传入监听的事件函数
   */
  _tap(type, options, fn) {
    if (typeof options === 'string') {
      options = {
        name: options.trim(),
      };
    } else if (typeof options !== 'object' || options === null) {
      // 如果非对象或者传入null
      throw new Error('Invalid tap options');
    }
    // 那么此时剩下的options类型仅仅就只有object类型了
    if (typeof options.name !== 'string' || options.name === '') {
      // 如果传入的options.name 不是字符串 或者是 空串
      throw new Error('Missing name for tap');
    }
    // 合并参数 { type, fn,  name:'xxx'  }
    options = Object.assign({ type, fn }, options);
    // 将合并后的参数插入
    this._insert(options)
  }

  _insert(item) {
    // this._resetCompilation(); _resetCompilation 会在后边和大家结合实际补充逻辑
    this.taps.push(item)
  }
}
```

这里我们补充了相关 tap(点击)(name,args) 方法的逻辑，当调用 hook(钩).tap(点击)() 方法时本质上会进入上述的 tap(点击)() 方法。

我们可以看到 Hook(钩) 类上的原型方法 tap(点击) 接受的第二个参数，不仅仅是一个字符串同时也可以传递一个对象。比如:

```
hook.tap({
    name: 'flag1'
}, (arg) => {
    // dosomething
})
```

> 同时 tap(点击)() 方法第一个参数支持传入 string(字符串)/object(对象) ，当传入 object(对象) 类型时支持 before、stage 属性，这里 before/state(状态) 属性的处理源码中是在 \_inset 方法中，这里我们先忽略它，后续我会带你补充这部分逻辑。

可以看到当我们调用 hook(钩).tap(点击) 方法注册事件时，最终会在 this.taps 中插入一个 `{ type:'sync',name:string, fn: Function}` 的对象。

##### 实现 call 调用方法

在源码分析的开头我们讲到过，当我们调用 call() 方法时 Tapable 最终编译出一个对应的函数 - **最终生成的执行函数**。

真实的 call 方法的内部核心就是通过调用 hook(钩).call 时动态生成**最终生成的执行函数**，从而通过 hook(钩) 实例对象调用这个**最终生成的执行函数**。

```
const CALL_DELEGATE = function(...args) {
	this.call = this._createCall("sync");
	return this.call(...args);
};

class Hook {
    	constructor(args = [], name = undefined) {
                // ...
		this._call = CALL_DELEGATE;
		this.call = CALL_DELEGATE;
                // ...
	}

        ...

        // 编译最终生成的执行函数的方法
        // compile是一个抽象方法 需要在继承Hook类的子类方法中进行实现
        _createCall(type) {
          return this.compile({
            taps: this.taps,
            // interceptors: this.interceptors, 先忽略拦截器
            args: this._args
            type: type,
            });
          }
}
```

可以看到 Tapable 内部思路还是很清晰的，this.call 方法最开始指向的是 CALL_DELEGATE 方法。

CALL_DELEGATE 方法内部通过 this.\_createCall("sync") 编译生成**最终生成的执行函数**。

从而将生成的函数赋值给 this.call , 在通过 this.call(...args) 调用**最终生成的执行函数**。

> 这里的 CALL_DELEGATE 只有在 this.call 被调用的时才会执行，换句话说每次调用 hook(钩).call 方法时才会进行一次编译 --- 根据 hook(钩) 内部注册的事件函数编译称为**最终生成的执行函数**从而调用它。

> 也就是说最开始 hook(钩) 实例内部的 hook(钩).call 方法指向的仅是 CALL_DELEGATE 这个方法，当调用 hook(钩).call() 时才会执行 CALL_DELEGATE 方法给 hook(钩).call 赋值为编译后的**最终生成的执行函数**，你可以将它理解成为一种懒 (动态) 编译的方式。

##### this.\_resetCompilation 方法

上边的 \_insert 方法中我注释掉了 this.\_resetCompilation() 方法，这里我会带你一步一步去讲解这个方法是做什么的，并且在合适的时机填充他的逻辑。

首先让我们来回忆一下上边所说到的：

```
const { SyncHook } = require('tapable')

const hooks = new SyncHook(['arg1','arg2'])

hooks.tap('flag1', () => {
    console.log(1)
})

hooks.tap('flag',() => {
    console.log(2)
})

hooks.call('arg1','arg2')
```

上述的 Demo 中当我们调用 hooks.call('arg1','arg2') 就相当于调用 this.call('arg1','arg2') 。

此时 this.call 调用时方法

- 首先会进入 CALL_DELEGATE 的调用 ，this.\_createCall 会动态生成**最终生成的执行函数**，这个函数的内容如下所示:

```
function fn(arg1, arg2) {
    "use strict";
    var _context;
    var _x = this._x;
    var _fn0 = _x[0];
    _fn0(arg1, arg2);
    var _fn1 = _x[1];
    _fn1(arg1, arg2);
}
```

> 具体编译细节我会在后边详细说到，这里我想你清楚的是这整个流程思路。

- 此时 this.\_createCall('sync') 方法调用后返回了**最终生成的执行函数**，我们将这个返回的函数重新赋值给 this.call ，然后在调用 this.call 方法就完成了 Tabpale 的作用了。

> 所谓的懒编译正是这个意思，每次在调用 hook(钩).call 时才会动态编译生成最终需要执行的函数。

> 同时我们可以看到函数内部访问了 this.\_x ，它即是 hook(钩).\_x ，不难想到这个 \_x 内部存放的就是被 hook(钩).tap(点击) 注册的事件函数组成的列表。

此时让我们再来稍微修改一下 Demo 试试 :

```
const { SyncHook } = require('tapable')

const hooks = new SyncHook(['arg1','arg2'])

hooks.tap('flag1', () => {
    console.log(1)
})

hooks.tap('flag',() => {
    console.log(2)
})

hooks.call('arg1', 'arg2')

// 再次添加一个tap事件函数
hooks.tap('flag3', () => {
  console.log(3);
});

// 同时再次调用
hooks.call('arg1', 'arg2');
```

上边的 Demo 中在第一次调用 hooks.call 方法时我们清楚 Tapable 内部会编译**最终生成的执行函数**并且赋值给 hooks.call 并调用。

此时接下来我又增加了一个 flag3 的事件函数，当我再次调用 hooks.call 时会发生什么？

没错，此时按照上边的流程来说 hooks.call 仍然只会输出 1 和 2，并不会触发 flag3 事件函数。

**这是因为 hooks.call 方法在第一次调用时已经编译成第一次输出的结果函数，并且覆盖了原本的编译方法 CALL_DELEGATE 赋值给了 hook(钩).call 。**

而 this.\_resetCompilation 方法正是为了解决这个问题。

```
class Hook {
    ...
    // 每次tap都会调用 _resetCompilation 重新赋值 this.call
      _resetCompilation() {
        this.call = this._call;
      }

      _insert(item) {
        this._resetCompilation();
        this.taps.push(item);
      }
}
```

当我们通过 hooks.tap(点击) 注册方法时每次都会触发 \_insert 方法，故而我们在 \_insert 方法中每次都重置 this.call 方法为编译方法 CALL_DELEGATE 。

此时每次调用 tap(点击) 方法注册函数都会重置 this.call 方法。

> this.\_call 在 Hook(钩) 的构造函数中我们进行初始化过，它就是 CALL_DELEGATE 。

#### 深入 HookCodeFactory.js

上边我们通过 Hook(钩).js 文件中实现了基本的 hook(钩) 实例的属性初始化和方法，通过 Hook(钩).js 的初始化我们得到了基础的**核心 hook(钩) 实例对象**。

接下来就让我们走进 HookCodeFactory.js 开始探索 Tapable 是如何编译生成**最终生成的执行函数**。

##### Hook(钩).js Compile(汇总) 方法

在 Hook(钩).js 的父类中，我们并没有实现 compile(汇总) 方法，我们说过每个 compile(汇总) 方法不同类型的 Hook(钩) 编译的结果函数都是不尽相同的。

所以，此时让我们回到 SyncHook.js 中，来看看 SyncHook 中的 compile(汇总) 方法吧 :

```
// SyncHook.js
const Hook = require('./Hook');
const HookCodeFactory = require('./HookCodeFactory');

class SyncHookCodeFactory extends HookCodeFactory {
  // 关于 content 方法 你可以先忽略它
  content({ onError, onDone, rethrowIfPossible }) {
    return this.callTapsSeries({
      onError: (i, err) => onError(err),
      onDone,
      rethrowIfPossible,
    });
  }
}

const factory = new SyncHookCodeFactory();

const TAP_ASYNC = () => {
  throw new Error('tapAsync is not supported on a SyncHook');
};

const TAP_PROMISE = () => {
  throw new Error('tapPromise is not supported on a SyncHook');
};

/**
 * 调用栈 this.call() -> CALL_DELEGATE() -> this._createCall() -> this.compile() -> COMPILE()
 * @param {*} options
 * @returns
 */
function COMPILE(options) {
  factory.setup(this, options);
  return factory.create(options);
}

function SyncHook(args = [], name = undefined) {
  const hook = new Hook(args);
  hook.constructor = SyncHook;
  hook.tapAsync = TAP_ASYNC;
  hook.tapPromise = TAP_PROMISE;
  hook.compile = COMPILE;
  return hook;
}

SyncHook.prototype = null;

module.exports = SyncHook;
```

在 SyncHook.js 中我补充了之前遗留的 hook(钩).compile(汇总) 方法。

别着急，让我稍微给你分析一下补充的内容 :

- hook(钩).compile(汇总) 方法在 hook(钩).call 调用时会被调用，接受的 options 类型的参数存在以下属性 :

  - taps 表示当前所有监 Tap(点击) 对象组成的数组， `[{ type, fn, name:'xxx' } ...]`。
  - interceptors 拦截器，这里我们先忽略拦截器。
  - args 是我们 new hook(钩) 时传入的参数，它是一个数组。
  - type 表示 hook(钩) 的类型，这里是'sync'。

```
{
      taps: this.taps,
      interceptors: this.interceptors,
      args: this._args,
      type: type,
    }
```

- HookCodeFactory 这个类即是编译生成**最终生成的执行函数**的方法类，这是一个基础类。Tapable 将不同种类 Hook(钩) 编译生成最终方法相同逻辑抽离到了这个类上。
- SyncHookCodeFactory 它是 HookCodeFactory 的子类，它用来存放不同类型的 Hook(钩) 中差异化的 content(内容) 方法实现。

> 关于 content(内容) 方法具体作用，你可以暂时忽略。

> 这里关于 COMPILE(汇总) 方法中的 factory.setup(this, options); 这里第一个参数 this 实际就是我们通过 new Hook(钩)() 创建的 hook(钩) 实例对象。

- COMPILE(汇总) 方法内部 SyncHookCodeFactory 的实例对象 factory 调用了初始化 factory.setup(this, options) 以及通过 factory.create(options) 创建**最终生成的执行函数**并且返回这个函数。

其实稍微捋一捋，Tapable 中的代码思路还是非常清晰的，不同的类负责不同的逻辑处理。

抽离公用的逻辑在基类中进行实现，同时对于差异化的逻辑基于抽象类的方式在不同的子类中进行实现。

##### HookCodeFactory.js 基础骨架

```
class HookCodeFactory {
  constructor(config) {
    this.config = config;
    this.options = undefined;
    this._args = undefined;
  }

  // 初始化参数
  setup(instance, options) {}

  // 编译最终需要生成的函数
  create(options) {}
}

module.exports = HookCodeFactory;
```

上边我们说到过，我们在 Hook(钩).js 中 hook(钩).compile(汇总) 中调用了 HookCodeFactory 实例对象 factory 上的两个方法 setup 以及 create 方法。

##### setup 方法

setup 方法的实现非常简单，它的作用是用来初始化**当前事件组成的集合**。

```
class HookCodeFactory {
    ...
      // 初始化参数
      setup(instance, options) {
        instance._x = options.taps.map(i => i.fn)
      }
    ...
}
```

setup 函数中接受的两次参数 :

- 第一个参数是 COMPILE(汇总) 方法中的 this 对象，也就是我们通过 new Hook(钩) 生成的 hook(钩) 实例对象。
- 第二个参数是调用 COMPILE(汇总) 方法时 Hook(钩) 类上 \_createCall 传递的 options 对象， 它的内容是 :

```
{
			taps: this.taps,
			interceptors: this.interceptors,
			args: this._args,
			type: type
		}
```

如果忘记了这个参数表示的含义的同学可以翻阅 [Hook(钩).js Compile(汇总) 方法](##### Hook.js Compile 方法 "##### Hook.js Compile 方法")这里查看。

我们在每次调用 hook(钩).call 时会首先通过 setup 方法为 hook(钩) 实例对象上的 \_x 赋值为所有被 tap(点击) 注册的事件函数 `[fn1,fn2 ...]`。

##### create 方法

Tapable 中正是通过 HookCodeFactory 类上的 create 方法正是实现了**编译出最终需要执行函数**的核心逻辑。

这在和大家强调一下，正是通过 HookCodeFactory 类上的 create 方法编译出的这段函数 :

```
function fn(arg1, arg2) {
    "use strict";
    var _context;
    var _x = this._x;
    var _fn0 = _x[0];
    _fn0(arg1, arg2);
    var _fn1 = _x[1];
    _fn1(arg1, arg2);
}
```

让我们一步一步先来实现 create 方法吧。

```
class HookCodeFactory {
  constructor(config) {
    this.config = config;
    this.options = undefined;
    this._args = undefined;
  }

  // 初始化参数
  setup(instance, options) {
    instance._x = options.taps.map((i) => i.fn);
  }

  // 编译最终需要生成的函数
  create(options) {
    this.init(options);
    // 最终编译生成的方法 fn
    let fn;
    switch (this.options.type) {
      case 'sync':
        fn = new Function(
          this.args(),
          '"use strict";\n' +
            this.header() +
            this.contentWithInterceptors({
              onError: (err) => `throw ${err};\n`,
              onResult: (result) => `return ${result};\n`,
              resultReturns: true,
              onDone: () => '',
              rethrowIfPossible: true,
            })
        );
        break;
      // 其他类型先不考虑
      default:
        break;
    }
    this.deinit();
    return fn;
  }

  /**
   * @param {{ type: "sync" | "promise" | "async", taps: Array<Tap>, interceptors: Array<Interceptor> }} options
   */
  init(options) {
    this.options = options;
    // 保存初始化Hook时的参数
    this._args = options.args.slice();
  }

  deinit() {
    this.options = undefined;
    this._args = undefined;
  }
}

module.exports = HookCodeFactory;
```

这里，我们在 HookCodeFactory 类上创建了一个一个 create 方法，这个方法宏观上来说有三个方面 :

- this.init() ，每次编译时首先初始化相关的属性。
- switch(开关) 方法中会匹配不同类型的 hook(钩) 进行相关编译处理，这里你可以先忽略具体的编译逻辑。
- this.deinit() , 当已经编译完成结果赋值给 fn 时，此时我们需要解除相关参数的赋值。

在 switch(开关) 语句中，我们通过 new Function(功能) 动态构建最终需要执行的函数，接下里我逐步实现 switch(开关) 语句中的逻辑。

##### this.args() && this.header()

在 create 方法中我们可以看到最终是通过 new Function(功能)() 生成最终的函数。

其中 this.args() 和 this.header() 这两个方法对于不同种类的 hook(钩) 来说，这两个方法都是相同的逻辑处理。

因为对于函数参数和函数顶部内容都是类似的内容，所以这里直接放在了 HookCodeFactory 父类中进行实现。

```
class HookCodeFactory {
  ...
  args({ before, after } = {}) {
    let allArgs = this._args;
    if (before) allArgs = [before].concat(allArgs);
    if (after) allArgs = allArgs.concat(after);
    if (allArgs.length === 0) {
      return '';
    } else {
      return allArgs.join(', ');
    }
  }
  ...
}
```

args 方法其实非常简单，它的作用就是将保存在类中的 this.\_args 数组转化称为字符串从而传递给对应的 new Function(功能) 语句。

> 关于 before 和 after 这两个参数在 SyncHook 类型中是不存在的，你可以暂时忽略它。比如异步钩子中在我们调用每一个事件函数时还会额外接受一个 callback，这个 callback 就是通过 after 传入的。

接下来让我们先看看源码中的 header 方法 :

```
header() {
    let code = '';
    // this.needContext()是false context api 已经快要被废弃掉了
    if (this.needContext()) {
      code += 'var _context = {};\n';
    } else {
      code += 'var _context;\n';
    }
    code += 'var _x = this._x;\n';
    // 并不存在拦截器
    if (this.options.interceptors.length > 0) {
      code += 'var _taps = this.taps;\n';
      code += 'var _interceptors = this.interceptors;\n';
    }
    return code;
  }
```

这是我为源码中的 header 方法稍微稍微打了一些注释，关于拦截器和 needContext 的部分，让我们直接先跳过这部分逻辑以免混淆视线。

```
class HookCodeFactory {
  // ...
  header() {
    let code = '';
    code += 'var _context;\n';
    code += 'var _x = this._x;\n';
    return code;
  }
  // ...
}
```

这样一下子就清晰了很多，通过 this.header 方法 Tapable 会生成一段这样的字符串:

```
var _context;
var _x = this._x
```

此时，关于 new Function(功能) 的参数以及函数 header 部分的处理我们已经完成了。

> 关于生成**编译出最终需要执行函数**本质上就是通过 this.header 方法和 this.contentWithInterceptors 方法返回的字符串拼接称为函数内容，在调用 new Function(功能) 构造函数对象。

##### this.contentWithInterceptors

this.contentWithInterceptors 人如其名，生成函数内容和拦截器内容。涉及拦截器的部分我们将它忽略掉，来看看这个精简后的方法:

```
class HookCodeFactory {

  create(options) {
    this.init(options);
    // 最终编译生成的方法 fn
    let fn;
    switch (this.options.type) {
      case 'sync':
        fn = new Function(
          this.args(),
          '"use strict";\n' +
            this.header() +
            this.contentWithInterceptors({
              onError: (err) => `throw ${err};\n`,
              onResult: (result) => `return ${result};\n`,
              resultReturns: true,
              onDone: () => '',
              rethrowIfPossible: true,
            })
        );
        break;
      // 其他类型先不考虑
      default:
        break;
    }
    this.deinit();
    return fn;
  }


    // ...
    contentWithInterceptors(options) {
      // 如果存在拦截器
        if (this.options.interceptors.length > 0) {
            // ...
        }else {
            return this.content(options);
        }
    }
    // ...
}
```

这里有一些我们需要注意的地方 :

- 调用 this.contentWithInterceptors 函数时传递的对象拥有非常多的属性，这里我们仅仅需要用的就是 onError 以及 onDone 这两个方法。
- contentWithInterceptors 方法中首先会判断是否存在拦截器，其次不存在拦截器的话会调用 this.content(内容)(options) 生成函数体并返回。

> 其实 this.content(内容) 之前我们在 SyncHook.js 中实现过, 在 SyncHookCodeFactory 上存在一个实例方法 content(内容)。

```
// SyncHook.js
...
const HookCodeFactory = require('./HookCodeFactory');


class SyncHookCodeFactory extends HookCodeFactory {
  // 关于 content 方法 你可以先忽略它
  content({ onError, onDone, rethrowIfPossible }) {
    return this.callTapsSeries({
      onError: (i, err) => onError(err),
      onDone,
      rethrowIfPossible,
    });
  }
}
...
```

我们之前说过因为**不同的 Hook(钩) 类型生成的函数代码是不一致的，所以 Tapable 会基于相同的编译逻辑存放在父类 HookCodeFactory 中，而各个 Hook(钩) 会继承父类共用逻辑下，同时在各自子类中实现差异化逻辑。**

这里的 SyncHookCodeFactory 类正是 SyncHook 独有的子类编译对象。

在调用 hook(钩).call 方法时，最终会调用子类 SyncHookCodeFactory 上的 content(内容) 生成对应的函数内容。

而 SyncHook.js 中的 SyncHookCodeFactory 的 content(内容) 方法又调用了父类 HookCodeFactory 的 this.callTapsSeries 方法。

感觉很绕吧，哈哈。可是为什么这么做呢？

Tapable 中恰恰利用这种设计方式组织代码从而更好的解耦各个模块。

##### this.TapsSeries 编译生成的可执行函数

> 关于 this.TapsSeries 源码中有很多边界情况和其余逻辑处理。这里我精简了源码，抽离了仅仅和 SyncHook 相关的逻辑。

```
class HookCodeFactory {
    ...

    contentWithInterceptors(options) {
    // 如果存在拦截器
    if (this.options.interceptors.length > 0) {
      // ...
    } else {
      return this.content(options);
    }
  }

  // 根据this._x生成整体函数内容
  callTapsSeries({ onDone }) {
    let code = '';
    let current = onDone;
    // 没有注册的事件则直接返回
    if (this.options.taps.length === 0) return onDone();
    // 遍历taps注册的函数 编译生成需要执行的函数
    for (let i = this.options.taps.length - 1; i >= 0; i--) {
      const done = current;
      // 一个一个创建对应的函数调用
      const content = this.callTap(i, {
        onDone: done,
      });
      current = () => content;
    }
    code += current();
    return code;
  }

  // 编译生成单个的事件函数并且调用 比如 fn1 = this._x[0]; fn1(...args)
  callTap(tapIndex, { onDone }) {
    let code = '';
    // 无论什么类型的都要通过下标先获得内容
    // 比如这一步生成 var _fn[1] = this._x[1]
    code += `var _fn${tapIndex} = ${this.getTapFn(tapIndex)};\n`;
    // 不同类型的调用方式不同
    // 生成调用代码 fn1(arg1,arg2,...)
    const tap = this.options.taps[tapIndex];
    switch (tap.type) {
      case 'sync':
        code += `_fn${tapIndex}(${this.args()});\n`;
        break;
      // 其他类型不考虑
      default:
        break;
    }
    if (onDone) {
      code += onDone();
    }
    return code;
  }

  // 从this._x中获取函数内容 this._x[index]
  getTapFn(idx) {
    return `_x[${idx}]`;
  }

  ...
}
```

- callTapsSeries 方法会遍历所有注册的 taps 编译成为对应的**最终需要执行的函数**。
- callTap 中根据单个 tap(点击) 的类型生成对应的函数调用语句进行返回。

> 关于 callTapsSeries 和 callTap 本质上做的事情非常简单 : 就是根据 Tap(点击) 的类型以及保存的 this.\_x 编译生成对应的函数内容。

#### 验证 SyncHook.js

这里，关于 SyncHook 的实现就已经大功告成了。我们基本实现了和 Tapable 一模一样的 SyncHook 。

接下来让我们验证一下我们自己的 SyncHook :

![](./static/6dedd75730394099a07468d7b8d9f91f~tplv-k3u1fbpfcp-zoom-in-crop-mark-1512-0-0-0.png?)

> 我在 `tapable/demo` 下新建了一个 synchook.js 。

```
const { SyncHook } = require('../index');

const hooks = new SyncHook(['arg1', 'arg2']);

hooks.tap('1', (arg1, arg2) => {
  console.log('hello', arg1, arg2);
});

hooks.tap('2', (arg1, arg2) => {
  console.log('hello2', arg1, arg2);
});

hooks.call('wang', 'haoyu');

hooks.tap('3', (arg1, arg2) => {
  console.log('hello3', arg1, arg2);
});
console.log('------');
hooks.call('19Qingfeng', 'haoyu');
```

执行这段代码，我们一起来看看输出结果:

![](./static/416b886d842a4ccaa34d7b2a90ae4fb7~tplv-k3u1fbpfcp-zoom-in-crop-mark-1512-0-0-0.png?)

结果完全符合我们的预期对吧，大功告成！

## 写在源码分析的结尾

如果你认真看完上边的内容，我相信通过一个 SyncHook 大家都已经明确了 Tapable 中基础的工作流。

![](./static/2aa09718d5dc4760b498ba2d8c9ac995~tplv-k3u1fbpfcp-zoom-in-crop-mark-1512-0-0-0.png?)

> 当调用 hook(钩).call() 时动态编译出**最终需要执行的函数**调用栈图。

本质上 Tapable 就是通过 Hook(钩) 这个类来保存相应的监听属性和方法，同时在调用 call 方法触发事件时通过 HookCodeFactory 动态编译生成的一个 Function(功能) ，从而执行达到相应的效果。

关于源码阅读的确对于大多数人来说是晦涩难懂的，**所以真的非常感谢并且佩服每一个可以看到这里的小伙伴。**

其实关于 Tapable 原本打算针对整个流程 同步、异步、拦截器以及 HookMap 整体流程做一个源码解读实现，写到 SyncHook 结束已经 1W 多字了。

从 SyncHook 中已经可以窥探到 Tapable 中的核心设计流程，这里我也会截止到 SyncHook 的实现，后续大家如果有兴趣的话我会在专栏中增加相关其他源码的补充。

# 简单聊聊 Tapable 与 Webpack

纵观 Webapck 编译阶段存在两个核心对象 Compiler 、 Compilation 。

关于 Webpack 编译基本流程你可以查看我的这篇文章 [Webapck5 核心打包原理全流程解析](https://juejin.cn/post/7031546400034947108 "https://juejin.cn/post/7031546400034947108")。

Webpack 在初始化 Compiler 、 Compilation 对象时会创建一系列相应的 Hook(钩) 作为属性保存各自实例对象中。

![](./static/dc67e27638d448c393ded61838a970ab~tplv-k3u1fbpfcp-zoom-in-crop-mark-1512-0-0-0.png?)

在进行 Webapck Plugin 开发时，正是基于这一系列 Hook(钩) 在不同时机发布对应事件。执行相应的事件从而影响最终的编译结果。

> 关于 Webpack Plugin 后续我会详细在专栏中进行讲解，之所以展开 Tapable 的内容也是为了 Webpack Plugin 去做前置知识的铺垫。

# 结尾

希望这篇关于 Tapable 的文章可以帮助到大家，文章中如果存在什么不足欢迎大家在评论区指正～

之后我也会在专栏更新更多 Tapable 源码见解以及解读 Webpack 相关原理内容。

如果对 Webpack 原理感兴趣的小伙伴可以关注我的专栏[从原理玩转 Webpack 专栏](https://juejin.cn/column/7031912597133721631 "https://juejin.cn/column/7031912597133721631")。
