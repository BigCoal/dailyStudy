# github.io 打不开的解决方案

记得之前有 github.com 打不开或者打开很慢的解决方案，现在轮到了 github.io，哈哈。我的 github.io 很久开始就打不开了，当时从网上试了几种方法没成功就放弃了，今天查资料需要打开 github.io，又有点时间，所以主要针对这个解决了一下。从本文您可以了解到：

1.  碰到这种 dns 的问题该怎么排查？
2.  怎么解决打不开 github.io 的问题？

## 使用 ping

ping 命令其实很强大，不仅可以知道能不能连接，延时是多少，还**可以知道 dns 解析的 ip 地址**是多少，比如我们`ping www.baidu,com`，命令行显示如下：

```
PING www.baidu.com (14.215.177.38): 56 data bytes
64 bytes from 14.215.177.38: icmp_seq=0 ttl=56 time=9.461 ms
64 bytes from 14.215.177.38: icmp_seq=1 ttl=56 time=12.325 ms
64 bytes from 14.215.177.38: icmp_seq=2 ttl=56 time=15.366 ms
```

可以看到，后面小括号里面的 14.215.177.38 就是 ip 地址了。

然后我们去`ping github.io`，显示如下：

```
PING github.io (127.0.0.1): 56 data bytes
64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.030 ms
64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.105 ms
64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.084 ms
```

## 本地 hosts 文件

上面显示 ip 地址为`127.0.0.1`，这个就是本机地址嘛，然后我去`/etc/hosts`里面查看 hosts 文件有没有被意外修改过，没看到 github.io 被解析到`127.0.0.1`的记录，这就表示，**电脑上的 dns 解析是完好的，但是远程的 dns 解析很可能惨遭网络运营商的污染了**，从而导致解析的时候被解析到了`127.0.0.1`。

## 修改本机 dns

于是我们去修改本机的 dns，加入`114.114.144.114`和`8.8.8.8`，这两个 dns 都是**非商业用途的 dns**，解析成功率很高，并且纯净无广告。前一个是国内移动、电信和联通通用的 DNS，是国内用户上网常用的 DNS；后一个是 GOOGLE 公司提供的 DNS，该全球通用的。

这里以 mac 为例，依次打开系统偏好设置 -> 网络 -> 高级 ->dns，然后加入即可。加入之后需要刷新 mac 缓存，命令如下（**记住一定要带上 sudo，否则不会生效**）：

```
sudo killall -HUP mDNSResponder
```

然后我们再来`ping github.io`，显示如下：

```
PING github.io (8.8.8.8): 56 data bytes
64 bytes from 8.8.8.8: icmp_seq=0 ttl=64 time=36.350 ms
64 bytes from 8.8.8.8: icmp_seq=1 ttl=64 time=23.312 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=64 time=24.262 ms
```

可以看到，本机 dns 修改生效了，解析到`8.8.8.8`了。

## 被墙了

然后我们兴趣冲冲的打开`https://octokit.github.io/rest.js/v18`，发现还是打不开。于是我们想着 ping 一下这个 url 试试？结果如下：

```
PING https://octokit.github.io/rest.js/v18 (8.8.8.8): 56 data bytes
64 bytes from 8.8.8.8: icmp_seq=0 ttl=116 time=25.442 ms
64 bytes from 8.8.8.8: icmp_seq=1 ttl=116 time=28.669 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=116 time=22.312 ms
```

我们发现是可以 ping 通的，但是还是在浏览器打不开就表示，这个网站可能被墙了！！！

那么有没有解决方案呢？

其实是有的，之前我的 shadowxsocks 一直开的是 **PAC 自动模式**，我灵机一动**开启全局模式**，然后惊喜的发现，`https://octokit.github.io/rest.js/v18`能够打开了！！！

## 总结

1.  以后碰到这种 dns 问题，就按照上面的顺序一步一步排查即可。（适当的时候可以打开`chrome://net-internals/#dns`刷新一下 google 浏览器的 dns）
2.  碰到这种被墙的情况，打开科学 x 上网工具的全局模式就好。
3.  这中间有个小问题，就是为什么 PAC 模式下也能打开被墙的网站，而另外一些被墙的网站需要全局模式才能打开呢？（我的想法是，有些 url 是被网络运营商的 dns 污染的，所以走的网络运营商的 dns，而没有走科学 x 上网工具的 dns，所以**需要开启全局模式不走网络运营商的 dns 才行**。而另外一些网站没有被网络运营商的 dns 解析，所以走的科学 x 上网工具的 dns，所以就能在 PAC 模式下正常打开了。）
