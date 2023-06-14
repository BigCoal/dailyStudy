

[最大连续 1 的个数](https://leetcode-cn.com/problems/max-consecutive-ones/)
/**
给定一个二进制数组 nums ， 计算其中最大连续 1 的个数。
示例 1：
    输入：nums = [1,1,0,1,1,1]
    输出：3
    解释：开头的两位和最后的三位都是连续 1 ，所以最大连续 1 的个数是 3.
示例 2:
    输入：nums = [1,0,1,1,0,1]
    输出：2
 */
```js
function findMaxConsecutiveOnes(nums) {
    let maxNum = 0;
    let max = 0;
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        if(num===0){
            maxNum=max>maxNum?max:maxNum;
            max=0;
        }else{
            max++
        }
    }
    maxNum=max>maxNum?max:maxNum;
    return maxNum;
};

```