/*
 * @Author: xcq
 * @Date: 2019-09-03 21:43:49
 * @LastEditors: xcq
 * @LastEditTime: 2020-03-22 22:39:41
 * @FilePath: \学习Code\ES6\ES6text.js
 * @Description: 文件头部注释 快捷键：window：ctrl+alt+i,mac：ctrl+cmd+i
 * @函数注释 快捷键：window：ctrl+alt+t,mac：ctrl+cmd+t
 */
function concatenateAll(...args) {
    console.log(args)
    return args.join('--');
}
console.log(concatenateAll(1,2,3))
