/*
 * @Author: xcq
 * @Date: 2020-03-22 22:40:34
 * @LastEditors: xcq
 * @LastEditTime: 2020-03-22 23:36:39
 * @FilePath: \学习Code\ES6\Promise\porxy.js
 * @Description: 文件头部注释 快捷键：window：ctrl+alt+i,mac：ctrl+cmd+i
 * @函数注释 快捷键：window：ctrl+alt+t,mac：ctrl+cmd+t
 */

 /* Proxy 关键字：代理--拦截 */
 
 let target = {
     name:"hello"
 }
 let handler = {
     get:function(target,propertkey,receiver){
        console.log(target)//{ name: 'hello' }
        console.log(propertkey)//name
        // console.log(receiver)//Proxy {name: "hello"}
        return 'world'
     }
 }
 let p = new Proxy(target,handler)

 let test = p.name
 console.log(test)
 console.log(target)

