// 请把一段纸条竖着放在桌子上，然后从纸条的下边向上方对折1次，压出折痕后展开。此时折痕是凹下去的，即折痕突起的方向指向纸条的背面。
//如果从纸条的下边向上方连续对折2次，压出折痕后展开，此时有三条折痕，从上到下依次是下折痕、下折痕和上折痕。
// 给定一个输入参数N，代表纸条都从下边向上方连续对折N次。 请从上到下打印所有折痕的方向。
// 例如:N=1时，打印: down N=2时，打印: down down up

//中序遍历所有的结果就是从头打印到尾
export class Node {
  value: any;
  left: Node;
  right: Node;
}
//折痕的规则：
// 1.头结点是凹折痕
// 2. 所有左子树头凹
// 3. 所有右子树头凸
function process(i: number, N: number, down: boolean) {
  if (i > N) return;
  process(i + 1, N, true);
  console.log(down ? "凹" : "凸");
  process(i + 1, N, false);
}

function main() {
  const n = 2; //折几次
  process(1, n, true);
}

main();
