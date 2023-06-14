//实现1
function subCurry(fn) {
  const args = Array.prototype.slice.call(arguments, 1);
  return function () {
    return fn.apply(
      this,
      args.concat(Array.prototype.slice.call(arguments, 0))
    );
  };
}
function curry(fn, length) {
  const len = length || fn.length;
  return function () {
    const args = Array.prototype.slice.call(arguments, 0);
    if (args.length < len) {
      return curry(subCurry(...[fn].concat(args)), len - args.length);
    } else {
      return fn.apply(this, arguments);
    }
  };
}

function add(a, b, c) {
  return a + b + c;
}

// const curryAdd = curry(add);
// console.log(curryAdd(1)(3)(2));


//实现2
function curry2(fn,_args){
    let len = fn.length;
    const args = _args||[];
    return function(){
        console.log(arguments)
        args.push(...arguments)
        if(args.length<len){
            return curry2(fn,args)
        }else{ 
            return fn.apply(this,args)
        }
    }
}


http://localhost:3100/login/eyJ0eXAiOiJKc29uV2ViVG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoi6LaF57qn566h55CG5ZGYIiwidG9rZW5fdHlwZSI6InRva2VuIiwidXNlcmlkIjoiMiIsImFjY291bnQiOiJsYW1wIiwiaWF0IjoxNjQ1NjcwNjg2LCJuYmYiOjE2NDU2NzA2ODYsImV4cCI6MTY0NTY5OTQ4Nn0.GbOSFC80ZFS9rNyR705FkGaUOW9-mLNsJAyh9-jzLZc
const curryAdd2 = curry2(add);
console.log(curryAdd2(1,3)(4));



