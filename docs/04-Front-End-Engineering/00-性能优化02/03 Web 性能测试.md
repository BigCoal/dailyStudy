# Web 性能测试

作为网站应用的开发者或维护者，我们需要时常关注网站当前的健康状况，譬如在主流程运行正常的情况下，各方面性能体验是否满足期望，是否存在改进与提升的空间，如何进行快速且准确的问题定位等，为了满足这些诉求，我们需要进行全面且客观的性能检测。

## 性能检测的认知

性能检测作为性能优化过程中的一环，它的目的通常是给后续优化工作提供指导方向、参考基线及前后对比的依据。性能检测并不是一次性执行结束后就完成的工作，它会在检测、记录和改进的迭代过程中不断重复，来协助网站的性能优化不断接近期望的效果。

在展开介绍性能检测的方法和工具之前，我们首先需要破除有关性能的一些错误认知与理解偏差：

1.  ** 不要通过单一指标就衡量网站的性能体验。** 这是完全站在用户感知的角度上产生的认知，它只会有主观上的好与差，很难给出切实可行的优化建议。因此我们建议应当从更多维度、更多具体的指标角度来考量网站应用的性能表现，比如页面的首屏渲染时间，不同类型资源的加载次数与速度，缓存的命中率等。
2.  ** 不要一次检测就得到网站性能表现的客观结果。** 网站应用的实际性能表现通常是高度可变的，因为它会受到许多因素的影响，比如用户使用的设备状况、当前网络的连接速度等，因此若想通过性能检测来得到较为客观的优化指导，就不能仅依赖一次检测的数据，而需要在不同环境下收集尽量多的数据，然后以此来进行性能分析。
3.  ** 不要仅在开发环境中模拟进行性能检测。** 在开发环境中模拟进行的性能检测具有许多优势：比如可以很方面的制定当前检测的设备状况与网络速度，可以对检测结果进行重复调试，但因其所能覆盖的场景有限，会很容易陷入 “幸存者偏差”，即所发现的问题可能并非实际的性能瓶颈。

据此可知，我们若想通过检测来进行有效的性能优化改进，就需要从尽可能多的角度对网站性能表现进行考量，同时保证检测环境的客观多样，能够让分析得出的结果更加贴近真实的性能瓶颈，这无疑会花费大量的时间与精力，所以在进行性能优化之前我们还需要考虑所能投入的优化成本。

## 常见的检测工具

- Lighthouse - Google 提供的检测工具，可以在很短的时间内生成一份性能测试报告，并且给出一些优化建议
- WebPageTest - 在世界各地的真实浏览器、设备和位置上测试，并且也能提供非常全面的性能测试报告以及网络请求的瀑布图。
- 浏览器 DevTools 开发工具
  - 浏览器任务管理器
  - Network 面板
  - Coverage 面板 - 代码覆盖率
  - Memory 面板 - 内存使用
  - Performance 面板
  - Performance monitor 面板 - 性能监视器
- 性能测量 API
- 持续的性能监控方案

# Lighthouse 灯塔

[lighthouse](https://www.npmjs.com/package/lighthouse) 直译过来是 “灯塔” 的意思，它是一个由 Google 开发并开源的 Web 性能测试工具，用于改进网络应用的质量。您可以将其作为一个 Chrome 扩展程序运行，或从命令行运行。您为 Lighthouse 提供一个您要审查的网址，它将针对此页面运行一连串的测试，然后生成一个有关页面性能的报告，并给出一些优化建议。

## 使用方式

Lighthouse 提供了多种使用方式：

- [在 Chrome DevTools 中使用](https://www.npmjs.com/package/lighthouse#using-lighthouse-in-chrome-devtools)
  - 只要您使用的是 Chrome 内核的浏览器（Chrome、Microsoft Edge 等），它们已经在 DevTools 中集成了 Lighthouse。
- [使用 Chrome 扩展](https://www.npmjs.com/package/lighthouse#using-the-chrome-extension)
  - 在 DevTools 中集成 Lighthouse 之前，Chrome 是以扩展的方式提供类似功能的，现在不需要单独安装扩展了。
- [使用 Node CLI 命令行工具](https://www.npmjs.com/package/lighthouse#using-the-node-cli)
- [使用 Node 包](https://www.npmjs.com/package/lighthouse#using-the-node-module)

## 性能报告

关于性能报告部分的检测结果，Lighthouse 给出的信息包括：检测得分、性能指标、优化建议、诊断结果及已通过的性能。

以 Microsoft Edge 为例：

![](./static/f3bb3274f5d64a528c0ba97f98f5f779.png#pic_center)

首先选择测试的类别和设备，勾选清除存储（测试首次加载性能），点击生成报告开始生成。

![](./static/efe729d1b3514301b19dcc9704e4e870.png#pic_center)

![](./static/48be5197391640b89c2414f85f6231e1.png#pic_center)

### 检测得分

经过检测，Lighthouse 会对上述五个维度给出一个 `0~100` 的评估得分，如果没有分数或得分为 0，则很有可能是检测过程发生了错误，比如网络连接状况异常等；如果得分能达到 90 分以上，则说明网站应用在该方面的评估表现符合最佳实践。

关于如何得到这个评估得分，Lighthouse 首先会获得关于评估指标的原始性能数据，然后根据指标权重进行加权计算，最后以数据库中大量的评估结果进行对数正态分布的映射并计算最终得分。

- [Lighthouse 计分计算器](https://googlechrome.github.io/lighthouse/scorecalc/)
- [Lighthouse performance scoring - web.dev](https://web.dev/performance-scoring/)

![](./static/b791096ff49342c8b318fe4a20280c70.png#pic_center)

### 性能指标

性能指标就是 **“基于用户体验的性能指标”** 中的讲述的六个指标。

这六个指标数据通过加权计算，才能得到关于性能的最终评分，所加的权值越大表示对应指标对性能的影响就越大，如上图 **【Lighthouse 计分计算器】** 所示，列出了目前 Lighthouse 的权重情况（**Weight**）。

该权重系统还在不断优化过程中，虽然 Lighthouse 对于其中个别指标给予了较大的权重，也就意味着对该指标的优化能够带来更显著的性能评分提升，但这里还要建议在优化的过程中切勿只关注单个指标的优化，而要从整体性能的提升上来考虑优化策略。

### 优化建议

为了方便开发者更快的进行性能优化，Lighthouse 在给出关键性能指标评分的同时，还提供了一些切实可行的优化建议。

这些建议按照优化后预计能带来的提升效果从高到低进行排列，每一项展开又会有更加详细的优化指导建议。

### 诊断结果

这部分 Lighthouse 分别从影响网站页面性能的多个主要维度，对得到的一些数据进行详细检测和分析。

### 已通过的性能

这部分列出的优化项为该网站已通过的性能审核项。

## Lighthouse 练习案例

### 下载和运行案例

Chrome Developers 中有一篇 [《Optimize website speed》](https://developer.chrome.com/docs/devtools/speed/get-started/)，里面提供了一个需要性能优化的案例网站：[server.js – tony](https://glitch.com/edit/#!/tony) 。

这是一个在线开发案例项目，由于网络原因可能访问很慢，导致测试不够真实，可以将项目代码下载到本地。

> 可以使用我下载好的代码：[usaliva/lighthouse-learn-case](https://gitee.com/usaliva/lighthouse-learn-case)。  
> master 分支是初始代码，learn 分支是优化后的代码。

首先需要登录（支持 Github 账号登录），然后点击 Remix this project，将项目复制到账户下

![](./static/7d9c91ee03f24471900c853374c0f648.png#pic_center)

自动跳转页面后点击下面的 TOOLS - Import / Export

![](./static/e72d2d9473b644e4a17e7d0b340fdf97.png#pic_center)

弹出的面包提供了 git 地址，将其 clone 到本地即可。

![](./static/203d83092724498b83465932205fba81.png#pic_center)

下载到本地后 `npm install` 安装依赖，然后 `npm start` 或 `npm run develop` 构建项目并启动，成功后访问 `http://localhost:1234`，效果如下：

![](./static/ce272484bb6042fa9a48e4708cc90540.png#pic_center)

Lighthouse 性能检测报告结果（建议使用 InPrivate 隐私浏览模式）：

![](./static/03fc3b1ac06a49758d16a62abc51643f.png#pic_center)

![](./static/d2d6b20f30bc48bcbcdaceb177330ef8.png#pic_center)

加载的资源大小如下：

![](./static/f89c6b7b7c024aaa824e1c8c10eb4b91.png#pic_center)

下面开始逐步优化。

### 启用文本压缩

按照建议启用文本压缩：

![](./static/2ab58da4bd0f44539addaadd4fe67ccf.png#pic_center)

安装 Express 的中间件开启 Gzip 压缩。

```
npm install compression
```

```
// server.js
const express = require('express');
const app = express();
const fs = require('fs');
const compression = require('compression');

// 注意要放在配置静态资源路径前面
app.use(compression());

app.use(express.static('build'));

const listener = app.listen(process.env.PORT || 1234, function () {
  console.log(`Listening on port ${listener.address().port}`);
});
```

重新启动应用 `npm start`，点击 Lighthouse 面板的 `+` 新增测试报告，保留之前的报告结果：

![](./static/dcf5187e4cce49b7a89cb3b29407c19c.png#pic_center)

可以看到性能评分提高了一些：

![](./static/ae6df62e54dc4e7fad83d7a5a1ebfcfd.png#pic_center)

![](./static/2e0b3a9abc0f4f26b1a9c87c487b9102.png#pic_center)

加载的资源大小如下：

![](./static/f08641a661fe4b85ad9265b1ae1e0613.png#pic_center)

如 lodash.js、jquery.js，尤其是 bundle.js 的大小都明显变小。

### 压缩图片

当前使用的图片资源是未压缩的：

![](./static/ed0a28644d604ac89db8a326bc745576.png#pic_center)

改为压缩过的：

```
// src\model.js
const base = '/imgs';
const width = 1500;
// const dir = 'big';
const dir = 'small'; // 使用压缩过的图片

...
```

需要重新构建 `npm start`，查看资源大小：

![](./static/eb196d24f2c2437090b37ef6e848e59f.png#pic_center)

Lighthouse 检测报告：

![](./static/a30a014d17e14ca892a5b292ae054405.png#pic_center)

![](./static/16062afbc8264fe39acd959ff21642ed.png#pic_center)

### 移除阻塞渲染的资源

![](./static/eeaaf7f01ed34b9bb747db6f0d84ebfe.png#pic_center)

![](./static/b2964fc935a94b4bae8152aa80aefadb.png#pic_center)

当前案例中并没有使用 lodash.js 和 jquery.js，页面在加载它们的时候会阻塞主线程，所以将其移除优化性能：

```
<!-- template.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta >
    <!-- 移除未使用的 JavaScript -->
    <!-- <script src="/libs/lodash.js"></script>
    <script src="/libs/jquery.js"></script> -->
    <title>Tony's Favorite Foods</title>
  </head>
  <body>
    <div id="main"></div>
  </body>
</html>
```

`npm start` 重新构建并检测：

![](./static/8c31ea33a0b744019c072292d34e8048.png#pic_center)

### 减少未使用的 JavaScript

![](./static/392e245fcfd94dd88b8263c19d4419b2.png#pic_center)

当前案例使用 webpack 的 `development` 模式打包，将其修改为 `production` 模式，这个模式下会移除未使用的 JS：

```
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  // mode: "development",
  mode: "production",
  ...
};
```

`npm start` 重新构建并检测：

![](./static/66caf021a80e4a8db2f801663f471730.png#pic_center)

Total Blocking Time 的到了极大的提升，bundle.js 也优化到了 76kb 左右：

![](./static/5c9d15a5f1c74019be953a3f12a90740.png#pic_center)

### 减少主线程工作

![](./static/7625b469a953492fb9715d1ef2751c07.png#pic_center)

当前案例手动添加了一些占用主线程的无意义的脚本，如 `src/App.jsx` 下执行的 `mineBitcoin()`，将其注释：

```
// src\App.jsx
...

class App extends React.Component {
  constructor(props) {
    super(props);
    // 占用主线程 1.5s
    this.mineBitcoin(1500);
  }
  mineBitcoin(duration) {
    const start = new Date().getTime();
    while (new Date().getTime() < start + duration) {
      // TODO(tony): Make $$$
    }
  }
  render() {
    ...
  }
}

export default App;
```

`npm start` 重新构建并检测：

![](./static/18c18b835e9d4b2a97a59521060fb729.png#pic_center)

![](./static/8fc285d80ffd49e08ec4643802cda8dc.png#pic_center)

# WebPageTest

[WebPageTest](https://www.webpagetest.org/) 是一款非常专业的 Web 页面性能分析工具，它可以对检测分析的环境配置进行高度自定义化，内容包括测试节点的物理位置、设备型号、浏览器版本、网络条件和检测次数等。

除此之外，它还提供了目标网站应用于竞品之间的性能比较，以及查看网络路由情况等多种维度下的测试工具。

## 基本使用

可以直接打开[官方网站](https://www.webpagetest.org/)的首页，在配置好目标网站应用的网址和检测参数后便可启动测试，**可能需要排队**，等待检测运行结束就能查看详细的测试报告。

> 由于是在线工具，这种方式只能测试已经发布上线的页面。

以 https://www.taobao.com/ 为例：

![](./static/9d607e57d74a42e18d2e17cb0fc28c15.png#pic_center)

详细参考官方文档 - [Quick Start Guide](https://docs.webpagetest.org/getting-started/)。

这是官网对自己测试的报告结果：[Webpage Performance Test Result](https://www.webpagetest.org/result/220401_BiDcVQ_E2V/)

也可以部署本地 WebPageTest：[Private Instances](https://docs.webpagetest.org/private-instances/)

# Chrome DevTools

Chrome DevTools 主要讲的是 F12 开发人员工具提供的功能，浏览器默认只展示了几个功能面板（如 Elements、Console、Sources、Network 等），可以通过工具栏打开更多工具，也可以使用快捷键 `Ctrl + Shift + P` 打开运行命令工具，输入工具名称快速打开。

## 浏览器任务管理器

通过 Chrome 任务管理器，我们可以查看当前 Chrome 浏览器中所有进程关于 GUP、网络和内存空间的使用情况。这些进程包括当前打开的各个页签，安装的各种扩展插件，以及 GPU、网络、渲染等浏览器默认进程。通过监控这些数据，我们可以在有异于其他进程的大幅开销出现时，定位到可能存在内存泄漏或网络资源加载异常的问题进程。

以 Edge 为例，点击 **…（设置及其他） - 更多工具 - 浏览器任务管理器**，快捷键 `Shift + ESC`。

![](./static/c7368f4e9b9c4b14ab75bcafd9e77a89.png#pic_center)

## Network 网络

Network 面板是 Chrome 开发者工具中一个经常会被用到的工具面板，通过它可以查看网络所有资源的请求情况，包括加载时间、尺寸大小、优先级设置及 HTTP 缓存触发情况等信息，从而帮助我们发现可能由于未进行有效压缩而导致资源尺寸过大的问题，或者未合理配置缓存策略导致二次请求加载时间过长的问题等。

![](./static/c13a5a98e0874f68967852ffbee4f9a3.png#pic_center)

> 检测性能建议勾选上图功能。

除了查看网络请求信息，还可以进行缓存测试、网络吞吐测试（模拟低速网络）、阻止网络请求等。

参考：https://developer.chrome.com/docs/devtools/network/

## Coverage 覆盖范围

我们可以通过 Coverage 面板监控并统计出网站应用运行过程中代码执行的覆盖率情况。该面板统计的对象是 JavaScript 脚本文件与 CSS 样式表文件，统计结果主要包括：每个文件的字节大小、执行过程中已覆盖的代码字节数，以及可视化的覆盖率条形图。

根据执行结果我们能够发现，在启动录制的过程中到底有哪些尺寸较大的代码执行覆盖率较低，这就意味着有些代码文件中可能存在较多的无用代码，更准确地说是暂时没用到的代码。这些信息对性能优化来说是非常有用的，开发者可以据此将执行覆盖率较低的代码进行拆分，将首屏渲染阶段暂时不会执行到的代码部分单独打包，仅在需要的时候再去加载。

同时对规模较大且迭代周期较长的项目来说，工程代码中会包含一些永远都不会执行到的代码，而使用 webpack 的 Tree Shaking 仅能根据 export 进行无关联引用，那么此时 Coverage 面板就为优化提供了一条可以尝试的途径。

![](./static/31dac60019f14c07a5a12c26f9b61c92.png#pic_center)

## Memory 内存

前端主要使用 JavaScript 代码来处理业务逻辑，所以保证代码在执行过程中内存的良性开销对用户的性能体验来说尤为重要，如果出现内存泄漏，那么就可能带来网站应用卡顿或崩溃的后果。

为了更细致和准确地监控网站应用当前的内存使用情况，Chrome 浏览器开发者工具提供了 Memory 面板，通过它可以快速生成当前的堆内存快照，或者查看内存随时间的变化情况。据此我们可以查看并发现可能出现内存泄漏的环节。

示例：

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta >
  <title>内存泄漏分析示例</title>
</head>
<body>
  <h1>内存泄漏分析示例</h1>
  <div id="app">
    <button id="run">运行</button>
    <button id="stop">停止</button>
  </div>
  <script>
    const arr = []

    for (let i = 0; i < 20000; i++) {
      arr.push(i)
    }

    let newArr = []

    function run() {
      newArr = newArr.concat(arr)
    }

    let clearRun

    document.querySelector('#run').onclick = function() {
      clearRun = setInterval(() => {
        run()
      }, 1000)
    }

    document.querySelector('#stop').onclick = function() {
      clearInterval(clearRun)
    }

  </script>
</body>
</html>
```

浏览器打开页面，点击 “运行”，打开 Memory 面板，选择 “时间线上额分配检测”，点击 “开始”：

![](./static/47bbccf2df364474b9252c1249736308.png#pic_center)

面板会持续记录堆内存使用快照情况，点击 “停止记录” 按钮，可以查看具体信息：

![](./static/085b06695a684898a0deec7947e89bce.png#pic_center)

上面记录的内存使用大小呈上升趋势，正常情况应该是一个平缓的过程，有升（内存占用）有降（内存释放），下面通过 “卷影大小” 可以看到内存占用的情况，从而定位到 `newArr`。

## Performance 性能

使用 Performance 面板主要对网络应用的运行时性能表现进行检测与分析，其可检测的内容不仅包括页面的每秒帧数（FPS）、CPU 的消耗情况和各种请求的时间花费，还能查看页面在前 1ms 与后 1ms 之间网络任务的执行情况等内容。

### 使用方式

示例：[Janky Animation](https://googlechrome.github.io/devtools-samples/jank/)

> 建议使用隐私模式打开页面，因为隐私模式不会收到既有缓存或其他插件程序等因素的影响，能够给性能检测提供一个相对干净的运行环境。

点击页面 “Add 10” 增加动画图标直到动画有点卡顿，打开 Performance 面板，点击 “录制” 按钮，等待 3 秒（需要检测性能的时间段），点击 “停止录制” 按钮，相应的检测信息便出现在控制面板下方的区域：

![](./static/b24a9a22277d43dfb1a046d05c9d6827.png#pic_center)

### 面板信息

Performance 评估结果的面板信息大致分为四类：控制面板、概览面板、线程面板及统计面板。

### 控制面板

（1）Screenshots（屏幕截图）：是否截取每一帧的屏幕截图，勾选后会在概览面板中展示随时间变化的每帧截屏画面。

![](./static/a8b4d4d260ea4a03ab8816703a468c7d.png#pic_center)

（2）Memory（内存）：是否记录内存消耗，勾选后会在线程面板与统计面板之间展示各种类型资源的内存消耗曲线。

![](./static/b625c6cba0ad478192f6852a2e1ab240.png#pic_center)

（3）Web Vitals（网页指标）：是否展示性能指标信息，勾选后会在网络和 Frames（帧） 之间展示核心指标的节点状态。

![](./static/8a9f82acb6ab4829bd9ee8666de5a4dc.png#pic_center)

（4）Disable JavaScript samples（禁用 JavaScript 示例）：勾选则表示关闭 JavaScript 示例，减少在手机端运行时的开销，若要模拟手机端的运行环境则需要勾选。

（5）Enable advanced paint instrumentation(slow)（启用高级画图检测工具 (慢速)）：勾选则表示开启加速渲染工具，用来记录渲染事件的相关细节。因为该功能比较消耗性能，所以开启后重新生成检测报告的速度会变慢。

（6）Network（网络）：在性能检测时，用以切换模拟网络环境（网速）。

（7）CPU：限制 CPU 处理速度，主要用于模拟低速 CPU 运行时的性能（\* 倍减速）。

### 概览面板

在概览面板的时间轴上，可以通过鼠标左键选择一定时间范围，来进行更小范围的性能观察，也可以用鼠标滚动（或 W/S 键）缩放查看范围，通过 A/D 左右移动。

这部分可观察的性能信息包括：

（1）FPS（每秒帧数）：尽量保持在 60fps 才能让动画有比较流畅的视觉体验。

_示例：可以看到基本都是红色，绿色表示性能较佳的情况。_

（2）CPU（CPU 开销）：可以在时间轴上以曲线的形式观察 CPU 处理任务所花费的时间变化，除此之外还可以在**统计面板**中查看当前选中时间区域里各个任务花费时间的占比，其中占比较大的部分就有可能存在性能问题，可以进一步检测与分析。

_示例：可以看到几乎被充满（紫色部分），说明 CPU 一直在大量占用。_

（3）NET（网络请求）：概览面板提供的信息可能不够清晰，建议在**线程面板**的 Network 部分中具体查看，比如时间轴上每个请求的耗时及起止时间，从而方便开发者发现响应过长的网络请求并进行优化。

![](./static/6557b8c5bd0d484bb725d4b7e73d533c.png#pic_center)

_示例：因为当前示例没有资源请求，所以没有内容。_

### 线程面板

（1）Frames（桢）：查看每一帧的详细信息，包括绘制画面，绘制时间，如果出现红色或黄色，则表示有丢帧的情况。

（2）Experience（体验）：显示布局发生切换的频率。

（3）Main（主要）：展示主线程执行过程中 CPU 运行的火焰图，主线程在解析 HTML 和 CSS、页面绘制及执行 JavaScript 的过程中，每个事件调用堆栈和耗时的情况都会反应在这张图上。

> 在 CPU 执行的过程中发生的所有事情都称为**事件**。

其中每个长条都代表了一个事件，将鼠标悬浮其上可以查看相应事件的执行耗时和事件名。

x 轴表示执行时间，y 轴表示调用栈的情况，从上到下调用，越往下事件数量越少，所以火焰图是倒立的形式。

火焰图中的事件会以不同颜色进行标注，常见的事件类型有以下集中：HTML 解析、JavaScript 事件（例如鼠标点击、滚动等）、页面布局更改、元素样式重新计算及页面图层的绘制。如果任务右上角标红，则表示该任务是超过了 50ms 的长任务。

最下面紫色的部分是 Layout 重排的任务，可以放大后点击，在 Summary（摘要）查看是什么导致的页面重排：

![](./static/57998f38be6546d5a13f6efb1cd4142c.png#pic_center)

了解并熟知这些事件的执行情况，有助于发现潜在的性能问题。

（4）其他线程

### 统计面板

统计面板会根据在概览面板中选择的时间范围，绘制出不同类型任务执行耗时的可视化图表。

统计面板包含四个页签：

（1）Summary（摘要）：展示各类任务事件耗时的环形图。

（2）Bottom-Up（自下而上）：查看各个事件耗时时间的排序列表，列表包含两个维度：去除子事件后该事件本身的耗时和包含子事件从开始到结束的总耗时。

![](./static/b4c742858b044698b808b42b86c78876.png#pic_center)

（3）Call Tree（调用树）：查看全部或指定 Main 火焰图中某个事件的调用栈。

![](./static/c3aa87e48a304ccb9e5426099f112b60.png#pic_center)

（4）Event Log（事件日志）：查看关于每个事件的详细日志信息。

![](./static/3a021b8bb97448d5b9187a631d6fd785.png#pic_center)

### 保存和加载

测试结果可以下载保存，也可以上传加载在面板中显示。

![](./static/2fbdf670f6c940c19ada24cf143d4d07.png#pic_center)

## Rendering 绘制面

Rendering 面板中有一个 **FPS 监视器** 可以在页面运行时提供对 FPS 的实时监测。

在面板中勾选 Frame Rendering Stats（渲染桢统计信息），就会在窗口中显示一个监视器叠加层：

![](./static/dc1725f623414b279753be5f81d31570.png#pic_center)

Frame Rate 实时显示当前绘制帧率，如果有红线表示有丢帧的情况。

可以点击页面的 “Optimize” 开启优化模式，查看优化效果。

## Performance monitor 性能监视器

虽然使用 Performance 面板来进行监测能够得到较为全面的性能数据，但依然存在两个使用上的问题，即面板信息不够直观和数据的实时性不够强。

为了弥补这两个不足，Chrome 从 64 版本开始便在开发者工具中引入了 Performance monitor 面板，通过它让我们可以实时监控网站应用运行过程中，诸如 CPU 占用率、JavaScript 内存使用大小、内存中挂载的 DOM 节点数、JavaScript 事件监听次数及页面发生重绘与重排的处理时间等信息。

据此如果我们发现，当与页面的交互过程中出现某项指标有较为陡峭的增长，就意味着可能有影响性能体验的风险存在。

![](./static/f7f6d783b5c64c8094011d9aeace702a.png#pic_center)

如图，通过增减 DOM 节点，DOM 节点数发生了明显波动，开启优化模式后 CPU 占用呈断崖式下跌。

## 参考

- https://developer.chrome.com/docs/devtools/
- https://developer.chrome.com/docs/devtools/evaluate-performance/
- [分析运行时性能入门 - Microsoft Edge Development | Microsoft Docs](https://docs.microsoft.com/zh-cn/microsoft-edge/devtools-guide-chromium/evaluate-performance/)

# 性能测量 API

浏览器提供了 Web 性能相关的 API，通过它们可以获取和计算常用的性能指标。

## 详细参考

- [Web 性能 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/Performance)
- [Using the Performance API - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API/Using_the_Performance_API)
- [self.performance - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/web/api/performance_property)

## 常用性能指标及计算公式

- DNS 解析耗时：domainLookupEnd - domainLookupStart
- TCP 连接耗时：connectEnd - connectStart
- SSL 安全连接耗时：connectEnd - secureConnectionStart
- 网络请求耗时（TTFB）：responseStart - requestStart
- 数据传输耗时：responseEnd - responseStart
- DOM 解析耗时：domInteractive - responseEnd
- 资源加载耗时：loadEventStart - domContentLoadedEventEnd
- First Byte 时间：responseStart - domainLookupStart
- 白屏时间：responseEnd - fetchStart
- 首次可交互时间：domInteractive - fetchStart
- DOM Ready 时间：domContentLoadEventEnd - fetchStart
- 页面完全加载时间：loadEventStart - fetchStart
- HTTP 头部大小：transferSize - encodedBodySize
- 重定向次数：redirectCount
- 重定向耗时：redirectEnd - redirectStart

# 性能监控方案

- [前端性能监控开源方案](https://www.jianshu.com/p/a87c2e84bd56)
- [如何进行 web 性能监控？ | AlloyTeam](http://www.alloyteam.com/2020/01/14184/)
- [前端性能监控实践](https://juejin.cn/post/6844904094616780813)
- [前端性能监控及推荐几个开源的监控系统](https://cloud.tencent.com/developer/news/682347)
- [蚂蚁金服如何把前端性能监控做到极致?*前端*杨森](https://www.infoq.cn/article/dxa8am44oz*lukk5ufhy)
- [你是如何搭建 Web 前端性能监控系统的？](https://www.zhihu.com/question/37585246)
