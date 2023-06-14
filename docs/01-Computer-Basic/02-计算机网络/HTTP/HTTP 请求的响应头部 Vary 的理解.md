> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [blog.csdn.net](https://blog.csdn.net/qq_29405933/article/details/84315254)

1. 引言
=====

由于我主要是做 Android 开发的，所以 Vary 很陌生，今天看到 [OkHttp](https://so.csdn.net/so/search?q=OkHttp&spm=1001.2101.3001.7020) 源码中，有对 Vary 的判断，就在网上查询并且仔细研究了一下，感觉比较有用，就记录一下。

2. 讲解
=====

简单说一下我对 Vary 一些理解，自己的一点总结。

Vary 一般出现在 HTTP 请求的响应信息头部，比如像下面这样：

> ```
> HTTP/1.0 200 OK 
> Date: Fri, 24 Sep 2010 23:09:32 GMT 
> Content-Type: application/json;charset=UTF-8 
> Content-Language: en-US 
> Vary: Accept-Encoding,User-Agent 
> Age: 1235 
> X-Cache: HIT from cache.kolich.local 
> X-Cache-Lookup: HIT from cache.kolich.local:80 
> Content-Length: 25090 
> Connection: close
> ```

或者是这样

> HTTP/1.1 200 OK  
> Server: nginx  
> Date: Tue, 31 Dec 2013 16:34:48 GMT  
> Content-Type: application/x-javascript  
> Content-Length: 66748  
> Last-Modified: Tue, 31 Dec 2013 14:30:52 GMT  
> Connection: keep-alive  
> Vary: Accept-Encoding  
> ETag: "52c2d51c-104bc"  
> Expires: Fri, 29 Dec 2023 16:34:48 GMT  
> Cache-Control: max-age=315360000  
> Strict-Transport-Security: max-age=31536000  
> Accept-Ranges: bytes

Vary 出现在响应信息中的作用是什么呢？首先这是由服务器端添加，添加到响应头部。大部分情况下是用在客户端缓存机制或者是缓存服务器在做缓存操作的时候，会使用到 Vary 头，会读取响应头中的 Vary 的内容，进行一些缓存的判断。接下来我们就来说一下 Vary 如何做缓存判断。

对于服务器提供的某个接口来说，有时候会出现不同种类的客户端对其进行网络请求获取数据，不同的客户端可能支持的压缩编码方式不同，可能有的客户端不支持压缩，那么服务器端返回的数据就不能压缩，有的支持 gzip 编码，那么服务器端就可以进行 gzip 编码返回给客户端，客户端获取到数据之后，做响应的 gzip 解码。还有种情况，对于不同的客户端，需要的内容不一样，比如针对特定，浏览器要求输出的内容不一样，比如在 IE6 浏览器上要输出不一样的内容，这就需要服务器端做不同的数据返回。所以说，服务器提供的同一个接口，客户端进行同样的网络请求，对于不同种类的客户端可能需要的数据不同，服务器端的返回方式返回数据也会不同。对于这个问题的解决，我想很多人是清除的，我们可以在请求信息添加 Accept-Encoding、User-Agent 等头部。

1.  Accept-Encoding 表示客户端支持的编码格式，常见的编码格式有 gzip/compress/deflate/identity，服务器端会根据客户端提供的 Accept-Encoding 对返回的内容进行编码，并通过添加响应头 Content-Encoding 表明服务器端使用的编码格式。详解请参考我的另一篇博客 [[连接](https://blog.csdn.net/qq_29405933/article/details/84247999)]；
2.  User-Agent 表示客户端代理，使得服务器能够识别客户使用的操作系统及版本、CPU 类型、浏览器及版本、浏览器渲染引擎、浏览器语言、浏览器插件等。这样服务器就能区别不同种类的客户端，做出不同的数据返回操作。

这些都没有问题，顺利的解决了我们上面提出的问题，然而，当使用到缓存的时候，就会有问题，比如要求针对 IE5 和 IE6 显示不同的数据，针对同一接口的同样的请求，缓存服务器中分别存储了 IE5 和 IE6 两份数据，由于同样的接口同样的请求，一旦服务器判定要从缓存中获取数据的话，很有可能会导致两个客户端的请求拿到同一份数据，这就会让那个数据展示出现问题；再比如说 A 类客户端支持压缩格式 gzip，B 类客户端不支持压缩，对于同一个接口同样的请求，如果服务器端打算从缓存服务器中取出数据返回的话，A、B 两类客户端可能会收到同样的数据，这样要就会导致编解码出错。

这时候我们的 Vary 响应头就登场了，Vary 的字面意思是 “不一、多样化”，顾名思义，它的存在区分同样的网络请求的不同之处，其实就是通过头部信息来区分。一个简单的 Vary 头包括：

> Vary: Accept-Encoding
> 
> Vary: Accept-Encoding,User-Agent
> 
> Vary: X-Some-Custom-[Header](https://so.csdn.net/so/search?q=Header&spm=1001.2101.3001.7020),Host
> 
> Vary: *

Vary 存在于响应头中，它的内容来自于请求头中相关字段，Vary 头的内容如果是多条则用 “,” 分割。缓存服务器会将某接口的首次请求结果缓存下来（包括响应头中的 Vary），后面在发生相同请求的时候缓存服务器会拿着缓存的 Vary 来进行判断。比如 Vary: Accept-Encoding,User-Agent，那么 Accept-Encoding 与 User-Agent 两个请求头的内容，就会作为判断是否返回缓存数据的依据，当缓存服务器中相同请求的缓存数据的编码格式、代理服务与当前请求的编码格式、代理服务一致，那就返回缓存数据，否则就会从服务器重新获取新的数据。当缓存服务器中已经缓存了该条请求，那么某次服务器端的响应头中如果 Vary 的值改变，则 Vary 会更新到该请求的缓存中去，下次请求会对比新的 Vary 内容。

官方解释 Vary 头：告知下游的代理服务器，应当如何对以后的请求协议头进行匹配，以决定是否可使用已缓存的响应内容而不是重新从原服务器请求新的内容。

Vary: * ，这个我不太理解，我个人的理解是，当 Vary 的值为 “*” 时，意味着请求头中的那些字段的值不能用来区分当前请求是从缓存服务拿还是重新请求获取，在 Android 的 OkHttp 框架中，客户端接收到服务器的响应数据，进行缓存处理时，一旦判断响应头有 Vary:* 时，就不缓存该条数据。所以我猜想缓存服务器会不会也是这样，当 Vary 的值为 “*” 时，不做缓存。

3. 总结
=====

1.  **Vary 是作为响应头由服务器端返回数据时添加的头部信息；**
2.  **Vary 头的内容来自于当前请求的 Request 头部 Key，比如 Accept-Encoding、User-Agent 等；**
3.  **缓存服务器进行某接口的网络请求结果数据缓存时，会将 Vary 一起缓存；**
4.  **HTTP 请求，缓存中 Vary 的内容会作为当前缓存数据是否可以作为请求结果返回给客户端的判断依据；**
5.  **HTTP 请求，响应数据中的 Vary 用来判断当前缓存中同请求的数据的 Vary 是否失效，如果缓存中的 Vary 与服务器刚拿到的 Vary 不一致，则可以进行更新。**
6.  **当 Vary 的值为 “*”，意味着请求头中的所有信息都不可作为是否从缓存服务器拿数据的判断依据。**

4. 疑问
=====

当 Vary 的值为 “*” 时，意味着什么？Vary 是否有更好的解释？官网的英文本人实在是能力有限翻译不过来，哪位大神有兴趣，可以指点一二，我不胜感激，我把官网的英文解释贴上来：

[7.1.4](https://tools.ietf.org/html/rfc7231#section-7.1.4). Vary

The "Vary" header field in a response describes what parts of a request message, aside from the method, Host header field, and request target, might influence the origin server's process for selecting and representing this response. The value consists of either a single asterisk ("*") or a list of header field names (case-insensitive).

Vary = "*" / 1#field-name

A Vary field value of "*" signals that anything about the request might play a role in selecting the response representation, possibly including elements outside the message syntax (e.g., the client's network address). A recipient will not be able to determine whether this response is appropriate for a later request without forwarding the request to the origin server. A proxy MUST NOT generate a Vary field with a"*" value.

A Vary field value consisting of a comma-separated list of names indicates that the named request header fields, known as the selecting header fields, might have a role in selecting the representation. The potential selecting header fields are not limited to those defined by this specification.

For example, a response that contains

Vary: accept-encoding, accept-language

indicates that the origin server might have used the request's Accept-Encoding and Accept-Language fields (or lack thereof) as determining factors while choosing the content for this response.

An origin server might send Vary with a list of fields for two purposes:

1. To inform cache recipients that they MUST NOT use this response to satisfy a later request unless the later request has the same values for the listed fields as the original request ([Section 4.1 of [RFC7234]](https://tools.ietf.org/html/rfc7234#section-4.1)). In other words, Vary expands the cache key required to match a new request to the stored cache entry. Fielding & Reschke Standards Track [Page 70]

2. To inform user agent recipients that this response is subject to content negotiation ([Section 5.3](https://tools.ietf.org/html/rfc7231#section-5.3)) and that a different representation might be sent in a subsequent request if additional parameters are provided in the listed header fields (proactive negotiation).

An origin server SHOULD send a Vary header field when its algorithm for selecting a representation varies based on aspects of the request message other than the method and request target, unless the variance cannot be crossed or the origin server has been deliberately configured to prevent cache transparency. For example, there is no need to send the Authorization field name in Vary because reuse across users is constrained by the field definition ([Section 4.2 of [RFC7235]](https://tools.ietf.org/html/rfc7235#section-4.2)). Likewise, an origin server might use Cache-Control directives ([Section 5.2 of [RFC7234]](https://tools.ietf.org/html/rfc7234#section-5.2)) to supplant Vary if it considers the variance less significant than the performance cost of Vary's impact on caching.