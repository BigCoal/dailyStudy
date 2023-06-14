

# Promise原理解析

## 基础练习
先通过几道题练习下基础，基础不过关建议看下：https://es6.ruanyifeng.com/#docs/promise

### 练习一

```js
 new Promise((resolve, reject) => {
  console.log("外部promise");
  resolve("ok");
  reject("报错了");
})
  .then((res) => {
      console.log("外部第一个then" + res);
  }, (err) => {
      console.log("报错了1" + err)
  })
  .then(() => {
      console.log("外部第二个then");
  }).catch(err => {
      console.log("报错了2" + err)
  }).finally(res=>{
            console.log("最终")
    });
```

### 练习二
```js
new Promise((resolve, reject) => {
  console.log("外部promise");
  resolve("ok");
})
  .then((res) => {
    console.log("外部第一个then"+res);
    return new Promise((resolve, reject) => {
      console.log("内部promise");
      resolve();
    })
    .then(() => {
    console.log("内部第一个then");
    })
    .then(() => {
    console.log("内部第二个then");
    });
  })
  .then(() => {
    console.log("外部第二个then");
  }).catch(err=>{
    console.log(err)
  });
```

### 练习三
```js
new Promise((resolve, reject) => {
  console.log("外部promise");
  resolve();
})
  .then(() => {
    console.log("外部第一个then");
    new Promise((resolve, reject) => {
      console.log("内部promise");
      resolve();
    })
      .then(() => {
        console.log("内部第一个then");
      })
      .then(() => {
        console.log("内部第二个then");
      });
  })
  .then(() => {
    console.log("外部第二个then");
  });
```
### 练习四
```js
new Promise((resolve, reject) => {
  console.log("外部promise");
  resolve();
})
  .then(() => {
    console.log("外部第一个then");
    let p = new Promise((resolve, reject) => {
      console.log("内部promise");
      resolve();
    })
    p.then(() => {
        console.log("内部第一个then");
      })
    p.then(() => {
        console.log("内部第二个then");
      });
  })
  .then(() => {
    console.log("外部第二个then");
  });
```

### 练习五
```js
let p = new Promise((resolve, reject) => {
  console.log("外部promise");
  resolve();
})
p.then(() => {
    console.log("外部第一个then");
    new Promise((resolve, reject) => {
      console.log("内部promise");
      resolve();
    })
      .then(() => {
        console.log("内部第一个then");
      })
      .then(() => {
        console.log("内部第二个then");
      });
  })
p.then(() => {
    console.log("外部第二个then");
  });
```

### 练习六
```js
new Promise((resolve, reject) => {
  console.log("外部promise");
  resolve();
})
.then(() => {
    console.log("外部第一个then");
    new Promise((resolve, reject) => {
        console.log("内部promise");
        resolve();
    })
    .then(() => {
        console.log("内部第一个then");
    })
    .then(() => {
        console.log("内部第二个then");
    });
    return new Promise((resolve, reject) => {
        console.log("内部promise2");
        resolve();
    })
    .then(() => {
        console.log("内部第一个then2");
    })
    .then(() => {
        console.log("内部第二个then2");
    });
})
.then(() => {
    console.log("外部第二个then");
});
```

## Promise/A+规范
Promise表示一个异步操作的最终结果。与Promise最主要的交互方法是通过将函数传入它的then方法从而获取得Promise最终的值或Promise最终最拒绝（reject）的原因。

### 术语
Promise是一个包含了兼容promise规范then方法的对象或函数，thenable 是一个包含了then方法的对象或函数。value 是任何Javascript值。 (包括 undefined, thenable, promise等).exception 是由throw表达式抛出来的值。reason 是一个用于描述Promise被拒绝原因的值。

### 要求
#### Promise状态
一个Promise必须处在其中之一的状态：pending, fulfilled 或 rejected.

如果是pending状态,则promise：可以转换到fulfilled或rejected状态。


如果是fulfilled状态,则promise：不能转换成任何其它状态。必须有一个值，且这个值不能被改变。


如果是rejected状态,则promise可以：不能转换成任何其它状态。必须有一个原因，且这个值不能被改变。


#### then 方法
一个Promise必须提供一个then方法来获取其值或原因。
Promise的then方法接受两个参数：
```js
promise.then(onFulfilled, onRejected)
```
onFulfilled 和 onRejected 都是可选参数,如果onFulfilled不是一个函数，则忽略之。如果onRejected不是一个函数，则忽略之。

如果onFulfilled是一个函数:它必须在promise fulfilled后调用， 且promise的value为其第一个参数。它不能在promise fulfilled前调用。不能被多次调用。

如果onRejected是一个函数,它必须在promise rejected后调用， 且promise的reason为其第一个参数。它不能在promise rejected前调用。不能被多次调用。

onFulfilled 和 onRejected 只允许在 execution context 栈仅包含平台代码时运行. 
onFulfilled 和 onRejected 必须被当做函数调用 (i.e. 即函数体内的 this 为undefined). 
对于一个promise，它的then方法可以调用多次.

当promise fulfilled后，所有onFulfilled都必须按照其注册顺序执行。
当promise rejected后，所有OnRejected都必须按照其注册顺序执行。
then 必须返回一个promise 

promise2 = promise1.then(onFulfilled, onRejected);
如果onFulfilled 或 onRejected 返回了值x, 则执行Promise 解析流程[[Resolve]](promise2, x).
如果onFulfilled 或 onRejected抛出了异常e, 则promise2应当以e为reason被拒绝。
如果 onFulfilled 不是一个函数且promise1已经fulfilled，则promise2必须以promise1的值fulfilled.
如果 OnReject 不是一个函数且promise1已经rejected, 则promise2必须以相同的reason被拒绝.
#### Promise解析过程
Promise解析过程 是以一个promise和一个值做为参数的抽象过程，可表示为[[Resolve]](promise, x). 过程如下；

如果promise 和 x 指向相同的值, 使用 TypeError做为原因将promise拒绝。
如果 x 是一个promise, 采用其状态 [3.4]:

如果x是pending状态，promise必须保持pending走到x fulfilled或rejected.
如果x是fulfilled状态，将x的值用于fulfill promise.
如果x是rejected状态, 将x的原因用于reject promise..
如果x是一个对象或一个函数：

将 then 赋为 x.then. [3.5]
如果在取x.then值时抛出了异常，则以这个异常做为原因将promise拒绝。
如果 then 是一个函数， 以x为this调用then函数， 且第一个参数是resolvePromise，第二个参数是rejectPromise，且：

当 resolvePromise 被以 y为参数调用, 执行 [[Resolve]](promise, y).
当 rejectPromise 被以 r 为参数调用, 则以r为原因将promise拒绝。
如果 resolvePromise 和 rejectPromise 都被调用了，或者被调用了多次，则只第一次有效，后面的忽略。
如果在调用then时抛出了异常，则：

如果 resolvePromise 或 rejectPromise 已经被调用了，则忽略它。
否则, 以e为reason将 promise 拒绝。
如果 then不是一个函数，则 以x为值fulfill promise。
如果 x 不是对象也不是函数，则以x为值 fulfill promise。


## 起步构建


本章来自己开发一个Promise实现，提升异步编程的能力。

首先声明定义类并声明Promise状态与值，有以下几个细节需要注意。

executor为执行者
当执行者出现异常时触发拒绝状态
使用静态属性保存状态值
状态只能改变一次，所以在resolve与reject添加条件判断
因为 resolve或rejected方法在executor中调用，作用域也是executor作用域，这会造成this指向window，现在我们使用的是class定义，this为undefined。
``` js
class HD {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";
  constructor(executor) {
    this.status = HD.PENDING;
    this.value = null;
    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }
  resolve(value) {
    if (this.status == HD.PENDING) {
      this.status = HD.FULFILLED;
      this.value = value;
    }
  }
  reject(value) {
    if (this.status == HD.PENDING) {
      this.status = HD.REJECTED;
      this.value = value;
    }
  }
}
```

下面测试一下状态改变
``` js
<script src="HD.js"></script>
<script>
  let p = new HD((resolve, reject) => {
    resolve("百度");
  });
  console.log(p);
</script>
```
### THEN
现在添加then方法来处理状态的改变，有以下几点说明

then可以有两个参数，即成功和错误时的回调函数
then的函数参数都不是必须的，所以需要设置默认值为函数，用于处理当没有传递时情况
当执行then传递的函数发生异常时，统一交给onRejected来处理错误
### 基础构建
``` js
then(onFulfilled, onRejected) {
  if (typeof onFulfilled != "function") {
    onFulfilled = value => value;
  }
  if (typeof onRejected != "function") {
    onRejected = value => value;
  }
  if (this.status == HD.FULFILLED) {
    try {
      onFulfilled(this.value);
    } catch (error) {
      onRejected(error);
    }
  }
  if (this.status == HD.REJECTED) {
    try {
      onRejected(this.value);
    } catch (error) {
      onRejected(error);
    }
  }
}
```
下面来测试then方法的，结果正常输出百度
``` js
let p = new HD((resolve, reject) => {
  resolve("百度");
}).then(
  value => {
    console.log(value);
  },
  reason => {
    console.log(reason);
  }
);
console.log("baidu.com");
```
### 异步任务
但上面的代码产生的Promise并不是异步的，使用setTimeout来将onFulfilled与onRejected做为异步宏任务执行
``` js
then(onFulfilled, onRejected) {
  if (typeof onFulfilled != "function") {
    onFulfilled = value => value;
  }
  if (typeof onRejected != "function") {
    onRejected = value => value;
  }
  if (this.status == HD.FULFILLED) {
    setTimeout(() => {
      try {
        onFulfilled(this.value);
      } catch (error) {
        onRejected(error);
      }
    });
  }
  if (this.status == HD.REJECTED) {
    setTimeout(() => {
      try {
        onRejected(this.value);
      } catch (error) {
        onRejected(error);
      }
    });
  }
}
```
现在再执行代码，已经有异步效果了，先输出了baidu.com
``` js
let p = new HD((resolve, reject) => {
  resolve("百度");
}).then(
  value => {
    console.log(value);
  },
  reason => {
    console.log(reason);
  }
);
console.log("baidu.com");
```
### PENDING状态
目前then方法无法处理promise为pending时的状态
``` js
...
let p = new HD((resolve, reject) => {
  setTimeout(() => {
    resolve("百度");
  });
})
...
```
为了处理以下情况，需要进行几点改动

在构造函数中添加callbacks来保存pending状态时处理函数，当状态改变时循环调用
``` js
constructor(executor) {
	...
  this.callbacks = [];
  ...
}    
```
将then方法的回调函数添加到 callbacks 数组中，用于异步执行
``` js
then(onFulfilled, onRejected) {
  if (typeof onFulfilled != "function") {
    onFulfilled = value => value;
  }
  if (typeof onRejected != "function") {
    onRejected = value => value;
  }
	if (this.status == HD.PENDING) {
    this.callbacks.push({
      onFulfilled: value => {
        try {
          onFulfilled(value);
        } catch (error) {
          onRejected(error);
        }
      },
      onRejected: value => {
        try {
          onRejected(value);
        } catch (error) {
          onRejected(error);
        }
      }
    });
  }
  ...
}
```
resovle与reject中添加处理callback方法的代码
``` js
resolve(value) {
  if (this.status == HD.PENDING) {
    this.status = HD.FULFILLED;
    this.value = value;
    this.callbacks.map(callback => {
      callback.onFulfilled(value);
    });
  }
}
reject(value) {
  if (this.status == HD.PENDING) {
    this.status = HD.REJECTED;
    this.value = value;
    this.callbacks.map(callback => {
      callback.onRejected(value);
    });
  }
}
```
### PENDING异步
执行以下代码发现并不是异步操作，应该先输出 视频 然后是`百度
``` js
let p = new HD((resolve, reject) => {
  setTimeout(() => {
    resolve("百度");
    console.log("视频");
  });
}).then(
  value => {
    console.log(value);
  },
  reason => {
    console.log(reason);
  }
);
```
解决以上问题，只需要将resolve与reject执行通过setTimeout定义为异步任务
``` js
resolve(value) {
  if (this.status == HD.PENDING) {
   	this.status = HD.FULFILLED;
		this.value = value;
    setTimeout(() => {
      this.callbacks.map(callback => {
        callback.onFulfilled(value);
      });
    });
  }
}
reject(value) {
  if (this.status == HD.PENDING) {
  	this.status = HD.REJECTED;
    this.value = value;
    setTimeout(() => {
      this.callbacks.map(callback => {
        callback.onRejected(value);
      });
    });
  }
}
```
### 链式操作
Promise中的then是链式调用执行的，所以then也要返回Promise才能实现

then的onReject函数是对前面Promise的rejected的处理
但该Promise返回状态要为fulfilled，所以在调用onRejected后改变当前promise为fulfilled状态

``` js
then(onFulfilled, onRejected) {
  if (typeof onFulfilled != "function") {
    onFulfilled = value => value;
  }
  if (typeof onRejected != "function") {
    onRejected = value => value;
  }
  return new HD((resolve, reject) => {
    if (this.status == HD.PENDING) {
      this.callbacks.push({
        onFulfilled: value => {
          try {
            let result = onFulfilled(value);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        },
        onRejected: value => {
          try {
            let result = onRejected(value);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }
      });
    }
    if (this.status == HD.FULFILLED) {
      setTimeout(() => {
        try {
          let result = onFulfilled(this.value);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    }
    if (this.status == HD.REJECTED) {
      setTimeout(() => {
        try {
          let result = onRejected(this.value);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    }
  });
}
```

下面执行测试后，链式操作已经有效了
``` js
let p = new HD((resolve, reject) => {
  resolve("百度");
  console.log("hdcms.com");
})
.then(
  value => {
    console.log(value);
    return "视频";
  },
  reason => {
    console.log(reason);
  }
)
.then(
  value => {
    console.log(value);
  },
  reason => {
    console.log(reason);
  }
);
console.log("baidu.com");
```

### 返回类型
如果then返回的是Promise呢？所以我们需要判断分别处理返回值为Promise与普通值的情况

### 基本实现
下面来实现不同类型不同处理机制
``` js
then(onFulfilled, onRejected) {
  if (typeof onFulfilled != "function") {
    onFulfilled = value => value;
  }
  if (typeof onRejected != "function") {
    onRejected = value => value;
  }
  return new HD((resolve, reject) => {
    if (this.status == HD.PENDING) {
      this.callbacks.push({
        onFulfilled: value => {
          try {
            let result = onFulfilled(value);
            if (result instanceof HD) {
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          } catch (error) {
            reject(error);
          }
        },
        onRejected: value => {
          try {
            let result = onRejected(value);
            if (result instanceof HD) {
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          } catch (error) {
            reject(error);
          }
        }
      });
    }
    if (this.status == HD.FULFILLED) {
      setTimeout(() => {
        try {
          let result = onFulfilled(this.value);
          if (result instanceof HD) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (error) {
          reject(error);
        }
      });
    }
    if (this.status == HD.REJECTED) {
      setTimeout(() => {
        try {
          let result = onRejected(this.value);
          if (result instanceof HD) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (error) {
          reject(error);
        }
      });
    }
  });
}
```

### 代码复用
现在发现pendding、fulfilled、rejected 状态的代码非常相似，所以可以提取出方法Parse来复用
``` js
then(onFulfilled, onRejected) {
  if (typeof onFulfilled != "function") {
    onFulfilled = value => value;
  }
  if (typeof onRejected != "function") {
    onRejected = value => value;
  }
  return new HD((resolve, reject) => {
    if (this.status == HD.PENDING) {
      this.callbacks.push({
        onFulfilled: value => {
          this.parse(onFulfilled(this.value), resolve, reject);
        },
        onRejected: value => {
          this.parse(onRejected(this.value), resolve, reject);
        }
      });
    }
    if (this.status == HD.FULFILLED) {
      setTimeout(() => {
        this.parse(onFulfilled(this.value), resolve, reject);
      });
    }
    if (this.status == HD.REJECTED) {
      setTimeout(() => {
        this.parse(onRejected(this.value), resolve, reject);
      });
    }
  });
}
parse(result, resolve, reject) {
  try {
    if (result instanceof HD) {
      result.then(resolve, reject);
    } else {
      resolve(result);
    }
  } catch (error) {
    reject(error);
  }
}
```

### 返回约束
then的返回的promise不能是then相同的Promise，下面是原生Promise的示例将产生错误
``` js
let promise = new Promise(resolve => {
  setTimeout(() => {
    resolve("百度");
  });
});
let p = promise.then(value => {
  return p;
});
```

解决上面的问题来完善代码，添加当前promise做为parse的第一个参数与函数结果比对
``` js
then(onFulfilled, onRejected) {
  if (typeof onFulfilled != "function") {
    onFulfilled = value => value;
  }
  if (typeof onRejected != "function") {
    onRejected = value => value;
  }
  let promise = new HD((resolve, reject) => {
    if (this.status == HD.PENDING) {
      this.callbacks.push({
        onFulfilled: value => {
          this.parse(promise, onFulfilled(this.value), resolve, reject);
        },
        onRejected: value => {
          this.parse(promise, onRejected(this.value), resolve, reject);
        }
      });
    }
    if (this.status == HD.FULFILLED) {
      setTimeout(() => {
        this.parse(promise, onFulfilled(this.value), resolve, reject);
      });
    }
    if (this.status == HD.REJECTED) {
      setTimeout(() => {
        this.parse(promise, onRejected(this.value), resolve, reject);
      });
    }
  });
  return promise;
}
parse(promise, result, resolve, reject) {
  if (promise == result) {
    throw new TypeError("Chaining cycle detected for promise");
  }
  try {
    if (result instanceof HD) {
      result.then(resolve, reject);
    } else {
      resolve(result);
    }
  } catch (error) {
    reject(error);
  }
}
```

现在进行测试也可以得到原生一样效果了
``` js
let p = new HD((resolve, reject) => {
  resolve("百度");
});
p = p.then(value => {
  return p;
});
```
### RESOLVE
下面来实现Promise的resolve方法
``` js
static resolve(value) {
  return new HD((resolve, reject) => {
    if (value instanceof HD) {
      value.then(resolve, reject);
    } else {
      resolve(value);
    }
  });
}
```
使用普通值的测试
``` js
HD.resolve("百度").then(value => {
  console.log(value);
});
```
使用状态为fulfilled的promise值测试
``` js
HD.resolve(
  new HD(resolve => {
    resolve("baidu.com");
  })
).then(value => {
  console.log(value);
});
```
使用状态为rejected的Promise测试
``` js
HD.resolve(
  new HD((_, reject) => {
    reject("reacted");
  })
).then(
  value => {
    console.log(value);
  },
  reason => {
    console.log(reason);
  }
);
```
### REJEDCT
下面定义Promise的rejecte方法
``` js
static reject(reason) {
  return new HD((_, reject) => {
    reject(reason);
  });
}
```
使用测试
``` js
HD.reject("rejected").then(null, reason => {
  console.log(reason);
});
```
### ALL
下面来实现Promise的all方法

``` js
static all(promises) {
  let resolves = [];
  return new HD((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise.then(
        value => {
          resolves.push(value);
          if (resolves.length == promises.length) {
            resolve(resolves);
          }
        },
        reason => {
          reject(reason);
        }
      );
    });
  });
}
```

来对所有Promise状态为fulfilled的测试

``` js
let p1 = new HD((resolve, reject) => {
  resolve("百度");
});
let p2 = new HD((resolve, reject) => {
  reject("百度");
});
let promises = HD.all([p1, p2]).then(
  promises => {
    console.log(promises);
  },
  reason => {
    console.log(reason);
  }
);
```

使用我们写的resolve进行测试

``` js
let p1 = HD.resolve("百度");
let p2 = HD.resolve("baidu.com");
let promises = HD.all([p1, p2]).then(
  promises => {
    console.log(promises);
  },
  reason => {
    console.log(reason);
  }
);
```

其中一个Promise为rejected时的效果

``` js
let p1 = HD.resolve("百度");
let p2 = HD.reject("rejected");
let promises = HD.all([p1, p2]).then(
  promises => {
    console.log(promises);
  },
  reason => {
    console.log(reason);
  }
);
```

### RACE
下面实现Promise的race方法

``` js
static race(promises) {
  return new HD((resolve, reject) => {
    promises.map(promise => {
      promise.then(value => {
        resolve(value);
      });
    });
  });
}
```

我们来进行测试

``` js
let p1 = HD.resolve("百度");
let p2 = HD.resolve("baidu.com");
let promises = HD.race([p1, p2]).then(
  promises => {
    console.log(promises);
  },
  reason => {
    console.log(reason);
  }
);
```

使用延迟Promise后的效果

``` js
let p1 = new HD(resolve => {
  setInterval(() => {
    resolve("百度");
  }, 2000);
});
let p2 = new HD(resolve => {
  setInterval(() => {
    resolve("baidu.com");
  }, 1000);
});
let promises = HD.race([p1, p2]).then(
  promises => {
    console.log(promises);
  },
  reason => {
    console.log(reason);
  }
);
```

参考：
https://es6.ruanyifeng.com/#docs/promise  Promise基础
https://github.com/then/promise     PromiseA+规范
https://blog.csdn.net/lqyygyss/article/details/102662606    深度揭秘 Promise 微任务和执行过程
