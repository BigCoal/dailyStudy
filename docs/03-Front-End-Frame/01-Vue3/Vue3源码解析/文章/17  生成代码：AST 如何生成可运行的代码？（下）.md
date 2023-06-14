上节课，我们已经知道了在 AST 转换后，会执行 generate 函数生成代码，而 generate 主要做五件事情：创建代码生成上下文，生成预设代码，生成渲染函数，生成资源声明代码，以及生成创建 VNode 树的表达式。这节课我们继续分析，来看生成创建 VNode 树的表达式的过程。

### 生成创建 VNode 树的表达式

我们先来看它的实现：

复制代码

```
// 生成创建 VNode 树的表达式
if (ast.codegenNode) {
  genNode(ast.codegenNode, context);
}
else {
  push(`null`);
}
```

前面我们在转换过程中给根节点添加了 codegenNode，所以接下来就是通过 genNode 生成创建 VNode 树的表达式，我们来看它的实现：

复制代码

```
function genNode(node, context) {
  if (shared.isString(node)) {
    context.push(node)
    return
  }
  if (shared.isSymbol(node)) {
    context.push(context.helper(node))
    return
  }
  switch (node.type) {
    case 1 /* ELEMENT */:
    case 9 /* IF */:
    case 11 /* FOR */:
      genNode(node.codegenNode, context)
      break
    case 2 /* TEXT */:
      genText(node, context)
      break
    case 4 /* SIMPLE_EXPRESSION */:
      genExpression(node, context)
      break
    case 5 /* INTERPOLATION */:
      genInterpolation(node, context)
      break
    case 12 /* TEXT_CALL */:
      genNode(node.codegenNode, context)
      break
    case 8 /* COMPOUND_EXPRESSION */:
      genCompoundExpression(node, context)
      break
    case 3 /* COMMENT */:
      break
    case 13 /* VNODE_CALL */:
      genVNodeCall(node, context)
      break
    case 14 /* JS_CALL_EXPRESSION */:
      genCallExpression(node, context)
      break
    case 15 /* JS_OBJECT_EXPRESSION */:
      genObjectExpression(node, context)
      break
    case 17 /* JS_ARRAY_EXPRESSION */:
      genArrayExpression(node, context)
      break
    case 18 /* JS_FUNCTION_EXPRESSION */:
      genFunctionExpression(node, context)
      break
    case 19 /* JS_CONDITIONAL_EXPRESSION */:
      genConditionalExpression(node, context)
      break
    case 20 /* JS_CACHE_EXPRESSION */:
      genCacheExpression(node, context)
      break
    // SSR only types
    case 21 /* JS_BLOCK_STATEMENT */:
      genNodeList(node.body, context, true, false)
      break
    case 22 /* JS_TEMPLATE_LITERAL */:
      genTemplateLiteral(node, context)
      break
    case 23 /* JS_IF_STATEMENT */:
      genIfStatement(node, context)
      break
    case 24 /* JS_ASSIGNMENT_EXPRESSION */:
      genAssignmentExpression(node, context)
      break
    case 25 /* JS_SEQUENCE_EXPRESSION */:
      genSequenceExpression(node, context)
      break
    case 26 /* JS_RETURN_STATEMENT */:
      genReturnStatement(node, context)
      break
  }
}
```

genNode 主要的思路就是根据不同的节点类型，生成不同的代码，这里有十几种情况，我就不全部讲一遍了，仍然是以我们的示例为主，来分析它们的实现，没有分析到的分支我的建议是大致了解即可，未来如果遇到相关的场景，你再来详细看它们的实现也不迟。

现在，我们来看一下根节点 codegenNode 的值：

复制代码

```
{
  type: 13, /* VNODE_CALL */
  tag: "div",
  children: [
    // 子节点
  ],
  props: {
    // 属性表达式节点
  },
  directives: undefined,
  disableTracking: false,
  dynamicProps: undefined,
  isBlock: true,
  patchFlag: undefined
}
```

由于根节点的 codegenNode 类型是 13，也就是一个 VNodeCall，所以会执行 genVNodeCall 生成创建 VNode 节点的表达式代码，它的实现如下 :

复制代码

```
function genVNodeCall(node, context) {
  const { push, helper, pure } = context
  const { tag, props, children, patchFlag, dynamicProps, directives, isBlock, disableTracking } = node
  if (directives) {
    push(helper(WITH_DIRECTIVES) + `(`)
  }
  if (isBlock) {
    push(`(${helper(OPEN_BLOCK)}(${disableTracking ? `true` : ``}), `)
  }
  if (pure) {
    push(PURE_ANNOTATION)
  }
  push(helper(isBlock ? CREATE_BLOCK : CREATE_VNODE) + `(`, node)
  genNodeList(genNullableArgs([tag, props, children, patchFlag, dynamicProps]), context)
  push(`)`)
  if (isBlock) {
    push(`)`)
  }
  if (directives) {
    push(`, `)
    genNode(directives, context)
    push(`)`)
  }
}
```

根据我们的示例来看，directives 没定义，不用处理，isBlock 为 true，disableTracking 为 false，那么生成如下打开 Block 的代码：

复制代码

```
import { resolveComponent as _resolveComponent, createVNode as _createVNode, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createBlock as _createBlock } from "vue"
const _hoisted_1 = { class: "app" }
const _hoisted_2 = { key: 1 }
const _hoisted_3 = /*#__PURE__*/_createVNode("p", null, "static", -1 /* HOISTED */)
const _hoisted_4 = /*#__PURE__*/_createVNode("p", null, "static", -1 /* HOISTED */)
export function render(_ctx, _cache) {
  const _component_hello = _resolveComponent("hello")
  return (_openBlock()
```

接着往下看，会判断 pure 是否为 true，如果是则生成相关的注释，虽然这里的 pure 为 false，但是之前我们在生成静态提升变量相关代码的时候 pure 为 true，所以生成了注释代码 /**#\**PURE\****/。

接下来会判断 isBlock，如果它为 true 则在生成创建 Block 相关代码，如果它为 false，则生成创建 VNode 的相关代码。

因为这里 isBlock 为 true，所以生成如下代码：

复制代码

```
import { resolveComponent as _resolveComponent, createVNode as _createVNode, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createBlock as _createBlock } from "vue"
const _hoisted_1 = { class: "app" }
const _hoisted_2 = { key: 1 }
const _hoisted_3 = /*#__PURE__*/_createVNode("p", null, "static", -1 /* HOISTED */)
const _hoisted_4 = /*#__PURE__*/_createVNode("p", null, "static", -1 /* HOISTED */)
export function render(_ctx, _cache) {
  const _component_hello = _resolveComponent("hello")
  return (_openBlock(), _createBlock(
```

生成了一个_createBlock 的函数调用后，下面就需要生成函数的参数，通过如下代码生成：

复制代码

```
genNodeList(genNullableArgs([tag, props, children, patchFlag, dynamicProps]), context)
```

依据代码的执行顺序，我们先来看 genNullableArgs 的实现：

复制代码

```
function genNullableArgs(args) {
  let i = args.length
  while (i--) {
    if (args[i] != null)
      break
  }
  return args.slice(0, i + 1).map(arg => arg || `null`)
}
```

这个方法很简单，就是倒序遍历参数数组，找到第一个不为空的参数，然后返回该参数前面的所有参数构成的新数组。

genNullableArgs 传入的参数数组依次是 tag、props、children、patchFlag 和 dynamicProps，对于我们的示例而言，此时 patchFlag 和 dynamicProps 为 undefined，所以 genNullableArgs 返回的是一个`[tag, props, children]`这样的数组。

其实这是很好理解的，对于一个 vnode 节点而言，构成它的主要几个部分就是节点的标签 tag，属性 props 以及子节点 children，我们的目标就是生成类似下面的代码：`_createBlock(tag, props, children)`。

因此接下来，我们再通过 genNodeList 来生成参数相关的代码，来看一下它的实现：

复制代码

```
function genNodeList(nodes, context, multilines = false, comma = true) {
  const { push, newline } = context
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    if (shared.isString(node)) {
      push(node)
    }
    else if (shared.isArray(node)) {
      genNodeListAsArray(node, context)
    }
    else {
      genNode(node, context)
    }
    if (i < nodes.length - 1) {
      if (multilines) {
        comma && push(',')
        newline()
      }
      else {
        comma && push(', ')
      }
    }
  }
}
```

genNodeList 就是通过遍历 nodes，拿到每一个 node，然后判断 node 的类型，如果 node 是字符串，就直接添加到代码中；如果是一个数组，则执行 genNodeListAsArray 生成数组形式的代码，否则是一个对象，则递归执行 genNode 生成节点代码。

我们还是根据示例代码走完这个流程，此时 nodes 的值如下：

复制代码

```
['div', {
  type: 4, /* SIMPLE_EXPRESSION */
  content: '_hoisted_1',
  isConstant: true,
  isStatic: false,
  hoisted: {
    // 对象表达式节点
    },
  },
  [
    {
      type: 9, /* IF */
      branches: [
        // v-if 解析出的 2 个分支对象
      ],
      codegenNode: {
        // 代码生成节点
      }
    }
  ]
]
```

接下来我们依据 nodes 的值继续生成代码，首先 nodes 第一个元素的值是 'div' 字符串，根据前面的逻辑，直接把字符串添加到代码上即可，由于 multilines 为 false，comma 为 true，因此生成如下代码：

复制代码

```
import { resolveComponent as _resolveComponent, createVNode as _createVNode, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createBlock as _createBlock } from "vue"
const _hoisted_1 = { class: "app" }
const _hoisted_2 = { key: 1 }
const _hoisted_3 = /*#__PURE__*/_createVNode("p", null, "static", -1 /* HOISTED */)
const _hoisted_4 = /*#__PURE__*/_createVNode("p", null, "static", -1 /* HOISTED */)
export function render(_ctx, _cache) {
  const _component_hello = _resolveComponent("hello")
  return (_openBlock(), _createBlock("div",
```

接下来看 nodes 第二个元素，它代表的是 vnode 的属性 props，是一个简单的对象表达式，就会递归执行 genNode，进一步执行 genExpression，来看一下它的实现：

复制代码

```
function genExpression(node, context) {
  const { content, isStatic } = node
  context.push(isStatic ? JSON.stringify(content) : content, node)
}
```

这里 genExpression 非常简单，就是往代码中添加 content 的内容。此时 node 中的 content 值是 _hoisted_1，再回到 genNodeList，由于 multilines 为 false，comma 为 true，因此生成如下代码：

复制代码

```
import { resolveComponent as _resolveComponent, createVNode as _createVNode, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createBlock as _createBlock } from "vue"
const _hoisted_1 = { class: "app" }
const _hoisted_2 = { key: 1 }
const _hoisted_3 = /*#__PURE__*/_createVNode("p", null, "static", -1 /* HOISTED */)
const _hoisted_4 = /*#__PURE__*/_createVNode("p", null, "static", -1 /* HOISTED */)
export function render(_ctx, _cache) {
  const _component_hello = _resolveComponent("hello")
  return (_openBlock(), _createBlock("div", _hoisted_1,
```

接下来我们再看 nodes 第三个元素，它代表的是子节点 chidren，是一个数组，那么会执行 genNodeListAsArray，来看它的实现：

复制代码

```
function genNodeListAsArray(nodes, context) {
  const multilines = nodes.length > 3 || nodes.some(n => isArray(n) || !isText$1(n))
  context.push(`[`)
  multilines && context.indent()
  genNodeList(nodes, context, multilines);
  multilines && context.deindent()
  context.push(`]`)
}
```

genNodeListAsArray 主要是把一个 node 列表生成一个类似数组形式的代码，所以前后会添加中括号，并且判断是否要生成多行代码，如果是多行，前后还需要加减代码的缩进，而中间部分的代码，则继续递归调用 genNodeList 生成。

那么针对我们的示例，此时参数 nodes 的值如下：

复制代码

```
[
  {
    type: 9, /* IF */
    branches: [
      // v-if 解析出的 2 个分支对象
    ],
    codegenNode: {
      // 代码生成节点
    }
  }
]
```

它是一个长度为 1 的数组，但是这个数组元素的类型是一个对象，所以 multilines 为 true。那么在执行 genNodeList 之前，生成的代码是这样的：

复制代码

```
import { resolveComponent as _resolveComponent, createVNode as _createVNode, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createBlock as _createBlock } from "vue"
const _hoisted_1 = { class: "app" }
const _hoisted_2 = { key: 1 }
const _hoisted_3 = /*#__PURE__*/_createVNode("p", null, "static", -1 /* HOISTED */)
const _hoisted_4 = /*#__PURE__*/_createVNode("p", null, "static", -1 /* HOISTED */)
export function render(_ctx, _cache) {
  const _component_hello = _resolveComponent("hello")
  return (_openBlock(), _createBlock("div", _hoisted_1, [
```

接下来就是递归执行 genNodeList 的过程，由于 nodes 数组只有一个对象类型的元素，则执行 genNode，并且这个对象的类型是 IF 表达式，回顾 genNode 的实现，此时会执行到`genNode(node.codegenNode, context)`，也就是取节点的 codegenNode，进一步执行 genNode，我们来看一下这个 codegenNode：

复制代码

```
{
  type: 19, /* JS_CONDITIONAL_EXPRESSION */
  consequent: {
    // 主逻辑
    type: 13, /* VNODE_CALL */
    tag: "_component_hello",
    children: undefined,
    props: {
       // 属性表达式节点
    },
    directives: undefined,
    disableTracking: false,
    dynamicProps: undefined,
    isBlock: false,
    patchFlag: undefined
  },
  alternate: {
    // 备选逻辑
    type: 13, /* VNODE_CALL */
    tag: "div",
    children: [
      // 长度为 3 的子节点
    ],
    props: {
       // 属性表达式节点
    },
    directives: undefined,
    disableTracking: false,
    dynamicProps: undefined,
    isBlock: true,
    patchFlag: undefined
  },
  test: {
    // 逻辑测试
    type: 4, /* SIMPLE_EXPRESSION */
    content: "_ctx.flag",
    isConstant: false,
    isStatic: false
  },
  newline: true
}
```

它是一个条件表达式节点，它主要包括 3 个重要的属性，其中 test 表示逻辑测试，它是一个表达式节点，consequent 表示主逻辑，它是一个 vnode 调用节点，alternate 表示备选逻辑，它也是一个 vnode 调用节点。

其实条件表达式节点要生成代码就是一个条件表达式，用伪代码表示是：`test ? consequent : alternate`。

genNode 遇到条件表达式节点会执行 genConditionalExpression，我们来看一下它的实现：

复制代码

```
function genConditionalExpression(node, context) {
  const { test, consequent, alternate, newline: needNewline } = node
  const { push, indent, deindent, newline } = context
  // 生成条件表达式
  if (test.type === 4 /* SIMPLE_EXPRESSION */) {
    const needsParens = !isSimpleIdentifier(test.content)
    needsParens && push(`(`)
    genExpression(test, context)
    needsParens && push(`)`)
  }
  else {
    push(`(`)
    genNode(test, context)
    push(`)`)
  }
  // 换行加缩进
  needNewline && indent()
  context.indentLevel++
  needNewline || push(` `)
  // 生成主逻辑代码
  push(`? `)
  genNode(consequent, context)
  context.indentLevel--
  needNewline && newline()
  needNewline || push(` `)
  // 生成备选逻辑代码
  push(`: `)
  const isNested = alternate.type === 19 /* JS_CONDITIONAL_EXPRESSION */
  if (!isNested) {
    context.indentLevel++
  }
  genNode(alternate, context)
  if (!isNested) {
    context.indentLevel--
  }
  needNewline && deindent(true /* without newline */)
}
```

genConditionalExpression 的主要目的就是生成条件表达式代码，所以首先它会生成逻辑测试的代码。对于示例，我们这里是一个简单表达式节点，所以生成的代码是这样的：

复制代码

```
import { resolveComponent as _resolveComponent, createVNode as _createVNode, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createBlock as _createBlock } from "vue"
const _hoisted_1 = { class: "app" }
const _hoisted_2 = { key: 1 }
const _hoisted_3 = /*#__PURE__*/_createVNode("p", null, "static", -1 /* HOISTED */)
const _hoisted_4 = /*#__PURE__*/_createVNode("p", null, "static", -1 /* HOISTED */)
export function render(_ctx, _cache) {
  const _component_hello = _resolveComponent("hello")
  return (_openBlock(), _createBlock("div", _hoisted_1, [
    (_ctx.flag)
```

接下来就是生成一些换行和缩进，紧接着生成主逻辑代码，也就是把 consequent 这个 vnode 调用节点通过 genNode 转换生成代码，这又是一个递归过程，其中的细节我就不再赘述了，执行完后会生成如下代码：

复制代码

```
import { resolveComponent as _resolveComponent, createVNode as _createVNode, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createBlock as _createBlock } from "vue"
const _hoisted_1 = { class: "app" }
const _hoisted_2 = { key: 1 }
const _hoisted_3 = /*#__PURE__*/_createVNode("p", null, "static", -1 /* HOISTED */)
const _hoisted_4 = /*#__PURE__*/_createVNode("p", null, "static", -1 /* HOISTED */)
export function render(_ctx, _cache) {
  const _component_hello = _resolveComponent("hello")
  return (_openBlock(), _createBlock("div", _hoisted_1, [
    (_ctx.flag)
      ? _createVNode(_component_hello, { key: 0 })
```

接下来就是生成备选逻辑的代码，即把 alternate 这个 vnode 调用节点通过 genNode 转换生成代码，同样内部的细节我就不赘述了，感兴趣同学可以自行调试。

需要注意的是，**alternate 对应的节点的 isBlock 属性是 true**，**所以会生成创建 Block 相关的代码**，最终生成的代码如下：

复制代码

```
import { resolveComponent as _resolveComponent, createVNode as _createVNode, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createBlock as _createBlock } from "vue"
const _hoisted_1 = { class: "app" }
const _hoisted_2 = { key: 1 }
const _hoisted_3 = /*#__PURE__*/_createVNode("p", null, "static", -1 /* HOISTED */)
const _hoisted_4 = /*#__PURE__*/_createVNode("p", null, "static", -1 /* HOISTED */)
export function render(_ctx, _cache) {
  const _component_hello = _resolveComponent("hello")
  return (_openBlock(), _createBlock("div", _hoisted_1, [
    (_ctx.flag)
      ? _createVNode(_component_hello, { key: 0 })
      : (_openBlock(), _createBlock("div", _hoisted_2, [
          _createVNode("p", null, ">hello " + _toDisplayString(_ctx.msg + _ctx.test), 1 /* TEXT */),
          _hoisted_3,
          _hoisted_4
        ]))
```

接下来我们回到 genNodeListAsArray 函数，处理完 children，那么下面就会减少缩进，并添加闭合的中括号，就会生成如下的代码：

复制代码

```
import { resolveComponent as _resolveComponent, createVNode as _createVNode, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createBlock as _createBlock } from "vue"
const _hoisted_1 = { class: "app" }
const _hoisted_2 = { key: 1 }
const _hoisted_3 = /*#__PURE__*/_createVNode("p", null, "static", -1 /* HOISTED */)
const _hoisted_4 = /*#__PURE__*/_createVNode("p", null, "static", -1 /* HOISTED */)
export function render(_ctx, _cache) {
  const _component_hello = _resolveComponent("hello")
  return (_openBlock(), _createBlock("div", _hoisted_1, [
    (_ctx.flag)
      ? _createVNode(_component_hello, { key: 0 })
      : (_openBlock(), _createBlock("div", _hoisted_2, [
          _createVNode("p", null, ">hello " + _toDisplayString(_ctx.msg + _ctx.test), 1 /* TEXT */),
          _hoisted_3,
          _hoisted_4
        ]))
  ]
```

genNodeListAsArray 处理完子节点后，回到 genNodeList，发现所有 nodes 也处理完了，则回到 genVNodeCall 函数，接下来的逻辑就是补齐函数调用的右括号，此时生成的代码是这样的：

复制代码

```
import { resolveComponent as _resolveComponent, createVNode as _createVNode, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createBlock as _createBlock } from "vue"
const _hoisted_1 = { class: "app" }
const _hoisted_2 = { key: 1 }
const _hoisted_3 = /*#__PURE__*/_createVNode("p", null, "static", -1 /* HOISTED */)
const _hoisted_4 = /*#__PURE__*/_createVNode("p", null, "static", -1 /* HOISTED */)
export function render(_ctx, _cache) {
  const _component_hello = _resolveComponent("hello")
  return (_openBlock(), _createBlock("div", _hoisted_1, [
    (_ctx.flag)
      ? _createVNode(_component_hello, { key: 0 })
      : (_openBlock(), _createBlock("div", _hoisted_2, [
          _createVNode("p", null, ">hello " + _toDisplayString(_ctx.msg + _ctx.test), 1 /* TEXT */),
          _hoisted_3,
          _hoisted_4
        ]))
  ]))
```

那么至此，根节点 vnode 树的表达式就创建好了。我们再回到 generate 函数，接下来就需要添加右括号 “}” 来闭合渲染函数，最终生成如下代码：

复制代码

```
import { resolveComponent as _resolveComponent, createVNode as _createVNode, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createBlock as _createBlock } from "vue"
const _hoisted_1 = { class: "app" }
const _hoisted_2 = { key: 1 }
const _hoisted_3 = /*#__PURE__*/_createVNode("p", null, "static", -1 /* HOISTED */)
const _hoisted_4 = /*#__PURE__*/_createVNode("p", null, "static", -1 /* HOISTED */)
export function render(_ctx, _cache) {
  const _component_hello = _resolveComponent("hello")
  return (_openBlock(), _createBlock("div", _hoisted_1, [
    (_ctx.flag)
      ? _createVNode(_component_hello, { key: 0 })
      : (_openBlock(), _createBlock("div", _hoisted_2, [
          _createVNode("p", null, "hello " + _toDisplayString(_ctx.msg + _ctx.test), 1 /* TEXT */),
          _hoisted_3,
          _hoisted_4
        ]))
  ]))
}
```

这就是示例 template 编译生成的最终代码，虽然我们忽略了其中子节点的一些实现细节，但是整体流程还是很容易理解的，主要就是一个递归的思想，遇到不同类型的节点，执行相应的代码生成函数生成代码即可。

节点生成代码的所需的信息可以从节点的属性中获取，这完全得益于前面 transform 的语法分析阶段生成的 codegenNode，根据这些信息就能很容易地生成对应的代码了。

至此，我们已经了解了模板的编译到代码的全部流程。相比 Vue.js 2.x，Vue.js 3.0 在编译阶段设计了 Block 的概念，我们上述示例编译出来的代码就是通过创建一个 Block 来创建对应的 vnode。

那么，这个 Block 在运行时是怎么玩的呢？为什么它会对性能优化起到很大的作用呢？接下来我们就来分析它背后的实现原理。

### 运行时优化

首先，我们来看一下 openBlock 的实现：

复制代码

```
const blockStack = []
let currentBlock = null
function openBlock(disableTracking = false) {
  blockStack.push((currentBlock = disableTracking ? null : []));
}
```

Vue.js 3.0 在运行时设计了一个 blockStack 和 currentBlock，其中 blockStack 表示一个 Block Tree，因为要考虑嵌套 Block 的情况，而currentBlock 表示当前的 Block。

openBlock 的实现很简单，往当前 blockStack push 一个新的 Block，作为 currentBlock。

那么设计 Block 的目的是什么呢？主要就是收集动态的 vnode 的节点，这样才能在 patch 阶段只比对这些动态 vnode 节点，避免不必要的静态节点的比对，优化了性能。

那么动态 vnode 节点是什么时候被收集的呢？其实是在 createVNode 阶段，我们来回顾一下它的实现：

复制代码

```
function createVNode(type, props = null
,children = null) {
  // 处理 props 相关逻辑，标准化 class 和 style
  // 对 vnode 类型信息编码 
  // 创建 vnode 对象
  // 标准化子节点，把不同数据类型的 children 转成数组或者文本类型。
  // 添加动态 vnode 节点到 currentBlock 中
  if (shouldTrack > 0 &&
    !isBlockNode &&
    currentBlock &&
    patchFlag !== 32 /* HYDRATE_EVENTS */ &&
    (patchFlag > 0 ||
      shapeFlag & 128 /* SUSPENSE */ ||
      shapeFlag & 64 /* TELEPORT */ ||
      shapeFlag & 4 /* STATEFUL_COMPONENT */ ||
      shapeFlag & 2 /* FUNCTIONAL_COMPONENT */)) {
    currentBlock.push(vnode);
  }
  
  return vnode
}
```

注释中写的前面几个过程，我们在之前的章节已经讲过了，我们来看函数的最后，这里会判断 vnode 是不是一个动态节点，如果是则把它添加到 currentBlock 中，这就是动态 vnode 节点的收集过程。

我们接着来看 createBlock 的实现：

复制代码

```
function createBlock(type, props, children, patchFlag, dynamicProps) {
  const vnode = createVNode(type, props, children, patchFlag, dynamicProps, true /* isBlock: 阻止这个 block 收集自身 */)
  // 在 vnode 上保留当前 Block 收集的动态子节点
  vnode.dynamicChildren = currentBlock || EMPTY_ARR
  blockStack.pop()
  // 当前 Block 恢复到父 Block
  currentBlock = blockStack[blockStack.length - 1] || null
  // 节点本身作为父 Block 收集的子节点
  if (currentBlock) {
    currentBlock.push(vnode)
  }
  return vnode
}
```

这时候你可能会好奇，为什么要设计 openBlock 和 createBlock 两个函数呢？比如下面这个函数`render()`：

复制代码

```
function render() {
  return (openBlock(),createBlock('div', null, [/*...*/]))
}
```

为什么不把 openBlock 和 createBlock 放在一个函数中执行呢，像下面这样：

复制代码

```
function render() {
  return (createBlock('div', null, [/*...*/]))
}
function createBlock(type, props, children, patchFlag, dynamicProps) {
  openBlock()
  // 创建 vnode
  const vnode = createVNode(type, props, children, patchFlag, dynamicProps, true)
  // ...  
  return vnode
}
```

这样是不行的！其中原因其实很简单，createBlock 函数的第三个参数是 children，这些 children 中的元素也是经过 createVNode 创建的，显然一个函数的调用需要先去执行参数的计算，也就是优先去创建子节点的 vnode，然后才会执行父节点的 createBlock 或者是 createVNode。

所以在父节点的 createBlock 函数执行前，子节点就已经通过 createVNode 创建了对应的 vnode ，如果把 openBlock 的逻辑放在了 createBlock 中，就相当于在子节点创建后才创建 currentBlock，这样就不能正确地收集子节点中的动态 vnode 了。

再回到 createBlock 函数内部，这个时候你要明白动态子节点已经被收集到 currentBlock 中了。

函数首先会执行 createVNode 创建一个 vnode 节点，注意最后一个参数是 true，这表明它是一个 Block node，所以就不会把自身当作一个动态 vnode 收集到 currentBlock 中。

接着把收集动态子节点的 currentBlock 保留到当前的 Block vnode 的 dynamicChildren 中，为后续 patch 过程访问这些动态子节点所用。

最后把当前 Block 恢复到父 Block，如果父 Block 存在的话，则把当前这个 Block node 作为动态节点添加到父 Block 中。

Block Tree 的构造过程我们搞清楚了，那么接下来我们就来看它在 patch 阶段具体是如何工作的。

我们之前分析过，在 patch 阶段更新节点元素的时候，会执行 patchElement 函数，我们再来回顾一下它的实现：

复制代码

```
const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, optimized) => {
  const el = (n2.el = n1.el)
  const oldProps = (n1 && n1.props) || EMPTY_OBJ
  const newProps = n2.props || EMPTY_OBJ
  // 更新 props
  patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG)
  const areChildrenSVG = isSVG && n2.type !== 'foreignObject'
  // 更新子节点
  if (n2.dynamicChildren) {
    patchBlockChildren(n1.dynamicChildren, n2.dynamicChildren, currentContainer, parentComponent, parentSuspense, isSVG);
  }
  else if (!optimized) {
    patchChildren(n1, n2, currentContainer, currentAnchor, parentComponent, parentSuspense, isSVG);
  }
}
```

我们在前面组件更新的章节分析过这个流程，在分析子节点更新的部分，当时并没有考虑到优化的场景，所以只分析了全量比对更新的场景。

而实际上，如果这个 vnode 是一个 Block vnode，那么我们不用去通过 patchChildren 全量比对，只需要通过 patchBlockChildren 去比对并更新 Block 中的动态子节点即可。

我们来看一下它的实现：

复制代码

```
const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG) => {
  for (let i = 0; i < newChildren.length; i++) {
    const oldVNode = oldChildren[i]
    const newVNode = newChildren[i]
    // 确定待更新节点的容器
    const container =
      // 对于 Fragment，我们需要提供正确的父容器
      oldVNode.type === Fragment ||
      // 在不同节点的情况下，将有一个替换节点，我们也需要正确的父容器
      !isSameVNodeType(oldVNode, newVNode) ||
      // 组件的情况，我们也需要提供一个父容器
      oldVNode.shapeFlag & 6 /* COMPONENT */
        ? hostParentNode(oldVNode.el)
        :
        // 在其他情况下，父容器实际上并没有被使用，所以这里只传递 Block 元素即可
        fallbackContainer
    patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, true)
  }
}
```

patchBlockChildren 的实现很简单，遍历新的动态子节点数组，拿到对应的新旧动态子节点，并执行 patch 更新子节点即可。

这样一来，更新的复杂度就变成和动态节点的数量正相关，而不与模板大小正相关，如果一个模板的动静比越低，那么性能优化的效果就越明显。

### 总结

好的，到这里我们这一节的学习也要结束啦，通过这节课的学习，你应该了解了 AST 是如何生成可运行的代码，也应该明白了 Vue.js 3.0 是如何通过 Block 的方式实现了运行时组件更新的性能优化。

我也推荐你写一些其他的示例，通过断点调试的方式，看看不同的场景的代码生成过程。

最后，给你留一道思考题目，Block 数组是一维的，但是动态的子节点可能有嵌套关系，patchBlockChildren 内部也是递归执行了 patch 函数，那么在整个更新的过程中，会出现子节点重复更新的情况吗，为什么？欢迎你在留言区与我分享。

> 本节课的相关代码在源代码中的位置如下：
> packages/compiler-core/src/codegen.ts
> packages/runtime-core/src/vnode.ts
> packages/runtime-core/src/renderer.ts