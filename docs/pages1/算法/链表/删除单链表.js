const { randomArr, randomLinks } = require("./basic.js");

function main() {
  const len = 500;
  const maxValue = 1000;Î
  const times = 10000;
  for (let i = 0; i < times; i++) { 
    const arr = randomArr(len, maxValue);
    const value = arr[Math.floor(Math.random() * len)];
    const links = randomLinks(arr);
  
    if (
      JSON.stringify(deleteLinksValue(links, value)) !==
      JSON.stringify(logarithm(arr, value))
    ) {
      console.log("删除错误");
    }
  }
}

function deleteLinksValue(links, value) {
  let head = links;

  while (head !== null) {
    if (head.value !== value) {
      break;
    }
    head = head.next;
  }

  let cur = head;
  let pre = head;

  while (cur !== null) {
    let next = cur.next;
    if (cur.value == value) {
       pre.next = next;
    }else{
        pre  = cur;
    }
    cur = next;
  }

  return head;
}

function logarithm(arr, value) {
  const notValueArr = [];
  for (let i = 0; i < arr.length; i++) {
    const ele = arr[i];
    if (ele !== value) {
      notValueArr.push(ele);
    }
  }
  return randomLinks(notValueArr);
}

main();
