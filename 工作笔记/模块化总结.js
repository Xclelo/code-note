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
 *
 *
 *
 *
 */