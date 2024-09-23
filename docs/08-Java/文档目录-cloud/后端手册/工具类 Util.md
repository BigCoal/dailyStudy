目录

# 工具类 Util

本小节，介绍项目中使用到的工具类，避免大家重复造轮子。

## [#](#_1-hutool) 1. Hutool

项目使用 [Hutool (opens new window)](https://www.bookstack.cn/read/hutool/a6819f05207359bb.md) 作为主工具库。Hutool 是国产的一个 Java 工具包，它可以帮助我们简化每一行代码，减少每一个方法，让 Java 语言也可以“甜甜的”。

[`yudao-common` (opens new window)](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-framework/yudao-common/src/main/java/cn/iocoder/yudao/framework/common/) 模块的 [`util` (opens new window)](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-framework/yudao-common/src/main/java/cn/iocoder/yudao/framework/common/util/) 包作为辅工具库，以 Utils 结尾，补充 Hutool 缺少的工具能力。

友情提示：常用的工具类，使用 ⭐ 标记，需要的时候可以找找有没对应的工具方法。

作用

Hutool

芋道 Utils

数组工具

[ArrayUtil (opens new window)](https://www.bookstack.cn/read/hutool/50db4cabc87b5968.md)

[ArrayUtils (opens new window)](https://github.com/YunaiV/yudao-cloud/blob/master/yudao-framework/yudao-common/src/main/java/cn/iocoder/yudao/framework/common/util/collection/ArrayUtils.java)

⭐ 集合工具

[CollUtil (opens new window)](https://www.bookstack.cn/read/hutool/85a7389837bd401f.md)

[CollectionUtils (opens new window)](https://github.com/YunaiV/yudao-cloud/blob/master/yudao-framework/yudao-common/src/main/java/cn/iocoder/yudao/framework/common/util/collection/CollectionUtils.java)

⭐ Map 工具

[MapUtil (opens new window)](https://www.bookstack.cn/read/hutool/fa3d273651700cb0.md)

[MapUtils (opens new window)](https://github.com/YunaiV/yudao-cloud/blob/master/yudao-framework/yudao-common/src/main/java/cn/iocoder/yudao/framework/common/util/collection/MapUtils.java)

Set 工具

[SetUtils (opens new window)](https://github.com/YunaiV/yudao-cloud/blob/master/yudao-framework/yudao-common/src/main/java/cn/iocoder/yudao/framework/common/util/collection/SetUtils.java)

List 工具

[ListUtil (opens new window)](https://apidoc.gitee.com/dromara/hutool/cn/hutool/core/collection/ListUtil.html)

文件工具

[FileUtil (opens new window)](https://www.bookstack.cn/read/hutool/d116bcb301965bd7.md)  
[FileTypeUtil (opens new window)](https://www.bookstack.cn/read/hutool/cc05a1607f263f94.md)

[FileUtils (opens new window)](https://github.com/YunaiV/yudao-cloud/blob/master/yudao-framework/yudao-common/src/main/java/cn/iocoder/yudao/framework/common/util/io/FileUtils.java)

压缩工具

[ZipUtil (opens new window)](https://www.bookstack.cn/read/hutool/bfd2d43bcada297e.md)

[IoUtils (opens new window)](https://github.com/YunaiV/yudao-cloud/blob/master/yudao-framework/yudao-common/src/main/java/cn/iocoder/yudao/framework/common/util/io/IoUtils.java)

IO 工具

[ZipUtil (opens new window)](https://www.bookstack.cn/read/hutool/d648ca4612bf8941.md)

Resource 工具

[ResourceUtil (opens new window)](https://apidoc.gitee.com/dromara/hutool/cn/hutool/core/io/resource/ResourceUtil.html)

JSON 工具

[JsonUtils (opens new window)](https://github.com/YunaiV/yudao-cloud/blob/master/yudao-framework/yudao-common/src/main/java/cn/iocoder/yudao/framework/common/util/json/JsonUtils.java)

数字工具

[NumberUtil (opens new window)](https://www.bookstack.cn/read/hutool/1ac79ebaf52a0372.md)

[NumberUtils (opens new window)](https://github.com/YunaiV/yudao-cloud/blob/master/yudao-framework/yudao-common/src/main/java/cn/iocoder/yudao/framework/common/util/number/NumberUtils.java)

对象工具

[ObjectUtil (opens new window)](https://www.bookstack.cn/read/hutool/f63b669ba259e4f6.md)

[ObjectUtils (opens new window)](https://github.com/YunaiV/yudao-cloud/blob/master/yudao-framework/yudao-common/src/main/java/cn/iocoder/yudao/framework/common/util/object/ObjectUtils.java)

唯一 ID 工具

[IdUtil (opens new window)](https://www.bookstack.cn/read/hutool/bfd2d43bcada297e.md)

⭐ 字符串工具

[StrUtil (opens new window)](https://www.bookstack.cn/read/hutool/093507f34fe0715d.md)

[StrUtils (opens new window)](https://github.com/YunaiV/yudao-cloud/blob/master/yudao-framework/yudao-common/src/main/java/cn/iocoder/yudao/framework/common/util/string/StrUtils.java)

时间工具

[DateUtil (opens new window)](https://www.bookstack.cn/read/hutool/8168b022b2c31abe.md)

[DateUtils (opens new window)](https://github.com/YunaiV/yudao-cloud/blob/master/yudao-framework/yudao-common/src/main/java/cn/iocoder/yudao/framework/common/util/date/DateUtils.java)

反射工具

[ReflectUtil (opens new window)](https://www.bookstack.cn/read/hutool/2ef7c87c2912181e.md)

异常工具

[ExceptionUtil (opens new window)](https://www.bookstack.cn/read/hutool/5ad2b6504b1cbdde.md)

随机工具

[RandomUtil (opens new window)](https://www.bookstack.cn/read/hutool/377f64112be7197a.md)

[RandomUtils (opens new window)](https://github.com/YunaiV/yudao-cloud/blob/master/yudao-framework/yudao-spring-boot-starter-test/src/main/java/cn/iocoder/yudao/framework/test/core/util/RandomUtils.java)

URL 工具

[URLUtil (opens new window)](https://www.bookstack.cn/read/hutool/5122006c1ce039fe.md)

[HttpUtils (opens new window)](https://github.com/YunaiV/yudao-cloud/blob/master/yudao-framework/yudao-common/src/main/java/cn/iocoder/yudao/framework/common/util/http/HttpUtils.java)

Servlet 工具

[ServletUtils (opens new window)](https://github.com/YunaiV/yudao-cloud/blob/master/yudao-framework/yudao-common/src/main/java/cn/iocoder/yudao/framework/common/util/servlet/ServletUtils.java)

Spring 工具

[SpringUtil (opens new window)](https://apidoc.gitee.com/dromara/hutool/cn/hutool/extra/spring/SpringUtil.html)

[SpringAopUtils (opens new window)](https://github.com/YunaiV/yudao-cloud/blob/master/yudao-framework/yudao-common/src/main/java/cn/iocoder/yudao/framework/common/util/spring/SpringAopUtils.java)  
[SpringExpressionUtils (opens new window)](https://github.com/YunaiV/yudao-cloud/blob/master/yudao-framework/yudao-common/src/main/java/cn/iocoder/yudao/framework/common/util/spring/SpringExpressionUtils.java)

分页工具

[PageUtils (opens new window)](https://github.com/YunaiV/yudao-cloud/blob/master/yudao-framework/yudao-common/src/main/java/cn/iocoder/yudao/framework/common/util/object/PageUtils.java)

校验工具

[ValidationUtil (opens new window)](https://apidoc.gitee.com/dromara/hutool/cn/hutool/extra/validation/ValidationUtil.html)

[ValidationUtils (opens new window)](https://github.com/YunaiV/yudao-cloud/blob/master/yudao-framework/yudao-common/src/main/java/cn/iocoder/yudao/framework/common/util/validation/ValidationUtils.java)

断言工具

[Assert (opens new window)](https://www.bookstack.cn/read/hutool/cf382b4542d5861e.md)

[AssertUtils (opens new window)](https://github.com/YunaiV/yudao-cloud/blob/master/yudao-framework/yudao-spring-boot-starter-test/src/main/java/cn/iocoder/yudao/framework/test/core/util/AssertUtils.java)

强烈推荐：

Guava 是 Google 开源的 Java 常用类库，如果你感兴趣，可以阅读 [《Guava 学习笔记》 (opens new window)](https://www.iocoder.cn/categories/Guava/?yudao) 文章。

## [#](#_2-lombok) 2. Lombok

[Lombok (opens new window)](https://github.com/projectlombok/lombok) 是一个 Java 工具，通过使用其定义的注解，自动生成常见的冗余代码，提升开发效率。

如果你没有学习过 Lombok，需要阅读下 [《芋道 Spring Boot 消除冗余代码 Lombok 入门》 (opens new window)](https://www.iocoder.cn/Spring-Boot/Lombok/?yudao) 文章。

在项目的根目录有 [`lombok.config` (opens new window)](https://github.com/YunaiV/yudao-cloud/blob/master/lombok.config) 全局配置文件，开启链式调用、生成的 toString/hashcode/equals 方法需要调用父方法。如下图所示：

![Lombok 配置](./static/01.png)

## [#](#_3-http-调用) 3. HTTP 调用

① 使用 Feign 实现声明式的调用，可参考[《芋道 Spring Boot 声明式调用 Feign 入门 》 (opens new window)](https://www.iocoder.cn/Spring-Boot/Feign/?yudao)文章。

② 使用 Hutool 自带的 [HttpUtil (opens new window)](https://www.bookstack.cn/read/hutool/bd15472881388385.md) 工具类。