
/*console.log(__filename);
console.log(__dirname);
console.info(__filename);
console.warn(__filename);
console.error(__filename);*/
/*
console.time('x');
for(i=0;i<1000000;i++){
}
console.timeEnd('x');
*/
/*
i=0;
setTimeout(function(){//超时器
	console.log(++i)
},1000)


setInterval(function(){//定时器
console.log(++i);
},1000)*/

/*str=process.version;
str=process.argv;
str=process.pid;
str=process.title;
str=process.platform;
str=process.uptime();
console.log(str)*/

process.stdin.on('readable',function(){
	str=process.stdin.read();
	if(str!==null){
		process.stdout.write('data: '+str);
	}
});

