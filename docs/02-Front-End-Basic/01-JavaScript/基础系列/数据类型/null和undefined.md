# null和undefined


JavaScript 中有两个特殊的值，undefined 与 null。平常在写项目时，遇到需要判断一个值是否为空的时候，我总会想到 undefined 与 null。

## 同属于基本数据类型

在介绍 undefined 与 null 之前，我们先来回想一下 ECMAScript 中的数据类型。在 ECMAScript 中有七种简单数据类型 (也称为基本数据类型): Undefined、Null、Boolean、Number、BigInt、Symbol 和 String 。还有一种复杂数据类型——Object。

没错，首字母大写的 Undefined 与 Null 其实都属于 ECMAScript 中的基本数据类型。这两个数据类型是七种数据类型中最特殊的两个类型，因为它们都只有唯一的一个值，分别是 undefined 与 null，就是我们今天要介绍的两个主角。

[](#Undefined-类型 "Undefined 类型")Undefined 类型
--------------------------------------------

### [](#定义 "定义")定义

上面我们说过了，Undefined 类型只有一个值，就是特殊的 undefined，在两种情况下我们会得到 undefined：

-  声明了一个变量，但未对其初始化时，这个变量的值就是 undefined。
    
     ```js
     var data;
     console.log(data === undefined); //true
     ```
    
    那么我么是否可以显式地把一个变量初始化为 undefined 呢，答案是可以的。
    
    ```js
    var data = undefined;
    console.log(data === undefined); //true
    
    var value = 1;
    console.log(data); //1
    
    value = undefined;
    console.log(data === undefined); // true
    ```
    
    一般而言，我们不存在需要显式地把一个变量设置为 undefined 值的情况，因为对于未经初始化的值默认就会取得 undefined 值，而已经初始化的值再将其赋值为 undefined 来表示空值是没有意义且不可取的。况且字面值 undefined 的主要目的以用于比较，来区分空对象指针 (后面我们会介绍到这指的就是 null) 与未经初始化的变量的情况。
    
- 对未定义的变量执行 typeof 操作符也会返回 undefined
    
    ```js
    //data变量未定义
    var value;
    
    console.log(typeof data); // "undefined"
    console.log(typeof value); // "undefined"
    ```
    
    这里我们没有使用`===`来判断，因为对于尚未声明过的变量，我们只能执行一项操作，即使用 typeof 操作符检测其数据类型，使用其他的操作都会报错。
    
    ```js
    //data变量未定义
    
    console.log(data === undefined); //报错
    ```
    
    结果表明对未初始化和未声明的变量执行 typeof 操作符都返回了 undefined 值，这个结果有其逻辑上的合理性。因为虽然这两种变量从技术角度看有本质区别，但实际上无论对哪种变量也不可能执行真正的操作。
    

还有其他几种情况也会返回 undefined，比如一个函数如果没有使用 return 语句指定返回值，就会返回一个 undefined 值，或者调用函数时没有传参数值，参数同样也会被初始化为 undefined 值。这些都是属于上面两种情况在代码中的体现，这里就不单独解释了。

### [](#全局属性-window-undefined "全局属性 window.undefined")全局属性 window.undefined

从上面的例子我们可以看出，无论我们是否初始化过变量，都可以给变量赋值为 undefined。其实这里用于赋值的 undefined 不是一个值，它是一个属性名，undefined 是全局对象的一个属性，也就是说，它是全局作用域的一个变量，即`window.undefined`，而`window.undefined`这个属性的值才是前面所说的原始值 undefined。`data = undefined;`这就相当于把一个变量`window.undefined`的值赋值给另一个变量`data`，这个值就是原始值 undefined。其实在 JavaScript 代码中, 我们看到的 undefined 大多数情况指的都是`window.undefined`(本篇文章中多数情况下也是，原始值 undefined 除外)，原始值 undefined 多数情况下只存在于文档或规范中, 不存在于 JavaScript 代码中 (具体可以理解为代码中参与判断、比较或赋值的都是`window.undefined`，而在控制台中输出，或函数中返回的则是原始值 undefined)。

```js
console.log(window.undefined); //原始值undefined
```

注意，在 ES3 之前其实是没有原始值 undefined 这个值的，第三版引入这个值，其实是为了正式区分空对象指针 (后面我们会介绍到这指的就是 null) 与未经初始化的变量。在 ES3 中,`window.undefined`就是一个普通的属性，我们完全可以把它的值改为任何真值。但从 ES5 之后,`window.undefined`成了一个不可写, 不可配置的数据属性, 它的值永远是 undefined。

### [](#局部属性-undefined "局部属性 undefined")局部属性 undefined

大家可能注意到了，上面我提到的是在大多数情况下 undefined 指的都是`window.undefined`，那还有什么其他情况吗？其实在 ECMAScript 中，undefined 不是一个保留字，这意味着什么呢？也就是说我们可以将 undefined 作为一个局部变量来使用，就像局部作用域中任何其他普通变量一样，没有任何特殊性，我们可以对其赋予任何类型的值。

```js
(function() {
    var undefined = 'not is undefined';
    console.log(undefined); //"not is undefined"
    console.log(typeof undefined) // "string"
})()
```

我们可以看到 undefined 的值和类型都已经改变，这样的做法是非常不友好的，这样会使我们的代码难以维护和排错。

### [](#undefined-判断 "undefined 判断")undefined 判断

如何判断一个变量是否为 undefined，这里有两种方法。

1.  使用严格相等符`===`或不相等操作符`!==`来决定一个变量是否拥有值，这里不使用标准相等操作符`==`, 是因为标准相等符还会会检查变量是不是为 null，但是严格相等操作符不会检查。null 不等同于 undefined，这点我们会在后面讲到。
    
2.  使用 typeof 操作符，这种方式我们在上面已经使用过了，对未定义的变量检测时只能使用这种方式，要不然会出现报错。
    

### [](#void-0 "void 0")void 0

上面我们提到过了，undefined 作为局部变量使用是可以被重写的，那么如果我们使用下面这种判断方式，是有风险的。

```js
if(data === undefined){
    //do something
}
```

那么我们怎样做才能确保万无一失呢? 让我们先来了解一下 void 运算符, 官方文档是这样解释的:

> The void operator evaluates the given expression and then returns undefined.
> 
> void 运算符 对给定的表达式进行求值，然后返回 undefined

什么意思呢？就是使用 void 对后面的表达式求值，无论结果是多少，都会返回原始值 undefined。因此我们可以用`void 0`来代替 undefined 进行判断，因为`void 0`始终返回的都是原始值 undefined。

```js
var data;
console.log(data === void 0); //true
```

[](#Null类型 "Null类型")Null 类型
---------------------------

### [](#定义-1 "定义")定义

Null 类型是第二个只有一个值的数据类型，这个特殊的值就是 null。值 null 是一个字面量，它不像 undefined 是全局对象的一个属性。从逻辑角度来看，null 值表示一个空对象指针，指示变量未指向任何对象。把 null 作为尚未创建的对象，也许更好理解。在 APIs 中，null 常在返回类型是对象，但没关联值的地方使用，就像下面一个例子。

```js
//document.getElementById() 可以返回对拥有指定 ID 的第一个对象的引用

var $container = document.getElementById("container"); // 注意:container是不存在的

console.log($container); // null
```

### [](#typeof-null "typeof null")typeof null

当我们使用 typeof 操作符检测 null 值，我们理所应当地认为应该返”Null” 类型呀，但是事实返回的类型却是”object”。

```js
var data = null;
console.log(typeof data); // "object"
```

是不是很奇怪？其实我们可以从两方面来理解这个结果

*   一方面从逻辑角度来看，null 值表示一个空对象指针，它代表的其实就是一个空对象，所以使用 typeof 操作符检测时返回”object” 也是可以理解的。
    
*   另一方面，其实在 JavaScript 最初的实现中，JavaScript 中的值是由一个表示类型的标签和实际数据值表示的。对象的类型标签是 0。由于 null 代表的是空指针（大多数平台下值为 0x00），因此，null 的类型标签也成为了 0，typeof null 就错误的返回了”object”。在 ES6 中，当时曾经有提案为历史平凡, 将 type null 的值纠正为 null, 但最后提案被拒了, 所以还是保持”object” 类型。
    

### [](#null-判断 "null 判断")null 判断

null 的判断可以使用严格相等符`===`或不相等操作符`!==`判断，不使用标准相等符的原因是因为 undefined 会影响判断结果。和 undefined 不一样，不能使用 typeof 来判断一个值是否为 null，原因上边已经讲了，使用 typeof 来检测 null 会返回”object”, 这样的话我们是没办法判断的。

```js
if(data === null){
    console.log("data中没有保存对象引用！");
}
```

### [](#null-使用 "null 使用")null 使用

那么我们在什么情况下需要将变量赋值为 null 呢？这里我想到的有两种情况。

*   如果定义的变量在将来用于保存对象，那么最好将该变量初始化为 null，而不是其他值。换句话说，只要意在保存对象的变量还没有真正保存对象，就应该明确地让该变量保存 null 值，这样有助于进一步区分 null 和 undefined。
    
*   当一个数据不再需要使用时，我们最好通过将其值设置为 null 来释放其引用，这个做法叫做`解除引用`。不过解除一个值的引用并不意味着自动回收改值所占用的内存。解除引用的真正作用是让值脱离执行环境，以便垃圾收集器在下次运行时将其回收。解除引用还有助于消除有可能出现的循环引用的情况。这一做法适用于大多数全局变量和全局对象的属性，局部变量会在它们离开执行环境时 (函数执行完时) 自动被解除引用。
    

[](#undefined-与-null "undefined 与 null")undefined 与 null
--------------------------------------------------------

实际上 undefined 值是派生自 null 值的，因此 ECMA-262 规定对它们的相等性测试要返回 true:

```js
console.log(null == undefined); //true
```

因为使用的是标准相等符`==`, 这个操作符出于目的会转换其操作数为相同类型后再做比较，如果我们使用严格相等符比较，我们会发现它们是不相等的，因为严格相等符不会进行类型转换，然而 undefined 与 null 属于不同的类型，所以不相等。

```js
console.log(null === undefined); //false
```

尽管 null 和 undefined 有这样的关系，但上面我们已经提到过了，它们的用途完全不同，我们在平常使用时一定要学会区分。

[](#参考文献 "参考文献")参考文献
--------------------

《JavaScript 高级程序设计 (第三版)》  
[JavaScript 中 undefined 和 null 的区别](http://www.css88.com/archives/6236)  
[JavaScript 参考文档 null](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null)  
[JavaScript 参考文档 undefined](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)  
[JavaScript 参考文档 typeof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof)  
[(void 0) 与 undefined 之间的小九九](https://juejin.im/post/591153ceac502e450281e22f)
