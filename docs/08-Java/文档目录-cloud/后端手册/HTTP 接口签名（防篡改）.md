目录

# HTTP 接口签名（防篡改）

[`yudao-spring-boot-starter-protection` (opens new window)](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-framework/yudao-spring-boot-starter-protection/) 技术组件，由它的 [`signature` (opens new window)](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-framework/yudao-spring-boot-starter-protection/src/main/java/cn/iocoder/yudao/framework/signature/) 包，提供 HTTP 接口签名特性，提高安全性。

例如说：项目给第三方提供 HTTP 接口时，为了提高对接中数据传输的安全性（防止请求参数被篡改），同时校验调用方的有效性，通常都需要增加签名 sign。

市面上也有非常多的案例，例如说：

*   [《微信支付 —— 安全规范》 (opens new window)](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=4_3)
*   [《支付宝 —— 签名 》 (opens new window)](https://opendocs.alipay.com/common/02khjm)

## [#](#_1-实现原理) 1. 实现原理

在 Controller 的方法上，添加 `@ApiSignature` 注解，声明它需要签名。

然后，通过 AOP 切面，ApiSignatureAspect 对这些方法进行拦截，校验签名是否正确。它的签名算法如下：

```java
// ApiSignatureAspect.java

String serverSignatureString = buildSignatureString(signature, request, appSecret)
DigestUtil.sha256Hex(serverSignatureString);

    private String buildSignatureString(ApiSignature signature, HttpServletRequest request, String appSecret) {
        SortedMap<String, String> parameterMap = getRequestParameterMap(request); // 请求头
        SortedMap<String, String> headerMap = getRequestHeaderMap(signature, request); // 请求参数
        String requestBody = StrUtil.nullToDefault(ServletUtils.getBody(request), ""); // 请求体
        return MapUtil.join(parameterMap, "&", "=")
                + requestBody
                + MapUtil.join(headerMap, "&", "=")
                + appSecret;
    }

```

① 将请求头、请求体、请求参数，按照一定顺序排列，然后添加密钥，获得需要进行签名的字符串。

其中，每个调用方 `appId` 对应一个唯一 `appSecret`，通过在 Redis 配置，它对应 key 为 `api_signature_app` 的 HASH 结构，hashKey 为 `appId`。

② 之后，通过 SHA256 进行加密，得到签名 sign。

* * *

注意：第三方调用时，每次请求 Header 需要带上 `appId`、`timestamp`、`nonce`、`sign` 四个参数：

*   `appId`：调用方的唯一标识。
*   `timestamp`：请求时的时间戳。
*   `nonce`：用于请求的防重放攻击，每次请求唯一，例如说 UUID。
*   `sign`：HTTP 签名。

疑问：为什么使用请求 Header 传参？

避免这四个参数，在请求 QueryString、Request Body 可能重复的问题！

## [#](#_2-使用示例) 2. 使用示例

① 在需要使用的 `xxx-biz` 模块的 ，引入 `yudao-spring-boot-starter-protection` 依赖：

```xml
<dependency>
    <groupId>cn.iocoder.boot</groupId>
    <artifactId>yudao-spring-boot-starter-protection</artifactId>
</dependency>

```

② 在 Redis 添加一个 `appId` 为 `test`，密钥为 `123456` 的配置：

```bash
hset api_signature_app test 123456

```

③ 在 Controller 的方法上，添加 `@ApiSignature` 注解：

```java
// UserController.java

@GetMapping("/page")
@Operation(summary = "获得用户分页列表")
@PreAuthorize("@ss.hasPermission('system:user:list')")
@ApiSignature(timeout = 30, timeUnit = TimeUnit.MINUTES) // 关键是此处。ps：设置为 30 分钟，只是为了测试方便，不是必须！
public CommonResult<PageResult<UserRespVO>> getUserPage(@Valid UserPageReqVO pageReqVO) {
    // ... 省略代码
}

```

④ 调用该 API 接口，执行成功。如下是一个 IDEA HTTP 的示例：

```bash
// UserController.http

GET {{baseUrl}}/system/user/page?pageNo=1&pageSize=10
Authorization: Bearer {{token}}
appId: test
timestamp: 1717494535932
nonce: e7eb4265-885d-40eb-ace3-2ecfc34bd639
sign: 01e1c3df4d93eafc862753641ebfc1637e70f853733684a139f8b630af5c84cd
tenant-id: {{adminTenentId}}

```

*   `appId`、`timestamp`、`nonce`、`sign` 通过请求 Header 传递，避免和请求参数冲突。【必须传递】
*   `timestamp`：请求时的时间戳。
*   `nonce`：用于请求的防重放攻击，每次请求唯一，例如说 UUID。
*   `sign`：HTTP 签名。如果你不知道多少，可以直接 debug ApiSignatureAspect 的 `serverSignature` 处的代码，进行获得。

友情提示：强烈建议 ApiSignatureAspect 的实现代码，一共就 100 多行代码。可以通过 ApiSignatureTest 单元测试，直接执行噢！