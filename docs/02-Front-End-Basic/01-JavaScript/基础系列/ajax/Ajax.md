# Ajax

## HTTP 格式简介

### http 请求报文

#### 请求行

``` js
POST  /s?ie=utf-8  HTTP/1.1 
```

包含请求方法 (`get , post ...`)，请求 URL，http 协议以及版本

#### 请求头

```js
Host: atguigu.com
Cookie: name=guigu
Content-type: application/x-wiww-form-urlencoded
User-Agent: chrome 83
...
```

格式为 “`属性名:属性值`”，服务端据此获取客户端的信息。与缓存相关的规则信息，均包含在 header 中

#### 请求体

```js
username=admin&password=admin
```

`param1=value1&param2=value2...`的格式, 承载多个请求参数的数据

### http 响应报文


#### 响应行

```js
HTTP/1.1 200 OK
```

①报文协议及版本  
②状态码及状态描述

#### 响应头

```js
Content-Type: text/html; charset=utf-8
Content-length: 2048
Content-encoding: gzip
...
```

响应报文头，也是由多个属性组成, 格式为 “`属性名:属性值`”

#### 响应体

```html
<html>
    <head>
        <body>
            <h1>hello</h1>
        <body>
    </head>
</html>
```

即网页的 html 代码

## ajax

>本文采用前后端调试方法进行演示，测试语言为node的express框架   
>express 是一个 node.js Web 架構，链接（ [expressjs.com/](https://link.juejin.cn?target=https%3A%2F%2Fexpressjs.com%2F "https://expressjs.com/") ）

### GET 请求

使用 npm 下载 express，命令行为：`npm install express --save`，创建 Ajax 文件夹，在里面创建`1-GET.html`和`server.js`

`1-GET.html:`

```html
<style>
  #result{
    width: 200px;
    height: 150px;
    border: 2px solid rgb(245, 64, 230);
  }
</style> 

<body>
  <button>get</button>
  <div id="result"></div>
</body>
```

`server.js`

```js
// 1.引入express
const  express  = require('express');

// 2.创建应用对象
const app = express();

// 3.创建路由规则
// request是对请求报文的封装
// response 是对响应报文的封装
app.get('/server',(request,response) => {
  // 设置响应头  允许跨域
  response.setHeader('Access-Control-Allow-Origin','*')
  // 设置响应体
  response.send("HELLO AJAX")
})

// 4.监听端口启动服务
app.listen(8000,()=>{
  console.log("服务已经启动，8000 端口监听中...");
})
```

在 Ajax 文件夹打开终端输入`node server.js`，终端显示 _服务已经启动，8000 端口监听中..._ ，之后打开`http://127.0.0.1:8000/server`显示内容为：

> **HELLO AJAX**

现在在`1-GET.html`里面添加 script 代码

```html
<script>
  function XH(){
    var xhr = new XMLHttpRequest();
    // 2.初始化，设置请求方法和url
    xhr.open('GET','http://127.0.0.1:8000/server')
    //3.发送
    xhr.send();
    // 4.事件绑定 处理服务端返回的结果
    xhr.onreadystatechange = function(){
      // readyState表示状态 0 1 2 3 4
      // 0	UNSENT	代理被创建，但尚未调用 open() 方法。
      // 1	OPENED	open() 方法已经被调用。
      // 2	HEADERS_RECEIVED	send() 方法已经被调用，并且头部和状态已经可获得。
      // 3	LOADING	下载中； responseText 属性已经包含部分数据。
      // 4	DONE	下载操作已完成。
      if(xhr.readyState === 4){
        // 判断响应状态码(如 200 404  403 ...)
        // 2xx表示成功
        if(xhr.status >= 200 && xhr.status <300){
          // 1.处理响应行
          console.log(xhr.status);//状态码
          console.log(xhr.statusText);//状态字符串
          console.log(xhr.getAllResponseHeaders());//所有响应头
          console.log(xhr.response);//响应体
        }
      }
    } 
  }
</script>
```

另外给`1-GET.html`里面的`button`绑定点击事件

```html
<button onclick="XH()">get</button>
```

在浏览器打开`1-GET.html`, 点击按钮, 控制台显示：

> 200  
> OK  
> content-length: 10  
> content-type: text/html; charset=utf-8  
> HELLO AJAX

#### GET 请求的参数说明

那么在 ajax 如何请求参数呢？直接将`xhr.open('GET','http://127.0.0.1:8000/server')` 后面加上参数，即：`xhr.open('GET','http://127.0.0.1:8000/server?a=100&b=200')`, 就会获得参数`a:100,b:200`

### POST 请求

接下来再新建`2-POST.html`，如下：  
`2-POST.html`

```html
<style>
  #result{
    width: 200px;
    height: 100px;
    border: solid 2px red;
  }
</style>

<body>
  <div id="result"></div>
</body>

<script>
  const result = document.getElementById("result")
  result.addEventListener("mouseover",function(){
    const xhr = new XMLHttpRequest;
    xhr.open("post","http://127.0.0.1:8000/server");
    xhr.send();
    xhr.onreadystatechange = function(){
      result.innerHTML = xhr.response;  
    }
  })
</script>
```

在`server.js`中新增加：

```js
app.post('/server',(request,response) => {
  // 设置响应头  允许跨域
  response.setHeader('Access-Control-Allow-Origin','*')
  // 设置响应体
  response.send("HELLO AJAX POST")
})
```

在浏览器打开`2-POST.html`，当鼠标移动进去框内时显示：

> HELLO AJAX POST

#### POST 请求的参数说明

修改`2-POST.html`中的`xhr.send`：

```js
// 请求体的参数发送在send方法里面，

// 方式一：
xhr.send("a=100&b=200");

// 方式二：
xhr.send("a:100&b:200")
```

在 post 方式中请求参数在`send`方法中

#### 设置请求头

在`2-POST.html`添加

```js
xhr.setRequestHeader("name","lihua")
```

设置请求头 `name:lihua`, 但是打开浏览器`F12->network`会看见报错，原因是会检测到头信息检验是否可用。而明显这个头信息不可用

为了解决这个问题，应该将`server.js`中的`app.post`改为`app.all`，而且需要再新设置一个响应头`response.setHeader('Access-Control-Allow-Headers','*')`，这样的话就可以自定义请求头

```js
// 可以接受任意类型的请求
    app.all('/server',(request,response) => {
      // 设置响应头  允许跨域
      response.setHeader('Access-Control-Allow-Origin','*')
      // 设置响应头
      response.setHeader('Access-Control-Allow-Headers','*')
      // 设置响应体
      response.send("HELLO AJAX POST")
    })
```

`.all`方法可以接受任意类型的请求

#### 服务端响应 JSON 数据

修改`server.js`中的`app.all`

```js
app.all('/server',(request,response) => {
      // 设置响应头  允许跨域
      response.setHeader('Access-Control-Allow-Origin','*')
      // 设置响应头
      response.setHeader('Access-Control-Allow-Headers','*')
      const data = {
        like:'football'
      }
      let str = JSON.stringify(data)
      // 设置响应体
      response.send(str)
    })
```

添加类`data`，`JSON.stringify(data)`将类转化为 JSON 数据，并作为响应体发送

此时打开`2-POST.html`在浏览器运行中，结果为

> {"like":"football"}

为了使 JSON 数据转化为类数据，添加`xhr.responseType = 'json'`, 将显示结果改为： `result.innerHTML = xhr.response.like`则结果为

> football

也可以用`JSON.parse`转换为类数据

>nodemon
>使用`npm install -g nodemon`下载 nodemon，  链接 [ [www.npmjs.com/package/nod…](https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fnodemon "https://www.npmjs.com/package/nodemon") ]  
>nodemon 的作用是服务端直接保存代码时不用重新启动服务，服务端自动更新服务
>使用`nodemon server.js`开启服务，修改`server.js`的代码
>```js
>const data = {
>    like:'football-game'
>  }
>```
>保存，服务端自动更新，浏览器运行`2-POST.html`的结果为
> football-game


### 请求超时与网络异常处理

添加页面`3-请求超时与网络异常处理.html`

```html
<style>
  #result{
    width: 200px;
    height: 100px;
    border: red 2px solid;
  }
</style>

<body>
  <button>点击发送请求</button>
  <div id="result"></div>

</body>

<script>
  const btn = document.getElementsByTagName('button')[0];
  const result = document.getElementById('result');
  btn.addEventListener('click',function(){
    const xhr = new XMLHttpRequest();
    xhr.open('get','http://127.0.0.1:8000/delay')
    xhr.send();
    
    
    // 设置超时时间
    xhr.timeout = 2000
    // 设置超时回调
    xhr.ontimeout = function(){
      alert("请求超时，请稍后重试");
    }
    // 设置网络异常回调
    xhr.onerror = function(){
      alert("网络异常，请检查您的网络")
    }
    
    
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
        if(xhr.status >= 200 && xhr.status <300){
          result.innerHTML = xhr.response;
        }
      }
    }
  })
</script>
```

`server.js`新增代码

```js
app.get('/delay',(request,response) => {
  // 设置响应头  允许跨域
  response.setHeader('Access-Control-Allow-Origin','*')
  setTimeout(() => {
    response.send('延时响应')
  }, 3000);
})
```

新增了链接`/delay`, `server.js`中设置定时器为 3s 后响应，由于`xhr.timeout = 2000`, 则响应时间超时，弹出弹窗`"请求超时，请稍后重试"`，若网络异常，弹出弹窗`"网络异常，请检查您的网络"`

### 取消请求

新增加页面`4-请求取消.html`

```html
<body>
  <button>请求发送</button>
  <button>请求取消</button>
</body>

<script>
  const btn1 = document.getElementsByTagName("button")[0];
  const btn2 = document.getElementsByTagName("button")[1];
  let x;
  btn1.addEventListener('click',function(){
    x = new XMLHttpRequest();
    x.open('get',"http://127.0.0.1:8000/delay");
    x.send();
    x.onreadystatechange = function(){
      if(x.readyState === 4){
        if(x.status >= 200 && x.status <300){
          console.log("请求成功");
        }
      }
    }
  })
  btn2.onclick = function(){
    x.abort();
  }
</script>
```

按下 btn1 则请求发送，但是有 3s 延迟，在此期间按下 btn2 则请求取消，`.abort()`用于取消 Ajax 的请求发送

### 解决重复发送请求问题
----------------

新增加页面`5-取消重复发送请求.html`

```html
<body>
  <button>发送请求</button>
</body>

<script>
  const btn = document.getElementsByTagName("button")[0];
  let xhr;

  issending = false// 标识变量 是否正在请求Ajax

  btn.addEventListener('click',function(){
    if(issending == true) xhr.abort();// 如果状态码为发送状态(true)，则取消发送请求
    issending = true;// 此时为正在发送
    xhr = new XMLHttpRequest();
    xhr.open('get','http://127.0.0.1:8000/delay');
    xhr.send();
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
        issending = false;//发送完毕，状态码改为不在发送状态
      }
    }
  })
</script>
```

在某种情况下 (如：网络速度慢) 用户会一直点击相同的按钮，由于连续点击按钮会持续地发送 Ajax 请求，当请求的速度慢或者网络卡时，会导致大量相同请求同时存在，对服务端产生压力，因此需要解决这个问题。通过设置状态码的办法，当第一次请求不成功而且第二次点击按钮的情况下，取消第一次的请求并响应第二次的请求。