# Margin

## margin 与元素内部尺寸

margin 针对于元素内部尺寸有两大特性：

1. 当元素设定了 `width` 或者保持包裹性的时候, `margin` 不会影响元素内部尺寸，
2. 当元素充分利用可用空间状态时（水平和垂直方向），`margin` 是可以改变内部尺寸的

exp:

```html
<style>
  .father {
    width: 300px;
  }
  .son {
    margin: 0 -20px;
  }
</style>
<div class="father">
  <div class="son"></div>
  <!--son会利用流动性流满father，根据特性margin会改变其内部尺寸，最终son内部尺寸宽度为340px-->
</div>
```

---

由于 `margin` 可以利用流体特性改变元素内部尺寸，所以我们可以利用其实现很多布局效果

应用一：两栏自适应布局

（1）图片左侧定位

```html
<style>
  .box {
    overflow: hidden;
  }
  .box > img {
    float: left;
  }
  .box > p {
    margin-left: 140px;
  }
</style>
<div class="box">
  <img src="1.jpg" />
  <p>文字内容...</p>
</div>
```

（2）图片右侧定位

```html
<style>
  .box {
    overflow: hidden;
  }
  .full {
    width: 100%;
    float: left;
  }
  .box > img {
    float: left;
    margin-left: -128px;
  }
  .full > p {
    margin-right: 140px;
  }
</style>
<div class="box">
  <div class="full">
    <p>文字内容...</p>
  </div>
  <img src="1.jpg" />
</div>
```

应用 2:两端对齐布局。

需求:实现一行显示 3 个，中间有 20px 的间隔，假如我们通过浮动来实现

```css
li {
  float: left; //浮动元素具有包裹性，后面文章会详细说明
  width: 100px;
  margin-right: 20px;
}
```

此时就遇到了一个问题，即最右侧永远有个 20 像素的间隙，无法完美实现两端对齐

![image](../../assets/css/css-world/margin1.png)

利用 margin 就可以完美解决此问题

```css
ul {
  margin-right: -20px;
}
ul > li {
  float: left;
  width: 100px;
  margin-right: 20px;
}
```

## margin 与元素外部尺寸

- 块状元素的 margin 与外部尺寸:

只要元素具有块状特性(包含 float,absolute)，无论有没有设置 width/height，无论是水平方向还是垂直方向，只要有 margin 就会影响

- 内联元素的 margin 与外部尺寸:

由于内联元素表现为`包裹性`，所以只为影响外部尺寸，并且内联元素的 margin 只会影响水平方向，和 padding 不同，margin 在垂直方向无任何效果

---

利用 margin 影响外部尺寸，可以实现一些应用：

应用一：解决 padding-bottom 的兼容性问题

在低版本的 IE 和 Firefox 浏览器当容器可以滚动的情况下会忽略 padding-bottom 值，如下面代码，在 IE 和 Firefox 下图片底部没有 50 像素的 padding-bottom 间隙

```html
<div style="height:100px; padding:50px 0;overflow:auto">
  <img src="0.jpg" height="300" />
</div>
```

这种兼容性的本质是 Chrome 是子元素超过 `content box` 会出现滚动条，IE 和 Firefox 是超过 `padding box` 尺寸触发滚动条，这是一种`未定义行为`

所以我们只能用子元素的 margin-bottom 来实现滚动容器底部留白

应用 2:等高布局特效

对于两栏等高布局，可能左侧栏内容多，也可能右侧栏内容多，但是无论内容多少，两栏背景和容器一样高

![image](../../assets/css/css-world/margin2.png)

方法其实很多，例如使用 display: table-cell 布局，左右两栏作为单元格处理，或者使用 border 边框来模拟，再或者使用我
们这里的 margin 负值实现，核心 CSS 代码如下：

```css
.column-box {
  overflow: hidden;
}
.column-left,
.column-right {
  padding-bottom: 9999px;
  margin-bottom: -9999px;
}
```

垂直方向 margin 无法改变元素的内部尺寸，但却能改变外部尺寸，这里我们设置了 margin-bottom:-9999px 意味着元素的外部尺寸在垂直方向上小了 9999px。默认情况下，垂直方向块级元素上下距离是 0，一旦 margin-bottom:-9999px 就意味着后面所有元素和上面元素的空间距离变成了-9999px，也就是后面元素都往上移动了 9999px。此时，通过神来一笔 padding-bottom:9999px 增加元素高度，这正负一抵消，对布局层并无影响，但却带来了我们需要的东西—视觉层多了 9999px 高度的可使用的背景色。但是，9999px 太大了，所以需要配合父级 overflow:hidden 把多出来的色块背景隐藏掉，于是实现了视觉上的等高布局效果。

优点：兼容性好

缺点：，当触发锚点定位或者使用 DOM.scrollIntoview()方法的时候，可能就会出现奇怪的定位问题

border 和 table-cell 的优缺点：前者优势在于兼容性好，没有锚点定位的隐患，不足之处在于最多 3 栏（通过 border-style:double 可以实现 7 栏，后面会讲解），且由于 border 不支持百分比宽度，因此只能实现至少一侧定宽的布局；table-cell 的优点是天然等高，不足在于 IE8 及以上版本浏览器才支持，所以，如果项目无须兼容 IE6、IE7，则推荐使用 table-cell 实现等高布局。

## margin 的百分比值

和 padding 属性一样，margin 的百分比值无论是水平方向还是垂直方向都是相对于包含块包含块盒子计算的。

## margin 合并现象分析

### 基本概念

触发 margin 合并的两个条件：

（1）必须是块级元素，但不包括浮动和绝对定位元素，尽管浮动和绝对定位可以让元素块状化。

（2）只发生在垂直方向，需要注意的是，这种说法在不考虑 writing-mode 的情况下才是正确的，严格来讲，应该是只发生在和当前文档流方向的相垂直的方向上。由于默认文档流是水平流，因此发生 margin 合并的就是垂直方向。

### 合并的 3 种场景

（1）相邻兄弟元素 margin 合并。

```html
<style>
  p {
    margin: 1em 0;
  }
</style>

<p>第一行</p>
<p>第二行</p>
```

则第一行和第二行之间的间距还是 1em，因为第一行的 margin-bottom 和第二行的
margin-top 合并在一起了，并非上下相加。

（2）父级和第一个/最后一个子元素。

```html
<div class="father">
  <div class="son" style="margin-top:80px;"></div>
</div>
<div class="father" style="margin-top:80px;">
  <div class="son"></div>
</div>
<div class="father" style="margin-top:80px;">
  <div class="son" style="margin-top:80px;"></div>
</div>
```

在实际开发的时候，给我们带来麻烦的多半就是这里的父子 margin 合并。

上面代码三个 `father` 容器最终表现等同于设置 `margin-top` 距离顶端 `80px`,和第二个 `father` 容器表现相同，但是有一点需要注意，“等同于”并不是“就是”的意思，我们使用 `getComputedStyle` 方法获取父元素的 `margin-top` 值还是 CSS 属性中设置值，并非 margin 合并后的表现值。

（3）空块级元素的 margin 合并。

```html
<style>
  .father {
    overflow: hidden; //防止margin合并，见下文
  }
  .son {
    margin: 1em 0;
  }
</style>

<div class="father">
  <div class="son"></div>
</div>
```

结果，此时 `father` 所在的这个父级`<div>`元素高度仅仅是 1em，因为 `son` 这个空`<div>`元
素的 `margin-top` 和 `margin-bottom` 合并在一起了。这种空块级元素的 `margin` 合并特性即使自身没有设置 `margin` 也是会发生的

```html
<style>
  p {
    margin: 1em 0;
  }
</style>

<p>第一行</p>
<div></div>
<p>第二行</p>
```

此时第一行和第二行之间的距离还是 1em，中间看上去隔了一个`<div>`元素，但对最终效果却
没有任何影响。

### 如何解决 margin 合并

对于 margin-top 合并，可以进行如下操作（满足一个条件即可）：

- 父元素设置为块状格式化上下文元素(也就是 BFC，后续会写)；
- 父元素设置 border-top 值（隔断作用）；
- 父元素设置 padding-top 值（隔断作用）；
- 父元素和第一个子元素之间添加内联元素进行分隔（隔断作用。

对于 margin-bottom 合并，可以进行如下操作（满足一个条件即可）：

- 父元素设置为块状格式化上下文元素；
- 父元素设置 border-bottom 值；
- 父元素设置 padding-bottom 值；
- 父元素和最后一个子元素之间添加内联元素进行分隔；
- 父元素设置 height、min-height 或 max-height。

如果有人不希望空`<div>`元素有 margin 合并，可以进行如下操作：

- 设置垂直方向的 border；
- 设置垂直方向的 padding；
- 里面添加内联元素（直接 Space 键空格是没用的）；
- 设置 height 或者 min-height。

### margin 合并的计算规则

我把 margin 合并的计算规则总结为“正正取大值”“正负值相加”“负负最负值”3 句话。

exp:

```html
<style>
  .son {
    margin-bottom: 50px;
  }
  .b {
    margin-top: -20px;
  }
</style>

<div class="a">
  <div class="son"></div>
</div>
<div class="b"></div>
<!--此时a元素和b元素之间的间距是50-20=30px-->
```

### margin 合并的意义

#### 兄弟元素合并的意义

```html
<h2>文章标题</h2>
<p>文章段落 1...</p>
<p>文章段落 2...</p>
<ul>
  <li>列表 1</li>
  <li>列表 2</li>
  <li>列表 3</li>
</ul>
```

而这里的`<h2>、<p>、<ul>`默认全部都是有垂直方向的 `margin` 值的，而且单位全部都是 `em`。首先解释一下为何需要 `margin` 值。其实原因很简单，CSS 世界的设计本意就是图文信息展示，有了默认的 `margin` 值，我们的文章、新闻就不会挤在一起，垂直方向就会层次分明、段落有致，阅读体验就会好！为何使用 `em` 作为单位也很好理解，大家应该知道浏览器默认的字号大小是可以自定义的吧，例如，默认的是 16 像素，假如我们设置成更大号的字号，同时 `HTML` 标签的 `margin` 是像素大小，则会发生文字变大但是间距不变的情况，原本段落有致的阅读体验必然又会变得令人窒息。`em` 作为相对单位，则可以让我们的文章或新闻无论多大的字体都排版良好。可以看到，`HTML` 标签默认内置的 `CSS` 属性值完全就是为了更好地进行图文信息展示而设计的。

对于兄弟元素的 `margin` 合并其作用和 `em` 类似，都是让图文信息的排版更加舒服自然。假如说没有 `margin` 合并这种说法，那么连续段落或列表之类首尾项间距会和其他兄弟标签成 1:2 关系；文章标题距离顶部会很近，而和下面的文章详情内容距离又会很开，就会造成内容上下间距不一致的情况。

#### 父子元素合并的意义

```html
<div class="ele1" style="margin:20px"></div>
<div class="ele2" style="margin:20px;"></div>
```

现在要在上面这段 HTML 的 `ele2` 元素外面再嵌套一层`<div>`元素，假如说现在没有父子 margin 合并，那这层新嵌套的`<div>`岂不阻断了原本的兄弟 margin 合并？

父子 margin 合并的意义在于：在页面中任何地方嵌套或直接放入任何裸`<div>`，都不会影响原来的块状布局。`<div>`是网页布局中非常常用的一个元素，其语义是没有语义，也就是不代表任何特定类型的内容，是一个通用型的具有流体特性的容器，可以用来分组或分隔。由于其作用就是分组的，因此，从行为表现上来看，一个纯粹的`<div>`元素是不能够也不可以影响原先的布局的。

#### 自身合并的意义

自身 margin 合并的意义在于可以避免不小心遗落或者生成的空标签影响排版和布局。

```html
<p>第一行</p>
<p></p>
<p></p>
<p></p>
<p></p>
<p>第二行</p>
```

其和下面这段 HTML 最终视觉效果是一模一样的：

```html
<p>第一行</p>
<p>第二行</p>
```

若是没有自身 margin 合并特性的话，怕是上面的 HTML 第一行和第二行之间要隔了很多行吧。

## margin:auto

### margin:auto 作用机制

margin:auto 就是为了填充闲置的尺寸而设计的

margin:auto 的填充规则如下。

（1）如果一侧定值，一侧 auto，则 auto 为剩余空间大小。

（2）如果两侧均是 auto，则平分剩余空间。

> 若想使 auto 发挥作用，则当元素的 width 或 height 为 auto 时，元素必须具有对立方向的自动填充特性

exp:

```css
.father {
  width: 300px;
}
.son {
  width: 200px;
  margin-right: 80px;
  margin-left: auto;
}
```

请问：此时.son 的左右边距计算值是多少？

答案是左边距 20px、右边距 80px。margin 的'auto'可不是摆设，是具有强烈的计算意味的关键字，用来计算元素对应方向应该获得的剩余间距大小。譬如这里，总剩余间距大小是 100 px，其中 margin-right 使用了 80 px，那自然 margin-left 的'auto'计算值就是剩余的 20px 了。

### margin:auto 与块级元素对齐

内联元素控制左右对齐使用 text-align
块级元素控制左右对齐 margin(比 float 好用，float 主要目的是为了实现内容的环绕效果，用于布局会产生很多兼容性问题)

右对齐 exp:

```css
.son {
  width: 200px;
  margin-left: auto;
}
/* 由于margin的默认值是0，所以son会相对于父级容器右对齐*/
```

居中对齐 exp:

```css
.son {
  width: 200px;
  margin-right: auto;
  margin-left: auto;
}
/*对立方向都是 auto 的时候剩余间距等分，所以左右间距一样，形成居中效果*/
```

水平垂直方向的居中对齐 exp:

```css
.father {
  width: 300px;
  height: 150px;
  position: relative;
}
.son {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 200px;
  height: 100px;
  margin: auto;
}
```

使用 absolute 让 `son` 这个元素的尺寸表现为`格式化宽度和格式化高度`,两个方向都具有自动填充特性，设置`margin:auto`后便会水平垂直两个方向都居中。这比 `top:50%`然后 `margin` 负一半元素高度的方法要好使得多。

另外，对于替换元素，如果我们设置 display:block，则 margin:auto 的计算规则同样适合。

## margin 无效情景解析

针对以下场景设置 margin 会出现无效的问题：

- display 计算值 inline 的非替换元素的垂直 margin 是无效的，对于内联替换元素，垂直 margin 有效，并且没有 margin 合并的问题，所以图片永远不会发生 margin 合并。
- 表格中的`<tr>`和`<td>`元素或者设置 display 计算值是 table-cell 或 table-row 的元素的 margin 都是无效的。
- 绝对定位元素非定位方位的 margin 值“无效”

  `img {position:absolute; top: 10%; left: 30%;}`

  此时 right 和 bottom 值属于 auto 状态，也就是右侧和底部没有进行定位,此时，这两个方向设置 margin 值我们在页面上是看不到定位变化的。

  绝对定位元素任意方位的 margin 值无论在什么场景下都一直有效。无效原因是因为绝对定位元素的渲染是独立的

- 定高容器的子元素的 margin-bottom 或者宽度定死的子元素的 margin-right 的定位“失效”。

  ```html
  <style>
    .box {
      height: 100px;
    }
    .child {
      height: 80px;
      margin-bottom: 100px;
      margin-right: 100px;
    }
  </style>
  <div class="box">
    <div class="child"></div>
  </div>
  <!--margin-bottom:100px,margin-right:100px; 是不会在容器底部和右侧形成 100px 的外间距的，看上去就像是“失效”一样-->
  ```

  若想使用 `margin` 属性改变自身的位置，必须是和当前元素定位方向一样的 `margin` `属性才可以，否则，margin` 只能影响后面的元素或者父元素。

  一个普通元素，在默认流下，其定位方向是左侧以及上方，此时只有 `margin-left` 和 `margin-top` 可以影响元素的定位。但是，如果通过一些属性改变了定位方向，如 `float:right` 或者绝对定位元素的 right 右侧定位，则反过来 `margin-right` 可以影响元素的定位，`margin-left` 只能影响兄弟元素。

- 鞭长莫及导致的 margin 无效

  ```html
  <style>
    .box > img {
      float: left;
      width: 256px;
    }
    .box > p {
      overflow: hidden;
      margin-left: 200px;
    }
  </style>
  <div class="box">
    <img src="mm1.jpg" />
    <p>内容</p>
  </div>
  ```

  此时的`<p>`的 `margin-left` 从负无穷到 256px 都是没有任何效果的，这是由于 float 的特性决定的，后期会写

- 内联特性导致的 margin 无效。

  ```html
  <style>
    .box > img {
      height: 96px;
      margin-top: -200px;
    }
  </style>
  <div class="box">
    <img src="mm1.jpg" />
  </div>
  ```

  ![image](../../assets/css/css-world/margin3.png)

  如上图所示，尽管 `margin-top` 设置为-9999px,最终的效果都和上图一样，这是由于 `vertical-align` 的默认值是 `baseline`,导致图片的下边缘被幽灵空白节点的基线给限制死了（后续会写）
