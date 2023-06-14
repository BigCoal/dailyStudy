var moveZeroes = function (nums) {
  let j = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      let tem = nums[i];
      nums[i] = nums[j];
      nums[j++] = tem;
    }
  }
  return nums
};


console.log(moveZeroes([0,1,0,3,12]))