#### vueRouter@4.x
#### 参考文档
https://next.router.vuejs.org/guide/#javascript

使用脚手架搭建的Vue3项目默认使用的路由版本是4

或者


```js {0-20}
npm install vue-router@4
```
#### Vue2配合Vue-router3

```js {0-20}
// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 2. 定义路由
// 每个路由应该映射一个组件。
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  mode: 'hash', // 默认 hash 模式
  routes // (缩写) 相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
  router
}).$mount('#app')

// 现在，应用已经启动了！
```
#### Vue3配合Vue-router4
```js {0-20}
// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来
const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }

// 2. 定义路由
// 每个路由应该映射一个组件。
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
]

// 3. 创建 router 实例，然后传 `routes` 配置。
const router = VueRouter.createRouter({
  // 4. 通过 createWebHashHistory() 创建 hash 模式。
  history: VueRouter.createWebHashHistory(),
  routes, // (缩写) 相当于 routes: routes
})
// 5. 创建和挂载根实例。
const app = Vue.createApp({})
// 记得要通过 use 配置参数注入路由，
// 从而让整个应用都有路由功能
app.use(router)

app.mount('#app')
```
![image](https://cloud.knowology.cn:8887/vue3/mode.png)

#### 路由组件跳转

vue2.x使用路由选项redirect设置路由自动调整，vue3.x中移除了这个选项，将在子路由中添加一个空路径路由来匹配跳转


```js {0-20}
// vue2.x router
[
  {
    path: '/',
    component: Layout,
    name: 'WebHome',
    meta: { title: '平台首页' },
    redirect: '/dashboard', // 这里写跳转
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        meta: { title: '工作台' },
        component: () => import('../views/dashboard/index.vue')
      }
    ]
  }
]

// vue3.x router
[
  {
    path: '/',
    component: Layout,
    name: 'WebHome',
    meta: { title: '平台首页' },
    children: [
      { path: '', redirect: 'dashboard' }, // 这里写跳转
      {
        path: 'dashboard',
        name: 'Dashboard',
        meta: { title: '工作台' },
        component: () => import('../views/dashboard/index.vue')
      }
    ]
  }
]

```
#### 捕获所有路由：/:catchAll(.*)

捕获所有路由 ( /* ) 时，现在必须使用带有自定义正则表达式的参数进行定义：/:catchAll(.*)


```js {0-20}
// vue2.x router
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/user/:a*' },
  ]
})

// vue3.x router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/user/:a:catchAll(.*)', component: component },
  ]
})
```

当路由为 /user/a/b 时，捕获到的 params 为 {"a": "a", "catchAll": "/b"}

#### 获取当前路由

```js {0-20}
import { getCurrentInstance } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
  setup () {
    const { ctx } = getCurrentInstance()
    console.log(ctx)
    const router = useRouter()
    const route = useRoute()
    const store = userStore()
    console.log(router, route, store)
    console.log(router.currentRoute.value)
    const userId = computed(() => store.state.app.userId)
    return {
      userId
    }
  }
}
 
``` 
#### 动态路由
router.addRoute(route: RouteRecord)：动态添加路由

router.removeRoute(name: string | symbol)：动态删除路由

router.hasRoute(name: string | symbol): 判断路由是否存在

router.getRoutes(): 获取路由列表
``` js {0-20}
router.addRoute({ path: '/about', name: 'about', component: About })
// name 应该是唯一的。会先删除原路由再添加新路由
router.addRoute({ path: '/other', name: 'about', component: Other })

const removeRoute = router.addRoute(routeRecord)
// 删除添加的路由
removeRoute()

router.addRoute({ path: '/about', name: 'about', component: About })
// 添加的时候有name的话，可以直接使用删除对应name的路由
router.removeRoute('about')

// 嵌套路由
router.addRoute({ name: 'admin', path: '/admin', component: Admin })
// 第一个参数admin是父路由的名称
router.addRoute('admin', { path: 'settings', component: AdminSettings })

const routeRecords = router.getRoutes()
```