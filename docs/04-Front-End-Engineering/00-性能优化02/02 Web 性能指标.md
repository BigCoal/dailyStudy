> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [blog.csdn.net](https://blog.csdn.net/u012961419/article/details/124748721?ops_request_misc=&request_id=f203ab6119a840f2a86d53a95833ef95&biz_id=&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~koosearch~default-1-124748721-null-null.268^v1^control&utm_term=%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96&spm=1018.2226.3001.4450)

# Web [性能指标](https://so.csdn.net/so/search?q=%E6%80%A7%E8%83%BD%E6%8C%87%E6%A0%87&spm=1001.2101.3001.7020)

我们已经知道性能的重要性，但当我们讨论性能的时候，让一个网页变得更快，具体指哪些内容？

事实上性能是相对的：

- 对于一个用户而言，一个站点可能速度很快（在具有功能强大的设备的快速网络上），而对于另一个用户而言，一个站点可能会较慢（在具有低端设备的慢速网络上）。
- 两个站点可能会在完全相同的时间内加载，但一个站点似乎加载速度会更快（如果它逐步加载内容，而不是等到最后显示所有内容）。
- 一个网站可能加载很快，但在后来的用户交互会很慢。

所以在讨论性能的时候，**精确的、可量化的指标**很重要。

但是，一个度量标准是基于客观标准并且可以定量地度量的，所以一个指标的好坏并不一定意味着是有用的。

对于 Web 开发人员来说，如何衡量一个 Web 页面的性能一直都是一个难题。

最初，我们使用 TTFB （Time to First Byte）、DomContentLoaded 和 Load 这些衡量文档加载进度的指标，但它们不能直接反应用户视觉体验。

为了能衡量用户视觉体验，Web 标准中定义了一些性能指标，这些性能指标被各大浏览器标准化实现，例如 [First paint](https://developer.mozilla.org/en-US/docs/Glossary/First_paint)（首次绘制）和 [First contentful paint](https://developer.mozilla.org/en-US/docs/Glossary/First_contentful_paint)（首次内容绘制）。还有一些由 Web 孵化器社区组（WICG）提出的性能指标，如 [Largest Contentful Paint](https://developer.mozilla.org/en-US/docs/Web/API/LargestContentfulPaint)（最大内容绘制）、[Time to interactive](https://developer.mozilla.org/en-US/docs/Glossary/Time_to_interactive)（可持续交互时间）、[First input delay](https://developer.mozilla.org/en-US/docs/Glossary/First_input_delay)（首次输入延迟）、[First CPU idle](https://developer.mozilla.org/en-US/docs/Glossary/First_CPU_idle)（首次 CPU 闲置）。另外还有 Google 提出的 [First Meaningful Paint](https://developer.mozilla.org/en-US/docs/Glossary/first_meaningful_paint)（首次有意义的绘制）、[Speed index](https://developer.mozilla.org/en-US/docs/Glossary/Speed_index)（速度指数），百度提出的 [First Screen Paint](https://www.w3.org/Submission/first-screen-paint/)（首屏可视时间）。

这些指标之间并不是毫无关联，而是在以用户为中心的目标中不断演进出来的，有的已经不再建议使用，有的被各种测试工具实现，有的则可以作为通用标准，有各大浏览器提供的可用于在生产环境测量的 API。

下面主要通过三个层面进行介绍：

- [RAIL 性能模型](https://web.dev/rail/) - 从用户体验的角度给定的体验标准（Response、Animation、Idle、Load）
- [基于用户体验的核心指标](https://web.dev/metrics/) - 基于 RAIL 下具体的指标方案
- [新一代型性能指标：Web Vitals](https://web.dev/vitals/) - 在以上指标方案的简化，重点 LCP（Largest Contentful Paint）、FID（First input delay）、CLS（Cumulative Layout Shift）。

# RAIL 性能模型

[RAIL](https://web.dev/rail/) 是 **Response**、**Animation**、**Idle** 和 **Load** 的首字母缩写，是一种由 Google Chrome 团队于 2015 年提出的性能模型，用于提升浏览器内的用户体验和性能。

RAIL 模型的理念是 “以用户为中心，最终目标不是让您的网站在任何特定设备上都能运行很快，而是使用户满意”。

![](./static/d097b2d86b5842b288d1863e2c662454.jpeg#pic_center)

RAIL 名字的由来是四个英文单词的首字母：

- 响应（Response）：应该尽可能快速的响应用户，应该在 100ms 以内响应用户输入。
  - 所谓的响应并不是返回结果，而是给出用户可以感知的状态交互。
- 动画（Animation）：在展示动画的时候，每一帧应该以 16ms 进行渲染，这样可以保持动画效果的一致性，并且避免卡顿。
  - 差不多每秒 60 桢
- 空闲（Idle）：当使用 JavaScript 主线程的时候，应该把任务划分到执行时间小于 50ms 的片段中去，这样可以释放线程以进行用户交互。
  - JS 中将超过 50ms 的执行任务称为 **“长任务”**，由于长任务在执行过程中没有办法响应用户交互，所以要尽量避免
- 加载（Load）：应该在小于 1s 的时间内加载完成你的网站，并可以进行用户交互。

> 根据网络条件和硬件的不同，用户对性能延迟的理解也有所不同。
>
> **1s** 是基于性能比较好的 PC 电脑以及良好的网络环境所得到的指标，用户对此已经习以为常。
>
> 而在 3G 连接速度较慢的移动设备上加载网络需要花费更多时间，因此移动用户通常更耐心，在移动设备上加载 **5s** 是一个更现实的目标。

这四个单词代表与网站或应用的生命周期相关的四个方面，这些方面会以不同的方式影响整个网站的性能。

## 用户对于延迟的感知

我们将用户作为之后性能优化的中心，首先需要了解用户对于延迟的反应。

用户感知延迟的时间，如下表所示：

<table><thead><tr><th>延迟</th><th>用户感知</th></tr></thead><tbody><tr><td>0 ~ 16ms</td><td>人眼可以感知每秒 60 桢的动画，即每帧 16ms，除了浏览器将一帧画面会绘制到屏幕上的时间，网站应用大约需要 10ms 来生成一桢</td></tr><tr><td>0 ~ 100ms</td><td>在该时间范围内响应用户操作，才会是流畅的体验</td></tr><tr><td>100 ~ 1000ms</td><td>能够感觉到明显的延迟</td></tr><tr><td>&gt; 1s</td><td>用户的注意力将离开对执行任务的关注</td></tr><tr><td>&gt; 10s</td><td>用户感到失望，可能会放弃任务</td></tr></tbody></table>

## 响应 Response

指标：应该尽可能快速的响应用户，应该在 100ms 以内响应用户输入。

网站性能对于响应方面的要求是，在用户感知延迟之前接收到操作的反馈。比如用户进行了文本输入、按钮点击、表单切换以及启动动画等操作后，必须在 100ms 内收到反馈，如果超过 100ms 的时间，用户就会感知延迟。

看似很基本的用户操作背后，可能会隐藏着复杂的业务逻辑处理以及网络请求与数据计算。对此我们应当谨慎，将较大开销的工作放在后台异步执行，而即便后台要处理数百毫秒才能完成的操作，也应当给用户提供及时的阶段性反馈。

比如点击按钮向后台发起某项业务处理请求时，首先反馈给用户开始处理的提示，然后在处理完成的回调中反馈完成的提示。

## 动画 [Animation](https://so.csdn.net/so/search?q=Animation&spm=1001.2101.3001.7020)

指标：在展示动画的时候，每一帧应该以 10ms 进行渲染，这样可以保持动画效果的一致性，并且避免卡顿。

前端所涉及的动画不仅有炫酷的 UI 特效，还包括滚动和触摸、拖动等交互效果，而这一方面的性能要求就是流畅。众所周知，人眼具有视觉暂留特性，就是光对视网膜所产生的视觉，在光停止作用后，仍能保留一段时间。

研究表明这是由于视神经存在反应速度造成的，其值是 1/24s，即当我们所见的物体移除后，该物体在我们眼中并不会立即消失，而会延续存在 1/24s 的时间。对动画来说，无论动画帧率由多高，最后我们仅能分辨其中的 30 桢，但越高的帧率会带来更好的流畅体验，因此动画要尽力达到 60fps 的帧率。

目前大多数设备的屏幕刷新率为 60 次 / 秒，那么浏览器渲染动画或页面的每一帧的速率也需要跟设备屏幕的刷新率保持一致。所以根据 60fps 帧率的计算，每一帧画面的生成都需要经过若干步骤，一桢图像的生成预算为 16ms（1000ms / 60 ≈ 16.66ms），除去浏览器绘制新桢的时间，留给执行代码的时间仅 10ms 左右。如果无法符合此预算，帧率将下降，并且内容会在屏幕上抖动。此现象通常称为卡顿，会对用户体验产生负面影响。

可以打开 chrome 提供的示例页面查看效果，一直点击 add 10，直到蓝色方块的移送速度明显变慢：[Janky Animation](https://googlechrome.github.io/devtools-samples/jank/)

## 空闲 Idle

指标：当使用 JavaScript 主线程的时候，应该把任务划分到执行时间小于 50ms 的片段中去，这样可以释放线程以进行用户交互。

要使网站响应迅速、动画流畅，通常需要较长的处理时间，但以用户为中心来看待性能问题，就会发现并非所有工作都需要在响应和加载阶段完成，我们完全可以利用浏览器的空闲时间处理可延迟的任务，只要让用户感受不到延迟即可。利用空闲时间处理延迟，可减少预加载的数据大小，以保证网站或应用快速完成加载。

为了更加合理的利用浏览器的空闲时间，最好将处理任务按 50ms 为单位分组。这么做就是保证用户在发生操作后的 100ms 内给出响应。

## 加载 Load

指标：首次加载应该在小于 5s 的时间内加载完成，并可以进行用户交互。对于后续加载，则是建议在 2s 内完成。

用户感知要求我们尽量在 5s 内完成页面加载，如果没有完成，用户的注意力就会分散到其他事情上，并对当前处理的任务产生中断感。需要注意的是，这里在 5s 内完成加载并渲染出页面的要求，并非要完成所有页面资源的加载，从用户感知体验的角度来说，只要关键渲染路径完成，用户就会认为全部加载已完成。

对于其他非关键资源的加载，延迟到浏览器空闲时段再进行，是比较常见的渐进式优化策略。比如图片懒加载、代码拆分等优化手段。

# 基于用户体验的性能指标

[基于用户体验的核心指标](https://web.dev/metrics/) 是 Google 在 web.dev 提出的。

## First Contentful [Paint](https://so.csdn.net/so/search?q=Paint&spm=1001.2101.3001.7020)（FCP）

[FCP（First Contentful Paint）](https://web.dev/fcp/)首次内容绘制，浏览器**首次绘制来自 DOM 内容**的时间，内容必须是文本、图片（包含背景图）、非白色的 canvas 或 SVG，也包括带有正在加载中的 Web 字体的文本。

![](./static/978c8aefcfde4936a98e395c496d7e91.jpeg#pic_center)

这是用户第一次开始看到页面内容，但仅仅有内容，并不意味着它是有用的内容（例如 Header、导航栏等），也不意味着用户要消费的内容。

### 速度指标

<table><thead><tr><th>FCP 时间（以秒为单位）</th><th>颜色编码</th><th>FCP 分数（HTTP 存档百分位数）</th></tr></thead><tbody><tr><td>0-2</td><td>绿色（快速）</td><td>75-100</td></tr><tr><td>2-4</td><td>橙色（中等）</td><td>50-74</td></tr><tr><td>&gt;4</td><td>红色（慢）</td><td>0-49</td></tr></tbody></table>

### 优化方案

https://web.dev/fcp/#how-to-improve-fcp

## Largest Contentful Paint（LCP）

[LCP（Largest Contentful Paint）](https://web.dev/lcp/)最大内容绘制，**可视区域中最大的内容元素呈现**到屏幕上的时间，用以估算页面的主要内容对用户可见时间。

LCP 考虑的元素：

- `<img>` 元素
- `<svg>` 元素内的 `<image>` 元素
- `<video>` 元素（封面图）
- 通过 `url()` 函数加载背景图片的元素
- 包含文本节点或其他内联级文本元素子级的块级元素

为了提供良好的用户体验，网站应力争使用 2.5 秒或更短的 “最大内容绘制”。为确保您达到大多数用户的这一目标，衡量移动设备和台式机设备的页面加载量的第 75 个百分位数是一个很好的衡量标准。

以下是一些示例：

![](./static/721fe1b3a78f467cac0c91b201204d9d.jpeg#pic_center)

![](./static/c5d97861acc8434abf89a49bdfd7ce03.jpeg#pic_center)

在以上两个时间轴中，最大的元素随内容加载而变化。在第一个示例中，新内容被添加到 DOM 中，并且更改了最大的元素。在第二个示例中，布局发生更改，以前最大的内容从视口中删除。

通常情况下，延迟加载的内容要比页面上已有的内容大，但不一定是这种情况。接下来的两个示例显示了在页面完全加载之前发生的最大内容绘制。

![](./static/f9f3c5e6bac64841a30f22a3ac0977f1.jpeg#pic_center)  
![](./static/d3b9469756df4c93a5e7c6d7901e09fe.jpeg#pic_center)

在第一个示例中，Instagram 徽标相对较早的加载，即使逐渐显示其他内容，它仍然是最大的元素。在第二个示例 Google 搜索结果页面示例中，最大的元素是一段文本，该文本在任何图像或徽标加载完成之前显示。由于所有单个图像均小于此段，因此在整个加载过程中，它始终是最大的元素。

> 在 Instagram 时间轴的第一帧中，您可能会注意到相机徽标没有被当作最大元素（周围没有绿色框）。那是因为它是一个 `<svg>` 元素，并且 `<svg>` 元素当前不被视为 LCP 候选对象。

### 速度指标

<table><thead><tr><th>LCP 时间（以秒为单位）</th><th>颜色编码</th></tr></thead><tbody><tr><td>0-2.5</td><td>绿色（快速）</td></tr><tr><td>2.5-4</td><td>橙色（中等）</td></tr><tr><td>&gt;4</td><td>红色（慢）</td></tr></tbody></table>

### 优化方案

https://web.dev/optimize-lcp/

## First Input Delay（FID）

[FID（First Input Delay）](https://web.dev/fid/)首次输入延迟，从用户第一次与页面交互（例如点击链接、点击按钮等）到浏览器实际能够响应该交互的时间。

输入延迟是因为浏览器的主线程正忙于其他事情，所以不能响应用户。发生这种情况的一个常见原因是浏览器正忙于解析和执行应用程序加载的大量计算的 JavaScript。

首次输入延迟通常发生在第一次内容绘制（FCP）和可持续交互时间（TTI）之间，因为页面已经呈现了一些内容，但还不能可靠地交互。

![](./static/479124c152d34923840d686808a12db8.jpeg#pic_center)

如上图所示，浏览器接收到用户输入操作时，主线程正忙于执行一个耗时比较长的任务，只有当这个任务执行完成后，浏览器才能响应用户的输入操作。它必须等待的时间就是此页面上该用户的 FID 值。

例如，以下所有 HTML 元素都需要在响应用户交互之前等待主线程上正在进行的任务完成：

- 文本输入框，复选框和单选按钮（`<input>`、`<textarea>`）
- 选择下拉菜单（`<select>`）
- 链接（`<a>`）

### 速度指标

<table><thead><tr><th>FID 时间（以毫秒为单位）</th><th>颜色编码</th></tr></thead><tbody><tr><td>0-100</td><td>绿色（快速）</td></tr><tr><td>100-300</td><td>橙色（中等）</td></tr><tr><td>&gt;300</td><td>红色（慢）</td></tr></tbody></table>

### 优化方案

- https://web.dev/fid/#how-to-improve-fid
- https://web.dev/optimize-fid/

## Time to Interactive（TTI）

[TTI（Time to Interactive）](https://web.dev/tti/)表示网页第一次 **完全达到可交互状态** 的时间点，浏览器已经可以持续性的响应用户的输入。完全达到可交互状态的时间点是在最后一个长任务（Long Task）完成的时间，并且在随后的 5 秒内网络和主线程是空闲的（没有长任务）。

从定义上来看，中文名称叫可持续交互时间或可流畅交互时间更合适。

> 需要 50ms 以上才能完成的任务称为**长任务**。

![](./static/9cd3563771654a91aa280db09deee09d.jpeg#pic_center)

### 速度指标

<table><thead><tr><th>TTI 时间（以秒为单位）</th><th>颜色编码</th></tr></thead><tbody><tr><td>0-3.8</td><td>绿色（快速）</td></tr><tr><td>3.9-7.3</td><td>橙色（中等）</td></tr><tr><td>&gt;7.3</td><td>红色（慢）</td></tr></tbody></table>

### 优化方案

https://web.dev/tti/#how-to-improve-tti

## Total Block Time（TBT）

[TBT（Total Block Time）](https://web.dev/tbt/)总阻塞时间，度量了 FCP 和 TTI 之间的总时间，在该时间范围内，主线程被阻塞足够长的时间防止输入响应。

只要存在长任务（该任务在主线程上运行超过 50ms），该主线程就会被视为 “阻塞”。我们说主线程“被阻塞” 是因为浏览器无法中断正在进行的任务。因此，如果用户确实在较长的任务中间与页面进行交互，则浏览器必须等待任务完成才能响应。

如果任务足够长（例如，超过 50ms 的任意时间），则用户很可能会注意到延迟并感觉页面缓慢或过时。

长任务的阻塞时间是其持续时间超过 50ms 的部分。页面的总阻塞时间是 FCP 和 TTI 之间发生的每个长任务的阻塞时间的总和。

例如，考虑页面加载期间浏览器主线程的下图：

![](./static/cd67c6cf374643b08c112346fc29d87d.jpeg#pic_center)

上面的时间轴有五个任务，其中三个是长任务，因为它们的持续时间超过 50ms。

下图显示了每个长任务的阻塞时间：

![](./static/53c30f78259e4641acac86006b5837b8.jpeg#pic_center)

因此，虽然在主线程上运行任务花费的总时间为 560ms，但只有 345ms 的时间被视为阻塞时间。

### 速度指标

<table><thead><tr><th>TBT 时间（以毫秒为单位）</th><th>颜色编码</th></tr></thead><tbody><tr><td>0-30</td><td>绿色（快速）</td></tr><tr><td>300-600</td><td>橙色（中等）</td></tr><tr><td>&gt;600</td><td>红色（慢）</td></tr></tbody></table>

### 优化方案

https://web.dev/tbt/#how-to-improve-tbt

## Cumulative Layout Shift（CLS）

[CLS（Cumulative Layout Shift）](https://web.dev/cls/)累计布局偏移，CLS 衡量的是页面整个生命周期中每次元素发生的非预期布局偏移得分的总和。每次可视元素在两次渲染帧中的起始位置不同时，就当作发生了 LS（Layout Shift）。

![](./static/20f9cc4519ae41c2befb29fd4345ae66.png#pic_center)

试想这样一个场景，您想要点击一个链接或按钮，但是在手指落下的瞬间，链接移动了，您最终点击了其他东西！

页面内容的意外移动通常是由于异步加载资源或将 DOM 元素动态添加到现有内容的上方而发生的。罪魁祸首可能是尺寸未知的图像或视频，或是动态调整自身大小的第三方广告或小部件等。

### 速度指标

<table><thead><tr><th>CLS 时间（以毫秒为单位）</th><th>颜色编码</th></tr></thead><tbody><tr><td>0-0.1</td><td>绿色（快速）</td></tr><tr><td>0.1-0.25</td><td>橙色（中等）</td></tr><tr><td>&gt;0.25</td><td>红色（慢）</td></tr></tbody></table>

### 优化方案

- https://web.dev/cls/#how-to-improve-cls
- https://web.dev/optimize-cls/

## Speed Index（SI）

Speed Index（SI）速度指数，是一个表示页面可视区域中内容的填充速度的指标，可以通过计算页面可见区域内容显示的平均时间来衡量。

### 测量方式

捕获浏览器加载页面过程的视频，然后对每 100ms 间隔的页面截图计算页面内容填充的百分比，可以得到这样一个曲线。

![](./static/4f49c46fb4db4794ae49e61ebb399613.jpeg#pic_center)

途中的 Example 1 和 Example 2 都是在 10s 时页面填充完成，但 Example 1 在 2s 时就已经填充了 80% 的内容，而 Example 2 在 8s 时才填充 80%。

图中阴影部分的面积（即时间 - 内容填充百分比曲线以上部分）的大小即可表示可视区域内页面内容的填充速度，面积越小，填充速度越快。

### 速度指标

<table><thead><tr><th>速度指标（以秒为单位）</th><th>颜色编码</th><th>速度指数得分</th></tr></thead><tbody><tr><td>0-4.3</td><td>绿色（快速）</td><td>75-100</td></tr><tr><td>4.4-5.8</td><td>橙色（中等）</td><td>50-74</td></tr><tr><td>&gt;5.8</td><td>红色（慢）</td><td>0-49</td></tr></tbody></table>

### 优化方案

https://web.dev/speed-index/#how-to-improve-your-speed-index-score

# Web Vitals

Google 开发了许多实用指标和工具，帮助衡量用户体验和质量，从而发掘优化点。一项名为 Web Vitals 的计划降低了学习成本，为网站体验提供了一组统一的质量衡量指标 —— Core Web Vitals，其中包括加载体验、交互性和页面内容的视觉稳定性。

有很多方法可以优化网站的用户体验。若能预先了解最佳的优化衡量方法，可以大大节省时间和成本。

Google 在 2020 年 5 月 5 日提出了新的用户体验量化方式 Web Vitals 来衡量网站的用户体验，并将这些衡量结果用作其排名算法的一部分。

## Core Web Vitals 与 Web Vitals

什么是 Web Vitals，Google 给出的定义是 **一个良好网站的基本指标（Essential metrics for a healthy site）**。

过去要衡量一个网站的好坏，需要使用的指标太多了，Web Vitals 可以简化指标的学习曲线，只需聚焦于 Web Vitals 指标的表现即可。

在这些 Web Vitals 中，Google 确定了三个主要衡量指标，即在所有类型的网站中通用的 Core Web Vitals：

![](https://img-blog.csdnimg.cn/13cf24ac8d4f48a194655b76c0a40b5a.webp#pic_center)

> Core Web Vitals 是应用于所有 Web 页面的 Web Vitals 的子集，是其最重要的核心。

![](./static/a1407d4162e04c7991e390120010d3a3.jpeg#pic_center)

<table><thead><tr><th>指标</th><th>描述</th><th>Good</th><th>Poor</th><th>Percentile</th></tr></thead><tbody><tr><td>加载性能（LCP）</td><td>显示最大内容元素所需时间</td><td>≤2500ms</td><td>＞4000ms</td><td>75</td></tr><tr><td>交互性（FID）</td><td>首次输入延迟时间</td><td>≤100ms</td><td>&gt;300ms</td><td>75</td></tr><tr><td>视觉稳定性（CLS）</td><td>累计布局偏移</td><td>≤0.1</td><td>&gt;0.25</td><td>75</td></tr></tbody></table>

## 测量 Web Vitals

- 性能测试工具，比如 Lighthouse
- 使用 [web-vitals](https://www.npmjs.com/package/web-vitals) 库
- 使用浏览器插件 [Web Vitals](https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma)

## 优化 Web Vitals

- [Optimize Largest Contentful Paint](https://web.dev/optimize-lcp/)
- [Optimize First Input Delay](https://web.dev/optimize-fid/)
- [Optimize Cumulative Layout Shift](https://web.dev/optimize-cls/)

## 参考链接

- [Web Vitals - web.dev](https://web.dev/vitals/)
- [解读新一代 Web 性能体验和质量指标](https://juejin.cn/post/6844904168591736846)
- [谷歌的新一代 Web 性能体验和质量指标：Web Vitals](https://www.uisdc.com/web-vitals)
