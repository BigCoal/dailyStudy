import { defineUserConfig } from "vuepress";
import { defaultTheme } from "@vuepress/theme-default";

export default defineUserConfig({
  lang: "zh-CN",
  title: "大煤球的技术文档",
  description: "学而不思则罔，思而不学则殆",
  head: [["link", { rel: "icon", href: "/logo.png" }]],
  theme: defaultTheme({
    logo: "/logo.png",
    // search: true, //搜索
    // darkMode: false,
    repo: "https://github.com/BigCoal/dailyStudy",
    // searchMaxSuggestions: 12,
    navbar: [
      { text: "首页", link: "/" },
      {
        text: "计算机基础四大件",
        link: "/01-Computer-Basic/03-设计模式/策略模式.md",
      },
      {
        text: "前端基础三大件",
        link: "/02-Front-End-Basic/01-JavaScript/基础系列/slice-substring-substr.md",
      },
      {
        text: "前端框架",
        link: "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/01  组件渲染：vnode 到真实 DOM 是如何转变的？.md",
      },
      {
        text: "工程化",
        link: "/04-Front-End-Engineering/01-CanIUse/01-caniuse.md",
      },
      {
        text: "英语自学",
        link: "/06-English/新概念/新概念1/1-2 Excuse me.md",
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
                "/01-Computer-Basic/01-数据结构和算法/00-基础/运算符优先级.md",
                "/01-Computer-Basic/01-数据结构和算法/00-基础/原码、反码、补码.md",
                "/01-Computer-Basic/01-数据结构和算法/00-基础/位运算.md",
                "/01-Computer-Basic/01-数据结构和算法/00-基础/位运算(下).md",
              ],
            },
            {
              text: "复杂度",
              collapsible: true,
              children: [
                "/01-Computer-Basic/01-数据结构和算法/01-复杂度，二分法/空间复杂度.md",
                "/01-Computer-Basic/01-数据结构和算法/01-复杂度，二分法/时间复杂度.md",
              ],
            },
            {
              text: "二叉树",
              collapsible: true,
              children: [
                "/01-Computer-Basic/01-数据结构和算法/10-二叉树（一）/二叉树.md",
              ],
            },
            {
              text: "从暴力递归到动态规划",
              collapsible: true,
              children: [
                "/01-Computer-Basic/01-数据结构和算法/17-认识一些经典的递归过程/认识一些经典递归过程.md",
                "/01-Computer-Basic/01-数据结构和算法/18-暴力递归到动态规划（一）/暴力递归到动态规划（一）.md",
                "/01-Computer-Basic/01-数据结构和算法/22-暴力递归到动态规划（五）/暴力递归到动态规划（五）.md",
                "/01-Computer-Basic/01-数据结构和算法/23-暴力递归到动态规划（六）/暴力递归到动态规划（六）.md",
              ],
            },
            {
              text: "复杂度",
              collapsible: true,
              children: [
                "/01-Computer-Basic/01-数据结构和算法/33-与哈希函数有关结构/哈希表.md",
                "/01-Computer-Basic/01-数据结构和算法/33-与哈希函数有关结构/一致性哈希算法.md",
              ],
            },
          ],
        },
        {
          text: "计算机网络",
          collapsible: true,
          children: [
            "/01-Computer-Basic/02-计算机网络/HTTP/HTTP发展历程.md",
            "/01-Computer-Basic/02-计算机网络/HTTP/TCP协议详解.md",
            "/01-Computer-Basic/02-计算机网络/HTTP/DNS原理入门.md",
            "/01-Computer-Basic/02-计算机网络/HTTP/CDN原理入门.md",
            "/01-Computer-Basic/02-计算机网络/HTTP/浏览器、DNS、CDN缓存.md",
            "/01-Computer-Basic/02-计算机网络/HTTP/http缓存与cdn缓存配置指南.md",
            "/01-Computer-Basic/02-计算机网络/HTTP/Data-URL.md",
            "/01-Computer-Basic/02-计算机网络/HTTP/HTTP Headers.md",
            "/01-Computer-Basic/02-计算机网络/HTTP/HTTP cookies.md",
            "/01-Computer-Basic/02-计算机网络/HTTP/HTTP 消息.md",
            "/01-Computer-Basic/02-计算机网络/HTTP/HTTP 缓存.md",
            "/01-Computer-Basic/02-计算机网络/HTTP/HTTP 请求方法.md",
            "/01-Computer-Basic/02-计算机网络/HTTP/HTTP 请求的响应头部 Vary 的理解.md",
            "/01-Computer-Basic/02-计算机网络/HTTP/HTTP 详解长短连接，管道化，队头阻塞及它们之间的关系.md",
            "/01-Computer-Basic/02-计算机网络/HTTP/HTTP2四大核心特性.md",
            "/01-Computer-Basic/02-计算机网络/HTTP/HTTPS.md",
            "/01-Computer-Basic/02-计算机网络/HTTP/HTTP_1.x 的连接管理.md",
            "/01-Computer-Basic/02-计算机网络/HTTP/HTTP安全",
            "/01-Computer-Basic/02-计算机网络/HTTP/HTTP概述.md",
            "/01-Computer-Basic/02-计算机网络/HTTP/meta标签.md",
            "/01-Computer-Basic/02-计算机网络/HTTP/图解SSL_TLS协议.md",
            "/01-Computer-Basic/02-计算机网络/HTTP/理解TCP序列号Seq和确认号Ack.md",
            "/01-Computer-Basic/02-计算机网络/HTTP/跨源资源共享 (CORS).md",
            "/01-Computer-Basic/02-计算机网络/HTTP/浏览器的工作原理.md",
          ],
        },
        {
          text: "设计模式",
          collapsible: true,
          children: [
            // 字符串 - 页面文件路径
            "/01-Computer-Basic/03-设计模式/策略模式.md",
            "/01-Computer-Basic/03-设计模式/代理模式.md",
          ],
        },
      ],
      "/02-Front-End-Basic/": [
        {
          text: "HTML",
          collapsible: true,
          children: [
            "/02-Front-End-Basic/03-HTML/client-offset-scroll.md",
            "/02-Front-End-Basic/03-HTML/浏览器工作原理(上).md",
            "/02-Front-End-Basic/03-HTML/浏览器工作原理(下).md",
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
                "/02-Front-End-Basic/01-JavaScript/基础系列/slice-substring-substr.md",
                {
                  text: "数据类型",
                  collapsible: true,
                  children: [
                    "/02-Front-End-Basic/01-JavaScript/基础系列/数据类型/数据类型与堆栈.md",
                    "/02-Front-End-Basic/01-JavaScript/基础系列/数据类型/null和undefined.md",
                    "/02-Front-End-Basic/01-JavaScript/基础系列/数据类型/int和bigInt.md",
                  ],
                },
                {
                  text: "Ajax",
                  collapsible: true,
                  children: [
                    "/02-Front-End-Basic/01-JavaScript/基础系列/ajax/Ajax.md",
                  ],
                },

                "/02-Front-End-Basic/01-JavaScript/基础系列/严格模式.md",
                "/02-Front-End-Basic/01-JavaScript/基础系列/正则/正则表达式.md",
                "/02-Front-End-Basic/01-JavaScript/基础系列/任务队列.md",
                "/02-Front-End-Basic/01-JavaScript/基础系列/typeof.md",
                "/02-Front-End-Basic/01-JavaScript/基础系列/Promise原理解析.md",
                "/02-Front-End-Basic/01-JavaScript/基础系列/原型到原型链.md",
                {
                  text: "执行上下文系列",
                  collapsible: true,
                  children: [
                    "/02-Front-End-Basic/01-JavaScript/基础系列/词法作用域.md",
                    "/02-Front-End-Basic/01-JavaScript/基础系列/执行上下文栈.md",
                    "/02-Front-End-Basic/01-JavaScript/基础系列/变量对象.md",
                    "/02-Front-End-Basic/01-JavaScript/基础系列/作用域链.md",
                    "/02-Front-End-Basic/01-JavaScript/基础系列/this.md",
                    "/02-Front-End-Basic/01-JavaScript/基础系列/深入执行上下文.md",
                  ],
                },
                "/02-Front-End-Basic/01-JavaScript/基础系列/闭包.md",
                "/02-Front-End-Basic/01-JavaScript/基础系列/类数组.md",
                {
                  text: "模拟实现系列",
                  collapsible: true,
                  children: [
                    "/02-Front-End-Basic/01-JavaScript/基础系列/call和apply的模拟实现.md",
                    "/02-Front-End-Basic/01-JavaScript/基础系列/bind模拟实现.md",
                    "/02-Front-End-Basic/01-JavaScript/基础系列/new的模拟实现.md",
                  ],
                },
                {
                  text: "性能优化",
                  collapsible: false,
                  children: [
                    "/02-Front-End-Basic/01-JavaScript/基础系列/性能优化/缓存机制.md",
                    "/02-Front-End-Basic/01-JavaScript/基础系列/性能优化/性能优化.md",
                  ],
                },
                {
                  text: "本地存储和安全",
                  collapsible: true,
                  children: [
                    "/02-Front-End-Basic/01-JavaScript/基础系列/同源策略.md",
                    "/02-Front-End-Basic/01-JavaScript/基础系列/cookie.md",
                    "/02-Front-End-Basic/01-JavaScript/基础系列/XSS攻击.md",
                    "/02-Front-End-Basic/01-JavaScript/基础系列/CSRF攻击.md",
                  ],
                },
                {
                  text: "类型转换",
                  collapsible: true,
                  children: [
                    "/02-Front-End-Basic/01-JavaScript/基础系列/类型转换（上）.md",
                    "/02-Front-End-Basic/01-JavaScript/基础系列/类型转换（下）.md",
                  ],
                },
                "/02-Front-End-Basic/01-JavaScript/基础系列/创建对象的多种方式.md",
                "/02-Front-End-Basic/01-JavaScript/基础系列/继承的多种方式.md",
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
                    "/02-Front-End-Basic/01-JavaScript/专题系列/防抖与节流/防抖.md",
                    "/02-Front-End-Basic/01-JavaScript/专题系列/防抖与节流/节流.md",
                  ],
                },
                {
                  text: "数组系列",
                  collapsible: true,
                  children: [
                    "/02-Front-End-Basic/01-JavaScript/专题系列/数组系列/数组去重.md",
                    "/02-Front-End-Basic/01-JavaScript/专题系列/数组系列/数组扁平化.md",
                    "/02-Front-End-Basic/01-JavaScript/专题系列/数组系列/数组查找指定元素.md",
                    "/02-Front-End-Basic/01-JavaScript/专题系列/数组系列/数组最大值最小值.md",
                    "/02-Front-End-Basic/01-JavaScript/专题系列/数组系列/数组乱序.md",
                    "/02-Front-End-Basic/01-JavaScript/专题系列/数组系列/v8 排序源码.md",
                  ],
                },
                {
                  text: "类型判断",
                  collapsible: true,
                  children: [
                    "/02-Front-End-Basic/01-JavaScript/专题系列/类型判断/类型判断(上).md",
                    "/02-Front-End-Basic/01-JavaScript/专题系列/类型判断/类型判断(下).md",
                  ],
                },
                {
                  text: "函数",
                  collapsible: true,
                  children: [
                    "/02-Front-End-Basic/01-JavaScript/专题系列/函数系列/惰性函数.md",
                    "/02-Front-End-Basic/01-JavaScript/专题系列/函数系列/函数记忆.md",
                    "/02-Front-End-Basic/01-JavaScript/专题系列/函数系列/函数柯里化.md",
                    "/02-Front-End-Basic/01-JavaScript/专题系列/函数系列/函数组合.md",
                    "/02-Front-End-Basic/01-JavaScript/专题系列/函数系列/偏函数.md",
                    "/02-Front-End-Basic/01-JavaScript/专题系列/函数系列/递归.md",
                  ],
                },
                "/02-Front-End-Basic/01-JavaScript/专题系列/深浅拷贝.md",
                "/02-Front-End-Basic/01-JavaScript/专题系列/判断两个对象相等.md",
                "/02-Front-End-Basic/01-JavaScript/专题系列/实现 jQuery 的 each .md",
                "/02-Front-End-Basic/01-JavaScript/专题系列/实现 jquery 的 extend.md",
                "/02-Front-End-Basic/01-JavaScript/专题系列/垃圾回收.md",
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
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/intro.md",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/let.md",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/destructuring.md",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/string.md",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/string-methods.md",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/regex.md",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/number.md",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/function.md",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/array.md",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/object.md",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/object-methods.md",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/operator.md",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/symbol.md",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/set-map.md",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/proxy.md",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/reflect.md",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/promise.md",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/iterator.md",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/generator.md",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/generator-async.md",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/async.md",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/class.md",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/class-extends.md",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/module.md",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/module-loader.md",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/style.md",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/spec.md",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/async-iterator.md",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/arraybuffer.md",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/proposals.md",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/decorator.md",
                    "/02-Front-End-Basic/01-JavaScript/ES6/文档/reference.md",
                  ],
                },
                "/02-Front-End-Basic/01-JavaScript/ES6/模块加载规范.md",
              ],
            },
          ],
        },
        {
          text: "CSS",
          collapsible: true,
          children: [
            "/02-Front-End-Basic/02-CSS/流、元素与基本尺寸.md",
            {
              text: "盒尺寸四大家族",
              collapsible: true,
              children: [
                "/02-Front-End-Basic/02-CSS/盒尺寸四大家族/Content.md",
                "/02-Front-End-Basic/02-CSS/盒尺寸四大家族/Padding.md",
                "/02-Front-End-Basic/02-CSS/盒尺寸四大家族/Margin.md",
                "/02-Front-End-Basic/02-CSS/盒尺寸四大家族/Border.md",
              ],
            },
            {
              text: "内联元素和流",
              collapsible: true,
              sidebarDepth: 10,
              children: [
                "/02-Front-End-Basic/02-CSS/内联元素和流/字母x.md",
                "/02-Front-End-Basic/02-CSS/内联元素和流/line-height.md",
                "/02-Front-End-Basic/02-CSS/内联元素和流/vertical-align.md",
              ],
            },
            {
              text: "流的破坏与保护",
              collapsible: true,
              sidebarDepth: 10,
              children: [
                "/02-Front-End-Basic/02-CSS/流的破坏与保护/魔鬼属性float.md",
                "/02-Front-End-Basic/02-CSS/流的破坏与保护/魔鬼属性float的天然克星clear.md",
                "/02-Front-End-Basic/02-CSS/流的破坏与保护/最佳结界overflow.md",
                "/02-Front-End-Basic/02-CSS/流的破坏与保护/BFC.md",
                "/02-Front-End-Basic/02-CSS/流的破坏与保护/position-absolute.md",
                "/02-Front-End-Basic/02-CSS/流的破坏与保护/position-relative.md",
                "/02-Front-End-Basic/02-CSS/流的破坏与保护/position-fixed.md",
              ],
            },
            "/02-Front-End-Basic/02-CSS/css世界的层叠规则/css世界的层叠规则.md",
            {
              text: "强大的文本处理能力",
              collapsible: true,
              sidebarDepth: 10,
              children: [
                "/02-Front-End-Basic/02-CSS/强大的文本处理能力/font-size.md",
                "/02-Front-End-Basic/02-CSS/强大的文本处理能力/font-family.md",
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
              sidebarDepth: 10,
              children: [
                "/02-Front-End-Basic/04-Typescript/handbook/basic-types.md",
                "/02-Front-End-Basic/04-Typescript/handbook/interfaces.md",
                "/02-Front-End-Basic/04-Typescript/handbook/functions.md",
                "/02-Front-End-Basic/04-Typescript/handbook/literal-types.md",
                "/02-Front-End-Basic/04-Typescript/handbook/classes.md",
                "/02-Front-End-Basic/04-Typescript/handbook/enums.md",
                "/02-Front-End-Basic/04-Typescript/handbook/generics.md",
              ],
            },
            {
              text: "进阶",
              collapsible: true,
              sidebarDepth: 10,
              children: [
                "/02-Front-End-Basic/04-Typescript/reference/advanced-types.md",
                "/02-Front-End-Basic/04-Typescript/reference/utility-types.md",
                "/02-Front-End-Basic/04-Typescript/reference/declaration-merging.md",
                "/02-Front-End-Basic/04-Typescript/reference/mixins.md",
                "/02-Front-End-Basic/04-Typescript/reference/type-compatibility.md",
                "/02-Front-End-Basic/04-Typescript/reference/type-inference.md",
                "/02-Front-End-Basic/04-Typescript/reference/jsx.md",
                "/02-Front-End-Basic/04-Typescript/reference/modules.md",
                "/02-Front-End-Basic/04-Typescript/reference/module-resolution.md",
                "/02-Front-End-Basic/04-Typescript/reference/namespaces.md",
                "/02-Front-End-Basic/04-Typescript/reference/namespaces-and-modules",
              ],
            },
            {
              text: "声明文件",
              collapsible: true,
              sidebarDepth: 10,
              children: [
                "/02-Front-End-Basic/04-Typescript/declaration-files/introduction.md",
                "/02-Front-End-Basic/04-Typescript/declaration-files/by-example.md",
                "/02-Front-End-Basic/04-Typescript/declaration-files/library-structures.md",
                "/02-Front-End-Basic/04-Typescript/declaration-files/templates.md",
              ],
            },
            {
              text: "工程配置",
              collapsible: true,
              sidebarDepth: 10,
              children: [
                "/02-Front-End-Basic/04-Typescript/project-config/tsconfig.json.md",
                "/02-Front-End-Basic/04-Typescript/project-config/project-references.md",
                "/02-Front-End-Basic/04-Typescript/project-config/compiler-options.md",
              ],
            },
          ],
        },
      ],
      "/03-Front-End-Frame/": [
        {
          text: "Vue3源码解读",
          collapsible: true,
          children: [
            // 字符串 - 页面文件路径
            "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/01  组件渲染：vnode 到真实 DOM 是如何转变的？.md",
          ],
        },
      ],
      "/04-Front-End-Engineering/": [
        "/04-Front-End-Engineering/01-CanIUse/01-caniuse.md",
        "/04-Front-End-Engineering/03-Babel/ AST（抽象语法树）以及 AST 的广泛应用.md",
        "/04-Front-End-Engineering/04-commitLint/commitLint.md",
        {
          text: "Git",
          collapsible: true,
          children: [
            "/04-Front-End-Engineering/05-Git/版本管理.md",
            "/04-Front-End-Engineering/05-Git/commit合并.md",
          ],
        },
      ],
      "/06-English/": [
        "/06-English/新概念/新概念1/1-2 Excuse me.md",
        "/06-English/新概念/新概念1/3-4 Sorry sit",
        "/06-English/新概念/新概念1/5-6 Nice to meet you copy.md",
        "/06-English/新概念/新概念1/7-8 Are you a teacher.md",
      ],
    },
  }),
});
