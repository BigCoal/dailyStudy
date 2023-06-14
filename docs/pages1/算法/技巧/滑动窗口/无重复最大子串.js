//给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
/**
输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

输入: s = " "
输出: 1
*/

function lengthOfLongestSubstring(str) {
  let maxLen = 0;
  let maxStr = "";
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const hitPosition = maxStr.indexOf(char);
    if (hitPosition !== -1) {
      maxStr = maxStr.slice(hitPosition + 1, maxStr.length);
    }
    maxStr += char;
    maxLen = maxStr.length > maxLen ? maxStr.length : maxLen;
  }
  return maxLen;
}

console.log(lengthOfLongestSubstring("abcabcbb"));
