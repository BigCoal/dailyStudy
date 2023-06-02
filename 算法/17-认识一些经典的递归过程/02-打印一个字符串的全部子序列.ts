function printSubsequence(str: string, index: number, path: string) {
  if (index == str.split("").length) {
    console.log(path);
    return;
  }
  printSubsequence(str, index + 1, path + str[index]);
  printSubsequence(str, index + 1, path);
}

printSubsequence("aaa", 0, "");
