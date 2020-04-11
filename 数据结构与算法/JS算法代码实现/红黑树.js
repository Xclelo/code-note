/*
 * @Author: xcq
 * @Date: 2020-03-22 15:18:09
 * @LastEditors: xcq
 * @LastEditTime: 2020-03-22 15:23:55
 * @FilePath: \学习Code\数据结构与算法\JS算法代码实现\红黑树.js
 * @Description: 文件头部注释 快捷键：window：ctrl+alt+i,mac：ctrl+cmd+i
 * @函数注释 快捷键：window：ctrl+alt+t,mac：ctrl+cmd+t
 */

 /*
 红黑树-->相对平衡的二叉树
 红黑树基本规则：
 1.节点时红色或者黑色
 2.根节点时黑色
 3.每个叶子节点都是黑色的节点（NULL节点）
 4.每个红色节点的两个子节点都是黑色【从每个叶子到根的所有路径上不能有两个连续的红色节点】
 5.从任意节点到其每个叶子的所有路径都包含相同数目的黑色节点
 */