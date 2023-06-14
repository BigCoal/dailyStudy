# slice-substring-substr

### slice()

slice() 方法可提取字符串的某个部分，并以新的字符串返回被提取的部分。

语法：str.slice(start,end)，截取 str 从 start 到 end 的所有字符（包含起始位置，不包含结束位置）

说明：start 和 end 都可以是负数，如果是负数，就从字符串的尾部开始算起，例如 - 1 就是最后一个字符，-2 就是倒数第二个字符，一次类推

如果未指定 end 参数，则截取从 start 到原字符串结尾的字符串

例子：

```js
var str = 'abcde leodonna'
   console.log(str.slice(1,8))//bcde le
   console.log(str.slice(1,-2))//bcde leodon
   console.log(str.slice(-4,-1))//onn
   console.log(str.slice(8))//odonna
```

**注意：起始字符要比结束字符小，否则截取不成功**

### substring() 

substring() 方法用于提取字符串中介于两个指定小标之间的字符

语法：str.substring(start,end) 截取 str 从 start 到 end 的所有字符（包含起始位置, 但不包含结束位置)

说明：两个参数都必须是非负整数，如果参数 start 与 end 相等，那么该方法返回的就是一个空字符串，如果 start 比 end 大，那么该方法在提取字符串之前会先交换这两个参数

如果未指定 end 参数，则截取从 start 到原字符串结尾的字符串

例子：

```js
var str = 'abcde leodonna'
   console.log(str.substring(1,8))//bcde le
   console.log(str.substring(4))//e leodonna
   console.log(str.substring(4,1))//bcd
```

### substr()

**（ECMAscript 没有对该方法进行标准化，因此反对使用它。）**

 substr() 方法可在字符串中抽取从 start 下标开始的指定数目的字符串

语法：str.substr(start,length) 截取 str 从 start 开始的 length 个字符（包含起始位置）

说明：start 参数可以是任意整数，如果是负数，则从 str 的尾部开始算起，例如 - 1 就是 str 的最后一个字符。

length 是可选的，如果没有，则表示截取从 str 开始的位置到字符串的尾部

例子：

```js
var str = 'abcde leodonna'
   console.log(str.substr(8))//odonna
   console.log(str.substr(-4))//onna
   console.log(str.substr(4,4))//e le
   console.log(str.substr(-3,6))//nna
```

### 总结
String 对象的方法 slice()、substring() 和 substr() （不建议使用）都可返回字符串的指定部分。slice() 比 substring() 要灵活一些，因为它允许使用负数作为参数。slice() 与 substr() 有所不同，因为它用两个字符的位置来指定子串，而 substr() 则用字符位置和长度来指定子串。

**需要注意的是，JavaScript 的字符串是不可变的（immutable），String 类定义的方法都不能改变字符串的内容。所以以上三种方法都不会改变原来的字符串，而是生成新的字符串。**

