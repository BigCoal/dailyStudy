import { viteBundler } from "@vuepress/bundler-vite";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import { defaultTheme } from "@vuepress/theme-default";
import { path } from "@vuepress/utils";
import { defineUserConfig } from "vuepress";

export default defineUserConfig({
  lang: "zh-CN",
  title: "大煤球的知识库",
  description: "学而不思则罔，思而不学则殆",
  head: [["link", { rel: "icon", href: "/logo.png" }]],
  bundler: viteBundler({
    viteOptions: {
      assetsInclude: ["**/*.awebp"],
    },
  }),
  plugins: [
    registerComponentsPlugin({
      components: {
        Checkbox: path.resolve(__dirname, "./components/Checkbox/index.vue"),
      },
    }),
  ],
  theme: defaultTheme({
    logo: "/logo.png",
    editLinkPattern: ":repo/edit/master/docs/:path",
    lastUpdated: false,
    contributors: false,
    // darkMode: false,
    repo: "https://github.com/BigCoal/dailyStudy",
    sidebarDepth: 2,
    // searchMaxSuggestions: 12,
    navbar: [
      { text: "首页", link: "/" },
      {
        text: "计算机基础四大件",
        link: "/01-Computer-Basic/03-设计模式/策略模式.html",
      },
      {
        text: "前端基础五大件",
        link: "/02-Front-End-Basic/06-Flutter/dart基础/基础一：变量、类型、操作符.html",
      },
      {
        text: "前端框架",
        link: "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/01  组件渲染：vnode 到真实 DOM 是如何转变的？.html",
      },
      {
        text: "JAVA",
        link: "/08-Java/maven/Maven-基础.html",
      },
      {
        text: "工程化",
        link: "/04-Front-End-Engineering/00-性能优化02/01 前端性能优化介绍.html",
      },
      {
        text: "英语自学",
        link: "/06-English/新概念/新概念1/Lesson01~02/Lesson01~02.html",
      },
      {
        text: "Plan",
        link: "/07-Plan/index.html",
      },
    ],
    // 侧边栏
    sidebar: {
      "/01-Computer-Basic/": [
        {
          text: "算法与数据结构",
          collapsible: true,
          children: [
            {
              text: "基础",
              collapsible: true,
              children: [
                "/01-Computer-Basic/01-数据结构和算法/00-基础/运算符优先级.html",
                "/01-Computer-Basic/01-数据结构和算法/00-基础/原码、反码、补码.html",
                "/01-Computer-Basic/01-数据结构和算法/00-基础/位运算.html",
                "/01-Computer-Basic/01-数据结构和算法/00-基础/位运算(下).html",
              ],
            },
            {
              text: "复杂度",
              collapsible: true,
              children: [
                "/01-Computer-Basic/01-数据结构和算法/01-复杂度，二分法/空间复杂度.html",
                "/01-Computer-Basic/01-数据结构和算法/01-复杂度，二分法/时间复杂度.html",
              ],
            },
            {
              text: "二叉树",
              collapsible: true,
              children: [
                "/01-Computer-Basic/01-数据结构和算法/10-二叉树（一）/二叉树.html",
              ],
            },
            {
              text: "从暴力递归到动态规划",
              collapsible: true,
              children: [
                "/01-Computer-Basic/01-数据结构和算法/17-认识一些经典的递归过程/认识一些经典递归过程.html",
                "/01-Computer-Basic/01-数据结构和算法/18-暴力递归到动态规划（一）/暴力递归到动态规划（一）.html",
                "/01-Computer-Basic/01-数据结构和算法/22-暴力递归到动态规划（五）/暴力递归到动态规划（五）.html",
                "/01-Computer-Basic/01-数据结构和算法/23-暴力递归到动态规划（六）/暴力递归到动态规划（六）.html",
              ],
            },
            {
              text: "复杂度",
              collapsible: true,
              children: [
                "/01-Computer-Basic/01-数据结构和算法/33-与哈希函数有关结构/哈希表.html",
                "/01-Computer-Basic/01-数据结构和算法/33-与哈希函数有关结构/一致性哈希算法.html",
              ],
            },
          ],
        },
        {
          text: "计算机网络",
          collapsible: true,
          children: [
            {
              text: "计算机网络自顶向下",
              collapsible: true,
              children: [
                "/01-Computer-Basic/02-计算机网络/计算机网络自顶向下/01计算机网络和英特网/00计算机基础知识.html",
                "/01-Computer-Basic/02-计算机网络/计算机网络自顶向下/01计算机网络和英特网/01计算机网络和英特网.html",
              ],
            },
            "/01-Computer-Basic/02-计算机网络/HTTP/HTTP发展历程.html",
            {
              text: "HTTP安全",
              collapsible: true,
              children: [
                "/01-Computer-Basic/02-计算机网络/HTTP/HTTP安全/图解SSL_TLS协议.html",
                "/01-Computer-Basic/02-计算机网络/HTTP/HTTP安全/HTTPS.html",
                "/01-Computer-Basic/02-计算机网络/HTTP/HTTP安全/跨源资源共享 (CORS).html",
                "/01-Computer-Basic/02-计算机网络/HTTP/HTTP安全/内容安全策略( CSP ).html",
              ],
            },
            {
              text: "HTTP缓存",
              collapsible: true,
              children: [
                "/01-Computer-Basic/02-计算机网络/HTTP/HTTP缓存/HTTP 缓存.html",
                "/01-Computer-Basic/02-计算机网络/HTTP/HTTP缓存/浏览器、DNS、CDN缓存.html",
                "/01-Computer-Basic/02-计算机网络/HTTP/HTTP缓存/http缓存与cdn缓存配置指南.html",
              ],
            },

            "/01-Computer-Basic/02-计算机网络/HTTP/TCP协议详解.html",
            "/01-Computer-Basic/02-计算机网络/HTTP/DNS原理入门.html",
            "/01-Computer-Basic/02-计算机网络/HTTP/CDN原理入门.html",
            "/01-Computer-Basic/02-计算机网络/HTTP/Data-URL.html",
            "/01-Computer-Basic/02-计算机网络/HTTP/HTTP Headers.html",
            "/01-Computer-Basic/02-计算机网络/HTTP/HTTP cookies.html",
            "/01-Computer-Basic/02-计算机网络/HTTP/HTTP 消息.html",

            "/01-Computer-Basic/02-计算机网络/HTTP/HTTP 请求方法.html",
            "/01-Computer-Basic/02-计算机网络/HTTP/HTTP 请求的响应头部 Vary 的理解.html",
            "/01-Computer-Basic/02-计算机网络/HTTP/HTTP 详解长短连接，管道化，队头阻塞及它们之间的关系.html",
            "/01-Computer-Basic/02-计算机网络/HTTP/HTTP2四大核心特性.html",
            "/01-Computer-Basic/02-计算机网络/HTTP/HTTP_1.x 的连接管理.html",
            "/01-Computer-Basic/02-计算机网络/HTTP/HTTP概述.html",
            "/01-Computer-Basic/02-计算机网络/HTTP/meta标签.html",

            "/01-Computer-Basic/02-计算机网络/HTTP/理解TCP序列号Seq和确认号Ack.html",
            "/01-Computer-Basic/02-计算机网络/HTTP/浏览器的工作原理.html",
          ],
        },
        {
          text: "设计模式",
          collapsible: true,
          children: [
            // 字符串 - 页面文件路径
            "/01-Computer-Basic/03-设计模式/策略模式.html",
            "/01-Computer-Basic/03-设计模式/代理模式.html",
          ],
        },
        {
          text: "操作系统",
          collapsible: true,
          children: [
            // 字符串 - 页面文件路径
            "/01-Computer-Basic/04-操作系统/index.html",
          ],
        },
      ],
      "/02-Front-End-Basic/": [
        {
          text: "HTML",
          collapsible: true,
          children: [
            "/02-Front-End-Basic/03-HTML/client-offset-scroll.html",
            "/02-Front-End-Basic/03-HTML/浏览器工作原理(上).html",
            "/02-Front-End-Basic/03-HTML/浏览器工作原理(下).html",
          ],
        },
        {
          text: "Javascript",
          collapsible: true,
          children: [
            {
              text: "基础系列",
              collapsible: true,
              children: [
                "/02-Front-End-Basic/01-JavaScript/基础系列/slice-substring-substr.html",
                {
                  text: "数据类型",
                  collapsible: true,
                  children: [
                    "/02-Front-End-Basic/01-JavaScript/基础系列/数据类型/数据类型与堆栈.html",
                    "/02-Front-End-Basic/01-JavaScript/基础系列/数据类型/null和undefined.html",
                    "/02-Front-End-Basic/01-JavaScript/基础系列/数据类型/int和bigInt.html",
                  ],
                },
                {
                  text: "Ajax",
                  collapsible: true,
                  children: [
                    "/02-Front-End-Basic/01-JavaScript/基础系列/ajax/Ajax.html",
                  ],
                },

                "/02-Front-End-Basic/01-JavaScript/基础系列/严格模式.html",
                "/02-Front-End-Basic/01-JavaScript/基础系列/正则/正则表达式.html",
                "/02-Front-End-Basic/01-JavaScript/基础系列/任务队列.html",
                "/02-Front-End-Basic/01-JavaScript/基础系列/typeof.html",
                "/02-Front-End-Basic/01-JavaScript/基础系列/Promise原理解析.html",
                "/02-Front-End-Basic/01-JavaScript/基础系列/原型到原型链.html",
                {
                  text: "执行上下文系列",
                  collapsible: true,
                  children: [
                    "/02-Front-End-Basic/01-JavaScript/基础系列/词法作用域.html",
                    "/02-Front-End-Basic/01-JavaScript/基础系列/执行上下文栈.html",
                    "/02-Front-End-Basic/01-JavaScript/基础系列/变量对象.html",
                    "/02-Front-End-Basic/01-JavaScript/基础系列/作用域链.html",
                    "/02-Front-End-Basic/01-JavaScript/基础系列/this.html",
                    "/02-Front-End-Basic/01-JavaScript/基础系列/深入执行上下文.html",
                  ],
                },
                "/02-Front-End-Basic/01-JavaScript/基础系列/闭包.html",
                "/02-Front-End-Basic/01-JavaScript/基础系列/类数组.html",
                {
                  text: "模拟实现系列",
                  collapsible: true,
                  children: [
                    "/02-Front-End-Basic/01-JavaScript/基础系列/call和apply的模拟实现.html",
                    "/02-Front-End-Basic/01-JavaScript/基础系列/bind模拟实现.html",
                    "/02-Front-End-Basic/01-JavaScript/基础系列/new的模拟实现.html",
                  ],
                },
                {
                  text: "性能优化",
                  collapsible: false,
                  children: [
                    "/02-Front-End-Basic/01-JavaScript/基础系列/性能优化/缓存机制.html",
                    "/02-Front-End-Basic/01-JavaScript/基础系列/性能优化/性能优化.html",
                  ],
                },
                {
                  text: "本地存储和安全",
                  collapsible: true,
                  children: [
                    "/02-Front-End-Basic/01-JavaScript/基础系列/同源策略.html",
                    "/02-Front-End-Basic/01-JavaScript/基础系列/cookie.html",
                    "/02-Front-End-Basic/01-JavaScript/基础系列/XSS攻击.html",
                    "/02-Front-End-Basic/01-JavaScript/基础系列/CSRF攻击.html",
                  ],
                },
                {
                  text: "类型转换",
                  collapsible: true,
                  children: [
                    "/02-Front-End-Basic/01-JavaScript/基础系列/类型转换（上）.html",
                    "/02-Front-End-Basic/01-JavaScript/基础系列/类型转换（下）.html",
                  ],
                },
                "/02-Front-End-Basic/01-JavaScript/基础系列/创建对象的多种方式.html",
                "/02-Front-End-Basic/01-JavaScript/基础系列/继承的多种方式.html",
              ],
            },
            {
              text: "专题系列",
              collapsible: true,
              children: [
                {
                  text: "防抖与节流",
                  collapsible: true,
                  children: [
                    "/02-Front-End-Basic/01-JavaScript/专题系列/防抖与节流/防抖.html",
                    "/02-Front-End-Basic/01-JavaScript/专题系列/防抖与节流/节流.html",
                  ],
                },
                {
                  text: "数组系列",
                  collapsible: true,
                  children: [
                    "/02-Front-End-Basic/01-JavaScript/专题系列/数组系列/数组去重.html",
                    "/02-Front-End-Basic/01-JavaScript/专题系列/数组系列/数组扁平化.html",
                    "/02-Front-End-Basic/01-JavaScript/专题系列/数组系列/数组查找指定元素.html",
                    "/02-Front-End-Basic/01-JavaScript/专题系列/数组系列/数组最大值最小值.html",
                    "/02-Front-End-Basic/01-JavaScript/专题系列/数组系列/数组乱序.html",
                    "/02-Front-End-Basic/01-JavaScript/专题系列/数组系列/v8 排序源码.html",
                  ],
                },
                {
                  text: "类型判断",
                  collapsible: true,
                  children: [
                    "/02-Front-End-Basic/01-JavaScript/专题系列/类型判断/类型判断(上).html",
                    "/02-Front-End-Basic/01-JavaScript/专题系列/类型判断/类型判断(下).html",
                  ],
                },
                {
                  text: "函数",
                  collapsible: true,
                  children: [
                    "/02-Front-End-Basic/01-JavaScript/专题系列/函数系列/惰性函数.html",
                    "/02-Front-End-Basic/01-JavaScript/专题系列/函数系列/函数记忆.html",
                    "/02-Front-End-Basic/01-JavaScript/专题系列/函数系列/函数柯里化.html",
                    "/02-Front-End-Basic/01-JavaScript/专题系列/函数系列/函数组合.html",
                    "/02-Front-End-Basic/01-JavaScript/专题系列/函数系列/偏函数.html",
                    "/02-Front-End-Basic/01-JavaScript/专题系列/函数系列/递归.html",
                  ],
                },
                {
                  text: "模块化",
                  collapsible: true,
                  children: [
                    "/02-Front-End-Basic/01-JavaScript/专题系列/模块化/import、require、export、module.exports 混合使用详解.html",
                  ],
                },
                "/02-Front-End-Basic/01-JavaScript/专题系列/深浅拷贝.html",
                "/02-Front-End-Basic/01-JavaScript/专题系列/判断两个对象相等.html",
                "/02-Front-End-Basic/01-JavaScript/专题系列/实现 jQuery 的 each .html",
                "/02-Front-End-Basic/01-JavaScript/专题系列/实现 jquery 的 extend.html",
                "/02-Front-End-Basic/01-JavaScript/专题系列/垃圾回收.html",
              ],
            },
            {
              text: "ES6系列",
              collapsible: true,
              children: [
                {
                  text: "阮一峰文档",
                  collapsible: true,
                  children: [
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/intro.html",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/let.html",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/destructuring.html",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/string.html",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/string-methods.html",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/regex.html",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/number.html",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/function.html",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/array.html",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/object.html",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/object-methods.html",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/operator.html",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/symbol.html",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/set-map.html",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/proxy.html",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/reflect.html",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/promise.html",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/iterator.html",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/generator.html",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/generator-async.html",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/async.html",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/class.html",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/class-extends.html",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/module.html",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/module-loader.html",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/style.html",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/spec.html",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/async-iterator.html",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/arraybuffer.html",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/proposals.html",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/decorator.html",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/reference.html",
                  ],
                },
                "/02-Front-End-Basic/01-JavaScript/ES6/模块加载规范.html",
              ],
            },
          ],
        },
        {
          text: "CSS",
          collapsible: true,
          children: [
            "/02-Front-End-Basic/02-CSS/流、元素与基本尺寸.html",
            {
              text: "盒尺寸四大家族",
              collapsible: true,
              children: [
                "/02-Front-End-Basic/02-CSS/盒尺寸四大家族/Content.html",
                "/02-Front-End-Basic/02-CSS/盒尺寸四大家族/Padding.html",
                "/02-Front-End-Basic/02-CSS/盒尺寸四大家族/Margin.html",
                "/02-Front-End-Basic/02-CSS/盒尺寸四大家族/Border.html",
              ],
            },
            {
              text: "内联元素和流",
              collapsible: true,
              children: [
                "/02-Front-End-Basic/02-CSS/内联元素和流/字母x.html",
                "/02-Front-End-Basic/02-CSS/内联元素和流/line-height.html",
                "/02-Front-End-Basic/02-CSS/内联元素和流/vertical-align.html",
              ],
            },
            {
              text: "流的破坏与保护",
              collapsible: true,
              children: [
                "/02-Front-End-Basic/02-CSS/流的破坏与保护/魔鬼属性float.html",
                "/02-Front-End-Basic/02-CSS/流的破坏与保护/魔鬼属性float的天然克星clear.html",
                "/02-Front-End-Basic/02-CSS/流的破坏与保护/最佳结界overflow.html",
                "/02-Front-End-Basic/02-CSS/流的破坏与保护/BFC.html",
                "/02-Front-End-Basic/02-CSS/流的破坏与保护/position-absolute.html",
                "/02-Front-End-Basic/02-CSS/流的破坏与保护/position-relative.html",
                "/02-Front-End-Basic/02-CSS/流的破坏与保护/position-fixed.html",
              ],
            },
            "/02-Front-End-Basic/02-CSS/css世界的层叠规则/css世界的层叠规则.html",
            {
              text: "强大的文本处理能力",
              collapsible: true,
              children: [
                "/02-Front-End-Basic/02-CSS/强大的文本处理能力/font-size.html",
                "/02-Front-End-Basic/02-CSS/强大的文本处理能力/font-family.html",
              ],
            },
          ],
        },
        {
          text: "Typescript",
          collapsible: true,
          children: [
            {
              text: "基本",
              collapsible: true,

              children: [
                "/02-Front-End-Basic/04-Typescript/01文档/handbook/basic-types.html",
                "/02-Front-End-Basic/04-Typescript/01文档/handbook/interfaces.html",
                "/02-Front-End-Basic/04-Typescript/01文档/handbook/functions.html",
                "/02-Front-End-Basic/04-Typescript/01文档/handbook/literal-types.html",
                "/02-Front-End-Basic/04-Typescript/01文档/handbook/classes.html",
                "/02-Front-End-Basic/04-Typescript/01文档/handbook/enums.html",
                "/02-Front-End-Basic/04-Typescript/01文档/handbook/generics.html",
              ],
            },
            {
              text: "进阶",
              collapsible: true,
              children: [
                "/02-Front-End-Basic/04-Typescript/01文档/reference/advanced-types.html",
                "/02-Front-End-Basic/04-Typescript/01文档/reference/utility-types.html",
                "/02-Front-End-Basic/04-Typescript/01文档/reference/declaration-merging.html",
                "/02-Front-End-Basic/04-Typescript/01文档/reference/mixins.html",
                "/02-Front-End-Basic/04-Typescript/01文档/reference/type-compatibility.html",
                "/02-Front-End-Basic/04-Typescript/01文档/reference/type-inference.html",
                "/02-Front-End-Basic/04-Typescript/01文档/reference/jsx.html",
                "/02-Front-End-Basic/04-Typescript/01文档/reference/modules.html",
                "/02-Front-End-Basic/04-Typescript/01文档/reference/module-resolution.html",
                "/02-Front-End-Basic/04-Typescript/01文档/reference/namespaces.html",
                "/02-Front-End-Basic/04-Typescript/01文档/reference/namespaces-and-modules",
              ],
            },
            {
              text: "声明文件",
              collapsible: true,
              children: [
                "/02-Front-End-Basic/04-Typescript/01文档/declaration-files/introduction.html",
                "/02-Front-End-Basic/04-Typescript/01文档/declaration-files/by-example.html",
                "/02-Front-End-Basic/04-Typescript/01文档/declaration-files/library-structures.html",
                "/02-Front-End-Basic/04-Typescript/01文档/declaration-files/templates.html",
                "/02-Front-End-Basic/04-Typescript/01文档/declaration-files/do-s-and-don-ts.html",
                "/02-Front-End-Basic/04-Typescript/01文档/declaration-files/deep-dive.html",
                "/02-Front-End-Basic/04-Typescript/01文档/declaration-files/publishing.html",
                "/02-Front-End-Basic/04-Typescript/01文档/declaration-files/consumption.html",
              ],
            },
            {
              text: "工程配置",
              collapsible: true,
              children: [
                "/02-Front-End-Basic/04-Typescript/01文档/project-config/tsconfig.json.html",
                "/02-Front-End-Basic/04-Typescript/01文档/project-config/project-references.html",
                "/02-Front-End-Basic/04-Typescript/01文档/project-config/compiler-options.html",
              ],
            },
            {
              text: "再次进阶",
              collapsible: true,
              children: [
                "/02-Front-End-Basic/04-Typescript/01文档/QA/详解TypeScript中any和unknown.html",
                "/02-Front-End-Basic/04-Typescript/01文档/QA/详解TypeScript中的const断言.html",
                "/02-Front-End-Basic/04-Typescript/01文档/QA/详解TypeScript中的typeof和keyof.html",
                "/02-Front-End-Basic/04-Typescript/01文档/QA/深入讲解Ts最晦涩难懂的高级类型工具.html",
              ],
            },
            {
              text: "类型体操",
              collapsible: true,
              children: [
                "/02-Front-End-Basic/04-Typescript/02-typescript类型体操/01-简单.html",
                "/02-Front-End-Basic/04-Typescript/02-typescript类型体操/02-中等.html",
                "/02-Front-End-Basic/04-Typescript/02-typescript类型体操/03-困难.html",
                "/02-Front-End-Basic/04-Typescript/02-typescript类型体操/04-地狱.html",
              ],
            },
          ],
        },
        {
          text: "Flutter",
          collapsible: true,
          
          children: [
            {
              text: "Dart基础",
              collapsible: true,
              children: [
                "/02-Front-End-Basic/06-Flutter/dart基础/基础一：变量、类型、操作符.html",
                "/02-Front-End-Basic/06-Flutter/dart基础/基础二：函数.html",
                "/02-Front-End-Basic/06-Flutter/dart基础/基础三：类.html",
                "/02-Front-End-Basic/06-Flutter/dart基础/基础四：泛型、库.html",
                "/02-Front-End-Basic/06-Flutter/dart基础/基础五：异步支持及异常.html",
              ]
            },
            {
              text: "Flutter基础",
              collapsible: true,
              children: [
                "/02-Front-End-Basic/06-Flutter/(一)环境搭建ForMac.html",
                "/02-Front-End-Basic/06-Flutter/(一)环境配置及问题.html",
                "/02-Front-End-Basic/06-Flutter/(二)创建Flutter工程.html",
                "/02-Front-End-Basic/06-Flutter/(三)Flutter从零开始.html",
                "/02-Front-End-Basic/06-Flutter/(四)基础知识自定义Widget.html",
                "/02-Front-End-Basic/06-Flutter/(五)常用部件MaterialApp.html",
                "/02-Front-End-Basic/06-Flutter/(六)常用部件ListView初体验.html",
                "/02-Front-End-Basic/06-Flutter/(七)常用部件常用Widget.html",
                "/02-Front-End-Basic/06-Flutter/(八)线性布局Row&Column.html",
                "/02-Front-End-Basic/06-Flutter/(九)层叠布局-Stack.html",
                "/02-Front-End-Basic/06-Flutter/(十)基础知识-Widget的状态管理.html",
                "/02-Front-End-Basic/06-Flutter/(十一)实战-项目搭建.html",
                "/02-Front-End-Basic/06-Flutter/(十二)实战-工程配置及本地资源使用.html",
                "/02-Front-End-Basic/06-Flutter/(十三)实战-模仿微信发现界面.html",
                "/02-Front-End-Basic/06-Flutter/(十四)实战-cell的点击处理.html",
                "/02-Front-End-Basic/06-Flutter/(十五)实战-微信我的界面.html",
                "/02-Front-End-Basic/06-Flutter/(十六)实战-微信通讯录界面.html",
                "/02-Front-End-Basic/06-Flutter/(十七)实战-通讯录分组.html",
                "/02-Front-End-Basic/06-Flutter/(十八)实战-通讯录索引条.html",
                "/02-Front-End-Basic/06-Flutter/(十九)实战-网络请求与模型转换.html",
                "/02-Front-End-Basic/06-Flutter/(二十)-FutureBuilder异步UI更新.html",
                "/02-Front-End-Basic/06-Flutter/(二十一)-部件状态的保持.html",
                "/02-Front-End-Basic/06-Flutter/(二十二)-Dart中的异步编程Future.html",
                "/02-Front-End-Basic/06-Flutter/(二十三)-多个异步编程.html",
                "/02-Front-End-Basic/06-Flutter/(二十四)-Dart事件循环机制.html",
                "/02-Front-End-Basic/06-Flutter/(二十五)-Dart中多线程Isolate.html",
                "/02-Front-End-Basic/06-Flutter/(二十六)-pubspec.yaml文件介绍.html",
                "/02-Front-End-Basic/06-Flutter/(二十七)-异步与多线程相结合.html",
                "/02-Front-End-Basic/06-Flutter/(二十八)-定时器Timer的使用.html",
                "/02-Front-End-Basic/06-Flutter/(二十九)-网络框架Dio.html",
                "/02-Front-End-Basic/06-Flutter/(三十)实战-微信聊天搜索输入框.html",
              ]
            },
            {
              text: "GetX",
              collapsible: true,
              
              children: [
                "/02-Front-End-Basic/06-Flutter/Getx/介绍、Snackbar、Dialog、BottomSheet、Navigation、Obx.html",
                "/02-Front-End-Basic/06-Flutter/Getx/GetxController.html", 
                "/02-Front-End-Basic/06-Flutter/Getx/国际化配置、依赖注入、Binding.html",
                "/02-Front-End-Basic/06-Flutter/Getx/新闻案例.html",
                "/02-Front-End-Basic/06-Flutter/Getx/GetUtils.html", 
                "/02-Front-End-Basic/06-Flutter/Getx/GetView、GetWidget.html",
                "/02-Front-End-Basic/06-Flutter/Getx/Cli 使用以及常用命令.html", 
                "/02-Front-End-Basic/06-Flutter/Getx/RxList_E_、Rx_T_([])、obs对比分析.html",
              ]
            }
          ],
        },
      ],
      "/03-Front-End-Frame/": [
       
        {
          text: "Webpack源码解读",
          collapsible: true,
          children: [
            "/03-Front-End-Frame/02-Webpack/01-手写tapable/01-tapable.html",
            "/03-Front-End-Frame/02-Webpack/05-TreeShaking/05-TreeShaking.html",
          ],
        },
        {
          text: "React18",
          collapsible: true,
          children: [
            {
              text: "React基础",
              collapsible: true,
              children: [
                "/03-Front-End-Frame/04-React/React基础/01-React介绍.html",
                "/03-Front-End-Frame/04-React/React基础/02-环境初始化.html",
                "/03-Front-End-Frame/04-React/React基础/03-jsx基础.html",
                "/03-Front-End-Frame/04-React/React基础/04-React组件基础.html",
                "/03-Front-End-Frame/04-React/React基础/05-React组件通信.html",
                "/03-Front-End-Frame/04-React/React基础/06-React组件进阶.html",
                "/03-Front-End-Frame/04-React/React基础/07-Hooks基础.html",
                "/03-Front-End-Frame/04-React/React基础/08-Hooks进阶.html",
                "/03-Front-End-Frame/04-React/React基础/09-ReactRouter.html",
                "/03-Front-End-Frame/04-React/React基础/10-Mobx.html",
                "/03-Front-End-Frame/04-React/React基础/11-Redux.html",
                "/03-Front-End-Frame/04-React/React基础/12-Zustand.html",
              ],
            },
          ],
        },
        {
          text: "Vue3",
          collapsible: true,
          children: [
            {
              text: "手写Vue3",
              collapsible: true,
              children: [
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/初始化环境.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现 effect & reactive & 依赖收集 & 触发依赖.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现effect返回runner.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现effect的scheduler功能.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现effect的stop功能.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现readonly功能.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现isReactive和isReadonly.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现reactive和readonly的嵌套转换.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现shallowReadonly.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现isProxy.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现shallowReactive.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现ref.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现toRaw.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现isRef和unRef.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现proxyRefs.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现computed.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/组件的初始化流程.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/配置rollup.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/组件的代理对象.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现shapeFlags.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现注册事件功能.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现组件的props功能.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现组件的emit功能.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现组件的slot功能.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现Fragment和Text节点.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现getCurrentInstance.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现provide和inject.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现customRenderer.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/初始化element更新流程.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/更新props.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/更新children（一）.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/更新children（二）.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/更新children（三）.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/更新children（四）.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/更新component.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/视图异步更新&&nextTickAPI.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/编译模块概述.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现解析插值表达式.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现解析element标签.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现解析text.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/三种类型联合解析.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/从有限状态机的角度看parse原理.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/transform模块.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/codegen生成text.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/codegen生成插值类型.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/codegen生成element.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/codegen生成联合3种类型.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现template编译为render.html",
              ],
            },
            {
              text: "Vue解读",
              collapsible: true,
              children: [
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/01  组件渲染：vnode 到真实 DOM 是如何转变的？.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/02  组件更新：完整的 DOM diff 流程是怎样的？（上）.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/03  组件更新：完整的 DOM diff 流程是怎样的？（下）.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/04  Setup：组件渲染前的初始化过程是怎样的？.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/05  响应式：响应式内部的实现原理是怎样的？（上）.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/06  响应式：响应式内部的实现原理是怎样的？（下）.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/07  计算属性：计算属性比普通函数好在哪里？.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/08  侦听器：侦听器的实现原理和使用场景是什么？（上）.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/09  侦听器：侦听器的实现原理和使用场景是什么？（下）.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/10  生命周期：各个生命周期的执行时机和应用场景是怎样的？.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/11  依赖注入：子孙组件如何共享数据？.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/12  模板解析：构造 AST 的完整流程是怎样的？（上）.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/13  模板解析：构造 AST 的完整流程是怎样的？（下）.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/14  AST 转换：AST 节点内部做了哪些转换？（上）.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/15  AST 转换：AST 节点内部做了哪些转换？（下）.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/16  生成代码：AST 如何生成可运行的代码？（上）.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/17  生成代码：AST 如何生成可运行的代码？（下）.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/18  Props：Props 的初始化和更新流程是怎样的？.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/19  插槽：如何实现内容分发？.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/20  指令：指令完整的生命周期是怎样的？.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/21  v-model：双向绑定到底是怎么实现的？.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/22  Teleport 组件：如何脱离当前组件渲染子组件？.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/23  KeepAlive 组件：如何让组件在内存中缓存和调度？.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/24  Transition 组件：过渡动画的实现原理是怎样的？（上）.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/25  Transition 组件：过渡动画的实现原理是怎样的？（下）.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/26  Vue Router：如何实现一个前端路由？（上）.html",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/27  Vue Router：如何实现一个前端路由？（下）.html",
                // "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/结束语  终点也是起点.html",
                // "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/模块二导读  逻辑复用最佳实践：Composition API.html",
                // "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/模块三导读  编译和优化：了解编译过程和背后的优化思想.html",
                // "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/模块四导读  实用特性：探索更多实用特性背后的原理.html",
                // "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/模块五导读  内置组件：学习 Vue 内置组件的实现原理.html",
                // "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/模块一导读  组件的实现：直击 Vue 核心的实现.html",
                // "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/特别放送导读  研究 Vue 官方生态的实现原理.html",
              ],
            },
          ],
        },
        {
          text: "ThreeJS",
          collapsible: true,
          children: [
            {
              text: "01-开发环境配置",
              collapsible: true,
              children: [
                "/03-Front-End-Frame/05-ThreeJS/01-开发环境配置/01-了解Three.js.html",
                "/03-Front-End-Frame/05-ThreeJS/01-开发环境配置/02-本地搭建Threejs官方文档网站.html",
                "/03-Front-End-Frame/05-ThreeJS/01-开发环境配置/03-使用parcel搭建three.js开发环境.html",
                "/03-Front-End-Frame/05-ThreeJS/01-开发环境配置/04-渲染第一个场景和物体.html",
              ],
            },
          ],
        },
      ],
      "/04-Front-End-Engineering/": [
        {
          text: "Babel",
          collapsible: true,
          children: [
            "/04-Front-End-Engineering/06-Babel/user-handbook.html",
            "/04-Front-End-Engineering/06-Babel/plugin-handbook.html",
            "/04-Front-End-Engineering/06-Babel/如何利用Babel优化项目.html",
            "/04-Front-End-Engineering/06-Babel/Babel-爬坑.html",
          ],
        },
        // {
        //   text: "性能优化",
        //   collapsible: true,
        //   children: [
        //     "/04-Front-End-Engineering/00-性能优化01/开篇：知识体系与小册格局.html",
        //     "/04-Front-End-Engineering/00-性能优化01/网络篇 1：webpack 性能调优与 Gzip 原理.html",
        //     "/04-Front-End-Engineering/00-性能优化01/网络篇 2：图片优化质量与性能的博弈.html",
        //     "/04-Front-End-Engineering/00-性能优化01/存储篇 1：浏览器缓存机制介绍与缓存策略剖析.html",
        //     "/04-Front-End-Engineering/00-性能优化01/存储篇 2：本地存储从 Cookie 到 Web Storage、IndexDB.html",
        //     "/04-Front-End-Engineering/00-性能优化01/彩蛋篇：CDN 的缓存与回源机制解析.html",
        //     "/04-Front-End-Engineering/00-性能优化01/渲染篇 1：服务端渲染的探索与实践.html",
        //     "/04-Front-End-Engineering/00-性能优化01/渲染篇 2：知己知彼解锁浏览器背后的运行机制.html",
        //     "/04-Front-End-Engineering/00-性能优化01/渲染篇 3：对症下药DOM 优化原理与基本实践.html",
        //     "/04-Front-End-Engineering/00-性能优化01/渲染篇 4：千方百计Event Loop 与异步更新策略.html",
        //     "/04-Front-End-Engineering/00-性能优化01/渲染篇 5：最后一击回流（Reflow）与重绘（Repaint）.html",
        //     "/04-Front-End-Engineering/00-性能优化01/应用篇 1：优化首屏体验Lazy-Load 初探.html",
        //     "/04-Front-End-Engineering/00-性能优化01/应用篇 2：事件的节流（throttle）与防抖（debounce）.html",
        //     "/04-Front-End-Engineering/00-性能优化01/性能监测篇：Performance、LightHouse 与性能 API.html",
        //     "/04-Front-End-Engineering/00-性能优化01/前方的路：希望以此为你的起点.html",
        //   ],
        // },
        {
          text: "性能优化",
          collapsible: true,
          children: [
            "/04-Front-End-Engineering/00-性能优化02/01 前端性能优化介绍.html",
            "/04-Front-End-Engineering/00-性能优化02/02 Web 性能指标.html",
            "/04-Front-End-Engineering/00-性能优化02/03 Web 性能测试.html",
            "/04-Front-End-Engineering/00-性能优化02/04 前端页面的生命周期.html",
            "/04-Front-End-Engineering/00-性能优化02/05 请求和响应优化 01.html",
            "/04-Front-End-Engineering/00-性能优化02/06 渲染优化01.html",
            "/04-Front-End-Engineering/00-性能优化02/06 渲染优化02.html",
            "/04-Front-End-Engineering/00-性能优化02/06 渲染优化03.html",
            "/04-Front-End-Engineering/00-性能优化02/07 图片优化.html",
            "/04-Front-End-Engineering/00-性能优化02/08 资源加载优化.html",
            "/04-Front-End-Engineering/00-性能优化02/09 其它优化参考文章.html",
            "/04-Front-End-Engineering/00-性能优化02/10 网页加速优化简单总结.html",
          ],
        },
        "/04-Front-End-Engineering/01-CanIUse/01-caniuse.html",
        "/04-Front-End-Engineering/03-Babel/ AST（抽象语法树）以及 AST 的广泛应用.html",
        "/04-Front-End-Engineering/04-commitLint/commitLint.html",
        "/04-Front-End-Engineering/07-UML类图/UML类图.html",
        {
          text: "Git",
          collapsible: true,
          children: [
            "/04-Front-End-Engineering/05-Git/版本管理.html",
            "/04-Front-End-Engineering/05-Git/commit合并.html",
          ],
        },
      ],
      "/08-Java/": [
        {
          text: "Maven",
          collapsible: true,
          children: [
            "/08-Java/maven/Maven-基础.html"
          ],
        },{
          text: "Gradle",
          collapsible: true,
          children: [
            "/08-Java/maven/Gradle-基础.html"
          ],
        },
        
      ],
      "/06-English/": [
        "/06-English/新概念/新概念1/Lesson00/音标.html",
        "/06-English/新概念/新概念1/Lesson01~02/Lesson01~02.html",
        "/06-English/新概念/新概念1/Lesson03~04/Lesson03~04.html",
        "/06-English/新概念/新概念1/Lesson05~06/Lesson05~06.html",
        "/06-English/新概念/新概念1/Lesson07~08/Lesson07~08.html",
        "/06-English/新概念/新概念1/Lesson09~10/Lesson09~10.html",
        "/06-English/新概念/新概念1/Lesson11~12/Lesson11~12.html",
        "/06-English/新概念/新概念1/Lesson13~14/Lesson13~14.html",
        "/06-English/新概念/新概念1/Lesson15~16/Lesson15~16.html",
        "/06-English/新概念/新概念1/Lesson17~18/Lesson17~18.html",
        "/06-English/新概念/新概念1/Lesson19~20/Lesson19~20.html",
        "/06-English/新概念/新概念1/Lesson21~22/Lesson21~22.html",
      ],
      "/07-Plan/": ["/07-Plan/index.html"],
    },
  }),
  markdown: {
    headers: {
      level: [2, 3, 4],
    },
  },
});
