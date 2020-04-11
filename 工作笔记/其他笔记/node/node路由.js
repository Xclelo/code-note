const http=require('http');
const url=require('url');
const fs=require('fs');
cs=function(req,res){
	uri=req.url;

	//路由
	if(uri!='/favicon.ico'){
		path=url.parse(uri).pathname;
		switch(path){
			case "/user/add":
				res.write('<h1>add</h1>');
				break;
			case "/user/delete":
				res.write('<h1>delete</h1>');
				break;
			case "/user/update":
				res.write('<h1>update</h1>');
				break;
			default:
				data=fs.readFileSync('index.html');
				str=data.toString();
				res.write(str);				

				//res.write('<h1>hello</h1>');
				break;
		}
	}
	console.log(uri);

	res.end();
}
http.createServer(cs).listen(666);

console.log('is ok');
