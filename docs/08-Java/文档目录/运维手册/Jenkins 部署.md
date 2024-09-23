目录

# Jenkins 部署

本小节，讲解如何将前端 + 后端项目，**使用 Jenkins 工具**，部署到 dev 开发环境下的一台 Linux 服务器上。如下图所示：

![Jenkins 部署](./static/01.png)

友情提示：

本文是 [《开发指南 —— Linux 部署》](/deployment-linux) 的加强版，差别在于使用 Jenkins 部署。

## [#](#_1-安装-jenkins) 1. 安装 Jenkins

阅读 [《芋道 Jenkins 极简入门 》 (opens new window)](https://www.iocoder.cn/Jenkins/install/?yudao) 文章，进行 Jenkins 的安装。

## [#](#_2-部署后端) 2. 部署后端

阅读 [《芋道 Spring Boot 持续交付 Jenkins 入门 》 (opens new window)](https://www.iocoder.cn/Spring-Boot/Jenkins/?yudao) 文章，进行后端的部署。

可参考 Jenkins 配置如下：

![Build](./static/01.png)

![Post Steps](./static/02.png)

## [#](#_3-部署前端) 3. 部署前端

可参考 Jenkins 配置如下：

![Build](./static/11.png)

![Post Steps](./static/12.png)