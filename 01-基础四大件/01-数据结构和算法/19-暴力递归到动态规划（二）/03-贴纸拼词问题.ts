/*
 * @Author: zhubaokang 1048506792@qq.com
 * @Date: 2023-06-02 21:31:36
 * @LastEditors: zhubaokang 1048506792@qq.com
 * @LastEditTime: 2023-06-03 08:18:42
 * @FilePath: \algorithm\算法\19-暴力递归到动态规划（二）\03-贴纸拼词问题.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 给定一个字符串str，给定一个字符串类型的数组arr。
// arr里的每一个字符串，代表一张贴纸（每张贴纸无限张），你可以把单个字符剪开使用，目的是拼出str来。
// 返回需要至少多少张贴纸可以完成这个任务。
// 例子：str= \"babac\"，arr = {\"ba\",\"c\",\"abcd\"}
// 至少需要两张贴纸\"ba\"和\"abcd\"，因为使用这两张贴纸，把每一个字符单独剪开，含有2个a、2个b、1个c。是可以拼出str的。所以返回2。
export function process(
  strNumWords: number[],
  arrNumWords: number[][],
  index: number,
  reset: number
): number {
  if (index == arrNumWords.length) {
    return reset <= 0 ? 0 : Number.MAX_SAFE_INTEGER;
  }

  let res = Number.MAX_SAFE_INTEGER;
  const copyArr = [...strNumWords];
  for (let zhang = 0; zhang < Number.MAX_SAFE_INTEGER; zhang++) {
    res = Math.min(
      res,
      zhang + process(copyArr, arrNumWords, index + 1, reset)
    );
    let pre = reset;
    reset = stick(copyArr, arrNumWords[index], reset);
    if (pre == reset) {
      break;
    }
  }

  return res;
}

function stick(str1: number[], str2: number[], reset: number) {
  for (let i = 0; i < str2.length; i++) {
    if (str2[i] > 0 && str1[i] > 0) {
      str1[i]--;
      reset--;
    }
  }
  return reset;
}
function StickersToSpellWord() {
  const str = "abcd";
  const arr = ["ba", "cd", "a", "d"];
  const strNumWords = wordTotal(str);
  const arrNumWords = [];
  for (let i = 0; i < arr.length; i++) {
    arrNumWords.push(wordTotal(arr[i]));
  }

  return process(strNumWords, arrNumWords, 0, str.length);
}

//词频统计
function wordTotal(str: string) {
  const strArr = str.split("");
  const strNumWords = new Array(26).fill(0);
  for (let i = 0; i < strArr.length; i++) {
    strNumWords[strArr[i].charCodeAt(0) - "a".charCodeAt(0)]++;
  }
  return strNumWords;
}

console.log(StickersToSpellWord());
