const core = require("@babel/core"); //babel核心模块
let types = require("@babel/types"); //用来生成或者判断节点的AST语法树的节点

let sourceCode = `
  const sum = (a, b) => {
    console.log(this);
    return a + b;
  };
`;

/**
 * 思路：
 * 第一步：找到当前箭头函数要使用哪个作用域内的this，暂时称为父作用域
 * 第二步：往父作用域中加入_this变量，也就是var _this=this
 * 第三步：找出当前箭头函数内所有用到this的地方
 * 第四步：将当前箭头函数中的this，统一替换成_this
 */
function hoistFunctionEnvironment(path) {
  //确定当前箭头函数要使用哪个地方的this
  const thisEnv = path.findParent((parent) => {
    return (
      (parent.isFunction() && !parent.isArrowFunctionExpression()) ||
      parent.isProgram()
    ); //要求父节点是函数且不是箭头函数，找不到就返回根节点
  });

  //向父作用域内放入一个_this变量
  thisEnv.scope.push({
    id: types.identifier("_this"), //生成标识符节点,也就是变量名
    init: types.thisExpression(), //生成this节点 也就是变量值
  });

  let thisPaths = []; //获取当前节点this的路径
  //遍历当前节点的子节点
  path.traverse({
    ThisExpression(thisPath) {
      thisPaths.push(thisPath);
    },
  });

  //替换
  thisPaths.forEach((thisPath) => {
    thisPath.replaceWith(types.identifier("_this")); //this => _this
  });
}

const arrowFunctionPlugin = {
  visitor: {
    //如果是箭头函数，那么就会进来此函数，参数是箭头函数的节点路径对象
    ArrowFunctionExpression(path) {
      let { node } = path;
      hoistFunctionEnvironment(path); //提升函数环境，解决this作用域问题

      node.type = "FunctionExpression"; //箭头函数转换为普通函数
      //如果函数体不是块语句
      if (!types.isBlockStatement(node.body)) {
        node.body = types.blockStatement([types.returnStatement(node.body)]);
      }
    },
  },
};

let targetSource = core.transform(sourceCode, {
  plugins: [arrowFunctionPlugin], //使用插件
});

console.log(targetSource.code);
