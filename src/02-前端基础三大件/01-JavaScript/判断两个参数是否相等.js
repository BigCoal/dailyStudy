// function eq(a, b) {
//   //判断=== ，并且让+0不等于-0
//   if (a === b) return a !== 0 || 1 / a === 1 / b;

//   //判断!== ，并且让NaN等于NaN
//   if (a !== a) return b !== b;

//   // typeof null 的结果为 object ，这里做判断，是为了让有 null 的情况尽早退出函数
//   if (a == null || b == null) return false;

//   //判断基本类型
//   if (typeof a = 'object'Object.prototype.toString.call(a)==Object.prototype.toString.call(b)){

//   }else{
//     return false;
//   }
   
// }

// console.log(eq(-0, +0));
// console.log(eq(NaN, NaN));
// console.log(eq(undefined, undefined));
