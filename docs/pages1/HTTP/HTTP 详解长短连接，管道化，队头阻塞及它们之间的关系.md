> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [blog.csdn.net](https://blog.csdn.net/fesfsefgs/article/details/108294050)

希望能耐心看下去，篇幅比较长，文字偏多，我尽量用易懂的图解释，尽可能详细的去叙述，总结清楚

Http 长连接 和 短连接：
---------------

*   **早期的 HTTP 协议，如 HTTP0.9 之前**也被称为是 “无连接” 的协议。不会与服务器保持长期的连接状态，所以也称为**短连接**，短连接每一次的请求都需要重新建立 TCP 连接，有 10 个请求就需要建立 10 次 TCP 连接，这个效率，可想而知是非常低的
*   **到 Http1.0** 就出现了**长连接**的通信方式，解决了短连接多次建立 TCP 连接的痛点，现在`Http1.1`基本都是默认开启`Connection: keep-alive` 长连接的， TCP 连接只要建立一次，后续的请求都复用该通道，不用再重新建立 TCP 通道，效率大大提升

![](https://img-blog.csdnimg.cn/20200829141134742.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Zlc2ZzZWZncw==,size_16,color_FFFFFF,t_70#pic_center)

`需要注意的是`：不管是 http 短连接还是长连接，它们的请求和响应都有有序的，都是等上一次请求响应后，才接着下一个请求的，`那能不能不等第一次请求回来，我就开始发第二次请求呢？这就引出http管道化了`

  

http 的管道化和非管道化：
---------------

             `在长连接的基础上`，HTTP1.1 进一步地支持在持久连接上`使用管道化（pipelining）特性`，这是`相对于keep-alive连接的又一性能优化`。在相应到达之前，可以将多条请求放入队列，当第一条请求发往服务器的时候，第二第三条请求也可以开始发送了，不用等到第一条请求响应回来，在高延时网络条件下，这样做可以降低网络的环回时间，提高性能。

**非管道化与管道化的区别示意：**  
![](https://img-blog.csdnimg.cn/20200829145502688.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Zlc2ZzZWZncw==,size_16,color_FFFFFF,t_70#pic_center)

  

http 队首阻塞：
----------

简单理解就是需要排队，队首的事情没有处理完的时候，后面的人都要等着。  
**队头阻塞” 与短连接和长连接无关**，而是`由 HTTP 基本的“请求 - 应答”机制所导致的`。因为 HTTP 规定报文必须是 “一发一收”，这就形成了一个先进先出的“串行” 队列。  
`而http的队首阻塞，在管道化和非管道化下，表现是不同的`

**http1.0 的队首阻塞 (非管道化下) ：**

             对于同一个 tcp 连接，`所有的http1.0请求放入队列中`，只有前一个请求的响应收到了，然后才能发送下一个请求，由下图可以看到，如果前一个请求卡着了，那么队列中后续的 http 就会阻塞  
![](https://img-blog.csdnimg.cn/20200829150852456.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Zlc2ZzZWZncw==,size_16,color_FFFFFF,t_70#pic_center)  
![](https://img-blog.csdnimg.cn/20200829152933362.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Zlc2ZzZWZncw==,size_16,color_FFFFFF,t_70#pic_center)

`可见，http1.0的队首组塞发生在客户端。`  
  

**http1.1 的队首阻塞 (管道化下)**

             对于同一个 tcp 连接，`开启管道化后`，http1.1 允许一次发送多个 http1.1 请求，也就是说，不必等前一个响应收到，就可以发送下一个请求，这样就`解决了http1.0的客户端的队首阻塞`。**但是**，http1.1 规定，服务器端的响应的发送要根据请求被接收的顺序排队，也就是说，`先接收到的请求需要先响应回来(如下图所示)`。这样造成的问题是，如果最先收到的请求的处理时间长的话，响应生成也慢，就会阻塞已经生成了的响应的发送。`也会造成队首阻塞,响应的阻塞`。  
![](https://img-blog.csdnimg.cn/20200829151300165.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Zlc2ZzZWZncw==,size_16,color_FFFFFF,t_70#pic_center)  
**下图演示的是**，`第一个响应延迟后，后续响应跟着延迟`  
![](https://img-blog.csdnimg.cn/20200829153535184.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Zlc2ZzZWZncw==,size_16,color_FFFFFF,t_70#pic_center)

`可见，应用管道化技术后，http1.1的队首阻塞发生在服务器端。`

  

HTTP 队头阻塞 的解决方法
---------------

**并发 TCP 连接：**  
             我们知道对于一个域名而言，是允许分配多个长连接的，那么可以理解成增加了任务队列，也就是说不会导致一个任务阻塞了该任务队列的其他任务，在 RFC 规范中规定客户端最多并发 2 个连接，不过实际情况就是要比这个还要多，`Chrome中是6个，说明浏览器一个域名采用6个TCP连接，并发HTTP请求`

  

**域名分片**  
             顾名思义，我们可以在一个域名下分出多个二级域名出来，而它们最终指向的还是同一个服务器，这样子的话就可以并发处理的任务队列更多，也更好的解决了队头阻塞的问题。  
举个例子，比如 baidu.com，可以分出很多二级域名，比如 zhidao.baidu.com，xxx.baidu.com 这样子就可以有效解决队头阻塞问题。  
![](https://img-blog.csdnimg.cn/2020082916035293.png#pic_center)  
  

**利用 HTTP2 的多路复用解决：**  
             对于 HTTP1.1 中管道化导致的请求 / 响应级别的队头阻塞，`可以使用HTTP2的多路复用解决`。  
http2 中将多个请求复用同一个 tcp 通道中，通过**二进制分帧**并且**给每个帧**打上**流**的 **ID** 去避免依次响应的问题，对方接收到帧之后**根据 ID 拼接出流**，这样就可以做到乱序响应从而避免请求时的队首阻塞问题，

当然，即使使用 HTTP2，如果 HTTP2 底层使用的是 TCP 协议，**仍可能出现 TCP 队头阻塞。**  
`下图为http2多路复用，解决服务器响应时http队首阻塞演示`  
![](https://img-blog.csdnimg.cn/20200829161234921.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Zlc2ZzZWZncw==,size_16,color_FFFFFF,t_70#pic_center)

  

总结：
---

**HTTP 队头阻塞**

对于每一个 HTTP 请求，会被放入一个任务队列中串行执行，一旦队首任务请求太慢时，就会阻塞后面的请求处理

**有非管道化和管道化，两种阻塞方式：**

`非管道化：`完全串行执行，请求 -> 响应 -> 请求 -> 响应…，后一个请求必须在前一个响应之后发送，`发生在客户端，http请求阻塞`

`管道化：`请求可以并行发出，但是响应必须串行返回。后一个响应必须在前一个响应之后。原因是，没有序号标明顺序，只能串行接收，`发生在服务端，http响应阻塞`

**管道化请求的致命弱点:**

1.  会造成队头阻塞，前一个响应未及时返回，后面的响应被阻塞
2.  请求必须是幂等请求，也就是`只有GET和HEAD请求才能管道化`，不能修改资源。因为，意外中断时候，客户端需要把未收到响应的请求重发，非幂等请求，会`造成资源破坏`。

由于这个原因，`目前大部分浏览器和Web服务器，都关闭了管道化，采用非管道化模式。`

**无论是非管道化还是管道化，都会造成队头阻塞 (请求，响应阻塞)。**

**解决 http 队头阻塞的方法：**

`1. 并发TCP连接`（浏览器一个域名采用 6-8 个 TCP 连接，并发 HTTP 请求）  
`2. 域名分片`（多个域名，可以建立更多的 TCP 连接，从而提高 HTTP 请求的并发）  
`2. HTTP2方式`（多路复用特性）

  

`额外的：`
------

http2 中的多路复用和 http1.1 中的 keep-alive 有什么区别？
------------------------------------------

![](https://img-blog.csdnimg.cn/20200829162206141.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Zlc2ZzZWZncw==,size_16,color_FFFFFF,t_70#pic_center)  
**共同点：** `都可以复用同一条TCP通道`

**区别：**  
`keep-alive ：有顺序，有阻塞的请求`  
1. 请求 a.html  
2. 响应 a.html  
3. 请求 b.css  
4. 响应 b.css

`https多路复用：并发请求，非阻塞的`

**详细描述：**  
`keep-alive`虽然可以复用同一条 TCP 通道，但必须等到服务端响应了前一次请求，才能发起第二次请求 -> 阻塞。 按顺序发送请求，按顺序接收请求，这样接收端才不会乱掉。`从HTTP/1.1起，默认都开启了Keep-Alive，保持连接特性`，简单地说，当一个网页打开完成后，客户端和服务器之间用于传输 HTTP 数据的 TCP 连接不会关闭，如果客户端再次访问这个服务器上的网页，会继续使用这一条已经建立的连接，Keep-Alive 不会永久保持连接，它有一个保持时间，可以在不同的服务器软件（如 Apache）中设定这个时间

```
Connection: Keep-Alive
Keep-Alive: max=5, timeout=120
```

`http2 的多路复用`可以在一条 TCP 通道同时发送多个请求，不一定要按照顺序，非阻塞的，`先响应先回来`，响应式时也不用等上一个请求先响应，`这些请求都有唯一标识，所以可以无序。`