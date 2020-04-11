/*
 * @Author: xcq
 * @Date: 2020-03-22 23:36:26
 * @LastEditors: xcq
 * @LastEditTime: 2020-03-23 00:11:29
 * @FilePath: \学习Code\ES6\MDN\Object.creat.js
 * @Description: 文件头部注释 快捷键：window：ctrl+alt+i,mac：ctrl+cmd+i
 * @函数注释 快捷键：window：ctrl+alt+t,mac：ctrl+cmd+t
 */

 /* 需要到浏览器查看 */
var proto = {
    y: 20,
    z: 40,
    showNum(){}
};
var o = Object.create(proto);
var p = new Object(proto)
proto.y = 30
console.dir(o)
console.dir(p)





/* new Object() 方式创建 */
var a = {  rep : 'apple' }
var b = new Object(a)
console.log(b) // {rep: "apple"}
console.log(b.__proto__) // {}
console.log(b.rep) // {rep: "apple"}

/* Object.create() 方式创建 */
var a = { rep: 'apple' }
var b = Object.create(a)
console.log(b)  // {}
console.log(b.__proto__) // {rep: "apple"}
console.log(b.rep) // {rep: "apple"}