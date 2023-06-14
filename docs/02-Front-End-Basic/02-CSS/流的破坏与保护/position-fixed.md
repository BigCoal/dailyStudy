# position:fixed

## position:fixed 不一样的包含块

position:fixed 固定定位元素的“包含块”是根元素，我们可以将其近似看成`<html>`元素

所以，如果想把某个元素固定定位在某个模块的右上角，下面这种做法是没有用的：

```html
<style>
  .father {
    width: 300px;
    height: 200px;
    position: relative;
  }
  .son {
    width: 40px;
    height: 40px;
    position: fixed;
    top: 0;
    right: 0;
  }
</style>
<div class="father">
  <div class="son"></div>
</div>
```

和`“无依赖的绝对定位”`类似，`“无依赖的固定定位”`也可以利用 absolute/fixed 元素没有设置 left/top/right/bottom 的相对定位特性，可以将目标元素定位到我们想要的位置

```html
<style>
  .father {
    width: 300px;
    height: 200px;
    position: relative;
  }
  .right {
    height: 0;
    text-align: right;
    overflow: hidden;
  }
  .son {
    display: inline;
    width: 40px;
    height: 40px;
    position: fixed;
    margin-left: -40px;
  }
</style>
<div class="father">
  <div class="right">
    &nbsp;
    <div class="son"></div>
  </div>
</div>
```

## position:fixed 的 absolute 模拟

有时候我们希望元素既有不跟随滚动的固定定位效果，又能被定位元素限制和精准定位

```html
<html>
  <head>
    <style>
      html,
      body {
        height: 100%;
        overflow: hidden;
      }
      .page {
        height: 100%;
        overflow: auto;
      }
      .fixed {
        position: absolute;
      }
    </style>
  </head>
  <body>
    <div class="page">
      固定定位元素
      <div class="fixed"></div>
    </div>
  </body>
</html>
```

整个网页的滚动条由 `.page` 元素产生，而非根元素，此时 `.fixed` 元素虽然是绝对定位，但是并不在滚动元素内部，自然滚动时不会跟随，如同固定定位效果，同时本身绝对定位。因此，可以使用 relative 进行限制或者 overflow 进行裁剪等。

## position:fixed 与背景锁定

蒙层弹窗是网页中常见的交互，其中黑色半透明全屏覆盖的蒙层基本上都是使用 `position: fixed` 定位实现的。但是，如果细致一点儿就会发现蒙层无法覆盖浏览器右侧的滚动栏，并且鼠标滚动的时候后面的背景内容依然可以被滚动，并没有被锁定，体验略打折扣。

`position:fixed` 蒙层之所以出现背景依然滚动，那是因为滚动元素是根元素，正好是 `position:fixed` 的“包含块”

如果是移动端项目，阻止 `touchmove` 事件的默认行为可以防止滚动；如果是桌面端项目，可以让根元素直接 `overflow:hidden`。但是，Windows 操作系统下的浏览器的滚动条都是占据一定宽度的，滚动条的消失必然会导致页面的可用宽度变化，页面会产生体验更糟糕的晃动问题

于是，在蒙层显示的同时执行下面的 JavaScript 代码：

```js
var widthBar = 17,
  root = document.documentElement;
if (typeof window.innerWidth == "number") {
  widthBar = window.innerWidth - root.clientWidth;
}
root.style.overflow = "hidden";
root.style.borderRight = widthBar + "px solid transparent";
```

隐藏的时候执行下面的 JavaScript 代码：

```js
var root = document.documentElement;
root.style.overflow = "";
root.style.borderRight = "";
```
