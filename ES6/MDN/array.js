/*
 * @Author: xcq
 * @Date: 2020-03-12 20:56:31
 * @LastEditors: xcq
 * @LastEditTime: 2020-03-16 22:33:14
 * @FilePath: \学习Code\ES6\MDN\array.js
 * @Description: 文件头部注释 快捷键：window：ctrl+alt+i,mac：ctrl+cmd+i
 * @函数注释 快捷键：window：ctrl+alt+t,mac：ctrl+cmd+t
 */

let arr_1 = [1,2,3,4,5,6,7]
arr_1.push(8)
arr_1.pop()//删除最后一个

arr_1.unshift(1)//新加到第一个
arr_1.shift()//删除第一个
// console.log(arr_1);

function f1(){
    console.log(arguments)
    let arg = Array.prototype.shift.call(arguments)//这里的arguments相当于this
    console.log(Math.max.apply(this,[1,2,3,4,5]))//this,必选的
    console.log(arg)
    console.log(arguments)
}
f1(1,2,3,4)
