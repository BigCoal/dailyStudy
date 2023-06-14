//常见的树的深度遍历的空间复杂度是树的最大深度
//可以利用节点的右指针空闲让树的遍历空间复杂度达到O(1)

//当到达某一个节点的时候：
//1.如果节点没有左孩子，当前节点跳转到右孩子
//2.如果有左孩子：
//  （1）左孩子的最右节点如果不等于当前节点，让其指向当前节点，当前节点跳转到左孩子
//  （2）左孩子的最右节点如果等于当前节点，让其指向null，当前节点跳转到右孩子
//3.当前节点为null时遍历停止

export class TreeNode {
    left: TreeNode | null;
    right: TreeNode | null;
}

function Morris(node: TreeNode) {
    let curNode = node;
    while (curNode !== null) {
        if (curNode.left) {
            let mostRight = curNode.left;
            while (mostRight.right && mostRight.right !== curNode) {
                mostRight = mostRight.right
            }
            if (mostRight.right == null) {
                mostRight.right = curNode;
                curNode = curNode.left
            } else {
                curNode = curNode.right
                mostRight.right = null;
            }
        } else {
            curNode = curNode.right
        }
    }
}