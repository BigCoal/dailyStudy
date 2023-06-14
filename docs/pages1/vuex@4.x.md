#### vuex@4.x

创建实例


```js {0-20}
// vue2.x vuex
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {}
}

// vue3.x vuex
import Vuex from 'vuex'

export default Vuex.createStore({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {}
})

```
获取store


```js {0-20}
// vue3.x vuex
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
