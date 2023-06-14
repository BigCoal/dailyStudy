
# commit 合并

## 前情提要

要准备提交 MR 了，改了半天搞了很多个 commit，都 push 上去了，但是提交 MR 的时候要合成一个 commit，咋搞呢？

### 我期望的效果

####  合并 commit 之前

比如我现在有 4 个 commit ID，从新到旧分别为：

> 85d5d8fa468b06bb9a62fafde01d80cbb7396682 # 我改的
> 
> 621ca4121f971d9604e395556763551427d799d9 # 我改的
> 
> f744d2e91916ab7831f3a7695d1d1825916db164 # 我改的
> 
> 5c135e49e683563fa470d7f5c281050ec1d73af9 # 我改的
> 
> 295ac3b842b4ecb6eff1c9954a281a4606a8bc84 # 别人改的

####  合并 commit 之后

我想把我改的 commit ID 全部合成一个新的 commit ID ：

> 8403afe13664d6bb7f5a5557716a030e9389a944 # 我改的
> 
> 295ac3b842b4ecb6eff1c9954a281a4606a8bc84 # 别人改的

##  合并 commitID 的方法

### 方法一：git reset --soft

思路：使用 git reset --soft 回退版本库和暂存区的版本，同时保留工作区的变动，之后再重新提交工作区的内容就好了。

```git
# 查看前10个commit
git log -10
# 从版本库恢复文件到暂存区，不改动工作区的内容
git reset --soft 295ac3b842b4ecb6eff1c9954a281a4606a8bc84	# 别人改的commitID
# add已经跟踪的文件
git add -u
# 提交
git commit -m "修改信息"
# 强制push以替换远程仓的commitID
git push --force
```

如果 push 失败，出现 Reject，则需要开启分支强制合入的选项，取消分支保护。

> **Settings -> Repository -> Protected Branches -> Protected branch （找到分支） -> Unprotect**

### 方法二：git rebase

```git
# 查看前10个commit
git log -10
# 将4个commit压缩成一个commit
git rebase -i HEAD~4	
# add已经跟踪的文件
git add -u
# 提交
git commit -m "修改信息"
# 强制push以替换远程仓的commitID
git push --force
```

注意：`git rebase` 会临时创建一个新分支进行，**如果弄着出错了**，可以 `git checkout 原分支名` 切换回原分支之后重新 `git rebase`。

#### git rebase 压缩 commit 图示

##### git log 查看分支

我想合并前四个 commit 到最后一个。如下所示：

![](https://img-blog.csdnimg.cn/20200920215243866.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NwYWRlXw==,size_16,color_FFFFFF,t_70#pic_center)

##### git rebase -i HEAD~n

使用 `git rebase -i HEAD~5` 压缩 5 个 commit 为 1 个，或者`git rebase -i 51efaef517abdbf674478de6073c12239d78a56a` （第一个 commit 的 id）  

vim 编辑器，按`i`编辑，将后 4 个 commit 的`pick`修改为`fixup`，保留第一个`pick`。按`esc`键，输入`:wq`保存退出。

*   **pick**：使用 commit。
    
*   **reword**：使用 commit，修改 commit 信息。
    
*   **squash**：使用 commit，将 commit 信息合入上一个 commit。
    
*   **fixup**：使用 commit，丢弃 commit 信息。
    

![](https://img-blog.csdnimg.cn/20200920215523364.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NwYWRlXw==,size_16,color_FFFFFF,t_70#pic_center)  
操作完之后，发现 commit 都合并成了一个。  
![](https://img-blog.csdnimg.cn/20200920220124152.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NwYWRlXw==,size_16,color_FFFFFF,t_70#pic_center)

##### git push --force 提交

![](https://img-blog.csdnimg.cn/2020092022073481.png#pic_center)