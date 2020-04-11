/*
1) JSONP:
动态的创建script标签，再去请求一个带参网址来实现跨域通信

2)document.domain + iframe 

3)window.name + iframe

4)location.hash = iframe 

5)postMessage

6)CORS跨域资源共享

7)WebSocket协议跨域

8）node代理跨域

9）nginx代理跨域


 */

let script = document.createElement('script');
script.src = 'http://www.nealyang.cn/login?username=Nealyang&callback';
document.body.appendChild(script);
function callback(res){
	console.log(res);
}

//或者jquery也支持jsonp的实现方式
$.ajax({
	url:'http://www.nealyang.cn/login',
	type:'get',
	dataType:'jsonp',
	jsonpCallback:'callback',
	data:{
		"username":"Nealyang"
	}

})



