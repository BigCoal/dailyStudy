上一节课，我们学习了 template 的解析过程，最终拿到了一个 AST 节点对象。这个对象是对模板的完整描述，但是它还不能直接拿来生成代码，因为它的语义化还不够，没有包含和编译优化的相关属性，所以还需要进一步转换。

AST 转换过程非常复杂，有非常多的分支逻辑，为了方便你理解它的核心流程，我精心准备了一个示例，我们只分析示例场景在 AST 转换过程中的相关代码逻辑，不过我希望你在学习完之后，可以举一反三，对示例做一些修改，学习更多场景的代码逻辑。

复制代码

```
<div class="app">
  <hello v-if="flag"></hello>
  <div v-else>
    <p>>hello {{ msg + test }}</p>
    <p>static</p>
    <p>static</p>
  </div>
</div>
```

示例中，我们有普通的 DOM 节点，有组件节点，有 v-bind 指令，有 v-if 指令，有文本节点，也有表达式节点。

对于这个模板，我们通过 parse 生成一个 AST 对象，接下来我们就来分析这个 AST 对象的转换都做了哪些事情。

我们会先通过 getBaseTransformPreset 方法获取节点和指令转换的方法，然后调用 transform 方法做 AST 转换，并且把这些节点和指令的转换方法作为配置的属性参数传入。

复制代码

```
// 获取节点和指令转换的方法
const [nodeTransforms, directiveTransforms] = getBaseTransformPreset()
// AST 转换
transform(ast, extend({}, options, {
  prefixIdentifiers,
  nodeTransforms: [
    ...nodeTransforms,
    ...(options.nodeTransforms || []) // 用户自定义  transforms
  ],
  directiveTransforms: extend({}, directiveTransforms, options.directiveTransforms || {} // 用户自定义 transforms
  )
}))
```

我们先来看一下 getBaseTransformPreset 返回哪些节点和指令的转换方法：

复制代码

```
function getBaseTransformPreset(prefixIdentifiers) {
  return [
    [
      transformOnce,
      transformIf,
      transformFor,
      transformExpression,
      transformSlotOutlet,
      transformElement,
      trackSlotScopes,
      transformText
    ],
    {
      on: transformOn,
      bind: transformBind,
      model: transformModel
    }
  ]
}
```

这里并不需要你进一步去看每个转换函数的实现，只要大致了解有哪些转换函数即可，这些转换函数会在后续执行 transform 的时候调用。

> 注意这里我们只分析在 Node.js 环境下的编译过程。Web 环境的编译结果可能会有一些差别，我们会在后续章节说明。

我们主要来看 transform 函数的实现：

复制代码

```
function transform(root, options) {
  const context = createTransformContext(root, options)
  traverseNode(root, context)
  if (options.hoistStatic) {
    hoistStatic(root, context)
  }
  if (!options.ssr) {
    createRootCodegen(root, context)
  }
  root.helpers = [...context.helpers]
  root.components = [...context.components]
  root.directives = [...context.directives]
  root.imports = [...context.imports]
  root.hoists = context.hoists
  root.temps = context.temps
  root.cached = context.cached
}
```

transform 的核心流程主要有四步：创建 transform 上下文、遍历 AST 节点、静态提升以及创建根代码生成节点。接下来，我们就好好分析一下每一步主要做了什么。

### 创建 transform 上下文

首先，我们来看创建 transform 上下文的过程，其实和 parse 过程一样，在 transform 阶段会创建一个上下文对象，它的实现过程是这样的：

复制代码

```
function createTransformContext(root, { prefixIdentifiers = false, hoistStatic = false, cacheHandlers = false, nodeTransforms = [], directiveTransforms = {}, transformHoist = null, isBuiltInComponent = NOOP, expressionPlugins = [], scopeId = null, ssr = false, onError = defaultOnError }) {
  const context = {
    // 配置
    prefixIdentifiers,
    hoistStatic,
    cacheHandlers,
    nodeTransforms,
    directiveTransforms,
    transformHoist,
    isBuiltInComponent,
    expressionPlugins,
    scopeId,
    ssr,
    onError,
    // 状态数据
    root,
    helpers: new Set(),
    components: new Set(),
    directives: new Set(),
    hoists: [],
    imports: new Set(),
    temps: 0,
    cached: 0,
    identifiers: {},
    scopes: {
      vFor: 0,
      vSlot: 0,
      vPre: 0,
      vOnce: 0
    },
    parent: null,
    currentNode: root,
    childIndex: 0,
    // methods
    helper(name) {
      context.helpers.add(name)
      return name
    },
    helperString(name) {
      return `_${helperNameMap[context.helper(name)]}`
    },
    replaceNode(node) {
      context.parent.children[context.childIndex] = context.currentNode = node
    },
    removeNode(node) {
      const list = context.parent.children
      const removalIndex = node
        ? list.indexOf(node)
        : context.currentNode
          ? context.childIndex
          : -1
      if (!node || node === context.currentNode) {
        // 移除当前节点
        context.currentNode = null
        context.onNodeRemoved()
      }
      else {
        // 移除兄弟节点
        if (context.childIndex > removalIndex) {
          context.childIndex--
          context.onNodeRemoved()
        }
      }
      // 移除节点
      context.parent.children.splice(removalIndex, 1)
    },
    onNodeRemoved: () => { },
    addIdentifiers(exp) {
    },
    removeIdentifiers(exp) {
    },
    hoist(exp) {
      context.hoists.push(exp)
      const identifier = createSimpleExpression(`_hoisted_${context.hoists.length}`, false, exp.loc, true)
      identifier.hoisted = exp
      return identifier
    },
    cache(exp, isVNode = false) {
      return createCacheExpression(++context.cached, exp, isVNode)
    }
  }
  return context
}
```

其实，这个上下文对象 context 维护了 transform 过程的一些配置，比如前面提到的节点和指令的转换函数等；还维护了 transform 过程的一些状态数据，比如当前处理的 AST 节点，当前 AST 节点在子节点中的索引，以及当前 AST 节点的父节点等。此外，context 还包含了在转换过程中可能会调用的一些辅助函数，和一些修改 context 对象的方法。

你现在也没必要去了解它的每一个属性和方法的含义，只需要你大致有一个印象即可，未来分析某个具体场景，再回过头了解它们的实现即可。

创建完上下文对象后，接下来就需要遍历 AST 节点。

### 遍历 AST 节点

遍历 AST 节点的过程很关键，因为核心的转换过程就是在遍历中实现的：

复制代码

```
function traverseNode(node, context) {
  context.currentNode = node
  // 节点转换函数
  const { nodeTransforms } = context
  const exitFns = []
  for (let i = 0; i < nodeTransforms.length; i++) {
    // 有些转换函数会设计一个退出函数，在处理完子节点后执行
    const onExit = nodeTransforms[i](node, context)
    if (onExit) {
      if (isArray(onExit)) {
        exitFns.push(...onExit)
      }
      else {
        exitFns.push(onExit)
      }
    }
    if (!context.currentNode) {
      // 节点被移除
      return
    }
    else {
      // 因为在转换的过程中节点可能被替换，恢复到之前的节点
      node = context.currentNode
    }
  }
  switch (node.type) {
    case 3 /* COMMENT */:
      if (!context.ssr) {
        // 需要导入 createComment 辅助函数
        context.helper(CREATE_COMMENT)
      }
      break
    case 5 /* INTERPOLATION */:
      // 需要导入 toString 辅助函数
      if (!context.ssr) {
        context.helper(TO_DISPLAY_STRING)
      }
      break
    case 9 /* IF */:
      // 递归遍历每个分支节点
      for (let i = 0; i < node.branches.length; i++) {
        traverseNode(node.branches[i], context)
      }
      break
    case 10 /* IF_BRANCH */:
    case 11 /* FOR */:
    case 1 /* ELEMENT */:
    case 0 /* ROOT */:
      // 遍历子节点
      traverseChildren(node, context)
      break
  }
  // 执行转换函数返回的退出函数
  let i = exitFns.length
  while (i--) {
    exitFns[i]()
  }
}
```

这里，traverseNode 函数的基本思路就是递归遍历 AST 节点，针对每个节点执行一系列的转换函数，有些转换函数还会设计一个退出函数，当你执行转换函数后，它会返回一个新函数，然后在你处理完子节点后再执行这些退出函数，这是因为有些逻辑的处理需要依赖子节点的处理结果才能继续执行。

Vue.js 内部大概内置了八种转换函数，分别处理指令、表达式、元素节点、文本节点等不同的特性。限于篇幅，我不会介绍所有转换函数，感兴趣的同学可以后续自行分析。

下面我会介绍四种类型的转换函数，并结合前面的示例来分析。

#### Element 节点转换函数

首先，我们来看一下 Element 节点转换函数的实现：

复制代码

```
const transformElement = (node, context) => {
  if (!(node.type === 1 /* ELEMENT */ &&
    (node.tagType === 0 /* ELEMENT */ ||
      node.tagType === 1 /* COMPONENT */))) {
    return
  }
  // 返回退出函数，在所有子表达式处理并合并后执行
  return function postTransformElement() {
    // 转换的目标是创建一个实现 VNodeCall 接口的代码生成节点
    const { tag, props } = node
    const isComponent = node.tagType === 1 /* COMPONENT */
    const vnodeTag = isComponent
      ? resolveComponentType(node, context)
      : `"${tag}"`
    const isDynamicComponent = isObject(vnodeTag) && vnodeTag.callee === RESOLVE_DYNAMIC_COMPONENT
    // 属性
    let vnodeProps
    // 子节点
    let vnodeChildren
    // 标记更新的类型标识，用于运行时优化
    let vnodePatchFlag
    let patchFlag = 0
    // 动态绑定的属性
    let vnodeDynamicProps
    let dynamicPropNames
    let vnodeDirectives
    // 动态组件、svg、foreignObject 标签以及动态绑定 key prop 的节点都被视作一个 Block
    let shouldUseBlock =
      isDynamicComponent ||
      (!isComponent &&
        (tag === 'svg' ||
          tag === 'foreignObject' ||
          findProp(node, 'key', true)))
    // 处理 props
    if (props.length > 0) {
      const propsBuildResult = buildProps(node, context)
      vnodeProps = propsBuildResult.props
      patchFlag = propsBuildResult.patchFlag
      dynamicPropNames = propsBuildResult.dynamicPropNames
      const directives = propsBuildResult.directives
      vnodeDirectives =
        directives && directives.length
          ? createArrayExpression(directives.map(dir => buildDirectiveArgs(dir, context)))
          : undefined
    }
    // 处理 children
    if (node.children.length > 0) {
      if (vnodeTag === KEEP_ALIVE) {
        // 把 KeepAlive 看做是一个 Block，这样可以避免它的子节点的动态节点被父 Block 收集
        shouldUseBlock = true
        // 2. 确保它始终更新
        patchFlag |= 1024 /* DYNAMIC_SLOTS */
        if ((process.env.NODE_ENV !== 'production') && node.children.length > 1) {
          context.onError(createCompilerError(42 /* X_KEEP_ALIVE_INVALID_CHILDREN */, {
            start: node.children[0].loc.start,
            end: node.children[node.children.length - 1].loc.end,
            source: ''
          }))
        }
      }
      const shouldBuildAsSlots = isComponent &&
        // Teleport不是一个真正的组件，它有专门的运行时处理
        vnodeTag !== TELEPORT &&
        vnodeTag !== KEEP_ALIVE
      if (shouldBuildAsSlots) {
        // 组件有 children，则处理插槽
        const { slots, hasDynamicSlots } = buildSlots(node, context)
        vnodeChildren = slots
        if (hasDynamicSlots) {
          patchFlag |= 1024 /* DYNAMIC_SLOTS */
        }
      }
      else if (node.children.length === 1 && vnodeTag !== TELEPORT) {
        const child = node.children[0]
        const type = child.type
        const hasDynamicTextChild = type === 5 /* INTERPOLATION */ ||
          type === 8 /* COMPOUND_EXPRESSION */
        if (hasDynamicTextChild && !getStaticType(child)) {
          patchFlag |= 1 /* TEXT */
        }
        // 如果只是一个普通文本节点、插值或者表达式，直接把节点赋值给 vnodeChildren
        if (hasDynamicTextChild || type === 2 /* TEXT */) {
          vnodeChildren = child
        }
        else {
          vnodeChildren = node.children
        }
      }
      else {
        vnodeChildren = node.children
      }
    }
    // 处理 patchFlag 和 dynamicPropNames
    if (patchFlag !== 0) {
      if ((process.env.NODE_ENV !== 'production')) {
        if (patchFlag < 0) {
          vnodePatchFlag = patchFlag + ` /* ${PatchFlagNames[patchFlag]} */`
        }
        else {
          // 获取 flag 对应的名字，生成注释，方便理解生成代码对应节点的 pathFlag
          const flagNames = Object.keys(PatchFlagNames)
            .map(Number)
            .filter(n => n > 0 && patchFlag & n)
            .map(n => PatchFlagNames[n])
            .join(`, `)
          vnodePatchFlag = patchFlag + ` /* ${flagNames} */`
        }
      }
      else {
        vnodePatchFlag = String(patchFlag)
      }
      if (dynamicPropNames && dynamicPropNames.length) {
        vnodeDynamicProps = stringifyDynamicPropNames(dynamicPropNames)
      }
    }
    node.codegenNode = createVNodeCall(context, vnodeTag, vnodeProps, vnodeChildren, vnodePatchFlag, vnodeDynamicProps, vnodeDirectives, !!shouldUseBlock, false /* disableTracking */, node.loc)
  }
}
```

可以看到，只有当 AST 节点是组件或者普通元素节点时，才会返回一个退出函数，而且它会在该节点的子节点逻辑处理完毕后执行。

分析这个退出函数前，我们需要知道节点函数的转换目标，即创建一个实现 VNodeCall 接口的代码生成节点，也就是说，生成这个代码生成节点后，后续的代码生成阶段可以根据这个节点对象生成目标代码。

知道了这个目标，我们再去理解 transformElement 函数的实现就不难了。

首先，**判断这个节点是不是一个 Block 节点**。

为了运行时的更新优化，Vue.js 3.0 设计了一个 Block tree 的概念。Block tree 是一个将模版基于动态节点指令切割的嵌套区块，每个区块只需要以一个 Array 来追踪自身包含的动态节点。借助 Block tree，Vue.js 将 vnode 更新性能由与模版整体大小相关提升为与动态内容的数量相关，极大优化了 diff 的效率，模板的动静比越大，这个优化就会越明显。

因此在编译阶段，我们需要找出哪些节点可以构成一个 Block，其中动态组件、svg、foreignObject 标签以及动态绑定的 prop 的节点都被视作一个 Block。

其次，**是处理节点的 props**。

这个过程主要是从 AST 节点的 props 对象中进一步解析出指令 vnodeDirectives、动态属性 dynamicPropNames，以及更新标识 patchFlag。patchFlag 主要用于标识节点更新的类型，在组件更新的优化中会用到，我们在后续章节会详细讲。

接着，**是处理节点的 children**。

对于一个组件节点而言，如果它有子节点，则说明是组件的插槽，另外还会有对一些内置组件比如 KeepAlive、Teleport 的处理逻辑。

对于一个普通元素节点，我们通常直接拿节点的 children 属性给 vnodeChildren 即可，但有一种特殊情况，**如果节点只有一个子节点**，**并且是一个普通文本节点**、**插值或者表达式**，**那么直接把节点赋值给 vnodeChildren**。

然后，**会对前面解析 props 求得的 patchFlag 和 dynamicPropNames 做进一步处理**。

在这个过程中，我们会根据 patchFlag 的值从 PatchFlagNames 中获取 flag 对应的名字，从而生成注释，因为 patchFlag 本身就是一个个数字，通过名字注释的方式，我们就可以一眼从最终生成的代码中了解到 patchFlag 代表的含义。

另外，我们还会把数组 dynamicPropNames 转化生成 vnodeDynamicProps 字符串，便于后续对节点生成代码逻辑的处理。

最后，**通过 createVNodeCall 创建了实现 VNodeCall 接口的代码生成节点**，我们来看它的实现：

复制代码

```
function createVNodeCall(context, tag, props, children, patchFlag, dynamicProps, directives, isBlock = false, disableTracking = false, loc = locStub) {
  if (context) {
    if (isBlock) {
      context.helper(OPEN_BLOCK)
      context.helper(CREATE_BLOCK)
    }
    else {
      context.helper(CREATE_VNODE)
    }
    if (directives) {
      context.helper(WITH_DIRECTIVES) 
    }
  }
  return {
    type: 13 /* VNODE_CALL */,
    tag,
    props,
    children,
    patchFlag,
    dynamicProps,
    directives,
    isBlock,
    disableTracking,
    loc
  }
}
```

createVNodeCall 的实现很简单，它最后返回了一个对象，包含了传入的参数数据。这里要注意 context.helper 函数的调用，它会把一些 Symbol 对象添加到 context.helpers 数组中，目的是为了后续代码生成阶段，生成一些辅助代码。

对于我们示例中的根节点：

复制代码

```
<div class="app">
  // ...
</div>
```

它转换后生成的 node.codegenNode ：

复制代码

```
{
  "children": [
    // 子节点
  ],
  "directives": undefined,
  "dynamicProps": undefined,
  "isBlock": false,
  "isForBlock": false,
  "patchFlag": undefined,
  "props": {
    // 属性相关
  },
  "tag": "div",
  "type": 13
}
```

这个 codegenNode 相比之前的 AST 节点对象，多了很多和编译优化相关的属性，它们会在代码生成阶段会起到非常重要作用，在后续的章节你就可以深入了解到。

#### 表达式节点转换函数

接下来，我们来看一下表达式节点转换函数的实现：

复制代码

```
const transformExpression = (node, context) => {
  if (node.type === 5 /* INTERPOLATION */) {
    // 处理插值中的动态表达式
    node.content = processExpression(node.content, context)
  }
  else if (node.type === 1 /* ELEMENT */) {
    // 处理元素指令中的动态表达式
    for (let i = 0; i < node.props.length; i++) {
      const dir = node.props[i]
      // v-on 和 v-for 不处理，因为它们都有各自的处理逻辑
      if (dir.type === 7 /* DIRECTIVE */ && dir.name !== 'for') {
        const exp = dir.exp
        const arg = dir.arg
        if (exp &&
          exp.type === 4 /* SIMPLE_EXPRESSION */ &&
          !(dir.name === 'on' && arg)) {
          dir.exp = processExpression(exp, context, dir.name === 'slot')
        }
        if (arg && arg.type === 4 /* SIMPLE_EXPRESSION */ && !arg.isStatic) {
          dir.arg = processExpression(arg, context)
        }
      }
    }
  }
}
```

由于表达式本身不会再有子节点，所以它也不需要退出函数，直接在进入函数时做转换处理即可。

需要注意的是，**只有在 Node.js 环境下的编译或者是 Web 端的非生产环境下才会执行 transformExpression**，原因我稍后会告诉你。

transformExpression 主要做的事情就是转换插值和元素指令中的动态表达式，把简单的表达式对象转换成复合表达式对象，内部主要是通过 processExpression 函数完成。举个例子，比如这个模板：`{{ msg + test }}`，它执行 parse 后生成的表达式节点 node.content 值为一个简单的表达式对象：

复制代码

```
{
  "type": 4,
  "isStatic": false,
  "isConstant": false,
  "content": "msg + test"
}
```

经过 processExpression 处理后，node.content 的值变成了一个复合表达式对象：

复制代码

```
{
  "type": 8,
  "children": [
    {
      "type": 4,
      "isConstant": false,
      "content": "_ctx.msg",
      "isStatic": false
    },
    " + ",
    {
      "type": 4,
      "isConstant": false,
      "content": "_ctx.test",
      "isStatic": false
    }
  ],
  "identifiers": []
}
```

这里，我们重点关注对象中的 children 属性，它是一个长度为 3 的数组，其实就是把表达式`msg + test`拆成了三部分，其中变量 msg 和 test 对应都加上了前缀 _ctx。

那么为什么需要加这个前缀呢？

我们就要想到模板中引用的的 msg 和 test 对象最终都是在组件实例中访问的，但为了书写模板方便，Vue.js 并没有让我们在模板中手动加组件实例的前缀，例如：`{{ this.msg + this.test }}`，这样写起来就会不够方便，但如果用 JSX 写的话，通常要手动写 this。

你可能会有疑问，为什么 Vue.js 2.x 编译的结果没有 _ctx 前缀呢？这是因为 Vue.js 2.x 的编译结果使用了”黑魔法“ with，比如上述模板，在 Vue.js 2.x 最终编译的结果：`with(this){return _s(msg + test)}`。

它利用 with 的特性动态去 this 中查找 msg 和 test 属性，所以不需要手动加前缀。

但是，Vue.js 3.0 在 Node.js 端的编译结果舍弃了 with，它会在 processExpression 过程中对表达式动态分析，给该加前缀的地方加上前缀。

processExpression 的详细实现我们不会分析，但你需要知道，这个过程肯定有一定的成本，因为它内部依赖了 @babel/parser 库去解析表达式生成 AST 节点，并依赖了 estree-walker 库去遍历这个 AST 节点，然后对节点分析去判断是否需要加前缀，接着对 AST 节点修改，最终转换生成新的表达式对象。

@babel/parser 这个库通常是在 Node.js 端用的，而且这库本身体积非常大，如果打包进 Vue.js 的话会让包体积膨胀 4 倍，所以我们并不会在生产环境的 Web 端引入这个库，Web 端生产环境下的运行时编译最终仍然会用 with 的方式。

因为用 with 的话就完全不需要对表达式做转换了，这也就回答我前面的问题：只有在 Node.js 环境下的编译或者是 Web 端的非生产环境下才会执行 transformExpression。

这部分内容比较多，所以本课时的内容就先到这。下节课，我们接着分析遍历 AST 节点中的 Text 节点的转换函数。

> **本节课的相关代码在源代码中的位置如下：**
> packages/compiler-core/src/compile.ts
> packages/compiler-core/src/transform.ts
> packages/compiler-core/src/ast.ts
> packages/compiler-core/src/transforms/transformElement.ts
> packages/compiler-core/src/transforms/transformExpression.ts