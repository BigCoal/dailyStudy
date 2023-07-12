# ReactRouter

# 前置知识

## 1. 单页应用

只有一个 html 文件 主流的开发模式变成了通过路由进行页面切换 优势: 避免整体页面刷新 用户体验变好

前端负责事情变多了 开发的难度变大

## 2. 路由的本质

概念来源于后端 : 一个路径表示匹配一个服务器资源 /a.html -> a 对应的文件资源 /b.html -> b 对应的文件资源

共同的思想: 一对一的关系

前端的路由: 一个路径 path 对应唯一的一个组件 comonent 当我们访问一个 path 自动把 path 对应的组件进行渲染

```javascript
const routes = [
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/article",
    component: Article,
  },
];
```

# 准备项目环境

create-react-app -> cra -> webpack

vite: 可以实现 cra 同等能力 但是速度更快的打包工具 \[尤大]

使用 vite 新增一个 React 项目，然后安装一个 v6 版本的 react-router-dom

```bash
# 创建react项目
$ yarn create vite react-router --template react

# 安装所有依赖包
$ yarn

# 启动项目
$ yarn dev

# 安装react-router包
$ yarn add react-router-dom@6
```

# 基础使用

需求: 准备俩个按钮，点击不同按钮切换不同组件内容的显示

实现步骤：

1.  导入必要的路由 router 内置组件
2.  准备俩个 React 组件
3.  按照路由的规则进行路由配置

![](./static/1659239927736-82f07b97-4fa6-437a-ad2c-7fc055df1f71.png)

```jsx
// 引入必要的内置组件
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// 准备俩个路由组件

const Home = () => <div>this is home</div>;
const About = () => <div>this is about</div>;

function App() {
  return (
    <div className="App">
      {/* 按照规则配置路由 */}
      <BrowserRouter>
        <Link to="/">首页</Link>
        <Link to="/about">关于</Link>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
```

# 核心内置组件说明

## 1. BrowerRouter

作用: 包裹整个应用，一个 React 应用只需要使用一次

| **模式**     | **实现方式**                     | **路由 url 表现**              |
| :----------- | :------------------------------- | :----------------------------- |
| HashRouter   | 监听 url hash 值实现             | http\://localhost:3000/#/about |
| BrowerRouter | h5 的 history.pushState API 实现 | http\://localhost:3000/about   |

## 2. Link

作用: 用于指定导航链接，完成声明式的路由跳转 类似于 \<router-link/>

![](./static/1659241017118-6434a4dd-8e94-4f36-8aab-0cb8554c1c80.png)

这里 to 属性用于指定路由地址，表示要跳转到哪里去，Link 组件最终会被渲染为原生的 a 链接

## 3. Routes

作用: 提供一个路由出口，组件内部会存在多个内置的 Route 组件，满足条件的路由会被渲染到组件内部

类比 router-view

![](./static/1659241157681-d90d2517-03e5-4126-a04e-ac36802cd7ee.png)

## 4. Route

作用: 用于定义路由路径和渲染组件的对应关系 \[element：因为 react 体系内 把组件叫做 react element]

![](./static/1659241285534-d317335f-03ef-4792-b68e-2735852e53f9.png)

其中 path 属性用来指定匹配的路径地址，element 属性指定要渲染的组件，图中配置的意思为: 当 url 上访问的地址为 /about 时，当前路由发生匹配，对应的 About 组件渲染

# 编程式导航

声明式 【 Link to】 vs 编程式 【调用路由方法进行路由跳转】

概念: 通过 js 编程的方式进行路由页面跳转，比如说从首页跳转到关于页

实现步骤：

1.  导入一个 useNavigate 钩子函数
2.  执行 useNavigate 函数 得到 跳转函数
3.  在事件中执行跳转函数完成路由跳转

```jsx
// 导入useNavigate函数
import { useNavigate } from "react-router-dom";
const Home = () => {
  // 执行函数
  const navigate = useNavigate();
  return (
    <div>
      Home
      <button onClick={() => navigate("/about")}> 跳转关于页 </button>
    </div>
  );
};

export default Home;
```

注: 如果在跳转时不想添加历史记录，可以添加额外参数 replace 为 true

```javascript
navigate("/about", { replace: true });
```

# 路由传参

场景：跳转路由的同时，有时候要需要传递参数

## 1. searchParams 传参

**路由传参**

![](./static/1659242510791-9cd4d107-f2fc-47ff-87dc-af9418940ae9.png)

**路由取参**

![](./static/1659242531089-90eb0bbb-1aa8-4bcf-89dd-5332c6d49ab2.png)

## 2. params 传参

**路由传参**

![](./static/1659242608059-40cce1de-3700-422d-b4ef-b4ada61c4152.png)

**路由取参**

![](./static/1659242647823-818d12d4-1be8-4e2a-bbe6-2bcf8ddd614c.png)

# 嵌套路由

场景：在我们做的很多的管理后台系统中，通常我们都会设计一个 Layout 组件，在它内部实现嵌套路由

![](./static/1659243096808-094c30b7-53d4-4f34-ab2a-3e6ad06e3aac.png)

实现步骤：

1.  App.js 中定义嵌套路由声明
2.  Layout 组件内部通过 \<Outlet/> 指定二级路由出口

1- App.js 组件中定义路由嵌套关系

```jsx
<Routes>
  <Route path="/" element={<Layout />}>
    <Route path="board" element={<Board />} />
    <Route path="article" element={<Article />} />
  </Route>
  {/* 省略部分  */}
</Routes>
```

2- Layout.js 组件中使用 Outlet 组件添加二级路由出口

```jsx
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      layout
      {/* 二级路由的path等于 一级path + 二级path  */}
      <Link to="/board">board</Link>
      <Link to="/article">article</Link>
      {/* 二级路由出口 */}
      <Outlet />
    </div>
  );
};
export default Layout;
```

# 默认二级路由

场景: 应用首次渲染完毕就需要显示的二级路由

实现步骤:

1.  给默认二级路由标记 index 属性
2.  把原本的路径 path 属性去掉

```jsx
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Board />} />
    <Route path="article" element={<Article />} />
  </Route>
</Routes>
```

```jsx
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      layout
      {/* 默认二级不再具有自己的路径  */}
      <Link to="/">board</Link>
      <Link to="/article">article</Link>
      {/* 二级路由出口 */}
      <Outlet />
    </div>
  );
};
```

# 404 路由配置

场景：当 url 的路径在整个路由配置中都找不到对应的 path，使用 404 兜底组件进行渲染

1- 准备一个 NotFound 组件

```jsx
const NotFound = () => {
  return <div>this is NotFound</div>;
};

export default NotFound;
```

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Board />} />
      <Route path="article" element={<Article />} />
    </Route>
    <Route path="*" element={<NotFound />}></Route>
  </Routes>
</BrowserRouter>
```

尝试访问一个不存在的路径，查看效果\~

# 集中式路由配置

场景: 当我们需要路由权限控制点时候, 对路由数组做一些权限的筛选过滤，所谓的集中式路由配置就是用一个数组统一把所有的路由对应关系写好替换 本来的 Roues 组件

```jsx
import { BrowserRouter, Routes, Route, useRoutes } from "react-router-dom";

import Layout from "./pages/Layout";
import Board from "./pages/Board";
import Article from "./pages/Article";
import NotFound from "./pages/NotFound";

// 1. 准备一个路由数组 数组中定义所有的路由对应关系
const routesList = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <Board />,
        index: true, // index设置为true 变成默认的二级路由
      },
      {
        path: "article",
        element: <Article />,
      },
    ],
  },
  // 增加n个路由对应关系
  {
    path: "*",
    element: <NotFound />,
  },
];

// 2. 使用useRoutes方法传入routesList生成Routes组件
function WrapperRoutes() {
  let element = useRoutes(routesList);
  return element;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* 3. 替换之前的Routes组件 */}
        <WrapperRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
```

# 路由大练习

需求如下:

1.  使用 vite 创建一个新的项目
2.  在项目中全局安装组件库 antDesign 文档地址: [https://ant.design/](https://ant.design/components/layout-cn/)
3.  准备一个一级路由 使用 antDesign 中的布局组件实现如下图 Layout 页面的布局方式

Layout 组件地址: <https://ant.design/components/layout-cn/>

Menu 组件地址: <https://ant.design/components/menu-cn/> 用 <4.2.0 的写法即可

1.  准备三个二级路由，分别是数据概览，内容管理，发布文章，在 Layout 组件内部的主体部分实现点击左侧菜单切换二级路由内容显示
2.  将数据概览路由作为默认渲染的二级路由
3.  设置 404 一级路由页，在无法匹配的时候做兜底显示 \[404 页面 UI 不做要求]
4.  在内容管理组件中增加一个按钮 点击可以跳转到 发布文章路由 并且传递一个参数 id = 100

![](./static/1659942555512-ee4ae43c-4431-4a68-ac0d-304fa0108bc1.png)

参考链接:<https://gitee.com/react-cp/react-pc-code/blob/master/src/pages/Layout/index.js>
