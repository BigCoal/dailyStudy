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
    ],
    // 侧边栏
    sidebar: {
      "/01-Computer-Basic/": [
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
      ],
    },
  }),
});
