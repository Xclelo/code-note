//加载http web 模块  在http://localhost:666/打开

/*const http = require('http');

cs=function(req,res){
	res.write('<h1>hello world!</h1>');
	res.end();
}

http.createServer(cs).listen(666);

console.log('http is ok!');*/

const fs=require('fs');
file='test.txt';
//开始读取文件
console.log('file start');

//正在读取文件
/*data=fs.readFileSync(file);//同步
console.log(data.toString());
*/
fs.readFile(file ,function(err,data){//异步
	console.log(data.toString());
});
//读取文件结束
console.log('file end!');