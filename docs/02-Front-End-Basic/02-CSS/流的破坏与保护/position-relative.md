# position:relative

## relative 与定位

relative 的定位有两大特性：

  - 相对自身
  - 无侵入

    “无侵入”的意思是，当 relative 进行定位偏移的时候，一般情况下不会影响周围元素的布局。

relative 的定位还有另外两点值得一提：相对定位元素的 left/top/right/bottom 的百分比值是相对于包含块计算的，而不是自身(绝对定位也是)。注意，虽然定位位移是相对自身，但是百分比值的计算值不是。

top 和 bottom 这两个垂直方向的百分比值计算跟 height 的百分比值是一样的，都是相对高度计算的。同时，如果包含块的高度是 auto，那么计算值是 0，偏移无效，也就是说，如果父元素没有设定高度或者不是“格式化高度”，那么 relative 类似 top:20%的代码等同于 top:0。

当相对定位元素同时应用对立方向定位值的时候，也就是 top/bottom 和 left/right 同时使用的时候，其表现和绝对定位差异很大， top/bottom 同时使用的时候，bottom 被干掉；left/right 同时使用的时候，right 毙命。

```css
.example {
  position: relative;
  top: 10px;
  right: 10px; /* 无效 */
  bottom: 10px; /* 无效 */
  left: 10px;
}
```

## relative 的最小化影响原则

1. 尽量不使用 relative，如果想定位某些元素，看看能否使用`“无依赖的绝对定位”`；
2. 如果场景受限，一定要使用 relative，则该 relative 务必最小化。

我们实现一个右上角定位图标：

```html
<div style="position:relative;">
  <img src="icon.png" style="position:absolute;top:0;right:0;" />
  <p>内容 1</p>
  <p>内容 2</p>
  <p>内容 3</p>
  <p>内容 4</p>
  ...
</div>
```

当为一个普通元素变成相对定位元素，看上去长相什么的没有变化，但是实际上元素的`层叠顺序提高`了，甚至在 IE6 和 IE7 浏览器下无须设置 z-index 就直接创建了新的层叠上下文，会导致一些绝对定位浮层无论怎么设置 z-index 都会被其他元素覆盖。

实际场景是这样的：假设 A 模块（设置 relative）下方有一个“B 模块”，这个“B 模块”设置了 margin-top:-100px，希望可以覆盖“A 模块”后面的部分内容，此时两种实现的差异就显现出来了。会发现“B 模块”并没有覆盖“A 模块”，反而是被“A 模块”覆盖了！

最小影响版本：
```html
<div>
  <div style="position:relative;">
    <img src="icon.png" style="position:absolute;top:0;right:0;" />
  </div>
  <p>内容 1</p>
  <p>内容 2</p>
  <p>内容 3</p>
  <p>内容 4</p>
  ...
</div>
```

“relative 的最小化影响原则”不仅规避了复杂场景可能出现样式问题的隐患，从日后的维护角度讲也更方便
