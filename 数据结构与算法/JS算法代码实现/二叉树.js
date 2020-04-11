/*
 * @Author: xcq
 * @Date: 2020-03-22 11:06:47
 * @LastEditors: xcq
 * @LastEditTime: 2020-03-22 11:19:44
 * @FilePath: \学习Code\数据结构与算法\JS算法代码实现\二叉树.js
 * @Description: 文件头部注释 快捷键：window：ctrl+alt+i,mac：ctrl+cmd+i
 * @函数注释 快捷键：window：ctrl+alt+t,mac：ctrl+cmd+t
 */


/*
二叉树有几个比较重要的特性, 在笔试题中比较常见:
一个二叉树第 i 层的最大结点数为：2^(i-1), i >= 1;
深度为k的二叉树有最大结点总数为： 2^k - 1, k >= 1;
对任何非空二叉树 T，若n0表示叶结点的个数、n2是度为2的非叶结点个数，那么两者满足关系n0 = n2 + 1
链接：https://www.jianshu.com/p/b7d501591eb7
*/

/*
二叉搜索树:

二叉搜索树的特点就是相对较小的值总是保存在左结点上, 相对较大的值总是保存在右结点上.
*/
