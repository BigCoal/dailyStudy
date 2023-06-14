
## 一、lodash  安装教程
1.下载 
    
    cnpm i lodash --save 

2.引入

    import lodash from "lodash"

    Vue.prototype._ = lodash
    
3.使用

    console.log('vue loadsh', this._ )
    
## 二、loadsh 的方法使用

### 1.数组方法

（1)  _.chunk 将数组拆分成二维数组

参数一：要拆分的数组 

参数二：第二层数组的长度
```
let arr = [1,2,3,4,5,6]
console.log('arr lodash' , _.chunk(arr , 3))      // 打印结果  [[1,2,3] , [ 4,5,6]]
```

（2）_.compact 过滤掉数组的假值 		不改变原数组
```
let arr1 = [0, 1, false, 2, ' ', 3]
console.log('arr lodash compact' , _.compact(arr1) )   // 打印结果 [ 1 ,2 ,3 ]
```
（3） _.concat 合并多个数组  

（4）_.difference  过滤掉 arr5 在 arr 中存在的元素

参一：过滤目标

参二：过滤条件
```
let arr = [1, 2, 3, 4, 5, 6];
let arr5 = [2,4,6,9]
console.log('arr5 difference' , _.difference(arr , arr5) )	// 打印结果 [ 1, 3 ,5]
```
  (5)  _.differenceBy   相当于过滤   
  参一：需要过滤的数组    
  
  参二：过滤的条件   
  
  参三：(Array|Function|Object|string) ： 循环每个元素
 ```
let arr6 = [{ 'x': 2 , 'y': 1 }, { 'x': 1 , 'y' : 4 } , { 'x': 8 , 'y' : 4 } ]
console.log('arr6 differenceBy' , _.differenceBy(arr6 , [{'x':1} , {'y' : 4}] , 'x'))     

//    打印结果 [{ 'x': 2 , 'y': 1 }, { 'x': 1 , 'y' : 4 }]


let arr7 = _.differenceBy([3.1, 2.2, 1.3], [1.9, 3.1], Math.floor);
console.log('arr7' , arr7)				 

//    打印结果 [2.2]
```
(6) _.drop 切除数组 参1：数组   参2(默认为1)：number 切出数量  (负数相当于0 )
```
let arr = [1, 2, 3, 4, 5, 6];
console.log('arr drop' , _.drop(arr , 2))		// 打印结果  [3,4,5,6]
```
(7) _.dropRight  同上  从右至左

(8) _.dropWhile   也可以说是一个过滤器
```
let users = [
  { user: "barney", active: false },
  { user: "fred", active: false },
  { user: "pebbles", active: true },
];
console.log('dropWhile' , _.dropWhile(users, function( a , b , c ) { return !a.active; }));		
// 打印结果 [ { user: "pebbles", active: true }, ]
```
（9）_.fill 修改值 

参1：数组

参2：修改的Value值

参3 ：开始索引 

参4 ： 结束索引
```
let arr = [1, 2, 3, 4, 5, 6];
console.log('arr fill' , _.fill(arr , 'a'  , 1 , 4))	
// 打印结果    [1, "a", "a", "a", 5, 6]	
```
### 2. 集合 

（1） _.countBy 查找每个元素在集合中的数量
```
console.log('loadsh countBy' , _.countBy( [ 6.1, 4.2, 6.3 , 2.1 , 2.9 ], Math.floor))  
// 打印结果  {2: 2, 4: 1, 6: 2}	
```
（2）_.forEach   可以循环 对象 数组 ，字符串

（3）_.filter 	可以循环 对象 数组 ，字符串

## 三、回顾数组的方法


### 1. 改变原数组
1. pop() 删除并返回数组的最后一个元素
是否改变原数组：是
```
let arr = [1,2,3];
console.log('pop' , arr.pop())     // 打印结果 [3]
```
2. shift() 删除并返回数组的第一个元素
```
let arr = [1,2,3];
console.log('shift' , arr.shift())     // 打印结果 [1]
```

3. push() 向数组的末尾添加一个或更多元素，并返回新的长度
```
let arr = [1,2,3];
console.log('push' , arr.push(4))     // 打印结果 4
```

4. unshift() 向数组的开头添加一个或更多元素，并返回新的长度
```
let arr = [1,2,3];
console.log('unshift' , arr.unshift(0))     // 打印结果 4
```
5. sort() 对数组的元素进行排序
```
let arr = [1,2,3];
let newArr = arr.sort((a , b) => {
    return b - a
})
console.log('newArr' , newArr)     // 打印结果 [3,2,1]
```
6.reverse() 颠倒数组中元素的顺序
```
let arr = [1,2,3];
console.log('reverse' , arr.reverse())     // 打印结果 [3,2,1]
```
7.splice() 删除元素，并向数组添加新元素。
```
let arr = [1,2,3,4,5,6];
console.log('splice' , arr.splice(1))   
// 从数组开头删除一个元素     
// 打印结果 [2,3,4,5,6]

console.log('splice' , arr.splice(1 , 3))  
// 数组中下标从1开始删除，删除3个元素     
// 打印结果 [2,3,4]

console.log('splice' , arr.splice(1 , 1 , 'new'))  
// 删除数组下标为1开始删除，删除一个元素，并添加一个'new'
// 打印结果 [2]
// 打印arr [1,'new',2,3,4,5,6]

console.log('splice' , arr.splice(1 , 2 , 'new'))  
// 删除数组下标为1开始删除，删除一个元素，并添加一个'new'
// 打印结果 [2 , 3]
// 打印arr [1,'new',3,4,5,6]

```



### 2. 不改变原数组
8. concat() 拼接两个或多个数组
```
let arr = [1,2,3];
let newArr = [4,5,6]
console.log('concat' , arr.concat(newArr))     // 打印结果 [1,2,3,4,5,6]
```

9. join() 转成字符串可以是值以什么符号隔开
```
let arr = [1,2,3,4,5,6];
console.log('join' , arr.join('-'))     // 打印结果 1-2-3-4-5-6
```
10. slice() 截取 一段数组  包含开头 ， 不包含结尾
```
let arr = [1,2,3,4,5,6];
console.log('slice' , arr.slice(2,5))     // 打印结果 1-2-3-4-5-6
```
11. indexOf() 查询数组里面是否存在指定的元素，存在返回下标，不存在则返回-1
```
let arr = [1,2,3,4,5,6];
console.log('indexOf' , arr.indexOf(2))     // 打印结果 1
```
12. forEach() 循环数组的每个元素
13. map() 循环数组每个元素，并且对每个元素可以进行操作
```
let arr = [1,2,3,4,5,6]
let aa = arr.map((v , i)=>{
  return v * 10
})
console.log('map' , aa)         // 打印结果 [10, 20, 30, 40, 50, 60]
```
14. filter()  对数组元素进行过滤
15. some()  对数组的每个元素进行查找，存在返回true，不存在返回false
```
let arr = [1,2,3,4,5,6]
let aa = arr.some((v , i)=>{
  return v == 2
})
console.log('map' , aa)         // 打印结果 true
```
16. every() 判断数组中每一项都是否满足所给条件，当所有项都满足条件，才会返回true
```
let arr = [1,2,3,4,5,6]
let aa = arr.every((v , i)=>{
  return v > 3
})
console.log('every' , aa)         // 打印结果 false
```
17. includes()   查找某个元素是否存在，返回是 Boolen 值
```
let arr = [1,2,3,4,5,6]
let aa = arr.includes(2)
console.log('includes' , aa)         // 打印结果 true
```
18. isArray() 判断是否为数组
```
let arr = [1,2,3,4,5,6]
Array.isArray(arr)              // true
```