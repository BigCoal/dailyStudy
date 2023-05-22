/*
 * @Author: dingtalk_dtgfuk 1048506792@qq.com
 * @Date: 2023-05-22 17:23:44
 * @LastEditors: dingtalk_dtgfuk 1048506792@qq.com
 * @LastEditTime: 2023-05-22 17:26:23
 * @FilePath: /algorithm/算法/29-2-蓄水池抽样算法/蓄水池抽样算法.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 算法的过程：
// 假设数据序列的规模为 𝑛，需要采样的数量的为 𝑘。
// 首先构建一个可容纳 𝑘个元素的数组，将序列的前 𝑘个元素放入数组中。
// 然后从第 𝑘+1个元素开始，以 𝑘/𝑛的概率来决定该元素是否被替换到数组中（数组中的元素被替换的概率是相同的）。 当遍历完所有元素之后，数组中剩下的元素即为所需采取的样本。