export function printSubsequence(
  str: string,
  index: number,
  path: string,
  ans: Set<string>
) {
  if (index == str.split("").length) {
    if (!ans.has(path)) {
      ans.add(path);
      console.log(path);
    }

    return;
  }
  printSubsequence(str, index + 1, path + str[index], ans);
  printSubsequence(str, index + 1, path, ans);
}

printSubsequence("aaa", 0, "", new Set());
