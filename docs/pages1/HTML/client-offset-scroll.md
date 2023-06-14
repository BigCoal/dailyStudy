# offset-client-scroll 三剑客

## offset(偏移量)

- **offsetHeight**

元素在垂直方向上占用的空间大小，以像素计。包括元素的高度、（可见的）水平滚动条的高度、上边框高度和下边框高度。

- **offsetWidth**:

元素在水平方向上占用的空间大小，以像素计。包括元素的宽度、（可见的）垂直滚动条的宽度、左边框宽度和右边框宽度。

- **offsetParent**

偏移参照的定位父级,是当前元素最近的经过定位 (position 不等于 static) 的父级元素,主要有以下几种情况

1. 元素自身有 fixed 定位，offsetParent 的结果为 null
2. 元素自身无 fixed 定位，且父级元素都未经过定位，offsetParent 的结果为 `<body>`
3. 元素自身无 fixed 定位，且父级元素存在经过定位的元素，offsetParent 的结果为离自身元素最近的经过定位的父级元素
4. `<body>` 元素的 parentNode 是 null

- **offsetLeft**：

元素的左外边框至包含 offsetParent 元素的左内边框之间的像素距离。

- **offsetTop**：

元素的上外边框至包含 offsetParent 元素的上内边框之间的像素距离。

![](../assets/html/images/offset.png)

exp:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>offset</title>
  </head>
  <style>
    * {
      margin: 0;
      padding: 0;
    }
    .box {
      margin: 40px;
      overflow: hidden;
    }
    .mydiv {
      width: 100px;
      height: 120px;
      padding: 20px;
      border: 2px solid #ccc;
      margin: 20px 30px;
    }
  </style>

  <body>
    <div class="box">
      <div class="mydiv" id="myDiv"></div>
    </div>
    <script>
      var mydiv = document.getElementById("myDiv");
      // offsetHeight 元素垂直方向占用的空间大小 包括元素的高度+水平滚动轴高度+边框高度
      console.log(mydiv.offsetHeight); // 输出164   计算为 120+20+20+2+2 = 164
      // offsetWidth 元素在水平方向上占用的空间大小，以像素计。
      // 包括元素的宽度、（可见的）垂直滚动条的宽度、左边框宽度和右边框宽度。
      console.log(mydiv.offsetWidth); // 输出 144  计算为 100+20+20+2+2 = 144
      // offsetTop
      console.log(mydiv.offsetTop); // 输出 60
      // offsetLeft
      console.log(mydiv.offsetLeft); // 输出 70
    </script>
  </body>
</html>
```

## client(客户区大小)

- **clientWidth**

元素内容区宽度加上左右内边距宽度。 (不计算滚动条)

- **clientHeight**

元素内容区高度加上上下内边距高度。(不计算滚动条)

- **clientTop**

元素顶部边框的宽度 border-top-width

- **clientLeft**

元素左侧边框的宽度 border-left-width

![](../assets/html/images/client.png)

exp:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>client</title>
  </head>
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    .box {
      margin: 40px;
      overflow: hidden;
    }

    .mydiv {
      width: 100px;
      height: 120px;
      padding: 20px;
      border: 2px solid #ccc;
      margin: 20px 30px;
    }
  </style>

  <body>
    <div class="box">
      <div class="mydiv" id="myDiv"></div>
    </div>
    <script>
      var mydiv = document.getElementById("myDiv");
      // clientWidth
      console.log(mydiv.clientWidth); // 140 计算为：width+(padding-left)+(padding-right)
      // clientHeight
      console.log(mydiv.clientHeight); // 160 计算为：height+(padding-top)+(padding-bottom)

      // 获取浏览器窗口的大小
      function getViewport() {
        if (document.compatMode == "BackCompat") {
          return {
            width: document.body.clientWidth,
            height: document.body.clientHeight,
          };
        } else {
          return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
          };
        }
      }
      console.log(getViewport());
    </script>
  </body>
</html>
```

## scroll(滚动大小)

指的是包含滚动内容的元素的大小。

- **scrollHeight**

在没有滚动条的情况下，元素内容的总高度。

- **scrollWidth**

在没有滚动条的情况下，元素内容的总宽度。

- **scrollLeft**

被隐藏在内容区域左侧的像素数。通过设置这个属性可以改变元素的滚动位置。

- **scrollTop**

被隐藏在内容区域上方的像素数。通过设置这个属性可以改变元素的滚动位置。

![](../assets/html/images/scroll.png)
在确定文档的总高度时（包括基于视口的最小高度时），必须取得[scroll](https://so.csdn.net/so/search?q=scroll)Width/clientWidth 和 scrollHeight/clientHeight 中的最大值，才能保证在跨浏览器的环境下得到精确的结果。下面就是这样一个例子。

```js
var docHeight = Math.max(
  document.documentElement.scrollHeight,
  document.documentElement.clientHeight
);
var docWidth = Math.max(
  document.documentElement.scrollWidth,
  document.documentElement.clientWidth
);
```

注意，对于运行在混杂模式下的 IE，则需要用 document.body 代替 document.documentElement。

通过 scrollLeft 和 scrollTop 属性既可以确定元素当前滚动的状态，也可以设置元素的滚动位置。在元素尚未被滚动时，这两个属性的值都等于 0。如果元素被垂直滚动了，那么 scrollTop 的值会大于 0，且表示元素上方不可见内容的像素高度。如果元素被水平滚动了，那么 scrollLeft 的值会大于 0，且表示元素左侧不可见内容的像素宽度。这两个属性都是可以设置的，因此将元素的 scrollLeft 和 scrollTop 设置为 0，就可以重置元素的滚动位置。下面这个函数会检测元素是否位于顶部，如果不是就将其回滚到顶部。

```js
function scrollToTop(element) {
  if (element.scrollTop != 0) {
    element.scrollTop = 0;
  }
}
```

这个函数既取得了 scrollTop 的值，也设置了它的值。

## 思考

如何做图片的懒加载
[参考代码](https://github.com/BigCoal/day-log/tree/master/code%E5%9F%BA%E7%A1%80/html/%E5%9B%BE%E7%89%87%E6%87%92%E5%8A%A0%E8%BD%BD)
