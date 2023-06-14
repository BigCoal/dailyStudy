### 前端文档更新教程

#### 拉取代码运行

```
- git clone git@git.knowology.cn:zhubaokang/techdocument.git
- cd techdocument
- cnpm i        //安装依赖
- npm run docs:dev //运行
```

#### 配置
##### 目录结构


```
 ├── docs # 项目目录
        ├── .vuepress #配置文件
                ├──public #静态文件目录
                ├──config.js #配置文件目录
        ├── page # 技术文档目录
 ├── document # 打包后文件
 ├── commitlint.config.js # git message 配置文件
 ├── deploy.sh # 自动化部署脚本
 ├── server.js # node服务器
```

##### 添加文档
1. 把在本地已经创建好的.md文件放到page目录下，命名为文档主题名称
2. 配置路由
    修改docs/.vuepress/config.js文件，修改规则参考：https://www.vuepress.cn/zh/theme/default-theme-config.html#%E4%BE%A7%E8%BE%B9%E6%A0%8F

#### 部署
1. 上传更新后的代码到master分支，上传规则参考[commitLint](/pages/commitLint.html)
2. 代码在52服务器/app/web/techdocument/目录下，运行deploy.sh自动化部署文件尚可