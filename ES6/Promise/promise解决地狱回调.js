/*
 * @Author: xcq
 * @Date: 2020-03-11 21:37:17
 * @LastEditors: xcq
 * @LastEditTime: 2020-03-11 21:51:16
 * @FilePath: \学习Code\ES6\Promise\promise解决地狱回调.js
 * @Description: 文件头部注释 快捷键：window：ctrl+alt+i,mac：ctrl+cmd+i
 * @函数注释 快捷键：window：ctrl+alt+t,mac：ctrl+cmd+t
 */
/*回调函数简介：是一段可执行的代码段，它作为参数传递給其他代码，其作用是在需要的时候方便调用这段（回调函数）代码*/

/*
function addSqua(num1,num2,callback){
	var num = num1+num2;
	return callback(num);
}
function squa(num){
	return num*num;
}
let num=addSqua(1,2,squa);
console.log(num);//=>9
*/

const fs=require('fs')

function getFileByPath(fPath){
	return new Promise(function(resolve,reject){
		fs.readFile(fPath,'utf-8',(err,dataStr)=>{
			if (err) return reject(err)
			resolve(dataStr)
		})
	})
}

getFileByPath('./ES6/Promise/files/1.txt')
.then(
	function(data){
		console.log('A:'+data)
		return getFileByPath('./ES6/Promise/files/21.txt')
	},function(err){
		console.log('B:'+err.message);
		console.log(`hsg`);
		return getFileByPath('./ES6/Promise/files/2.txt')
	}
	)
.then(function(data){
	console.log('C:'+data)
	return getFileByPath('./ES6/Promise/files/3.txt')
})
.then(function(data){
	console.log('D:'+data)
})
.catch(function(err){
	/*如果前面有任何的Promise执行失败，则立即终止所有Promise的执行，并马上进入catch去处理Promise中抛出的异常*/
	console.log('这是自己的处理方式：'+err.message)
})