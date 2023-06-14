

# typeOf

定义
--------

### 宿主环境 (native object)
ECMAScript 是在宿主环境中执行计算，处理对象的面向对象编程语言。

WEB 浏览器为引入客户端计算能力而提供 ECMAScript 宿主环境，例如，它提供的对象有：windows，menus，pop-ups，dialog boxes，text areas，anchors，frames，history，cookies 及I/O等等。进一步来说，WEB 浏览器中提供的这种宿主环境，它提供了一种方式，使得脚本代码可以去处理诸如改变焦点、页面和图片的加载、卸载、错误和放弃，选择，表单提交和鼠标交互等等事件。脚本代码出现在 HTML 中，显示出来的页面是一个用户接口元素与固定的和计算出来的文本和图片的集合。脚本代码根据用户的交互而做出反应，并不需要存在一个主程序。

WEB 服务器为了服务端的计算则提供了一个完全不一样的宿主环境，包括的对象有：requests，clients，files 以及数据锁定和分享的机制。通过浏览器端脚本及服务端脚本的配合使用，在为基于 WEB 方式的应用程序提供定制的用户接口时，可以将计算分布到客户端和服务端进行。

每一种支持 ECMAScript 的 WEB 浏览器和服务器都将它们自身的宿主环境作为 ECMAScript 的补充，以使得 ECMAScript 的执行环境变得完整。

### 原生对象 (native object)

ECMAScript 实现中，并非由宿主环境，而是完全由本规范定义其语义的对象。

标准的原生对象由ECMAScript定义。一些原生对象是内置的，其他的可在 ECMAScript 程序执行过程中构建。

### 宿主对象 (host object)

由宿主环境提供的对象，用于完善 ECMAScript 执行环境。

ECMAScript类型
--------
 ECMAScript类型分为 语言类型 与 规范类型 。

 ECMAScript 语言类型 是 ECMAScript 程序员使用 ECMAScript 语言直接操作的值对应的类型。ECMAScript 语言类型包括 未定义 （Undefined）、 空值 （Null）、 布尔值（Boolean）、 字符串 （String）、 数值 （Number）、 对象 （Object）。

 规范类型 是描述 ECMAScript 语言构造与 ECMAScript 语言类型语意的算法所用的元值对应的类型。规范类型包括 引用 、 列表 、 完结 、 属性描述式 、 属性标示 、 词法环境（Lexical Environment）、 环境纪录（Environment Record）。规范类型的值是不一定对应 ECMAScript 实现里任何实体的虚拟对象。规范类型可用来描述 ECMAScript 表式运算的中途结果，但是这些值不能存成对象的变量或是 ECMAScript 语言变量的值。


typeof 运算符结果
--------

```js
const number = new Number();
const string = new String();
const boolean = new Boolean();
const object = new Object();
const fun  = new Function();
const regexp  = new RegExp();
const date  = new Date();

console.log(typeof(number))  //object
console.log(typeof(string))  //object
console.log(typeof(boolean))  //object
console.log(typeof(object))  //object
console.log(typeof(fun))  //function
console.log(typeof(regexp))  //object
console.log(typeof(date))  //object
```

为何 `function` 如此特殊，那就要看 `new Function` 中做了哪些事情，根据规范，在`ECMASciprt 13.2.1`中，会设定 F 的 `[[Call]`] 内部属性。如果在new的过程中实现了`[[Call]]`那么就是typeof的值就是function，而剩余的在 new 实例化过程中并没有实现`[[Call]]`，就是这么简单,具体的typeof结果表请看下表



<table><tbody><tr><th>ECMAScript语言类型</th><th>执行结果</th></tr><tr><td>Undefined</td><td>"undefined"</td></tr><tr><td>Null</td><td>"null"</td></tr><tr><td>Boolean</td><td>"boolean"</td></tr><tr><td>Number</td><td>"number"</td></tr><tr><td>String</td><td>"string"</td></tr><tr><td>Object（原生对象，且没有实现 [[call]]）</td><td>"object"</td></tr><tr><td>Object（原生对象或者宿主对象且实现了 [[call]]）</td><td>"function"</td></tr><tr><td>Object（宿主对象且没实现 [[call]]）</td><td>由实现定义，但不能是 "undefined", "boolean", "number", or "string"</td></tr></tbody></table>
