# 02-本地搭建Threejs官方文档网站

因为Three.js官网是国外的服务器，所以为了方便学习和快速的查阅文档，我们可以自己搭建Three.js官网和文档，方便随时查看案例和文档内容进行学习。

1、首先进入threejs库GitHub地址：<https://github.com/mrdoob/three.js>

2、下载完整代码

![](./static/1658670847116-d86b74fd-1361-4dc8-9f26-2ad6709ff3e7.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_35%2Ctext_6ICB6ZmI5omT56CB%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

3、项目文件解压缩

![](./static/1658671004970-ee9e0068-f1ac-4544-aa53-7466fd6c21ea.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_19%2Ctext_6ICB6ZmI5omT56CB%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

4、命令行安装依赖

一般安装可以用npm、yarn等包管理工具，课程以yarn举例，如果没有安装可以用npm install yarn -g进行安装。

yarn install

![](./static/1658671150440-305dff18-7ffb-44b4-a370-3a34714f9d44.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_21%2Ctext_6ICB6ZmI5omT56CB%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

5、启动项目

yarn start

![](./static/1658671335128-86d5c38c-c4d8-4c43-a1a3-4139b8cabab8.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_33%2Ctext_6ICB6ZmI5omT56CB%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

浏览器访问即可：<http://localhost:8080>

6、文档目录介绍

![](./static/1658671722812-bd1ab2d4-63a1-4f52-b817-3bae6b185199.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_18%2Ctext_6ICB6ZmI5omT56CB%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

build目录：

![](./static/1658671933368-432f2ca5-490f-4ef7-8ab0-eb2d37547019.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_12%2Ctext_6ICB6ZmI5omT56CB%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

docs文档：

选择中文，查看中文文档。

![](./static/1658671987589-25ce6705-8bd4-498a-9ab6-eafca1e54224.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_33%2Ctext_6ICB6ZmI5omT56CB%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

examples案例：

![](./static/1658672080841-2c5ca6b6-6196-4c5a-9776-27594a872509.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_34%2Ctext_6ICB6ZmI5omT56CB%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

可以通过网址，找到具体的案例代码，如此处的文件名称是：webgl\_animation\_keyframes。因此可以在文件夹找到对应的代码文件

![](./static/1658672262599-3e41606d-8839-4220-90f8-c2b1a995468a.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_38%2Ctext_6ICB6ZmI5omT56CB%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

editor目录：

官方提供的可视化编辑器，可以直接导入模型，修改材质，添加光照效果等等。

![image](./static/1658672441327-ef9786ed-e140-485b-a102-77ea4d24ea2b.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_32%2Ctext_6ICB6ZmI5omT56CB%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)
