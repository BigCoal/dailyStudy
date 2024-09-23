目录

# 如何去除 Redis 缓存

在一些场景下，不希望有 Redis 依赖，也有很多用户提出类似的诉求：

*   [有大佬实现了不带 Redis 的版本了吗？ (opens new window)](https://github.com/YunaiV/ruoyi-vue-pro/issues/645)
*   [某个环境没有 Redis，所以需要把 Redis 给禁用掉？ (opens new window)](https://t.zsxq.com/6CCPX)

但是，项目大量使用了 Redis 作为缓存、分布式锁、幂等性等功能，所以直接去除 Redis 会导致项目无法正常运行。

不过，我们可以换个思路，使用 [`jedis-mock` (opens new window)](https://github.com/fppt/jedis-mock) 库，在项目启动时，自动启动一个 Mock 的 Redis 服务，这样就可以实现不依赖 Redis 的运行。

## [#](#_1-如何启动) 1. 如何启动？

① 在 `yudao-server` 模块的 `pom.xml` 文件中，添加 `jedis-mock` 依赖：

```xml
        <dependency>
            <groupId>com.github.fppt</groupId>
            <artifactId>jedis-mock</artifactId>
            <version>1.1.2</version>
        </dependency>

```

然后，记得需要在 IDEA 中，刷新 Maven 依赖。

② 在 YudaoServerApplication 的 `main` 方法的开头，添加“启动 Redis 服务”的如下代码：

```java
import com.github.fppt.jedismock.RedisServer;

public class YudaoServerApplication {

    public static void main(String[] args) {
        // 启动 Redis 服务
        RedisServer redisServer = new RedisServer(6379);
        try {
            redisServer.start();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        SpringApplication.run(YudaoServerApplication.class, args);
    }

}

```

之后，启动 YudaoServerApplication 即可。

③ 打开管理后台，进行登录测试。如果登录成功，说明 Redis 已经被成功替换。

## [#](#_2-常见问题) 2. 常见问题？

① 启动的时候，出现如下的报错信息，可以直接忽略。

```text
2024-09-02 09:34:03.166 |  WARN 57508 | redisson-netty-1-2 [TID: N/A] o.s.b.a.d.r.RedisReactiveHealthIndicator | Redis health check failed

java.lang.IllegalArgumentException: Value must not be null
	at org.springframework.util.Assert.notNull(Assert.java:172)
	at org.springframework.boot.actuate.health.Health$Builder.withDetail(Health.java:247)
	at org.springframework.boot.actuate.data.redis.RedisHealth.up(RedisHealth.java:37)
	at org.springframework.boot.actuate.data.redis.RedisReactiveHealthIndicator.up(RedisReactiveHealthIndicator.java:73)
	at org.springframework.boot.actuate.data.redis.RedisReactiveHealthIndicator.lambda$getHealth$4(RedisReactiveHealthIndicator.java:69)

```

② 如果你在多个主机上部署了 Java 服务，无法使用这个方案。如果你在一个主机上部署了多个 Java 服务，可以使用这个方案。

原因是：`jedis-mock` 是在当前主机上启动的 Redis 服务，无法在多个主机上共享。