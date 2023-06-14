// 1.有三根杆子A,B,C。A杆上有若干碟子
// 2.每次移动一块碟子,小的只能叠在大的上面
// 3.把所有碟子从A杆全部移到C杆上
//打印所有移动过程

enum pillar {
  left = "左边的柱子",
  right = "右边的柱子",
  middle = "中间的柱子",
}
function move(N: number, from: pillar, to: pillar, middle: pillar) {
  if (N == 1) {
    console.log(`${N},从${from}移动到${to}`);
    return;
  }

  move(N - 1, from, middle, to);
  console.log(`${N},从${from}移动到${to}`);
  move(N - 1, middle, to, from);
}

move(3, pillar.left, pillar.right, pillar.middle);
