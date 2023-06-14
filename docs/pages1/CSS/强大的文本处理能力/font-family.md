# font-family

font-family 默认值由操作系统和浏览器共同决定， Windows 和 OS X 下的 Chrome 默认字体可能不一样，同一台 Windows 系统的 Chrome 和 Firefox 浏览器默认字体也可能不一样。

## font-family 属性值分类

- 字体名

  “字体名”很好理解，就是使用的对应字体的名称。

  ```css
  body {
    font-family: simsun;
  }
  ```

  表示使用的是“宋体”。如果字体名包含空格，需要使用引号包起来。

  ```css
  body {
    font-family: "Microsoft Yahei";
  }
  ```

  如果有多个字体设定，从左往右依次寻找本地是否有对应的字体即可。

  ```css
  body {
    font-family: "PingFang SC", "Microsoft Yahei";
  }
  ```

  是先寻找是否本地有 `PingFang SC` 字体；如果没有，则继续寻找本地是否有 `Microsoft Yahei`字体；如果都没找到，就使用默认值。

- 字体族

  ```
  font-family: serif;
  font-family: sans-serif;
  font-family: monospace;
  font-family: cursive;
  font-family: fantasy;
  font-family: system-ui;
  ```

  - serif：衬线字体。
  - sans-serif：无衬线字体。
  - monospace：等宽字体。
  - cursive：手写字体。
  - fantasy：奇幻字体。
  - system-ui：系统 UI 字体。

## font-family 衬线与无衬线

- 衬线字体`font-family: serif;`

  通俗讲就是笔画开始、结束的地方有额外装饰而且笔画的粗细会有所不同的字体。网页中常用中文衬线字体是“宋体”，常用英文衬线字体有 Times New Roman、Georgia 等

- 无衬线字体`font-family: sans-serif;`

  没有衬线字体这些额外的装饰，而且笔画的粗细差不多，如中文的“雅黑”字体，英文包括 Arial、Verdana、Tahoma、Helivetica、Calibri 等。

![image](../../assets/css/font/family.png)

```css
body {
  font-family: "Microsoft Yahei", sans-serif;
}
```

> 注意，serif 和 sans-serif 一定要写在最后，因为在大多数浏览器下，写在 serif 和 sans-serif 后面的所有字体都会被忽略

## font-family 等宽字体

所谓等宽字体，一般是针对英文字体而言的。据我所知，东亚字体应该都是等宽的，就是每个字符在同等 font-size 下占据的宽度是一样的。我们看下 6 个英文 i，和 6 个英文 M，占据的宽度

iiiiii

MMMMMM

但是，如果是等宽字体（可以让英文字符同等宽度显示的字体就称为“等宽字体”），如 Consolas、Monaco、monospace，则宽度表现就不一样了

```html
iiiiii 
MMMMMM
```

等宽字体的实际应用

- 等宽字体与代码呈现

  首先等宽字体利于代码呈现。对于写代码的人来说，无论是什么语言，易读是第一位，使用等宽字体，我们阅读起来会更轻松舒服。因此，一般编辑器使用的字体或者 Web 上需要呈现源代码的字体都是等宽字体。

- 等宽字体与图形呈现

  假设某工具有这么一个功能：通过下拉选择，可以改变元素的边框样式，也就是 borderStyle 在 solid/dashed/dotted 间切换。

  大家都知道，原生的`<select>`的`<option>`元素的 innerHTML 只能是纯 text 字符，不能有 html，也不支持伪元素，因此，要模拟 solid、dashed 和 dotted，只能使用字符，而字符有长有短，这时候使用等宽字体，便可解决这种问题。

![image](../../assets/css/font/family2.png)

- ch 单位与等宽字体布局

  ch 和 em、rem、ex 一样，是 CSS 中和字符相关的相对单位。1ch 表示一个 `0` 字符的宽度

  由于 ch 是个 CSS3 单位，且 IE9 浏览器的宽度和其他浏览器明显不一样，因此此处不展开，但可以提一提一些不错的应用场景。例如，有些输入框是输入手机号的，在中国，手机号是 11 位，因此我们可以设置该输入框宽度为 11ch，同时让字体等宽，则用户一眼就能看出自己是否少输入或者多输入了 1 位数字。

## 中文字体和英文名称

虽然一些常见中文字体，如宋体、微软雅黑等，直接使用中文名称作为 `CSS font-family` 的属性值也能生效，但我们一般都不使用中文名称，而是使用英文名称，主要是为了规避乱码的风险。还有一些中文字体直接使用中文名称作为 `CSS font-family` 的属性值是没有效果的，如思源黑体、兰亭黑体等，需要使用字体对应的英文名称才可以生效。

所以我们就用英文名称实现中文字体，一些常见中文字体对应的 font-family 英文属性名称。

- Windows 常见内置中文字体和对应英文名称

![image](../../assets/css/font/family3.png)

- OS X 系统内置中文字体和对应英文名称

![image](../../assets/css/font/family4.png)

- Office 软件安装新增中文字体和对应英文名称

![image](../../assets/css/font/family5.png)

- 其他一些中文字体和对应英文名称

![image](../../assets/css/font/family6.png)

## 一些补充说明

`微软正黑`是一款全面支持 ClearType 技术的 TrueType 无衬线字体，用于繁体中文系统。相对应地，中国大陆地区用的是`微软雅黑`

我们平常所说的`“宋体”`，指的都是`“中易宋体”`，英文名称 `SimSun`，`“黑体”`类似的是`“中易黑体”`。在 OS X 常见内置中文字体中我罗列了一个`“宋体-简”`，需要注意的是，这个`“宋体-简”`和我们平常所说的`“宋体”`并不是同一个字体，其英文名称是`“Songti SC”`，字形表现也有差异，要注意甄别。

OS X 也就是苹果操作系统的字体名称中经常会出现“SC”，这个“SC”指的是`“简体”`的意思，相对应的还有“TC”，指的是`“繁体”`的意思。

Windows 系统本身默认的中文字体并不多，和 OS X 操作系统相比逊色很多，尤其是 OS X 操作系统中的“翩翩体”，“手札体”等几个手写体就非常棒！但是好在 Windows 操作系统安装 Office 的比例相当高，因此如果不是要求非常严格的话，我们还是可以使用很多中文字体的

虽然说 CSS font-family 对名称的大小写不怎么敏感，但是根据我的经验，最好至少首字母要大写，否则在使用 CSS
unicode-range 的时候可能会遇到一些麻烦。
