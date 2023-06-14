> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [juejin.cn](https://juejin.cn/post/6966811218275221541?share_token=170e8a46-f187-4c58-b182-84961d557ed6)

这里先讲本文的中心思想，从而可以让不熟悉这块内容的读者朋友们产生兴趣，然后带着问题去看后文内容。

一个网页在加载的时候，会发起多次网络请求，这些请求根据类型的不同可以分为对 html, css, js, 图片，XHR 等多种类型的请求。而每次请求从发起请求到接收到响应数据都会有一定的耗时（网络传输的时间、DNS 解析的时间、TCP/UDP 方面的时间等等），如果一个页面的完整显示需要依赖于多个请求的完成，那么这个页面可能会出现加载时间较长甚至过长的问题。

如果我们想要减少页面的加载时长，有很多种手段可以使用，甚至有时候需要多种手段结合着一起使用才能让优化的效果变得较为明显。这里我只讲其中一个点，我们可以对一些小图片（`img`）做文章，这些图片包括作为 `img src` 的图片，和作为另一个元素的背景（`background`）的图片等。我们将那些原先没有使用 data 协议作为其 `src` 或 `url` 的图片，改为使用 data 协议作为 `img src`或 `background url`，这样相当于将这些图片直接嵌在 html 或 css 文件内部，从而可以省略掉对这些图片单独发起的网络请求。

所以本文的中心思想是： 通过`img`标签的 `src`属性, 或者使用`background: url(...)` 引入的一些小图片，可以使用 data 协议来引入这些图片，从而可以减少网络请求次数，提升页面加载速度。

什么是 Data URL
============

不论是 `img`标签的 `src`, 还是作为背景图片的 `background` `url`, 总之都是图片的 url，使用 data 协议的 url, 被称作 data URL, 图片使用 data URL 的写法举例如下：

```
<img src="data:image/gif;base64,R0lGODlhEAAQ..."/>
复制代码
```

```
li {
  background: url(data:image/gif;base64,R0lGODl...) no-repeat;
}
复制代码
```

MDN 关于 Data URL 的介绍如下：

Data URLs，即前缀为 data: 协议的 URL，其允许内容创建者向文档中嵌入小文件。Data URLs 由四个部分组成：前缀 (data:)、指示数据类型的 MIME 类型、如果非文本则为可选的 base64 标记、数据本身：

```
data:[<mediatype>][;base64],<data>
复制代码
```

mediatype 是个 MIME 类型的字符串，例如 "image/jpeg" 表示 JPEG 图像文件。如果被省略，则默认值为 text/plain;charset=US-ASCII

如果数据是文本类型，你可以直接将文本嵌入 (根据文档类型，使用合适的实体字符或转义字符)。如果是二进制数据，你可以将数据进行 base64 编码之后再进行嵌入。

由于一般在网页中嵌入纯文本文件的情况较少，主要是嵌入图片、音视频等二进制文件。音视频文件我不太了解，本文暂且不谈，只谈图片（从技术原理上来说，理论上也是可以通过 data URL 嵌入一些小的音视频文件的）。

图片是二进制文件，而非纯文本文件，任何二进制文件从服务器传输到客户端浏览器，本质上都是先对图片进行编码，编码成一系列字符，然后将这些编码后的字符通过 IO 流进行传输，客户端接收后再解码成图片渲染到页面上。而 base64 就是其中的一种编码方式，data URL 对图片这类二进制文件就是采用 base64 编码，然后将编码后的一系列字符作为上述 data URL 的第四部分（即：data 部分）的内容。（题外话：编码后的字符数量根据文件大小而定，如果文件较大，则字符数量可能会非常多）

如何计算图片的 Data URL
================

有一些网站自动提供了此功能，可以将需要使用 data URL 的图片先上传到这些网站，经过网站的解析之后，就会生成供不同场景使用的不同的 data URL，例如：有使用在 `<img src...>` 场景或 `background: url(...)` 场景下的 data URL 等。直接复制贴到代码里即可。这些网站举例如下：

*   [websemantics.uk/tools/image…](https://link.juejin.cn?target=https%3A%2F%2Fwebsemantics.uk%2Ftools%2Fimage-to-data-uri-converter%2F "https://websemantics.uk/tools/image-to-data-uri-converter/")
*   [jpillora.com/base64-enco…](https://link.juejin.cn?target=http%3A%2F%2Fjpillora.com%2Fbase64-encoder%2F "http://jpillora.com/base64-encoder/")

Data URL 的弊端
============

*   由于是将文件的 base64 编码硬编码写入到代码中，所以代码不太好维护
*   无法对过大的文件使用 Data URL，因为有些浏览器会对 data URL 的大小有上限限制
*   会有 [XSS](https://link.juejin.cn?target=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FCross-site_scripting "https://en.wikipedia.org/wiki/Cross-site_scripting") 攻击的可能性

参考文档
====

*   [MDN - Data URLs](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FHTTP%2FBasics_of_HTTP%2FData_URIs "https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/Data_URIs")
*   [CSS-TRICKS - Data URIs](https://link.juejin.cn?target=https%3A%2F%2Fcss-tricks.com%2Fdata-uris%2F "https://css-tricks.com/data-uris/")
*   [Why The data: URI Scheme Could Help Save Your Slow Site](https://link.juejin.cn?target=https%3A%2F%2Fwww.sitepoint.com%2Fwhy-the-data-uri-scheme-could-help-save-your-slow-site%2F "https://www.sitepoint.com/why-the-data-uri-scheme-could-help-save-your-slow-site/")
*   [Make fewer HTTP requests: What this means and how to do it](https://link.juejin.cn?target=https%3A%2F%2Fraygun.com%2Fblog%2Fmake-fewer-http-requests%2F "https://raygun.com/blog/make-fewer-http-requests/")
*   [Wikipedia-Base64](https://link.juejin.cn?target=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FBase64 "https://en.wikipedia.org/wiki/Base64")