import { defineUserConfig } from "vuepress";
import { defaultTheme } from "@vuepress/theme-default";
import { viteBundler } from "@vuepress/bundler-vite";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import { path } from "@vuepress/utils";

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
        link: "/06-English/新概念/新概念1/Lesson01~02/Lesson01~02.md",
      },
      {
        text: "Plan",
        link: "/07-Plan/index.md",
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
          text: "Webpack源码解读",
          collapsible: true,
          children: [
            "/03-Front-End-Frame/02-Webpack/01-手写tapable/01-tapable.md",
            "/03-Front-End-Frame/02-Webpack/05-TreeShaking/05-TreeShaking.md",
          ],
        },
        {
          text: "Vue3源码解读",
          collapsible: true,
          children: [
            {
              text: "手写Vue3",
              collapsible: true,
              children: [
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/初始化环境.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现 effect & reactive & 依赖收集 & 触发依赖.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现effect返回runner.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现effect的scheduler功能.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现effect的stop功能.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现readonly功能.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现isReactive和isReadonly.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现reactive和readonly的嵌套转换.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现shallowReadonly.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现isProxy.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现shallowReactive.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现ref.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现toRaw.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现isRef和unRef.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现proxyRefs.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现computed.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/组件的初始化流程.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/配置rollup.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/组件的代理对象.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现shapeFlags.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现注册事件功能.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现组件的props功能.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现组件的emit功能.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现组件的slot功能.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现Fragment和Text节点.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现getCurrentInstance.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现provide和inject.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现customRenderer.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/初始化element更新流程.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/更新props.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/更新children（一）.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/更新children（二）.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/更新children（三）.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/更新children（四）.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/更新component.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/视图异步更新&&nextTickAPI.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/编译模块概述.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现解析插值表达式.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现解析element标签.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现解析text.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/三种类型联合解析.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/从有限状态机的角度看parse原理.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/transform模块.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/codegen生成text.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/codegen生成插值类型.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/codegen生成element.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/codegen生成联合3种类型.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/mini-vue-docs/docs/实现template编译为render.md",
              ],
            },
            {
              text: "Vue解读",
              collapsible: true,
              children: [
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/01  组件渲染：vnode 到真实 DOM 是如何转变的？.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/02  组件更新：完整的 DOM diff 流程是怎样的？（上）.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/03  组件更新：完整的 DOM diff 流程是怎样的？（下）.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/04  Setup：组件渲染前的初始化过程是怎样的？.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/05  响应式：响应式内部的实现原理是怎样的？（上）.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/06  响应式：响应式内部的实现原理是怎样的？（下）.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/07  计算属性：计算属性比普通函数好在哪里？.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/08  侦听器：侦听器的实现原理和使用场景是什么？（上）.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/09  侦听器：侦听器的实现原理和使用场景是什么？（下）.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/10  生命周期：各个生命周期的执行时机和应用场景是怎样的？.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/11  依赖注入：子孙组件如何共享数据？.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/12  模板解析：构造 AST 的完整流程是怎样的？（上）.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/13  模板解析：构造 AST 的完整流程是怎样的？（下）.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/14  AST 转换：AST 节点内部做了哪些转换？（上）.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/15  AST 转换：AST 节点内部做了哪些转换？（下）.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/16  生成代码：AST 如何生成可运行的代码？（上）.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/17  生成代码：AST 如何生成可运行的代码？（下）.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/18  Props：Props 的初始化和更新流程是怎样的？.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/19  插槽：如何实现内容分发？.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/20  指令：指令完整的生命周期是怎样的？.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/21  v-model：双向绑定到底是怎么实现的？.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/22  Teleport 组件：如何脱离当前组件渲染子组件？.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/23  KeepAlive 组件：如何让组件在内存中缓存和调度？.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/24  Transition 组件：过渡动画的实现原理是怎样的？（上）.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/25  Transition 组件：过渡动画的实现原理是怎样的？（下）.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/26  Vue Router：如何实现一个前端路由？（上）.md",
                "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/27  Vue Router：如何实现一个前端路由？（下）.md",
                // "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/结束语  终点也是起点.md",
                // "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/模块二导读  逻辑复用最佳实践：Composition API.md",
                // "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/模块三导读  编译和优化：了解编译过程和背后的优化思想.md",
                // "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/模块四导读  实用特性：探索更多实用特性背后的原理.md",
                // "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/模块五导读  内置组件：学习 Vue 内置组件的实现原理.md",
                // "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/模块一导读  组件的实现：直击 Vue 核心的实现.md",
                // "/03-Front-End-Frame/01-Vue3/Vue3源码解析/文章/特别放送导读  研究 Vue 官方生态的实现原理.md",
              ],
            },
          ],
        },
      ],
      "/04-Front-End-Engineering/": [
        {
          text: "性能优化",
          collapsible: true,
          children: [
            "/04-Front-End-Engineering/00-性能优化01/开篇：知识体系与小册格局.md",
            "/04-Front-End-Engineering/00-性能优化01/网络篇 1：webpack 性能调优与 Gzip 原理.md",
            "/04-Front-End-Engineering/00-性能优化01/网络篇 2：图片优化质量与性能的博弈.md",
            "/04-Front-End-Engineering/00-性能优化01/存储篇 1：浏览器缓存机制介绍与缓存策略剖析.md",
            "/04-Front-End-Engineering/00-性能优化01/存储篇 2：本地存储从 Cookie 到 Web Storage、IndexDB.md",
            "/04-Front-End-Engineering/00-性能优化01/彩蛋篇：CDN 的缓存与回源机制解析.md",
            "/04-Front-End-Engineering/00-性能优化01/渲染篇 1：服务端渲染的探索与实践.md",
            "/04-Front-End-Engineering/00-性能优化01/渲染篇 2：知己知彼解锁浏览器背后的运行机制.md",
            "/04-Front-End-Engineering/00-性能优化01/渲染篇 3：对症下药DOM 优化原理与基本实践.md",
            "/04-Front-End-Engineering/00-性能优化01/渲染篇 4：千方百计Event Loop 与异步更新策略.md",
            "/04-Front-End-Engineering/00-性能优化01/渲染篇 5：最后一击回流（Reflow）与重绘（Repaint）.md",
            "/04-Front-End-Engineering/00-性能优化01/应用篇 1：优化首屏体验Lazy-Load 初探.md",
            "/04-Front-End-Engineering/00-性能优化01/应用篇 2：事件的节流（throttle）与防抖（debounce）.md",
            "/04-Front-End-Engineering/00-性能优化01/性能监测篇：Performance、LightHouse 与性能 API.md",
            "/04-Front-End-Engineering/00-性能优化01/前方的路：希望以此为你的起点.md",
          ],
        },
        {
          text: "性能优化2",
          collapsible: true,
          children: [
            "/04-Front-End-Engineering/00-性能优化02/02请求和响应优化.md",
          ],
        },
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
        "/06-English/新概念/新概念1/Lesson01~02/Lesson01~02.md",
        "/06-English/新概念/新概念1/Lesson03~04/Lesson03~04.md",
        "/06-English/新概念/新概念1/Lesson05~06/Lesson05~06.md",
        "/06-English/新概念/新概念1/Lesson07~08/Lesson07~08.md",
      ],
      "/07-Plan/": ["/07-Plan/index.md"],
    },
  }),
});
