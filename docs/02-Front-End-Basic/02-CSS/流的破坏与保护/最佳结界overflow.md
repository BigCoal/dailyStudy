# 最佳结界 overflow

## overflow 剪裁界限 border box

则当子元素内容超出容器宽度高度限制的时候，剪裁的边界是 `border box` 的内边缘，而非 `padding box` 的内边缘

在 overflow 属性中有一个很经典的不兼容问题，即 Chrome 浏览器下，如果容器可滚动（假设是垂直滚动），则 padding-bottom 也算在滚动尺寸之内，IE 和 Firefox 浏览器忽略 padding-bottom。所以我们在实际项目开发的时候，要尽量避免滚动容器设置 padding-bottom 值，除了样式表现不一致外，还会导致 scrollHeight 值不一样
![image](../../assets/css/float/overflow1.png)

## 了解 overflow-x 和 overflow-y

属性值：

- visible：默认值。
- hidden：剪裁。
- scroll：滚动条区域一直在。
- auto：不足以滚动时没有滚动条，可以滚动时滚动条出现。

如果 overflow-x 和 overflow-y 属性中的一个值设置为 visible 而另外一个设置为 scroll、auto 或 hidden，则 visible 的样式表现会如同 auto

## overflow 与滚动条

HTML 中有两个标签是默认可以产生滚动条的，一个是根元素`<html>`，另一个是文本域`<textarea>`，这两个的 overflow 都是以 auto 作为默认的属性值

关于浏览器的滚动条，有以下几个小而美的结论:

- 在 PC 端，无论是什么浏览器，默认滚动条均来自`<html>`

如果我们想要去除页面默认滚动条

```css
html {
  overflow: hidden;
}
```

注意，上述规则只对 PC 端有效，对于移动端并不一定适用。例如，在 PC 端，对`<html>`标签设置 overflow:hidden 可以隐藏滚动条禁止滚动，但是在移动端基本上无效。在 PC 端，窗体滚动高度可以使用 `document.documentElement.scrollTop` 获取，但是在移动端，可能就要使用 `document.body.scrollTop` 获取。

- 滚动条会占用容器的可用宽度或高度

```css
.box {
  width: 400px;
  height: 100px;
  overflow: auto;
}
```

当子元素高度超过 100px 出现滚动条的时候，子元素可用的实际宽度实际上要小于 400px，因为滚动条（准确地说应该是滚动栏）占据了一定的宽度。当然这还要看操作系统，比方说在移动端就不会有这样的问题，因为移动端的屏幕尺寸本身就有限，滚动条一般都是悬浮模式，不会占据可用宽度，但是在 PC 端，尤其 Windows 操作系统下，几乎所有浏览器的滚动栏都会占据宽度，而且这个宽度大小是固定的

要知道自己浏览器的滚动栏宽度是多少其实很简单，代码如下：

```html
<style>
  .box {
    width: 400px;
    overflow: scroll;
  }
</style>

<div class="box">
  <div id="in" class="in"></div>
</div>
<script>
  console.log(400 - document.getElementById("in").clientWidth);
</script>
```

这种滚动栏占据宽度的特性有时候会给我们的布局带来不小的麻烦。比方说，布局直接错位，如宽度设定死的浮动布局

滚动栏占据宽度的特性最大的问题就是页面加载的时候水平居中的布局可能会产生晃动，因为窗体默认是没有滚动条的，而 HTML 内容是自上而下加载的，就会发生一开始没有滚动条，后来突然出现滚动条的情况，此时页面的可用宽度发生变化，水平居中重新计算，导致页面发生晃动

这里分享一个可以让页面滚动条不发生晃动的小技巧，即使用如下 CSS 代码：

```css
html {
  overflow-y: scroll; /* for IE8 */
}
:root {
  overflow-y: auto;
  overflow-x: hidden;
}
:root body {
  position: absolute;
}
body {
  width: 100vw;
  overflow: hidden;
}
```

- 滚动条是可以自定义的。

  因为 IE 浏览器的自定义效果实在是比原生的还要难看，就不浪费大家时间了，就此打住。

  倒是支持-webkit-前缀的浏览器可以说说。例如，对于 Chrome 浏览器：

  - 整体部分，::-webkit-scrollbar；
  - 两端按钮，::-webkit-scrollbar-button；
  - 外层轨道，::-webkit-scrollbar-track；
  - 内层轨道，::-webkit-scrollbar-track-piece；
  - 滚动滑块，::-webkit-scrollbar-thumb；
  - 边角，::-webkit-scrollbar-corner

  但是我们平时开发中只用下面 3 个属性:

  ```css
  ::-webkit-scrollbar {
    /* 血槽宽度 */
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-thumb {
    /* 拖动条 */
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
  ::-webkit-scrollbar-track {
    /* 背景槽 */
    background-color: #ddd;
    border-radius: 6px;
  }
  ```

## 依赖 overflow 的样式表现

单行文字溢出点点点效果,效果实现必需的 3 个声明如下：

```css
.ell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

对支持-webkit-前缀的浏览器还可以实现多行文字打点效果：

```css
.ell-rows-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
```

## overflow 与锚点定位

锚点，通俗点的解释就是可以让页面定位到某个位置的点。

下面两种情况可以触发锚点定位行为的发生：

- URL 地址中的锚链与锚点元素对应并有交互行为

  可以让元素定位到浏览器窗体的上边缘

  我所知道的基于 URL 地址的锚链（如http://www.ceshi.con/23#1，可以使用 location.hash 获取）实现锚点跳转的方法有两种，一种是`<a>`标签以及 name 属性，还有一种就是使用标签的 id 属性。

  ```html
  <a href="#1">发展历程></a>
  <!--方式一-->
  <a name="1"></a>
  <!--方式二-->
  <h2 id="1">发展历程</h2>
  ```

  触发条件：点击一个连接改变锚链值，或者打开一个新连接，后面带有一个锚链值，前提是锚链值可以找到锚点对应的元素并且锚点事非隐藏状态，否则不会有任何定位行为发生

  ```html
  <a href="#">返回顶部></a>
  ```

  当锚链是一个简单的`#`时，会定位到顶部

- 可 focus 的锚点元素处于 focus 状态

  “focus 锚点定位”指的是类似链接或者按钮、输入框等可以被 focus 的元素在被 focus 时发生的页面重定位现象。

```javascript
//如果input在屏幕之外，则会定位到屏幕之内
document.querySelector("input").focus();
```

> 注意：当触发 focus 的定位时，是让元素在浏览器窗体范围内显示即可，不一定非是上边缘

锚点定位的本质

锚点定位行为的发生，本质上是通过改变`容器`滚动高度(不是浏览器的滚动高度)或者宽度来实现的。
锚点定位也可以发生在普通的容器元素上，而且定位行为的发生是由内而外的。

```html
<style>
  .con {
    height: 60px;
    overflow: auto;
  }
  .box {
    height: 120px;
    border: 1px solid #bbb;
    overflow: auto;
  }
  .content {
    height: 200px;
    background-color: #eee;
  }
</style>
<div class="con">
  <div class="box">
    <div class="content"></div>
    <h4 id="title">底部标题</h4>
  </div>
</div>
<p><a href="#title">点击测试</a></p>
```

当点击 a 标签时，滚动行为由内而外的触发，先触发 `.box` 容器的锚点定位，滚动到底部，再触发 `.con` 的锚点定位，“底部标题”和浏览器窗口的上边缘对齐

![image](../../assets/css/float/overflow2.png)

overflow:hidden 也是可以滚动的，只是没有滚动条，在表现上无法滚动而已，如果发生锚点定位，或者改变 scrollTop 的值，就会发生滚动行为，根据这种特性我们可以实现很多效果

实例一：实现选项卡

![image](../../assets/css/float/overflow3.png)

```html
<style>
  .box {
    height: 10em;
    border: 1px solid #ddd;
    overflow: hidden;
  }
  .list {
    line-height: 10em;
    background: #ddd;
  }
</style>
<div class="box">
  <div class="list" id="one">1</div>
  <div class="list" id="two">2</div>
  <div class="list" id="three">3</div>
  <div class="list" id="four">4</div>
</div>
<div class="link">
  <a href="#one">1</a>
  <a href="#two">2</a>
  <a href="#three">3</a>
  <a href="#four">4</a>
</div>
```

此效果乍一看很酷，但却有不少不足之处：其一，容器高度需要固定；其二，也是最麻烦的，就是“由内而外”的锚点定位会触发窗体的重定位，也就是说，如果页面也是可以滚动的，则点击选项卡按钮后页面会发生跳动，这种体验显然是非常不好的。[示例](https://demo.cssworld.cn/6/4-2.php)

有一种方法就是“focus 锚点定位”，只要定位的元素在浏览器窗体中，就不会触发窗体的滚动，也就是选项卡切换的时候页面不会发生跳动。[示例](https://demo.cssworld.cn/6/4-3.php)

```html
<style>
  .box {
    height: 10em;
    border: 1px solid #ddd;
    overflow: hidden;
  }
  .list {
    height: 100%;
    background: #ddd;
    position: relative;
  }
  .list > input {
    position: absolute;
    top: 0;
    height: 100%;
    width: 1px;
    border: 0;
    padding: 0;
    margin: 0;
    clip: rect(0 0 0 0);
  }
</style>
<div class="box">
  <div class="list"><input id="one" />1</div>
  <div class="list"><input id="two" />2</div>
  <div class="list"><input id="three" />3</div>
  <div class="list"><input id="four" />4</div>
</div>
<div class="link">
  <label class="click" for="one">1</label>
  <label class="click" for="two">2</label>
  <label class="click" for="three">3</label>
  <label class="click" for="four">4</label>
</div>
```
