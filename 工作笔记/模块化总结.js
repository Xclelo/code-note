/**
 *
 * 
1.
node 中向外暴露成员的形式
module.exports = {}

node 导入成员
var 名称 = require('模块标识符')


2.ES6中向外暴露成员
export default 和 export
        export default 和 export 的区别
 例子：
 				向外暴露：test.js
 				var info = {
 				  name:'clelo',
 				  age:18
 				}
        export default info;//只能向外暴露一次

        引入：main.js
        import a from './test.js'


        向外暴露：test.js
        export var title = '123'   //按需导出
        export var title2 = '456'

        引入：main.js
        import {title as t,title2} from './test.js'  //as别名






3.CommonJS 模块输出的是值的缓存，不存在动态更新
              // a.js
              module.exports = {
                  a: 1
              }
              // or
              exports.a = 1

              // b.js
              var module = require('./a.js')
              module.a // -> log 1
 *

    区别：
 *  CommonJS 在导出时都是值拷贝，就算导出的值变了，导入的值也不会改变，所以如果想更新值，必须重新导入一次。
 *  但是 ES Module 采用实时绑定的方式，导入导出的值都指向同一个内存地址，所以导入值会跟随导出值变化
 *
 *
 */