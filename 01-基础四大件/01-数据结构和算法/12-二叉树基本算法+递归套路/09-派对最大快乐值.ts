// 员工信息的定义如下:
// ```java
// class Employee {
//     public int happy; // 这名员工可以带来的快乐值
//     List<Employee> subordinates; // 这名员工有哪些直接下级
// }
// ```

//  公司的每个员工都符合 Employee 类的描述。整个公司的人员结构可以看作是一棵标准的、 没有环的多叉树。树的头节点是公司唯一的老板。除老板之外的每个员工都有唯一的直接上级。 叶节点是没有任何下属的基层员工(subordinates列表为空)，除基层员工外，每个员工都有一个或多个直接下级。
// 这个公司现在要办party，你可以决定哪些员工来，哪些员工不来，规则：
// 1.如果某个员工来了，那么这个员工的所有直接下级都不能来
// 2.派对的整体快乐值是所有到场员工快乐值的累加
// 3.你的目标是让派对的整体快乐值尽量大
// 给定一棵多叉树的头节点boss，请返回派对的最大快乐值。

class Employee {
  constructor(
    public happy = 0, // 这名员工可以带来的快乐值
    public subordinates: Employee[] // 这名员工有哪些直接下级
  ) {}
}

class info {
  constructor(
    public coming = 0, //员工来时候带来的最大快乐值
    public notComing = 0 //员工不来时候带来的最大快乐值
  ) {}
}

function maxHappy(head: Employee): info {
  if (!head.subordinates.length) {
    return new info(head.happy, 0);
  }
  let coming = head.happy;
  let notComing = 0;
  for (let i = 0; i < head.subordinates.length; i++) {
    const childHappy = maxHappy(head.subordinates[i]);
    //当头节点来的时候，最大快乐值等于所有直接员工不来时候的最大值
    coming += childHappy.notComing;
    //当头节点不来的时候，最大快乐值等于所有直接员工max(来，不来)最大值想加
    notComing += Math.max(childHappy.notComing, childHappy.coming);
  }
  return new info(coming, notComing);
}
