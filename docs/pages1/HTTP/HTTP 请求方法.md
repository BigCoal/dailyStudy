# HTTP 请求方法

[规范](#规范 "Permalink to 规范")
---------------------------

HTTP 定义了一组**请求方法**，以表明要对给定资源执行的操作。指示针对给定资源要执行的期望动作。虽然他们也可以是名词, 但这些请求方法有时被称为 HTTP 动词。每一个请求方法都实现了不同的语义，但一些共同的特征由一组共享：例如一个请求方法可以是 [safe](https://developer.mozilla.org/zh-CN/docs/Glossary/safe), [idempotent](https://developer.mozilla.org/zh-CN/docs/Glossary/Idempotent), 或 [cacheable (en-US)](https://developer.mozilla.org/en-US/docs/Glossary/cacheable "Currently only available in English (US)")。

`[GET](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET)`

GET 方法请求一个指定资源的表示形式，使用 GET 的请求应该只被用于获取数据。

`[HEAD](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD)`

HEAD 方法请求一个与 GET 请求的响应相同的响应，但没有响应体。

`[POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)`

POST 方法用于将实体提交到指定的资源，通常导致在服务器上的状态变化或副作用。

`[PUT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT)`

PUT 方法用请求有效载荷替换目标资源的所有当前表示。

`[DELETE](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE)`

DELETE 方法删除指定的资源。

`[CONNECT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/CONNECT)`

CONNECT 方法建立一个到由目标资源标识的服务器的隧道。

`[OPTIONS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS)`

OPTIONS 方法用于描述目标资源的通信选项。

`[TRACE](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/TRACE)`

TRACE 方法沿着到目标资源的路径执行一个消息环回测试。

`[PATCH](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATCH)`

PATCH 方法用于对资源应用部分修改。

[浏览器兼容性](#浏览器兼容性 "Permalink to 浏览器兼容性")
---------------------------------------

[Report problems with this compatibility data on GitHub](https://github.com/mdn/browser-compat-data/issues/new?body=%3C%21--+Tips%3A+where+applicable%2C+specify+browser+name%2C+browser+version%2C+and+mobile+operating+system+version+--%3E%0A%0A%23%23%23%23+What+information+was+incorrect%2C+unhelpful%2C+or+incomplete%3F%0A%0A%23%23%23%23+What+did+you+expect+to+see%3F%0A%0A%23%23%23%23+Did+you+test+this%3F+If+so%2C+how%3F%0A%0A%0A%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EMDN+page+report+details%3C%2Fsummary%3E%0A%0A*+Query%3A+%60http.methods%60%0A*+MDN+URL%3A+https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FHTTP%2FMethods%0A*+Report+started%3A+2022-03-11T08%3A09%3A26.176Z%0A%0A%3C%2Fdetails%3E&title=http.methods+-+%3CPUT+TITLE+HERE%3E "Report an issue with this compatibility data")

### Legend

Full support

Full support

Compatibility unknown

Compatibility unknown

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out [https://github.com/mdn/browser-compat-data](https://github.com/mdn/browser-compat-data) and send us a pull request.

[另见](#另见 "Permalink to 另见")
---------------------------