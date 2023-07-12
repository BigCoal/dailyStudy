# 03-使用parcel搭建three.js开发环境

为了方便模块化进行three.js项目的学习和开发，又不用学习太多的配置，增加学习成本，所以就使用Parcel这个web应用打包工具。

Parcel官网：<https://v2.parceljs.cn/getting-started/webapp/>

## 1、安装

在开始之前，您需要安装 Node 和 Yarn 或 npm，并为您的项目创建一个目录。然后，使用 Yarn 将 Parcel 安装到您的应用程序中：

yarn add --dev parcel

或者在使用 npm 运行时：

npm install --save-dev parcel

## 2、项目设置

现在已经安装了 Parcel，让我们为我们的应用程序创建一些源文件。Parcel 接受任何类型的文件作为入口点，但 HTML 文件是一个很好的起点。Parcel 将从那里遵循您的所有依赖项来构建您的应用程序。

创建src文件夹，并且创建index.html文件

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="./assets/css/style.css" />
  </head>
  <body>
    <script src="./main/main.js" type="module"></script>
  </body>
</html>

```

![](./static/1658673481160-cc1a96ae-d61c-459e-80ca-e1f36c1f15be.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_36%2Ctext_6ICB6ZmI5omT56CB%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

设置1个css文件

```javascript
* {
  margin: 0;
  padding: 0;
}
body {
  background-color: skyblue;
}

```

![](./static/1658673701226-494d8bad-e4e9-44c9-8eea-ca30c09737b2.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_23%2Ctext_6ICB6ZmI5omT56CB%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

创建一个main.js

```javascript
import * as THREE from "three";

// console.log(THREE);

// 目标：了解three.js最基本的内容

// 1、创建场景
const scene = new THREE.Scene();

// 2、创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// 设置相机位置
camera.position.set(0, 0, 10);
scene.add(camera);

// 添加物体
// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
// 根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// 将几何体添加到场景中
scene.add(cube);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// console.log(renderer);
// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement);

// 使用渲染器，通过相机将场景渲染进来
renderer.render(scene, camera);

```

## 3、打包脚本

到目前为止，我们一直在parcel直接运行 CLI，但在您的package.json文件中创建一些脚本以简化此操作会很有用。我们还将设置一个脚本来使用该命令构建您的应用程序以进行[生产。](https://v2.parceljs.cn/features/production/)parcel build最后，您还可以使用该字段在一个地方声明您的[条目](https://v2.parceljs.cn/features/targets/#entries)source，这样您就不需要在每个parcel命令中重复它们。

*package.json：*

```javascript
{
  "name": "01-three_basic",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "parcel src/index.html",
    "build": "parcel build src/index.html"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "parcel": "^2.4.1"
  },
  "dependencies": {
    "dat.gui": "^0.7.9",
    "gsap": "^3.10.3",
    "three": "^0.139.2"
  }
}

```

![](./static/1658673598801-d27b3659-9fd4-4e5d-9861-ebba65917310.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_25%2Ctext_6ICB6ZmI5omT56CB%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

安装依赖package.json设置的依赖

yarn install

现在您可以运行yarn build以构建您的生产项目并yarn dev启动开发服务器。

yarn dev
