const net=require('net');

chat=net.createServer();
chat.on('connection',function(client){
	client.write('hello world!');

	client.on('data',function(data){
		console.log(data.toString());
	})

});

chat.listen(9000);

console.log('telnet server ok!');


//win+R 执行客户端   telnet localhost 9000