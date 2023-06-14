# commitlint
### 官方文档
```
    husky：https://typicode.github.io/husky/#/
    commitlint：https://github.com/conventional-changelog/commitlint
```
### 安装
```
  npm install --save-dev husky @commitlint/config-conventional @commitlint/cli
```
  
### 说明
#### Husky
提交钩子Husky的用法，在代码被提交到Git仓库之前，我们可以在这里做一些预检查或者格式化，需要做这些操作，我们需要一个Git的提交钩子，简单说就是使用Git命令会触发的函数。
### 配置

#### husky
```js
//package.json

{
    "husky": {
        "hooks": {
            "pre-commit": "commitlint -E HUSKY_GIT_PARAMS",
         }
    }
}

```
##### pre-commit
这个钩子在git commit提交之前被调用。如果在此状态抛出错误状态会导致git commit命令在创建提交之前中止


---


#### commitlint
##### 配置

``` js
//commitlint.config.js

/**基本说明：
0:忽略规则  1:触发警告  2:抛出错误
always：永远  never：决不（反转）
*/

module.exports = {
  ignores: [(commit) => commit.includes('init')],  //提交过程中忽略有init的字符串
  extends: ['@commitlint/config-conventional'],
  parserPreset: { //提交解析规则
    parserOpts: {
      headerPattern: /^【(\w*|[\u4e00-\u9fa5]*)】(.*)/,
      headerCorrespondence: ['type', 'subject'],
    },
  },
  rules: {
    'body-leading-blank': [2, 'always'],  //body上面要有换行
    'footer-leading-blank': [1, 'always'], //footer上面要有换行
    'header-max-length': [2, 'always', 108],//header最大108个字符
    'subject-empty': [2, 'never'],//subject位不能为null
    'type-empty': [2, 'never'],//type位不能为null
    'type-enum': [      //type提交规则
      2,
      'always',
      [
        'feat',
        'fix',
        'perf',
        'style',
        'docs',
        'test',
        'refactor',
        'chore',
        'revert',
        'wip',
        'types',
      ],
    ],
  },
};

```

##### 格式
每个 commit message 包含一个 header, 一个 body 和一个 footer。header由 type，subject 组成。默认type,subject必填，body 和 footer 选填。

``` html
【<type>】<subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>

# header：108个字符以内，描述主要变更内容
#
# body：更详细的说明文本，建议72个字符以内。 需要描述的信息包括:
#
# * 为什么这个变更是必须的? 它可能是用来修复一个bug，增加一个feature，提升性能、可靠性、稳定性等等
# * 他如何解决这个问题? 具体描述解决问题的步骤
# * 是否存在副作用、风险? 
#
# footer：如果需要的化可以添加一个链接到issue地址，或者关闭某个issue。

示例： git commit -m "【feat】添加聊天功能

说明：由websocket建立链接的聊天功能

参考：https://www.runoob.com/html/html5-websocket.html
"
```

#### 规则

  - `feat` 增加新功能
  - `fix` 在提测或者上线之后修复的 bug
  - `style` 修改代码风格.如：修改了缩进，空格，逗号；增加，修改，删除了注释；删除多余的文件；删除 console.log 等
  - `perf` 优化/性能提升
  - `refactor` 代码重构，没有新增功能也没有修复 bug
  - `revert` 撤销修改
  - `test` 修改测试用例。如单元测试，集成测试等
  - `docs` 仅仅修改了文档.如：README,CHANGELOG 等
  - `chore` 改变构建流程，增加了依赖库或修改了配置文件等
  - `types` 类型定义文件更改
  - `wip` 开发中








### 参考文档
1.GitHook 工具 —— husky介绍及使用
https://www.cnblogs.com/jiaoshou/p/12222665.html

2.commitlint配置详解
https://commitlint.js.org/#/reference-rules
https://www.heyudesign.cn/documents/webbasic/gitcommit/#%E6%A0%BC%E5%BC%8F%E8%A6%81%E6%B1%82