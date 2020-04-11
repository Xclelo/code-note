/*
 * @Author: xcq
 * @Date: 2020-02-05 20:05:56
 * @LastEditors  : xcq
 * @LastEditTime : 2020-02-05 20:29:27
 * @FilePath: \学习Code\nodejs\myapp\app.js
 * @Description: 文件头部注释 快捷键：window：ctrl+alt+i,mac：ctrl+cmd+i
 * @函数注释 快捷键：window：ctrl+alt+t,mac：ctrl+cmd+t
 */


 
/*
安装express的步骤:
1.$ npm init
2.$ npm install express --save   //  $ npm install express --no-save    (如果只是临时安装 Express，不想将它添加到依赖列表中)

启动命令:node app.js
查看网址: http://localhost:3000/
*/



const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))