我们都知道，Vue.js 的核心思想之一是组件化，组件就是 DOM 的映射，我们通过嵌套的组件构成了一个组件应用程序的树。

但是，有些时候组件模板的一部分在逻辑上属于该组件，而从技术角度来看，最好将模板的这一部分移动到应用程序之外的其他位置。

一个常见的场景是创建一个包含全屏模式的对话框组件。在大多数情况下，我们希望对话框的逻辑存在于组件中，但是对话框的定位 CSS 是一个很大的问题，它非常容易受到外层父组件的 CSS 影响。

假设我们有这样一个 dialog 组件，用按钮来管理一个 dialog：

复制代码

```
<template>
  <div v-show="visible" class="dialog">
    <div class="dialog-body">
      <p>I'm a dialog!</p>
      <button @click="visible=false">Close</button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        visible: false
      }
    },
    methods: {
      show() {
        this.visible = true
      }
    }
  }
</script>
<style>
  .dialog {
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    background-color: rgba(0,0,0,.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .dialog .dialog-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    width: 300px;
    height: 300px;
    padding: 5px;
  }
</style>
```

然后我们去使用这个组件：

复制代码

```
<template>
  <button @click="showDialog">Show dialog</button>
  <Dialog ref="dialog"></Dialog>
</template>
<script>
  import Dialog from './components/dialog'
  export default {
    components: {
      Dialog
    },
    methods: {
      showDialog() {
        this.$refs.dialog.show()
      }
    }
  }
</script>
```

因为我们的 dialog 组件使用的是 position:absolute 绝对定位的方式，如果它的父级 DOM 有 position 不为 static 的布局方式，那么 dialog 的定位就受到了影响，不能按预期渲染了。

所以一种好的解决方案是把 dialog 组件渲染的这部分 DOM 挂载到 body 下面，这样就不会受到父级样式的影响了。

在 Vue.js 2.x 中，想实现上面的需求，你可以依赖开源插件 [portal-vue](https://github.com/LinusBorg/portal-vue) 或者是 [vue-create-api](https://github.com/cube-ui/vue-create-api)，感兴趣可以自行了解。

而 Vue.js 3.0 把这一能力内置到内核中，提供了一个内置组件 Teleport，它可以轻松帮助我们实现上述需求：

复制代码

```
<template>
  <button @click="showDialog">Show dialog</button>
  <teleport to="body">
    <Dialog ref="dialog"></Dialog>
  </teleport>
</template>
<script>
  import Dialog from './components/dialog'
  export default {
    components: {
      Dialog
    },
    methods: {
      showDialog() {
        this.$refs.dialog.show()
      }
    }
  }
</script>
```

Teleport 组件使用起来非常简单，套在想要在别处渲染的组件或者 DOM 节点的外部，然后通过 to 这个 prop 去指定渲染到的位置，to 可以是一个 DOM 选择器字符串，也可以是一个 DOM 节点。

了解了使用方式，接下来，我们就来分析它的实现原理，看看 Teleport 是如何脱离当前组件渲染子组件的。

### Teleport 实现原理

对于这类内置组件，Vue.js 从编译阶段就做了特殊处理，我们先来看一下前面示例模板编译后的结果：

复制代码

```
import { createVNode as _createVNode, resolveComponent as _resolveComponent, Teleport as _Teleport, openBlock as _openBlock, createBlock as _createBlock } from "vue"
export function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Dialog = _resolveComponent("Dialog")
  return (_openBlock(), _createBlock("template", null, [
    _createVNode("button", { onClick: _ctx.showDialog }, "Show dialog", 8 /* PROPS */, ["onClick"]),
    (_openBlock(), _createBlock(_Teleport, { to: "body" }, [
      _createVNode(_component_Dialog, { ref: "dialog" }, null, 512 /* NEED_PATCH */)
    ]))
  ]))
}
```

可以看到，对于 teleport 标签，它是直接创建了 Teleport 内置组件，我们接下来来看它的实现：

复制代码

```
const Teleport = {
  __isTeleport: true,
  process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized, internals) {
    if (n1 == null) {
      // 创建逻辑
    }
    else {
      // 更新逻辑
    }
  },
  remove(vnode, { r: remove, o: { remove: hostRemove } }) {
    // 删除逻辑
  },
  move: moveTeleport,
  hydrate: hydrateTeleport
}
```

Teleport 组件的实现就是一个对象，对外提供了几个方法。其中 process 方法负责组件的创建和更新逻辑，remove 方法负责组件的删除逻辑，接下来我们就从这三个方面来分析 Teleport 的实现原理。

#### Teleport 组件创建

回顾组件创建的过程，会经历 patch 阶段，我们来回顾它的实现：

复制代码

```
const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, optimized = false) => {
  if (n1 && !isSameVNodeType(n1, n2)) {
    // 如果存在新旧节点, 且新旧节点类型不同，则销毁旧节点
  }
  const { type, shapeFlag } = n2
  switch (type) {
    case Text:
      // 处理文本节点
      break
    case Comment:
      // 处理注释节点
      break
    case Static:
      // 处理静态节点
      break
    case Fragment:
      // 处理 Fragment 元素
      break
    default:
      if (shapeFlag & 1 /* ELEMENT */) {
        // 处理普通 DOM 元素
      }
      else if (shapeFlag & 6 /* COMPONENT */) {
        // 处理组件
      }
      else if (shapeFlag & 64 /* TELEPORT */) {
        // 处理 TELEPORT
        type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized, internals);
      }
      else if (shapeFlag & 128 /* SUSPENSE */) {
        // 处理 SUSPENSE
      }
  }
}
```

可以看到，在 patch 阶段，会判断如果 type 是一个 Teleport 组件，则会执行它的 process 方法，接下来我们来看 process 方法关于 Teleport 组件创建部分的逻辑：

复制代码

```
function process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized, internals) {
  const { mc: mountChildren, pc: patchChildren, pbc: patchBlockChildren, o: { insert, querySelector, createText, createComment } } = internals
  const disabled = isTeleportDisabled(n2.props)
  const { shapeFlag, children } = n2
  if (n1 == null) {
    // 在主视图里插入注释节点或者空白文本节点
    const placeholder = (n2.el = (process.env.NODE_ENV !== 'production')
      ? createComment('teleport start')
      : createText(''))
    const mainAnchor = (n2.anchor = (process.env.NODE_ENV !== 'production')
      ? createComment('teleport end')
      : createText(''))
    insert(placeholder, container, anchor)
    insert(mainAnchor, container, anchor)
    // 获取目标移动的 DOM 节点
    const target = (n2.target = resolveTarget(n2.props, querySelector))
    const targetAnchor = (n2.targetAnchor = createText(''))
    if (target) {
      insert(targetAnchor, target)
    }
    else if ((process.env.NODE_ENV !== 'production')) {
      // 查找不到 target 则报警告
      warn('Invalid Teleport target on mount:', target, `(${typeof target})`)
    }
    const mount = (container, anchor) => {
      if (shapeFlag & 16 /* ARRAY_CHILDREN */) {
        // 挂载子节点
        mountChildren(children, container, anchor, parentComponent, parentSuspense, isSVG, optimized)
      }
    }
    if (disabled) {
      // disabled 情况就在原先的位置挂载
      mount(container, mainAnchor)
    }
    else if (target) {
      // 挂载到 target 的位置
      mount(target, targetAnchor)
    }
  }
}
```

Teleport 组件创建部分主要分为三个步骤，**第一步在主视图里插入注释节点或者空白文本节点**，**第二步获取目标元素节点**，**第三步往目标元素插入 Teleport 组件的子节点**。

我们先来看第一步，会在非生产环境往 Teleport 组件原本的位置插入注释节点，在生产环境插入空白文本节点。在开发环境中，组件的 el 对象指向 teleport start 注释节点，组件的 anchor 对象指向teleport end 注释节点。

接着看第二步，会通过 resolveTarget 方法从 props 中的 to 属性以及 DOM 选择器拿到对应要移动到的目标元素 target。

最后看第三步，会判断 disabled 变量的值，它是在 Teleport 组件中通过 prop 传递的，如果 disabled 为 true，那么子节点仍然挂载到 Teleport 原本视图的位置，如果为 false，那么子节点则挂载到 target 目标元素位置。

至此，我们就已经实现了需求，把 Teleport 包裹的子节点脱离了当前组件，渲染到目标位置，是不是很简单呢？

#### Teleport 组件更新

当然，Teleport 包裹的子节点渲染后并不是一成不变的，当组件发生更新的时候，仍然会执行 patch 逻辑走到 Teleport 的 process 方法，去处理 Teleport 组件的更新，我们来看一下这部分的实现：

复制代码

```
function process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized, internals) {
  const { mc: mountChildren, pc: patchChildren, pbc: patchBlockChildren, o: { insert, querySelector, createText, createComment } } = internals
  const disabled = isTeleportDisabled(n2.props)
  const { shapeFlag, children } = n2
  if (n1 == null) {
    // 创建逻辑
  }
  else {
    n2.el = n1.el
    const mainAnchor = (n2.anchor = n1.anchor)
    const target = (n2.target = n1.target)
    const targetAnchor = (n2.targetAnchor = n1.targetAnchor)
    // 之前是不是 disabled 状态
    const wasDisabled = isTeleportDisabled(n1.props)
    const currentContainer = wasDisabled ? container : target
    const currentAnchor = wasDisabled ? mainAnchor : targetAnchor
    // 更新子节点
    if (n2.dynamicChildren) {
      patchBlockChildren(n1.dynamicChildren, n2.dynamicChildren, currentContainer, parentComponent, parentSuspense, isSVG)
      if (n2.shapeFlag & 16 /* ARRAY_CHILDREN */) {
        const oldChildren = n1.children
        const children = n2.children
        for (let i = 0; i < children.length; i++) {
          if (!children[i].el) {
            children[i].el = oldChildren[i].el
          }
        }
      }
    }
    else if (!optimized) {
      patchChildren(n1, n2, currentContainer, currentAnchor, parentComponent, parentSuspense, isSVG)
    }
    if (disabled) {
      if (!wasDisabled) {
        // enabled -> disabled
        // 把子节点移动回主容器
        moveTeleport(n2, container, mainAnchor, internals, 1 /* TOGGLE */)
      }
    }
    else {
      if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
        // 目标元素改变
        const nextTarget = (n2.target = resolveTarget(n2.props, querySelector))
        if (nextTarget) {
          // 移动到新的目标元素
          moveTeleport(n2, nextTarget, null, internals, 0 /* TARGET_CHANGE */)
        }
        else if ((process.env.NODE_ENV !== 'production')) {
          warn('Invalid Teleport target on update:', target, `(${typeof target})`)
        }
      }
      else if (wasDisabled) {
        // disabled -> enabled
        // 移动到目标元素位置
        moveTeleport(n2, target, targetAnchor, internals, 1 /* TOGGLE */)
      }
    }
  }
}
```

Teleport 组件更新无非就是做几件事情：更新子节点，处理 disabled 属性变化的情况，处理 to 属性变化的情况。

首先，是更新 Teleport 组件的子节点，这里更新分为优化更新和普通的全量比对更新两种情况，之前分析过，就不再赘述了。

接着，是判断 Teleport 组件新节点配置 disabled 属性的情况，如果满足新节点 disabled 为 true，且旧节点的 disabled 为 false 的话，说明我们需要把 Teleport 的子节点从目标元素内部移回到主视图内部了。

如果新节点 disabled 为 false，那么先通过 to 属性是否改变来判断目标元素 target 有没有变化，如果有变化，则把 Teleport 的子节点移动到新的 target 内部；如果目标元素没变化，则判断旧节点的 disabled 是否为 true，如果是则把 Teleport 的子节点从主视图内部移动到目标元素内部了。

#### Teleport 组件移除

前面我们学过，当组件移除的时候会执行 unmount 方法，它的内部会判断如果移除的组件是一个 Teleport 组件，就会执行组件的 remove 方法：

复制代码

```
if (shapeFlag & 64 /* TELEPORT */) {
  vnode.type.remove(vnode, internals);
}
if (doRemove) {
  remove(vnode);
}
```

我们来看一下它的实现：

复制代码

```
function remove(vnode, { r: remove, o: { remove: hostRemove } }) {
  const { shapeFlag, children, anchor } = vnode
  hostRemove(anchor)
  if (shapeFlag & 16 /* ARRAY_CHILDREN */) {
    for (let i = 0; i < children.length; i++) {
      remove(children[i])
    }
  }
}
```

Teleport 的 remove 方法实现很简单，首先通过 hostRemove 移除主视图渲染的锚点 teleport start 注释节点，然后再去遍历 Teleport 的子节点执行 remove 移除。

执行完 Teleport 的 remove 方法，会继续执行 remove 方法移除 Teleport 主视图的元素 teleport end 注释节点，至此，Teleport 组件完成了移除。

### 总结

好的，到这里我们这一节的学习也要结束啦，通过这节课的学习，你应该了解了 Teleport 是如何把内部的子元素渲染到目标元素上，并且对 Teleport 组件是如何创建，更新和移除的有所理解。

最后，给你留一道思考题，作为 Vue.js 的内置组件，它需要像用户自定义组件那样先注册后再使用吗？如果不用又是为什么呢？欢迎你在留言区与我分享。

> 本节课的相关代码在源代码中的位置如下：
> packages/runtime-core/src/components/Teleport.ts
> packages/runtime-core/src/renderer.ts