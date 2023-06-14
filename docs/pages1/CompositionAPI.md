### CompositionAPI

#### 1. setup()
setup函数是一个新的组件选项。作为在组件内使用Composition API的入口点。它会在beforeCreate钩子之前被调用，所有变量、方法都在setup函数中定义，之后return出去供外部使用

该函数有2个参数：
props
context
    
其中context是一个上下文对象，具有属性（attrs，slots，emit，parent，root），其对应于vue2中的this.$attrs，this.$slots，this.$emit，this.$parent，this.$root。

<u>  *注意：this关键字在setup()函数内部不可用，在方法中访问setup中的变量时，直接访问变量名就可以使用。</u>
      
```js {0-20}
export default {
  props: {
    title: String
  },
  setup(props) {
    console.log(props.title)
  }
}
```
<u>  props 是响应式的，你不能使用 ES6 解构，因为它会消除 prop 的响</u>应性

#### 2. reactive, ref
   reactive和ref都是vue3中用来创建响应式数据的api，作用等同于在vue2中的data，不同的是他们使用了ES6的Porxy API解决了vue2 defineProperty 无法监听数组和对象新增属性的缺陷
   
   区别

   使用时在setup函数中需要通过内部属性.value来访问ref数据，return出去的ref可直接访问，reactive可以直接通过创建对象访问
ref接受一个参数，返回响应式ref对象，一般是基本类型值（String 、Nmuber 、Boolean 等）或单值对象。如果传入的参数是一个对象，将会调用 reactive 方法进行深层响应转换（此时访问ref中的对象会返回Proxy对象，说明是通过reactive创建的）；引用类型值（Object 、Array）使用reactive

```js {0-20}
<template>
  <div class="contain">
    <el-button type="primary" @click="numadd">add</el-button>
    <span>{{ `${state.str}-${num}` }}</span>
  </div>
</template>

<script lang="ts">
  import { reactive, ref } from 'vue';
  interface State {
    str: string;
    list: string[];
  }

  export default {
    setup() {
      const state = reactive<State>({
        str: 'test',
        list: [],
      });
      //ref需要加上value才能获取
      const num = ref(1);
      const numadd = () => {
        num.value++;
      };
      return { state, numadd, num };
    },
  };
</script>

```
#### 3. toRefs
   将传入的对象里所有的属性的值都转化为响应式数据对象(ref)
   使用reactive return 出去的值每个都需要通过reactive对象 .属性的方式访问,也可以通过解构赋值的方式，但是直接解构的参数不具备响应式，此时可以使用到这个api（也可以对props中的响应式数据做此处理）
   ```js {0-20}
   <template>
  <div class="contain">
    <el-button type="primary" @click="numadd">add</el-button>
-    <span>{{ `${state.str}-${num}` }}</span>
+    <span>{{ `${str}-${num}` }}</span>
  </div>
</template>

<script lang="ts">
  import { reactive, ref, toRefs } from 'vue';
  interface State {
    str: string;
    list: string[];
  }

  export default {
    setup() {
      const state = reactive<State>({
        str: 'test',
        list: [],
      });
      //ref需要加上value才能获取
      const num = ref(1);
      const numadd = () => {
        num.value++;
      };
-      return { state, numadd, num };
+      return { ...toRefs(state), numadd, num };
    },
  };
</script>

   ```
#### 4. toRef
   toRef 用来将引用数据类型或者reavtive数据类型中的某个值转化为响应式数据
#### 5. isRef
   判断是否是ref对象,内部是判断数据对象上是否包含__v_isRef属性且值为true。
```js {0-20}
    setup() {
      const one = ref(0);
      const two = 0;
      const third = reactive({
        data: '',
      });
      let four = toRef(third, 'data');
      const { data } = toRefs(third);
      
      console.log(isRef(one)); // true
      console.log(isRef(data)); // true
      console.log(isRef(four)); // true
      console.log(isRef(two)); // false
      console.log(isRef(third)); // false
    }

```
#### 6. unref
如果参数为ref，则返回内部原始值，否则返回参数本身。内部是val = isRef(val) ? val.value : val的语法糖。
```js {0-20}
    setup() {
      const hello = ref('hello');
      console.log(hello); // { __v_isRef: true,value: "hello"... }
      const newHello = unref(hello);
      console.log(newHello); // hello
    }

```
#### 7. watch
语法为：watch(source, callback, options)

<u>source：用于指定监听的依赖对象，可以是表达式，getter函数或者包含上述两种类型的数组（如果要监听多个值）</u>

<u>callback：依赖对象变化后执行的回调函数，带有2个参数：newVal，oldVal。如果要监听多个数据每个参数可以是数组 [newVal1, newVal2, ... newValN]，[oldVal1, oldVal2, ... oldValN]</u>

<u>options：可选参数，用于配置watch的类型，可以配置的属性有 immediate（立即触发回调函数）、deep（深度监听）</u>

```js {0-20}
      let title = ref('Create');
      let num = ref(0);
      const state = reactive<State>({
        nums: 0,
        list: [],
      });
      
      // 监听ref
      watch(title, (newValue, oldValue) => {
         /* ... */
      });

      // 监听reactive
      watch(
        // getter
        () => state.list.length,
        // callback
        (v = 0) => {
          state.nums = v;
        },
         // watch Options
        { immediate: true }
      );
      
      // 监听多个ref
      watch([title, num], ([newTitle, newNum], [oldTitle, oldNum]) => {
        /* ... */
      });      
      
      // 监听reactive多个值
      watch([() => state.list, () => state.nums], ([newList, newNums], [oldList, oldvNums]) => {
        /* ... */
      });

```
#### 8. watchEffect
立即执行传入的一个函数,并响应式追踪其依赖,并在其依赖变更是重新运行该函数.

#### 9. computed
传入一个getter函数,返回一个默认的ref对象.
```js {0-20}
let title = ref('Create');
const vTitle = computed(() => '-' + title.value + '-');
```
反转字符串
```js {0-20}
setup() {
    const state = reactive({
     value: '',
     rvalue: computed(() =>
           state.value
             .split('')
             .reverse()
             .join('')
     )
   })
   return toRefs(state)
 }

```
`computed支持读写操作`

当给computed传递的是一个方法的时候默认就是只读模式，不可以进行修改操作

```js {0-20}
// 只读模式操作
const count = ref(1)
const plusOne = computed(() => count.value + 1)

console.log(plusOne.value) // 2

plusOne.value++ // 错误！
```
想要修改这个值的话就需要使用对象形式的参数，注意{get() =>{}, set() => {}}get和set是搭配使用的，否则会抛出错误
```js {0-20}
// 读写模式操作
const count = ref(1)
const plusOne = computed({
  get: () => count.value + 1,
  set: (val) => {
    // val是=右边的值 plusOne.value = 1
    count.value = val - 1
  },
})

plusOne.value = 1
console.log(count.value) // 0
```
 #### 10. provide, inject
provide()和inject()用来实现多级嵌套组件之间的数据传递，父组件或祖先组件使用 provide()向下传递数据，子组件或子孙组件使用inject()来接收数据
```js {0-20}
// 父组件
<script>
import {provide} from 'vue'
export default {
    setup() {
        const obj = ref('johnYu')
        // 向子孙组件传递数据provide(名称,数据)
        provide('name', obj)
    }
}
</script>

// 孙组件
<script>
import {inject} from 'vue'
export default {
    setup() {	
        // 接收父组件传递过来的数据inject(名称)
        const name = inject('name') // johnYu
        return {name}
    }
}
</script>

```
#### 11. getCurrentInstance
getCurrentInstance方法用于获取当前组件实例，仅在setup和生命周期中起作用
```js {0-20}
<template>
	<p>{{ num }}</p>
</template>
<script>
import {ref, getCurrentInstance} from 'vue'
export default {
    setup() {	
        const num = ref(3)
        const instance = getCurrentInstance()
        console.log(instance)

        return {num}
    }
}
</script>
```
通过instance中的ctx属性可以获得当前上下文
#### 12. $Refs
获得对模板中元素或组件实例的引用，可以同样使用ref并从setup（）返回它

```js {0-20}
setup() {
    // 获取渲染上下文的引用
    // 创建一个DOM引用，名称必须与元素的ref属性名相同
    const myRef = ref(null);
    
    // 仅在初次渲染后才能获得目标元素
    onMounted(() => {
      console.log(myRef.value);
    });
    return {
      myRef
    };
}
```
多个ref
```js {0-20}
let myRef = '';
const setRef = el => {
   myRef = el;
}

nextTick(() => {
   console.log(myRef);
})
return {
    setRef
};
```