// ### 快慢指针
const { randomArr, randomLinks } = require("./basic.js");

//输入链表头节点，奇数长度返回中点，偶数长度返回上中点
function midOrUpMidNode(head) {
    if (head == null || head.next == null) {
        return head;
    }
    //有两个点及以上时
    let low = head.next;
    let fast = head.next;
    while (fast.next && fast.next.next) {
        low = low.next;
        fast = fast.next.next;
    }
    return low;
}
//输入链表头节点，奇数长度返回中点，偶数长度返回下中点
function midOrDownNode(head) {
    if (!head || !head.next || !head.next.next) {
        return head;
    }
    //三个点及以上的时候
    let low = head.next;
    let fast = head.next.next;
    while (fast.next && fast.next.next) {
        low = low.next;
        fast = fast.next.next;
    }
    return low;
}
//输入链表头节点，奇数长度返回中点前一个，偶数长度返回上中点前一个
function midOrUpPreNode(head) {
    if (head == null || head.next == null) {
        return null;
    }
    //两个节点及两个以上
    let low = head;
    let fast = head.next;
    while (fast.next && fast.next.next) {
        fast = fast.next.next;
        low = low.next;
    }
    return low;
}
//输入链表头节点，奇数长度返回中点前一个，偶数长度返回下中点前一个
function midOrDownPreNode(head) {
    if (!head || !head.next || !head.next.next) {
        return null;
    }
    //三个节点及三个以上
    let low = head;
    let fast = head.next.next;
    while (fast.next && fast.next.next) {
        fast = fast.next.next;
        low = low.next;
    }
    return low;
}
function main() {
    const maxValue = 30;
    const times = 20000;
    for (let i = 0; i < times; i++) {
        const arr = randomArr(i, maxValue);
        const links = randomLinks(arr);

        let mid = 0;
        let linkMid = 0;
        //输入链表头节点，奇数长度返回中点，偶数长度返回上中点
        mid = Math.floor(arr.length / 2);
        linkMid = midOrUpMidNode(links);
        if (linkMid && linkMid.value != arr[mid]) {
            console.log("错误");
        }
        //输入链表头节点，奇数长度返回中点，偶数长度返回下中点
        mid =
            arr.length % 2 == 0
                ? Math.floor(arr.length / 2) - 1
                : Math.floor(arr.length / 2);
        linkMid = midOrDownNode(links);
        if (linkMid && linkMid.value != arr[mid]) {
            console.log("错误");
        }
        // 输入链表头节点，奇数长度返回中点前一个，偶数长度返回上中点前一个
        mid = Math.floor(arr.length / 2) - 1;
        linkMid = midOrUpPreNode(links);
        if (linkMid && linkMid.value != arr[mid]) {
            console.log("错误");
        }

        // 输入链表头节点，奇数长度返回中点前一个，偶数长度返回下中点前一个
        mid = arr.length % 2 == 0 ? Math.floor(arr.length / 2) - 2 : Math.floor(arr.length / 2) - 1
        midOrDownPreNode
        linkMid = midOrDownPreNode(links);
        if (linkMid && linkMid.value != arr[mid]) {
            console.log("错误");
        }
    }
}

main();
