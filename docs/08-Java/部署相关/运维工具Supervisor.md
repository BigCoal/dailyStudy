# 运维工具 Supervisor

> Supervisor 是用 Python 开发的一套通用的进程管理程序，能将一个普通的命令行进程变为后台 daemon，并监控进程状态，异常退出时能自动重启。

## **一、介绍**

Supervisor 是用 Python 开发的一套通用的进程管理程序，能将一个普通的命令行进程变为后台 daemon，并监控进程状态，异常退出时能自动重启。目前 Supervisor 可以运行在大多数 Unix 系统上，但不支持在 Windows 系统上运行。Supervisor 需要 Python2.4 及以上版本，但任何 Python 3 版本都不支持。

## **二、自带 Web 管理程序**

![](https://ask.qcloudimg.com/http-save/7774611/phnv41jkud.jpeg)

**Supervisor 有四个组件：**

- supervisord  
   运行 Supervisor 的后台服务，它用来启动和管理那些你需要 Supervisor 管理的子进程，响应客户端发来的请求，重启意外退出的子进程，将子进程的 stdout 和 stderr 写入日志，响应事件等。它是 Supervisor 最核心的部分。

- supervisorctl  
   相当于 supervisord 的客户端，它是一个[命令行工具](https://cloud.tencent.com/product/cli?from_column=20065&from=20065)，用户可以通过它向 supervisord 服务发指令，比如查看子进程状态，启动或关闭子进程。它可以连接不同的 supervisord 服务，包括远程机上的服务。

- Web [服务器](https://cloud.tencent.com/act/pro/promotion-cvm?from_column=20065&from=20065)  
   这是 supervisord 的 Web 客户端，用户可以在 Web 页面上完成类似于 supervisorctl 的功能。

- XML-RPC 接口  
   这是留给第三方集成的接口，你的服务可以在远程调用这些 XML-RPC 接口来控制 supervisord 管理的子进程。上面的 Web 服务器其实也是通过这个 XML-RPC 接口实现的。

## **三、安装**

### yum 安装

```
yum install supervisor
```

### 源码安装

```
 wget https://pypi.python.org/packages/7b/17/88adf8cb25f80e2bc0d18e094fcd7ab300632ea00b601cbbbb84c2419eae/supervisor-3.3.4.tar.gz
 tar -zxvf supervisor-3.3.4.tar.gz
 cd supervisor-3.3.4
 python setup.py install #本地python版本为python2.7
```

## **四、配置文件**

如果安装后，如果没有/etc/supervisord.conf 这个配置文件，则用命令生成：

```
echo_supervisord_conf > /etc/supervisord.conf
```

## **五、启动**

```
supervisord -c /etc/supervisord/supervisord.conf
```

## **六、设置开机启动**

```
systemctl enable supervisord.service
```

## **七、查看 supervisord 是否在运行**

```
ps aux | grep supervisord
```

## **八、supervisorctl 管理命令**

```
supervisorctl status      # 状态
supervisorctl stop nginx    #关闭 nginx
supervisorctl start nginx    #启动 nginx
supervisorctl restart nginx    #重启 nginx
supervisorctl reload			  #重启全部
supervisorctl update     #更新配置
```

此命令可以分着用，也可以合并使用

## **九、配置文件说明**

```
[unix_http_server]
file=/tmp/supervisor.sock ;UNIX socket 文件，supervisorctl 会使用
;chmod=0700     ;socket文件的mode，默认是0700
;chown=nobody:nogroup  ;socket文件的owner，格式：uid:gid
;[inet_http_server]   ;HTTP服务器，提供web管理界面
;port=127.0.0.1:9001  ;Web管理后台运行的IP和端口，如果开放到公网，需要注意安全性
;username=user    ;登录管理后台的用户名
;password=123    ;登录管理后台的密码
[supervisord]
logfile=/tmp/supervisord.log ;日志文件，默认是 $CWD/supervisord.log
logfile_maxbytes=50MB  ;日志文件大小，超出会rotate，默认 50MB，如果设成0，表示不限制大小
logfile_backups=10   ;日志文件保留备份数量默认10，设为0表示不备份
loglevel=info    ;日志级别，默认info，其它: debug,warn,trace
pidfile=/tmp/supervisord.pid ;pid 文件
nodaemon=false    ;是否在前台启动，默认是false，即以 daemon 的方式启动
minfds=1024     ;可以打开的文件描述符的最小值，默认 1024
minprocs=200     ;可以打开的进程数的最小值，默认 200
[supervisorctl]
serverurl=unix:/
;serverurl=http://127.0.0.1:9001 ; 通过HTTP的方式连接supervisord
; [program:xx]是被管理的进程配置参数，xx是进程的名称
[program:xx]
command=/opt/apache-tomcat-8.0.35/bin/catalina.sh run ; 程序启动命令
autostart=true  ; 在supervisord启动的时候也自动启动
startsecs=10   ; 启动10秒后没有异常退出，就表示进程正常启动了，默认为1秒
autorestart=true  ; 程序退出后自动重启,可选值：[unexpected,true,false]，默认为unexpected，表示进程意外杀死后才重启
startretries=3  ; 启动失败自动重试次数，默认是3
user=tomcat   ; 用哪个用户启动进程，默认是root
priority=999   ; 进程启动优先级，默认999，值小的优先启动
redirect_stderr=true ; 把stderr重定向到stdout，默认false
stdout_logfile_maxbytes=20MB ; stdout 日志文件大小，默认50MB
stdout_logfile_backups = 20 ; stdout 日志文件备份数，默认是10
; stdout 日志文件，需要注意当指定目录不存在时无法正常启动，所以需要手动创建目录（supervisord 会自动创建日志文件）
stdout_logfile=/opt/apache-tomcat-8.0.35/logs/catalina.out
stopasgroup=false  ;默认为false,进程被杀死时，是否向这个进程组发送stop信号，包括子进程
killasgroup=false  ;默认为false，向进程组发送kill信号，包括子进程
;包含其它配置文件
[include]
files =/etc/supervisord.d
```

## **十、ini 配置文件 举例说明**

```
[program:MysqlToRedis]
directory = /data/py/SmartServerModel/SmartServerModel/ModelManagerServer/
command= python3 -u mysql2redis_robot_config.py cs
autostart = true
autorestart=true
startsecs = 5
user =root
redirect_stderr = true
stdout_logfile = /data/logs/supervisord/mysqltoredis.log
[program:SmartBinLog]
command= /data/go/src/SmartBinLog/SmartBinLog
autostart = true
autorestart=true
startsecs = 5
user =root
redirect_stderr = true
stdout_logfile = /data/logs/supervisord/smartbinlog.log
[group:nlp]
programs=MysqlToRedis,SmartBinLog ;server,progname2 each refers to 'x' in [program:x] definitions
priority=999     ; the relative start priority (default 999)
```

## **十一、开启 web 页面管理程序**

在 conf 配置文件中把注释的这几行代码全部解除注释，然后更改端口，用户名和密码

```
[inet_http_server]   ;HTTP服务器，提供web管理界面
port=127.0.0.1:9001  ;Web管理后台运行的IP和端口，如果开放到公网，需要注意安全性
username=user    ;登录管理后台的用户名
password=123    ;登录管理后台的密码
```

## **十二、常见问题**

- Error: Another program is already listening on a port that one of our HTTP servers is configured to use. Shut this program down first before starting supervisord

```
  解决方法：
  find / -name supervisor.sock
  unlink /name/supervisor.sock
```
