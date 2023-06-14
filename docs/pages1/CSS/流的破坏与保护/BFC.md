# BFC

## BFC 的定义

BFC 全称为 block formatting context，中文为“块级格式化上下文”。

如果一个元素具有 BFC，那么该元素内部子元素再怎么翻江倒海、翻云覆雨，都不会影响外部的元素，所以，BFC 元素是`不可能发生 margin 重叠`的，因为 margin 重叠是会影响外面的元素的；BFC 元素也可以用来`清除浮动的影响`，因为如果不清除，子元素浮动则父元素高度塌陷，必然会影响后面元素布局和定位，这显然有违 BFC 元素的子元素不会影响外部元素的设定。

触发 BFC 的条件

- `<html>`根元素
- position 为 absolute，fixed
- float 的值不为 none
- display 的值为 inline-block,table-cell,table-caption
- overflow 的值为 auto,scroll,hidden

换言之，只要元素符合上面任意一个条件，就无须使用 clear:both 属性去清除浮动的影响了。

## BFC 与流体布局

BFC 的结界特性最重要的用途其实不是去 margin 重叠或者是清除 float 影响，而是实现更健壮、更智能的自适应布局。

```html
<style>
  img {
    float: left;
  }
</style>
<div class="father">
  <img src="me.jpg" />
  <p class="animal">小猫 1，小猫 2，...</p>
</div>
```

由于 float 的环绕特性，最终的表现如下图左侧部分
当我们给 `.animal` 添加以下样式的时候

```css
.animal {
  overflow: hidden;
}
```

`.animal` 会形成 BFC，根据特性，内部元素不会影响外部元素，则会形成下图右侧部分的自适应布局，右侧元素自动填满除了浮动元素以外的剩余空间，这种自适应布局要比纯流体自适应布局更加的智能，当图片大小变化的时候，右侧的内容区域会自适应流动

![image](../../assets/css/float/bfc1.png)

实际项目开发的时候，图片和文字不可能靠这么近，如果想要保持合适的间距，那也很简单，如果元素是左浮动，则浮动元素可以设置 margin-right 成透明 border-right 或 paddingright；又或者右侧 BFC 元素设置成透明 border-left 或者 padding-left，但不包括 margin-left，因为如果想要使用 margin-left，则其值必须是浮动元素的宽度加间隙的大小，就变成动态不可控的了，无法大规模复用。

和基于纯流体特性实现的两栏或多栏自适应布局相比，基于 BFC 特性的自适应布局有如下优点。

1. 自适应内容由于封闭而更健壮，容错性更强。比方说，内部设置 clear:both 不会与 float 元素相互干扰而导致错位
2. 自适应内容自动填满浮动以外区域，无须关心浮动元素宽度，可以整站大规模应用。比方说，抽象几个通用的布局类名

```css
.left {
  float: left;
}
.right {
  float: right;
}
.bfc {
  overflow: hidden;
}
```

BFC 形成自适应布局的条件:

理论上，任何 BFC 元素和 float 元素相遇的时候，都可以实现自动填充的自适应布局。但是，由于绝大多数的触发 BFC 的属性自身有一些古怪的特性，所以，实际操作的时候，能兼顾流体特性和 BFC 特性来实现无敌自适应布局的属性并不多

- float:left

  浮动元素有包裹性和破坏性，失去了元素本身的流体自适应性，因此无法实现自动实现自动填满容器的自适应布局
- position:absolute

  脱离文档流有些严重，和非定位元素很难一起玩
- overflow:hidden

  这个可以，唯一的问题就是容器盒子外的东西可能会被隐藏掉，一定程度上限制了这种特性的大规模使用
- display:inline-block

  display:inline-block 会让元素尺寸包裹收缩，完全就不是我们想要的 block 水平的流动特性。只能是一声叹息舍弃掉！然而，峰回路转，世事难料。大家应该知道，IE6 和 IE7 浏览器下，block 水平的元素设置 display:inline-block 元素还是 block 水平，也就是还是会自适应容器的可用宽度显示。
  ```css
  .float-left {
    float: left;
  }
  .bfc-content {
    display: inline-block;
  }
  ```
- display:table-cell

  它会跟随内部元素的宽度显示，看样子也是不合适的命。但是，单元格有一个非常神奇的特性，就是宽度值设置得再大，实际宽度也不会超过表格容器的宽度。所以我们可以把 BFC 元素的宽度设置的很大
  ```css
  .float-left {
    float: left;
  }
  .bfc-content {
    display: table-cell;
    width: 9999px;
  }
  ```

总结一下，我们对 BFC 声明家族大致过了一遍，能担任自适应布局重任的也就是以下几个。

- overflow:auto/hidden，适用于 IE7 及以上版本浏览器；
- display:inline-block，适用于 IE6 和 IE7；
- display:table-cell+很大宽度，适用于 IE8 及以上版本浏览器。
